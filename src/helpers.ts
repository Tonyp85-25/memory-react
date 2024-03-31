import { CurrentFruit, FruitName, fruits } from "./types";

/**
 * @source https://gist.github.com/astoilkov/013c513e33fe95fa8846348038d8fe42?permalink_comment_id=3377800#gistcomment-3377800
 */

const SPRITE_SPACE = 100; // there is 100px between each sprite
export const getPosition = (pArray: typeof fruits, value: FruitName) => {
	const index = pArray.indexOf(value);
	return "0px " + -index * SPRITE_SPACE + "px";
};

export const shuffle = (a: Array<unknown>): Array<unknown> => {
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
