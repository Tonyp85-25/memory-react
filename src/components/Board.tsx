import { useContext } from "react";
import Card from "./Card";
import styles from "./board.module.css";
import "./card.css";
import { GameStateContext } from "../contexts/GameContext";
import { type CardType, type Difficulty } from "../types";

const Board = ({ difficulty }: { difficulty: Difficulty }) => {
  const { cards } = useContext(GameStateContext);

  // necessary to pass ci, otherwise tsc will assume that we are using NodeJS setTimeout
  // https://stackoverflow.com/questions/45802988/typescript-use-correct-version-of-settimeout-node-vs-window

  return (
    <div className={`${styles.board} ${styles[difficulty]}`}>
      {cards.map((card: CardType, index: number) => (
        <Card
          fruit={card.fruit}
          className={card.className}
          key={index}
          index={index}
        />
      ))}
    </div>
  );
};

export default Board;
