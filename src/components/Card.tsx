import { Dispatch, useCallback, useContext } from "react";

import { GameDispatchContext, GameStateContext } from "../contexts/GameContext";
import { checkCards } from "../actions";
import { DispatchFn, Fruit, GameAction, GameState } from "../types";

interface CardProps {
  fruit: Fruit;
  className: string;
  index: number;
}

const Card = (props: CardProps) => {
  const { fruit, className, index } = props;
  const cardStyle = {
    backgroundPosition: fruit.position,
  };
  const dispatch = useContext(GameDispatchContext) as Dispatch<
    GameAction | DispatchFn
  >;
  const { cards, canClick, currentFruits } = useContext(
    GameStateContext,
  ) as GameState;
  const handleClick = useCallback(() => {
    if (!cards[index].isClickable || !canClick) {
      return;
    } else {
      dispatch(checkCards(currentFruits, index));
    }
  }, [cards, canClick, currentFruits, dispatch, index]);

  return (
    <div
      className={className}
      onClick={handleClick}
      style={cardStyle}
      role={"button"}
    ></div>
  );
};

export default Card;
