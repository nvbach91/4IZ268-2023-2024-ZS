const wikipediaApiConfig = {
    apiUrl: 'https://en.wikipedia.org/api/rest_v1/page/html/',
    apiMobileUrl: 'https://en.wikipedia.org/api/rest_v1/page/mobile-html/',
    apiSummaryUrl: 'https://en.wikipedia.org/api/rest_v1/page/summary/'
};

function fetchWikipediaMobilePage(title, successCallback, errorCallback) {
    const url = `${wikipediaApiConfig.apiMobileUrl}${encodeURIComponent(title)}`;

    $.ajax({
        method: 'GET',
        url: url,
        contentType: 'application/json',
        success: successCallback,
        error: errorCallback
    });
}

function fetchWikipediaSummary(title, successCallback, errorCallback) {
    const url = `${wikipediaApiConfig.apiSummaryUrl}${encodeURIComponent(title)}`;

    $.ajax({
        method: 'GET',
        url: url,
        contentType: 'application/json',
        success: successCallback,
        error: function (jqXHR, textStatus, errorThrown) {
            errorCallback(jqXHR.status.toString());
        }
    });
}


function fetchWikipediaPage(title, successCallback, errorCallback) {
    const url = `${wikipediaApiConfig.apiUrl}${encodeURIComponent(title)}`;

    $.ajax({
        method: 'GET',
        url: url,
        contentType: 'application/json',
        success: successCallback,
        error: errorCallback
    });
}
