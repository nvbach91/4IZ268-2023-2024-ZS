import React, { useState, useEffect } from "react";
import "./App.css";
import PointsSection from "./components/PointsSection";
import PokemonSection from "./components/PokemonSection";
import UpgradesSection from "./components/UpgradesSection";
import StatsSection from "./components/StatsSection";
import OpponentSection from "./components/OpponentSection";

const App = () => {
  const [points, setPoints] = useState(0);
  const [pokemons, setPokemons] = useState([]);
  const [currentOpponent, updateCurrentOpponent] = useState("");
  const [multiplier, setMultiplier] = useState(1);
  const [capturedPokemons, setCapturedPokemons] = useState([]);
  const maxAttackSpeed = 32;
  const [upgrades, setUpgrades] = useState([
    { name: "Damage upgrade", cost: 10, description: "+1 click damage", effectType: "addDamage" },
    { name: "Damage multiplier", cost: 50, description: "2x click damage", effectType: "multiplyDamage" },
    { name: "Automatic damage multiplier", cost: 100, description: "multiply automatic damage", effectType: "multiplyAutomaticDamage" },
    { name: "Attack speed upgrade", cost: 200, description: "increase attack speed", effectType: "increaseAttackSpeed" },
  ]);
  const [stats, setStats] = useState({
    totalClicks: 0,
    totalPointsEarned: 0,
    damagePerClick: 1,
    automaticDamage: 0,
    automaticDamageMultiplier: 0.5,
    attackSpeed: 1,
    clickPoints: 0,
  });

  // State variable to control saving during app launch
  const [isAppLaunching, setIsAppLaunching] = useState(true);

  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  const formatNumber = (value) => {
    if (Math.abs(value) < 1000) {
      return value.toFixed(0);
    }

    const exponent = Math.floor(Math.log10(Math.abs(value)));
    const scaledValue = value / Math.pow(10, exponent);
    const formattedValue = scaledValue.toFixed(2);
    return `${formattedValue}e${exponent}`;
  };

  const handleUpgradeClick = (upgrade) => {
    if (upgrade.name === "Attack speed upgrade" && stats.attackSpeed >= maxAttackSpeed) {
      return;
    }

    if (points >= upgrade.cost) {
      setPoints((prevPoints) => prevPoints - upgrade.cost);
      setUpgrades((prevUpgrades) => prevUpgrades.map((upg) => (upg.name === upgrade.name ? { ...upg, cost: upg.cost * 2 } : upg)));

      switch (upgrade.effectType) {
        case "addDamage":
          setStats((prevStats) => ({ ...prevStats, damagePerClick: prevStats.damagePerClick + 1 }));
          break;
        case "multiplyDamage":
          setStats((prevStats) => ({ ...prevStats, damagePerClick: prevStats.damagePerClick * 2 }));
          break;
        case "multiplyAutomaticDamage":
          setStats((prevStats) => ({ ...prevStats, automaticDamageMultiplier: prevStats.automaticDamageMultiplier * 2 }));
          break;
        case "increaseAttackSpeed":
          setStats((prevStats) => ({ ...prevStats, attackSpeed: prevStats.attackSpeed * 2 }));
          break;
        default:
          break;
      }
    }
  };

  const fetchOpponentData = async () => {
    try {
      const randomOpponentId = Math.floor(Math.random() * 151) + 1;
      const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${randomOpponentId}`);
      const data = await response.json();

      const opponentData = {
        name: data.name,
        hp: data.stats.find((stat) => stat.stat.name === "hp").base_stat * multiplier,
        maxHP: data.stats.find((stat) => stat.stat.name === "hp").base_stat * multiplier,
        attack: data.stats.find((stat) => stat.stat.name === "attack").base_stat,
        sprite: data.sprites.front_default,
      };

      setMultiplier((prevMultiplier) => prevMultiplier * 2);

      updateCurrentOpponent(opponentData);
    } catch (error) {
      console.error("Error fetching opponent data:", error);
    }
  };

  useEffect(() => {
    fetchOpponentData();
  }, []);

  useEffect(() => {
    const handleAutomaticDamage = () => {
      updateCurrentOpponent((prevOpponent) => {
        const newOpponent = { ...prevOpponent, hp: prevOpponent.hp - stats.automaticDamage * stats.automaticDamageMultiplier };

        if (newOpponent.hp <= 0 && !capturedPokemons.includes(prevOpponent.name)) {
          handleCapturedPokemon(newOpponent);
        } else if (newOpponent.hp <= 0) {
          fetchOpponentData();
        }

        return newOpponent;
      });
      setPoints((prevPoints) => prevPoints + stats.automaticDamage * stats.automaticDamageMultiplier);
      setStats((prevStats) => ({ ...prevStats, totalPointsEarned: prevStats.totalPointsEarned + stats.automaticDamage * stats.automaticDamageMultiplier }));
    };

    const automaticDamageInterval = setInterval(handleAutomaticDamage, 1000 / stats.attackSpeed);

    return () => clearInterval(automaticDamageInterval);
  }, [stats.automaticDamage, stats.attackSpeed]);

  const handleOpponentClick = () => {
    const damageDealt = stats.damagePerClick;

    updateCurrentOpponent((prevOpponent) => {
      const newOpponent = { ...prevOpponent, hp: prevOpponent.hp - damageDealt };

      if (newOpponent.hp <= 0 && !capturedPokemons.includes(prevOpponent.name)) {
        handleCapturedPokemon(newOpponent);
      } else if (newOpponent.hp <= 0) {
        fetchOpponentData();
      }

      return newOpponent;
    });

    setPoints((prevPoints) => prevPoints + damageDealt);
    setStats((prevStats) => ({
      ...prevStats,
      totalClicks: prevStats.totalClicks + 1,
      totalPointsEarned: prevStats.totalPointsEarned + damageDealt,
      clickPoints: prevStats.clickPoints + damageDealt,
    }));
  };

  const handleCapturedPokemon = (opponent) => {
    setPokemons((prevPokemons) => [...prevPokemons, { name: opponent.name, sprite: opponent.sprite, attack: opponent.attack }]);
    setCapturedPokemons((prevCapturedPokemons) => [...prevCapturedPokemons, opponent.name]);

    setStats((prevStats) => ({ ...prevStats, automaticDamage: prevStats.automaticDamage + opponent.attack }));
    fetchOpponentData();
  };

  useEffect(() => {
    if (isAppLaunching) {
      setIsAppLaunching(false);
    } else {
      const stateToSave = {
        points,
        pokemons,
        currentOpponent,
        multiplier,
        capturedPokemons,
        upgrades,
        stats,
      };
      localStorage.setItem("pokemonIdleState", JSON.stringify(stateToSave));
    }
  }, [isAppLaunching, points, pokemons, currentOpponent, multiplier, capturedPokemons, upgrades, stats]);

  useEffect(() => {
    const savedState = JSON.parse(localStorage.getItem("pokemonIdleState"));
    if (savedState) {
      setPoints(savedState.points);
      setPokemons(savedState.pokemons);
      updateCurrentOpponent(savedState.currentOpponent);
      setMultiplier(savedState.multiplier);
      setCapturedPokemons(savedState.capturedPokemons);
      setUpgrades(savedState.upgrades);
      setStats(savedState.stats);
    }
  }, []);

  return (
    <div className="App">
      <PokemonSection pokemons={pokemons} capitalizeFirstLetter={capitalizeFirstLetter} />
      <div className="middle-section">
        <PointsSection points={formatNumber(points)} />
        <OpponentSection currentOpponent={currentOpponent} onOpponentClick={handleOpponentClick} formatNumber={formatNumber} capitalizeFirstLetter={capitalizeFirstLetter} />
        <StatsSection
          totalClicks={formatNumber(stats.totalClicks)}
          totalPointsEarned={formatNumber(stats.totalPointsEarned)}
          damagePerClick={formatNumber(stats.damagePerClick)}
          automaticDamage={formatNumber(stats.automaticDamage * stats.automaticDamageMultiplier)}
          attackSpeed={formatNumber(stats.attackSpeed)}
          clickPoints={formatNumber(stats.clickPoints)}
        />
      </div>
      <UpgradesSection upgrades={upgrades.map((upgrade) => ({ ...upgrade, formattedCost: formatNumber(upgrade.cost) }))} onUpgradeClick={handleUpgradeClick} stats={stats} maxAttackSpeed={maxAttackSpeed} points={points} />
    </div>
  );
};

export default App;
