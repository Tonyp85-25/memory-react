import { Dispatch, useContext, useEffect, useRef, useState } from "react";
import styles from "./timer.module.css";
import { type Difficulty } from "./App";
import { GameDispatchContext, GameStateContext } from "./GameContext";
import { checkTime } from "../helpers";
import { DispatchFn, GameAction } from "../types";

export const GAME_DURATION = {
  easy: 60000,
  hard: 90000,
};
const Timer = ({ difficulty }: { difficulty: Difficulty }) => {
  const { timeUp } = useContext(GameStateContext);
  const dispatch = useContext(GameDispatchContext) as Dispatch<
    GameAction | DispatchFn
  >;
  const [count, setCount] = useState(0);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  dispatch(checkTime(difficulty));
  useEffect(() => {
    if (!timeUp) {
      intervalRef.current = setInterval(() => {
        setCount(count + 1);
      }, GAME_DURATION[difficulty] / 100);
    }
    return function () {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [difficulty, count, timeUp]);

  return (
    <div className={styles.timer}>
      <progress value={count + 1} max={99} />
    </div>
  );
};

export default Timer;
