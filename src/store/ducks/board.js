import {cardReducer} from './card'

const board =(state =[], action) => {
    switch(action.type){
        case 'TURN_CARD':
            return state.map(t=>cardReducer(t,action))
        // case 'TURN_BACK':
        //     return [...state,card({},action)]
        default:
            return state
    }

}