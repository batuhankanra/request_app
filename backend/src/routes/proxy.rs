use actix_web::{post,web,HttpResponse};
use reqwest::{Client,Method};
use std::time::Instant;

use crate::{error::AppError,models::{Header,RequestPayload,ResponseResult}};



#[post("/proxy")]
pub async fn proxy(client:web::Data<Client>,payload:web::Json<RequestPayload>)->Result<HttpResponse,AppError>{
    let method= Method::from_bytes(payload.method.as_bytes()).map_err(|_| AppError::BadRequest("invalid method".into()))?;
    log::info!(
        "-> {} {} (header: {}, body: {} B)",
        payload.method,
        payload.url,
        payload.headers.len(),
        payload.body.as_ref().map_or(0, |b| b.len())
    );

    let mut req = client.request(method, &payload.url);
    for h in &payload.headers{
        req=req.header(&h.key, &h.value);
    }
    if let Some(body) = &payload.body{
        req = req.body(body.clone());
    }
    let start_time = Instant::now();
    let res = req.send().await?;
    let status = res.status();
    let headers:Vec<Header> = res.headers().iter().map(|(k,v)| Header{key:k.to_string(),value:v.to_str().unwrap_or("").to_string()}).collect();
    let bytes=res.bytes().await?;
    let time_ms = start_time.elapsed().as_millis();
    Ok(HttpResponse::Ok().json(ResponseResult{
        status:status.as_u16(),
        status_text:status.canonical_reason().unwrap_or("").to_string(),
        headers,
        size_bytes:bytes.len(),
        body:String::from_utf8_lossy(&bytes).into_owned(),
        time_ms,
    }))
}