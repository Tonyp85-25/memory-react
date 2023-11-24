import {
  Dispatch,
  ReactElement,
  createContext,
  useEffect,
  useReducer,
  useRef,
} from "react";
import { ActionTypes, withThunk } from "../actions";
import { GameOptions } from "../types";
import {
  areCardsEquals,
  areFruitsDifferent,
  getPosition,
  shuffle,
} from "../helpers";
import { CardType, GameAction, GameState, ArrayOfTwo, fruits } from "../types";
import { GAME_DURATION } from "../components/Timer";
import { enqueueSnackbar } from "notistack";

export const NUMBER_OF_CARDS = {
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
function getInitialGameState(options: GameOptions): GameState {
  const cards: CardType[] = [];
  const { difficulty, shuffle } = options;
  for (let index = 0; index < 2; index++) {
    for (let i = 0; i < NUMBER_OF_CARDS[difficulty] / 2; i++) {
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
    currentFruits: new ArrayOfTwo([]),
    canClick: true,
    score: 0,
  };
}

export function GameProvider({
  children,
  options,
}: {
  children: ReactElement;
  options: GameOptions;
}) {
  const [game, dispatch] = useReducer(
    gameReducer,
    options,
    getInitialGameState,
  );
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const { difficulty } = options;
  useEffect(() => {
    timeoutRef.current = setTimeout(() => {
      dispatch({ type: ActionTypes.TIME_UP });
    }, GAME_DURATION[difficulty]);

    if (game.score === NUMBER_OF_CARDS[difficulty] / 2) {
      enqueueSnackbar("You won!", {
        variant: "success",
        anchorOrigin: { vertical: "bottom", horizontal: "center" },
      });
      dispatch({ type: ActionTypes.SUCCESS });
    }
    return function () {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [difficulty, game.score]);
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
      if (
        game.currentFruits.head &&
        areCardsEquals(game.currentFruits.head.index, action.index)
      ) {
        return game;
      }
      const newGame = { ...game };
      newGame.cards[action.index].className = cardStyles["up"];
      newGame.cards[action.index].isClickable = false;
      newGame.currentFruits.push({
        fruit: newGame.cards[action.index].fruit.name,
        index: action.index,
      });
      return newGame;
    }
    case ActionTypes.SUCCESS:
    case ActionTypes.BEFORE_CHECK: {
      return { ...game, canClick: false };
    }
    case ActionTypes.CHECK_CARDS: {
      const newGame = { ...game };
      const { cards, currentFruits } = newGame;
      if (areFruitsDifferent(currentFruits.head, currentFruits.tail)) {
        const { head, tail } = currentFruits;
        cards[head.index].className = cardStyles["back"];
        cards[head.index].isClickable = true;
        cards[tail.index].className = cardStyles["back"];
        cards[tail.index].isClickable = true;
      } else {
        newGame.score++;
      }
      newGame.cards = cards;
      newGame.currentFruits = new ArrayOfTwo([]);
      newGame.canClick = true;
      return newGame;
    }
    case ActionTypes.TIME_UP: {
      return { ...game, canClick: false, message: "Game over!", timeUp: true };
    }
    case ActionTypes.RESET: {
      return getInitialGameState({ difficulty: action.difficulty, shuffle });
    }
    default:
      return game;
  }
}
