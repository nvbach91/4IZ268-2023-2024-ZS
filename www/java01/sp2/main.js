var pokemons = [];
var firstCard = null;
var secondCard = null;
var points = 0;
var nCardsRevealed = 0;
var startTime;
var timerInterval;

var gameField = document.querySelector('#game-field');
var pointsContainer = document.querySelector('#points');
var timeContainer = document.querySelector('#time');
var pokedexList = document.getElementById('pokemon-list');

document.addEventListener('DOMContentLoaded', function () {
  // Fetch Pokemons and initialize game
  fetchPokemons();

  // Load Pokedex from local storage
  loadPokedexFromLocalStorage();
});

async function fetchPokemons() {
  // Check if there are saved Pokemon data in local storage
  const savedPokedex = JSON.parse(localStorage.getItem('pokedex')) || [];

  // Fetch new Pokemon data and initialize the game field
  for (let i = 1; i <= 10; i++) {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${i}`);
    const data = await response.json();
    pokemons.push({
      id: data.id,
      name: data.name,
      image: `https://img.pokemondb.net/artwork/${data.name.toLowerCase()}.jpg`,
      types: data.types.map(type => type.type.name),
      height: data.height,
      weight: data.weight
    });
  }

  // Initialize the game field with the fetched Pokemon data
  initializeGame(pokemons);

  // Load Pokedex from local storage
  loadPokedexFromLocalStorage();
}






function initializeGame() {
  // Clear the game field before adding new cards
  gameField.innerHTML = '';

  // Create a copy of the pokemons array
  var uniquePokemons = pokemons.slice();
  uniquePokemons = uniquePokemons.concat(pokemons);
  uniquePokemons.sort(() => 0.5 - Math.random());

  uniquePokemons.forEach(function (pokemon) {
    // Check if the Pokemon with the same ID is already in the Pokedex
    if (!document.querySelector(`.pokemon-id[data-id="${pokemon.id}"]`)) {
      addCard(pokemon);
    }
  });

  gameField.addEventListener('click', startGame);
}




function startGame() {
  if (!startTime) {
    startTime = new Date().getTime();
    timerInterval = setInterval(updateTimer, 1000);

    // Remove the click event listener only after the first click
    gameField.removeEventListener('click', startGame);
  }
}



function updateTimer() {
  if (nCardsRevealed === pokemons.length * 2) {
    clearInterval(timerInterval);
    var currentTime = new Date().getTime();
    var elapsedSeconds = Math.floor((currentTime - startTime) / 1000);
    var finalTime = formatTime(elapsedSeconds);
    timeContainer.innerText = `Your Time: ${finalTime}`;

    // Check if all matches are made
    if (points === pokemons.length * 2) {
      setTimeout(function () {
        alert('🎉 WINNER! 🎉 You have completed the game with ' + points + ' points and your final time is ' + finalTime);
      }, 1000);
    }
    return;
  }

  var currentTime = new Date().getTime();
  var elapsedSeconds = Math.floor((currentTime - startTime) / 1000);
  var currentTimeFormatted = formatTime(elapsedSeconds);
  timeContainer.innerText = `Your Time: ${currentTimeFormatted}`;
}





function formatTime(seconds) {
  var hours = Math.floor(seconds / 3600);
  var minutes = Math.floor((seconds % 3600) / 60);
  var remainingSeconds = seconds % 60;

  return (
    (hours < 10 ? '0' : '') + hours + ':' +
    (minutes < 10 ? '0' : '') + minutes + ':' +
    (remainingSeconds < 10 ? '0' : '') + remainingSeconds
  );
}

