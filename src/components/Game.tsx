import Board from "./Board";
import Timer from "./Timer";
import { Difficulty, GameAction } from "../types";
import { GameDispatchContext, GameProvider } from "../contexts/GameContext";
import { Dispatch, useContext } from "react";
import { ActionTypes } from "../actions";
const EasyBoard = () => {
  const dispatch = useContext(GameDispatchContext) as Dispatch<GameAction>;
  return (
    <div className="container">
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

const Game = ({ difficulty }: { difficulty: Difficulty }) => {
  const BoardComponent = components[difficulty];

  return (
    <GameProvider difficulty={difficulty}>
      <BoardComponent />
    </GameProvider>
  );
};

export default Game;
