$(document).ready(function () {
    var searchType = 'books';


    // Refactored quote generation into a function
    function generateRandomQuote() {
        var quotes = [
            "“A room without books is like a body without a soul.” ― Marcus Tullius Cicero",
            "“So many books, so little time.” ― Frank Zappa",
            "“A book is a dream that you hold in your hand.” ― Neil Gaiman",
            "“Good friends, good books, and a sleepy conscience: this is the ideal life.” ― Mark Twain",
            "“Fairy tales are more than true: not because they tell us that dragons exist, but because they tell us that dragons can be beaten.” ― Neil Gaiman, Coraline",
            "“Outside of a dog, a book is man's best friend. Inside of a dog it's too dark to read.” ― Groucho Marx, The Essential Groucho: Writings For By And About Groucho Marx",
            "“You can never get a cup of tea large enough or a book long enough to suit me.” ― C.S. Lewis",
            "“There is no friend as loyal as a book.” ― Ernest Hemingway"
        ];

        var randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
        $('.book-quote p').text(randomQuote);
    }

    // Initial call to display a random quote
    generateRandomQuote();


    // Use jQuery for event handling
    $('#sliderKnob').click(function () {
        searchType = searchType === 'books' ? 'authors' : 'books';
        updateSearchTypeUI();
    });

    //change between my library and searching
    $('#myLibraryButton').click(function () {
        var isLibraryView = $(this).text() === 'My Library';

        // Toggle between Library view and Search view
        if (isLibraryView) {
            // Switching to Library view
            $('.search-bar').children().not('#myLibraryButton').hide();
            $(this).text('Back to Search');
            showLibrary();
            $('.book-quote').hide();
            $('#sortContainer').show();
            $('#booksContainer').addClass('library-mode');
        } else {
            // Switching to Search view
            $('.search-bar').children().show();
            $(this).text('My Library');
            hideLibrary();
            generateRandomQuote();
            $('.book-quote').show();
            $('#sortContainer').hide();
            $('#booksContainer').removeClass('library-mode');
        }
    });


    //change for search UI (title or author)
    function updateSearchTypeUI() {
        if (searchType === 'books') {
            $('#sliderKnob').removeClass('active');
            $('#searchInput').attr('placeholder', 'Search for books by title...');
        } else {
            $('#sliderKnob').addClass('active');
            $('#searchInput').attr('placeholder', 'Search for books by authors name...');
        }
    }

    // Initialize UI based on the default search type
    updateSearchTypeUI();

    // Handling the form submission
    $('#searchForm').submit(function (e) {
        e.preventDefault();
        var query = $('#searchInput').val().trim();

        if (query !== '') {
            query = searchType === 'books' ? `intitle:${query}` : `inauthor:${query}`;
            fetchBooks(query);
            $('#searchInput').val('');
        }
    });

    //Get books from API
    function fetchBooks(query, maxResults = 30) {
        var apiKey = 'AIzaSyB8EdrnIfKOlfahpFbsUlWVP5dNusUszA4';
        var formattedQuery = encodeURIComponent(query);
        var apiUrl = `https://www.googleapis.com/books/v1/volumes?q=${formattedQuery}&maxResults=${maxResults}&key=${apiKey}`;

        $.ajax({
            url: apiUrl,
            method: 'GET',
            dataType: 'json',
            success: function (data) {
                displayBooks(data);
            },
            error: function () {
                console.error('Error: Unable to fetch data');
            }
        });
    }

    //Fuction for displaying each books
    function displayBooks(data) {
        var booksContainer = $('#booksContainer');
        $('.book-quote').hide();
        booksContainer.empty();

        if (data.items && data.items.length > 0) {
            var row = $('<div class="row">');
            data.items.forEach(function (book) {
                row.append(createBookCard(book));
            });
            booksContainer.append(row);
        } else {
            displayNoResultsMessage(booksContainer);
        }
    }

    //Creates the book's card with all information
    function createBookCard(book) {
        var title = book.volumeInfo.title;
        var author = book.volumeInfo.authors ? book.volumeInfo.authors.join(', ') : 'Unknown Author';
        var publishedYear = book.volumeInfo.publishedDate ? book.volumeInfo.publishedDate.substring(0, 4) : 'Unknown Year';
        var coverImage = book.volumeInfo.imageLinks && book.volumeInfo.imageLinks.thumbnail
            ? book.volumeInfo.imageLinks.thumbnail
            : './pictures/placeholder.svg';
        var col = $('<div class="col-md-2 mb-4">');
        var card = $('<div class="card">');
        var cardBody = $('<div class="card-body">');
        var cardFooter = $('<div class="card-footer">');
        var addToFavBtn = $('<button class="btn">');
        var bookTitle = $('<h5 class="card-title book-title">').text(title + ' (' + publishedYear + ')');
        var bookAuthor = $('<p class="card-text">').text('by ' + author);
        var favourites = JSON.parse(localStorage.getItem('favouriteBooks')) || [];
        var bookAlreadyFavourited = favourites.some(favBook => favBook.id === book.id);
        var cardImage = $('<img class="card-img-top" src="' + coverImage + '" alt="Cover Image">');

        //contition to determinate what text should button in card footer have
        if (bookAlreadyFavourited) {
            addToFavBtn.addClass('btn-success').text($('#myLibraryButton').text() === 'Back to Search' ? 'Remove from Library' : 'In Your Library');
        } else {
            addToFavBtn.addClass('btn-primary').text('Add to Favourite');
        }

        //added to LocalStorage and my library
        addToFavBtn.click(function () {
            toggleFavourite(book, this);
        });

        cardBody.append(bookTitle, bookAuthor);
        cardFooter.append(addToFavBtn);
        card.append(cardImage, cardBody, cardFooter);
        col.append(card);

        return col;
    }

    //Error display for no results
    function displayNoResultsMessage(container) {
        var noResultsMsg = $('<div class="alert alert-warning" role="alert">')
            .text('No results found. Please try a different search.');
        container.append(noResultsMsg);
    }

    //Change for display between Mylibrary and Search
    function toggleFavourite(book, buttonElement) {
        var favourites = JSON.parse(localStorage.getItem('favouriteBooks')) || [];
        var bookAlreadyFavourited = favourites.some(favBook => favBook.id === book.id);

        if (bookAlreadyFavourited) {
            // Remove the book from favourites
            favourites = favourites.filter(favBook => favBook.id !== book.id);
            localStorage.setItem('favouriteBooks', JSON.stringify(favourites));

            if ($('#myLibraryButton').text() === 'Back to Search') {
                if (favourites.length == 0) {
                    var noFavouritesMsg = $('<div class="alert alert-info" role="alert">')
                        .text('Your library is empty. Add some books to your favourites!');
                    $('#booksContainer').append(noFavouritesMsg);
                }
                $(buttonElement).closest('.col-md-2').remove();
            } else {
                $(buttonElement).text('Add to Favourite').removeClass('btn-success').addClass('btn-primary');
            }
        } else {
            // Add the book to favourites
            favourites.push(book);
            localStorage.setItem('favouriteBooks', JSON.stringify(favourites));
            $(buttonElement).text('In Your Library').addClass('btn-success').removeClass('btn-primary');
        }
    }


    //Display books stored locally
    function showLibrary(sortBy = 'default') {
        var favourites = JSON.parse(localStorage.getItem('favouriteBooks')) || [];
        favourites = sortFavourites(favourites, sortBy);

        $('#booksContainer').empty();

        if (favourites.length > 0) {
            var row = $('<div class="row">');
            favourites.forEach(function (book) {
                // Use the createBookCard function to create the HTML for the book card
                var bookCard = createBookCard(book);
                row.append(bookCard);
            });
            // Append the row of favourite book cards to the booksContainer
            $('#booksContainer').append(row);
        } else {
            var noFavouritesMsg = $('<div class="alert alert-info" role="alert">')
                .text('Your library is empty. Add some books to your favourites!');
            $('#booksContainer').append(noFavouritesMsg);
        }
    }

    //hide books stored locally
    function hideLibrary() {
        $('#booksContainer').empty();
    }


    function sortFavourites(favourites, sortBy) {
        switch (sortBy) {
            case 'title':
                return favourites.sort((a, b) => a.volumeInfo.title.localeCompare(b.volumeInfo.title));
            case 'author':
                return favourites.sort((a, b) => a.volumeInfo.authors[0].localeCompare(b.volumeInfo.authors[0]));
            case 'year':
                return favourites.sort((a, b) => {
                    const yearA = a.volumeInfo.publishedDate ? parseInt(a.volumeInfo.publishedDate.substring(0, 4)) : 0;
                    const yearB = b.volumeInfo.publishedDate ? parseInt(b.volumeInfo.publishedDate.substring(0, 4)) : 0;
                    return yearA - yearB;
                });
            case 'reverse':
                return favourites.slice().reverse();
            case 'default':
                return favourites;
        }
    }

    $('#sortSelect').change(function () {
        showLibrary(this.value);
    });
});
