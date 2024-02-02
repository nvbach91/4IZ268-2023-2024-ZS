const loadingSpinner = $(`  <div class="spinner-border" role="status">
                                <span class="sr-only">Loading...</span>
                            </div>`);

const showLoading = () => {
    $(colSm8FirstRow).empty();
    $(colSm8SecondRow).empty();
    $(colSm8FirstRow).append(loadingSpinner);
};

const hideLoading = () => {
    loadingSpinner.remove();
};

const header = $('<h1>').addClass('page-header').text('Drinkopedia')

const searchGroup = $('<form>').addClass('input-group mb-3');
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
        },
        select: function (event, ui) {
            searchForDrinkByName(ui.item.value);
        }
    });
});

const searchTypes = ['Name', 'Ingredient'];
searchTypes.forEach(type => {
    searchTypeSelect.append($('<option>', { value: type, text: type }));
});

searchGroup.on('submit', (e) => {
    e.preventDefault();
    const searchTerm = searchInput.val().trim();
    const searchType = searchTypeSelect.val();

    searchInput.val('');

    if (searchTerm !== '') {
        if (searchType === 'Name') {
            searchForDrinkByName(searchTerm);
        } else if (searchType === 'Ingredient') {
            searchForDrinksByIngredient(searchTerm);
        }
    }
});

function searchForDrinkByName(searchTerm) {
    showLoading();
    $.ajax({
        url: `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${searchTerm}`,
        method: 'GET'
    }).always(hideLoading)
        .done(function (data) {
            if (data.drinks) {
                const drink = data.drinks[0];
                displayDrinkDetails(drink);
            } else {
                displayErrorMessage('Drink not found!');
            }
        }).fail(function (error) {
            console.error('Error searching for drink: ', error);
            displayErrorMessage('An error occurred while searching for the drink.');
        });
}

function searchForDrinksByIngredient(searchTerm) {
    showLoading();
    $.ajax({
        url: `https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${searchTerm}`,
        method: 'GET'
    }).always(hideLoading)
        .done(function (data) {
            if (data.drinks) {
                displayDrinkList(data.drinks);
            } else {
                displayErrorMessage('No drinks found with the specified ingredient!');
            }
        }).fail(function (error) {
            console.error('Error searching for drinks by ingredient: ', error);
            displayErrorMessage('An error occurred while searching for drinks by ingredient.');
        });
}

function displayDrinkList(drinks) {
    const title = $('<h2>').text(`List of Drinks`);

    const drinksList = $('<ul>').addClass('drinks-list');;

    drinks.forEach(function (drink) {
        const drinkItem = $('<li>').text(drink.strDrink);

        drinkItem.on('click', function () {
            searchForDrinkByName(drink.strDrink);
        });

        drinksList.append(drinkItem);
    });

    colSm8FirstRow.empty();
    colSm6Img.empty();
    recipeContainer.remove();

    colSm6Img.append(title, drinksList);
    colSm8FirstRow.append(colSm6Img);
}

function loadSameCategoryDrinks(drinkCategory) {
    showLoading();
    $.ajax({
        url: `https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${drinkCategory}`,
        method: 'GET'
    }).always(hideLoading)
        .done(function (data) {
            if (data.drinks) {
                displayDrinkList(data.drinks);
            } else {
                displayErrorMessage('No drinks found with the specified ingredient!');
            }
        }).fail(function (error) {
            console.error('Error searching for drinks by ingredient: ', error);
            displayErrorMessage('An error occurred while searching for drinks by ingredient.');
        });
}

