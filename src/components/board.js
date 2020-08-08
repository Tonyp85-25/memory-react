import React from 'react';
import {cardContainer} from '../store/containers/card';


export const Board = ({playedCards=[]}) => {
    return <div className= "board"> {playedCards.map( (ele,idx)=>
      cardContainer({id:ele.id, fruit:{name:ele.fruit.name,position:ele.fruit.position}, turnCard:ele.action, className:ele.className, clickable:ele.clickable}))}</div>
  }
  
  