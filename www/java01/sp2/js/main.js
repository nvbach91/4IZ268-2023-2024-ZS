var pokemons = [];
var firstCard = null;
var secondCard = null;
var points = 0;
var nCardsRevealed = 0;
var startTime;
var timerInterval;

const gameField = document.querySelector('#game-field');
const pointsContainer = document.querySelector('#points');
const timeContainer = document.querySelector('#time');
const pokedexList = document.getElementById('pokemon-list');

document.addEventListener('DOMContentLoaded', () => {
  fetchPokemons();

  loadPokedexFromLocalStorage();
});

const fetchPokemons = () => {
  for (let i = 1; i <= 10; i++) {
    fetch(`https://pokeapi.co/api/v2/pokemon/${i}`)
      .then(response => response.json())
      .then(data => {
        const newPokemon = {
          id: data.id,
          name: data.name,
          image: `https://img.pokemondb.net/artwork/${data.name.toLowerCase()}.jpg`,
          types: data.types.map(type => type.type.name),
          height: data.height,
          weight: data.weight
        };

        if (!pokemons.some(p => p.id === newPokemon.id)) {
          pokemons.push(newPokemon);
        }

        if (pokemons.length === 10) {
          initializeGame();
        }
      })
      .catch(error => console.error('Error fetching Pokemon data:', error));
  }
}

document.addEventListener('DOMContentLoaded', () => {
  // Fetch random Pokemons and initialize game
  /*fetchRandomPokemons();*/

  loadPokedexFromLocalStorage();
});

const savePokedexToLocalStorage = () => {
  const savedPokedex = JSON.parse(localStorage.getItem('pokedex')) || [];
  localStorage.setItem('pokedex', JSON.stringify(savedPokedex));
}

const initializeGame = () => {
  // Clear the game field before adding new cards
  gameField.innerHTML = '';

  // Create a copy of the pokemons array
  let uniquePokemons = [...new Set(pokemons)];
  uniquePokemons = uniquePokemons.concat(pokemons);
  uniquePokemons.sort(() => 0.5 - Math.random());

  uniquePokemons.forEach((pokemon) => {
    if (document.querySelectorAll(`.card[data-id="${pokemon.id}"]`).length < 2) {
      addCard(pokemon);
    }
  });

  loadPokedexFromLocalStorage();

  gameField.addEventListener('click', startGame);
}

const startGame = () => {
  if (!startTime) {
    startTime = new Date().getTime();
    timerInterval = setInterval(updateTimer, 1000);

    // Remove the click event listener only after the first click
    gameField.removeEventListener('click', startGame);
  }
}

const updateTimer = () => {
  var currentTime = new Date().getTime();
  var elapsedSeconds = Math.floor((currentTime - startTime) / 1000);
  var currentTimeFormatted = formatTime(elapsedSeconds);
  timeContainer.innerText = `Your Time: ${currentTimeFormatted}`;

  console.log('nCardsRevealed:', nCardsRevealed);
  console.log('points:', points);

  if (nCardsRevealed === pokemons.length * 2) {
    console.log('Condition met');
    clearInterval(timerInterval);
    var finalTime = formatTime(elapsedSeconds);
    setTimeout(() => {
      if (points === pokemons.length) {
        alert('🎉 WINNER! 🎉 You have completed the game with ' + points + ' points and your final time is ' + finalTime);
      }
    }, 1000);
  }
}

const formatTime = (seconds) => {
  var hours = Math.floor(seconds / 3600);
  var minutes = Math.floor((seconds % 3600) / 60);
  var remainingSeconds = seconds % 60;

  return (
    (hours < 10 ? '0' : '') + hours + ':' +
    (minutes < 10 ? '0' : '') + minutes + ':' +
    (remainingSeconds < 10 ? '0' : '') + remainingSeconds
  );
}

var bindCard = (card, pokemon) => {
  card.addEventListener('click', () => {
    if (card.classList.contains('revealed')) {
      return false;
    }
    if (firstCard && secondCard) {
      return false;
    }
    card.classList.add('revealed');
    card.style.backgroundImage = `url(${pokemon.image})`;

    if (!firstCard) {
      firstCard = card;
      return false;
    }

    secondCard = card;

    if (firstCard.innerText === secondCard.innerText) {
      points++;
      nCardsRevealed += 2;
      firstCard = null;
      secondCard = null;

      addToPokedex(pokemon);

      if (nCardsRevealed === pokemons.length * 2) {
        clearInterval(timerInterval);
        var currentTime = new Date().getTime();
        var elapsedSeconds = Math.floor((currentTime - startTime) / 1000);
        var finalTime = formatTime(elapsedSeconds);
        setTimeout(() => {
          alert('🎉 WINNER! 🎉 You have completed the game with ' + points + ' points and your final time is ' + finalTime);
        }, 1000);
      }
    } else {
      points--;
      if (points < 0) {
        points = 0;
      }
      setTimeout(() => {
        firstCard.classList.remove('revealed');
        secondCard.classList.remove('revealed');
        firstCard.style.backgroundImage = '';
        secondCard.style.backgroundImage = '';
        firstCard = null;
        secondCard = null;
      }, 1000);
    }
    pointsContainer.innerText = points;
  });
};

