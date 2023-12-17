


$(document).ready(function () {
    $('#filter').on('keyup', function () {
        var query = $(this).val().toLowerCase();
        if (query.trim().length > 0) {
            axios.get('https://www.themealdb.com/api/json/v1/1/search.php?s=' + query)
                .then(function (response) {
                    $('.recipe-gallery').empty(); // Clear the gallery
                    if (response.data.meals) {
                        response.data.meals.forEach(function (meal) {
                            // Add a star icon with the class 'fa-star' to each recipe card
                            $('.recipe-gallery').append(
                                '<div class="recipe-card">' +
                                    '<img src="' + meal.strMealThumb + '" alt="' + meal.strMeal + '" class="recipe-image">' +
                                    '<div class="recipe-info">' +
                                        '<span class="recipe-category">' + meal.strCategory + '</span>' +
                                        '<h3 class="recipe-title">' + meal.strMeal + '</h3>' +
                                        // Add the star icon here
                                        '<i class="fa fa-star recipe-favorite" aria-hidden="true"></i>' +
                                    '</div>' +
                                '</div>'
                            );
                        });
                    } else {
                        $('.recipe-gallery').html('<div>No recipes found.</div>');
                    }
                })
                .catch(function (error) {
                    console.error('Error fetching data: ', error);
                    $('.recipe-gallery').html('<div>Error fetching data.</div>');
                });
        } else {
            $('.recipe-gallery').html('<div>Please enter a search term.</div>');
        }
    });
});
