import React from 'react'

function Formgroup({label,placeholder,value,onchange}) {
  return (
      <div className="formgroup">
                    <label htmlFor={label}>{label}</label>
                    <input type={label} value={value} onChange={onchange} placeholder={placeholder} id={label} name={label} required />
                </div>
  )
}

export default Formgroup
