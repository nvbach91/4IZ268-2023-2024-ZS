import React, { useState } from "react";
import Pokemon from "./Pokemon";

const PokemonSection = ({ pokemons, capitalizeFirstLetter }) => {
  const [sortOrder, setSortOrder] = useState("asc");

  const sortedPokemons = [...pokemons].sort((a, b) => {
    const attackA = a.attack;
    const attackB = b.attack;

    if (sortOrder === "asc") {
      console.log(typeof(attackA));
      return attackA < attackB ? -1 : attackA > attackB ? 1 : 0;
    } else {
      return attackA < attackB ? 1 : attackA > attackB ? -1 : 0;
    }
  });

  const toggleSortOrder = () => {
    setSortOrder((prevOrder) => (prevOrder === "asc" ? "desc" : "asc"));
  };

  return (
    <div className="pokemon-section">
      <h2>
        Collected Pokemons {pokemons.length}/151
      </h2>
      <button onClick={toggleSortOrder}>Change sort order</button>
      {sortedPokemons.map((pokemon) => (
        <Pokemon key={pokemon.name} name={pokemon.name} image={pokemon.sprite} attack={pokemon.attack} capitalizeFirstLetter={capitalizeFirstLetter} />
      ))}
    </div>
  );
};

export default PokemonSection;