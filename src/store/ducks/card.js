

const initCount = 0
const initialState = {id:undefined,className :'card',count:initCount ,clickable :true}

//action creator
export const turnOn =(id,initClickable)=>( {
    type:'TURN_ON',
    id: id,
    clickable: initClickable,
})

export const card = (initialState,action) => { 
    switch(action.type){
        case 'TURN_ON':
            if(action.clickable){
                return {id: action.id, className:'card image', count : initCount++ , clickable:false}
            }else{
                return initialState
            }
            
        // case 'TURN_BACK':
        //     return turnBack(action.id)
        default:
            return initialState
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
                return initialState
    }
}





