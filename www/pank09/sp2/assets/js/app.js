class WeatherApp {
    constructor() {
        this.promises = [];

        this.OW_apiKey = "";
        this.imageBase = "assets/icons/";

        this.currentLocation = JSON.parse(localStorage.getItem('currentLocation')) || null;
        this.weather = JSON.parse(localStorage.getItem('weather')) || null;
        
        this.initialize();
    }

    async initialize() {
        this.containers = {
            city:           document.querySelector('.current-city'),
            temperature:    document.querySelector('.current-temperature'),
            icon:           document.querySelector('.current-weather-icon'),
            wind:           document.querySelector('.current-wind'),
            humidity:       document.querySelector('.current-humidity'),
            uv:             document.querySelector('.current-uv'),
            pressure:       document.querySelector('.current-pressure'),
            dailyForecast:  document.querySelector('.daily-forecast'),
            hourlyForecast: document.querySelector('.hourly-forecast'),
            errorList:      document.querySelector('.error-list')
        };

        if (!this.currentLocation) {
            await this.getLocation();
        }

        this.displayWeather();

        document.forms.searchCity.addEventListener('submit', (e) => {
            e.preventDefault();
            this.setLocation();
        });
    }

    async setLocation() {
        const newLocation = document.forms.searchCity.querySelector('input').value.trim();

        if (!newLocation)
            return;

        const apiUrl = `https://api.openweathermap.org/geo/1.0/direct?q=${newLocation}&limit=1&appid=${this.OW_apiKey}`;


        this.sendRequest(apiUrl, (data) => {
            if (data.length === 0) {
                throw new Error("City not found. Please set the city manually.");
                return;
            }
            this.currentLocation = {};
            this.currentLocation.name = data[0].name;
            this.currentLocation.lat = data[0].lat;
            this.currentLocation.lon = data[0].lon;
            localStorage.setItem('currentLocation', JSON.stringify(this.currentLocation));

            this.weather = null;
            this.displayWeather();
        });
    }

    async getLocation() {
        return new Promise((resolve, reject) => {
            if (navigator.geolocation) {
                this.startLoading();

                navigator.geolocation.getCurrentPosition(
                    position => {
                        const apiUrl = `https://api.openweathermap.org/geo/1.0/reverse?lat=${position.coords.latitude}&lon=${position.coords.longitude}&limit=1&appid=${this.OW_apiKey}`;
    
                        this.sendRequest(apiUrl, (data) => {
                            if (data.length === 0) {
                                throw new Error("City not found. Please set the city manually.");
                                return;
                            }
                            this.currentLocation = {
                                name: data[0].name,
                                lat: data[0].lat,
                                lon: data[0].lon
                            };
                            localStorage.setItem('currentLocation', JSON.stringify(this.currentLocation));
                            resolve(this.currentLocation);
                        });
                    },
                    error => {
                        this.pushError(error.message);
                    }
                );
            } else {
                this.pushError("Geolocation API is not supported by this browser. Please set the city manually.");
            }
        });
    }

    async displayWeather() {
        if (!this.weather) {
            await this.getWeather();
        }

        if (!this.weather)
            return;

        if (!this.weather.current)
            return;

        const { name, main, weather, wind } = this.weather.current;

        this.containers.city.innerText = name;
        this.containers.temperature.innerText = this.kelvinToCelcius(main.temp);
        this.containers.humidity.innerText = main.humidity + "%";
        this.containers.uv.innerText = "0.16";
        this.containers.pressure.innerText = this.hPaToMmHg(main.pressure);
        this.containers.wind.innerText = Math.round(wind.speed) + " m/s";

        if (weather.length !== 0)
            this.containers.icon.src = `${this.imageBase}${weather[0].icon}.svg`;
        
        if (!this.weather.forecast)
            return;

        const { list } = this.weather.forecast;

        const dayForecastCards = [];

        const addedDays = {};

        list.forEach(dayForecast => {
            const date = dayForecast.dt_txt.split(' ')[0]; // Get only date
            
            if (addedDays[date] === 1)
                return;

            addedDays[date] = 1;

            const { name, main, weather, wind } = dayForecast;

            const forecastDate = new Date(dayForecast.dt_txt);
            const forecastDayName = this.getDayName(forecastDate.getDay());
            const nowDate = new Date();
            const nowDayName = this.getDayName(nowDate.getDay());

            const displayDayName = nowDayName === forecastDayName ? "Today" : forecastDayName;

            const tempMin = this.kelvinToCelcius(main.temp_max);
            const tempMax = this.kelvinToCelcius(main.temp_min);
            const temp = tempMin === tempMin ? tempMin : `${tempMin}/${tempMax}`;

            dayForecastCards.push(this.createDailyCard(weather[0].icon, displayDayName, weather[0].main, temp));
        });
        
        this.containers.dailyForecast.innerHTML = '';
        this.containers.dailyForecast.append(...dayForecastCards);

        const hourlyForecastCards = [];

        // Get first 3 hours of first day
        list.slice(0, 3).forEach(hourlyForecast => {
            const { name, main, weather, wind } = hourlyForecast;

            const forecastDate = new Date(hourlyForecast.dt_txt);
            const forecastTime = `${forecastDate.getHours()}:00`;

            hourlyForecastCards.push(this.createHourlyCard(weather[0].icon, forecastTime, weather[0].main, this.kelvinToCelcius(main.temp)));
        });
        
        this.containers.hourlyForecast.innerHTML = '';
        this.containers.hourlyForecast.append(...hourlyForecastCards);
    }

    createDailyCard(icon, day, condition, temp) {
        const card = document.createElement('div');
            card.classList.add('card');
            card.innerHTML = `
                <div class="row is-mobile align-items-center">
                    <div class="col no-grow">
                        <img class="weather-icon" src="${this.imageBase}${icon}.svg">
                    </div>
                    <div class="col">
                        <div class="content">
                            <div class="day">${day}</div>
                            <div class="details">${condition} ${temp}</div>
                        </div>
                    </div>
                </div>
            `;

        return card;
    }

    createHourlyCard(icon, time, condition, temp) {
        const card = document.createElement('div');
            card.classList.add('col');
            card.innerHTML = `
            <div class="card">
                <img class="weather-icon" src="${this.imageBase}${icon}.svg">
                <div class="content">
                    <div class="time">${time}</div>
                    <div class="details">${condition} ${temp}</div>
                </div>
            </div>
            `;

        return card;
    }

    startLoading() {
        const dummyIcon = 'dummy';

        this.loading = true;

        document.body.classList.add('is-loading');

        this.containers.city.innerText = '-';
        this.containers.temperature.innerText = '-°';
        this.containers.humidity.innerText = "-%";
        this.containers.uv.innerText = "-.--";
        this.containers.pressure.innerText = '- mmHg';
        this.containers.wind.innerText = "- m/s";

        this.containers.icon.src = `${this.imageBase}${dummyIcon}.svg`;
        
        const dayForecastCards = [];

        [1, 2, 3, 4, 5, 6].forEach(() => {
            dayForecastCards.push(this.createDailyCard(dummyIcon, '--:--', '-', '-°'));
        });
        
        this.containers.dailyForecast.innerHTML = '';
        this.containers.dailyForecast.append(...dayForecastCards);

        const hourlyForecastCards = [];

        [1, 2, 3].forEach(() => {
            hourlyForecastCards.push(this.createHourlyCard(dummyIcon, '--:--', '-', '-°'));
        });
        
        this.containers.hourlyForecast.innerHTML = '';
        this.containers.hourlyForecast.append(...hourlyForecastCards);
    }

    stopLoading() {
        this.loading = false;
        document.body.classList.remove('is-loading');
    }

    async getWeather() {
        this.weather = {};

        await this.sendRequest(`https://api.openweathermap.org/data/2.5/weather?lat=${this.currentLocation.lat}&lon=${this.currentLocation.lon}&appid=${this.OW_apiKey}`, (data) => {
            this.weather['current'] = data;
        });

        await this.sendRequest(`https://api.openweathermap.org/data/2.5/forecast?lat=${this.currentLocation.lat}&lon=${this.currentLocation.lon}&appid=${this.OW_apiKey}`, (data) => {
            this.weather['forecast'] = data;
        }).finally(() => {
            this.stopLoading();
        });

        localStorage.setItem('weather', JSON.stringify(this.weather));
    }

    async sendRequest(url, callback) {
        if (!this.loading)
            this.startLoading();

        try {
            const response = await fetch(url);
            const data = await response.json();

            if ('cod' in data && data.cod != 200) {
                this.pushError(data.message);
                return;
            }

            if (callback) {
                callback(data);
            }
        } catch (error) {
            this.pushError(error.message);
            this.stopLoading();
            this.displayWeather();
        }
    }

    getDayName(dayIndex) {
        const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        return daysOfWeek[dayIndex];
    }

    kelvinToCelcius(tempInKelvin) {
        return Math.round(tempInKelvin - 273.15) + "°";
    }

    hPaToMmHg(pressureInHPa) {
        return Math.round(pressureInHPa * 0.75006) + " mmHg";
    }

    pushError(msg) {
        const error = document.createElement('div');
        error.classList.add('notification', 'error');
        error.textContent = msg;
        this.containers.errorList.append(error);
    
        setTimeout(() => {
            error.remove();
        }, 3000);
    }
};

new WeatherApp();