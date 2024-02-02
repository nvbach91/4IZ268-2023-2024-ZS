
let weather = {
    "apiKey": "b27381de87720c2e21a73b436a12b5fd",
    fetchWeather: function (city) {
        fetch("https://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=metric&appid=" + this.apiKey)
            .then((response) => response.json())
            .then((data) => {
                this.displayWeather(data);
                this.saveToLocalStorage(city, data);
            })
            .catch(() => this.displayError());
    },
    displayWeather: function(data) {

        const { name } = data;
        const { description } = data.weather[0];
        const { temp, humidity } = data.main;
        const { speed } = data.wind;

        const weatherIcon = document.querySelector(".weather-icon");
        const weatherPicture = document.querySelector(".weather-picture");

        console.log(name, description, temp, humidity, speed);

        document.querySelector(".city").innerHTML = name;
        document.querySelector(".description").innerText = description;
        document.querySelector(".humidity").innerHTML = "Humidity: " + humidity + "%";
        document.querySelector(".temp").innerHTML = Math.round(temp) + "°C";
        document.querySelector(".wind").innerHTML = "Wind Speed: "+ speed + " km/h";
        document.querySelector(".weather").classList.remove("visit");

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

        document.querySelector(".weather").style.visibility = "visible";
        document.querySelector(".weather").style.maxHeight = "none";
    },displayError: function () {
        document.querySelector(".error").style.display = "block";
    },
    saveToLocalStorage: function (city, data) {

        const weatherData = {
            city: city,
            data: data
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
        const city = document.querySelector(".search-bar").value;
        this.fetchWeather(city);
    },
};

weather.loadFromLocalStorage();

document.querySelector(".search button").addEventListener("click", function() {
    weather.search();
});

document.querySelector(".search-bar").addEventListener("keyup", function(event) {
    if(event.key =="Enter") {
        weather.search();
    }
});



