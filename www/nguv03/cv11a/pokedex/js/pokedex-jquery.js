const createPokemonForm = () => {
    const pokemonForm = $('<form>').addClass('pokemon-form');

    const pokemonFormRow = $('<div class="row">');

    const pokemonNameInput = $('<input>')
        .addClass('pokemon-name')
        .attr('name', 'pokemon-name');

    const pokemonSubmitButton = $('<button>').addClass('submit-button');
    pokemonSubmitButton.text('Add pokemon');

    pokemonFormRow.append(
        pokemonNameInput,
        pokemonSubmitButton,
    );

    pokemonForm.append(
        pokemonFormRow,
    );

    pokemonForm.on('submit', (event) => {
        event.preventDefault();
        const pokemonNames = pokemonNameInput.val().trim().toLowerCase();
        if (pokemonNames === '') {
            return false;
        }
        const pokemonNameTokens = pokemonNames.split(/, */);
        const existingPokemons = [];
        
        $('div.pokemon-name').each(function () {
            const t = $(this);
            const existingPokemonName = t.text();
            existingPokemons.push(existingPokemonName);
        });
        // .map((pokemonNameContainer) => {
        //     return pokemonNameContainer.textContent;
        // });
        const newPokemonElements = [];
        pokemonNameTokens.forEach((token) => {
            const pokemonAlreadyExists = existingPokemons.includes(token);
            if (pokemonAlreadyExists) {
                return false;
            }
            const newPokemon = createNewPokemon(token);
            newPokemonElements.push(newPokemon);
        });
        pokemonList.append(newPokemonElements);
    });

    return pokemonForm;
};

const createNewPokemon = (pokemonName) => {
    const pokemonElement = $('<li>').addClass('pokemon');

    const pokemonNameElement = $('<div>').addClass('pokemon-name');
    pokemonNameElement.text(pokemonName);

    const pokemonImage = $('<img>').addClass('pokemon-image');
    // const pokemonImageURL = 'https://img.pokemondb.net/artwork/' + pokemonName + '.jpg';
    const pokemonImageURL = `https://img.pokemondb.net/artwork/${pokemonName}.jpg`;
    pokemonImage.attr('src', pokemonImageURL);
    pokemonImage.attr('alt', pokemonName);

    const pokemonRemoveButton = $(`<button>Remove</button>`).addClass('pokemon-remove');

    pokemonRemoveButton.on('click', () => {
        pokemonElement.remove();
    });

    pokemonElement.append(
        pokemonNameElement,
        pokemonImage,
        pokemonRemoveButton,
    );
    
    const pokemonDataURL = `https://pokeapi.co/api/v2/pokemon/${pokemonName}`;
    $.getJSON(pokemonDataURL).done((data) => {
        const pokemonHeight = data.height;
        const pokemonHeightContainer = $('<div>').addClass('pokemon-height');
        pokemonHeightContainer.text(`Height: ${pokemonHeight}`);
        pokemonElement.append(pokemonHeightContainer);
    });

    const pokemonOnClick = () => {
        const pokeName = pokemonNameElement.text();
        pokemonMessage.text(`I CHOOSE YOU! ${pokeName}`);
    };
    pokemonNameElement.on('click', pokemonOnClick);
    pokemonImage.on('click', pokemonOnClick);

    // programaticky klikat
    // - pokemonNameElement.click();
    // programaticky submitovat
    // - form.submit();

    return pokemonElement;
};

const createRemoveAllButton = () => {
    const removeAllButton = $('<button>').addClass('remove-all');
    removeAllButton.text('Remove all');
    removeAllButton.on('click', () => {
        pokemonList.empty();
    });
    return removeAllButton;
};

const appContainer = $('#app');

const pokemonForm = createPokemonForm();
const pokemonRemoveAllButton = createRemoveAllButton();
const pokemonList = $('<ul>').addClass('pokemons');
const pokemonMessage = $('<h2>');
const pokemonSelect = $(`
    <select>
        <option>LIGHT</option>
        <option>DARK</option>
        <option>GRASS</option>
        <option>FIRE</option>
    </select>
`);

appContainer.append(pokemonForm);
appContainer.append(pokemonMessage)
appContainer.append(pokemonSelect)
appContainer.append(pokemonRemoveAllButton);
appContainer.append(pokemonList);
