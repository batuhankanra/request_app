use actix_web::{http::StatusCode,HttpResponse,ResponseError};
use std::fmt;



#[derive(Debug)]
pub enum AppError{
    BadRequest(String),
    BadGateway(String)
}

impl fmt::Display for AppError {
    fn fmt(&self, f: &mut fmt::Formatter<'_>) -> fmt::Result {
        match self {
            AppError::BadRequest(m) | AppError::BadGateway(m)=>write!(f,"{m}"),
        }
    }
}

impl ResponseError for AppError {
    fn status_code(&self) -> StatusCode {
        match self {
            AppError::BadGateway(_)=>StatusCode::BAD_GATEWAY,
            AppError::BadRequest(_)=>StatusCode::BAD_REQUEST
        }
    }
    fn error_response(&self) -> HttpResponse<actix_web::body::BoxBody> {
        log::warn!("{} -> {}", self.status_code(), self);
        HttpResponse::build(self.status_code()).body(self.to_string())
    }
}

impl From<reqwest::Error> for AppError {
    fn from(value: reqwest::Error) -> Self {
        AppError::BadGateway(value.to_string())
    }
}