use env_logger::Env;
use actix_web::{web, App, HttpResponse, HttpServer, Responder, middleware, cookie::Key};
use serde::{Deserialize, Serialize};
use actix_cors::Cors;
use actix_identity::IdentityMiddleware;
use actix_session::{SessionMiddleware, storage::CookieSessionStore};

mod api;
mod config;

static PORT: u16 = 8000;
const ALLOWED_ORIGIN: &str = "http://3.219.93.142:8009";


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
                .allow_any_header()
                .expose_any_header()
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
                .service(
                    web::resource("/eatery/{eatery_id}")
                    .route(web::get().to(api::eatery::menu))
                )
                .service(
                    web::resource("/goal")
                    .route(web::post().to(api::plan::plan))
                )
                .service(
                    web::resource("/goal/{net_id}")
                    .route(web::get().to(api::plan::plan_lookup))
                )
                .service(
                    web::resource("/week_plan")
                    .route(web::post().to(api::week::week))
                )
                .service(
                    web::resource("/week_meals")
                    .route(web::post().to(api::week::week_meals))
                    .route(web::delete().to(api::week::delete_meals))
                )
                .service(
                    web::resource("/week_progress/{net_id}")
                    .route(web::get().to(api::week::week_lookup))
                ) 
                .service(
                    web::resource("/menu_search")
                    .route(web::post().to(api::menu::menu_search))
                )
                .service(
                    web::resource("week_sum/{net_id}")
                    .route(web::get().to(api::week::week_sums))
                )
                .service(
                    web::resource("all_goal/{net_id}")
                    .route(web::get().to(api::plan::all_plan))
                )
                .service(
                    web::resource("result/{net_id}")
                    .route(web::get().to(api::result::all_result))
                )
                .service(
                    web::resource("/add_result")
                    .route(web::post().to(api::result::add_result))
                )
                .route("/", web::get().to(api_index))
            )
            .route("/", web::get().to(index))
    })    
    .bind(("0.0.0.0", PORT))?
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

