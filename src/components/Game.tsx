import Board from "./Board";
import Timer from "./Timer";
import { Difficulty } from "../App";

const EasyBoard = () => {
  return (
    <>
      <Board difficulty={"easy"} />
      <Timer difficulty={"easy"} />
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
  return <BoardComponent />;
};
export default Game;
