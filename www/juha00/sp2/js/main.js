//demo
function displayResults(animeList) {
    const resultsContainer = document.getElementById('animeResults');
    resultsContainer.innerHTML = '';

    if (animeList && animeList.length > 0) {
        animeList.forEach(anime => {
            const animeCard = document.createElement('div');
            animeCard.className = 'anime-card';

            const animeTitle = document.createElement('h2');
            animeTitle.textContent = anime.attributes.canonicalTitle;

            const animeImage = document.createElement('img');
            animeImage.src = anime.attributes.posterImage.medium;
            animeImage.alt = anime.attributes.canonicalTitle;

            const animeSynopsis = document.createElement('p');
            animeSynopsis.textContent = anime.attributes.synopsis || 'No synopsis available.';

            const episodeCount = document.createElement('p');
            episodeCount.textContent = `Episodes: ${anime.attributes.episodeCount || 'Unknown'}`;

            const showType = document.createElement('p');
            showType.textContent = `Type: ${anime.attributes.showType || 'Unknown'}`;

            /*
            const favoriteButton = document.createElement('button');
            favoriteButton.textContent = 'Favorite';
            favoriteButton.onclick = function () {
                addToFavorites(anime.id, animeList);
            };
            */

            animeCard.appendChild(animeTitle);
            animeCard.appendChild(animeImage);
            animeCard.appendChild(animeSynopsis);
            animeCard.appendChild(episodeCount);
            animeCard.appendChild(showType);

            //animeCard.appendChild(favoriteButton);

            resultsContainer.appendChild(animeCard);
        });
    } else {
        resultsContainer.innerHTML = '<p>No results found.</p>';
    }
}

let animeList = [];

function searchAnime() {
    const animeTitle = document.getElementById('animeTitle').value;

    if (animeTitle.trim() !== '') {
        const apiUrl = `https://kitsu.io/api/edge/anime?filter[text]=${animeTitle}`;

        fetch(apiUrl)
            .then(response => response.json())
            .then(data => {
                animeList = data.data;
                displayResults(animeList);
            })
            .catch(error => console.error('Error:', error));
    }
}


function filterAnime() {
    const category = document.getElementById('category').value;
    const maxEpisodes = document.getElementById('maxEpisodes').value;
    const season = document.getElementById('season').value;

    const animeTitle = document.getElementById('animeTitle').value;

    let apiUrl = 'https://kitsu.io/api/edge/anime?';

    if (animeTitle) apiUrl += `filter[text]=${animeTitle}&`;

    if (category) apiUrl += `filter[categories]=${category}&`;

    if (maxEpisodes) apiUrl += `filter[episodeCount]=${maxEpisodes}&`;

    if (season) apiUrl += `filter[season]=${season}&`;

    apiUrl = apiUrl.replace(/&$/, '');

    console.log('API URL:', apiUrl);
    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            const filteredAnime = data.data;
            displayResults(filteredAnime);
        })
        .catch(error => console.error('Error:', error));
}

//function showFavorites()
