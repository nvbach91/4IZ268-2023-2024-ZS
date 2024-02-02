// Select the loader element by its ID
const loader = document.getElementById('loader');

// Dog API key and subId for requests
const apiKey = 'live_yHlLVvWZs1dl5WbsRWSehG9XjIWfiWjfvbaPXAQC16Cz7Br8gh6C6hbx3VHzJGKW';
const subId = 'user-123';

// Select the container for dog details content
const dogDetailsContent = document.querySelector('.dog-details-content');
const searchInput = document.getElementById('searchInput');

// Add an event listener to the search form to handle the submit event
document.getElementById('searchForm').addEventListener('submit', function (event) {
    event.preventDefault();
    searchBreeds();
});

// Function to perform a search for dog breeds
function searchBreeds() {
    // Get the search query from the input field and trim any whitespace
    const searchQuery = searchInput.value.trim();

    // Display an alert if the search query is empty
    if (searchQuery === '') {
        alert('Prosím, zadejte hledaný výraz.');
        return;
    }

    // Show the loader while fetching data
    loader.style.display = 'block';

    // Fetch dog breeds based on the search query
    fetch(`https://api.thedogapi.com/v1/breeds/search?q=${searchQuery}`, {
        headers: {
            'x-api-key': apiKey
        }
    })
        .then(response => response.json())
        .then(data => {
            // Display an alert if no breeds are found
            if (data.length === 0) {
                alert('Žádné plemeno nebylo nalezeno.');
                return;
            }

            // Display the search results
            displaySearchResults(data);
        })
        .catch(error => {
            console.error('Chyba při načítání plemen:', error);
        })
        .finally(() => {
            // Hide the loader when the fetch request is completed (whether successful or not)
            loader.style.display = 'none';
        });
}
const searchResultsContainer = document.getElementById('searchResults');
// Function to display search results for dog breeds
function displaySearchResults(breeds) {
    searchResultsContainer.innerHTML = '';

    const uniqueBreeds = {};
    const fragment = document.createDocumentFragment();

    breeds.forEach(breed => {
        if (!uniqueBreeds[breed.id]) {
            uniqueBreeds[breed.id] = true;

            const resultContainer = document.createElement('div');
            resultContainer.classList.add('dog-item');
            resultContainer.dataset.id = breed.id;

            const dogImage = document.createElement('div');
            const imgElement = document.createElement('img');
            imgElement.src = breed.image ? breed.image.url : '';
            dogImage.classList.add('dogImage');
            dogImage.appendChild(imgElement);

            const dogNameContainer = document.createElement('div');
            dogNameContainer.classList.add('dogName');

            const breedNameElem = document.createElement('h3');
            breedNameElem.textContent = breed.name;

            const infoButton = document.createElement('button');
            infoButton.innerHTML = '<i class="fas fa-info-circle"></i>';
            infoButton.classList.add('infoButton');
            infoButton.addEventListener('click', (e) => getDogInfo(e));

            const favoriteButton = document.createElement('button');
            favoriteButton.innerHTML = '<i class="fas fa-heart"></i>';
            favoriteButton.classList.add('favoriteButton');
            favoriteButton.addEventListener('click', () => addToFavorites(breed));

            dogNameContainer.appendChild(breedNameElem);
            dogNameContainer.appendChild(infoButton);
            dogNameContainer.appendChild(favoriteButton);

            resultContainer.appendChild(dogImage);
            resultContainer.appendChild(dogNameContainer);

            fragment.appendChild(resultContainer);
        }
    });
    // Append the fragment to the DOM after the loop
    searchResultsContainer.appendChild(fragment);
}


// Function to get detailed information about a dog breed
function getDogInfo(e) {
    e.preventDefault();
    const dogItem = e.target.closest('.dog-item');
    const breedId = dogItem.dataset.id;

    // Fetch detailed information about the selected breed
    fetch(`https://api.thedogapi.com/v1/breeds/${breedId}`, {
        headers: {
            'x-api-key': apiKey
        }
    })
        .then(response => response.json())
        .then(data => {
            // Fetch an image for the selected breed
            fetch(`https://api.thedogapi.com/v1/images/search?limit=1&breed_id=${breedId}&sub_id=${subId}`, {
                headers: {
                    'x-api-key': apiKey
                }
            })
                .then(response => response.json())
                .then(images => {
                    // Get the image for the breed
                    const image = images[0];
                    data.image = image.url;
                    // Display detailed information about the breed
                    dogInfoModal(data);
                })
                .catch(error => {
                    console.error('Chyba při načítání obrázků plemene:', error);
                });
        })
        .catch(error => {
            console.error('Chyba při načítání informací o plemeni:', error);
        });
}

