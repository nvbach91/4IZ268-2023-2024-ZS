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
    // document.createElement...
};

const createPokemonForm = () => {
    const pokemonForm = document.createElement('form');
    pokemonForm.setAttribute('id', 'pokemon-form');

    pokemonForm.addEventListener('submit', (e) => {
        e.preventDefault();
        addNewPokemonCard(pokemonNameInput.value);
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



