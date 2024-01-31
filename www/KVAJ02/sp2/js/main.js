// Select the loader element by its ID
const loader = document.getElementById('loader');

// Dog API key and subId for requests
const apiKey = 'live_yHlLVvWZs1dl5WbsRWSehG9XjIWfiWjfvbaPXAQC16Cz7Br8gh6C6hbx3VHzJGKW';
const subId = 'user-123';

// Select the container for dog details content
const dogDetailsContent = document.querySelector('.dog-details-content');

// Add an event listener to the search form to handle the submit event
document.getElementById('searchForm').addEventListener('submit', function (event) {
    event.preventDefault();
    searchBreeds();
});

// Function to perform a search for dog breeds
function searchBreeds() {
    // Get the search query from the input field and trim any whitespace
    const searchQuery = document.getElementById('searchInput').value.trim();

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
            // Hide the loader when the fetch request is completed
            loader.style.display = 'none';
        });
}

// Function to display search results for dog breeds
function displaySearchResults(breeds) {
    const searchResultsContainer = document.getElementById('searchResults');
    searchResultsContainer.innerHTML = '';

    const uniqueBreeds = {};

    // Iterate through each breed
    breeds.forEach(breed => {
        if (!uniqueBreeds[breed.id]) {
            uniqueBreeds[breed.id] = true;

            // Show the loader while fetching images for each breed
            loader.style.display = 'block';

            // Fetch an image for the current breed
            fetch(`https://api.thedogapi.com/v1/images/search?limit=1&breed_id=${breed.id}&sub_id=${subId}`, {
                headers: {
                    'x-api-key': apiKey
                }
            })
                .then(response => response.json())
                .then(images => {
                    // Get the first image for the breed
                    const image = images[0];

                    // Create HTML elements to display the breed information
                    const resultContainer = document.createElement('div');
                    resultContainer.classList.add('dog-item');
                    resultContainer.dataset.id = breed.id;

                    const dogImage = document.createElement('div');
                    const imgElement = document.createElement('img');
                    imgElement.src = image.url;
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
                    favoriteButton.addEventListener('click', () => addToFavorites(image));

                    dogNameContainer.appendChild(breedNameElem);
                    dogNameContainer.appendChild(infoButton);
                    dogNameContainer.appendChild(favoriteButton);

                    resultContainer.appendChild(dogImage);
                    resultContainer.appendChild(dogNameContainer);
                    searchResultsContainer.appendChild(resultContainer);

                })
                .catch(error => {
                    console.error('Chyba při načítání obrázků plemene:', error);
                })
                .finally(() => {
                    // Hide the loader when the fetch request for each breed is completed
                    loader.style.display = 'none';
                });
        }
    });
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

// Function to display detailed information about a dog breed in a modal
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
            <p>${breedInfo.temperament}</p>
            <h3><i class="fas fa-globe"></i> Country Code:</h3>
            <p>${breedInfo.origin}</p>
            <h3><i class="fas fa-comment"></i> Description:</h3>
            <p>${breedInfo.description}</p>
            <h3><i class="fas fa-hourglass-end"></i> Life Span:</h3>
            <p>${breedInfo.life_span}</p>
        </div>
    `;

    // Set the HTML content for the dog details container
    dogDetailsContent.innerHTML = html;

    // Show the modal
    const modal = document.querySelector('.dog-details');
    modal.style.display = 'block';

    // Add an event listener to the close button to hide the modal
    const closeButton = document.getElementById('info-close-btn');
    closeButton.addEventListener('click', function () {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto'; // Enable scrolling on the body
    });

    // Prevent scrolling when the modal is open
    document.body.style.overflow = 'hidden';
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

// Function to add a dog image to favorites
function addToFavorites(image) {
    if (!favorites.some(fav => fav.id === image.id)) {
        favorites.push(image);
        saveFavorites();
        updateFavoritesDisplay();
    }
}

// Function to remove a dog image from favorites
function removeFromFavorites(imageId) {
    const index = favorites.findIndex(fav => fav.id === imageId);
    if (index !== -1) {
        favorites.splice(index, 1);
        saveFavorites();
        updateFavoritesDisplay();
    }
}

// Function to update the display of favorite dog images
function updateFavoritesDisplay() {
    const favoritesContainer = document.getElementById('favorites');
    favoritesContainer.innerHTML = '';

    // Iterate through each favorite image
    favorites.forEach(image => {
        // Create HTML elements to display the favorite image
        const resultContainer = document.createElement('div');
        resultContainer.classList.add('dog-item');

        const dogImage = document.createElement('div');
        const imgElement = document.createElement('img');
        imgElement.src = image.url;
        dogImage.classList.add('dogImage');
        dogImage.appendChild(imgElement);

        const dogNameContainer = document.createElement('div');
        dogNameContainer.classList.add('dogName');

        const breedNameElem = document.createElement('h3');
        breedNameElem.textContent = image.breeds[0].name;

        const infoButton = document.createElement('button');
        infoButton.innerHTML = '<i class="fas fa-info-circle"></i>';
        infoButton.classList.add('infoButton');
        infoButton.addEventListener('click', (e) => {
            e.preventDefault();
            getDogInfoFromFavorites(image.id);
        });

        const removeButton = document.createElement('button');
        removeButton.innerHTML = '<i class="fa fa-trash"></i>';
        removeButton.classList.add('removeButton');
        removeButton.onclick = () => removeFromFavorites(image.id);

        dogNameContainer.appendChild(breedNameElem);
        dogNameContainer.appendChild(infoButton);
        dogNameContainer.appendChild(removeButton);

        resultContainer.appendChild(dogImage);
        resultContainer.appendChild(dogNameContainer);
        favoritesContainer.appendChild(resultContainer);
    });
}

// Function to get detailed information about a favorite dog image
function getDogInfoFromFavorites(imageId) {
    const image = favorites.find(fav => fav.id === imageId);

    if (image) {
        // Fetch detailed information about the favorite dog breed
        fetch(`https://api.thedogapi.com/v1/breeds/${image.breeds[0].id}`, {
            headers: {
                'x-api-key': apiKey
            }
        })
            .then(response => response.json())
            .then(data => {
                data.image = image.url;
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
