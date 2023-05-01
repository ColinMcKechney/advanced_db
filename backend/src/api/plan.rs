use serde::{Serialize, Deserialize};
use actix_web::{web::{Json, Path}, Responder, HttpResponse};
use oracle::{Connection, Result};
use log::{error, info};
use crate::config::{ORACLE_PASS, ORACLE_USER, ORACLE_CON_STR};

#[derive(Deserialize, Serialize, Debug, Default)]
pub struct PlanData{
    net_id: String,
    week_date: String,
    total_cal: Option<f32>,
    total_fat: Option<f32>,
    total_sat_fat: Option<f32>,
    total_trans_fat: Option<f32>,
    total_carbs: Option<f32>,
    total_fiber: Option<f32>,
    total_sugar: Option<f32>,
    total_protein: Option<f32>,
    total_sodium: Option<f32>,
    total_potassium: Option<f32>,
    total_cholesterol: Option<f32>
}

pub async fn plan(body: Json<PlanData>) -> impl Responder {
   let body = body.into_inner();
   match create_plan(body) {
       Ok(_) => HttpResponse::Ok(),
       Err(e) => {
           error!("failed to create plan {}", e);
           HttpResponse::InternalServerError()
       }
   }

}

pub async fn plan_lookup(net_id: Path<String>) -> Json<PlanData> {
    
    let net_id = net_id.into_inner();

    match plan_search(&net_id) {
        Ok(plan) => Json(plan),
        Err(e) => {
            error!("failed to grab plan from {}: {}", net_id, e);
            Json(PlanData::default())
        }
    }

}

fn create_plan(plan: PlanData) -> Result<()> {

    let conn = Connection::connect(ORACLE_USER, ORACLE_PASS, ORACLE_CON_STR)?;

    let mut stmt = conn.statement("insert into goal values(:net_id, :week_date, :total_cal, :total_fat, :total_sat_fat, :total_trans_fat, :total_carbs, :total_fiber, :total_sugar, :total_protein, :total_sodium, :total_potassium, :total_cholesterol)").build()?;

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

    info!("Created new plan for user: {}", plan.net_id);
    conn.commit()?;
    conn.close()?;
    Ok(())

}


fn plan_search(net_id: &str) -> Result<PlanData> {

    let conn = Connection::connect(ORACLE_USER, ORACLE_PASS, ORACLE_CON_STR)?;

    let mut stmt = conn.statement("select * from goal where net_id = :1 and ROWNUM = 1 order by date").build()?;

    let row = stmt.query_row(&[&net_id])?;


    let plan: PlanData = PlanData { 
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
        total_cholesterol: row.get(12).unwrap_or(None) 
    };


    Ok(plan)

}
