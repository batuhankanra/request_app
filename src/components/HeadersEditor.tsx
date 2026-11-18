import React from 'react'
import { btn, field } from './styles'

const HeadersEditor:React.FC<HeaderEditorProps> = ({headers,onChange}) => {
    const update=(i:number,patch:Partial<KV>)=>onChange(headers.map((h,idx)=>(idx===i ? {...h,...patch}:h)))

    const remove=(i:number)=>onChange(headers.filter((_,idx)=>idx!==i))

    const add =()=>onChange([...headers,{key:"",value:"",enabled:true}])

  return (
    <div className='space-y-2'>
        {headers.map((h,i)=>(
            <div className="flex items-center gap-2" key={i}>
                <input type="checkbox" className='size-4 accent-orange-500' checked={h.enabled} onChange={e=>update(i,{enabled:e.target.checked})} />
                <input className={`${field}`} placeholder="Key" value={h.key} onChange={e=>update(i,{key:e.target.value})} />
                <input className={`${field}`} placeholder="Value" value={h.value} onChange={e=>update(i,{value:e.target.value})} />
                <button className={btn} onClick={()=>remove(i)}>X</button>
            </div>
        ))}
        <button className={btn} onClick={add} >
            + Header add
        </button>

    </div>
  )
}

export default HeadersEditor