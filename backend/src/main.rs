use log::{info, warn, error};
use env_logger::Env;
use actix_web::{web, get, post, web::Json, App, HttpResponse, HttpServer, Responder, middleware, cookie::Key};
use serde::{Deserialize, Serialize};
use actix_cors::Cors;
use actix_identity::IdentityMiddleware;
use actix_session::{SessionMiddleware, storage::CookieSessionStore};

mod api;

static PORT: u16 = 5000;
const ALLOWED_ORIGIN: &str = "http://localhost";


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

    let secret_key = Key::generate();

    let _ = HttpServer::new(move || {
        App::new()
            .wrap(middleware::Logger::default())
            .wrap(
                Cors::default()
                .allowed_origin(ALLOWED_ORIGIN)
                .allowed_methods(vec!["GET","POST","DELETE"])
                .supports_credentials()
                )
            .wrap(IdentityMiddleware::default())
            .wrap(SessionMiddleware::new(CookieSessionStore::default(), secret_key.clone()))
            .service(
                web::scope("/api")
                .service(
                    web::resource("/auth")
                        .route(web::post().to(api::user::login))
                        .route(web::delete().to(api::user::logout))
                )
                .service(
                    web::resource("/signup")
                    .route(web::post().to(api::user::signup))
                )
                .route("/", web::get().to(api_index))
            )
            .route("/", web::get().to(index))
    })    
    .bind(("127.0.0.1", PORT))?
    .run()
    .await;

    Ok(())
}

async fn api_index() -> impl Responder {
    HttpResponse::Ok().body("api")
}
async fn index() -> impl Responder {
    HttpResponse::Ok().body("/")
}

