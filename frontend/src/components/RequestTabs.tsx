import React from 'react'

const TABS:{id:Tab,label:string}[]=[
    {id :"headers",label:"Headers"},
    {id:"body",label:"Body"},
]


const RequestTabs:React.FC<RequestTabProps> = ({tab,onChange}) => {
  return (
    <div className='flex border-b border-neutral-800'>
        {TABS.map(t=>(
            <button key={t.id} onClick={()=>onChange(t.id)} className={`cursor-pointer border-b-2 px-4 py-2 text-sm ${
            tab === t.id
              ? "border-orange-500 text-white"
              : "border-transparent text-neutral-400 hover:text-neutral-200"
          }`}>
                {t.label}
            </button>
        ))}
    </div>
  )
}

export default RequestTabs