import { useSnackbar } from "notistack";
import { useContext, useEffect, useRef, useState } from "react";
import { ActionTypes } from "../actions";
import { GameDispatchContext } from "../contexts/GameContext";
import type { Difficulty } from "../types";
import styles from "./timer.module.css";

export const GAME_DURATION = {
	easy: 60000,
	hard: 90000,
};
const Timer = ({ difficulty }: { difficulty: Difficulty }) => {
	const dispatch = useContext(GameDispatchContext);
	const { enqueueSnackbar, closeSnackbar } = useSnackbar();

	const [timerValue, setTimerValue] = useState<number>(0);
	const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
	const snackbarRef = useRef<ReturnType<typeof enqueueSnackbar> | null>(null);

	useEffect(() => {
		if (timerValue < 100) {
			intervalRef.current = setInterval(() => {
				setTimerValue((prev) => prev + 1);
			}, GAME_DURATION[difficulty] / 100);
		} else {
			snackbarRef.current = enqueueSnackbar("Time's up!", {
				variant: "error",
				anchorOrigin: { vertical: "bottom", horizontal: "center" },
			});
			dispatch({ type: ActionTypes.TIME_UP });
		}

		return () => {
			if (intervalRef.current) {
				clearInterval(intervalRef.current);
			}
			if (snackbarRef.current) {
				closeSnackbar(snackbarRef.current);
			}
		};
	}, [difficulty, timerValue, dispatch]);

	return (
		<div className={styles.timer}>
			<progress max={100} value={timerValue} />
		</div>
	);
};

export default Timer;
