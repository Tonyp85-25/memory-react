import { combineReducers } from 'redux'
import {cards} from './card'

export const memoryApp = combineReducers({
    cards,
})