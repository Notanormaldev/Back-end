import React from 'react'

function Formgroup({label,placeholder}) {
  return (
      <div className="formgroup">
                    <label htmlFor={label}>{label}</label>
                    <input type={label} placeholder={placeholder} id={label} name={label} required />
                </div>
  )
}

export default Formgroup