function dogInfoModal(data) {
    const breedInfo = data;

    // Create HTML content for the modal
    const html = `
        <h2 class="info-title">
            <i class="fas fa-dog"></i>
            ${breedInfo.name}
        </h2>
        <div class="info-dog-img">
            <img src="${data.image}" alt="dog">
        </div>
        <div class="info-info">
            <h3><i class="fas fa-smile"></i> Temperament:</h3>
            <p>${breedInfo.temperament || 'N/A'}</p>
            <h3><i class="fas fa-globe"></i> Country Code:</h3>
            <p>${breedInfo.country_code || 'N/A'}</p>
            <h3><i class="fas fa-comment"></i> Description:</h3>
            <p>${breedInfo.description || 'N/A'}</p>
            <h3><i class="fas fa-hourglass-end"></i> Life Span:</h3>
            <p>${breedInfo.life_span || 'N/A'}</p>
        </div>
    `;

    // Set the HTML content for the dog details container
    dogDetailsContent.innerHTML = html;

    // Show the modal
    const modal = document.querySelector('.dog-details');
    modal.style.display = 'block';

    // Add an event listener to the close button to hide the modal
    const closeButton = document.getElementById('info-close-btn');

    // Check if the event listener is already bound
    if (!closeButton.hasEventListener) {
        closeButton.hasEventListener = true; // Mark as bound
        closeButton.addEventListener('click', function () {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto'; // Enable scrolling on the body
        });
    }
    closeButton.addEventListener('click', function () {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto'; // Enable scrolling on the body
    });

    // Prevent scrolling when the modal is open
}

// Load favorites from local storage
const favorites = loadFavorites();

// Function to load favorites from local storage
function loadFavorites() {
    const favoritesJSON = localStorage.getItem('favorites');
    return favoritesJSON ? JSON.parse(favoritesJSON) : [];
}

// Function to save favorites to local storage
function saveFavorites() {
    localStorage.setItem('favorites', JSON.stringify(favorites));
}

// Adjustments to addToFavorites function
function addToFavorites(breed) {
    const breedId = breed.id;
    const imageUrl = breed.image.url || '';

    const existingFavoriteIndex = favorites.findIndex(fav => fav.breeds && fav.breeds.length > 0 && fav.breeds[0].id === breedId);

    console.log('Adding to favorites:', breedId, existingFavoriteIndex);

    if (existingFavoriteIndex === -1) {
        // Add the breed to favorites
        const breedInfo = {
            id: breedId,
            name: breed.name || 'N/A',
        };

        favorites.push({ url: imageUrl, breeds: [breedInfo] });
        saveFavorites();
        updateFavoritesDisplay();

        // Display a message (you can customize this part)
        alert('This breed has been added to your favorites.');
    } else {
        alert('This breed is already in your favorites.');
    }
}


// Function to remove a dog image from favorites
function removeFromFavorites(imageId) {
    const index = favorites.findIndex(fav => fav.breeds && fav.breeds.length > 0 && fav.breeds[0].id === imageId);
    if (index !== -1) {
        favorites.splice(index, 1);
        saveFavorites();
        updateFavoritesDisplay();
    }
}
function updateFavoritesDisplay() {
    const favoritesContainer = document.getElementById('favorites');
    favoritesContainer.innerHTML = '';

    // Iterate through each favorite image
    favorites.forEach(favorite => {
        // Create HTML elements to display the favorite image
        const resultContainer = document.createElement('div');
        resultContainer.classList.add('dog-item');

        const dogImage = document.createElement('div');
        const imgElement = document.createElement('img');
        imgElement.src = favorite.url;
        dogImage.classList.add('dogImage');
        dogImage.appendChild(imgElement);

        const dogNameContainer = document.createElement('div');
        dogNameContainer.classList.add('dogName');

        if (favorite.breeds && favorite.breeds.length > 0) {
            const breedNameElem = document.createElement('h3');
            breedNameElem.textContent = favorite.breeds[0].name;

            const infoButton = document.createElement('button');
            infoButton.innerHTML = '<i class="fas fa-info-circle"></i>';
            infoButton.classList.add('infoButton');
            infoButton.addEventListener('click', (e) => {
                e.preventDefault();
                getDogInfoFromFavorites(favorite.breeds[0].id);
            });

            const removeButton = document.createElement('button');
            removeButton.innerHTML = '<i class="fa fa-trash"></i>';
            removeButton.classList.add('removeButton');
            removeButton.onclick = () => removeFromFavorites(favorite.breeds[0].id);

            dogNameContainer.appendChild(breedNameElem);
            dogNameContainer.appendChild(infoButton);
            dogNameContainer.appendChild(removeButton);

            // Disable the infoButton if needed
            if (favorite.infoButtonDisabled) {
                infoButton.disabled = true;
            }

            // Disable the removeButton if needed
            if (favorite.removeButtonDisabled) {
                removeButton.disabled = true;
            }
        } else {
            const errorElem = document.createElement('p');
            errorElem.textContent = 'Error: Breed information not available';

            dogNameContainer.appendChild(errorElem);
        }

        resultContainer.appendChild(dogImage);
        resultContainer.appendChild(dogNameContainer);
        favoritesContainer.appendChild(resultContainer);
    });
}

// Function to get detailed information about a favorite dog image
function getDogInfoFromFavorites(imageId) {
    const favorite = favorites.find(fav => fav.breeds && fav.breeds.length > 0 && fav.breeds[0].id === imageId);

    if (favorite) {
        const breedId = favorite.breeds[0].id;

        // Fetch detailed information about the favorite dog breed
        fetch(`https://api.thedogapi.com/v1/breeds/${breedId}`, {
            headers: {
                'x-api-key': apiKey
            }
        })
            .then(response => response.json())
            .then(data => {
                data.image = favorite.url;
                // Display detailed information about the favorite breed
                dogInfoModal(data);
            })
            .catch(error => {
                console.error('Chyba při načítání informací o plemeni:', error);
            });
    }
}


// Initial display of favorite dog images
updateFavoritesDisplay();
