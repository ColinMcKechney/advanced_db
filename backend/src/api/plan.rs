use serde::{Serialize, Deserialize};
use actix_web::{web::Json, Responder, HttpResponse};
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

