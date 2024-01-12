const container = document.querySelector('.container');
const search = document.querySelector('.search-box button');
const weatherBox = document.querySelector('.weather-box');
const weatherDetails = document.querySelector('.weather-details');
const error404 = document.querySelector('.not-found');
const imageBase = './images/';

// Function to save the last searched city to localStorage
function saveLastSearchedCity(city) {
  localStorage.setItem('lastSearchedCity', city);
}

// Function to retrieve the last searched city from localStorage
function getLastSearchedCity() {
  return localStorage.getItem('lastSearchedCity');
}

// Event listener for the search button with my API key
search.addEventListener('click', () => {
  const APIKey = '96647aa3e0a752b49fc23e2fdf5aaefe';
  const inputField = document.querySelector('.search-box input');
  const city = inputField.value;

  if (city === '') return;

  fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${APIKey}`)
    .then(response => response.json())
    .then(json => {
      if (json.cod === '404') {
        container.style.height = '500px';
        weatherBox.style.display = 'none';
        weatherDetails.style.display = 'none';
        error404.style.display = 'block';
        error404.classList.add('slideIn');
        return;
      }  //actions for no city found 

      error404.style.display = 'none';
      error404.classList.remove('slideIn'); //animation for 404 error

      const image = document.querySelector('.weather-box img');
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
        default:
          image.src = '';
      }

      temperature.innerHTML = `${parseInt(json.main.temp)}<span>°C</span>`;
      description.innerHTML = `${json.weather[0].description}`;
      humidity.innerHTML = `${json.main.humidity}%`;
      wind.innerHTML = `${parseInt(json.wind.speed)} Km/h`;

      weatherBox.style.display = '';
      weatherDetails.style.display = '';
      weatherBox.classList.add('slideIn');
      weatherDetails.classList.add('slideIn');
      container.style.height = '800px';
      container.style.width = '500px';

      // part for saaving the last searched city to localStorage
      saveLastSearchedCity(city);
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
