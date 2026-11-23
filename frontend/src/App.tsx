import React from 'react'
import { sendRequest } from './lib/sendRequest'
import UrlBar from './components/UrlBar'
import RequestTabs from './components/RequestTabs'
import HeadersEditor from './components/HeadersEditor'
import BodyEditor from './components/Body'
import ResponseViewer from './components/ResponseViewer'

const App:React.FC = () => {
  const [method,setMethod] = React.useState<Method>("GET")
  const [url,setUrl] = React.useState<string>("")
  const [headers,setHeaders] = React.useState<KV[]>([
    {key:"Content-Type", value:"application/json",enabled:true}
  ])
  const [body,setBody] = React.useState<string>("")
  const [tab,setTab] = React.useState<Tab>("headers")
  const [loading,setLoading] = React.useState<boolean>(false)
  const [response,setResponse] = React.useState<ResponseResult | null>(null)
  const [error,setError] = React.useState<string | null> (null)


  const send = async ()=>{
    setLoading(true)
    setError(null)
    setResponse(null)
    try{
      setResponse(await sendRequest({method,url,headers,body}))
    }catch (e) {
      setError(e instanceof Error ? e.message : String(e))
    } finally {
      setLoading(false)
    }
  }
  return (
    <div className='min-h-screen bg-neutral-900 text-neutral-200'>
      <div className='mx-auto max-w-5xl space-y-4 p-4'>
        <UrlBar 
          method={method}
          url = {url}
          loading = {loading}
          onMethodChange={setMethod}
          onUrlChange={setUrl}
          onSend={send}
        />
        <RequestTabs tab={tab} onChange={setTab} />
        {tab === "headers" ? (
          <HeadersEditor  headers={headers} onChange={setHeaders}/>
        ) : (
          <BodyEditor body={body} onChange={setBody} />
        ) }

        <ResponseViewer response={response} error={error} />
      </div>

    </div>
  )
}

export default App