import React from 'react';

export const Card = ({id,fruit, turnCard,className,clickable})=>{
    const cardStyle = {
        backgroundPosition:fruit.position
    }
  
    return <div className={className} onClick= {turnCard} key={id} style={cardStyle}></div>
}