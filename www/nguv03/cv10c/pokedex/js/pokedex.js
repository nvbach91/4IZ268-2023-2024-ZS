const createNewPokemon = (pokemonName) => {
    const pokemon = document.createElement('li');
    pokemon.classList.add('pokemon-card');

    const pokemonNameContainer = document.createElement('div');
    pokemonNameContainer.classList.add('pokemon-name');
    pokemonNameContainer.textContent = pokemonName;

    const pokemonImage = document.createElement('img');
    pokemonImage.classList.add('pokemon-image');
    // pokemonImage.setAttribute('src', 'https://img.pokemondb.net/artwork/' + pokemonName + '.jpg');
    pokemonImage.setAttribute('src', `https://img.pokemondb.net/artwork/${pokemonName}.jpg`);
    pokemonImage.setAttribute('alt', pokemonName);

    const pokemonRemoveButton = document.createElement('button');
    pokemonRemoveButton.classList.add('pokemon-remove');
    pokemonRemoveButton.textContent = 'Remove';
    pokemonRemoveButton.addEventListener('click', () => {
        pokemon.remove();
    });

    pokemon.append(
        pokemonNameContainer,
        pokemonImage,
        pokemonRemoveButton,
    );
    
    
    const pokemonDataURL = `https://pokeapi.co/api/v2/pokemon/${pokemonName}`;
    fetch(pokemonDataURL).then((resp) => {
        return resp.json();
    }).then((data) => {
        const pokemonHeight = data.height;
        const pokemonHeightContainer = document.createElement('div');
        pokemonHeightContainer.textContent = `Height: ${pokemonHeight}`;
        pokemon.append(pokemonHeightContainer);
    });

    return pokemon;
};

const createPokemonForm = () => {
    const pokemonForm = document.createElement('form');
    pokemonForm.classList.add('pokemon-form');

    pokemonForm.addEventListener('submit', (e) => {
        e.preventDefault();
        if (pokemonInput.value.trim().length > 0) {
            const pokemonNames = pokemonInput.value.trim().split(/ *, */);
            const newPokemons = [];
            pokemonNames.forEach((pokemonName) => {
                const newPokemon = createNewPokemon(pokemonName);
                newPokemons.push(newPokemon);
            });
            pokemonList.append(
                ...newPokemons,
            );
            pokemonInput.value = '';
        }
    });

    const pokemonFormRow = document.createElement('div');
    pokemonFormRow.classList.add('form-row');
    
    const pokemonInput = document.createElement('input');
    pokemonInput.classList.add('pokemon-input');
    pokemonInput.setAttribute('name', 'pokemon-input');
    
    const submitButton = document.createElement('button');
    submitButton.classList.add('submit-button');
    submitButton.textContent = 'Add pokemon';

    pokemonFormRow.append(pokemonInput, submitButton);
    pokemonForm.append(pokemonFormRow);

    return pokemonForm;
};

const createRemoveAllButton = () => {
    const button = document.createElement('button');
    button.setAttribute('id', 'remove-all');
    button.textContent = 'Remove all';
    button.addEventListener('click', () => {
        pokemonList.innerHTML = '';
    });
    return button;
};

const createPokemonList = () => {
    const list = document.createElement('ul');
    list.classList.add('pokemon-list');
    return list;
};


const appContainer = document.querySelector('#app');

const pokemonForm = createPokemonForm();
const pokemonRemoveAllButton = createRemoveAllButton();
const pokemonList = createPokemonList();

appContainer.append(pokemonForm);
appContainer.append(pokemonRemoveAllButton);
appContainer.append(pokemonList);
