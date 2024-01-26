$(document).ready(() => {
    const movieRecommendations = $('#movie-recommendations');
    const movieList = $('.movie-list');
    const recommendationsText = $('#recommendations-text');
    const optionsDiv = $('#options');
    const searchForm = $('#search-form');
    const retakeButton = $('#retake-button');
    const questionContainer = $('#question-container');
    const viewSavedMoviesButton = $('#view-saved-movies');

    /* Loading spinner logic */
    const loadingSpinner = $(`<div class="spinner"></div>`);
    const showLoading = () => {
        movieRecommendations.append(loadingSpinner);
    };
    const hideLoading = () => {
        loadingSpinner.remove();
    };
    /* End of loading spinner logic */

    /* Define all questions for quiz and their options */
    const questions = [
        {
            question: 'Which genre do you want to watch today?',
            options: ['Action', 'Adventure', 'Animation', 'Comedy', 'Crime', 'Documentary', 'Drama',
                'Family', 'History', 'Horror', 'Music', 'Mystery', 'Science Fiction', 'TV Movie',
                'Thriller', 'War', 'Western']
        },
        {
            question: 'How old would you like the movie to be?',
            options: ['Published in the last 3 years', 'Published in the last 5 years',
                'Published in the last 10 years', 'Published in the last 20 years',
                'Doesn\'t matter']
        }
    ];

    /* Buttons for the 1st question */
    const question1Buttons = [
        'Action', 'Adventure', 'Animation', 'Comedy', 'Crime', 'Documentary', 'Drama',
        'Family', 'History', 'Horror', 'Music', 'Mystery', 'Science Fiction', 'TV Movie',
        'Thriller', 'War', 'Western'
    ].map((genre, index) => `<button type="button" class="btn btn-primary quiz-button question-1 hidden" data-index="${index}">${genre}</button>`);
    /* Buttons for the 2nd question */
    const question2Buttons = [
        'Published in the last 3 years', 'Published in the last 5 years',
        'Published in the last 10 years', 'Published in the last 20 years',
        'Doesn\'t matter'
    ].map((timeoption, index) => `<button type="button" class="btn btn-primary quiz-button question-2 hidden" data-index="${index}">${timeoption}</button>`);
    optionsDiv.append(question1Buttons.join(''));
    optionsDiv.append(question2Buttons.join(''));

    /* Start with the first question and show the first question */
    let currentQuestionIndex = 0;
    movieRecommendations.addClass('hidden');
    showQuestion(0);
    let userChoices = [];

    /* Function to show current quiestion */
    function showQuestion(questionIndex) {
        const question = questions[questionIndex];
        $('#question-text').text(question.question);
        $('.quiz-button').addClass('hidden');
        $('.question-' + (questionIndex + 1)).removeClass('hidden');
    }

    /* Quiz button (quiz options) click */
    optionsDiv.on('click', '.quiz-button', function () {
        const optionText = $(this).text();
        userChoices[currentQuestionIndex] = optionText;

        currentQuestionIndex++;

        if (currentQuestionIndex < questions.length) {
            showQuestion(currentQuestionIndex);
        } else {
            showRecommendations();
        }
    });

    /* Retake button click -> Restart everything */
    retakeButton.click(function () {
        currentQuestionIndex = 0;
        userChoices = [];
        showQuestion(currentQuestionIndex);
        movieList.empty();
        movieRecommendations.addClass('hidden');
        searchForm.addClass('hidden');
        questionContainer.show();
        optionsDiv.show();
    });

    /**The search form submition click */
    searchForm.submit(function (event) {
        event.preventDefault();
        const searchQuery = $(this).find('input[type="search"]').val();
        searchMoviesByTitle(searchQuery);
    });

    /* Search through each movie to match what we are looking for */
    function searchMoviesByTitle(title) {
        const searchTitleLower = title.toLowerCase();
        $('.movie').each(function () {
            const movieTitle = $(this).find('h5').text().toLowerCase();
            if (movieTitle.includes(searchTitleLower)) {
                $(this).show();
            } else {
                $(this).hide();
            }
        });
    }

    /* Clear the search */
    $('#search-form input[type="search"]').on('input', function () {
        if ($(this).val() === '') {
            $('.movie').show();
        }
    });

    /* Fetch movies from TMDB API, used to display recommendations */
    function fetchMovies(genre, releaseYear) {
        showLoading();
        const apiKey = 'd7f6d223d530ebf74f615df009b1b301';
        let url = `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&with_genres=${genre}&sort_by=vote_count.desc&vote_count.gte=300`;

        if (releaseYear) {
            url += `&primary_release_year=${releaseYear}`;
        }

        $.ajax({
            url: url,
            type: 'GET',
            success: function (response) {
                displayMovies(response.results);
            },
            error: function () {
                Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: "Something went wrong! Try again.",
                    confirmButtonText: 'Ok'
                });
            },
            complete: function () {
                hideLoading();
            }
        });
    }

    /* Fetch movies from TMDB API by Id, used to display saved movies by user */
    function fetchMovieById(movieId) {
        showLoading();
        const apiKey = 'd7f6d223d530ebf74f615df009b1b301';
        const url = `https://api.themoviedb.org/3/movie/${movieId}?api_key=${apiKey}`;

        return $.ajax({
            url: url,
            type: 'GET',
            error: function () {
                Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: "Something went wrong! Try again.",
                    confirmButtonText: 'Ok'
                });
            },
            complete: function () {
                hideLoading();
            }
        });
    }

    /* Display movies in the recommendations area */
    function displayMovies(movies) {
        movieList.empty();

        const selectedGenre = userChoices[0];
        const selectedYear = userChoices[1];
        const title = 'Here are your movie recommendations';
        const subtitle = `You've selected ${selectedGenre} movies, ${selectedYear}.`;

        recommendationsText.html(`<h2>${title}</h2><p class="lead">${subtitle}</p>`);

        let allMovieElements = '';
        movies.forEach(movie => {
            allMovieElements += `
                <div class="movie">
                    <h5>${movie.title}</h5>
                    <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" alt="${movie.title}" class="movie-poster">
                    <p>Rating: ${movie.vote_average}</p>
                    <button class="btn btn-primary save-movie" data-movie-id="${movie.id}">Save to favorites</button>
                </div>
            `;
        });
        movieList.append(allMovieElements);

        questionContainer.hide();
        optionsDiv.hide();
        movieRecommendations.removeClass('hidden');
        searchForm.removeClass('hidden');
    }

    /* Function to save the movie by id */
    function saveMovie(movieId, genre) {
        let savedMovies = JSON.parse(localStorage.getItem('savedMovies')) || [];
        if (!savedMovies.some(movie => movie.id === movieId)) {
            savedMovies.push({
                id: movieId,
                genre: genre
            });
            localStorage.setItem('savedMovies', JSON.stringify(savedMovies));
        }
    }

    /* Save movie button click */
    $(document).on('click', '.save-movie', function () {
        const movieId = $(this).data('movie-id');
        const genre = $(this).data('genre');
        saveMovie(movieId, genre);
        Swal.fire({
            title: 'Saved!',
            text: 'Movie saved to your favorites.',
            icon: 'success',
            confirmButtonText: 'Ok'
        });
        $(this).prop('disabled', true);
    });

    function countMoviesByGenre() {
        const savedMovies = JSON.parse(localStorage.getItem('savedMovies')) || [];
        const genreCounts = {};

        for (let i = 0; i < savedMovies.length; i++) {
            const genre = savedMovies[i].genre;
            if (!genreCounts[genre]) {
                genreCounts[genre] = 0;
            }
            genreCounts[genre]++;
        }

        return genreCounts;
    }

    /* Function to remove movie from the saved by id */
    function removeSavedMovie(movieId) {
        let savedMovies = JSON.parse(localStorage.getItem('savedMovies')) || [];
        savedMovies = savedMovies.filter(movie => movie.id !== movieId);
        localStorage.setItem('savedMovies', JSON.stringify(savedMovies));

        const movieElement = document.getElementById(`movie-${movieId}`);
        if (movieElement) {
            movieElement.remove();
        } else {
            console.log(`Element with ID movie-${movieId} not found`);
        }
    }

    /* Remove movie button click */
    $(document).on('click', '.remove-saved-movie', function () {
        const movieId = $(this).data('movie-id');
        Swal.fire({
            title: 'Are you sure?',
            text: 'Do you really want to remove this movie from your saved?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#78c2ad',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, remove it!',
            cancelButtonText: 'No, keep it'
        }).then((result) => {
            if (result.isConfirmed) {
                removeSavedMovie(movieId);
                Swal.fire({
                    title: 'Removed!',
                    text: 'Movie removed from your favorites.',
                    icon: 'success',
                    confirmButtonText: 'Ok'
                });
            }
        });
    });

    /* Function to find recommended movies for user. Find movies -> fetch the results from the API */
    function showRecommendations() {
        const genreMap = {
            'Action': 28,
            'Adventure': 12,
            'Animation': 16,
            'Comedy': 35,
            'Crime': 80,
            'Documentary': 99,
            'Drama': 18,
            'Family': 10751,
            'Fantasy': 14,
            'History': 36,
            'Horror': 27,
            'Music': 10402,
            'Mystery': 9648,
            'Science Fiction': 878,
            'TV Movie': 10770,
            'Thriller': 53,
            'War': 10752,
            'Western': 37
        };

        const selectedGenre = userChoices[0];
        const tmdbGenreId = genreMap[selectedGenre];

        const releaseYear = calculateReleaseYear(userChoices[1]);

        questionContainer.hide();
        optionsDiv.hide();

        fetchMovies(tmdbGenreId, releaseYear);

        movieRecommendations.removeClass('hidden');
    }

    /* Function with the logic to calculate the desired release year for the movie */
    function calculateReleaseYear(selectedYear) {
        const currentYear = new Date().getFullYear();
        switch (selectedYear) {
            case 'Published in the last 3 years':
                return currentYear - 3;
            case 'Published in the last 5 years':
                return currentYear - 5;
            case 'Published in the last 10 years':
                return currentYear - 10;
            case 'Published in the last 20 years':
                return currentYear - 20;
            default:
                return '';
        }
    }

    /* Function to show saved movies */
    async function showSavedMovies() {
        let savedMovies = JSON.parse(localStorage.getItem('savedMovies')) || [];
        if (savedMovies.length > 0) {
            questionContainer.hide();
            optionsDiv.hide();
            movieRecommendations.removeClass('hidden');
            recommendationsText.text('Your Saved Movies');
            movieList.empty();

            try {
                const movieHTMLElements = [];
                for (const movie of savedMovies) {
                    const movieData = await fetchMovieById(movie.id);
                    if (movieData) {
                        movieHTMLElements.push(displaySavedMovie(movieData));
                    }
                }
                movieList.append(movieHTMLElements);
            } catch (error) {
                console.error('Error fetching movies:', error);
                Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: "Error fetching movies! Try again.",
                    confirmButtonText: 'Ok'
                });
            }
        } else {
            Swal.fire({
                text: 'You do not have any saved movies yet.',
                icon: 'question',
                confirmButtonText: 'Ok'
            });
        }
    }

    /* Display saved movies - create movie elements and append them to the movie*/
    function displaySavedMovie(movie) {
        const movieElement = `
                <div class="movie" id="movie-${movie.id}">
                    <h5>${movie.title}</h5>
                    <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" alt="${movie.title}" class="movie-poster">
                    <p>Rating: ${movie.vote_average}</p>
                    <button class="btn btn-danger remove-saved-movie" data-movie-id="${movie.id}">Remove</button>
                </div>
            `;
        return movieElement;
        //movieList.append(movieElement);
    }

    /*View saved movies button click */
    viewSavedMoviesButton.click(showSavedMovies);
});