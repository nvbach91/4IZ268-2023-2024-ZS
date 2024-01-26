$(document).ready(() => {
    //Global declaration of the button
    let searchType = 'books';
    //const bookQuoteParagraph = $('.book-quote p');

    const searchViewContainer = $('#searchViewContainer');
    const libraryViewContainer = $('#libraryViewContainer');
    //const bookQuote = $('.book-quote');
    const booksContainer = $('#booksContainer');
    const myLibraryButton = $('#myLibraryButton');
    const searchInput = $("#searchInput");
    const sliderKnob = $("#sliderKnob");
    const sortSelect = $("#sortSelect");

    // Refactored quote generation into a function
    /*const generateRandomQuote = () => {
        const quotes = [
            "“A room without books is like a body without a soul.” ― Marcus Tullius Cicero",
            "“So many books, so little time.” ― Frank Zappa",
            "“A book is a dream that you hold in your hand.” ― Neil Gaiman",
            "“Good friends, good books, and a sleepy conscience: this is the ideal life.” ― Mark Twain",
            "“Fairy tales are more than true: not because they tell us that dragons exist, but because they tell us that dragons can be beaten.” ― Neil Gaiman, Coraline",
            "“Outside of a dog, a book is man's best friend. Inside of a dog it's too dark to read.” ― Groucho Marx, The Essential Groucho: Writings For By And About Groucho Marx",
            "“You can never get a cup of tea large enough or a book long enough to suit me.” ― C.S. Lewis",
            "“There is no friend as loyal as a book.” ― Ernest Hemingway"
        ];

        const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
        bookQuoteParagraph.text(randomQuote);
    }

    // Initial call to display a random quote
    generateRandomQuote();*/


    // Use jQuery for event handling
    sliderKnob.click(() => {
        searchType = searchType === 'books' ? 'authors' : 'books';
        updateSearchTypeUI();
    });


    //change between my library and searching
    myLibraryButton.click(function () {
        const isLibraryView = $(this).text() === 'My Library';

        // Toggle between Library view and Search view
        if (isLibraryView) {
            showLibrary();
            $(this).text('Back to Search');
            searchViewContainer.hide(); // Hide the search view
            libraryViewContainer.show(); // Show the library view
        } else {
            booksContainer.empty();
            $(this).text('My Library');
            libraryViewContainer.hide(); // Hide the library view
            searchViewContainer.show(); // Show the search view
        }
    });



    //change for search UI (title or author)
    const updateSearchTypeUI = () => {
        if (searchType === 'books') {
            sliderKnob.removeClass('active');
            searchInput.attr('placeholder', 'Search for books by title...');
        } else {
            sliderKnob.addClass('active');
            searchInput.attr('placeholder', 'Search for books by authors name...');
        }
    }

    // Initialize UI based on the default search type
    updateSearchTypeUI();

    // Handling the form submission
    $('#searchForm').submit((e) => {
        e.preventDefault();
        let query = searchInput.val().trim();

        if (query !== '') {
            query = searchType === 'books' ? `intitle:${query}` : `inauthor:${query}`;

            // Fetch books and then clear the input
            fetchBooks(query)
                .then(data => {
                    searchInput.val('');
                    displayBooks(data);
                })
                .catch(error => {
                    console.error(error.message);
                });
        }
    });

    //Get books from API
    const fetchBooks = (query, maxResults = 30) => {
        const apiKey = 'AIzaSyB8EdrnIfKOlfahpFbsUlWVP5dNusUszA4';
        const formattedQuery = encodeURIComponent(query);
        const apiUrl = `https://www.googleapis.com/books/v1/volumes?q=${formattedQuery}&maxResults=${maxResults}&key=${apiKey}`;

        const loadingIndicator = $('<div class="loading-indicator">Loading...</div>');
        //bookQuoteParagraph.hide();
        booksContainer.append(loadingIndicator);

        return new Promise((resolve, reject) => {
            $.ajax({
                url: apiUrl,
                method: 'GET',
                dataType: 'json',
                success: (data) => {
                    loadingIndicator.remove();
                    resolve(data);
                },
                error: () => {
                    loadingIndicator.remove();
                    reject(new Error('Error: Unable to fetch data'));
                }
            });
        });
    }

    //Fuction for displaying each books
    const displayBooks = (data) => {
        //bookQuote.hide();
        booksContainer.empty();

        if (data.items && data.items.length > 0) {
            const row = $('<div class="row">');
            data.items.forEach((book) => {
                row.append(bookAtributes(book, false));
            });
            booksContainer.empty().append(row)
        } else {
            displayNoResultsMessage(booksContainer);
        }
    }

    //fuction for extracting atributes from local storage or api
    const bookAtributes = (book, isFromLocalStorage = false) => {
        const title = isFromLocalStorage ? book.title : book.volumeInfo.title || 'Unknown Title';
        const author = isFromLocalStorage ? (book.authors ? book.authors.join(', ') : 'Unknown Author') : (book.volumeInfo.authors ? book.volumeInfo.authors.join(', ') : 'Unknown Author');
        const publishedYear = isFromLocalStorage ? (book.year || 'Unknown Year') : (book.volumeInfo.publishedDate ? book.volumeInfo.publishedDate.substring(0, 4) : 'Unknown Year');
        const coverImage = isFromLocalStorage ? (book.coverImage || '') : (book.volumeInfo.imageLinks && book.volumeInfo.imageLinks.thumbnail ? book.volumeInfo.imageLinks.thumbnail : '');
        const description = isFromLocalStorage ? (book.description || 'No description available.') : (book.volumeInfo.description || 'No description available.');
        const publisher = isFromLocalStorage ? (book.publisher || 'Unknown Publisher') : (book.volumeInfo.publisher || 'Unknown Publisher');
        const language = isFromLocalStorage ? (book.language || 'Unknown Language') : (book.volumeInfo.language || 'Unknown Language');
        const isbn = isFromLocalStorage ? (book.isbn || 'Unknown ISBN') : (book.volumeInfo.industryIdentifiers && book.volumeInfo.industryIdentifiers[0].identifier ? book.volumeInfo.industryIdentifiers[0].identifier : 'Unknown ISBN');

        return createBookCard(title, author, publishedYear, coverImage, book, description, publisher, language, isbn);
    }



    //Creates the book's card with all information
    const createBookCard = (title, author, publishedYear, coverImage, book, description, publisher, language, isbn) => {
        const col = $('<div class="col-md-2 mb-4">');
        const card = $('<div class="card">');
        const cardBody = $('<div class="card-body">');
        const cardFooter = $('<div class="card-footer">');
        const addToFavBtn = $('<button class="btn">');
        const bookTitle = $('<h5 class="card-title book-title ellipsis">').text(`${title}`);
        const bookAuthor = $('<p class="card-text">').text('by ' + author);
        const bookPublishedYear = $('<p class="card-text">').text('Year: ' + publishedYear);
        const favourites = JSON.parse(localStorage.getItem('favouriteBooks')) || [];
        const bookAlreadyFavourited = favourites.some(favBook => favBook.id === book.id);

        if (coverImage === '') {
            const noCoverText = $('<p class="no-cover-text">').text('No Cover Available');
            cardImage = noCoverText;
        } else {
            cardImage = $('<img class="card-img-top" src="' + coverImage + '" alt="Cover Image">');
        }

        //contition to determinate what text should button in card footer have
        if (bookAlreadyFavourited) {
            // Book is already favorited, so set the button text accordingly
            addToFavBtn.addClass('btn-success');
            addToFavBtn.text('In Your Library');
        } else {
            // Book is not favorited, set the button text for adding it to favorites
            addToFavBtn.addClass('btn-primary').text('Add to Favourite');
        }

        //added to LocalStorage and my library
        addToFavBtn.click(function () {
            toggleFavourite(book, this);
        });

        cardBody.append(bookTitle, bookAuthor, bookPublishedYear);
        cardFooter.append(addToFavBtn);
        card.append(cardImage, cardBody, cardFooter);
        col.append(card);

        //Opening modal window 
        cardImage.click(() => {
            openModal(title, author, publishedYear, coverImage, description, publisher, language, isbn);
        });

        cardBody.click(() => {
            openModal(title, author, publishedYear, coverImage, description, publisher, language, isbn);
        });


        return col;
    }

    //Error display for no results
    const displayNoResultsMessage = (container) => {
        const noResultsMsg = $('<div class="alert alert-warning" role="alert">')
            .text('No results found. Please try a different search.');
        container.append(noResultsMsg);
    }

    // Function to extract necessary book attributes
    const extractBookData = (book) => ({
        id: book.id,
        title: book.volumeInfo.title,
        authors: book.volumeInfo.authors,
        coverImage: book.volumeInfo.imageLinks ? book.volumeInfo.imageLinks.thumbnail : '',
        description: book.volumeInfo.description || 'No description available.',
        year: book.volumeInfo.publishedDate ? book.volumeInfo.publishedDate.substring(0, 4) : 'Unknown Year',
        publisher: book.volumeInfo.publisher || 'Unknown Publisher',
        language: book.volumeInfo.language || 'Unknown Language',
        isbn: getIsbn(book.volumeInfo.industryIdentifiers) || 'Unknown ISBN'
    });

    // Function to extract ISBN from industryIdentifiers
    const getIsbn = (industryIdentifiers) => {
        if (industryIdentifiers) {
            const isbnObj = industryIdentifiers.find(identifier => identifier.type === 'ISBN_13');
            if (isbnObj) {
                return isbnObj.identifier;
            }
        }
        return 'Unknown ISBN';
    }


    //Change for display between Mylibrary and Search
    const toggleFavourite = (book, buttonElement) => {
        let favourites = JSON.parse(localStorage.getItem('favouriteBooks')) || [];
        let bookAlreadyFavourited = favourites.some(favBook => favBook.id === book.id);

        if (bookAlreadyFavourited) {
            // Remove the book from favourites
            favourites = favourites.filter(favBook => favBook.id !== book.id);
            localStorage.setItem('favouriteBooks', JSON.stringify(favourites));

            if ($(myLibraryButton).text() === 'Back to Search') {
                if (favourites.length == 0) {
                    const noFavouritesMsg = $('<div class="alert alert-info" role="alert">')
                        .text('Your library is empty. Add some books to your favourites!');
                    booksContainer.append(noFavouritesMsg);
                }
                $(buttonElement).closest('.col-md-2').remove();
            } else {
                $(buttonElement).text('Add to Favourite').removeClass('btn-success').addClass('btn-primary');
            }
        } else {
            // Add the book to favourites
            const bookData = extractBookData(book); // Extract only necessary data
            favourites.push(bookData);
            localStorage.setItem('favouriteBooks', JSON.stringify(favourites));
            $(buttonElement).text('In Your Library').addClass('btn-success').removeClass('btn-primary');
        }
    }


    //Display books stored locally
    const showLibrary = (sortBy = 'default') => {
        let favourites = JSON.parse(localStorage.getItem('favouriteBooks')) || [];
        favourites = sortFavourites(favourites, sortBy);

        booksContainer.empty();

        if (favourites.length > 0) {
            let row = $('<div class="row">');
            favourites.forEach((book) => {
                // Use the createBookCard function to create the HTML for the book card
                const bookCard = bookAtributes(book, true);
                row.append(bookCard);
            });
            // Append the row of favourite book cards to the booksContainer
            booksContainer.empty().append(row)
        } else {
            const noFavouritesMsg = $('<div class="alert alert-info" role="alert">')
                .text('Your library is empty. Add some books to your favourites!');
            booksContainer.append(noFavouritesMsg);
        }
    }

    //sort by given input
    const sortFavourites = (favourites, sortBy) => {
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

    //Sort by given input show in library
    sortSelect.change((event) => {
        const selectedSortBy = event.target.value;
        showLibrary(selectedSortBy);
    });


    const openModal = (title, author, publishedYear, coverImage, description, publisher, language, isbn) => {
        const modal = $('#bookModal');
        const modalBody = $('#modalBody');
        modalBody.empty();

        const flexContainer = $('<div class="flex-container"></div>');

        // Create a div for the text content
        const textContent = $('<div class="text-content"></div>');
        textContent.append(`<h2>${title}</h2>`);
        textContent.append(`<p><b>Author:</b> ${author}</p>`);
        textContent.append(`<p><b>Published Year:</b> ${publishedYear}</p>`);
        textContent.append(`<p><b>Publisher:</b> ${publisher}</p>`);
        textContent.append(`<p><b>Language:</b> ${language}</p>`);
        textContent.append(`<p><b>ISBN:</b> ${isbn}</p>`);
        textContent.append(`<p><b>Short description of the plot:</b> ${description} </p>`);

        // Append the text content div to the flex container
        flexContainer.append(textContent);

        // Only add the image if it exists
        if (coverImage) {
            const imageContent = $('<div class="image-content"></div>');
            imageContent.append(`<img src="${coverImage}" alt="${title} Cover" class="modal-book-cover"/>`);
            // Append the image div to the flex container
            flexContainer.append(imageContent);
        }

        // Append the flex container to the modal body
        modalBody.append(flexContainer);

        modal.show();
    }


    // Close the modal when the user clicks on <span> (x)
    $('.close').click(() => {
        $('#bookModal').hide();
    });

    // Close the modal when the user clicks anywhere outside of the modal
    $(window).click(event => {
        if ($(event.target).is('#bookModal')) {
            $('#bookModal').hide();
        }
    });

});
