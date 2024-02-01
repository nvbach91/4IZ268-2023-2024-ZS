// Event listener to execute the getWeather function when the DOM is fully loaded
document.addEventListener('DOMContentLoaded', getWeather);

// OpenWeatherMap API key
const apiKey = '5267dd9a85d394226df9c47fe6ff176a';

const refreshButton = document.getElementById('refreshButton');
    refreshButton.addEventListener('click', function () {
        NProgress.start(); // Show loading spinner
        fetchWeatherByBrowserLocation();
    });

// DOM elements
const overlay = document.getElementById('overlay');
const locationForm = document.getElementById('locationForm');
const locationInput = document.getElementById('locationInput');

// Function to initiate the weather application
function getWeather() {
    NProgress.start(); // Show loading spinner 

    // Add event listener for form submission
    locationForm.addEventListener('submit', handleFormSubmit);


    // Automatically fetch weather based on the browser's location by default
    fetchWeatherByBrowserLocation();
}

// Event listener for form submission
locationForm.addEventListener('submit', function(event) {
    event.preventDefault();
    const enteredLocation = locationInput.value.trim();

    if (enteredLocation !== '') {
        // Fetch weather and 5-day forecast for the entered location
        fetchWeatherByLocation(enteredLocation);
        fetch5DayForecastByLocation(enteredLocation);
    }
});

// Function to handle form submission
function handleFormSubmit(event) {
    event.preventDefault();
    const enteredLocation = locationInput.value.trim();

    if (enteredLocation !== '') {
        // Fetch weather for the entered location
        fetchWeatherByLocation(enteredLocation);
    } else {
        // Handle case where no location is entered
        NProgress.done(); // Hide loading spinner
        Swal.fire({
            icon: 'error',
            title: 'Location cannot be empty.'
        });
    }
}

// Function to fetch weather data by location
function fetchWeatherByLocation(location) {
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(location)}&appid=${apiKey}`;
    NProgress.start(); // Show loading spinner
    fetchWeather(apiUrl);
}

// Function to fetch weather data based on browser's location
function fetchWeatherByBrowserLocation() {
    getCurrentLocationUrl()
        .then(apiUrl => {
            // Fetch weather data using the obtained API URL
            fetchWeather(apiUrl);
        })
        .catch(error => {
            console.error('Error:', error);
            NProgress.done(); // Hide loading spinner
            // Display error message to the user
            Swal.fire({
                icon: 'error',
                title: 'Error fetching weather data from the browser location. Please try again.'
            });
        })
        .finally(() => {
            overlay.style.display = 'none'; // Hide overlay
        });
}

// Function to get the API URL for the current browser's location
function getCurrentLocationUrl() {
    return new Promise((resolve, reject) => {
        if ("geolocation" in navigator) {
            // Get the current position using the browser's geolocation
            navigator.geolocation.getCurrentPosition(
                position => {
                    const { latitude, longitude } = position.coords;
                    const apiUrlLatLon = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}`;
                    resolve(apiUrlLatLon);
                },
                error => {
                    console.error('Error getting geolocation:', error);
                    reject("Geolocation error");
                }
            );
        } else {
        }
    })
    .finally(() => {
        overlay.style.display = 'none'; // Hide overlay
    });
}

// Function to fetch weather data from the provided API URL
function fetchWeather(apiUrl) {
    fetch(apiUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            // Display the fetched weather data
            displayWeather(data);
        })
        .catch(error => {
            console.error('Error fetching weather data:', error);
            NProgress.done(); // Hide loading spinner
            // Display error message to the user
            Swal.fire({
                icon: 'error',
                title: 'Error fetching weather data from server. Please try again.'
            });
        })
        .finally(() => {
            overlay.style.display = 'none'; // Hide overlay to use the app even if there is an error with automatic location
        });
}

