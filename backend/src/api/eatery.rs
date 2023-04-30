use serde::{Serialize, Deserialize};
use actix_web::{web::Path, Responder, HttpResponse, web::Json};
use oracle::Connection;
use log::error;
use crate::config::{ORACLE_USER, ORACLE_PASS, ORACLE_CON_STR};

#[derive(Serialize, Deserialize, Debug, Default)]
pub struct FoodItem {
    item_id: u32,
    eatery_id: Option<u32>,
    item_name: Option<String>,
    serving_size: Option<String>,
    calories: Option<f32>,
    fat: Option<f32>,
    sat_fat: Option<f32>,
    trans_fat: Option<f32>,
    carbs: Option<f32>,
    fiber: Option<f32>,
    sugar: Option<f32>,
    protein: Option<f32>,
    sodium: Option<f32>,
    potassium: Option<f32>,
    cholesterol: Option<f32>
}
    

pub async fn menu(eatery: Path<String>) -> Json<Vec<FoodItem>> {
    let eatery = eatery.into_inner();
    let response = match grab_rows(eatery) {
        Ok(r) => r,
        Err(e) => {
            error!("Failed to grab rows: {}", e);
            return Json(vec![]);
        }
    };

   Json(response)

}


fn grab_rows(eatery: String) -> oracle::Result<Vec<FoodItem>> {

    let conn = Connection::connect(ORACLE_USER, ORACLE_PASS, ORACLE_CON_STR)?;

    let mut stmt = conn.statement("select * from menu_item natural join nutrition_info where eatery_id = :1").build()?;


    let rows = stmt.query(&[&eatery])?;
    let mut row_vec: Vec<FoodItem> = vec![];

    for row_result in rows {
        let row = row_result?;
        row_vec.push( FoodItem {
            item_id: row.get(0)?,
            eatery_id: row.get(1).unwrap_or(None),
            item_name: row.get(2).unwrap_or(None),
            serving_size: row.get(3).unwrap_or(None),
            calories: row.get(4).unwrap_or(None),
            fat: row.get(5).unwrap_or(None),
            sat_fat: row.get(6).unwrap_or(None),
            trans_fat: row.get(7).unwrap_or(None),
            carbs: row.get(8).unwrap_or(None),
            fiber: row.get(9).unwrap_or(None),
            sugar: row.get(10).unwrap_or(None),
            protein: row.get(11).unwrap_or(None),
            sodium: row.get(12).unwrap_or(None),
            potassium: row.get(13).unwrap_or(None),
            cholesterol: row.get(14).unwrap_or(None)});
    }

    Ok(row_vec)
}
