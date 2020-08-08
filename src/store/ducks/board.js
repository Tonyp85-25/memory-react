import {card} from './card'

export const board =(state ={cards:[], count:0, pair:[]}, action) => {
    switch(action.type){
        case 'TURN_CARD':
            return state.cards.map(t=>card(t,action), state.count+=1, state.pair.push(action.fruit))
        // case 'TURN_BACK':
        //     return [...state,card({},action)]
        default:
            return state
    }

}