// Function to display weather information on the UI
function displayWeather(data) {
    // DOM elements for weather information
    const locationElement = document.getElementById('location');
    const temperatureElement = document.getElementById('temperature');
    const descriptionElement = document.getElementById('description');
    const humidityElement = document.getElementById('humidity');
    const precipitationElement = document.getElementById('precipitation');
    const pressureElement = document.getElementById('pressure');
    const windElement = document.getElementById('wind');
    const weatherIconElement = document.getElementById('currentWeatherIcon');

    // Extracted data from the API response
    const location = data.name + ', ' + data.sys.country;
    const temperature = (data.main.temp - 273.15).toFixed(2) + '°C';
    const description = data.weather[0].description;
    const humidity = data.main.humidity + '%';
    let precipitation = '0 mm'; // Assume no precipitation initially

    // Check for rain or snow data in the API response
    if ('rain' in data && '1h' in data.rain) {
        precipitation = data.rain['1h'] + ' mm';
    } else if ('snow' in data && '1h' in data.snow) {
        precipitation = data.snow['1h'] + ' mm';
    }

    const pressure = data.main.pressure + ' hPa';
    const windSpeed = data.wind.speed + ' m/s';
    const weatherIconClass = getWeatherIconClassFromId(data.weather[0].id);

    // Update UI elements with weather information
    locationElement.textContent = `Location: ${location}`;
    temperatureElement.textContent = `Temperature: ${temperature}`;
    descriptionElement.textContent = `Description: ${description}`;
    humidityElement.textContent = `Humidity: ${humidity}`;
    precipitationElement.textContent = `Precipitation: ${precipitation}`;
    pressureElement.textContent = `Pressure: ${pressure}`;
    windElement.textContent = `Wind Speed: ${windSpeed}`;
    weatherIconElement.className = `weather-icon wi ${weatherIconClass}`;

    // Optionally, show the weather information container
    document.getElementById('weatherInfo').style.display = 'block';

    // Fetch 5-day forecast for the location
    fetch5DayForecastByLocation(location);
}

// Declare a global variable to store the chart instance
let forecastChart = null;

// Function to display the forecast chart on the UI
function displayForecastChart(data) {
    const ctx = document.getElementById('forecastChart').getContext('2d');

    // Destroy the existing chart instance if it exists
    if (forecastChart) {
        forecastChart.destroy();
    }

    // Extract temperature and timestamp data for the chart
    const temperatures = data.list.map(item => (item.main.temp - 273.15).toFixed(2));
    const timestamps = data.list.map(item => item.dt * 1000); // Timestamps in milliseconds

    // Format timestamps as dates and times
    const datesAndTimes = timestamps.map(timestamp => {
        const date = new Date(timestamp);
        return `${date.toLocaleDateString()} ${date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;
    });

    // Create a new Chart.js instance for the forecast chart
    forecastChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: datesAndTimes,
            datasets: [{
                label: 'Temperature (°C)',
                data: temperatures,
                fill: true,
                borderColor: 'rgba(33, 150, 243, 1)',
                borderWidth: 2,
                pointRadius: 5,
                pointHoverRadius: 7,
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                y: {
                    beginAtZero: false,
                    grid: {
                        color: 'rgba(0, 0, 0, 0.1)'
                    },
                    ticks: {
                        font: {
                            size: 12
                        }
                    }
                },
                x: {
                    grid: {
                        color: 'rgba(0, 0, 0, 0)'
                    },
                    ticks: {
                        font: {
                            size: 12
                        }
                    },
                    display: false,
                }
            },
            plugins: {
                legend: {
                    display: false,
                },
                tooltip: {
                    backgroundColor: 'rgba(0, 0, 0, 0.8)',
                    titleColor: '#fff',
                    bodyColor: '#fff',
                    titleFont: {
                        size: 14,
                        weight: 'bold'
                    }
                }
            }
        }
    });
}

// Function to fetch 5-day forecast data by location
function fetch5DayForecastByLocation(location) {
    const apiUrlPrediction = `https://api.openweathermap.org/data/2.5/forecast?q=${encodeURIComponent(location)}&cnt=40&appid=${apiKey}`;

    // Fetch 5-day forecast data
    fetch(apiUrlPrediction)
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            // Display forecast chart and weather icons
            displayForecastChart(data);
            displayWeatherIcons(data);
        })
        .catch(error => {
            console.error('Error fetching forecast data:', error);
            NProgress.done(); // Hide loading spinner
            // Display error message to the user
            Swal.fire({
                icon: 'error',
                title: 'Error fetching forecast data. Please try again.'
            });
        });
}

