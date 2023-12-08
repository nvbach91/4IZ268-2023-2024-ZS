const addNewPokemonCard = (pokemonName) => {
    const pokemonCard = $('<li>');

    const pokemonNameContainer = $('<div>').addClass('pokemon-name');
    pokemonNameContainer.text(pokemonName);
    pokemonCard.append(pokemonNameContainer);

    const pokemonImage = $('<img>');
    // pokemonImage.setAttribute('src', 'https://img.pokemondb.net/artwork/' + pokemonName + '.jpg');
    pokemonImage.attr('src', `https://img.pokemondb.net/artwork/${pokemonName}.jpg`);
    pokemonImage.attr('alt', pokemonName);

    pokemonCard.append(pokemonImage);

    const pokemonRemoveButton = $('<button>').text('Remove');
    pokemonRemoveButton.on('click', () => {
        pokemonCard.remove();
    });
    pokemonCard.append(pokemonRemoveButton);

    const pokemonDataURL = `https://pokeapi.co/api/v2/pokemon/${pokemonName}`;
    $.getJSON(pokemonDataURL).done((data) => {
        const pokemonHeight = data.height;
        const pokemonHeightContainer = $('<div>');
        pokemonHeightContainer.text(`Height: ${pokemonHeight}`);
        pokemonCard.append(pokemonHeightContainer);

        const pokemonWeight = data.weight;
        const pokemonWeightContainer = $('<div>');
        pokemonWeightContainer.text(`Weight: ${pokemonWeight}`);
        pokemonCard.append(pokemonWeightContainer);
    });

    const pokemonOnClick = () => {
        const message = pokemonNameContainer.text();
        pokemonMessage.text(`I CHOOSE YOU! ${message}!`);
    };
    pokemonNameContainer.on('click', pokemonOnClick);
    pokemonImage.on('click', pokemonOnClick);

    return pokemonCard;
};

const createPokemonForm = () => {
    const pokemonForm = $('<form>');
    pokemonForm.attr('id', 'pokemon-form');

    pokemonForm.on('submit', (e) => {
        e.preventDefault();
        const pokemonNameValue = pokemonNameInput.val().trim();
        if (pokemonNameValue === '') {
            return false;
        }

        const pokemonNames = pokemonNameValue.split(/, */);
        const newPokemons = [];
        const existingPokemonNames = [];
        $('div.pokemon-name').each(function () {
            existingPokemonNames.push($(this).text());
        });
        // const existingPokemonNames = [
        //     ...document.querySelectorAll('div.pokemon-name')
        // ].map((element) => {
        //     return element.textContent;
        // });
        pokemonNames.forEach((pokemonName) => {
            const pokemonNameAlreadyExists = existingPokemonNames.includes(pokemonName);
            if (pokemonNameAlreadyExists) {
                return false;
            }
            const pokemonCard = addNewPokemonCard(pokemonName);
            newPokemons.push(pokemonCard);
        });
        // spread operator
        pokemonList.append(newPokemons);

        // const ns = [1, 2, 3]
        // func(ns[0], ns[1], ns[2])
        // func(...ns);
    });

    const formRow = $('<div>').addClass('form-row');

    // chaining jquery objects
    const pokemonNameInput = $('<input>')
        .addClass('pokemon-name')
        .attr('name', 'pokemon-name');

    const formSubmitButton = $('<button>')
        .addClass('submit-button')
        .text('Add new pokemon');

    formRow.append(pokemonNameInput, formSubmitButton);
    pokemonForm.append(formRow);

    return pokemonForm;
};

const createRemoveAllButton = () => {
    const button = $('<button>')
        .attr('id', 'remove-all')
        .text('Remove all')
        .on('click', () => {
            pokemonList.empty();
        });
    return button;
};

const appContainer = $('#app');

const pokemonForm = createPokemonForm();
const pokemonRemoveAllButton = createRemoveAllButton();
const pokemonMessage = $('<h2>');
const pokemonList = $('<ul>').attr('id', 'pokemon-list');

appContainer.append(pokemonForm);
appContainer.append(pokemonRemoveAllButton);
appContainer.append(pokemonMessage);
appContainer.append(pokemonList);
