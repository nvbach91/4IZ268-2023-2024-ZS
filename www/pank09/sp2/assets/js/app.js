class WeatherApp {
    constructor() {
        this.promises = [];

        this.OW_apiKey = '';
        this.imageBase = 'assets/icons/';

        this.currentLocation = JSON.parse(localStorage.getItem('currentLocation')) || null;
        this.weather = null;

        const weather = localStorage.getItem('weather');
        const lastModifiedString = localStorage.getItem('weather.lastModifiedDate');

        if (weather && lastModifiedString) {
            const lastModifiedDate = new Date(lastModifiedString);
            const currentDateTime = new Date();

            const timeDifferenceInMintues = (currentDateTime - lastModifiedDate) / (1000 * 60);

            if (timeDifferenceInMintues < 2) {
                this.weather = JSON.parse(weather);
            }
        }
        
        this.initialize();
    }

    async initialize() {
        this.form = document.forms.searchCity;
        this.input = this.form.querySelector('input');

        this.containers = {
            city:           document.querySelector('.current-city'),
            temperature:    document.querySelector('.current-temperature'),
            icon:           document.querySelector('.current-weather-icon'),
            wind:           document.querySelector('.current-wind'),
            humidity:       document.querySelector('.current-humidity'),
            precipitation:  document.querySelector('.current-precipitation'),
            pressure:       document.querySelector('.current-pressure'),
            dailyForecast:  document.querySelector('.daily-forecast'),
            hourlyForecast: document.querySelector('.hourly-forecast'),
            errorList:      document.querySelector('.error-list'),
            temp_units:     document.querySelector('#temp-units')
        };

        this.temp_units = this.containers.temp_units.value ?? 'c';

        if (!this.currentLocation) {
            await this.getLocation();
        }

        this.displayWeather();

        let self = this;

        this.form.addEventListener('submit', (e) => {
            e.preventDefault();
            self.setLocation();
        });

        this.containers.temp_units.addEventListener('change', function(e) {
            self.temp_units = self.containers.temp_units.value;
            self.displayWeather();
        });
    }

    async setLocation() {
        if (this.loading)
            return;

        const newLocation = this.input.value.trim();

        if (!newLocation)
            return;

        const apiUrl = `https://api.openweathermap.org/geo/1.0/direct?q=${newLocation}&limit=1&appid=${this.OW_apiKey}`;


        this.sendRequest(apiUrl, (data) => {
            if (data.length === 0) {
                throw new Error('City not found. Please set the city manually.');
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
                                throw new Error('City not found. Please set the city manually.');
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
                        this.stopLoading();
                    }
                );
            } else {
                this.pushError('Geolocation API is not supported by this browser. Please set the city manually.');
                this.stopLoading();
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
        this.containers.temperature.innerText = this.getTemperature(main.temp);
        this.containers.humidity.innerText = main.humidity + '%';

        this.containers.precipitation.innerText = '0 mm';

        if ('rain' in this.weather.current && '1h' in this.weather.current.rain) 
            this.containers.precipitation.innerText = this.weather.current.rain['1h'] + ' mm';

        if ('snow' in this.weather.current && '1h' in this.weather.current.snow) 
            this.containers.precipitation.innerText = this.weather.current.snow['1h'] + ' mm';

        this.containers.pressure.innerText = this.hPaToMmHg(main.pressure);
        this.containers.wind.innerText = Math.round(wind.speed) + ' m/s';

        if (weather.length !== 0) {
            this.containers.icon.src = `${this.imageBase}${weather[0].icon}.svg`;
            this.containers.icon.alt = weather[0].main;
        }
        
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

            const forecastDate = moment(dayForecast.dt_txt);
            const nowDate = moment();

            const displayDayName = nowDate.format('DD.MM.YY') === forecastDate.format('DD.MM.YY') ? forecastDate.format('[Today] (DD.MM)') : forecastDate.format('dddd (DD.MM)');

            const tempMin = this.getTemperature(main.temp_max);
            const tempMax = this.getTemperature(main.temp_min);
            const temp = tempMin === tempMin ? tempMin : `${tempMin}/${tempMax}`;

            const card = this.createDailyCard(weather[0].icon, displayDayName, weather[0].main, temp);

            this.handleClickOnDailyCard(card, dayForecast);

            dayForecastCards.push(card);
        });
        
        this.containers.dailyForecast.innerHTML = '';
        this.containers.dailyForecast.append(...dayForecastCards);

        const hourlyForecastCards = [];

        // Get first 3 hours of first day
        list.slice(0, 4).forEach(hourlyForecast => {
            const { name, main, weather, wind } = hourlyForecast;

            const forecastDate = new Date(hourlyForecast.dt_txt);
            const forecastTime = `${forecastDate.getHours()}:00`;

            hourlyForecastCards.push(this.createHourlyCard(weather[0].icon, forecastTime, weather[0].main, this.getTemperature(main.temp)));
        });
        
        this.containers.hourlyForecast.innerHTML = '';
        this.containers.hourlyForecast.append(...hourlyForecastCards);
    }

    handleClickOnDailyCard(card, currentForecast) {
        const { list } = this.weather.forecast;

        const currentDate = currentForecast.dt_txt.split(' ')[0];

        const hourlyForecastOfSameDate = list.filter(forecast => {
            const date = forecast.dt_txt.split(' ')[0];

            return date === currentDate;
        });

        const hourlyForecastCards = [];

        // Get first 3 hours of first day
        hourlyForecastOfSameDate.slice(0, 4).forEach(hourlyForecast => {
            const { name, main, weather, wind } = hourlyForecast;

            const forecastDate = new Date(hourlyForecast.dt_txt);
            const forecastTime = `${forecastDate.getHours()}:00`;

            hourlyForecastCards.push(this.createHourlyCard(weather[0].icon, forecastTime, weather[0].main, this.getTemperature(main.temp)));
        });
        
        card.querySelector('.list').innerHTML = '';
        card.querySelector('.list').append(...hourlyForecastCards);

        card.addEventListener('click', () => {
            const activeCard = document.querySelector('.daily-forecast .card.is-active');

            if (activeCard && !card.isSameNode(activeCard))
                activeCard.classList.remove('is-active');

            if (card.classList.contains('is-active')) {
                card.classList.remove('is-active');
            } else {
                card.classList.add('is-active');
            }
        });
    }

    createDailyCard(icon, day, condition, temp) {
        const card = document.createElement('div');
            card.classList.add('card');
            card.innerHTML = `
                <div class="row is-mobile align-items-center">
                    <div class="col no-grow">
                        <img class="weather-icon" src="${this.imageBase}${icon}.svg" width="75" height="75" alt="${condition}">
                    </div>
                    <div class="col">
                        <div class="content">
                            <div class="day">${day}</div>
                            <div class="details">${condition} ${temp}</div>
                        </div>
                    </div>
                    <div class="col no-grow">
                        <i class="icon i-chevron-down"></i>
                    </div>
                </div>
                <div class="row narrow is-mobile align-items-center list"></div>
            `;

        return card;
    }

    createHourlyCard(icon, time, condition, temp) {
        const card = document.createElement('div');
            card.classList.add('col');
            card.innerHTML = `
            <div class="card">
                <img class="weather-icon" src="${this.imageBase}${icon}.svg" width="75" height="75" alt="${condition}">
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

        this.input.setAttribute('disabled', true);

        document.body.classList.add('is-loading');

        this.containers.city.innerText = '-';
        this.containers.temperature.innerText = '-°';
        this.containers.humidity.innerText = '-%';
        this.containers.precipitation.innerText = "-.- mm";
        this.containers.pressure.innerText = '- mmHg';
        this.containers.wind.innerText = '- m/s';

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
        this.input.removeAttribute('disabled');
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
        localStorage.setItem('weather.lastModifiedDate', new Date().toISOString());
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
        return Math.round(tempInKelvin - 273.15) + '°';
    }

    kelvinToFahrenheit(tempInKelvin) {
        return Math.round((tempInKelvin - 273.15) * 1.8 + 32) + '°';
    }

    hPaToMmHg(pressureInHPa) {
        return Math.round(pressureInHPa * 0.75006) + ' mmHg';
    }

    getTemperature(temp) {
        if (this.temp_units === 'f')
            return this.kelvinToFahrenheit(temp);

        return this.kelvinToCelcius(temp);
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