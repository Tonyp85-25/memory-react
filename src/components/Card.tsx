import { useCallback, useContext } from "react";

import { ActionTypes, checkCards } from "../actions";
import { GameDispatchContext, GameStateContext } from "../contexts/GameContext";
import type { Fruit, GameDispatch, GameState } from "../types";

interface CardProps {
	fruit: Fruit;
	className: string;
	index: number;
}

const Card = (props: CardProps) => {
	const { fruit, className, index } = props;
	const cardStyle = {
		backgroundPosition: fruit.position,
	};
	const dispatch = useContext(GameDispatchContext) as GameDispatch;
	const { cards, canClick, currentFruits } =
		useContext<GameState>(GameStateContext);

	const handleClick = useCallback(() => {
		if (!cards[index].isClickable || !canClick) {
			return;
		}
		if (currentFruits.length === 0) {
			dispatch({ type: ActionTypes.TURN_UP, index });
		} else {
			dispatch(checkCards(index));
		}
	}, [canClick, cards, currentFruits, dispatch, index]);

	return (
		<div
			className={className}
			onClick={handleClick}
			style={cardStyle}
			role={"button"}
		/>
	);
};

export default Card;
