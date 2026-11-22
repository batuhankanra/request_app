
export function toPayload(cfg:RequestConfig):RequestPayload{
    return{
        method:cfg.method,
        url:cfg.url,
        headers:cfg.headers.filter(h=>h.enabled && h.key.trim()).map(({key,value})=>({key:key.trim(),value:value})),
        body:cfg.method !== "GET" && cfg.body.trim() !== "" ? cfg.body : null,
        

    }
}

export async function  sendRequest(cfg:RequestConfig):Promise<ResponseResult> {
    const payload =toPayload(cfg)
    const headers = new Headers()
    payload.headers.forEach(h=>headers.append(h.key.trim(),h.value))

 

    const startDate = performance.now()

    const res = await fetch(cfg.url,{
        method:cfg.method,
        headers,
        body: payload.body ??  undefined
    })
    const text = await res.text()
    const time_ms = Math.round(performance.now()-startDate)
    return {
        status:res.status,
        status_text:res.statusText,
        headers:Array.from(res.headers.entries()).map(([key,value])=>({key,value})),
        body:text,
        time_ms,
        size_bytes:new TextEncoder().encode(text).length
    }
}