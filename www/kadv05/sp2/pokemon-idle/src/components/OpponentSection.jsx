import React from "react";

const OpponentSection = ({ currentOpponent, onOpponentClick, formatNumber, capitalizeFirstLetter }) => {
  const calculateHealthPercentage = () => {
    if (currentOpponent.maxHP === 0) {
      return 0;
    }
    return (currentOpponent.hp / currentOpponent.maxHP) * 100;
  };

  return (
    <div className="opponent-section" onClick={onOpponentClick}>
      {currentOpponent && (
        <div className="opponent-info">
          <h3>{capitalizeFirstLetter(currentOpponent.name)}</h3>
          <img className="opponent-image" src={currentOpponent.sprite} alt="Opponent Sprite" />
          <div className="health-bar-container">
            <div className="health-bar" style={{ width: `${calculateHealthPercentage()}%` }}></div>
          </div>
          <p>
            {formatNumber(currentOpponent.hp)} / {formatNumber(currentOpponent.maxHP)} HP
          </p>
        </div>
      )}
    </div>
  );
};

export default OpponentSection;
