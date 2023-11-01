import {
  Dispatch,
  ReactElement,
  createContext,
  useEffect,
  useReducer,
  useRef,
} from "react";
import { ActionTypes } from "../actions";
import { Difficulty } from "../types";
import {
  areCardsEquals,
  areFruitsDifferent,
  getPosition,
  shuffle,
  withThunk,
} from "../helpers";
import {
  CardType,
  GameAction,
  GameState,
  LimitedArray,
  fruits,
} from "../types";
import { GAME_DURATION } from "../components/Timer";

export const numberOfCards = {
  easy: 28,
  hard: 36,
};
export const GameStateContext = createContext<GameState>({} as GameState);
export const GameDispatchContext = createContext<Dispatch<GameAction> | null>(
  null,
);

const cardStyles = {
  back: "card",
  up: "card image",
};
function getInitialGameState(difficulty: Difficulty): GameState {
  const cards: CardType[] = [];
  for (let index = 0; index < 2; index++) {
    for (let i = 0; i < numberOfCards[difficulty] / 2; i++) {
      cards.push({
        fruit: { name: fruits[i], position: getPosition(fruits, fruits[i]) },
        className: cardStyles["back"],
        isClickable: true,
      });
    }
  }
  shuffle(cards);

  return {
    cards,
    timeUp: false,
    currentFruits: new LimitedArray([]),
    hasWon: false,
    canClick: true,
    message: "",
  };
}

export function GameProvider({
  children,
  difficulty,
}: {
  children: ReactElement;
  difficulty: Difficulty;
}) {
  const [game, dispatch] = useReducer(
    gameReducer,
    difficulty,
    getInitialGameState,
  );
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    timeoutRef.current = setTimeout(() => {
      dispatch({ type: ActionTypes.TIME_UP });
    }, GAME_DURATION[difficulty]);
    return function () {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [difficulty]);
  if (game === null) {
    return null;
  }
  return (
    <GameStateContext.Provider value={game}>
      <GameDispatchContext.Provider value={withThunk(dispatch)}>
        {children}
      </GameDispatchContext.Provider>
    </GameStateContext.Provider>
  );
}

function gameReducer(game: GameState, action: GameAction) {
  switch (action.type) {
    case ActionTypes.TURN_UP: {
      const newGame = { ...game };
      if (
        game.currentFruits.head &&
        areCardsEquals(game.currentFruits.head.index, action.index)
      ) {
        return newGame;
      }

      newGame.cards[action.index].className = cardStyles["up"];
      newGame.cards[action.index].isClickable = false;
      newGame.currentFruits.push({
        fruit: newGame.cards[action.index].fruit.name,
        index: action.index,
      });
      return newGame;
    }
    case ActionTypes.BEFORE_CHECK: {
      return { ...game, canClick: false };
    }
    case ActionTypes.CHECK_CARDS: {
      const newGame = { ...game };
      const { currentFruits } = game;
      newGame.currentFruits = new LimitedArray([]);
      if (areFruitsDifferent(currentFruits.head, currentFruits.tail)) {
        newGame.cards[currentFruits.head.index].className = cardStyles["back"];
        newGame.cards[currentFruits.head.index].isClickable = true;
        newGame.cards[currentFruits.tail.index].className = cardStyles["back"];
        newGame.cards[currentFruits.tail.index].isClickable = true;
      }

      newGame.canClick = true;
      return newGame;
    }
    case ActionTypes.TIME_UP: {
      return { ...game, canClick: false, message: "Game over!", timeUp: true };
    }
    default:
      return game;
  }
}
