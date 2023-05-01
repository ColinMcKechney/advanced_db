use serde::{Serialize, Deserialize};
use log::{error, info};
use actix_web::{self, Responder, web::Json, HttpResponse};
use oracle::{Connection, Result};
use crate::config::{ORACLE_PASS, ORACLE_USER, ORACLE_CON_STR};

#[derive(Serialize, Deserialize, Debug, Default)]
pub struct ItemData{
    net_id: String,
    item_name: String,
    calories: Option<f32>,
    fat_g: Option<f32>,
    sat_fat_g: Option<f32>,
    trans_fat_g: Option<f32>,
    carbs_g: Option<f32>,
    fiber_g: Option<f32>,
    sugar_g: Option<f32>,
    protein_g: Option<f32>,
    sodium_mg: Option<f32>,
    potassium_mg: Option<f32>,
    cholesterol_mg: Option<f32>
}

pub async fn week(item: Json<ItemData>) -> impl Responder {

    let item = item.into_inner();
    match add_item(&item) {
        Ok(_) => HttpResponse::Ok(),
        Err(e) => {
            error!("Unable to add item to table {}: {}", item.net_id, e);
            HttpResponse::InternalServerError()
        }
    }
}

fn add_item(item: &ItemData) ->  Result<()> {
    let conn = Connection::connect(ORACLE_USER, ORACLE_PASS, ORACLE_CON_STR)? ;

    let mut stmt = conn.statement(format!("insert into {} values (NULL, NULL, :item_name,
    :calories,
    :fat_g,
    :sat_fat_g,
    :trans_fat_g,
    :carbs_g,
    :fiber_g,
    :sugar_g,
    :protein_g,
    :sodium_mg,
    :potassium_mg,
    :cholesterol_mg,
    0)", item.net_id).as_str()).build()?;

    stmt.execute_named(&[("item_name", &item.item_name),
    ("calories", &item.calories),
    ("fat_g", &item.fat_g),
    ("sat_fat_g", &item.sat_fat_g),
    ("trans_fat_g", &item.trans_fat_g),
    ("carbs_g", &item.carbs_g),
    ("fiber_g", &item.fiber_g),
    ("sugar_g", &item.sugar_g),
    ("protein_g", &item.protein_g),
    ("sodium_mg", &item.sodium_mg),
    ("potassium_mg", &item.potassium_mg),
    ("cholesterol_mg", &item.cholesterol_mg)])?;

    conn.commit()?;
    conn.close()?;
    info!("Added item {} to table {}", item.item_name, item.net_id);
    Ok(())

}