var addToPokedex = (pokemon) => {
  // Check if the Pokemon with the same ID is already in the Pokedex
  if (document.querySelector(`.pokemon-id[data-id="${pokemon.id}"]`)) {
    console.log('Pokemon is already in the Pokedex.');
    return;
  }

  var listItem = document.createElement('li');
  listItem.classList.add('pokemon');

  const { id, name, image, types, height, weight } = pokemon;

  var pokemonNameInStats = document.createElement('p');
  pokemonNameInStats.classList.add('pokemon-name');
  pokemonNameInStats.textContent = 'Name: ' + name;

  listItem.setAttribute('data-id', id);

  var pokemonImage = document.createElement('div');
  pokemonImage.classList.add('pokemon-image');
  pokemonImage.style.backgroundImage = `url(${image})`;

  var statsAndImageContainer = document.createElement('div');
  statsAndImageContainer.classList.add('pokemon-row');

  var statsContainer = document.createElement('div');
  statsContainer.classList.add('pokemon-stats');

  var pokemonId = document.createElement('p');
  pokemonId.classList.add('pokemon-id');
  pokemonId.textContent = 'ID: ' + id;

  var pokemonTypes = document.createElement('p');
  pokemonTypes.textContent = 'Type(s): ' + types.join(', ');

  var pokemonHeight = document.createElement('p');
  pokemonHeight.textContent = 'Height: ' + height;

  var pokemonWeight = document.createElement('p');
  pokemonWeight.textContent = 'Weight: ' + weight;

  statsContainer.appendChild(pokemonNameInStats);
  statsContainer.appendChild(pokemonId);
  statsContainer.appendChild(pokemonTypes);
  statsContainer.appendChild(pokemonHeight);
  statsContainer.appendChild(pokemonWeight);

  statsAndImageContainer.appendChild(statsContainer);
  statsAndImageContainer.appendChild(pokemonImage);

  listItem.appendChild(statsAndImageContainer);

  // Remove button
  var removeButton = document.createElement('button');
  removeButton.classList.add('pokemon-delete');
  removeButton.textContent = 'Remove';
  removeButton.addEventListener('click', () => {
    console.log('Remove button clicked');
    pokedexList.removeChild(listItem);

    removeFromLocalStorage(pokemon);
    savePokedexToLocalStorage();
    console.log('Pokedex after adding:', JSON.parse(localStorage.getItem('pokedex')));
  });

  listItem.appendChild(removeButton);
  pokedexList.appendChild(listItem);

  savePokemonDataToLocalStorage(pokemon);
  savePokedexToLocalStorage();
  console.log('Pokedex after adding:', JSON.parse(localStorage.getItem('pokedex')));
};


const addCard = (pokemon) => {
  var card = document.createElement('div');
  card.classList.add('card');
  card.innerText = pokemon.name;
  bindCard(card, pokemon);
  gameField.appendChild(card);
}

