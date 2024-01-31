const header = $('<h1>').addClass('page-header').text('Drinkopedia')

const searchGroup = $('<div>').addClass('input-group mb-3');
const searchInput = $('<input>')
    .attr('type', 'text')
    .attr('id', 'searchInput')
    .attr('placeholder', 'Search for a drink')
    .addClass('form-control');

const searchTypeSelect = $('<select>')
    .attr('id', 'searchType')
    .addClass('form-control type-switch');
const searchButton = $('<button>')
    .attr('id', 'searchButton')
    .addClass('btn btn-primary')
    .text('Search');

searchGroup.append(searchInput, searchTypeSelect, searchButton);

const colSm8FirstRow = $('<div>').addClass('row fisrt-row-class');
const colSm6Img = $('<div>').addClass('col-sm-6 img-class');
const colSm6Details = $('<div>').addClass('col-sm-6 details-class');

const colSm8SecondRow = $('<div>').addClass('row');
const recipeContainer = $('<div>').addClass('col-sm-12 recipe-class');

const favoritesContainer = $('<div>')
    .attr('id', 'favoritesContainer')
    .addClass('favourite-container');

let favorites = JSON.parse(localStorage.getItem('favorites')) || [];

$(function () {
    searchInput.autocomplete({
        minLength: 3,
        source: function (request, response) {
            const searchType = searchTypeSelect.val();

            if (searchType === 'Name') {
                $.getJSON(
                    `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${request.term}`,
                    function (data) {
                        if (data.drinks) {
                            response(data.drinks.map((drink) => ({ label: drink.strDrink, value: drink.strDrink })));
                        } else {
                            response([]);
                        }
                    }
                );
            }
        },
        open: function () {
            $(this).autocomplete('widget').addClass('autocomplete-css')
        }
    });
});

const searchTypes = ['Name', 'Ingredient'];
searchTypes.forEach(type => {
    searchTypeSelect.append($('<option>', { value: type, text: type }));
});

searchButton.on('click', function () {
    const searchTerm = searchInput.val().trim();
    const searchType = searchTypeSelect.val();

    if (searchTerm !== '') {
        if (searchType === 'Name') {
            searchForDrinkByName(searchTerm);
        } else if (searchType === 'Ingredient') {
            searchForDrinksByIngredient(searchTerm);
        }
    }
});

function searchForDrinkByName(searchTerm) {
    $.ajax({
        url: `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${searchTerm}`,
        method: 'GET',
        success: function (data) {
            if (data.drinks) {
                const drink = data.drinks[0];
                displayDrinkDetails(drink);
            } else {
                displayErrorMessage('Drink not found!');
            }
        },
        error: function (error) {
            console.error('Error searching for drink: ', error);
            displayErrorMessage('An error occurred while searching for the drink.');
        }
    });
}

function searchForDrinksByIngredient(searchTerm) {
    $.ajax({
        url: `https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${searchTerm}`,
        method: 'GET',
        success: function (data) {
            if (data.drinks) {
                displayDrinkList(data.drinks);
            } else {
                displayErrorMessage('No drinks found with the specified ingredient!');
            }
        },
        error: function (error) {
            console.error('Error searching for drinks by ingredient: ', error);
            displayErrorMessage('An error occurred while searching for drinks by ingredient.');
        }
    });
}

function displayDrinkList(drinks) {
    colSm8FirstRow.empty();
    recipeContainer.empty();

    const drinksList = $('<ul>');

    drinks.forEach(function (drink) {
        const drinkItem = $('<li>').text(drink.strDrink);

        drinkItem.on('click', function () {
            searchForDrinkByName(drink.strDrink);
        });

        drinksList.append(drinkItem);
    });

    colSm8FirstRow.append(drinksList);
}

function displayDrinkDetails(drink) {

    colSm8FirstRow.empty();
    colSm6Img.empty();
    colSm6Details.empty();
    recipeContainer.empty();

    const drinkName = $('<h3>').text(drink.strDrink);
    const drinkImage = $('<img>').attr('src', drink.strDrinkThumb).attr('alt', drink.strDrink).addClass('img-fluid');
    const drinkInstructions = $('<p>').text(drink.strInstructions);
    const drinkGlass = $('<p>').text(`Glass: ${drink.strGlass || 'N/A'}`);

    const ingredientsTitle = $('<h4>').text('Ingredients');
    const ingredientsList = $('<ul>');
    for (let i = 1; i <= 15; i++) {
        const ingredient = drink['strIngredient' + i];
        const measure = drink['strMeasure' + i];

        if (ingredient && measure) {
            const listItem = $('<li>').text(`${measure} ${ingredient}`);
            ingredientsList.append(listItem);
        }
    }

    const addToFavoritesButton = $('<button>').text('Add to Favorites').addClass('btn btn-primary');
    addToFavoritesButton.on('click', function () {
        addToFavorites(drink);
    });

    colSm6Img.append(drinkImage);
    colSm6Details.append(drinkName, drinkGlass, ingredientsTitle, ingredientsList, addToFavoritesButton);
    colSm8FirstRow.append(colSm6Img, colSm6Details);

    const Instructions = $('<h4>').text('Instructions');
    recipeContainer.append(Instructions, drinkInstructions);
    colSm8SecondRow.append(recipeContainer);
}

function saveFavoritesToLocalStorage() {
    localStorage.setItem('favorites', JSON.stringify(favorites));
}

function addToFavorites(drink) {
    if (!isFavorite(drink)) {
        favorites.push(drink);
        updateFavoritesList();
        saveFavoritesToLocalStorage();
    }
}

function isFavorite(drink) {
    return favorites.some(favorite => favorite.idDrink === drink.idDrink);
}

function updateFavoritesList() {
    favoritesContainer.empty();
    const favoritesTitle = $('<h2>').text('Favorite Drinks');

    if (favorites.length > 0) {
        const favoritesList = $('<ul>').addClass('favouriteDrinks');

        favorites.forEach(function (favorite) {
            const favoriteItem = $('<li>').text(favorite.strDrink);

            const removeFromFavoritesButton = $('<button>').text('Remove').addClass('btn btn-primary remove-button');
            removeFromFavoritesButton.on('click', function (event) {
                event.stopPropagation();
                removeFromFavorites(favorite);
            });

            favoriteItem.append(removeFromFavoritesButton);

            favoriteItem.on('click', function () {
                displayDrinkDetails(favorite);
            });

            favoritesList.append(favoriteItem);
        });

        favoritesContainer.append(favoritesTitle, favoritesList);
    } else {
        favoritesContainer.append(favoritesTitle);
    }
}

function removeFromFavorites(drink) {
    favorites = favorites.filter(favorite => favorite.idDrink !== drink.idDrink);
    updateFavoritesList();
    saveFavoritesToLocalStorage();
}

function displayErrorMessage(message) {
    searchInput.val(message);

    setTimeout(function() {
        searchInput.val('');
    }, 2000);
}

searchInput.val('mojito');
searchButton.click();
updateFavoritesList();

const pageFooter = $('<div>').addClass('page-footer container')
const pageFooterText = $('<p>').addClass('page-copyright').text('Marek Smetana 2023 ©')

pageFooter.append(pageFooterText);

const colSm8 = $('<div>').addClass('col-sm-8').append(colSm8FirstRow, colSm8SecondRow);
const colSm4 = $('<div>').addClass('col-sm-4').append(favoritesContainer);

const appRow1 = $('<div>').addClass('row custom-height').append(colSm8, colSm4);

const appContainer = $('#app').addClass('container');
appContainer.append(header, searchGroup, appRow1);

$('body').append(appContainer, pageFooter);
