const MyRecipeApp = (function () {

    let favorites = [];


    $(document).ready(function () {

        // Function to fetch categories
        const fetchCategories = async () => {
            try {
                const categoriesResponse = await fetch('https://www.themealdb.com/api/json/v1/1/list.php?c=list');
                const categoriesData = await categoriesResponse.json();
                const categoriesList = categoriesData.meals.map(item => item.strCategory);
                return categoriesList;
            } catch (error) {
                console.error('Error fetching categories:', error);
                return [];
            }
        };

        // Function to fetch areas
        const fetchAreas = async () => {
            try {
                const areasResponse = await fetch('https://www.themealdb.com/api/json/v1/1/list.php?a=list');
                const areasData = await areasResponse.json();
                const areasList = areasData.meals.map(item => item.strArea);
                return areasList;
            } catch (error) {
                console.error('Error fetching areas:', error);
                return [];
            }
        };

        // Function to populate dropdowns
        const populateDropdowns = (categories, areas) => {
            // Populate area dropdown
            let areaOptions = '<option value="" disabled selected>Select area</option>';
            areaOptions += areas.map(function (area) {
                return '<option value="' + area + '">' + area + '</option>';
            }).join('');
            $('#area-select').html(areaOptions);

            // Populate category dropdown
            let categoryOptions = '<option value="" disabled selected>Select category</option>';
            categoryOptions += categories.map(function (category) {
                return '<option value="' + category + '">' + category + '</option>';
            }).join('');
            $('#category-select').html(categoryOptions);
        };

        // Usage
        (async () => {
            const categories = await fetchCategories();
            const areas = await fetchAreas();
            populateDropdowns(categories, areas);
            updateFavCounter();
        })();










        // Load favorites from local storage
        const storedFavorites = localStorage.getItem('favorites');
        if (storedFavorites) {
            favorites = JSON.parse(storedFavorites);
        }

        const appendMealCard = (meal, categoryLabel, areaLabel, isFavorite) => {
            const starClass = isFavorite ? 'favorite' : '';

            const mealHtml = `
              <div class="recipe-card" data-id="${meal.idMeal}">
                  <img src="${meal.strMealThumb}" alt="${meal.strMeal}" class="recipe-image">
                  <div class="recipe-info">
                      <span class="recipe-area">${areaLabel}</span><br>
                      <span class="recipe-category">${categoryLabel}</span>
                      <h3 class="recipe-title">${meal.strMeal}</h3>
                      <i class="fa fa-star recipe-favorite ${starClass}" aria-hidden="true"></i>
                  </div>
              </div>
            `;

            const $mealHtml = $(mealHtml);

            // Attach click event to the image and title within the card
            $mealHtml.find('.recipe-image, .recipe-title').on('click', () => {
                displayRecipeDetails(meal.idMeal);
            });

            return $mealHtml;
        };




        const performSearch = (query, selectedCategory, selectedArea) => {
            // Define the base searchUrl
            let searchUrl = `https://www.themealdb.com/api/json/v1/1/`;

            // Update searchUrl based on search criteria
            if (selectedCategory && selectedCategory !== "") {
                searchUrl += `filter.php?c=${selectedCategory}`;
            } else if (selectedArea && selectedArea !== "") {
                searchUrl += `filter.php?a=${selectedArea}`;
            } else if (query) {
                searchUrl += `search.php?s=${query}`;
            } else {
                // Return early if no criteria are provided
                $('.recipe-gallery').html('<div>No recipes found.</div>');
                return;
            }

            // Show a loading indicator
            $('.recipe-gallery').html('<div>Loading...</div>');

            setTimeout(() => {
                axios.get(searchUrl)
                    .then(response => {
                        const fragment = document.createDocumentFragment();
                        if (response.data.meals) {
                            response.data.meals.forEach(meal => {
                                const isFavorite = favorites.includes(meal.idMeal.toString());
                                const categoryLabel = meal.strCategory || selectedCategory || 'Category';
                                const areaLabel = meal.strArea || selectedArea || 'Area';
                                const mealElement = appendMealCard(meal, categoryLabel, areaLabel, isFavorite);
                                fragment.appendChild(mealElement.get(0));
                            });

                            $('.recipe-gallery').empty().append(fragment);
                        } else {
                            $('.recipe-gallery').html('<div>No recipes found.</div>');
                        }
                    })
                    .catch(error => {
                        console.error('Error fetching data: ', error);
                        $('.recipe-gallery').html('<div>Error fetching data.</div>');
                    });
            }, 2000); // 2000 milliseconds delay
        };




        const filterFavorites = () => {
            // Clear current gallery
            $('.recipe-gallery').empty();

            // Retrieve favorites from local storage
            const storedFavorites = localStorage.getItem('favorites');
            if (storedFavorites) {
                const favoriteIds = JSON.parse(storedFavorites);
                const requests = favoriteIds.map(favId => axios.get(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${favId}`)
                    .then(response => {
                        if (response.data.meals) {
                            const meal = response.data.meals[0];
                            return appendMealCard(meal, meal.strCategory, meal.strArea, true);
                        } else {
                            throw new Error(`No meal data found for ID: ${favId}`);
                        }
                    })
                    .catch(error => {
                        console.error(`Error fetching details for meal ID ${favId}: `, error);
                        return $('<div>Error loading recipe details.</div>');
                    })
                );

                Promise.all(requests)
                    .then(elements => {
                        const fragment = document.createDocumentFragment();
                        elements.forEach($mealElement => {
                            fragment.appendChild($mealElement.get(0));
                        });
                        $('.recipe-gallery').append(fragment);
                    })
                    .catch(error => {
                        console.error('An error occurred: ', error);
                    });
            } else {
                // If there are no favorites, display a message
                $('.recipe-gallery').html('<div>You have no favorites yet.</div>');
            }
        };



        const addFavorite = (mealId, starIcon) => {

            if (!favorites.includes(mealId)) {
                favorites.push(mealId);
                starIcon.addClass('favorite');
                localStorage.setItem('favorites', JSON.stringify(favorites));
                updateFavCounter();
            }
        };

        const removeFavorite = (mealId, starIcon) => {
            const index = favorites.indexOf(mealId);
            if (index !== -1) {
                favorites.splice(index, 1);
                starIcon.removeClass('favorite');
                localStorage.setItem('favorites', JSON.stringify(favorites));

                if ($('#favorites-button').hasClass('active')) {
                    // Remove the corresponding recipe card from the view
                    const $recipeCard = starIcon.closest('.recipe-card');
                    $recipeCard.remove();
                }

                updateFavCounter();

            }
        };

        const clearAllFavorites = () => {
            favorites = []; // Reset the favorites array
            localStorage.removeItem('favorites'); // Clear favorites from local storage
            $('.recipe-gallery').empty(); // Clear the current gallery view
            // Optionally, show a message to the user indicating that favorites have been cleared
            alert('All favorites have been cleared.');
            updateFavCounter();
        };

        // Function to update and display the favorite counter
        const updateFavCounter = () => {
            const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
            const favoriteCounter = document.getElementById('favorite-counter');

            // Update the counter with the number of favorites
            favoriteCounter.textContent = favorites.length;
        };


        function displayRecipeDetails(mealId) {
            // Clear the modal content first
            clearModalContent();

            // Show the modal with initial loading content
            $('#recipeModal').show();

            // Fetch the recipe details after a delay
            setTimeout(() => {
                axios.get('https://www.themealdb.com/api/json/v1/1/lookup.php?i=' + mealId)
                    .then(function (response) {
                        if (response.data.meals) {
                            var meal = response.data.meals[0];

                            // Update modal content
                            $('#recipeTitle').text(meal.strMeal);
                            $('#recipeImage').attr('src', meal.strMealThumb);
                            $('#recipeIngredients').html(formatIngredients(meal));
                            $('#recipeInstructions').html(meal.strInstructions.replace(/\n/g, '<br>'));

                            // Add or update YouTube iframe
                            updateYouTubeIframe(meal.idMeal);

                            // Add a class to the body to indicate that the recipe details are active
                            document.body.classList.add('recipe-detail-active');
                        }
                    })
                    .catch(function (error) {
                        console.error('Error fetching recipe details: ', error);
                        $('#recipeModal-content').html('<div>Error loading recipe details.</div>');
                    }).finally(() => {
                        $('#loading').hide();
                    });
            }, 2000);
        }

        const clearModalContent = () => {
            $('#recipeTitle').text('Loading...');
            $('#recipeImage').attr('src', '');
            $('#recipeIngredients').empty();
            $('#recipeInstructions').empty();
            $('#recipeVideo').remove();
        };

        const updateYouTubeIframe = (mealId) => {
            const iframeHtml = `<iframe id="recipeVideo" src="https://www.youtube.com/embed/qQY9Y8kK5eI" title="Video Placeholder" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture;"></iframe>`;
            $('#recipeModal .modal-content').append(iframeHtml);
        };

        const formatIngredients = (meal) => {
            let ingredients = [];
            for (let i = 1; i <= 30; i++) {
                if (meal[`strIngredient${i}`]) {
                    // Get the ingredient name and measurement
                    const ingredientName = meal[`strIngredient${i}`];
                    const ingredientMeasurement = meal[`strMeasure${i}`];

                    // Generate the URL for the ingredient image
                    const ingredientImageURL = `https://www.themealdb.com/images/ingredients/${ingredientName}-Small.png`;

                    // Create the HTML for the ingredient with the image
                    const ingredientHtml = `
                        <li>
                            <img src="${ingredientImageURL}" alt="${ingredientName}" class="ingredient-image">
                            ${ingredientName}: ${ingredientMeasurement}
                        </li>
                    `;

                    ingredients.push(ingredientHtml);
                }
            }
            return ingredients.join('');
        };



        // Event listeners
        $('#search-type-slider').on('input', function () {
            const sliderValue = $(this).val();
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


        $('#category-select, #area-select').on('change', function () {
            const query = $('#filter').val().toLowerCase();
            const selectedCategory = $('#category-select').val();
            const selectedArea = $('#area-select').val();
            performSearch(query, selectedCategory, selectedArea);
        });


        $('#favorites-button').on('click', function () {
            filterFavorites(); // Display only favorite recipes

            // Update button classes
            $(this).addClass('active').removeClass('inactive');
            $('#search-button').addClass('inactive').removeClass('active');
        });

        $('#search-button').on('click', function () {
            // Get the current value of the search type slider
            const sliderValue = $('#search-type-slider').val();
            const query = $('#filter').val().toLowerCase();
            const selectedCategory = $('#category-select').val();
            const selectedArea = $('#area-select').val();

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
            const mealId = $(this).closest('.recipe-card').data('id').toString();
            const isCurrentlyFavorite = $(this).hasClass('favorite');

            if (isCurrentlyFavorite) {
                // Show a confirmation dialog
                var isConfirmed = confirm("Are you sure you want to remove this recipe from your favorites?");
                if (isConfirmed) {

                    removeFavorite(mealId, $(this));
                    //udate the view so that the recipe is gone immediatly
                }
            } else {
                addFavorite(mealId, $(this));
            }
        });




        // Close the modal
        $('.close').on('click', function () {
            $('#recipeModal').hide();
            clearModalContent();
        });

        // Close the modal when clicking outside of it
        $(window).on('click', function (event) {
            if ($(event.target).is('#recipeModal')) {
                $('#recipeModal').hide();
                clearModalContent();
            }
        });

        // For clicking out of the close up of a recipe
        $(document).on('click', function (event) {
            var $recipeDetailContainer = $('.recipe-detail-container');
            if ($recipeDetailContainer.length && !$recipeDetailContainer.is(event.target) && $recipeDetailContainer.has(event.target).length === 0) {
                $('body').removeClass('recipe-detail-active');
                clearModalContent();
            }
        });


        $('#clear-favorites-button').on('click', function () {
            // Show a confirmation dialog
            var isConfirmed = confirm("Are you sure you want to remove all favorites?");

            // If the user confirms, clear all favorites
            if (isConfirmed) {
                clearAllFavorites();
            }
        });


        $('#search-form').on('submit', function (e) {
            e.preventDefault(); // Prevent the default form submission behavior

            var query = $('#filter').val().toLowerCase();
            var selectedCategory = $('#category-select').val();
            var selectedArea = $('#area-select').val();

            performSearch(query, selectedCategory, selectedArea);
        });









    });
})();