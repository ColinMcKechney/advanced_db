use serde::{Serialize, Deserialize};
use actix_web::{web::Json, Responder, HttpResponse};
use oracle::{Connection, Result};
use log::{error, info};
use crate::config::{ORACLE_PASS, ORACLE_USER, ORACLE_CON_STR};

#[derive(Deserialize, Serialize, Debug, Default)]
struct PlanData{
    net_id: String,
    total_cal: f32,
    total_fat: f32,
    total_sat_fat: f32,
    total_trans_fat: f32,
    total_carbs: f32,
    total_fiber: f32,
    total_sugar: f32,
    total_protein: f32,
    total_sodium: f32,
    total_potassium: f32,
    total_cholesterol: f32
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

fn create_plan(plan: PlanData) -> Result<()> {

    let conn = Connection::connect(ORACLE_USER, ORACLE_PASS, ORACLE_CON_STR)?;

    let mut stmt = conn.statement("insert into table goal values(:net_id, :total_cal, :total_fat, :total_sat_fat, :total_trans_fat, :total_carbs, :total_fiber, :total_sugar, :total_protein, :total_sodium, :total_potassium, :total_cholesterol)").build()?;

    stmt.execute_named(&[("net_id", &plan.net_id), ("total_cal", &plan.total_cal), 
    ("total_fat", &plan.total_fat),
    ("total_sat_fat", &plan.total_sat_fat),
    ("total_trans_fat", &plan.total_trans_fat),
    ("total_carbs", &plan.total_carbs),
    ("total_sugar", &plan.total_sugar),
    ("total_protein", &plan.total_protein),
    ("total_potassium", &plan.total_potassium),
    ("total_cholesterol", &plan.total_cholesterol)])?;

    info!("Created new plan for user: {}", plan.net_id);
    Ok(())

}

