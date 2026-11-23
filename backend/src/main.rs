use actix_files::{Files, NamedFile};
use actix_web::{App, HttpServer, web};

mod client;
mod error;
mod models;
mod routes;

#[actix_web::main]
async  fn main()->std::io::Result<()> {
    dotenvy::dotenv().ok();
    env_logger::init_from_env(env_logger::Env::default().default_filter_or("info"));
    let dist=std::env::var("DIST_DIR").unwrap_or_else(|_| "../dist".into());
    let port:u16 = std::env::var("PORT").ok().and_then(|p| p.parse().ok()).unwrap_or(4001);
    
    let index_path = format!("{dist}/index.html");
    let http_client = actix_web::web::Data::new(client::build());
    log::info!("server starting: http://localhost:{port} (dist: {dist})");
    
    HttpServer::new(move || {
        let index = index_path.clone();
        App::new()
            .app_data(http_client.clone())
            .configure(routes::config)
            .service(Files::new("/", dist.clone()).index_file("index.html"))
            .default_service(web::to(move || {
                let index = index.clone();
                async move { NamedFile::open(index) }
            }))
    })
    .bind(("0.0.0.0", port))?
    .run()
    .await
    
}
