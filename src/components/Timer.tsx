import { useEffect, useRef, useState } from "react";
import styles from "./timer.module.css";
import { type Difficulty } from "../App";

export const GAME_DURATION = {
  easy: 60000,
  hard: 90000,
};
const Timer = ({ difficulty }: { difficulty: Difficulty }) => {
  const [timeUp, setTimeUp] = useState(false);
  const [count, setCount] = useState(0);
  const intervalRef = useRef<number | null>(null);
  const timeoutRef = useRef<number | null>(null);

  useEffect(() => {
    if (!timeUp) {
      intervalRef.current = setInterval(() => {
        setCount(count + 1);
      }, GAME_DURATION[difficulty] / 100);
      timeoutRef.current = setTimeout(() => {
        setTimeUp(true);
      }, GAME_DURATION[difficulty]);
    }
    return function () {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
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
