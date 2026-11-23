
export function toPayload(cfg:RequestConfig):RequestPayload{
    return{
        method:cfg.method,
        url:cfg.url,
        headers:cfg.headers.filter(h=>h.enabled && h.key.trim()).map(({key,value})=>({key:key.trim(),value:value})),
        body:cfg.method !== "GET" && cfg.body.trim() !== "" ? cfg.body : null,
        

    }
}

export async function  sendRequest(cfg:RequestConfig):Promise<ResponseResult> {
    let res:Response
    try{
        res = await fetch("/api/proxy",{
            method:"post",
            headers:{"Content-Type":"application/json"},
            body:JSON.stringify(toPayload(cfg))
        })
    }catch{
        throw new Error("Backende ulaşılmadı 'cargo run ' ile başlatın")
    }
    if (!res.ok) {
        throw new Error((await res.text()) || `Proxy hatası (${res.status})`);
    }

    return res.json();
}