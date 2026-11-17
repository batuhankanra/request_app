
export async function  sendRequest(cfg:RequestConfig):Promise<ResponseResult> {
    const headers = new Headers()
    cfg.headers.filter(h=>h.enabled && h.key.trim()).forEach(h=>headers.append(h.key.trim(),h.value))

    const hashBody = cfg.method!=="GET" && cfg.body.trim() !==""

    const startDate = performance.now()

    const res = await fetch(cfg.url,{
        method:cfg.method,
        headers,
        body: hashBody ? cfg.body : undefined
    })
    const text = await res.text()
    const time_ms = Math.round(performance.now()-startDate)

    return {
        status:res.status,
        status_text:res.statusText,
        headers:Array.from(res.headers.entries()),
        body:text,
        time_ms,
        size_bytes:new TextEncoder().encode(text).length
    }
}