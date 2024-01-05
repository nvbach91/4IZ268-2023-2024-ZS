import React from "react";

const StatsSection = ({ totalClicks, totalPointsEarned, damagePerClick, automaticDamage, attackSpeed, clickPoints }) => {
  return (
    <div className="stats-section">
      <h2>Stats</h2>
      <div>
        <strong>Total Clicks:</strong> {totalClicks}
      </div>
      <div>
        <strong>Click Points:</strong> {clickPoints}
      </div>
      <div>
        <strong>Total Points Earned:</strong> {totalPointsEarned}
      </div>
      <div>
        <strong>Damage Per Click:</strong> {damagePerClick}
      </div>
      <div>
        <strong>Automatic Damage:</strong> {automaticDamage}
      </div>
      <div>
        <strong>Attack Speed:</strong> {attackSpeed}
      </div>
    </div>
  );
};

export default StatsSection;
