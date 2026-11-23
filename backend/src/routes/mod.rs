pub mod proxy;


use actix_web::web;



pub fn config(cfg:&mut web::ServiceConfig){
    cfg.service(web::scope("/api").service(proxy::proxy));
}