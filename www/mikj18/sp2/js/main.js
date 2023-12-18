document.addEventListener('DOMContentLoaded', getWeather);

function getWeather() {
    const locationForm = document.getElementById('locationForm');
    locationForm.addEventListener('submit', handleFormSubmit);

    // Automatically fetch weather based on the browser's location by default
    fetchWeatherByBrowserLocation();
}

function handleFormSubmit(event) {
    event.preventDefault();

    const locationInput = document.getElementById('locationInput').value.trim();

    if (locationInput !== '') {
        fetchWeatherByLocation(locationInput);
    } else {
        alert('Please enter a valid location.');
    }
}

function fetchWeatherByLocation(location) {
    const apiKey = '5267dd9a85d394226df9c47fe6ff176a';
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(location)}&appid=${apiKey}`;

    fetchWeather(apiUrl);
}

function fetchWeatherByBrowserLocation() {
    getCurrentLocationUrl()
        .then(apiUrl => {
            fetchWeather(apiUrl);
        })
        .catch(error => {
            console.error('Error:', error);
            alert('Error fetching weather data from the browser location. Please try again.');
        });
}

function getCurrentLocationUrl() {
    return new Promise((resolve, reject) => {
        if ("geolocation" in navigator) {
            navigator.geolocation.getCurrentPosition(
                position => {
                    const { latitude, longitude } = position.coords;
                    const apiKey = '5267dd9a85d394226df9c47fe6ff176a';
                    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}`;
                    resolve(apiUrl);
                },
                error => {
                    console.error('Error getting geolocation:', error);
                    reject("Geolocation error");
                }
            );
        } else {
            reject("Geolocation is not supported by this browser.");
        }
    });
}

function fetchWeather(apiUrl) {
    fetch(apiUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            displayWeather(data);
        })
        .catch(error => {
            console.error('Error fetching weather data:', error);
            alert('Error fetching weather data. Please try again.');
        });
}

function displayWeather(data) {
    const locationElement = document.getElementById('location');
    const temperatureElement = document.getElementById('temperature');
    const descriptionElement = document.getElementById('description');

    const location = data.name + ', ' + data.sys.country;
    const temperature = (data.main.temp - 273.15).toFixed(2) + '°C';
    const description = data.weather[0].description;

    locationElement.textContent = `Location: ${location}`;
    temperatureElement.textContent = `Temperature: ${temperature}`;
    descriptionElement.textContent = `Description: ${description}`;

    // Optionally, show the weather information container
    document.getElementById('weatherInfo').style.display = 'block';
    fetch5DayForecastByLocation(location);
}

let forecastChart = null; // Declare a global variable to store the chart instance

function displayForecastChart(data) {
    const ctx = document.getElementById('forecastChart').getContext('2d');

    if (forecastChart) {
        forecastChart.destroy();
    }

    const temperatures = data.list.map(item => (item.main.temp - 273.15).toFixed(2));
    const timestamps = data.list.map(item => item.dt * 1000); // Timestamps in milliseconds

    const datesAndTimes = timestamps.map(timestamp => {
        const date = new Date(timestamp);
        return `${date.toLocaleDateString()} ${date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;
    });

    forecastChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: datesAndTimes, // Display dates and times instead of day names
            datasets: [{
                label: 'Temperature (°C)',
                data: temperatures,
                fill: false,
                borderColor: 'rgba(54, 162, 235, 1)',
                borderWidth: 2,
                pointBackgroundColor: 'rgba(54, 162, 235, 1)',
                pointRadius: 5,
                pointHoverRadius: 7,
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: false,
                    grid: {
                        color: 'rgba(0, 0, 0, 0.1)' // Light grey gridlines
                    },
                    ticks: {
                        font: {
                            size: 12 // Adjust font size for y-axis ticks
                        }
                    }
                },
                x: {
                    grid: {
                        color: 'rgba(0, 0, 0, 0)' // Hide x-axis gridlines
                    },
                    ticks: {
                        font: {
                            size: 12 // Adjust font size for x-axis labels
                        }
                    }
                }
            },
            plugins: {
                legend: {
                    display: false // Hide legend
                },
                tooltip: {
                    backgroundColor: 'rgba(0, 0, 0, 0.8)', // Dark tooltip background
                    titleColor: '#fff', // Tooltip title color
                    bodyColor: '#fff', // Tooltip body text color
                    titleFont: {
                        size: 14,
                        weight: 'bold'
                    }
                }
            }
        }
    });
    
}

// Update the form submission to fetch both current weather and forecast
document.getElementById('locationForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const locationInput = document.getElementById('locationInput').value.trim();
    
    if (locationInput !== '') {
        fetchWeatherByLocation(locationInput);
        fetch5DayForecastByLocation(locationInput);
    } else {
        alert('Please enter a valid location.');
    }
});

function fetch5DayForecastByLocation(location) {
    const apiKey = '5267dd9a85d394226df9c47fe6ff176a';
    const apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${encodeURIComponent(location)}&cnt=40&appid=${apiKey}`;

    fetch(apiUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            displayForecastChart(data);
        })
        .catch(error => {
            console.error('Error fetching forecast data:', error);
            alert('Error fetching forecast data. Please try again.');
        });
}


