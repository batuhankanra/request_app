
type Method = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";

interface Header{
  key:string
  value:string
}
interface KV  extends Header{
  enabled: boolean;
}

interface RequestConfig {
  method: Method;
  url: string;
  headers: KV[];
  body: string ;
}
interface RequestPayload {
  method: Method;
  url: string;
  headers: Header[];
  body: string | null;
}
interface ResponseResult {
  status: number;
  status_text: string;
  headers: Header[];
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

interface RequestTabProps{
  tab:Tab
  onChange:(tab:Tab)=>void
}

interface HeaderEditorProps{
  headers:KV[]
  onChange:(headers:KV[])=>void
}

interface BodyEditorProps{
  body:string
  onChange:(body:string)=>void
}

interface ResponseViewerProps{
  response:ResponseResult | null
  error:string | null
}