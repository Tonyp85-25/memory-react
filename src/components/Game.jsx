import React from "react";
import Board from "./Board";
import Timer from "./Timer";

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
const Game = ({ difficulty }) => {
  const BoardComponent = components[difficulty];
  return <BoardComponent />;
};
export default Game;
