import { combineReducers } from 'redux'
import {cards} from './card'
import {board} from './board'

export const memoryApp = combineReducers({
    cards,
    board
})