var bindCard = function (card, pokemon) {
  card.addEventListener('click', function () {
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
        setTimeout(function () {
          alert('🎉 WINNER! 🎉 You have completed the game with ' + points + ' points and your final time is ' + finalTime);
        }, 1000);
      }
    } else {
      points--;
      if (points < 0) {
        points = 0;
      }
      setTimeout(function () {
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

// Modify addToPokedex function
var addToPokedex = function (pokemon) {
  // Check if the Pokemon with the same ID is already in the Pokedex
  if (document.querySelector(`.pokemon-id[data-id="${pokemon.id}"]`)) {
    console.log('Pokemon is already in the Pokedex.');
    return;
  }

  var listItem = document.createElement('li');
  listItem.classList.add('pokemon');

  // Extract necessary information from the complete Pokemon data
  const { id, name, image, types, height, weight } = pokemon;

  var pokemonNameInStats = document.createElement('p');
  pokemonNameInStats.classList.add('pokemon-name');
  pokemonNameInStats.textContent = 'Name: ' + name;

  // Add a data-id attribute to identify the Pokemon by ID
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
  removeButton.addEventListener('click', function () {
    console.log('Remove button clicked');
    pokedexList.removeChild(listItem);

    // Remove Pokemon from local storage
    removeFromLocalStorage(pokemon);

    // Save Pokedex to local storage
    savePokedexToLocalStorage();
  });

  listItem.appendChild(removeButton);

  pokedexList.appendChild(listItem);

  // Save Pokedex to local storage after adding a new Pokemon
  savePokedexToLocalStorage();

  console.log('Pokedex after adding:', JSON.parse(localStorage.getItem('pokedex')));
};







function addPokemonToPokedex(pokemonData) {
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
  removeButton.addEventListener('click', function () {
    console.log('Remove button clicked');
    pokedexList.removeChild(listItem);

    // Remove Pokemon from local storage
    removeFromLocalStorage(pokemonData);

    // Save Pokedex to local storage
    savePokedexToLocalStorage();
  });

  listItem.appendChild(removeButton);

  pokedexList.appendChild(listItem);
}




function savePokedexToLocalStorage() {
  localStorage.setItem('pokedex', JSON.stringify(Array.from(pokedexList.children).map(getPokemonDataFromListItem)));
}


// Load Pokedex from local storage
function loadPokedexFromLocalStorage() {
  const savedPokedex = JSON.parse(localStorage.getItem('pokedex')) || [];
  // Clear the existing content of the pokedexList before loading new items
  pokedexList.innerHTML = '';

  savedPokedex.forEach(function (pokemonData) {
    addPokemonToPokedex(pokemonData);
  });
}



// Remove Pokemon from local storage
function removeFromLocalStorage(pokemon) {
  const savedPokedex = JSON.parse(localStorage.getItem('pokedex')) || [];
  const updatedPokedex = savedPokedex.filter((savedPokemon) => savedPokemon.id !== pokemon.id);
  localStorage.setItem('pokedex', JSON.stringify(updatedPokedex));

  // Save the updated Pokedex to local storage after removing the Pokemon
  savePokedexToLocalStorage();
}


function getPokemonDataFromListItem(listItem) {
  const pokemonData = {
    id: listItem.getAttribute('data-id'),
    name: (listItem.querySelector('.pokemon-name') || {}).textContent?.replace('Name: ', ''),
    image: (listItem.querySelector('.pokemon-image') || {}).style.backgroundImage?.replace(/url\(["']?([^"']*)["']?\)/, '$1') || '',
    types: (listItem.querySelector('.pokemon-types') || {}).textContent?.replace('Type(s): ', '').split(', ') || [],
    height: (listItem.querySelector('.pokemon-height') || {}).textContent?.replace('Height: ', ''),
    weight: (listItem.querySelector('.pokemon-weight') || {}).textContent?.replace('Weight: ', ''),
  };
  return pokemonData;
}





var addCard = function (pokemon) {
  var card = document.createElement('div');
  card.classList.add('card');
  card.innerText = pokemon.name;
  bindCard(card, pokemon);
  gameField.appendChild(card);
};

// Load Pokedex from local storage after initializing the game
loadPokedexFromLocalStorage();
