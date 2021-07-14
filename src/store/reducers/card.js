

let initCount = 0
const initialState = {id:undefined,className :'card',count:initCount ,clickable :true}

//action creator
export const turnOn =(id,initClickable,fruit)=>( {
    type:'TURN_ON',
    id: id,
    clickable: initClickable,
    fruit
})

export const card = (state,action) => { 
    switch(action.type){
        case 'TURN_ON':
            if(action.clickable){
                return {id: action.id, className:'card image', clickable:false, fruit: action.fruit}
            }else{
                return state
            }
            
        // case 'TURN_BACK':
        //     return turnBack(action.id)
        default:
            return state
    }
}


export const cards = (state = [], action) => {
    switch (action.type){
        case 'TURN_ON':
            if (action.clickable){
                return [ ...state,card(undefined,action)]
            }else{               
                return state
            }
        default:
                return state
    }
}





