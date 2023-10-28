import { useState } from "react";
import styles from "./App.module.css";
import Game from "./components/Game";

const Difficulties = ["easy", "hard"] as const;
export type Difficulty = (typeof Difficulties)[number];
function App() {
  const [difficulty, setDifficulty] = useState<Difficulty | null>(null);

  return (
    <div className={styles.App}>
      <h1>Memory game</h1>
      <div className={styles.buttons}>
        <button
          onClick={() => setDifficulty("easy")}
          disabled={difficulty === "easy"}
        >
          Easy
        </button>
        <button
          onClick={() => setDifficulty("hard")}
          disabled={difficulty === "hard"}
        >
          Hard
        </button>
      </div>
      {difficulty && <Game difficulty={difficulty} />}
    </div>
  );
}

export default App;
