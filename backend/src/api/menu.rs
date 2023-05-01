use oracle::{Result, Connection};
use serde::{Serialize, Deserialize};
use log::{info, error};
use actix_web::{web::Json};

use crate::config::{ORACLE_USER, ORACLE_PASS, ORACLE_CON_STR};

#[derive(Serialize, Deserialize, Debug, Default)]
pub struct SearchTerm{
    search_term: String
}

#[derive(Serialize, Deserialize, Debug, Default)]
pub struct SearchResults {
    results: Vec<SearchResult>
}

#[derive(Serialize, Deserialize, Debug, Default)]
pub struct SearchResult {
    item_name: Option<String>,
    item_id: u32,
    eatery_id: Option<u32>,
    serving_size: Option<String>
}

pub async fn menu_search(term: Json<SearchTerm>) -> Json<SearchResults> {

    let term = term.into_inner();

    match fuzzy_search(&term.search_term) {
        Ok(result) => Json(result),
        Err(e) => {
            error!("failed to search for {}: {}", term.search_term, e);
            Json(SearchResults::default())
        }
    }

}

fn fuzzy_search(term: &str) -> Result<SearchResults> {
    let conn = Connection::connect(ORACLE_USER,ORACLE_PASS,ORACLE_CON_STR)?;
    let mut stmt = conn.statement(format!("select * from menu_item where item_name like '{}%'", term).as_str()).build()?;
    
    let rows = stmt.query(&[])?;

    let mut rows_vec = SearchResults::default();

    for row_result in rows{
        let row = row_result?;
        rows_vec.results.push( SearchResult {
        item_name: row.get(0).unwrap_or(None),
        item_id: row.get(1)?,
        eatery_id: row.get(2).unwrap_or(None),
        serving_size: row.get(3).unwrap_or(None)
        });
    }
    conn.close()?;

    Ok(rows_vec)

}

