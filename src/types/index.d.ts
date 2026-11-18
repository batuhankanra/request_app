
type Method = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";

interface KV {
  key: string;
  value: string;
  enabled: boolean;
}

interface RequestConfig {
  method: Method;
  url: string;
  headers: KV[];
  body: string;
}

interface ResponseResult {
  status: number;
  status_text: string;
  headers: [string, string][];
  body: string;
  time_ms: number;
  size_bytes: number;
}

type Tab = "headers" | body


interface UrlProps{
  method:Method
  url:string
  loading:boolean
  onMethodChange:(m:Method)=>void
  onUrlChange:(url:string)=>void
  onSend:()=>void
}
