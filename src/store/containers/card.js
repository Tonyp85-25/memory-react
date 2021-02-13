import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {Card} from '../../components/card'
import {turnOn} from '../ducks/card'

export const Card = ({id,fruit, turnCard,className,clickable})=>{
    const cardStyle = {
        backgroundPosition:fruit.position
    }
  
    return <div className={className} onClick= {turnCard} key={id} style={cardStyle}></div>
}

const mapStateToProps = (state,ownProps) => ({
    id: state.id,
    className: state.className,
    clickable: state.clickable
})

const mapDispatchToProps = dispatch =>({
    turnCard :bindActionCreators({turnOn},dispatch)    
})

/* Container*/ 
 export const cardContainer = connect(mapStateToProps, mapDispatchToProps)(Card)