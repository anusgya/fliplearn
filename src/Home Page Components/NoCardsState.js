import React from 'react'
import {ReactComponent as EmptyState} from '../assets/EmptyState.svg' 

export default function NoCardsState() {
    const containerStyles={
        display:'flex',
        flexDirection:'column',
        alignItems:'center',
        alignSelf:'center',
        justifySelf:'center',
        gap:'20px',
        position:'relative',
        top:'10rem',
        left:'25rem',
        zIndex:'-10',
        
    }

    const descriptionStyles={
        fontSize:'1.75rem',
        opacity:'0.3',
        display:'flex',
        fontWeight:'450',
    }
  return (
    <div className='no-cards-container' style={containerStyles}>
      <EmptyState width='200' height='200' />
      <div style={descriptionStyles}>No Cards To Show</div>
    </div>
  )
}
