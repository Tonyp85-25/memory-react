import { Dispatch } from "react";
import { ActionTypes } from "./actions";

import { Difficulty } from "./components/App";
import { GAME_DURATION } from "./components/Timer";
import {
  CurrentFruit,
  DispatchFn,
  FruitName,
  GameAction,
  LimitedArray,
  fruits,
} from "./types";

/**
 * @source https://gist.github.com/astoilkov/013c513e33fe95fa8846348038d8fe42?permalink_comment_id=3377800#gistcomment-3377800
 */
export function withThunk(dispatch: Dispatch<GameAction>) {
  return (actionOrThunk: GameAction | DispatchFn) =>
    typeof actionOrThunk === "function"
      ? actionOrThunk(dispatch)
      : dispatch(actionOrThunk);
}

export function checkCards(
  currentFruits: LimitedArray<CurrentFruit>,
  index: number,
): DispatchFn {
  return function (dispatch: Dispatch<GameAction>) {
    dispatch({ type: ActionTypes.TURN_UP, index });
    if (currentFruits.isFull()) {
      dispatch({ type: ActionTypes.BEFORE_CHECK });
      setTimeout(() => {
        dispatch({ type: ActionTypes.CHECK_CARDS });
      }, 1000);
    }
  };
}

export function checkTime(difficulty: Difficulty) {
  return function (dispatch: Dispatch<GameAction>) {
    setTimeout(() => {
      dispatch({ type: ActionTypes.TIME_UP });
    }, GAME_DURATION[difficulty]);
  };
}
const SPRITE_SPACE = 100; // there is 100px between each sprite
export const getPosition = (pArray: typeof fruits, value: FruitName) => {
  const index = pArray.indexOf(value);
  return "0px " + (fruits.length - index) * SPRITE_SPACE + "px";
};

export const shuffle = (a: Array<any>): Array<any> => {
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
};

export function areFruitsDifferent(
  fruit1: CurrentFruit,
  fruit2: CurrentFruit,
): boolean {
  return fruit1.fruit !== fruit2.fruit;
}

export function areCardsEquals(
  cardIndex1: number,
  cardIndex2: number,
): boolean {
  return cardIndex1 === cardIndex2;
}
