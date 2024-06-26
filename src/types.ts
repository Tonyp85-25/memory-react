import type { Dispatch } from "react";
import type { ActionTypes } from "./actions";

export interface CardType {
	fruit: Fruit;
	className: string;
	isClickable: boolean;
}
export interface CurrentFruit {
	fruit: string;
	index: number;
}
export interface Fruit {
	name: FruitName;
	position: string;
}
export interface GameState {
	cards: CardType[];
	timeUp: boolean;
	currentFruits: Array<CurrentFruit>;
	canClick: boolean;
	score: number;
}
export type SimpleAction = {
	type: Exclude<ActionTypes, ActionTypes.TURN_UP>;
};
export type TurnUpAction = { type: ActionTypes.TURN_UP; index: number };
export type GameAction = TurnUpAction | SimpleAction;

export const fruits = [
	"apple",
	"banana",
	"orange",
	"lime",
	"fig",
	"apricot",
	"lemon",
	"strawberry",
	"green-apple",
	"peach",
	"grape",
	"watermellon",
	"plum",
	"pear",
	"cherry",
	"raspberry",
	"passion",
	"yellow-cherry",
] as const;

const Difficulties = ["easy", "hard"] as const;
export type Difficulty = (typeof Difficulties)[number];
export type FruitName = (typeof fruits)[number];
export type DispatchFn = (dispatch: Dispatch<GameAction>) => void;
export type GameDispatch = Dispatch<GameAction | DispatchFn>;
type ShuffleFn = (cards: unknown[]) => unknown[];
export interface GameOptions {
	difficulty: Difficulty;
	shuffle: ShuffleFn;
}
