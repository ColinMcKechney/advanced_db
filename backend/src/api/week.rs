use serde::{Serialize, Deserialize};
use log::{error, info};
use actix_web::{self, Responder, web::{Json, Path}, HttpResponse};
use oracle::{Connection, Result};
use crate::config::{ORACLE_PASS, ORACLE_USER, ORACLE_CON_STR};

#[derive(Serialize, Deserialize, Debug, Default)]
pub struct ItemData{
    net_id: String,
    item_name: String,
    amount: Option<f32>,
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

#[derive(Serialize, Deserialize, Debug, Default)]
pub struct MenuItems {
    net_id: String,
    item_list: Vec<u32>
}

#[derive(Serialize, Deserialize, Debug, Default)]
pub struct ItemResult{
    item_id: Option<u32>,
    amount: Option<u32>,
    item_name: Option<String>,
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

pub async fn week_meals(items: Json<MenuItems>) -> impl Responder {
    let items = items.into_inner();
    let netid = items.net_id.clone();

    match add_menu_items(items) {
        Ok(_) => HttpResponse::Ok(),
        Err(e) => {
            error!("Unable to add menu items to table {}: {}", netid, e);
            HttpResponse::InternalServerError()
        }
    }
}

pub async fn week_lookup(net_id: Path<String>) -> Json<Vec<ItemResult>> {

    let net_id = net_id.into_inner();

    match get_week(&net_id) {
        Ok(week) => Json(week),
        Err(e) => {
            error!("failed to grab week info from {}: {}", net_id, e);
            Json(vec![])
        }
    }

}


fn add_item(item: &ItemData) ->  Result<()> {
    let conn = Connection::connect(ORACLE_USER, ORACLE_PASS, ORACLE_CON_STR)? ;

    let mut stmt = conn.statement(format!("insert into {} values (NULL, :amount, :item_name,
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

    stmt.execute_named(&[
    ("amount", &item.amount),
    ("item_name", &item.item_name),
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


fn add_menu_items(items: MenuItems) -> Result<()> {
    let conn = Connection::connect(ORACLE_USER,ORACLE_PASS, ORACLE_CON_STR)?;

    let mut stmt = conn.statement(format!("insert into {} values (
    :item_id,
    NULL,
    NULL,
    NULL,
    NULL,
    NULL,
    NULL, 
    NULL,
    NULL,
    NULL,
    NULL,
    NULL,
    NULL,
    NULL,
    1)", items.net_id).as_str()).build()?;

    for item in items.item_list {
        stmt.execute_named(&[("item_id",&item)])?;
    }

    conn.commit()?;
    conn.close()?;
    info!("inserted menu items into week table {}", items.net_id);
    Ok(())
}


fn get_week(net_id: &str) -> Result<Vec<ItemResult>> {
    
    let conn = Connection::connect(ORACLE_USER, ORACLE_PASS, ORACLE_CON_STR)?;
    let mut stmt = conn.statement(format!("select * from {}", net_id).as_str()).build()?;

    let rows = stmt.query(&[])?;
    let mut week = vec![];

    for row_result in rows {
        let row = row_result?;
        week.push( ItemResult { 
            item_id: row.get(0).unwrap_or(None), 
            amount: row.get(1).unwrap_or(None),
            item_name: row.get(2).unwrap_or(None),
            calories: row.get(3).unwrap_or(None),
            fat_g: row.get(4).unwrap_or(None),
            sat_fat_g: row.get(5).unwrap_or(None),
            trans_fat_g: row.get(6).unwrap_or(None),
            carbs_g: row.get(7).unwrap_or(None),
            fiber_g: row.get(8).unwrap_or(None),
            sugar_g: row.get(9).unwrap_or(None),
            protein_g: row.get(10).unwrap_or(None),
            sodium_mg: row.get(11).unwrap_or(None),
            potassium_mg: row.get(12).unwrap_or(None),
            cholesterol_mg: row.get(13).unwrap_or(None) });
    }
    Ok(week)


}
