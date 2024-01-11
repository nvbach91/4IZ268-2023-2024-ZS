$(document).ready(function() {
    // Create elements using jQuery
    var searchGroup = $('<div id="search-group"></div>');
    var label = $('<label>Input searched keyword</label>');
    var input = $('<input type="text" id="searchField">');
    var button = $('<button id="searchButton">vyhledat</button>');
    var moviesFoundTitle = $('<h2 id="movies-found-title" style="display: none;">Movies found:</h2>').hide();
    var movieList = $('<div id="movie-list"></div>');

    // Append elements to search group
    searchGroup.append(label, input, button);

    // Append elements to body
    $('body').append(searchGroup, moviesFoundTitle, movieList);
      

    // Event listener for the search button
    button.on('click', function () {
        //ulozi input z textboxu
        let keyword = $('#searchField').val();
        console.log(keyword);
        document.getElementById('movies-found-title').style.backgroundColor = 'beige';
        document.getElementById('movie-list').style.backgroundColor = 'beige';
        $.ajax({
            url: `https://api.themoviedb.org/3/search/movie?api_key=30e38514e32364e07b45c9fe67f452aa&query=${keyword}`,
            type: 'GET',
            success: function (response) {
                var movies = response.results;
                var movieTitles = [];
                $('#movies-found-title').show();
                $('#movie-list').empty();
                for (var i = 0; i < movies.length; i++) {
                    movieTitles.push(movies[i].title);
                }
                movies.forEach(function (movie) {
                    $('#movie-list').append('<p>' + movie.title + ' <button class="details-btn" data-movieid="' + movie.id +
                        '">View details about movie</button><div class="movie-details" id="details-' + movie.id + '"></div></p>');
                });
            },
            error: function (error) {
                console.log('Error:', error);
            }
        });
    });                


    function fetchMovieDetails(movieId) {
        $.ajax({
            url: `https://api.themoviedb.org/3/movie/${movieId}?api_key=30e38514e32364e07b45c9fe67f452aa`,
            type: 'GET',
            success: function(movieDetails) {
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
                    <!-- Add any other details you wish to display -->
                `;
    
                // Display movie details
                $('#details-' + movieId).html(detailsHtml);
            },
            error: function(error) {
                console.log('Error:', error);
            }
        });
    }
    

    // Event listener for 'View details' buttons
    $(document).on('click', '.details-btn', function() {
        var movieId = $(this).data('movieid');
        fetchMovieDetails(movieId);
    });

});

/*
const axios = require('axios');

axios.get('https://api.themoviedb.org/3/search/movie', {
    params: {
        api_key: 'your_api_key', // replace with your actual API key
        query: 'your_query' // replace with your actual query
    }
})
.then(function (response) {
    console.log(response.data);
})
.catch(function (error) {
    console.log(error);
});*/