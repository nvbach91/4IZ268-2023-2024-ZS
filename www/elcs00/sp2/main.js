//API KEY
const LASTFM_API_KEY = 'cce566cc0c09dd3c1bf3b4e902f8292c';

// Search for the artist
function search() {
    const searchTerm = document.getElementById('search-input').value.trim();

    const searchInput = document.getElementById('search-input');
    searchInput.value = '';

    if (searchTerm !== '') {
        const apiUrl = `https://ws.audioscrobbler.com/2.0/?method=artist.search&artist=${searchTerm}&api_key=${LASTFM_API_KEY}&format=json`;

        $.ajax({
            url: apiUrl,
            method: 'GET',
            success: function(data) {
                // Check if the response contains artists
                const artists = data.results?.artistmatches?.artist;

                if (artists && artists.length > 0) {
                    // Extract relevant information from Last.fm API response
                    const simplifiedData = artists.map(artist => ({
                        name: artist.name,
                    }));
                    document.getElementById('results-container').style.display = 'flex'; // search results
                    document.getElementById('library-container').style.display = 'none'; // saved results in library
                    displayResults(simplifiedData);
                } else {
                    // No results found
                    displayResults([]);
                }
            },
            error: function(error) {
                console.error('Došlo k chybě:', error);
            }
        });
    }
    //displayLibrary();
}

// Representation of the API's results
function displayResults(artists) {
    const resultsContainer = document.getElementById('results-container');
    resultsContainer.innerHTML = '';

    if (artists.length === 0) {
        resultsContainer.innerHTML = '<p>Nebyly nalezeny žádné výsledky :(</p>';
    } else {
        artists.forEach(artist => {
            const artistCard = document.createElement('div');
            artistCard.className = 'artist-card';

            const artistName = document.createElement('h3');
            artistName.textContent = artist.name;

            const saveButton = document.createElement('button');
            saveButton.textContent = 'Uložit';
            saveButton.addEventListener('click', function() {
                saveToLibrary(artist.name);
            });

            artistCard.appendChild(artistName);
            artistCard.appendChild(saveButton);
            resultsContainer.appendChild(artistCard);
        });
    }
}

// Save an artist to the library
function saveToLibrary(artistName) {

    const library = getLibrary();

    // Check if the artist is already in the library
    if (isInLibrary(artistName)) {
        showMessage('Tento album již je ve knihovně', 'error');
    } else {
        // Artist is not in the library, add it
        library.push(artistName);
        localStorage.setItem('library', JSON.stringify(library));
        //displayLibrary();

        // Show success message
        showMessage('Album byl úspěšně přidán do knihovny', 'success');
    }
}

// Error or success message
function showMessage(message, type) {
    const messageContainer = document.getElementById('message-container');
    messageContainer.textContent = message;

    // Apply different styles based on the message type (success or error)
    if (type === 'success') {
        messageContainer.style.color = 'green';
    } else if (type === 'error') {
        messageContainer.style.color = 'red';
    }

    document.getElementById('message-container').style.display = 'block'; //error or success message
    // Display the message for 3 seconds (adjust as needed)
    setTimeout(() => {
        //messageContainer.textContent = '';
        document.getElementById('message-container').style.display = 'none'; /**/
    }, 3000);
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

// Display library
function displayLibrary() {
    document.getElementById('results-container').style.display = 'none';
    const libraryList = document.getElementById('library-list');
    const library = getLibrary();
    libraryList.innerHTML = '';

    if (library.length === 0) {
        libraryList.innerHTML = '<p>Knihovna je prázdná.</p>';
    } else {
        library.forEach(artist => {
            // Create a container div for each artist
            const artistContainer = document.createElement('div');
            artistContainer.className = 'artist-card';

            // Create a div for the artist's name
            const artistNameDiv = document.createElement('div');
            artistNameDiv.textContent = artist; //

            // Create a div for the delete button
            const deleteButtonDiv = document.createElement('div');

            // Create the delete button
            const deleteButton = document.createElement('button');
            deleteButton.textContent = 'Smazat';
            deleteButton.addEventListener('click', function() {
                deleteFromLibrary(artist);
            });

            // Append the delete button to its container div
            deleteButtonDiv.appendChild(deleteButton);

            // Append the artist's name div and the delete button div to the main container div
            artistContainer.appendChild(artistNameDiv);
            artistContainer.appendChild(deleteButtonDiv);

            // Append the main container div to the library list
            libraryList.appendChild(artistContainer);
        });
    }
}

// Delete an artist from library 
function deleteFromLibrary(artistName) {
    const library = getLibrary();
    // Use filter to create a new array without the specified artist
    const updatedLibrary = library.filter(artist => artist !== artistName);
    localStorage.setItem('library', JSON.stringify(updatedLibrary));
    // Display the updated library
    displayLibrary();
    showMessage('Album bylo uspěšně smazáno', 'success');
}

function goHome() {
    // Hide the results when going home
    document.getElementById('results-container').style.display = 'none';

    // Display the library
    document.getElementById('library-container').style.display = 'block';

    const searchInput = document.getElementById('search-input');

    // Clear the input text
    searchInput.value = '';

    displayLibrary();
}

// Call the function to display library after loading
displayLibrary();