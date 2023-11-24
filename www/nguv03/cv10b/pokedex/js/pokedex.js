/*
const list = document.querySelector('.items');
console.log(list);

const listItems = document.querySelectorAll('.item');
console.log(listItems);

const changeButton = document.querySelector('#change-button');
changeButton.addEventListener('mouseover', () => {
    listItems.forEach((listItem) => {
        listItem.textContent = 'Wow this works!';
    });
});

const addButton = document.createElement('button');
addButton.textContent = 'Add new item';
addButton.setAttribute('id', 'add-item');
addButton.addEventListener('click', () => {
    const newItem = document.createElement('li');
    newItem.textContent = 'Lorem ipsum';
    newItem.classList.add('item');
    list.append(newItem);
});
document.body.append(addButton);
*/

const addNewPokemonCard = (pokemonName) => {
    const pokemonCard = document.createElement('li');
    
    const pokemonNameContainer = document.createElement('div');
    pokemonNameContainer.classList.add('pokemon-name');
    pokemonNameContainer.textContent = pokemonName;
    pokemonCard.append(pokemonNameContainer);

    const pokemonImage = document.createElement('img');
    // pokemonImage.setAttribute('src', 'https://img.pokemondb.net/artwork/' + pokemonName + '.jpg');
    pokemonImage.setAttribute('src', `https://img.pokemondb.net/artwork/${pokemonName}.jpg`);
    pokemonImage.setAttribute('alt', pokemonName);

    pokemonCard.append(pokemonImage);

    const pokemonDataURL = `https://pokeapi.co/api/v2/pokemon/${pokemonName}`;
    fetch(pokemonDataURL).then((resp) => {
        return resp.json();
    }).then((data) => {
        const pokemonHeight = data.height;
        const pokemonHeightContainer = document.createElement('div');
        pokemonHeightContainer.textContent = `Height: ${pokemonHeight}`;
        pokemonCard.append(pokemonHeightContainer);

        const pokemonWeight = data.weight;
        const pokemonWeightContainer = document.createElement('div');
        pokemonWeightContainer.textContent = `Weight: ${pokemonWeight}`;
        pokemonCard.append(pokemonWeightContainer);
    });

    return pokemonCard;
};

const createPokemonForm = () => {
    const pokemonForm = document.createElement('form');
    pokemonForm.setAttribute('id', 'pokemon-form');

    pokemonForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const pokemonNameValue = pokemonNameInput.value.trim();
        if (pokemonNameValue === '') {
            return false;
        }

        const pokemonNames = pokemonNameValue.split(/, */);

        pokemonNames.forEach((pokemonName) => {
            const pokemonCard = addNewPokemonCard(pokemonName);
            pokemonList.append(pokemonCard);
        });
    });

    const formRow = document.createElement('div');
    formRow.classList.add('form-row');

    const pokemonNameInput = document.createElement('input');
    pokemonNameInput.classList.add('pokemon-name');
    pokemonNameInput.setAttribute('name', 'pokemon-name');

    const formSubmitButton = document.createElement('button');
    formSubmitButton.classList.add('submit-button');
    formSubmitButton.textContent = 'Add new pokemon';

    formRow.append(pokemonNameInput, formSubmitButton);
    pokemonForm.append(formRow);

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
    list.setAttribute('id', 'pokemon-list');
    return list;
};


const appContainer = document.querySelector('#app');

const pokemonForm = createPokemonForm();
const pokemonRemoveAllButton = createRemoveAllButton();
const pokemonList = createPokemonList();

appContainer.append(pokemonForm);
appContainer.append(pokemonRemoveAllButton);
appContainer.append(pokemonList);
