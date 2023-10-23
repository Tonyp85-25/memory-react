import React, { useRef } from "react";

const Card = (props) => {
  const { fruit, className, handleClick} = props;
  const renderCount = useRef(0);
  const cardStyle = {
    backgroundPosition: fruit.position,
  };

  return (
    <div className={className} onClick={handleClick} style={cardStyle}>
      {" "}
      {renderCount.current++} time(s)
    </div>
  );
};

export default Card;
