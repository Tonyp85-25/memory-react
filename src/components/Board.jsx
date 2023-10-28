import React, { useEffect, useMemo, useRef, useState } from "react";
import Card from "./Card";
import { fruits, getPosition, shuffle } from "../data";
import styles from "./board.module.css";
import cardStyles from "./card.module.css";

export const numberOfCards = {
  easy: 28,
  hard: 36,
};
const Board = ({ difficulty }) => {
  const initialCards = useMemo(() => {
    const pcards = [];
    let count = 1;
    for (let index = 0; index < 2; index++) {
      for (let i = 0; i < numberOfCards[difficulty] / 2; i++) {
        pcards.push({
          id: count,
          fruit: { name: fruits[i], position: getPosition(fruits, fruits[i]) },
          className: cardStyles.card,
          isClickable: true,
        });
        count++;
      }
    }
    shuffle(pcards);
    return pcards;
  }, [difficulty]);
  const [cards, setCards] = useState(initialCards);

  const [currentFruits, setCurrentFruits] = useState([]);
  const [canClick, setCanClick] = useState(true);

  const onCardClick = (index) => {
    if (cards[index].isClickable && canClick === true) {
      const newCards = [...cards];
      newCards[index].className = `${cardStyles.card} ${cardStyles.image}`;
      newCards[index].isClickable = false;
      setCurrentFruits([
        ...currentFruits,
        { fruit: newCards[index].fruit.name, index },
      ]);
      setCards(newCards);
    }
  };
  useEffect(() => {
    let timeout = null;
    if (currentFruits.length === 2) {
      setCanClick(false);
      timeout = setTimeout(() => {
        if (currentFruits[0].fruit !== currentFruits[1].fruit) {
          const newCards = [...cards];
          newCards[currentFruits[0].index].className = cardStyles.card;
          newCards[currentFruits[0].index].isClickable = true;
          newCards[currentFruits[1].index].className = cardStyles.card;
          newCards[currentFruits[1].index].isClickable = true;
          setCards(newCards);
        }
        setCurrentFruits([]);
        setCanClick(true);
      }, 1000);
    }
    return function () {
      clearTimeout(timeout);
    };
  }, [currentFruits]);
  return (
    <div className={`${styles.board} ${styles[difficulty]}`}>
      {cards.map((card, index) => (
        <Card
          id={card.id}
          fruit={card.fruit}
          className={card.className}
          clickable={card.clickable}
          key={index}
          handleClick={() => onCardClick(index)}
        />
      ))}
    </div>
  );
};

export default Board;
