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
        const pokemonNames = pokemonNameInput.value.trim().toLowerCase();
        if (pokemonNames === '') {
            return false;
        }
        const pokemonNameTokens = pokemonNames.split(/, */);
        const existingPokemons = [
            ...document.querySelectorAll('div.pokemon-name')
        ].map((pokemonNameContainer) => {
            return pokemonNameContainer.textContent;
        });
        const newPokemonElements = [];
        pokemonNameTokens.forEach((token) => {
            const pokemonAlreadyExists = existingPokemons.includes(token);
            if (pokemonAlreadyExists) {
                return false;
            }
            const newPokemon = createNewPokemon(token);
            newPokemonElements.push(newPokemon);
        });
        pokemonList.append(
            ...newPokemonElements,
        );
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
    // const pokemonImageURL = 'https://img.pokemondb.net/artwork/' + pokemonName + '.jpg';
    const pokemonImageURL = `https://img.pokemondb.net/artwork/${pokemonName}.jpg`;
    pokemonImage.setAttribute('src', pokemonImageURL);
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
    
    const pokemonDataURL = `https://pokeapi.co/api/v2/pokemon/${pokemonName}`;
    fetch(pokemonDataURL).then((resp) => {
        return resp.json();
    }).then((data) => {
        const pokemonHeight = data.height;
        const pokemonHeightContainer = document.createElement('div');
        pokemonHeightContainer.classList.add('pokemon-height');
        pokemonHeightContainer.textContent = `Height: ${pokemonHeight}`;
        pokemonElement.append(pokemonHeightContainer);
    });

    const pokemonOnClick = () => {
        const pokeName = pokemonNameElement.textContent;
        pokemonMessage.textContent = `I CHOOSE YOU! ${pokeName}`;
    };
    pokemonNameElement.addEventListener('click', pokemonOnClick);
    pokemonImage.addEventListener('click', pokemonOnClick);

    return pokemonElement;
};

const createRemoveAllButton = () => {
    const removeAllButton = document.createElement('button');
    removeAllButton.classList.add('remove-all');
    removeAllButton.textContent = 'Remove all';
    removeAllButton.addEventListener('click', () => {
        pokemonList.innerHTML = '';
    });
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
const pokemonMessage = document.createElement('h2');

appContainer.append(pokemonForm);
appContainer.append(pokemonMessage)
appContainer.append(pokemonRemoveAllButton);
appContainer.append(pokemonList);
