$(document).ready(function () {

    const iconMapping = {
        '1': '01d',
        '2': '02d',
        '3': '02d',
        '4': '02d',
        '5': '02d',
        '6': '03d',
        '7': '03d',
        '8': '04d',
        '11': '50d',
        '12': '09d',
        '13': '10d',
        '14': '10d',
        '15': '11d',
        '16': '11d',
        '17': '11d',
        '18': '08d',
        '19': '13d',
        '20': '13d',
        '21': '13d',
        '22': '13d',
        '23': '13d',
        '24': '13d',
        '25': '13d',
        '26': '09d',
        '29': '13d',
        '30': '01d',
        '31': '13n',
        '32': '04d',
        '33': '01n',
        '34': '02n',
        '35': '02n',
        '36': '02n',
        '37': '02n',
        '38': '03n',
        '39': '10n',
        '40': '09n',
        '41': '11n',
        '42': '11n',
        '43': '13n',
        '44': '13n'
    }
    const apiKey = 'jGaorblmmHIH8N4m0NEwmYMA2ibpKNAX';
    let chart12Hours;

    async function getLocation() {
        try {
            const position = await new Promise((resolve, reject) => {
                navigator.geolocation.getCurrentPosition(resolve, reject);
            });

            const latitude = position.coords.latitude;
            const longitude = position.coords.longitude;
            return [latitude, longitude];
        } catch (error) {
            console.error("Error getting location:", error.message);
            throw error;
        }
    }

    getLocation()
        .then((coordinates) => {
            $.ajax({
                url: 'https://dataservice.accuweather.com/locations/v1/cities/geoposition/search',
                method: 'GET',
                dataType: 'json',
                data: {
                    apikey: apiKey,
                    q: `${coordinates[0]},${coordinates[1]}`
                },
                success: function (response) {
                    let locationKey = response.Key
                    makeAllForecasts(locationKey, apiKey, iconMapping)
                }
            });
        })
        .catch((error) => {
            console.error("Error:", error);
        });

    function getLocationKey(name, apiKey, iconMapping) {
        $.ajax({
            url: 'https://dataservice.accuweather.com/locations/v1/cities/search',
            method: 'GET',
            dataType: 'json',
            data: {
                apikey: apiKey,
                q: name
            },
            success: function (response) {
                let locationKey = response[0].Key
                makeAllForecasts(locationKey, apiKey, iconMapping)
            }
        });
    }

    function addLocation() {
        var newLocationInput = $('#new-location-input');
        var cityName = newLocationInput.val();

        if (cityName) {
            var newLocationSelector = $('<div class="location-selector" id="location-selector"></div>').text(cityName);

            newLocationSelector.on('click', function () {
                getLocationKey(cityName, apiKey, iconMapping);
            });

            $('#new-location').before(newLocationSelector);

            newLocationInput.val('');
            getLocationKey(cityName, apiKey, iconMapping)
        }
    }

    $('#search-button').on("click", function () {
        let name = $('#search-bar').val();
        getLocationKey(name, apiKey, iconMapping);
        $('#search-bar').val('');
    });

    $('#location-selector').on("click", function () {
        let name = $('#location-selector').text();
        getLocationKey(name, apiKey, iconMapping)
    });
    $('#add-location').on('click', addLocation);

    function getCurrentWeather(locationKey, apiKey, iconMapping) {
        $.ajax({
            url: 'https://dataservice.accuweather.com/currentconditions/v1/' + locationKey,
            method: 'GET',
            dataType: 'json',
            data: {
                apikey: apiKey,
                details: 'true'
            },
            success: function (response) {
                let currentTemperature = response[0].Temperature.Metric.Value;
                let iconKey = response[0].WeatherIcon;
                let comment = response[0].WeatherText;

                var currentDegreesElement = document.getElementById('current-degrees');
                var currentIconElement = document.getElementById('current-icon');
                var weatherPhraseElement = document.getElementById('weather-phrase');

                $.ajax({
                    url: 'https://dataservice.accuweather.com/locations/v1/' + locationKey,
                    method: 'GET',
                    dataType: 'json',
                    data: {
                        apikey: apiKey,
                        details: 'true',
                        metric: 'true'
                    },
                    success: function (response) {
                        var currentLocationElement = document.getElementById('current-location');
                        currentLocationElement.innerHTML = `<h1>${response.AdministrativeArea.EnglishName}</h1>`;
                    },
                    error: function (xhr, status, error) {
                        console.error(error);
                    }
                });

                currentDegreesElement.innerHTML = `<h1>${currentTemperature}°C<span class="degree-symbol"></span></h1>`;
                currentIconElement.innerHTML = `<img src=https://openweathermap.org/img/wn/${iconMapping[iconKey]}@2x.png>`;
                weatherPhraseElement.innerHTML = `<h3>${comment}</h3>`;
            },
            error: function (xhr, status, error) {
                console.error(error);
            }
        });
    }

    function make5DayTable(locationKey, apiKey, iconMapping) {
        $.ajax({
            url: 'https://dataservice.accuweather.com/forecasts/v1/daily/5day/' + locationKey,
            method: 'GET',
            dataType: 'json',
            data: {
                apikey: apiKey,
                details: 'true',
                metric: 'true'
            },
            success: function (response) {
                let daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
                let day5Data = [];
                $("#table td").remove();
                for (let i = 0; i < 5; i++) {
                    let date = new Date(response.DailyForecasts[i].Date)
                    let dayName = daysOfWeek[date.getDay()];
                    day5Data.push({
                        day: dayName,
                        temperatureMin: response.DailyForecasts[i].Temperature.Minimum.Value,
                        temperatureMax: response.DailyForecasts[i].Temperature.Maximum.Value,
                        precipitationProbability: response.DailyForecasts[i].Day.PrecipitationProbability,
                        icon: response.DailyForecasts[i].Day.Icon
                    });
                }
                 
                $('#table tbody').append()

                let rows = day5Data.map(item => {
                    let img = $('<img>').attr('src', `https://openweathermap.org/img/wn/${iconMapping[String(item.icon)]}@2x.png`);

                    return $('<tr>')
                        .append($('<td>').text(item.day))
                        .append($('<td>').append(img))
                        .append($('<td>').text(Math.round(item.temperatureMin)))
                        .append($('<td>').text(Math.round(item.temperatureMax)))
                        .append($('<td>').text(item.precipitationProbability));
                });

                $('#table tbody').append(rows);
            },
            error: function (xhr, status, error) {
                console.error(error);
            }
        });
    }

    function plot12HourForecast(locationKey, apiKey, metric) {
        $.ajax({
            url: 'https://dataservice.accuweather.com/forecasts/v1/hourly/12hour/' + locationKey,
            method: 'GET',
            dataType: 'json',
            data: {
                apikey: apiKey,
                details: 'true',
                metric: 'true'
            },
            success: function (response) {

                let xData = [];
                let yData = [];

                for (let i = 0; i < 12; i++) {
                    switch (metric) {
                        case 'Temperature':
                            yData.push(response[i][metric].Value);
                            break;
                        case 'Wind':
                            yData.push(response[i][metric].Speed.Value);
                            break;
                        default:
                            yData.push(response[i][metric]);
                    }

                    let timeStamp = new Date(response[i].DateTime);
                    xData.push(timeStamp.getHours())
                }

                let canvas = window.document.getElementById('line-chart');
                const ctx = canvas.getContext('2d');

                let data = {
                    labels: xData,
                    datasets: [{
                        data: yData,
                        borderColor: 'rgba(1, 1, 1, 1)',
                    }]
                };

                let config = {
                    type: 'line',
                    data: data,
                    options: {
                        plugins: {
                            legend: {
                                display: false
                            }
                        }
                    }
                };

                if (chart12Hours !== undefined) {
                    chart12Hours.destroy();
                };

                chart12Hours = new Chart(ctx, config);

            },
            error: function (xhr, status, error) {
                console.error(error);
            }
        });
    }

    function makeAllForecasts(locationKey, apiKey, iconMapping) {

        getCurrentWeather(locationKey, apiKey, iconMapping)
        make5DayTable(locationKey, apiKey, iconMapping)
        $('#metric').change(function () {
            let selectedMetric = $(this).val();
            plot12HourForecast(locationKey, apiKey, selectedMetric)
        }).trigger('change');
    }
});

