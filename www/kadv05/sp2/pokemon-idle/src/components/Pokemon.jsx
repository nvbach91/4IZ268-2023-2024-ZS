import React from "react";

const Pokemon = ({ name, image, attack, capitalizeFirstLetter }) => (
  <div>
    <h3>{capitalizeFirstLetter(name)}</h3>
    <img src={image} alt={`${name} Sprite`} />
    <p>Attack: {attack}</p>
  </div>
);

export default Pokemon;
