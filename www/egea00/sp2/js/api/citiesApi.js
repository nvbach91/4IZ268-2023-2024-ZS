const citiesApiConfig = {
    apiUrl: 'https://api.api-ninjas.com/v1/city?name=',
    apiKey: '8KOiP9xufP3fm4y7u1TWDw==WN5yUhhhWUepx4Qv'
};

function fetchCitiesByQuery(query, successCallback, errorCallback) {
    $.ajax({
        method: 'GET',
        url: citiesApiConfig.apiUrl + query,
        headers: {'X-Api-Key': citiesApiConfig.apiKey},
        contentType: 'application/json',
        success: successCallback,
        error: errorCallback
    });
}

