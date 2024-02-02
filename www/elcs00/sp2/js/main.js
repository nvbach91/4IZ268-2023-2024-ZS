//API KEY
const LASTFM_API_KEY = 'cce566cc0c09dd3c1bf3b4e902f8292c';



//Check the DOM is fully loaded
document.addEventListener('DOMContentLoaded', function() {
    
    // Get the goHomeIcon element
    var goHomeIcon = document.getElementById('goHomeIcon');

    // Attach the event listener for goHomeIcon
    goHomeIcon.addEventListener('click', goHome);

    // Get the searchButton element
    var searchButton = document.getElementById('searchButton');

    // Go to search function after search button is clicked
    //searchButton.addEventListener('click', search);


    //folrmular
    const form = document.getElementById('formular')

    /*const func = function(event) {
        event.preventDefault();
        search();
    };*/


    form.addEventListener('submit', function(event) {
        event.preventDefault();
        search();
    })

    

    // Display library after loading
    displayLibrary();
});

// Search for the artist
function search() {
    const searchTerm = document.getElementById('search-input').value.trim();

    const searchInput = document.getElementById('search-input');
    searchInput.value = '';

    if (searchTerm !== '') {
        // Show spinner while fetching data
        showSpinner();

        const apiUrl = `https://ws.audioscrobbler.com/2.0/?method=artist.search&artist=${searchTerm}&api_key=${LASTFM_API_KEY}&format=json`;

        $.ajax({
            url: apiUrl,
            method: 'GET',
            success: function(data) {

                console.log(data)
                // Check if the response contains artists
                const artists = data.results?.artistmatches?.artist;

                if (artists && artists.length > 0) {
                    // Extract relevant information from Last.fm API response
                    const simplifiedData = artists.map(artist => ({
                        name: artist.name,
                        url: artist.url,
                        imgUrl: artist.image[1]['#text']
                    }));
                    document.getElementById('results-container').style.display = 'flex'; // search results
                    document.getElementById('library-container').style.display = 'none'; // saved results in library
                    displayResults(simplifiedData);
                } else {
                    // No results found
                    displayResults([]);
                }

                // Hide spinner after data is fetched
                hideSpinner();
            },
            error: function(error) {
                console.error('Došlo k chybě:', error);

                // Hide spinner in case of an error
                hideSpinner();
            }
        });
    }
    //displayLibrary();
}

// Function to show spinner
function showSpinner() {
    document.getElementById('spinner-container').style.display = 'flex';
}

// Function to hide spinner
function hideSpinner() {
    document.getElementById('spinner-container').style.display = 'none';
}

// Representation of the API's results
function displayResults(artists) {
    const resultsContainer = document.getElementById('results-container');
    resultsContainer.innerHTML = '';

    if (artists.length === 0) {
        resultsContainer.innerHTML = '<p>Nebyly nalezeny žádné výsledky :(</p>';
    } else {
        artists.forEach(artist => {

            const ifInLibrary = isInLibrary(artist.name);
            //console.log('IsinLibrary', ifInLibrary);

            //Create an artist card
            const artistCard = document.createElement('div');
            artistCard.className = 'artist-card';
            
            //Create an element for artist name
            const artistName = document.createElement('h3');
            artistName.textContent = artist.name;
        
            // Anchor element for the artist URL, open in new Window
            /*const artistLink = document.createElement('a');
            artistLink.href = artist.url;
            artistLink.textContent = 'Navštívit stránku umělce';*/

            const artistLink = document.createElement('a');
            artistLink.href = artist.url;
            artistLink.textContent = 'Navštívit stránku umělce';
            artistLink.target = '_blank';
            
            //Create an image and alt text
            const artistImg = document.createElement('img');

            //artistImg.src = artist.imgUrl
            console.log(artist)

            artistImg.src = artist.imgUrl || 'https://w7.pngwing.com/pngs/166/766/png-transparent-musical-note-song-melody-music-emoji-angle-rectangle-monochrome.png';
            artistImg.width = 50;

            artistImg.alt = artist.name;

            //Create a button
            const saveButton = document.createElement('button');
            saveButton.textContent = 'Uložit';

            //Create a saved indicator
            const saveInd = document.createElement('h5');
            saveInd.textContent = 'Umělec je uložen';

            /*saveButton.addEventListener('click', function() {
                saveToLibrary(artist.name, saveButton, saveInd);
            });*/

            if (ifInLibrary) {
                saveButton.style.display = 'none';
            } else {
                saveButton.addEventListener('click', function() {
                    saveToLibrary(artist.name, saveButton, saveInd);
                });
            }
        
        
            artistCard.appendChild(artistImg);
            artistCard.appendChild(artistName);
            artistCard.appendChild(artistLink);
            artistCard.appendChild(saveButton);
            artistCard.appendChild(saveInd);
            

            saveInd.style.display = 'none';
        
            resultsContainer.appendChild(artistCard);
        });
        
    }
}

// Save an artist to the library
function saveToLibrary(artistName, saveButton, saveInd) {

    const library = getLibrary();


    // Check if the artist is already in the library
    if (isInLibrary(artistName)) {
        
        saveButton.style.display = 'none';
        saveInd.style.display = 'block';
        showMessage('Umělěc byl úspěšně přidán do knihovny', 'success');
        //showMessage('Tento umělěc již je ve knihovně', 'error');

    } else {
        // Artist is not in the library, add it
        library.push(artistName);
        localStorage.setItem('library', JSON.stringify(library));
        //displayLibrary();
        saveButton.style.display = 'none';
        saveInd.style.display = 'block';
        // Show success message
        showMessage('Umělěc byl úspěšně přidán do knihovny', 'success');
        

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
        // Create a document fragment (so DOM is not in the loop)
        const fragment = document.createDocumentFragment();

        library.forEach(artist => {
            // Container for each artist
            const artistContainer = document.createElement('div');
            artistContainer.className = 'artist-card';

            // Artist's name
            const artistNameDiv = document.createElement('div');
            artistNameDiv.textContent = artist;

            // Delete button container
            const deleteButtonDiv = document.createElement('div');

            // Delete button itself
            const deleteButton = document.createElement('button');
            deleteButton.textContent = 'Smazat';
            deleteButton.addEventListener('click', function() {
                deleteFromLibrary(artist);
            });

            // Append the delete button to its container div
            deleteButtonDiv.appendChild(deleteButton);

            // Append the artist's name and the delete to the main container
            artistContainer.appendChild(artistNameDiv);
            artistContainer.appendChild(deleteButtonDiv);

            // Append the main container to the fragment
            fragment.appendChild(artistContainer);
        });

        // Append the fragment to the libraryList once
        libraryList.appendChild(fragment);
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
    showMessage('Umělěc byl uspěšně smazán', 'success');
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