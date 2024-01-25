$(document).ready(() => {
    /* Loading spinner logic */
    const loadingSpinner = $(`<div class="spinner"></div>`);
    const showLoading = () => {
        $('#movie-recommendations').append(loadingSpinner);
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

    /* Start with the first question and show the first question */
    let currentQuestionIndex = 0;
    $('#movie-recommendations').addClass('hidden');
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
    $('#options').on('click', '.quiz-button', function () {
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
    $('#retake-button').click(function () {
        currentQuestionIndex = 0;
        userChoices = [];
        showQuestion(currentQuestionIndex);
        $('#movie-recommendations').addClass('hidden');
        $('#question-container').show();
        $('#options').show();
    });

    /* Fetch movies from TMDB API, used to display recommendations */
    function fetchMovies(genre, releaseYear, title) {
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
                displayMovies(response.results.slice(0, 3), title);
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

        $.ajax({
            url: url,
            type: 'GET',
            success: function (movie) {
                displaySavedMovie(movie);
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

    /* Display movies in the recommendations area */
    function displayMovies(movies, title) {
        const movieList = $('.movie-list');
        movieList.empty();

        $('#recommendations-text').text(title);

        movies.forEach(movie => {
            const movieElement = `
                <div class="movie">
                    <h5>${movie.title}</h5>
                    <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" alt="${movie.title}" class="movie-poster">
                    <p>Rating: ${movie.vote_average}</p>
                    <button class="btn btn-primary save-movie" data-movie-id="${movie.id}">Save to favorites</button>
                </div>
            `;
            movieList.append(movieElement);
        });

        $('question-container').hide();
        $('options').hide();
        $('#movie-recommendations').removeClass('hidden');
    }

    /* Display saved movies */
    function displaySavedMovie(movie) {
        const movieList = $('.movie-list');
        const movieElement = `
            <div class="movie" id="movie-${movie.id}">
                <h5>${movie.title}</h5>
                <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" alt="${movie.title}" class="movie-poster">
                <p>Rating: ${movie.vote_average}</p>
                <button class="btn btn-danger remove-saved-movie" data-movie-id="${movie.id}">Remove</button>
            </div>
        `;
        movieList.append(movieElement);
    }

    /* Function to save the movie by id */
    function saveMovie(movieId) {
        let savedMovies = JSON.parse(localStorage.getItem('savedMovies')) || [];
        if (!savedMovies.includes(movieId)) {
            savedMovies.push(movieId);
            localStorage.setItem('savedMovies', JSON.stringify(savedMovies));
        }
    }

    /* Save movie button click */
    $(document).on('click', '.save-movie', function () {
        const movieId = $(this).data('movie-id');
        saveMovie(movieId);
        Swal.fire({
            title: 'Saved!',
            text: 'Movie saved to your favorites.',
            icon: 'success',
            confirmButtonText: 'Ok'
        });
    });

    /* Function to remove movie from the saved by id */
    function removeSavedMovie(movieId) {
        let savedMovies = JSON.parse(localStorage.getItem('savedMovies')) || [];
        savedMovies = savedMovies.filter(id => id !== movieId);
        localStorage.setItem('savedMovies', JSON.stringify(savedMovies));

        $(`#movie-${movieId}`).remove();
    }

    /* Remove movie button click */
    $(document).on('click', '.remove-saved-movie', function () {
        const movieId = $(this).data('movie-id');
        removeSavedMovie(movieId);
        Swal.fire({
            title: 'Removed!',
            text: 'Movie removed from your favorites.',
            icon: 'success',
            confirmButtonText: 'Ok'
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

        $('#question-container').hide();
        $('#options').hide();

        const title = 'Here are your movie recommendations';
        fetchMovies(tmdbGenreId, releaseYear, title);
        $('#movie-recommendations').removeClass('hidden');
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
    function showSavedMovies() {
        let savedMovies = JSON.parse(localStorage.getItem('savedMovies')) || [];
        if (savedMovies.length > 0) {
            $('#question-container').hide();
            $('#options').hide();
            $('#movie-recommendations').removeClass('hidden');
            $('#recommendations-text').text('Your Saved Movies');

            const movieList = $('.movie-list');
            movieList.empty();

            savedMovies.forEach(movieId => {
                fetchMovieById(movieId);
            });
        } else {
            Swal.fire({
                text: 'You do not have any saved movies yet.',
                icon: 'question',
                confirmButtonText: 'Ok'
            });
        }
    }

    /*View saved movies button click */
    $('#view-saved-movies').click(showSavedMovies);
});
