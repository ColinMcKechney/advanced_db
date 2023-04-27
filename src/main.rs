use log::{info, warn, error};
use env_logger::Env;
use actix_web::{web, get, post, web::Json, App, HttpResponse, HttpServer, Responder};
use serde::{Deserialize, Serialize};
mod security;

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

    let _ = HttpServer::new( || {
        App::new()
            .service(index)
            .service(login)
            .service(homepage)
            .service(plan_page)
    })
    .bind(("0.0.0.0", PORT))?
    .run()
    .await;
    //Temporary for testing purposes, should write something to make a random salt
    let username = "cmckechn";
    let password = "password";

    //proof of concept tests, create_user should fail in this instance because user was already
    //created
    security::authenticate(username, password).unwrap();
    security::create_user("test", "test_create", "test_first", "test_last").unwrap();
    security::authenticate("test", "test_create").unwrap();
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
