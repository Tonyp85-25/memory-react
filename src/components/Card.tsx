import { type Fruit } from "./Board";

interface CardProps {
  fruit: Fruit;
  className: string;
  handleClick: VoidFunction;
}

const Card = (props: CardProps) => {
  const { fruit, className, handleClick } = props;
  const cardStyle = {
    backgroundPosition: fruit.position,
  };

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
