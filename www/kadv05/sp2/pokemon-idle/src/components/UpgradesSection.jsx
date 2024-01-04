// UpgradesSection.jsx

import React from "react";
import Upgrade from "./Upgrade";

const UpgradesSection = ({ upgrades, onUpgradeClick, stats, maxAttackSpeed, points }) => (
  <div className="upgrades-section">
    <h2>Upgrades</h2>
    <ul>
      {upgrades.map((upgrade) => (
        <li key={upgrade.name}>
          <Upgrade
            name={upgrade.name}
            cost={upgrade.formattedCost}
            description={upgrade.description}
            effectType={upgrade.effectType}
            onClick={() => onUpgradeClick(upgrade)}
            disabled={
              (upgrade.name === "Attack speed upgrade" && stats.attackSpeed >= maxAttackSpeed) ||
              points < upgrade.cost
            }
            maxed={upgrade.name === "Attack speed upgrade" && stats.attackSpeed >= maxAttackSpeed ? "Max lvl" : null}
          />
        </li>
      ))}
    </ul>
  </div>
);

export default UpgradesSection;