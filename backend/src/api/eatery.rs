use serde::{Serialize, Deserialize};
use actix_web::{web::Path, Responder, HttpResponse, web::Json};
use oracle::Connection;
use log::error;

const ORACLE_USER: &str = "timmy";
const ORACLE_PASS: &str = "timmy";

#[derive(Serialize, Deserialize, Debug, Default)]
struct FoodItem {
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
    

pub async fn menu(eatery: Path<String>) -> impl Responder {
    let eatery = eatery.into_inner();
    let response = match grab_rows(eatery) {
        Ok(r) => r,
        Err(e) => {
            error!("Failed to grab rows: {}", e);
            return HttpResponse::InternalServerError();
        }
    };

    Json(response);
    HttpResponse::Ok()

}


fn grab_rows(eatery: String) -> oracle::Result<Vec<FoodItem>> {

    let conn = Connection::connect(ORACLE_USER, ORACLE_PASS, "")?;

    let mut stmt = conn.statement("select * from menu_item natural join nutrition_info food where menu_item.eatery_id = :1").build()?;


    let rows = stmt.query(&[&eatery])?;
    let mut row_vec: Vec<FoodItem> = vec![];

    for row_result in rows {
        let row = row_result?;
        row_vec.push( FoodItem {
            item_id: row.get(0)?,
            eatery_id: row.get(1)?,
            item_name: row.get(2)?,
            serving_size: row.get(3)?,
            calories: row.get(4)?,
            fat: row.get(5)?,
            sat_fat: row.get(6)?,
            trans_fat: row.get(7)?,
            carbs: row.get(8)?,
            fiber: row.get(9)?,
            sugar: row.get(10)?,
            protein: row.get(11)?,
            sodium: row.get(12)?,
            potassium: row.get(13)?,
            cholesterol: row.get(14)?});
    }

    Ok(row_vec)
}
