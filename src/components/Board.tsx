import { enqueueSnackbar } from "notistack";
import { useContext, useEffect } from "react";
import { ActionTypes } from "../actions";
import {
	GameDispatchContext,
	GameStateContext,
	NUMBER_OF_CARDS,
} from "../contexts/GameContext";
import type { CardType, Difficulty, GameState } from "../types";
import Card from "./Card";
import styles from "./board.module.css";

const GAME_WIDTH = {
	easy: "780px",
	hard: "1000px",
};
const Board = ({ difficulty }: { difficulty: Difficulty }) => {
	const { cards, score } = useContext<GameState>(GameStateContext);
	const dispatch = useContext(GameDispatchContext);
	useEffect(() => {
		if (score === NUMBER_OF_CARDS[difficulty] / 2) {
			enqueueSnackbar("You won!", {
				variant: "success",
				anchorOrigin: { vertical: "bottom", horizontal: "center" },
				preventDuplicate: true,
			});
			dispatch({ type: ActionTypes.SUCCESS });
		}
	}, [score, difficulty, dispatch]);
	return (
		<div className={styles.board} style={{ width: GAME_WIDTH[difficulty] }}>
			{cards.map((card: CardType, index: number) => (
				<Card
					fruit={card.fruit}
					className={card.className}
					key={`card-${card.fruit.name}-${index}`}
					index={index}
				/>
			))}
		</div>
	);
};

export default Board;
