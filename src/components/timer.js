import React, { useEffect, useState } from "react";

export const GAME_DURATION = {
  easy: 60000,
  hard: 90000,
};
const Timer = ({ difficulty }) => {
  const [timeUp, setTimeUp] = useState(false);
  const [count, setCount] = useState(0);

  useEffect(() => {
    let interval = null;
    if (!timeUp) {
      interval = setInterval(() => {
        setCount(count + 1);
      }, GAME_DURATION[difficulty] / 100);
      setTimeout(() => {
        setTimeUp(true);
      }, GAME_DURATION[difficulty]);
    }
    return function () {
      clearInterval(interval);
    };
  }, [difficulty, count, timeUp]);

  return <progress value={count} max={98} />;
};

export default Timer;