function displayDrinkDetails(drink) {

    const drinkName = $('<h3>').text(drink.strDrink);
    const drinkImage = $('<img>').attr('src', drink.strDrinkThumb).attr('alt', drink.strDrink).addClass('img-fluid');
    const drinkInstructions = $('<p>').text(drink.strInstructions);
    const drinkGlass = $('<p>').text(`Glass: ${drink.strGlass || 'N/A'}`);
    const drinkTags = $('<p>').text(`Tags: ${drink.strTags || 'N/A'}`);
    const drinkCategory = $('<p>').text(`Category: ${drink.strCategory || 'N/A'}`);

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

    const addToFavoritesButton = $('<button>').text('Add to Favorites').addClass('btn btn-primary details-btn');
    addToFavoritesButton.on('click', function () {
        addToFavorites(drink);
    });

    const showSameCategoryDrinksButton = $('<button>').text('Same category drinks').addClass('btn btn-primary details-btn');
    showSameCategoryDrinksButton.on('click', function () {
        loadSameCategoryDrinks(drink.strCategory);
    });

    colSm8FirstRow.empty();
    colSm6Img.empty();
    colSm6Details.empty();
    recipeContainer.empty();

    colSm6Img.append(drinkImage);
    colSm6Details.append(drinkName, drinkGlass, drinkTags, drinkCategory, ingredientsTitle, ingredientsList, addToFavoritesButton, showSameCategoryDrinksButton);
    colSm8FirstRow.append(colSm6Img, colSm6Details);

    const instructions = $('<h4>').text('Instructions');
    recipeContainer.append(instructions, drinkInstructions);
    colSm8SecondRow.append(recipeContainer);
}

function saveFavoritesToLocalStorage() {
    localStorage.setItem('favorites', JSON.stringify(favorites));
}

function addToFavorites(drink) {
    const drinkId = drink.idDrink;
    const drinkName = drink.strDrink;

    if (!isFavorite(drinkId)) {
        favorites.push({ id: drinkId, name: drinkName });
        updateFavoritesList();
        saveFavoritesToLocalStorage();
    }
}

function isFavorite(drinkId) {
    return favorites.some(favorite => favorite.id === drinkId);
}

function updateFavoritesList() {

    const favoritesTitle = $('<h2>').text('Favorite Drinks');

    if (favorites.length > 0) {
        const favoritesList = $('<ul>').addClass('favourite-drinks');

        favorites.forEach(function (favorite) {
            const favoriteItem = $('<li>').text(favorite.name);

            const removeFromFavoritesButton = $('<button>')
                .text('Remove')
                .addClass('btn btn-primary remove-button')
                .data('drink-name', favorite.name);

            removeFromFavoritesButton.on('click', function (event) {
                event.stopPropagation();

                const favoriteItemName = $(this).data('drink-name');
                removeFromFavorites(favoriteItemName);
            });

            favoriteItem.append(removeFromFavoritesButton);

            favoriteItem.on('click', function () {

                showLoading();

                const favoriteItemName = $(this).contents().filter(function () {
                    return this.nodeType === 3;
                }).text().trim();

                const favoriteItemId = favorites.find(fav => fav.name === favoriteItemName);

                if (favorite) {
                    const favoriteDrinkId = favoriteItemId.id;

                    $.ajax({
                        url: `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${favoriteDrinkId}`,
                        method: 'GET',
                        success: function (data) {
                            if (data.drinks) {
                                const drink = data.drinks[0];
                                hideLoading();
                                displayDrinkDetails(drink);
                            } else {
                                displayErrorMessage('Drink not found!');
                            }
                        },
                        error: function (error) {
                            console.error('Error fetching drink details: ', error);
                            displayErrorMessage('An error occurred while fetching drink details.');
                        }
                    });
                }
            });
            favoritesList.append(favoriteItem);
        });
        favoritesContainer.empty();
        favoritesContainer.append(favoritesTitle, favoritesList);
    } else {
        favoritesContainer.empty();
        favoritesContainer.append(favoritesTitle);
    }
}

function removeFromFavorites(drinkName) {
    favorites = favorites.filter(favorite => favorite.name !== drinkName);
    updateFavoritesList();
    saveFavoritesToLocalStorage();
}

function displayErrorMessage(message) {
    searchInput.val(message);

    setTimeout(function () {
        searchInput.val('');
    }, 2000);
}

searchInput.val('margarita');
searchGroup.submit();
updateFavoritesList();

const pageFooter = $('<div>').addClass('page-footer container')
const pageFooterText = $('<p>').addClass('page-copyright').text('4IZ268 - Marek Smetana 2024 ©')

pageFooter.append(pageFooterText);

const colSm8 = $('<div>').addClass('col-sm-8').append(colSm8FirstRow, colSm8SecondRow);
const colSm4 = $('<div>').addClass('col-sm-4').append(favoritesContainer);

const appRow1 = $('<div>').addClass('row custom-height').append(colSm8, colSm4);

const appContainer = $('#app').addClass('container');
appContainer.append(header, searchGroup, appRow1);

$('body').append(appContainer, pageFooter);