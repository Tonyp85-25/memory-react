import { useHistory, useParams } from "react-router-dom";
import Board from "../components/Board";
import Timer from "../components/Timer";
import { GameProvider } from "../contexts/GameContext";
import { shuffle } from "../helpers";
import type { Difficulty } from "../types";
const EasyBoard = () => {
	const history = useHistory();

	return (
		<div className="container">
			<div className="board-header">
				<h3>Difficulty: easy</h3>

				<button
					onClick={() => history.push("/easy")}
					className="secondary btn-sm
        "
					type="button"
				>
					Reset
				</button>
			</div>

			<Board difficulty={"easy"} />
			<Timer difficulty={"easy"} />
		</div>
	);
};
const HardBoard = () => {
	const history = useHistory();

	return (
		<div className="container">
			<div className="board-header">
				<h3>Difficulty: hard</h3>
				<button
					onClick={() => history.push("/hard")}
					className="secondary btn-sm"
					type="button"
				>
					Reset
				</button>
			</div>

			<Board difficulty={"hard"} />
			<Timer difficulty={"hard"} />
		</div>
	);
};
const components = {
	easy: EasyBoard,
	hard: HardBoard,
};

const Game = () => {
	const { difficulty } = useParams() as { difficulty: Difficulty };
	const BoardComponent = components[difficulty];

	return (
		<GameProvider options={{ difficulty, shuffle }}>
			<BoardComponent />
		</GameProvider>
	);
};

export default Game;
