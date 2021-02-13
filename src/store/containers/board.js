import { connect } from 'react-redux';
//import { bindActionCreators } from 'redux';

import React from 'react';
//import {cardContainer} from '../store/containers/card';


export const Board = ({playedCards=[]}) => {
    return <div className="board"> {/*playedCards.map( (ele,idx)=>
    cardContainer({id:ele.id, fruit:{name:ele.fruit.name,position:ele.fruit.position}, turnCard:ele.action, className:ele.className, clickable:ele.clickable}))*/}</div>
  }
  
// const mapStateToProps = (state,ownProps) => ({
//     cards : state.cards,
//     pairs : state.pairs
// })

// const mapDispatchToProps = dispatch =>({
        
// })

export default /*connect(mapStateToProps,mapDispatchToProps)*/(Board)