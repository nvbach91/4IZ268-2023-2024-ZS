const appContainer = $('#app');
const input = $('<input>');
const button = $('<button>Submit</button>');
appContainer.append(input, button);
let existingPokemons;
if (localStorage.getItem('pokemons') === null) {
    existingPokemons = [];
} else {
    existingPokemons = JSON.parse(localStorage.getItem('pokemons'));
}
const createItem = (value) => {
    const item = $(`<div>${value}</div>`);
    const deleteButton = $('<button>Delete</button>').on('click', () => {
        item.remove();
        existingPokemons = existingPokemons.filter((p) => {
            return p !== value;
        });
        localStorage.setItem('pokemons', JSON.stringify(existingPokemons));
    });
    item.append(deleteButton);
    return item;
};
const items = existingPokemons.map((pokemon) => {
    return createItem(pokemon);
});
appContainer.append(items);
button.on('click', () => {
    const value = input.val();
    const item = createItem(value);
    appContainer.append(item);
    existingPokemons.push(value);
    const toSaveValue = JSON.stringify(existingPokemons);
    localStorage.setItem('pokemons', toSaveValue);
});
