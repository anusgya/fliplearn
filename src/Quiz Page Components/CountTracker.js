import React from 'react'

export default function CountTracker({currentCount, totalCount}) {

    const style1={
        fontSize:'2.2rem',
        color:'white',

    }

    const style2={
        fontSize:'1rem',
        color:''
    }
  return (
    <div style={style1}>
      {currentCount}<span style={style2} >/{totalCount}</span>
    </div>
  )
}
