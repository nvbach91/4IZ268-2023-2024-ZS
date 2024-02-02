
const weatherIcon = document.querySelector(".weather-icon");
const weatherPicture = document.querySelector(".weather-picture");
const cityElement = document.querySelector(".city");
const cityInput = document.querySelector(".search-bar").value;
const descriptionElement = document.querySelector(".description");
const tempElement = document.querySelector(".temp");
const windElement = document.querySelector(".wind");
const weatherElement = document.querySelector(".weather");
const humidityElement = document.querySelector(".humidity");

const unitsContainer = document.querySelector(".unit-buttons");
const errorElement = document.querySelector(".error");
const searchForm = document.querySelector(".search");
const favoriteIcon = document.querySelector(".favorite-icon");

let weather = {
    "apiKey": "b27381de87720c2e21a73b436a12b5fd",
    "units": "metric",
    "favorites": [],
    fetchWeather: function (city, units) {
        fetch("https://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=" + this.units + "&appid=" + this.apiKey)
            .then((response) => response.json())
            .then((data) => {
                this.displayWeather(data);
                this.saveToLocalStorage(city, data, units);
            })
            .catch(() => this.displayError());
    },

    displayWeather: function(data) {

        if (!data || !data.name) {
            console.error("Error: Invalid data format");
            return;
        }
        
        const { name } = data;
        const { description } = data.weather[0];
        const { temp, humidity } = data.main;
        const { speed } = data.wind;

        console.log(name, description, temp, humidity, speed);

        cityElement.innerHTML = name;
        descriptionElement.innerText = description;
        humidityElement.innerHTML = "Humidity: " + humidity + "%";
        tempElement.innerHTML = Math.round(temp) + "°C";
        windElement.innerHTML = "Wind Speed: "+ speed + " km/h";
        weatherElement.classList.remove("visit");

        if(data.weather[0].main == "Clear") {
            weatherIcon.src = "src/clear icon.png";
            weatherPicture.src = "src/clear.png";
        } else if (data.weather[0].main == "Clouds") {
            weatherIcon.src = "src/clouds icon.png";
            weatherPicture.src = "src/clouds.png";
        } else if (data.weather[0].main == "Drozzle") {
            weatherIcon.src = "src/drizzle icon.png";
            weatherPicture.src = "src/drizzle.png";
        } else if (data.weather[0].main == "Mist") {
            weatherIcon.src = "src/mist icon.png";
            weatherPicture.src = "src/mist.png";
        } else if (data.weather[0].main == "Rain") {
            weatherIcon.src = "src/rain icon.png";
            weatherPicture.src = "src/rain.png";
        } else if (data.weather[0].main == "Clouds") {
            weatherIcon.src = "src/snow icon.png";
            weatherPicture.src = "src/snow.png";
        } else if (data.weather[0].main == "Thunderstorm") {
            weatherIcon.src = "src/thunderstorm icon.png";
            weatherPicture.src = "src/thunderstorm.png";
        }

        weatherElement.style.visibility = "visible";
        weatherElement.style.maxHeight = "none";


    },displayError: function () {
        errorElement.style.display = "block";
    },

    saveToLocalStorage: function (city, data) {

        const weatherData = {
            city: city,
            data: data, 
        };
        localStorage.setItem("weatherData", JSON.stringify(weatherData));
    },

    loadFromLocalStorage: function () {

        const storedData = localStorage.getItem("weatherData");
        if (storedData) {
            const weatherData = JSON.parse(storedData);
            this.displayWeather(weatherData.data);
        }
    },

    search: function () {
        const city = document.querySelector(".search-bar").value.trim();

        if (city !== "") {
            this.fetchWeather(city);
        } else {
            this.displayError();
        }
    },

    addFavorite: function (city) {
        this.favorites.push(city);
        this.saveFavoritesToLocalStorage();
        this.displayFavorites();
        console.log(this.favorites);
    },
    

    saveFavoritesToLocalStorage: function () {
        localStorage.setItem("favorites", JSON.stringify(this.favorites));
    },

    loadFavoritesFromLocalStorage: function () {
        const storedFavorites = localStorage.getItem("favorites");
        if (storedFavorites) {
            this.favorites = JSON.parse(storedFavorites);
            this.displayFavorites();
        }
    },

    displayFavorites: function () {
        const favoritesList = document.querySelector(".favorites-list");
        favoritesList.innerHTML = "";
        console.log(this.favorites);
        this.favorites.forEach((city) => {
            const listItem = document.createElement("li");
            listItem.textContent = city;
            listItem.addEventListener("click",() => {
                this.fetchWeather(city);
            });
            favoritesList.appendChild(listItem);
        });

    },

    createUnitButtons: function () {
        const buttons = ['metric', 'standard', 'imperial'];
    
        buttons.forEach((unit) => {
            const button = document.createElement("button");
            button.innerText = unit;
            button.addEventListener("click", () => this.switchUnit(unit));
            unitsContainer.appendChild(button);
        });
    },

    switchUnit: function(unit) {
        const tempElementValue = parseFloat(tempElement.innerText);

        if (unit === "imperial") {
            tempElement.innerText = Math.round((tempElementValue * 9/5) + 32) + "°F";
        } else if (unit === "standard") {
            tempElement.innerText = Math.round(tempElementValue + 273.15) + "K";
        } else {
            tempElement.innerText = Math.round(tempElementValue) + "°C";
        }
    },
}

weather.loadFromLocalStorage();



document.querySelector(".search button").addEventListener("click", function() {
    weather.search();
});


searchForm.addEventListener("submit", function (event) {
    event.preventDefault();
    weather.search();
});



favoriteIcon.addEventListener("click", function() {
    const city = cityElement.textContent;
    weather.addFavorite(city);
});

weather.createUnitButtons();
weather.loadFavoritesFromLocalStorage();




