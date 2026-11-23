

import React from 'react'
import { field } from './styles'

const BodyEditor:React.FC<BodyEditorProps> = ({body,onChange}) => {
  return (
    <textarea className={`${field} w-full font-mono`} rows={10} value={body} onChange={e=>onChange(e.target.value)} placeholder='{"title":"foo"' />
  )
}

export default BodyEditor