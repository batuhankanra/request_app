import React from 'react'


const prettyBody=(body:string)=>{
    try{
        return JSON.stringify(JSON.parse(body), null,2)
    }catch{
        return body
    }
}



const ResponseViewer:React.FC<ResponseViewerProps> = ({response,error}) => {
  return (
    <div className='space-y-3 pt-2'>
        {error && (
            <div className='rounded border border-red-900 bg-red-950/50 p-3 text-sm text-red-400'>
                Error: {error}
            </div>
        )}
        {response && (
            <>
                <div className='flex gap-4 text-sm'>
                    <span className={`font-semibold ${response.status<400 ? "text-green-500": "text-red-500"}`}>
                        {response.status}--{response.status_text}
                    </span>
                    <span className="text-neutral-400">{response.time_ms} ms</span>
                    <span className="text-neutral-400">{response.size_bytes} B</span>
                </div>
                <details className='rounded border border-neutral-800'>
                    <summary>
                        response headers ({response.headers.length})
                    </summary>
                    <pre className='overflow-auto bg-neutral-950 p-3 text-xs'>
                        {response.headers.map(([k,v])=>`${k}: ${v}`).join("\n")}
                    </pre>
                </details>
                <pre className='max-h-125 overflow-auto rounded bg-neutral-950 p-3 text-sm'>
                    {prettyBody(response.body)}
                </pre>

            </>
        )}
    </div>
  )
}

export default ResponseViewer