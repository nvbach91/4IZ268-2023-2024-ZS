const createNewPokemon = (pokemonName) => {
    const pokemon = $('<li>').addClass('pokemon-card');

    const pokemonNameContainer = $('<div>')
        .addClass('pokemon-name')
        .text(pokemonName);

    const pokemonImage = $('<img>')
        .addClass('pokemon-image')
        .attr('src', `https://img.pokemondb.net/artwork/${pokemonName}.jpg`)
        .attr('alt', pokemonName);

    const pokemonRemoveButton = $('<button>')
        .addClass('pokemon-remove')
        .text('Remove')
        .on('click', () => {
            pokemon.remove();
        });

    pokemon.append(
        pokemonNameContainer,
        pokemonImage,
        pokemonRemoveButton,
    );
    
    
    const pokemonDataURL = `https://pokeapi.co/api/v2/pokemon/${pokemonName}`;
    $.getJSON(pokemonDataURL).done((data) => {
        const pokemonHeight = data.height;
        const pokemonHeightContainer = $('<div>').text(`Height: ${pokemonHeight}`);
        pokemon.append(pokemonHeightContainer);
    }).fail(() => {
        // chyba - informovat uzivatele
    });
    // $.post()
    // fetch(pokemonDataURL).then((resp) => {
    //     return resp.json();
    // }).then((data) => {
    //     const pokemonHeight = data.height;
    //     const pokemonHeightContainer = $('<div>');
    //     pokemonHeightContainer.textContent = `Height: ${pokemonHeight}`;
    //     pokemon.append(pokemonHeightContainer);
    // });

    const pokemonOnClick = () => {
        const message = `I CHOOSE YOU! ${pokemonName}!`;
        pokemonMessage.text(message);
    };
    pokemonNameContainer.on('click', pokemonOnClick);
    pokemonImage.on('click', pokemonOnClick);

    return pokemon;
};

const createPokemonForm = () => {
    const pokemonForm = $('<form>').addClass('pokemon-form');

    pokemonForm.on('submit', (e) => {
        e.preventDefault();
        if (pokemonInput.val().trim().length > 0) {
            const pokemonNames = pokemonInput.val().trim().split(/ *, */);
            const newPokemons = [];
            const existingPokemonNames = [];
            $('.pokemon-name').each(function () {
                const pokemonName = $(this).text();
                existingPokemonNames.push(pokemonName);
            });
            pokemonNames.forEach((pokemonName) => {
                const pokemonNameAlreadyExists = existingPokemonNames.includes(pokemonName);
                if (pokemonNameAlreadyExists) {
                    return false;
                }
                const newPokemon = createNewPokemon(pokemonName);
                newPokemons.push(newPokemon);
            });
            pokemonList.append(newPokemons);
            pokemonInput.val('');
        }
    });

    const pokemonFormRow = $('<div>').addClass('form-row');
    
    const pokemonInput = $('<input>')
        .addClass('pokemon-input')
        .attr('name', 'pokemon-input');
    
    // const pokemonInput = $(`
    //     <input class="pokemon-input" name="pokemon-input">
    // `);
    
    const submitButton = $('<button>')
        .addClass('submit-button')
        .text('Add pokemon');

    pokemonFormRow.append(pokemonInput, submitButton);
    pokemonForm.append(pokemonFormRow);

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
const pokemonList = $('<ul>').addClass('pokemon-list');

appContainer.append(pokemonForm);
appContainer.append(pokemonRemoveAllButton);
appContainer.append(pokemonMessage);
appContainer.append(pokemonList);
