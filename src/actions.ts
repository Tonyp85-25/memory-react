import type { Dispatch } from "react";
import { GAME_DURATION } from "./components/Timer";
import type { Difficulty, DispatchFn, GameAction } from "./types";

export enum ActionTypes {
	CHECK_CARDS = "CHECK_CARDS",
	TIME_UP = "TIME_UP",
	HAS_WON = "HAS_WON",
	TURN_UP = "TURN_UP",
	BEFORE_CHECK = "BEFORE_CHECK",
	SUCCESS = "SUCCESS",
}
export const VALIDATION_TIME = 1000;

export function withThunk(dispatch: Dispatch<GameAction>) {
	return (actionOrThunk: GameAction | DispatchFn) =>
		typeof actionOrThunk === "function"
			? actionOrThunk(dispatch)
			: dispatch(actionOrThunk);
}

export function checkCards(index: number): DispatchFn {
	return (dispatch: Dispatch<GameAction>) => {
		dispatch({ type: ActionTypes.TURN_UP, index });
		dispatch({ type: ActionTypes.BEFORE_CHECK });
		setTimeout(() => {
			dispatch({ type: ActionTypes.CHECK_CARDS });
		}, VALIDATION_TIME);
	};
}

export function checkTime(difficulty: Difficulty) {
	return (dispatch: Dispatch<GameAction>) => {
		setTimeout(() => {
			dispatch({ type: ActionTypes.TIME_UP });
		}, GAME_DURATION[difficulty]);
	};
}
