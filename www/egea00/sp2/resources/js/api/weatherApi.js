const weatherApiConfig = {
    apiUrl: 'https://api.openweathermap.org/data/2.5/',
    api3000Url: 'http://localhost:3000/openweather/data/2.5/',
    apiVercelUrl: 'https://sp2-weather-app.vercel.app/api/openweather/data/2.5',
    weatherUrl: 'weather',
    forecastUrl: 'forecast',
    apiKey: '08c26bfaf3511570b1ab6c123280069d',
};

function fetchCurrentWeatherByCoordinates(lat, lon, successCallback, errorCallback) {
    const originalUrl = `${weatherApiConfig.apiUrl}${weatherApiConfig.weatherUrl}?lat=${lat}&lon=${lon}&appid=${weatherApiConfig.apiKey}`;
    const encodedUrl = encodeURIComponent(originalUrl);
    const corsProxyURL = 'https://cors-proxy.itake.cz';
    const proxyUrl = `${corsProxyURL}/get?url=${encodedUrl}`;


    $.ajax({
        method: 'GET',
        url: proxyUrl,
        contentType: 'application/json',
        success: successCallback,
        error: function (jqXHR, textStatus, errorThrown) {
            if (jqXHR.status) {
                errorCallback(jqXHR.status.toString());
            } else {
                errorCallback('network', textStatus);
            }
        }
    });
}

function fetchForecastWeatherByCoordinates(lat, lon, successCallback, errorCallback) {
    const originalUrl = `${weatherApiConfig.apiUrl}${weatherApiConfig.forecastUrl}?lat=${lat}&lon=${lon}&appid=${weatherApiConfig.apiKey}`;
    const encodedUrl = encodeURIComponent(originalUrl);
    const corsProxyURL = 'https://cors-proxy.itake.cz';
    const proxyUrl = `${corsProxyURL}/get?url=${encodedUrl}`;

    $.ajax({
        method: 'GET',
        url: proxyUrl,
        contentType: 'application/json',
        success: successCallback,
        error: function (jqXHR, textStatus, errorThrown) {
            if (jqXHR.status) {
                errorCallback(jqXHR.status.toString());
            } else {
                errorCallback('network', textStatus);
            }
        }
    });
}
