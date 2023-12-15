const appContainer = $('#app');
const valueInput = $('<input>');
const valueButton = $('<button>Submit</button>');
appContainer.append(valueInput)
appContainer.append(valueButton)
let existingItemValues;
if (localStorage.getItem('items') === null) {
    existingItemValues = [];
} else {
    existingItemValues = JSON.parse(localStorage.getItem('items'));
}

const createItem = (value) => {
    const deleteButton = $(`<button>Delete</button>`).on('click', () => {
        item.remove();
        existingItemValues = existingItemValues.filter((v) => {
            return v !== value;
        });
        localStorage.setItem('items', JSON.stringify(existingItemValues));
    });
    const item = $(`<div>${value}</div>`);
    item.append(deleteButton);
    return item;
};

valueButton.on('click', () => {
    const value = valueInput.val();
    existingItemValues.push(value);
    localStorage.setItem('items', JSON.stringify(existingItemValues));
    appContainer.append(createItem(value));
});
const elements = existingItemValues.map((value) => {
    return createItem(value);
});
appContainer.append(elements);
