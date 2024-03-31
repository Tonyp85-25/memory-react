import { useContext } from "react";
import Card from "./Card";
import styles from "./board.module.css";
import { GameStateContext } from "../contexts/GameContext";
import type { GameState, CardType, Difficulty } from "../types";

const GAME_WIDTH = {
	easy: "780px",
	hard: "1000px",
};
const Board = ({ difficulty }: { difficulty: Difficulty }) => {
	const { cards } = useContext<GameState>(GameStateContext);

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
