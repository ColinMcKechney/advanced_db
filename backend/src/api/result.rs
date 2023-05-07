use log::error;
use actix_web::{web::Json, web::Path, Responder, HttpResponse};
use oracle::{Connection, Result};
use crate::{api::plan::PlanData, config::{ORACLE_USER, ORACLE_PASS, ORACLE_CON_STR}};



pub async fn  all_result(net_id: Path<String>) -> Json<Vec<PlanData>> {
    let net_id = net_id.into_inner();

    match get_result(&net_id){
        Ok(r) => Json(r),
        Err(e) => {
            error!("failed to get results for user {}: {}", net_id, e);
            Json(vec![])
        }
    }
}

pub async fn add_result(result: Json<PlanData>) -> impl Responder {
    let result = result.into_inner();

    match push_result(&result){
        Ok(_) => HttpResponse::Ok(),
        Err(e) => {
            error!("failed to add result for user {}: {}", result.net_id, e);
            HttpResponse::InternalServerError()
        }
    }
}


fn get_result(net_id: &str) -> Result<Vec<PlanData>> {

    let conn = Connection::connect(ORACLE_USER, ORACLE_PASS, ORACLE_CON_STR)?;
    let mut stmt = conn.statement("select * from result where net_id = :1").build()?;

    let rows = stmt.query(&[&net_id])?;
    let mut row_vec: Vec<PlanData> = vec![];
    for row_result in rows {
        let row = row_result?;

        row_vec.push(PlanData { 
            net_id: row.get(0)?, 
            week_date: row.get(1)?, 
            total_cal: row.get(2).unwrap_or(None),
            total_fat: row.get(3).unwrap_or(None),
            total_sat_fat: row.get(4).unwrap_or(None),
            total_trans_fat: row.get(5).unwrap_or(None),
            total_carbs: row.get(6).unwrap_or(None),
            total_fiber: row.get(7).unwrap_or(None),
            total_sugar: row.get(8).unwrap_or(None),
            total_protein: row.get(9).unwrap_or(None),
            total_sodium: row.get(10).unwrap_or(None),
            total_potassium: row.get(11).unwrap_or(None),
            total_cholesterol: row.get(12).unwrap_or(None) });
    }

    Ok(row_vec)
}


fn push_result(plan: &PlanData) -> Result<()> {
    let conn = Connection::connect(ORACLE_USER, ORACLE_PASS, ORACLE_CON_STR)?;
    let mut stmt = conn.statement("insert into result values(:net_id, :week_date, :total_cal, :total_fat, :total_sat_fat, :total_trans_fat, :total_carbs, :total_fiber, :total_sugar, :total_protein, :total_sodium, :total_potassium, :total_cholesterol)").build()?;

    stmt.execute_named(&[
    ("net_id", &plan.net_id), 
    ("week_date", &plan.week_date),
    ("total_cal", &plan.total_cal), 
    ("total_fat", &plan.total_fat),
    ("total_sat_fat", &plan.total_sat_fat),
    ("total_trans_fat", &plan.total_trans_fat),
    ("total_carbs", &plan.total_carbs),
    ("total_fiber", &plan.total_fiber),
    ("total_sugar", &plan.total_sugar),
    ("total_protein", &plan.total_protein),
    ("total_sodium", &plan.total_sodium),
    ("total_potassium", &plan.total_potassium),
    ("total_cholesterol", &plan.total_cholesterol)])?;

   Ok(()) 

}
