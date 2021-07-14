

export default function (state =0, action) {
    switch(action.type){
        case 'TURN_CARD':
            return state++
        // case 'TURN_BACK':
        //     return [...state,card({},action)]
        default:
            return state
    }

}