$(document).ready(function () {
    //message - input sanitization
    const loadingSpinner = $('<div class="spinner">');
    const messagePlaceholder = $('<div id="message"></div>');
    const showMessage = (message) => {
        messagePlaceholder.text(message).show();
    };
    const hideMessage = () => {
        messagePlaceholder.hide();
    };
    const showLoading = () => {
        $(document.body).append(loadingSpinner);
    };
    const hideLoading = () => {
        loadingSpinner.remove();
    };

    // main search group - form
    var $searchGroup = $('<div id="search-group"></div>');
    var $form = $('<form id="search-form"></form>');
    var $label = $('<label for="searchField">Input searched keyword</label>');
    var $input = $('<input type="text" id="searchField" placeholder="Input keyword here">');
    var $button = $('<button id="searchButton">Search</button>');

    // Append the label, input, and button to the form
    $form.append($label, $input, $button);
    $searchGroup.append($form, messagePlaceholder);

    // Columns - content
    var $columnsContainer = $('<div id="columns-container"></div>');
    var $column1 = $('<div id="column1" class="column"></div>');
    var $column2 = $('<div id="column2" class="column"></div>');
    var $column3 = $('<div id="column3" class="column"></div>');

    // title + movie list
    var $moviesFoundTitle = $('<h2 id="movies-found-title" style="display: none;">Movies found:</h2>');
    var $movieList = $('<div id="movie-list"></div>');
    $column1.append($moviesFoundTitle, $movieList);

    // poster container
    var $posterContainer = $('<div id="poster-container"></div>');
    $column2.append($posterContainer);
    var $posterPlaceholder = $('<p class="poster-placeholder">View movie details and poster will appear</p>').hide();
    $column2.append($posterPlaceholder);

    var $viewFavoritesBtn = $('<button id="viewFavoritesBtn">View My Favorite Movies</button>');
    var $viewRatedBtn = $('<button id="viewRatedBtn">View movies I rated</button>');
    $column3.append($viewFavoritesBtn, $viewRatedBtn);
    var $favoritesList = $('<div id="favoritesList"><h3>Your favorite movies</h3></div>').hide();
    var $ratedList = $('<div id="ratedList"><h3>Movies you rated</h3></div>').hide();
    $column3.append($favoritesList, $ratedList);

    // Append columns to the container
    $columnsContainer.append($column1, $column2, $column3);

    // dropdown for sorting
    var $sortOptions = $('<select id="sortOptions"></select>')
        .append('<option value="title-asc">Title (A-Z)</option>')
        .append('<option value="title-desc">Title (Z-A)</option>')
        .append('<option value="vote-asc">Vote Average (Lowest to Highest)</option>')
        .append('<option value="vote-desc">Vote Average (Highest to Lowest)</option>')
        .append('<option value="release-asc">Release Date (Oldest to Newest)</option>')
        .append('<option value="release-desc">Release Date (Newest to Oldest)</option>');
    $searchGroup.prepend($sortOptions);

    $('body').append($searchGroup, $columnsContainer);


    $form.on('submit', function (event) {
        event.preventDefault();
        $posterPlaceholder.show();
        let keyword = $.trim($('#searchField').val());
        if (keyword === '') {
            showMessage('You need to input some keyword in order to search for movies');
            return;
        }
        if (keyword.length > 100) {
            showMessage('Please limit your search to 100 characters.');
            return;
        }
        var allowedCharacters = /^[a-zA-Z0-9 ]+$/;      //allowing only aplhanumeric characters and spaces
        if (!allowedCharacters.test(keyword)) {
            showMessage('Please use only alphanumeric characters and spaces in your search.');
            return;
        }
        console.log(keyword);
        hideMessage();
        $('#movies-found-title').css('background-color', 'beige');
        $('movie-list').css('background-color', 'beige');
        showLoading();

        $.ajax({
            url: `https://api.themoviedb.org/3/search/movie?api_key=30e38514e32364e07b45c9fe67f452aa&query=${keyword}`,
            type: 'GET',
            success: function (response) {
                var movies = response.results;
                var sortOption = $('#sortOptions').val();
                movies = sortMovies(movies, sortOption);
                var movieTitles = [];
                $('#movies-found-title').show();
                $('#movie-list').empty();
                for (var i = 0; i < movies.length; i++) {
                    movieTitles.push(movies[i].title);
                }
                let htmlToAdd = "";
                movies.forEach(function (movie) {
                    htmlToAdd += `<p>${movie.title} <button class="details-btn" data-movieid="${movie.id}">View details about movie</button>
                    <button class="favorite-btn" data-movieid="${movie.id}">Save to Favorites</button>
                    <br>
                    <label class="rate-movie-label">Rate this movie!</label>
                    <span class="rating" data-movieid="${movie.id}">
                    ${[1, 2, 3, 4, 5].map(n => `<span class="star" data-rate="${n}">&#9733;</span>`).join('')}
                    </span>
                    <div class="movie-details" id="details-${movie.id}"></div></p>`;
                });
                $('#movie-list').append(htmlToAdd);
            },
            error: function (error) {
                console.log('Error:', error);
            },
            complete: function () {
                hideLoading();
            }
        });
    });

    function sortMovies(movies, option) {
        switch (option) {
            case "title-asc":
                return movies.sort((a, b) => a.title.localeCompare(b.title));
            case "title-desc":
                return movies.sort((a, b) => b.title.localeCompare(a.title));
            case "vote-asc":
                return movies.sort((a, b) => a.vote_average - b.vote_average);
            case "vote-desc":
                return movies.sort((a, b) => b.vote_average - a.vote_average);
            case "release-asc":
                return movies.sort((a, b) => new Date(a.release_date) - new Date(b.release_date));
            case "release-desc":
                return movies.sort((a, b) => new Date(b.release_date) - new Date(a.release_date));
            default:
                return movies;
        }
    }

    //favorites
    $(document).on('click', '.favorite-btn', function () {
        var movieTitle = $(this).parent().contents().filter(function () {
            return this.nodeType == 3;
        }).text().trim();
        saveMovieToFavorites(movieTitle);
    });

    //rating stars
    $(document).on('click', '.star', function () {
        var movieTitle = $(this).parent().parent().contents().filter(function () {
            return this.nodeType === 3;
        }).text().trim()
        var rating = $(this).data('rate');
        saveMovieRating(movieTitle, rating);

        $(this).parent().children('.star').removeClass('yellow-star');
        $(this).prevAll().addBack().addClass('yellow-star');
    });

    function saveMovieToFavorites(movieTitle) {
        var favorites = JSON.parse(localStorage.getItem('favorites')) || {};
        favorites[movieTitle] = true;
        localStorage.setItem('favorites', JSON.stringify(favorites));
    }

    function saveMovieRating(movieTitle, rating) {
        var ratings = JSON.parse(localStorage.getItem('ratings')) || {};
        ratings[movieTitle] = rating;
        localStorage.setItem('ratings', JSON.stringify(ratings));
    }


    // Throttling function
    function debounce(func, wait, immediate) {
        var timeout;
        return function () {
            var context = this, args = arguments;
            var later = function () {
                timeout = null;
                if (!immediate) func.apply(context, args);
            };
            var callNow = immediate && !timeout;
            if (callNow) func.apply(context, args);
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }

    var debounceSearch = debounce(function () {
        $form.submit();
    }, 500, false);

    $input.on('input', debounceSearch);

    //against spam clicking Search button
    $('#searchButton').on('click', debounce(function (event) {
        event.preventDefault();
        $form.submit();
    }, 500));


    function fetchMovieDetails(button, movieId) {
        $.ajax({
            url: `https://api.themoviedb.org/3/movie/${movieId}?api_key=30e38514e32364e07b45c9fe67f452aa`,
            type: 'GET',
            success: function (movieDetails) {
                // Find the closest movie details container to the clicked button
                var $detailsContainer = button.closest('p').next('.movie-details');
                console.log($detailsContainer.length);
                // Create a formatted string of movie details
                var detailsHtml = `
                    <h3>${movieDetails.title}</h3>
                    <p><strong>Overview:</strong> ${movieDetails.overview}</p>
                    <p><strong>Release Date:</strong> ${movieDetails.release_date}</p>
                    <p><strong>Genres:</strong> ${movieDetails.genres.map(genre => genre.name).join(', ')}</p>
                    <p><strong>Budget:</strong> $${movieDetails.budget}</p>
                    <p><strong>Revenue:</strong> $${movieDetails.revenue}</p>
                    <p><strong>Runtime:</strong> ${movieDetails.runtime} minutes</p>
                    <p><strong>Vote Average:</strong> ${movieDetails.vote_average}</p>
                    <p><strong>Vote Count:</strong> ${movieDetails.vote_count}</p>
                `;
                // Display movie details
                $detailsContainer.html(detailsHtml);
                $('#column2 .poster-placeholder').hide();
                //position poster is second column
                if (movieDetails.poster_path) {
                    var posterImageUrl = `https://image.tmdb.org/t/p/w500${movieDetails.poster_path}`;
                    var $posterContainer = $('#poster-container');
                    $posterContainer.empty(); // Clear previous content
                    var $posterImage = $(`<img src="${posterImageUrl}" alt="${movieDetails.title} poster">`);
                    $posterContainer.append($posterImage);

                    setTimeout(function () {
                        var detailsTopPosition = $detailsElement.offset().top - $columnsContainer.offset().top; //postion
                        $posterContainer.css('margin-top', detailsTopPosition + 'px');
                    }, 0);
                }
                // Fetch and display the movie poster in the second column
                if (movieDetails.poster_path) {
                    var posterImageUrl = `https://image.tmdb.org/t/p/w500${movieDetails.poster_path}`;
                    var posterHtml = `<img src="${posterImageUrl}" alt="${movieDetails.title} poster" style="max-width:100%;height:auto;">`;
                    $('#poster-container').html(posterHtml);
                }
            },
            error: function (error) {
                console.log('Error:', error);
            },
            complete: function () {
                hideLoading();
            }
        });
    }

    //View details
    $(document).on('click', '.details-btn', function () {
        var movieId = $(this).data('movieid');
        showLoading();
        fetchMovieDetails($(this), movieId);
    });

    $viewFavoritesBtn.on('click', function () {
        var favorites = JSON.parse(localStorage.getItem('favorites')) || {};
        $favoritesList.empty().append('<h3>Your Favorite Movies</h3>');
        Object.keys(favorites).forEach(function (movieTitle) {
            if (favorites[movieTitle]) {
                $favoritesList.append(`<p>${movieTitle}</p>`);
            }
        });
        $ratedList.hide();
        $favoritesList.show();
    });

    $viewRatedBtn.on('click', function () {
        var ratings = JSON.parse(localStorage.getItem('ratings')) || {};
        $ratedList.empty().append('<h3>Movies You Rated</h3>');
        Object.entries(ratings).forEach(([movieId, rating]) => {
            var stars = '★'.repeat(rating) + '☆'.repeat(5 - rating);
            $ratedList.append(`<p>${movieId}: ${stars}</p>`);
        });
        $ratedList.show();
        $favoritesList.hide();
    });

});