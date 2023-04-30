use serde::{Serialize, Deserialize};
use actix_web::{web::Path, Responder, HttpResponse};
use oracle::{Connection, Error};
use log::{error};

const ORACLE_USER: &str = "timmy";
const ORACLE_PASS: &str = "timmy";

#[derive(Serialize, Deserialize, Debug, Default)]
struct food_item {
    item_id: u32,
    eatery_id: u32,
    item_name: String,
    serving_size: f32,
    calories: f32,
    fat: f32,
    sat_fat: f32,
    trans_fat: f32,
    carbs: f32,
    fiber: f32,
    sugar: f32,
    protein: f32,
    sodium: f32,
    potassium: f32,
    cholesterol: f32
}
    

pub fn menu(eatery: Path<String>) -> impl Responder {
    let eatery = eatery.into_inner();
    let conn = match Connection::connect(ORACLE_USER, ORACLE_PASS, "") {
        Ok(c) => c,
        Err(e) => {
            error!("Unable to reach oracle server: {}", e);
            return HttpResponse::InternalServerError();
        }
    };

    let mut stmt = match conn.statement("select * from menu_item natural join nutrition_info food where menu_item.eatery_id = :1").build() {
        Ok(s) => s,
        Err(e) => {
            error!("Unable to build statement: {}", e);
            return HttpResponse::InternalServerError();
        }
    };


    let rows = stmt.query(&[&eatery]).unwrap().collect();
    println!("{}", rows);
    HttpResponse::Ok()

}
