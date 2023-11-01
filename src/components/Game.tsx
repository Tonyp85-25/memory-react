import Board from "./Board";
import Timer from "./Timer";
import { Difficulty } from "../types";
import { GameProvider, GameStateContext } from "../contexts/GameContext";
import { useContext } from "react";

const EasyBoard = () => {
  const { message } = useContext(GameStateContext);
  return (
    <>
      <Board difficulty={"easy"} />
      <Timer difficulty={"easy"} />
      <div>{message}</div>
    </>
  );
};
const HardBoard = () => {
  return (
    <>
      <Board difficulty={"hard"} />
      <Timer difficulty={"hard"} />
    </>
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