// Function to display weather icons for the 5-day forecast
function displayWeatherIcons(data) {
    const weatherIconsContainer = document.getElementById('weatherIconsContainer');
    weatherIconsContainer.innerHTML = ''; // Clear previous content

    // Group forecast data by day
    const dailyData = groupByDay(data.list);

    // Filter out today's weather data
    const futureDays = Object.values(dailyData).filter(item => {
        const date = new Date(item[0].dt * 1000);
        const today = new Date();
        return date.getDate() !== today.getDate() || date.getMonth() !== today.getMonth() || date.getFullYear() !== today.getFullYear();
    });

    // Generate HTML for weather icons
    const icons = futureDays.map(item => {
        const weatherId = item[0].weather[0].id;
        const iconClass = getWeatherIconClassFromId(weatherId);
        const date = new Date(item[0].dt * 1000);
        const dayOfWeek = getDayOfWeek(date.getDay());
        const maxTemperature = Math.max(...item.map(i => i.main.temp_max - 273.15)).toFixed(2);
        const minTemperature = Math.min(...item.map(i => i.main.temp_min - 273.15)).toFixed(2);
        const averageTemperature = ((parseFloat(maxTemperature) + parseFloat(minTemperature)) / 2).toFixed(2);

        return `
            <div class="weather-icon-container">
                <i class="weather-icon wi ${iconClass}"></i>
                <div class="weather-label">
                    <div class="date">${date.toLocaleDateString()}</div>
                    <div class="day">${dayOfWeek}</div>
                    <div class="temperature">
                        <span class="temperature-max">${maxTemperature}°C</span>
                        <span class="temperature-separator"> / </span>
                        <span class="temperature-min">${minTemperature}°C</span>
                    </div>
                    <div class="temperature-average">Průměr: ${averageTemperature}°C</div>
                </div>
            </div>
        `;
    });

    // Update weather icons container with generated HTML
    weatherIconsContainer.innerHTML = icons.join('');
    NProgress.done(); // Hide loading spinner
}

// Helper function to group data by day
function groupByDay(data) {
    return data.reduce((result, item) => {
        const date = new Date(item.dt * 1000).toLocaleDateString();
        if (!result[date]) {
            result[date] = [];
        }
        result[date].push(item);
        return result;
    }, {});
}

// Helper function to get the day of the week from the day index
function getDayOfWeek(dayIndex) {
    const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    return daysOfWeek[dayIndex];
}

// Helper function to get the weather icon class from the weather ID
function getWeatherIconClassFromId(weatherId) {
    if (weatherId >= 200 && weatherId < 300) {
        return 'wi-thunderstorm';
    } else if (weatherId >= 300 && weatherId < 500) {
        return 'wi-showers';
    } else if (weatherId >= 500 && weatherId < 600) {
        return 'wi-rain';
    } else if (weatherId >= 600 && weatherId < 700) {
        return 'wi-snow';
    } else if (weatherId >= 700 && weatherId < 800) {
        return 'wi-fog';
    } else if (weatherId === 800) {
        return 'wi-day-sunny';
    } else if (weatherId === 801) {
        return 'wi-day-cloudy';
    } else if (weatherId > 801 && weatherId < 900) {
        return 'wi-cloudy';
    }

    return 'wi-na'; // 'wi-na' for not available icon
}
