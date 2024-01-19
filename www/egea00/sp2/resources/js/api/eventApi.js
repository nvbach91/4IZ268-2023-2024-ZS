const eventApiConfig = {
    apiUrl: 'https://app.ticketmaster.com/discovery/v2/events.json?',
    api3000Url: 'http://localhost:3000/ticketmaster/discovery/v2/events?',
    apiVercelUrl: 'https://sp2-weather-app.vercel.app/api/ticketmaster/discovery/v2/events',
    apiKey: 'ury1bustrLLAnMLKbWaX1vkvLxWnxKfi'
};

function fetchEventsByCity(cityName, successCallback, errorCallback) {
    const originalUrl = `${eventApiConfig.apiUrl}apikey=${eventApiConfig.apiKey}&locale=*&city=${cityName}`;
    const encodedUrl = encodeURIComponent(originalUrl);

    const corsProxyURL = 'https://cors-proxy.itake.cz';

    const proxyUrl = `${corsProxyURL}/get?url=${encodedUrl}`;

    $.ajax({
        method: 'GET',
        url: proxyUrl,
        contentType: 'application/json',
        success: function (data) {
            if (data && data.page.totalElements === 0) {
                errorCallback('404');
            } else {
                successCallback(data);
            }
        },
        error: function (jqXHR, textStatus, errorThrown) {
            if (jqXHR.status) {
                errorCallback(jqXHR.status.toString(), textStatus);
            } else {
                errorCallback('network', textStatus);
            }
        }
    });
}

