// Upgrade.jsx

import React from "react";

const Upgrade = ({ name, cost, description, onClick, disabled, maxed }) => {
  const handleClick = () => {
    if (!disabled && !maxed) {
      onClick();
    }
  };

  return (
    <div className={`upgrade${disabled ? " disabled" : ""}`}>
      <strong>{name}</strong>
      <p>Effect: {description}</p>
      {maxed ? <button disabled>{maxed}</button> : <button onClick={handleClick}>{cost}</button>}
    </div>
  );
};

export default Upgrade;
