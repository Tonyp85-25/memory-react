import React from 'react';
import {Card} from './card';
import {fruits, setPosition ,shuffle} from '../data'
import {turnOn} from '../store/ducks/card'

const cards = []
    for (let index = 0; index < 2; index++) {
      for (let i = 0; i < 14; i++) {
        cards.push({
            fruit:{name:fruits[i],position:setPosition(fruits,fruits[i])},
            action: turnOn,
            className :'card',
            clickable: true
        })
        //Card({id:i*index, fruit:{name:fruits[i],position:setPosition(fruits,fruits[i])}});  
      }  
    }
    shuffle(cards) 

export const Board = () => {
    return <div className= "board"> {cards.map( (ele,idx)=>
      Card({id:idx, fruit:{name:ele.fruit.name,position:ele.fruit.position}, turnCard:ele.action, className:ele.className, clickable:ele.clickable}))}</div>
  }
  
  