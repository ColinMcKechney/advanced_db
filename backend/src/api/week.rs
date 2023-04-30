use serde::{Serialize, Deserialize};
use log::{error, info};
use actix_web::{self, Responder};
use oracle::{Connection, Result};
use crate::config::{ORACLE_PASS, ORACLE_USER, ORACLE_CON_STR};


pub async fn week(item: ItemData) -> impl Responder {

}

fn add_item(item: ItemData) ->  Result<()> {

}
