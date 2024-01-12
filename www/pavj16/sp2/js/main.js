function getWeather() {
    const apiKey = '8185ce8e6b8243f31ce12431e64a6c85';
    const city = document.getElementById('city').value;

    if (!city) {
        alert('Please enter a city');
        return;
    }

    const currentWeatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
    const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`;

    spinner.style.display = 'block';

    fetch(currentWeatherUrl)
        .then(response => response.json())
        .then(data => {
            spinner.style.display = 'none';
            displayWeather(data);
        })
        .catch(error => {
            spinner.style.display = 'none';
            console.error('Error fetching current weather data:', error);
            alert('Error fetching current weather data. Please try again.');
        });

    fetch(forecastUrl)
        .then(response => response.json())
        .then(data => {
            displayHourlyForecast(data.list);
            getFiveDayForecast(data.list); // Předáváme data přímo do funkce
        })
        .catch(error => {
            console.error('Error fetching hourly forecast data:', error);
            alert('Error fetching hourly forecast data. Please try again.');
        });        
}

function getFiveDayForecast(forecastData) {
    const dailyData = [];
    for (let i = 0; i < forecastData.length; i += 8) {
        dailyData.push(forecastData[i]);
    }
    displayFiveDayForecast(dailyData);
}

let myChart;
function displayFiveDayForecast(dailyData) {
    const forecastDiv = document.getElementById('five-day-forecast'); 
    forecastDiv.innerHTML = '';

    dailyData.forEach(day => {
        const dayDiv = document.createElement('div');
        dayDiv.style.display = 'flex';
        dayDiv.style.flexDirection = 'column';
        dayDiv.style.alignItems = 'center';

        const tempInCelsius = day.main.temp; // No need to convert from Kelvin
        const description = day.weather[0].description;
        const iconCode = day.weather[0].icon;
        const iconUrl = `https://openweathermap.org/img/wn/${iconCode}@4x.png`;

        const iconImg = document.createElement('img');
        iconImg.src = iconUrl;
        iconImg.style.width = '50px';
        iconImg.style.height = '50px';
        
        const date = new Date(day.dt_txt);
        const dayOfWeek = date.toLocaleDateString('en-US', { weekday: 'short' });
        const dayText = document.createElement('span');
        dayText.textContent = `${dayOfWeek}:`;
        const tempText = document.createElement('span');
        tempText.textContent = `${tempInCelsius.toFixed(0)}°C`;
        dayDiv.appendChild(dayText);
        dayDiv.appendChild(iconImg);
        dayDiv.appendChild(tempText);
        forecastDiv.appendChild(dayDiv);
    });

    const temperatures = dailyData.map(day => day.main.temp); // Temperatures are already in °C
    const days = dailyData.map(day => new Date(day.dt_txt).toLocaleDateString('en-US', { weekday: 'short' }));

    const ctx = document.getElementById('myChart').getContext('2d');
    if (myChart) {
        myChart.destroy();
    }
    myChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: days,
            datasets: [{
                label: 'Temperature in °C',
                data: temperatures,
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
}

document.getElementById('city').addEventListener('keyup', function(event) {
    if (event.key === 'Enter') {
        getWeather(); // Call your function to get the weather
    }
});
function displayWeather(data) {
    const tempDivInfo = document.getElementById('temp-div');
    const weatherInfoDiv = document.getElementById('weather-info');
    const weatherIcon = document.getElementById('weather-icon');

    if (data.cod === '404') {
        weatherInfoDiv.innerHTML = `<p>${data.message}</p>`;
    } else {
        const cityName = data.name;
        const temperature =  data.main.temp;
        const description = data.weather[0].description;
        const iconCode = data.weather[0].icon;
        const iconUrl = `https://openweathermap.org/img/wn/${iconCode}@4x.png`;

        tempDivInfo.innerHTML = `<p>${temperature.toFixed(0)}°C</p>`;
        weatherInfoDiv.innerHTML = `<p>${cityName}</p><p>${description}</p>`;
        weatherIcon.src = iconUrl;
        weatherIcon.alt = description;

        showImage();
    }
}

// Create a global variable for the chart
var chart;

function displayHourlyForecast(hourlyData) {
    const hourlyForecastDiv = document.getElementById('hourly-forecast');
    const forecastChartCanvas = document.getElementById('forecastChart');
    forecastChartCanvas.style.backgroundColor = 'white'; 
    const next24Hours = hourlyData.slice(0, 8); // Display the next 24 hours (3-hour intervals)

    
    let hourlyItemHTML = '';

    next24Hours.forEach(item => {
        const dateTime = new Date(item.dt * 1000); // Convert timestamp to milliseconds
        const hour = dateTime.getHours();
        const temperature = Math.round(item.main.temp); // Temperature is already in Celsius
        const iconCode = item.weather[0].icon;
        const iconUrl = `https://openweathermap.org/img/wn/${iconCode}.png`;

        hourlyItemHTML += `
            <div class="hourly-item">
                <span>${hour}:00</span>
                <img src="${iconUrl}" alt="Hourly Weather Icon">
                <span>${temperature}°C</span>
            </div>
        `;
    });
    hourlyForecastDiv.innerHTML = hourlyItemHTML;
    const labels = next24Hours.map(item => new Date(item.dt * 1000).toLocaleTimeString());
    const data = next24Hours.map(item => Math.round(item.main.temp)); // Temperature is already in Celsius

    // If the chart does not exist, create it
    if (!chart) {
        chart = new Chart(forecastChartCanvas, {
            type: 'line',
            data: {
                labels: labels,
                datasets: [{
                    label: 'Temperature',
                    data: data,
                    fill: true,
                    backgroundColor: 'rgba(75, 192, 192, 0.1)', // Set the background color
                    borderColor: 'rgb(75, 192, 192)', // Set the line color
                    borderWidth: 2, // Set the line width
                    pointBackgroundColor: 'rgb(75, 192, 192)', // Set the point color
                    pointBorderColor: '#fff', // Set the point border color
                    tension: 0.1
                }]
            },
            options: {
                responsive: true,
                scales: {
                    x: {
                        display: true,
                        title: {
                            display: true,
                            text: 'Time'
                        }
                    },
                    y: {
                        display: true,
                        title: {
                            display: true,
                            text: 'Temperature (°C)'
                        }
        
                    }
                },
                plugins: {
                    legend: {
                        labels: {
                            color: 'black'
                        }
                    }
                },
                layout: {
                    padding: {
                        left: 10,
                        right: 10,
                        top: 10,
                        bottom: 10
                    }
                },
                backgroundColor: 'white'
            }
        });
    } else {
        // If the chart already exists, update its data
        chart.data.labels = labels;
        chart.data.datasets[0].data = data;
        chart.update();
    }
}

function processWeatherData(dailyData) {
    // Zpracování dat pro zobrazení předpovědi
    displayFiveDayForecast(dailyData);

    // Příprava dat pro graf
    const temperatures = dailyData.map(day => day.main.temp);
    const days = dailyData.map(day => new Date(day.dt_txt).toLocaleDateString('cs-CZ', { weekday: 'short' })); // Dny

    // Vytvoření grafu
    const ctx = document.getElementById('myChart').getContext('2d');
    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: days,
            datasets: [{
                label: 'Teplota v °C',
                data: temperatures,
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
}
function showImage() {
    const weatherIcon = document.getElementById('weather-icon');
    weatherIcon.style.display = 'block'; // Make the image visible once it's loaded
}
let favorites = JSON.parse(localStorage.getItem('favorites')) || [];
favorites = favorites.map(city => city.toLowerCase()); // Convert all city names to lowercase
let cityinput = document.getElementById('city')

document.getElementById('add-to-favorites').addEventListener('click', function() {
    const city = cityinput.value.toLowerCase(); // Convert the city name to lowercase
    if (city && !favorites.includes(city)) {
        favorites.push(city);
        localStorage.setItem('favorites', JSON.stringify(favorites));
        displayFavorites();
    }
});

function displayFavorites() {
    const favoritesDiv = document.getElementById('favorites');
    let favoritesHTML = '';

    favorites.forEach(city => {
        favoritesHTML += `
            <div class="favorite-city" style="cursor: pointer;" data-city="${city}">
                ${city}
                <button class="remove-button"></button>
            </div>
        `;
    });

    favoritesDiv.innerHTML = favoritesHTML;

    // Add event listeners to the new elements
    const cityDivs = favoritesDiv.getElementsByClassName('favorite-city');
    Array.from(cityDivs).forEach(cityDiv => {
        cityDiv.addEventListener('click', function() {
            document.getElementById('city').value = this.dataset.city;
            getWeather();
        });

        const removeButton = cityDiv.getElementsByClassName('remove-button')[0];
        removeButton.addEventListener('click', function(event) {
            event.stopPropagation(); // Prevent triggering the click event on the cityDiv
            favorites = favorites.filter(favoriteCity => favoriteCity !== cityDiv.dataset.city.toLowerCase());
            localStorage.setItem('favorites', JSON.stringify(favorites));
            displayFavorites();
        });
    });
}

displayFavorites();
const spinner = document.getElementById('spinner');

document.getElementById('search-button').addEventListener('click', getWeather);




//<input id="my-input">

