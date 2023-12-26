import Board from "../components/Board";
import Timer from "../components/Timer";
import { Difficulty, GameAction } from "../types";
import { GameDispatchContext, GameProvider } from "../contexts/GameContext";
import { Dispatch, useContext } from "react";
import { ActionTypes } from "../actions";
import { shuffle } from "../helpers";
import { useParams } from "react-router-dom";
const EasyBoard = () => {
  const dispatch = useContext(GameDispatchContext) as Dispatch<GameAction>;

  return (
    <div className="container">
      <h3>Difficulty: easy</h3>
      <button
        onClick={() =>
          dispatch({ type: ActionTypes.RESET, difficulty: "easy" })
        }
        className="reset-button"
      >
        Reset
      </button>

      <Board difficulty={"easy"} />
      <Timer difficulty={"easy"} />
    </div>
  );
};
const HardBoard = () => {
  const dispatch = useContext(GameDispatchContext) as Dispatch<GameAction>;
  return (
    <div>
      <h3>Difficulty: hard</h3>
      <button
        onClick={() =>
          dispatch({ type: ActionTypes.RESET, difficulty: "hard" })
        }
        className="reset-button"
      >
        Reset
      </button>
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
