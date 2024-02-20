import React from 'react'

const InputField = ({
    placeHolder,
    
    type,
    name
}) => {
  return (
    <input name={name} type={type} className='outline-none px-5 py-3 rounded-md border border-slate-600 my-4 w-full' placeholder={placeHolder} />
  )
}

export default InputField
