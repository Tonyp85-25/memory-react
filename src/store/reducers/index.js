import { combineReducers } from 'redux'
import {cards} from './card'
import {count} from './count'

export const memoryApp = combineReducers({
    cards,
    count,
})