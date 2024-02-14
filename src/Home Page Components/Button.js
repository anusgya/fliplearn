import React from 'react'
import '../Buttons.css'

export default function Button({handleClick, className, value}) {
  return (
    <>
      <button className={className} onClick={handleClick} >{value}</button>
    </>
  )
}
