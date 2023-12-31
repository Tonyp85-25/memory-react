import { useContext, useEffect, useRef } from "react";
import styles from "./timer.module.css";
import { type Difficulty } from "../types";
import { GameStateContext } from "../contexts/GameContext";
import { enqueueSnackbar } from "notistack";

export const GAME_DURATION = {
  easy: 60000,
  hard: 90000,
};
const Timer = ({ difficulty }: { difficulty: Difficulty }) => {
  const { timeUp } = useContext(GameStateContext);

  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const countRef = useRef<HTMLProgressElement | null>(null);

  useEffect(() => {
    if (!timeUp) {
      intervalRef.current = setInterval(() => {
        if (countRef.current) {
          countRef.current.value = countRef.current.value + 1;
        }
      }, GAME_DURATION[difficulty] / 100);
    } else {
      enqueueSnackbar("Time's up!", {
        variant: "error",
        anchorOrigin: { vertical: "bottom", horizontal: "center" },
      });
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
      if (countRef.current) {
        countRef.current.value = 0;
      }
    }

    return function () {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [difficulty, timeUp]);

  return (
    <div className={styles.timer}>
      <progress ref={countRef} max={100} />
    </div>
  );
};

export default Timer;
