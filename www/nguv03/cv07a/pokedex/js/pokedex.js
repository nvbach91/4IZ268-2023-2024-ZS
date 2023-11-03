const createPokemonForm = () => {
    const pokemonForm = document.createElement('form');
    pokemonForm.classList.add('pokemon-form');

    const pokemonFormRow = document.createElement('div');
    pokemonFormRow.classList.add('row');

    const pokemonNameInput = document.createElement('input');
    pokemonNameInput.classList.add('pokemon-name');
    pokemonNameInput.setAttribute('name', 'pokemon-name');

    const pokemonSubmitButton = document.createElement('button');
    pokemonSubmitButton.classList.add('submit-button');
    pokemonSubmitButton.textContent = 'Add pokemon';

    pokemonFormRow.append(
        pokemonNameInput,
        pokemonSubmitButton,
    );

    pokemonForm.append(
        pokemonFormRow,
    );

    pokemonForm.addEventListener('submit', (event) => {
        event.preventDefault();
        const pokemonName = pokemonNameInput.value;
        const newPokemon = createNewPokemon(pokemonName);
        pokemonList.append(newPokemon);
    });

    return pokemonForm;
};

const createNewPokemon = (pokemonName) => {
    // <li class="pokemon">
    //     <div class="pokemon-name"></div>
    //     <img class="pokemon-image" src="..." alt="pokemon">
    //     <button class="pokemon-remove">Remove</button>
    // </li>

    const pokemonElement = document.createElement('li');
    pokemonElement.classList.add('pokemon');

    const pokemonNameElement = document.createElement('div');
    pokemonNameElement.classList.add('pokemon-name');
    pokemonNameElement.textContent = pokemonName;

    const pokemonImage = document.createElement('img');
    pokemonImage.classList.add('pokemon-image');
    pokemonImage.setAttribute('src', '');
    pokemonImage.setAttribute('alt', pokemonName);

    const pokemonRemoveButton = document.createElement('button');
    pokemonRemoveButton.textContent = 'Remove';
    pokemonRemoveButton.classList.add('pokemon-remove');

    pokemonRemoveButton.addEventListener('click', () => {
        pokemonElement.remove();
    });

    pokemonElement.append(
        pokemonNameElement,
        pokemonImage,
        pokemonRemoveButton,
    );

    return pokemonElement;
};

const createRemoveAllButton = () => {
    const removeAllButton = document.createElement('button');
    removeAllButton.classList.add('remove-all');
    removeAllButton.textContent = 'Remove all';
    return removeAllButton;
};

const createPokemonList = () => {
    const pokemonList = document.createElement('ul');
    pokemonList.classList.add('pokemons');
    return pokemonList;
};

const appContainer = document.querySelector('#app');

const pokemonForm = createPokemonForm();
const pokemonRemoveAllButton = createRemoveAllButton();
const pokemonList = createPokemonList();

appContainer.append(pokemonForm);
appContainer.append(pokemonRemoveAllButton);
appContainer.append(pokemonList);
