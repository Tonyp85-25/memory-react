import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { createStore } from 'redux';
import { Provider } from 'react-redux'
import { memoryApp } from './store/ducks';
import {fruits, setPosition ,shuffle} from './data'
import {turnOn} from './store/ducks/card'

const pcards = []
    for (let index = 0; index < 2; index++) {
      for (let i = 0; i < 14; i++) {
        pcards.push({
            id : (index+1)*(i+1),
            fruit:{name:fruits[i],position:setPosition(fruits,fruits[i])},
            action: turnOn,
            className :'card',
            clickable: true
        })
        //Card({id:i*index, fruit:{name:fruits[i],position:setPosition(fruits,fruits[i])}});  
      }  
    }
    shuffle(pcards)
const initState = {cards:{pcards}/*, pairs:['',''], count:0*/}
const store = createStore(memoryApp,initState)

ReactDOM.render(
  <Provider store={store}>
    <App></App>
  </Provider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
