use sha2::{Sha256, Digest};
use rand::{prelude::Rng, distributions::Alphanumeric };
use oracle::{Connection, Error};
use log::{info, warn, error};
use actix_identity::Identity;
use actix_web::{web, Responder, HttpRequest, HttpMessage, HttpResponse};
use serde::{Deserialize, Serialize};


static SQL_USERNAME: &str = "group09_user";
static SQL_PASSWORD: &str = "group09_user";
static SALT_LEN: usize = 16;

#[derive(Deserialize, Serialize, Debug, Default)]
pub struct Entry {
    net_id: String,
    password: String
}

#[derive(Deserialize, Serialize, Debug, Default)]
pub struct User {
    id: String,
    first_name: String,
    last_name: String
}

#[derive(Deserialize, Serialize, Debug, Default)]
pub struct NewUser {
    netid: String, 
    password: String,
    first_name: String,
    last_name: String
}


pub async fn login(request: HttpRequest, body: web::Json<Entry>) -> impl Responder {
    //TODO: finish login, for now will simply login for everyone
    let net_id: &str = body.net_id.as_str();
    let password: &str = body.password.as_str();
    
    //Identity::login(&request.extensions(), "User1".into());
    println!("{:?}", request);
    println!("{:?}", body);
    match authenticate(net_id, password) {
        Some(user) => {
            Identity::login(&request.extensions(), net_id.into());
            web::Json(user);
            HttpResponse::Ok()
        },
        None => {
            web::Json(User::default());
            HttpResponse::Unauthorized()
        }
    }
}

pub async fn logout(user: Identity) -> impl Responder {
    user.logout();
    HttpResponse::Ok()
}

pub async fn signup(request: HttpRequest, body: web::Json<NewUser>) -> impl Responder {
    let body = body.into_inner();

    match create_user(body.netid.as_str(), body.password.as_str(), body.first_name.as_str(), body.last_name.as_str()) {
        Ok(_) => {
            Identity::login(&request.extensions(), body.netid.clone());
            web::Json(User { id: body.netid, first_name: body.first_name, last_name: body.last_name});
            HttpResponse::Ok()
        }
        Err(e) => {
            error!("Error creating new user: {}", e);
            HttpResponse::InternalServerError()
        }
    }

}

fn authenticate(username: &str, password: &str) -> Option<User> {
    
    info!("Authenticating user: {}", username);

    let conn = match Connection::connect(SQL_USERNAME,SQL_PASSWORD, ""){
        Ok(c) => c,
        Err(e) => {
            error!("unable to open connection to server: {}", e);
            return None;
        }
    };
    let mut stmt = match conn.statement("select * from student where net_id = :1").build(){
        Ok(s) => s,
        Err(e) => {
            error!("unable to build statement: {}", e);
            return None;
        }
    };

    let row = stmt.query_row_as::<(String, String, String, String, String)>(&[&username]).unwrap_or_default();
    
    let true_pword = row.3;
    let salt = row.4;

    let mut hasher = Sha256::new();
    hasher.update(password);
    hasher.update(salt);
    let hash = hasher.finalize();

    let mut tmp: String = String::new();
    for value in hash{
        tmp += &format!("{:x}", value); 
    }
    
    conn.close().unwrap_or_default();


    if true_pword.eq(&tmp) {
        info!("User {} successfully authenticated", username);
        Some( User { id: row.0, first_name: row.1,last_name: row.2} )
    }
    else{
        warn!("User {} failed authentication", username);
        None
    }

}




fn create_user(username: &str, password: &str, first_name: &str, last_name: &str) -> Result<(), Error> {

    info!("Creating user: {}", username); 
    let conn = Connection::connect(SQL_USERNAME, SQL_PASSWORD, "")?;
    let mut stmt = conn.statement("insert into student values(:net_id, :first_name, :last_name, :password, :salt)").build()?;

    let salt: String = rand::thread_rng().sample_iter(&Alphanumeric).take(SALT_LEN).map(char::from).collect();
    let mut hasher = Sha256::new();
    hasher.update(&password);
    hasher.update(&salt);
    let hash = hasher.finalize();
    
    let mut hash_string = String::new();

    for value in hash{
        hash_string += &format!("{:x}", value);
    }

    match stmt.execute_named(&[("net_id", &username), ("first_name", &first_name), ("last_name", &last_name), ("password", &hash_string), ("salt", &salt)]) {
        Ok(_) => {
            info!("User {} successfully created", username); 
            conn.commit()?;
        },
        Err(_) => {
            warn!("Failed to create user {}", username);
            conn.rollback()?;
        }
    };

    conn.close()?;
    Ok(())

}