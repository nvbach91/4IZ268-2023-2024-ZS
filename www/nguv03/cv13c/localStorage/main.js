const appContainer = $('#app');
const input = $('<input>');
const button = $('<button>Submit</button>');
appContainer.append(input, button);

let existingValues = [];

if (localStorage.getItem('values') !== null) {
    existingValues = JSON.parse(localStorage.getItem('values'));
}
const createItem = (value) => {
    const item = $(`<div>${value}</div>`);
    const deleteButton = $('<button>Delete</button>');
    deleteButton.on('click', () => {
        item.remove();
        existingValues = existingValues.filter((v) => {
            return v !== value;
        });
        localStorage.setItem('values', JSON.stringify(existingValues));
    });
    item.append(deleteButton);
    return item;
};
const existingItems = existingValues.map((v) => {
    return createItem(v);
});
appContainer.append(existingItems);

button.on('click', () => {
    const value = input.val();
    const item = createItem(value);
    appContainer.append(item);
    existingValues.push(value);
    localStorage.setItem('values', JSON.stringify(existingValues));
});