use sha2::{Sha256, Digest};
use rand::{prelude::Rng, distributions::Alphanumeric };
use oracle::{Connection, Error};
use log::{info, warn, error};
use env_logger::Env;
use actix_web::{web, get, post, web::Json, App, HttpResponse, HttpServer, Responder};
use serde::{Deserialize, Serialize};

static SQL_USERNAME: &str = "group09_user";
static SQL_PASSWORD: &str = "group09_user";
static SALT_LEN: usize = 16;
static PORT: u16 = 8009;


#[derive(Default, Debug, Serialize, Deserialize, Clone)]
struct Login {
    net_id: String,
    password: String,
}


#[actix_web::main]
async fn main() -> std::io::Result<()> {
    
    //init logging system
    let env = Env::default().filter_or("LOG_LEVEL", "info");
    env_logger::init_from_env(env);

    let result = HttpServer::new( || {
        App::new()
            .service(index)
            .service(login)
            .service(homepage)
            .service(plan_page)
    })
    .bind(("127.0.0.1", PORT))?
    .run()
    .await;
    //Temporary for testing purposes, should write something to make a random salt
    let username = "cmckechn";
    let password = "password";

    //proof of concept tests, create_user should fail in this instance because user was already
    //created
    //println!("{}",authenticate(username, password).unwrap());
    //create_user("test", "test_create", "test_first", "test_last").unwrap();
    //println!("{}", authenticate("test", "test_create").unwrap());
    Ok(())
}


fn authenticate(username: &str, password: &str) -> Result<bool, Error> {
    
    info!("Authenticating user: {}", username);

    let conn = Connection::connect(SQL_USERNAME,SQL_PASSWORD, "")?;
    let mut stmt = conn.statement("select password, salt from student where net_id = :1").build()?;
    let row = stmt.query_row_as::<(String, String)>(&[&username])?;
    
    
    let true_pword = row.0;
    let salt = row.1;

    let mut hasher = Sha256::new();
    hasher.update(password);
    hasher.update(salt);
    let hash = hasher.finalize();

    let mut tmp: String = String::new();
    for value in hash{
        tmp += &format!("{:x}", value); 
    }
    
    conn.close()?;


    if true_pword.eq(&tmp) {
        info!("User {} successfully authenticated", username);
        Ok(true)
    }
    else{
        warn!("User {} failed authentication", username);
        Ok(false)
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

#[get("/")]
async fn index() -> impl Responder {
    HttpResponse::Ok().body("Hello world!")
}

#[get("/login")]
async fn login(json: Json<Login>) -> Result<String, actix_web::Error> {
    Ok(format!("{} {}", json.net_id, json.password))
}

#[get("/{net_id}/home")]
async fn homepage(path: web::Path<String>) -> impl Responder {
    let net_id = path.into_inner();
    HttpResponse::Ok().body(format!("You have reached the homepage of {} user", net_id) )
}

#[get("/{net_id}/plans")]
async fn plan_page(path: web::Path<String>) -> impl Responder {
    let net_id = path.into_inner();
    HttpResponse::Ok().body(format!("You have reached the plan page of {}", net_id))
}
