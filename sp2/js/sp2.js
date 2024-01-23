const MyRecipeApp = (function () {

    let favorites = [];


    $(document).ready(function () {
        // Load favorites from local storage
        var storedFavorites = localStorage.getItem('favorites');
        if (storedFavorites) {
            favorites = JSON.parse(storedFavorites);
        }

        const categories = {
            "meals": [{ "strCategory": "Beef" }, { "strCategory": "Breakfast" }, { "strCategory": "Chicken" }, { "strCategory": "Dessert" }, { "strCategory": "Goat" }, { "strCategory": "Lamb" }, { "strCategory": "Miscellaneous" }, { "strCategory": "Pasta" }, { "strCategory": "Pork" }, { "strCategory": "Seafood" }, { "strCategory": "Side" }, { "strCategory": "Starter" }, { "strCategory": "Vegan" }, { "strCategory": "Vegetarian" }]
        };
        const areas = {
            "meals": [{ "strArea": "American" }, { "strArea": "British" }, { "strArea": "Canadian" }, { "strArea": "Chinese" }, { "strArea": "Croatian" }, { "strArea": "Dutch" }, { "strArea": "Egyptian" }, { "strArea": "Filipino" }, { "strArea": "French" }, { "strArea": "Greek" }, { "strArea": "Indian" }, { "strArea": "Irish" }, { "strArea": "Italian" }, { "strArea": "Jamaican" }, { "strArea": "Japanese" }, { "strArea": "Kenyan" }, { "strArea": "Malaysian" }, { "strArea": "Mexican" }, { "strArea": "Moroccan" }, { "strArea": "Polish" }, { "strArea": "Portuguese" }, { "strArea": "Russian" }, { "strArea": "Spanish" }, { "strArea": "Thai" }, { "strArea": "Tunisian" }, { "strArea": "Turkish" }, { "strArea": "Unknown" }, { "strArea": "Vietnamese" }]
        };

        // Load favorites from local storage
        var storedFavorites = localStorage.getItem('favorites');
        if (storedFavorites) {
            favorites = JSON.parse(storedFavorites);
        }

        // Populate category dropdown
        categories.meals.forEach(function (category) {
            $('#category-select').append($('<option>', {
                value: category.strCategory,
                text: category.strCategory
            }));
        });

        // Populate area dropdown
        areas.meals.forEach(function (area) {
            $('#area-select').append($('<option>', {
                value: area.strArea,
                text: area.strArea
            }));
        });

        function performSearch(query, selectedCategory, selectedArea) {
            // Define the base searchUrl
            var searchUrl = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';

            // Check if we are searching by category or area and update the searchUrl accordingly
            if (selectedCategory && selectedCategory !== "") {
                searchUrl = 'https://www.themealdb.com/api/json/v1/1/filter.php?c=' + selectedCategory;
            } else if (selectedArea && selectedArea !== "") {
                searchUrl = 'https://www.themealdb.com/api/json/v1/1/filter.php?a=' + selectedArea;
            }

            // If we have a query, append it to the searchUrl
            if (query) {
                searchUrl += query;
            }

            axios.get(searchUrl)
                .then(function (response) {
                    $('.recipe-gallery').empty();
                    if (response.data.meals) {
                        response.data.meals.forEach(function (meal) {
                            // If the meal already has category or area info, display it directly
                            if (meal.strCategory || meal.strArea) {
                                var categoryLabel = meal.strCategory || selectedCategory || 'Category';
                                var areaLabel = meal.strArea || selectedArea || 'Area';
                                appendMealCard(meal, categoryLabel, areaLabel);
                            } else {
                                // If category or area info is missing, fetch more details
                                axios.get('https://www.themealdb.com/api/json/v1/1/lookup.php?i=' + meal.idMeal)
                                    .then(function (detailResponse) {
                                        var detailedMeal = detailResponse.data.meals[0];
                                        var categoryLabel = detailedMeal.strCategory || selectedCategory || 'Category';
                                        var areaLabel = detailedMeal.strArea || selectedArea || 'Area';
                                        var isFavorite = favorites.includes(detailedMeal.idMeal.toString());
                                        appendMealCard(detailedMeal, categoryLabel, areaLabel, isFavorite);
                                    })
                                    .catch(function (error) {
                                        console.error('Error fetching meal details: ', error);
                                    });
                            }
                        });
                    } else {
                        $('.recipe-gallery').html('<div>No recipes found.</div>');
                    }
                })
                .catch(function (error) {
                    console.error('Error fetching data: ', error);
                    $('.recipe-gallery').html('<div>Error fetching data.</div>');
                });
        }

        function appendMealCard(meal, categoryLabel, areaLabel, isFavorite) {
            var starClass = isFavorite ? 'favorite' : '';

            var mealHtml = '<div class="recipe-card" data-id="' + meal.idMeal + '">' +
                '<img src="' + meal.strMealThumb + '" alt="' + meal.strMeal + '" class="recipe-image">' +
                '<div class="recipe-info">' +
                '<span class="recipe-area">' + areaLabel + '</span>' + '<br>' +
                '<span class="recipe-category">' + categoryLabel + '</span>' +
                '<h3 class="recipe-title">' + meal.strMeal + '</h3>' +
                '<i class="fa fa-star recipe-favorite ' + starClass + '" aria-hidden="true"></i>' +
                '</div>' +
                '</div>';

            var $mealHtml = $(mealHtml);

            // Attach click event to the image and title within the card
            $mealHtml.find('.recipe-image, .recipe-title').on('click', function () {
                displayRecipeDetails(meal.idMeal);
            });


            $('.recipe-gallery').append($mealHtml);
        }


        function filterFavorites() {
            // Clear current gallery
            $('.recipe-gallery').empty();

            // Retrieve favorites from local storage
            var storedFavorites = localStorage.getItem('favorites');
            if (storedFavorites) {
                var favoriteIds = JSON.parse(storedFavorites);
                // Fetch and display each favorite meal's details
                favoriteIds.forEach(function (favId) {
                    axios.get('https://www.themealdb.com/api/json/v1/1/lookup.php?i=' + favId)
                        .then(function (response) {
                            if (response.data.meals) {
                                var meal = response.data.meals[0];
                                appendMealCard(meal, meal.strCategory, meal.strArea, true);
                            }
                        })
                        .catch(function (error) {
                            console.error('Error fetching favorite meal details: ', error);
                        });
                });
            } else {
                // If there are no favorites, display a message or handle accordingly
                $('.recipe-gallery').html('<div>You have no favorites yet.</div>');
            }
        }

        // Add a recipe to favorites
        function addFavorite(mealId, starIcon) {
            if (!favorites.includes(mealId)) {
                favorites.push(mealId);
                starIcon.addClass('favorite');
                localStorage.setItem('favorites', JSON.stringify(favorites));
            }
        }

        // Remove a recipe from favorites
        function removeFavorite(mealId, starIcon) {
            var index = favorites.indexOf(mealId);
            if (index !== -1) {
                favorites.splice(index, 1);
                starIcon.removeClass('favorite');
                localStorage.setItem('favorites', JSON.stringify(favorites));
            }
        }


        function clearAllFavorites() {
            favorites = []; // Reset the favorites array
            localStorage.removeItem('favorites'); // Clear favorites from local storage
            $('.recipe-gallery').empty(); // Optionally, you can also clear the current gallery view
        }


        function displayRecipeDetails(mealId) {
            axios.get('https://www.themealdb.com/api/json/v1/1/lookup.php?i=' + mealId)
                .then(function (response) {
                    if (response.data.meals) {
                        var meal = response.data.meals[0];
                        // Update modal content
                        $('#recipeTitle').text(meal.strMeal);
                        $('#recipeImage').attr('src', meal.strMealThumb);
                        $('#recipeIngredients').html(formatIngredients(meal));
                        $('#recipeInstructions').html(meal.strInstructions.replace(/\n/g, '<br>'));

                        // Show the modal
                        $('#recipeModal').show();

                        // Add a class to the body to indicate that the recipe details are active
                        document.body.classList.add('recipe-detail-active');
                    }
                })
                .catch(function (error) {
                    console.error('Error fetching recipe details: ', error);
                });
        }



        function formatIngredients(meal) {
            var ingredients = [];
            for (var i = 1; i <= 20; i++) {
                if (meal['strIngredient' + i]) {
                    ingredients.push('<li>' + meal['strIngredient' + i] + ': ' + meal['strMeasure' + i] + '</li>');
                }
            }
            return ingredients.join('');
        }

        // Event listeners
        $('#search-type-slider').on('input', function () {
            var sliderValue = $(this).val();
            // Clear all inputs when the slider is moved
            $('#filter').val('');
            $('#area-select').val('');
            $('#category-select').val('');
            $('.recipe-gallery').empty(); // Clear the current search results

            switch (sliderValue) {
                case '1': // Text search
                    $('#filter').show();
                    $('#area-select').hide();
                    $('#category-select').hide();
                    break;
                case '2': // Area search
                    $('#filter').hide();
                    $('#area-select').show();
                    $('#category-select').hide();
                    break;
                case '3': // Category search
                    $('#filter').hide();
                    $('#area-select').hide();
                    $('#category-select').show();
                    break;
            }
        });


        $('#filter').on('keypress', function (e) {
            if (e.which == 13) { // Enter key press
                e.preventDefault();
                var query = $(this).val().toLowerCase();
                var selectedCategory = $('#category-select').val();
                var selectedArea = $('#area-select').val();
                performSearch(query, selectedCategory, selectedArea);
            }
        });

        $('#category-select, #area-select').on('change', function () {
            var query = $('#filter').val().toLowerCase();
            var selectedCategory = $('#category-select').val();
            var selectedArea = $('#area-select').val();
            performSearch(query, selectedCategory, selectedArea);
        });

        // Click handler for the Favorites button
        $('#favorites-button').on('click', function () {
            filterFavorites(); // Display only favorite recipes

            // Update button classes
            $(this).addClass('active').removeClass('inactive');
            $('#search-button').addClass('inactive').removeClass('active');
        });


        $('#search-button').on('click', function () {
            // Get the current value of the search type slider
            var sliderValue = $('#search-type-slider').val();
            var query = $('#filter').val().toLowerCase();
            var selectedCategory = $('#category-select').val();
            var selectedArea = $('#area-select').val();

            // Check the value of the slider and perform the search accordingly
            switch (sliderValue) {
                case '1': // Text search
                    performSearch(query, '', ''); // Perform text search
                    break;
                case '2': // Area search
                    performSearch('', '', selectedArea); // Perform area search
                    break;
                case '3': // Category search
                    performSearch('', selectedCategory, ''); // Perform category search
                    break;
                default:
                    console.log("Unknown search type");
            }

            // Update button classes
            $(this).addClass('active').removeClass('inactive');
            $('#favorites-button').addClass('inactive').removeClass('active');
        });




        // Handling the click on the favorite icon
        $('body').on('click', '.recipe-favorite', function () {
            var mealId = $(this).closest('.recipe-card').data('id').toString();
            var isCurrentlyFavorite = $(this).hasClass('favorite');

            if (isCurrentlyFavorite) {
                removeFavorite(mealId, $(this));
            } else {
                addFavorite(mealId, $(this));
            }
        });

        // Close the modal
        $('.close').on('click', function () {
            $('#recipeModal').hide();
        });

        // Close the modal when clicking outside of it
        $(window).on('click', function (event) {
            if ($(event.target).is('#recipeModal')) {
                $('#recipeModal').hide();
            }
        });

        document.addEventListener('click', function (event) {
            var recipeDetailContainer = document.querySelector('.recipe-detail-container');
            if (recipeDetailContainer) {
                if (!recipeDetailContainer.contains(event.target)) {
                    document.body.classList.remove('recipe-detail-active');
                }
            } 
        });





        $('#clear-favorites-button').on('click', function () {
            clearAllFavorites();
        });














    });
})();