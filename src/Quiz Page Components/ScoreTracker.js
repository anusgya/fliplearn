import React from 'react'
import {ReactComponent as PinIcon } from '../assets/pin icon.svg'

export default function ScoreTracker({count}) {

    const containerStyles={
        height:'5rem',
        weight:'4rem',
        display:'flex',
        flexDirection:'column',
        justityContent:'center',
        alignItems:'center',
        backgroundColor:'white',
        padding:'0.5rem',
        borderRadius:'5px',
        position:'absolute',
        top:'30px',
        boxShadow:'box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25)', 
    }

  return (
    <div className='score-board' style={containerStyles} >
      <PinIcon/>
      <div style={{marginTop:'5px', color:'rgb(86, 86, 86)'}}>Total Score</div>
      <div style={{fontSize:'2rem'}}>{count}</div>
    </div>
  )
}
