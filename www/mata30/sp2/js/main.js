const container = document.querySelector('.container');
const search = document.querySelector('.search-box button');
const refreshButton = document.getElementById('refreshButton');
const saveButton = document.getElementById('saveButton');
const weatherBox = document.querySelector('.weather-box');
const weatherDetails = document.querySelector('.weather-details');
const error404 = document.querySelector('.not-found');
const inputField = document.querySelector('.search-box input');
const image = document.querySelector('.weather-box img');
const imageBase = './images/';
this.currentLocation = JSON.parse(localStorage.getItem('currentLocation')) || null;
this.weather = null;

// Function to save the last searched city to localStorage
function saveLastSearchedCity(city) {
  localStorage.setItem('lastSearchedCity', city);
}

// Function to retrieve the last searched city from localStorage
function getLastSearchedCity() {
  return localStorage.getItem('lastSearchedCity');
};

// Event listener for the search button with my API key
search.addEventListener('click', () => {
  const APIKey = '96647aa3e0a752b49fc23e2fdf5aaefe';
  const city = inputField.value;

  if (city === '') return;

  fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${APIKey}`)
    .then(response => response.json())
    .then(json => {
      if (json.cod === 404) {
        container.style.height = '500px';
        weatherBox.style.display = 'none';
        weatherDetails.style.display = 'none';
        error404.style.display = 'block';
        error404.classList.add('slideIn');
        return;
      } //actions for no city found 

      error404.style.display = 'none';
      error404.classList.remove('slideIn'); //animation for 404 error

      const temperature = document.querySelector('.weather-box .temperature');
      const description = document.querySelector('.weather-box .description');
      const humidity = document.querySelector('.weather-details .humidity span');
      const wind = document.querySelector('.weather-details .wind span');

      switch (json.weather[0].main) {
        case 'Clear':
          image.src = `${imageBase}clear.png`;
          break;
        case 'Rain':
          image.src = `${imageBase}rain.png`;
          break;
        case 'Snow':
          image.src = `${imageBase}snow.png`;
          break;
        case 'Clouds':
          image.src = `${imageBase}clouds.png`;
          break;
        case 'Haze':
          image.src = `${imageBase}haze.png`;
          break;
        case 'Mist':
          image.src = `${imageBase}mist.png`;
          break;
        case 'Thunderstorm':
          image.src = `${imageBase}thunderstorm.png`;
          break;
        default:
          image.src = '';
      }

      temperature.innerHTML = `${Math.round(json.main.temp)}<span>°C</span>`;
      description.innerHTML = `${json.weather[0].description}`;
      humidity.innerHTML = `${json.main.humidity}%`;
      wind.innerHTML = `${parseInt(json.wind.speed)} Km/h`;

      weatherBox.style.display = '';
      weatherDetails.style.display = '';
      weatherBox.classList.add('slideIn');
      weatherDetails.classList.add('slideIn');
      container.style.height = '800px';
      container.style.width = '500px';

      // part for saving the last searched city to localStorage
      saveLastSearchedCity(city);
      // console.log('inputField :', json);
    });
});

// part for retrievnig the last searched city when the page loads
window.addEventListener('load', () => {
  const lastSearchedCity = getLastSearchedCity();

  if (lastSearchedCity) {
    const inputField = document.querySelector('.search-box input');
    inputField.value = lastSearchedCity;
    search.click(); // this should trigger search for the last searched city on page load
  }
});

function refreshAndSearch() {
  const lastSearchedCity = getLastSearchedCity();

  if (lastSearchedCity) {
    inputField.value = lastSearchedCity;
    search.click(); // Trigger search for the last searched city
  }
};
// click for the refresh button
refreshButton.addEventListener('click', refreshAndSearch);

//geolokace

if (navigator.geolocation) {
  navigator.geolocation.getCurrentPosition(getPosSuccess, getPosErr);
} else {
  alert('geolocation not available.');
}

// getCurrentPosition: Successful return
function getPosSuccess(pos) {
  let geoLat = pos.coords.latitude.toFixed(5);
  let geoLng = pos.coords.longitude.toFixed(5);
  let city = inputField.value;

  const APIKey = '96647aa3e0a752b49fc23e2fdf5aaefe';

  fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${geoLat}&lon=${geoLng}&units=metric&appid=${APIKey}`)
    .then(response => response.json())
    .then(json => {
      displayWeatherData(json);
      inputField.value = `${json.name}`
    })
    .catch(error => {
      console.error('Error loading weather data:', error);
    });

  function displayWeatherData(json) {
    if (json.cod === 404) {
      container.style.height = '500px';
      weatherBox.style.display = 'none';
      weatherDetails.style.display = 'none';
      error404.style.display = 'block';

      return;
    }

    const temperature = document.querySelector('.weather-box .temperature');
    const description = document.querySelector('.weather-box .description');
    const humidity = document.querySelector('.weather-details .humidity span');
    const wind = document.querySelector('.weather-details .wind span');


    switch (json.weather[0].main) {
      case 'Clear':
        image.src = `${imageBase}clear.png`;
        break;
      case 'Rain':
        image.src = `${imageBase}rain.png`;
        break;
      case 'Snow':
        image.src = `${imageBase}snow.png`;
        break;
      case 'Clouds':
        image.src = `${imageBase}clouds.png`;
        break;
      case 'Haze':
        image.src = `${imageBase}haze.png`;
        break;
      case 'Mist':
        image.src = `${imageBase}mist.png`;
        break;
      case 'Thunderstorm':
        image.src = `${imageBase}thunderstorm.png`;
        break;
      default:
        image.src = '';
    }

    temperature.innerHTML = `${Math.round(json.main.temp)}<span>°C</span>`;
    description.innerHTML = `${json.weather[0].description}`;
    humidity.innerHTML = `${json.main.humidity}%`;
    wind.innerHTML = `${parseInt(json.wind.speed)} Km/h`;

    weatherBox.style.display = '';
    weatherDetails.style.display = '';
    weatherBox.classList.add('slideIn');
    weatherDetails.classList.add('slideIn');
    container.style.height = '800px';
    container.style.width = '500px';

    // console.log('inputField :', json);

  }
};

// getCurrentPosition: Error returned
function getPosErr(err) {
  switch (err.code) {
    case err.PERMISSION_DENIED:
      alert("User denied the request for Geolocation.");
      break;
    case err.POSITION_UNAVAILABLE:
      alert("Location information is unavailable.");
      break;
    default:
      alert("An unknown error occurred.");
  }
}

document.getElementById("forma").addEventListener("submit", function (event) {
  event.preventDefault();
  search.click();
});


