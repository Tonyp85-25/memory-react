import {
  Dispatch,
  ReactElement,
  createContext,
  useEffect,
  useRef,
} from "react";
import { ActionTypes, withThunk } from "../actions";
import { GameOptions } from "../types";
import { areFruitsDifferent, getPosition } from "../helpers";
import { CardType, GameAction, GameState, fruits } from "../types";
import { GAME_DURATION } from "../components/Timer";
import { enqueueSnackbar } from "notistack";
import { useImmerReducer } from "use-immer";

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
    currentFruits: [],
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
  const [game, dispatch] = useImmerReducer(
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
  }, [difficulty, dispatch, game.score]);

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
      console.log(action.index);

      game.cards[action.index].className = cardStyles["up"];
      game.cards[action.index].isClickable = false;
      game.currentFruits.push({
        fruit: game.cards[action.index].fruit.name,
        index: action.index,
      });

      return game;
    }
    case ActionTypes.SUCCESS:
    case ActionTypes.BEFORE_CHECK: {
      game.canClick = false;
      return game;
    }
    case ActionTypes.CHECK_CARDS: {
      const [head, tail] = game.currentFruits;
      if (areFruitsDifferent(head, tail)) {
        game.cards[head.index].className = cardStyles["back"];
        game.cards[head.index].isClickable = true;
        game.cards[tail.index].className = cardStyles["back"];
        game.cards[tail.index].isClickable = true;
      } else {
        game.score++;
      }

      game.currentFruits = [];
      game.canClick = true;
      return game;
    }
    case ActionTypes.TIME_UP: {
      return { ...game, canClick: false, message: "Game over!", timeUp: true };
    }
    default:
      return game;
  }
}
