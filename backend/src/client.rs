use std::time::Duration;

use reqwest::{Client, redirect::Policy};




pub fn build()->Client{
    Client::builder()
        .timeout(Duration::from_secs(30))
        .redirect(Policy::limited(10))
        .build()
        .expect("Reqwest client error")
}