const addPokemonToPokedex = (pokemonData) => {
  var listItem = document.createElement('li');
  listItem.classList.add('pokemon');

  var statsAndImageContainer = document.createElement('div');
  statsAndImageContainer.classList.add('pokemon-row');

  var statsContainer = document.createElement('div');
  statsContainer.classList.add('pokemon-stats');

  var pokemonNameInStats = document.createElement('p');
  pokemonNameInStats.classList.add('pokemon-name');
  pokemonNameInStats.textContent = 'Name: ' + pokemonData.name;


  var pokemonImage = document.createElement('div');
  pokemonImage.classList.add('pokemon-image');
  pokemonImage.style.backgroundImage = `url(${pokemonData.image})`;

  var pokemonId = document.createElement('p');
  pokemonId.classList.add('pokemon-id');
  pokemonId.textContent = 'ID: ' + pokemonData.id;

  var pokemonTypes = document.createElement('p');
  pokemonTypes.classList.add('pokemon-types');
  pokemonTypes.textContent = 'Type(s): ' + pokemonData.types.join(', ');

  var pokemonHeight = document.createElement('p');
  pokemonHeight.classList.add('pokemon-height');
  pokemonHeight.textContent = 'Height: ' + pokemonData.height;

  var pokemonWeight = document.createElement('p');
  pokemonWeight.classList.add('pokemon-weight');
  pokemonWeight.textContent = 'Weight: ' + pokemonData.weight;

  statsContainer.appendChild(pokemonNameInStats);
  statsContainer.appendChild(pokemonId);
  statsContainer.appendChild(pokemonTypes);
  statsContainer.appendChild(pokemonHeight);
  statsContainer.appendChild(pokemonWeight);

  statsAndImageContainer.appendChild(statsContainer);
  statsAndImageContainer.appendChild(pokemonImage);

  listItem.appendChild(statsAndImageContainer);

  // Remove button
  var removeButton = document.createElement('button');
  removeButton.classList.add('pokemon-delete');
  removeButton.textContent = 'Remove';
  removeButton.addEventListener('click', () => {
    console.log('Remove button clicked');
    pokedexList.removeChild(listItem);

    removeFromLocalStorage(pokemonData);
    savePokedexToLocalStorage();
  });

  listItem.appendChild(removeButton);
  pokedexList.appendChild(listItem);

}

const savePokemonDataToLocalStorage = (pokemon) => {
  const savedPokedex = JSON.parse(localStorage.getItem('pokedex')) || [];

  savedPokedex.push({
    id: pokemon.id,
    name: pokemon.name,
    image: pokemon.image,
    types: pokemon.types,
    height: pokemon.height,
    weight: pokemon.weight,
  });

  localStorage.setItem('pokedex', JSON.stringify(savedPokedex));
}

const loadPokedexFromLocalStorage = (filterType = 'all') => {
  const savedPokedex = JSON.parse(localStorage.getItem('pokedex')) || [];
  // Clear the existing content of the pokedexList before loading new items
  pokedexList.innerHTML = '';

  savedPokedex.forEach((pokemonData) => {
    if (filterType === 'all' || pokemonData.types.includes(filterType)) {
      addPokemonToPokedex(pokemonData);
    }
  });
}

const removeFromLocalStorage = (pokemon) => {
  const savedPokedex = JSON.parse(localStorage.getItem('pokedex')) || [];
  const updatedPokedex = savedPokedex.filter((savedPokemon) => savedPokemon.id !== pokemon.id);
  localStorage.setItem('pokedex', JSON.stringify(updatedPokedex));

  savePokedexToLocalStorage();
}

const getPokemonDataFromListItem = () => {
  const pokemonData = {
    id: listItem.getAttribute('data-id'),
    name: (listItem.querySelector('.pokemon-name') || {}).textContent?.replace('Name: ', ''),
    image: (listItem.querySelector('.pokemon-image') || {}).style.backgroundImage?.replace(/url\(["']?([^"']*)["']?\)/, '$1') || '',
    types: (listItem.querySelector('.pokemon-types') || {}).textContent?.replace('Type(s): ', '').split(', ') || [],
    height: (listItem.querySelector('.pokemon-height') || {}).textContent?.replace('Height: ', ''),
    weight: (listItem.querySelector('.pokemon-weight') || {}).textContent?.replace('Weight: ', ''),
  };

  console.log('Extracted Pokemon Data:', pokemonData);

  return pokemonData;
}

loadPokedexFromLocalStorage();

document.addEventListener('DOMContentLoaded', () => {
  fetchPokemons();
  loadPokedexFromLocalStorage();

  document.getElementById('pokedexButton').addEventListener('click', togglePokedex);

  playAgainButton.addEventListener('click', playAgain);
  typeFilter.addEventListener('change', filterPokedexByType);
});

const togglePokedex = () => {
  // Toggle the visibility of the Pokedex list
  pokedexList.classList.toggle('hidden');
}

const filterPokedexByType = () => {
  var typeFilter = document.getElementById('typeFilter').value;
  loadPokedexFromLocalStorage(typeFilter);
}

//  Reset the game and fetch new Pokemons
const playAgain = () => {
  resetGame();
  fetchPokemons();
}

//  Reset game variables
const resetGame = () => {
  pokemons = [];
  firstCard = null;
  secondCard = null;
  points = 0;
  nCardsRevealed = 0;
  startTime = null;
  clearInterval(timerInterval);
  timeContainer.innerText = 'Your Time: 00:00:00';
  pointsContainer.innerText = '0';
  gameField.innerHTML = '';
}