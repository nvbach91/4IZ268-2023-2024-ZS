import React from "react";
import Pokemon from "./Pokemon";

const PokemonSection = ({ pokemons, capitalizeFirstLetter }) => (
  <div className="pokemon-section">
    <h2>Collected Pokemons {pokemons.length}/151</h2>
    {pokemons.map((pokemon) => (
      <Pokemon key={pokemon.name} name={pokemon.name} image={pokemon.sprite} attack={pokemon.attack} capitalizeFirstLetter={capitalizeFirstLetter} />
    ))}
  </div>
);

export default PokemonSection;
