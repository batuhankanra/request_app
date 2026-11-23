use serde::{Deserialize,Serialize};

#[derive(Debug,Deserialize,Serialize)]
pub struct Header{
    pub key:String,
    pub value:String
}

#[derive(Debug,Deserialize,Serialize)]
pub struct RequestPayload{
    pub method:String,
    pub url:String,
    pub headers:Vec<Header>,
    pub body:Option<String>
}

#[derive(Debug,Serialize)]
pub struct ResponseResult{
    pub status:u16,
    pub status_text:String,
    pub headers:Vec<Header>,
    pub body:String,
    pub time_ms:u128,
    pub size_bytes:usize
}