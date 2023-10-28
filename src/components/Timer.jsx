import React, { useEffect, useRef, useState } from "react";
import styles from "./timer.module.css";

export const GAME_DURATION = {
  easy: 60000,
  hard: 90000,
};
const Timer = ({ difficulty }) => {
  const [timeUp, setTimeUp] = useState(false);
  const [count, setCount] = useState(0);
  const intervalRef = useRef(null);
  const timeoutRef = useRef(null);

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
      clearInterval(intervalRef.current);
      clearTimeout(timeoutRef.current);
    };
  }, [difficulty, count, timeUp]);

  return (
    <div className={styles.timer}>
      <progress value={count + 1} max={99} />
    </div>
  );
};

export default Timer;
