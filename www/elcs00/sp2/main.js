// Search for an artist
function search() {
    // Get an input from the search input field
    const searchTerm = document.getElementById('search-input').value;

    // If it is not empty then create a (testing) API Url, 
    if (searchTerm.trim() !== '') {
        const apiUrl = `https://jsonplaceholder.typicode.com/users`;
        $.ajax({
            url: apiUrl,
            method: 'GET',
            success: function (data) {
                displayResults(data);
            },
            error: function (error) {
                console.error('Došlo k chybě:', error);
            }
        });
    }
}

// Representation of the API's results
function displayResults(users) {
    const resultsContainer = document.getElementById('results-container');
    resultsContainer.innerHTML = '';

    if (users.length === 0) {
        resultsContainer.innerHTML = '<p>Nebyly nalezeny žádné výsledky :(</p>';
    } else {
        users.forEach(user => {
            const artistCard = document.createElement('div');
            artistCard.className = 'artist-card';

            const artistName = document.createElement('h3');
            artistName.textContent = user.name;

            const userEmail = document.createElement('p');
            userEmail.textContent = user.email;

            const saveButton = document.createElement('button');
            saveButton.textContent = 'Uložit';
            saveButton.addEventListener('click', function() {
                saveToLibrary(user.name);
            });

            artistCard.appendChild(artistName);
            artistCard.appendChild(userEmail);
            artistCard.appendChild(saveButton);
            resultsContainer.appendChild(artistCard);
        });
    }
}

// Save an artist to the library
function saveToLibrary(artistName) {
    if (!isInLibrary(artistName)) {
        const library = getLibrary();
        library.push(artistName);
        localStorage.setItem('library', JSON.stringify(library));
        displayLibrary();
    }
}

// Check if an artist is in the library
function isInLibrary(artistName) {
    const library = getLibrary();
    return library.includes(artistName);
}

// Get the library from local storage
function getLibrary() {
    return JSON.parse(localStorage.getItem('library')) || [];
}

// Display the library
function displayLibrary() {
    const libraryList = document.getElementById('library-list');
    const library = getLibrary();
    libraryList.innerHTML = '';

    if (library.length === 0) {
        libraryList.innerHTML = '<p>Knihovna je prázdná.</p>';
    } else {
        library.forEach(artist => {
            const listItem = document.createElement('li');
            listItem.textContent = artist;
            libraryList.appendChild(listItem);
        });
    }
}

// Call the function to display library after loading
displayLibrary();
