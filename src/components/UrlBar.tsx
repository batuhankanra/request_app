import React from 'react'
import { field } from './styles'
import { METHODS } from '../constains'




const UrlBar:React.FC<UrlProps> = ({method,url,loading,onMethodChange,onUrlChange,onSend}) => {
  return (
    <div className='flex gap-2'>
        <select className={`${field} font-semibold`} value={method} onChange={e=>onMethodChange(e.target.value as Method)}>
            {METHODS.map(m=>(
                <option key={m}>{m}</option>
            ))}
        </select>
        <input className={`${field} flex-1`} value={url} onChange={e=>onUrlChange(e.target.value)} onKeyDown={e=>e.key==="Enter" && onSend()} placeholder='http://......com'/>
        <button className='cursor-pointer rounded bg-orange-600 px-5 py-2 text-sm font-semibold text-white hover:bg-orange-500 disabled:cursor-default disabled:opacity-50'
            onClick={onSend}
            disabled={loading || !url}
        >
            {loading ? "Loading" : "Send"}
        </button>
    </div>
  )
}

export default UrlBar