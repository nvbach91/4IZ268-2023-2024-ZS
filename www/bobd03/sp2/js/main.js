// functions for visualizing the ouput in the #outputs-field

const outputBodies = (objects) => {
    // either formated as a table, or as individual Lists, will see what works better.
}

const outputEvents = (events) => {
    // either formated as a table, or as individual Lists, will see what works better.
}

// functions for communicating with API

const getBodyPosition = (longitude, latitude, elevation, from, to, time) => {
    // obecný příklad requestu => https://api.astronomyapi.com/api/v2/bodies/positions/:body 
}

const getBodyEvent = (longitude, latitude, elevation, from, to, time, bodyID) => {
    // obecný příklad requestu => https://api.astronomyapi.com/api/v2/bodies/events/:body 
}

// functions for populating the individual popup menus with initial content

(function createUsagePopup() {
    /* 
        Will consist of simple text instructions describing how to use the app.
        Depends on the final implementations of the searches for objects and events in the sky.
    */
})();

(function createObjectsPopup() {
    /* 
        Will consist of forms for user input of time interval and his/her coordinates.
        Button for auto-fill of the positional fields (Geolocation API) will be included
        Upon clicking on search button, relevant functions for communicating with Astronomy API will be called.
    */
})();

(function createEventsPopup() {
    /* 
        Will consist of forms for user input of time interval, his/her coordinates and the celestial body in question.
        Button for auto-fill of the positional fields (Geolocation API) will be included
        Upon clicking on search button, relevant functions for communicating with Astronomy API will be called.
    */
})();

(function createTermsPopup() {
    /* 
        Will consist of simple text explanations of the terms, that reader should know, in order to understand the app output.
    */
})();

// functions for showing/closing of the individual menus

$('.button-usage').click(function() {
    $('.usage-popup').css('display','block');
});

$('.button-objects').click(function() {
    $('.objects-popup').css('display','block');
});

$('.button-events').click(function() {
    $('.events-popup').css('display','block');
});

$('.button-terms').click(function() {
    $('.terms-popup').css('display','block');
});

$('.close-button').click(function() {
    $(this).parents('.popup').css('display', 'none');
});


const output_field = $('output-field');