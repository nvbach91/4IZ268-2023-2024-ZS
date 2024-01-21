import sweetalert2 from 'https://cdn.jsdelivr.net/npm/sweetalert2@11.10.3/+esm';
const App = {};

App.applicationID = '5500fad7-8ec6-427c-b175-93eb33660414';
App.applicationSecret = 'a6cd4dad16c91b700a881695552e19a3e023244a178f63eb61d92aae8556c4f595b0d10ad6ab88a5f989e4797cd28a50d91ee1f1ef9844e32a209da35dbfc09fade0b373940dec5915964c905bd9bd9352e36431038497a4799d8a5fdf8909a24f867849ed52c9feaf53b98abf06f825';
// function to handle autofill of GPS coordinates using geolocation API
App.authString = btoa(`${App.applicationID}:${App.applicationSecret}`);


App.loadingIcon =$(`<div>
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                    </div>`).addClass('loading-icon');
App.outputField = $('.outputs-field');

App.showLoading = () => {
    $('main').append(App.loadingIcon);
};

App.hideLoading = () => {
    App.loadingIcon.remove();
};

App.formatDate = (date) => {
    const dateArray = date.split('T');
    const splitDate = dateArray[0].split('-');
    dateArray[0] = splitDate[0] + '-' + splitDate[2] + '-' + splitDate[1];
    
    return dateArray;
}

App.createDetailsPopup = (pos, name, date) => {
    /*
        This function creates modal with additional info for each observation of each displayed object.
    */
    const detailsPopup = $('<div>').addClass('details-popup popup');
    const detailsPopupContent = $('<div>').addClass('popup-content');
    detailsPopup.append(detailsPopupContent);

    const closeButton = $('<button>').text('Close').addClass('close-button button').click(function() {
        detailsPopup.remove();
        App.menuOpened = false;
    });

    detailsPopupContent.append(closeButton);

    detailsPopupContent.append($(`<h2>${name}</h2>`));
    detailsPopupContent.append($(`<h2>Date: ${date[0]}</h2>`));
    detailsPopupContent.append($(`<h2>Time and timezone: ${date[1]}</h2>`));

    let table = $('<table>');
    let tableRow = $('<tr>');

    tableRow.append('<th>Distance from Earth</th>')
    tableRow.append(`<td>${pos.distance.fromEarth.km}` + ' km</td>');
    table.append(tableRow)

    tableRow = $('<tr>');
    tableRow.append('<th>Apparent magnitude</th>')
    tableRow.append(`<td>${pos.extraInfo.magnitude}</td>`);
    table.append(tableRow);

    tableRow = $('<tr>');
    tableRow.append('<th>Horizontal: altitude</th>')
    tableRow.append(`<td>${pos.position.horizontal.altitude.string}</td>`);
    table.append(tableRow);

    tableRow = $('<tr>');
    tableRow.append('<th>Horizontal: azimuth</th>')
    tableRow.append(`<td>${pos.position.horizontal.azimuth.string}</td>`);
    table.append(tableRow);

    tableRow = $('<tr>');
    tableRow.append('<th>Equatorial: right ascension</th>')
    tableRow.append(`<td>${pos.position.equatorial.rightAscension.string}</td>`);
    table.append(tableRow);

    tableRow = $('<tr>');
    tableRow.append('<th>Equatorial: declination</th>')
    tableRow.append(`<td>${pos.position.equatorial.declination.string}</td>`);
    table.append(tableRow);

    detailsPopupContent.append(table);
    detailsPopup.css('display', 'block');
    $(detailsPopup).insertAfter('.terms-popup');
}

App.checkInput = (longitude, latitude, elevation, from, to, time) => {
    /*
        This function makes relevant checks on the validity of the submited form for searching for bodies before the app attempts to fetch the data-
    */
    longitude = longitude.trim();
    latitude = longitude.trim();
    
    if(longitude.length === 0 || latitude.length === 0 || elevation.length === 0 || from.length === 0 || to.length === 0 || time.length === 0) {
        sweetalert2.fire({
            text: 'Please fill all input fields.',
            icon: 'error',
          });
        return false;
    } else if(/^-?([0-8]?[0-9]|90)(\.[0-9]{1,10})?$/.test(longitude) == false) {
        sweetalert2.fire({
            text: 'Wrong longitude format',
            icon: 'error',
          });
        return false
    } else if(/^-?([0-9]{1,2}|1[0-7][0-9]|180)(\.[0-9]{1,10})?$/.test(latitude) == false) {
        sweetalert2.fire({
            text: 'Wrong latitude format',
            icon: 'error',
          });
        return false
    } else if(elevation < 0) {
        sweetalert2.fire({
            text: 'Elevation must be at least 0',
            icon: 'error',
          });
        return false;
    } else if(from > to) {
        sweetalert2.fire({
            title: 'Invalid date information',
            text: 'Starting date must not be later then the ending date',
            icon: 'error',
          });
        return false;
    } else {
        return true;
    }
}

App.useGPS = (latitude, longitude, elevation) => {
    if ('geolocation' in navigator) {
        navigator.geolocation.getCurrentPosition((position) => {
            //coords > altitude, latitude, longitude
            if(position.coords.latitude !== null) {
                latitude.val(position.coords.latitude);
            }
            if(position.coords.longitude !== null) {
                longitude.val(position.coords.longitude);
            }
            if(position.coords.elevation !== null) {
                elevation.val(position.coords.elevation)
            }
            
        });
    } else {
        sweetalert2.fire({
            text: 'Geolocation API is not available',
            icon: 'error',
          });;
    }
}


App.outputBodies = (bodies) => {
    /*
        This function processes the data about solar system bodies and their position in each day of observation, creates "card" for each of them and finaly adds the entirety of the output to the output_field on the webpage.
    */
    if(bodies.length === 0) {
        sweetalert2.fire({
            title: 'No object data found.',
            text: 'Try to adjust your search parameters',
            icon: 'error'
        });
    } else {
        const objects = bodies.rows;
        const output = $('<div>').addClass('outputs');

        objects.forEach(body => {
            let bodyField = $('<div>').addClass('bodycard');
            bodyField.append($(`<h2>${body.body.name}</h2>`));
            
            let table = $('<table>');
            table.append($('<tr><th>Date</th><th>Constellation</th><th>---</th></tr>)'));

            body.positions.forEach(pos => {
                let tableRow = $('<tr>');

                
                let date = App.formatDate(pos.date);
                tableRow.append($(`<td>${date[0]}</td>`));
                tableRow.append($(`<td>${pos.position.constellation.name}</td>`));
                let detailsButton = $('<button>').text('Details').addClass('details-button button').click(function() { //NEVALIDNÍ - V TABULCE NESMÍ BÝT TLAČÍTKO!!!
                    if(App.menuOpened === false) {
                        App.createDetailsPopup(pos, body.body.name, date);
                        App.menuOpened = true;
                    }
                });

                tableRow.append($('<td>').append(detailsButton));

                table.append(tableRow);
            })

            bodyField.append(table);
            output.append(bodyField);

        });
        App.outputField.append(output);
    }
    
}

App.outputDeepSpaceObjects = (objects) => {
    /*
        This function processes the returned objects based on the user search criteria and formats them as a table, which is in it's entirety then rendered on the page.
    */
    if(objects.length === 0) {
        sweetalert2.fire({
            title: 'No objects found',
            text: 'Try a different search term',
            icon: 'error'
        })
    } else {
        const output = $('<div>').addClass('output-deep-space');

        let table = $('<table>');
        table.append($(`<tr>
            <th>Name</th>
            <th>Type</th>
            <th>Sub Type</th>
            <th>Constellation</th>
            <th>Right Ascension</th>
            <th>Declination</th>
            </tr>`));


        
        objects.forEach(object => {
            let tableRow = $('<tr></tr>');
            
            tableRow.append($(`<td>${object.name}</td>`));
            tableRow.append($(`<td>${object.type.name}</td>`));
            tableRow.append($(`<td>${object.subType.name}</td>`));
            tableRow.append($(`<td>${object.position.constellation.name}</td>`));
            tableRow.append($(`<td>${object.position.equatorial.rightAscension.string}</td>`));
            tableRow.append($(`<td>${object.position.equatorial.declination.string}</td>`));

            table.append(tableRow);
        });

        output.append(table);
        App.outputField.append(output);
    }
}

// functions for communicating with API

App.getBodyPositions = async function (longitude, latitude, elevation, from, to, time) {
    /*
        Function to get the body observation data.
    */
    longitude = longitude.trim();
    latitude = longitude.trim();
    try {
    const bodiesData = await fetch(
      `https://api.astronomyapi.com/api/v2/bodies/positions?longitude=${longitude}&latitude=${latitude}&elevation=${elevation}&from_date=${from}&to_date=${to}&time=${time}&output=rows`, {
          method: 'GET',
          headers: {
            'Authorization': `Basic ${App.authString}`
          }
      }
    );
    if (!bodiesData.ok) throw new Error('Failed to get data!');
    const bodies = await bodiesData.json();
    //console.log(bodies);
    App.hideLoading();
    App.outputBodies(bodies.data)
  } catch (err) {
    App.hideLoading();
    sweetalert2.fire({
        title: 'Something went wrong!',
        text: `${err.message}`,
        icon: 'error',
    });
  }

};
    

App.getDeepSpaceObject = async function (term, type) {
    /*
        Function to get the deep space object and/or star data.
    */
    term = term.trim()
    try {
        const deepObjectsData = await fetch(
          `https://api.astronomyapi.com/api/v2/search?term=${term}&type=${type}`, {
              method: 'GET',
              headers: {
                'Authorization': `Basic ${App.authString}`
              }
          }
        );
        if (!deepObjectsData.ok) throw new Error('Failed to get data!');
        const objects = await deepObjectsData.json();
        App.hideLoading();
        App.outputDeepSpaceObjects(objects.data);
      } catch (err) {
        App.hideLoading();
        sweetalert2.fire({
            title: 'Something went wrong!',
            text: `${err.message}`,
            icon: 'error',
        });
      }
};

// functions for populating the individual popup menus with initial content (forms)

(function createObjectsPopup() {

    const objectForm = $('<form>').addClass('object-form');

    let inputWrapper = $('<div>').addClass('object-inputWrap');

    inputWrapper.append($('<label>').attr('for', 'object-latitude').text('Your latitude:'));
    const latitudeInput = $('<input>').attr( {type: 'text', id: 'object-latitude', name: 'object-latitude'} );
    inputWrapper.append(latitudeInput);
    objectForm.append(inputWrapper);


    inputWrapper = $('<div>').addClass('object-inputWrap');
    inputWrapper.append($('<label>').attr('for', 'object-longitude').text('Your longitude:'));
    const longitudeInput = $('<input>').attr( {type: 'text', id: 'object-longitude', name: 'object-longitude'} );
    inputWrapper.append(longitudeInput);
    objectForm.append(inputWrapper);

    inputWrapper = $('<div>').addClass('object-inputWrap');
    inputWrapper.append($('<label>').attr('for', 'object-elevation').text('Your elevation:'));
    const elevationInput = $('<input>').attr( {type: 'number', id: 'object-elevation', name: 'object-elevation'} ); 
    inputWrapper.append(elevationInput);
    objectForm.append(inputWrapper);

    inputWrapper = $('<div>').addClass('object-inputWrap');
    inputWrapper.append($('<label>').attr('for', 'object-fromDate').text('From date:'));
    const fromDateInput = $('<input>').attr( {type: 'date', id: 'object-fromDate', name: 'object-fromDate'} );
    inputWrapper.append(fromDateInput);
    objectForm.append(inputWrapper);

    inputWrapper = $('<div>').addClass('object-inputWrap');
    inputWrapper.append($('<label>').attr('for', 'object-toDate').text('To date:'));
    const toDateInput = $('<input>').attr( {type: 'date', id: 'object-toDate', name: 'object-toDate'} );
    inputWrapper.append(toDateInput);
    objectForm.append(inputWrapper);

    inputWrapper = $('<div>').addClass('object-inputWrap');
    inputWrapper.append($('<label>').attr('for', 'object-time').text('Time of observation:'));
    const timeInput = $('<input>').attr( {type: 'time', id: 'object-time', name: 'object-time', step: '1'} );
    inputWrapper.append(timeInput);
    objectForm.append(inputWrapper);
    
    $('.objects-popup .popup-content').append(objectForm);
    App.objectsPopupElem = $('.objects-popup');

    App.latitudeElem = $('#object-latitude');
    App.longitudeElem = $('#object-longitude');
    App.elevationElem = $('#object-elevation');
    App.fromDateElem = $('#object-fromDate');
    App.toDateElem = $('#object-toDate');
    App.timeElem = $('#object-time');

})();

(function createDeepSpacePopup() {
        const deepSpaceForm = $('<form>').addClass('deep-form');
        let inputWrapper = $('<div>').addClass('deep-inputWrap');

        inputWrapper.append($('<label>').attr('for', 'deep-term').text('Search term:'));
        const termInput = $('<input>').attr( {type: 'text', id: 'deep-term', name: 'deep-term'} );
        inputWrapper.append(termInput);
        deepSpaceForm.append(inputWrapper);

        inputWrapper = $('<div>').addClass('deep-inputWrap');
        inputWrapper.append($('<label>').attr('for', 'deep-type').text('Match type:'));
        const typeInput = $('<select>').attr( {id: 'deep-type', name: 'deep-type'} );
        typeInput.append($('<option>').attr('value', 'fuzzy').text('Fuzzy'));
        typeInput.append($('<option>').attr('value', 'exact').text('Exact'));
        inputWrapper.append(typeInput);
        deepSpaceForm.append(inputWrapper);
        
        $('.deep-popup .popup-content').append(deepSpaceForm);
        App.deepPopupElem = $('.deep-popup');

        App.termElem = $('#deep-term');
        App.typeElem = $('#deep-type');
 })();


// functions for showing/closing of the individual menus

App.menuOpened = false;

$('.button-usage').click(function() {
    if(App.menuOpened === false) {
        $('.usage-popup').css('display','block');
        App.menuOpened = true;
    }
});

$('.button-objects').click(function() {
    if(App.menuOpened === false) {
        App.objectsPopupElem.css('display','block');
        App.menuOpened = true;
    }
});

$('.button-deep').click(function() {
    if(App.menuOpened === false) {
        App.deepPopupElem.css('display','block');
        App.menuOpened = true;
    }
});

$('.button-terms').click(function() {
    if(App.menuOpened === false) {
        $('.terms-popup').css('display','block');
        App.menuOpened = true;
    }
});

$('.close-button').click(function() {
    $(this).parents('.popup').css('display', 'none');
    App.menuOpened = false;
});

$('.autofill-button').click(function() {
    App.useGPS(App.latitudeElem, App.longitudeElem, App.elevationElem);
});

$('.object-submit-button').click(function() {
    if(
        App.checkInput(App.longitudeElem.val(), App.latitudeElem.val(), App.elevationElem.val(), App.fromDateElem.val(), App.toDateElem.val(), App.timeElem.val())
        ) {;
        App.outputField.empty();
        App.objectsPopupElem.css('display', 'none');
        App.menuOpened = false;
        App.showLoading();
        App.getBodyPositions(App.longitudeElem.val(), App.latitudeElem.val(), App.elevationElem.val(), App.fromDateElem.val(), App.toDateElem.val(), App.timeElem.val());
    }
});

$('.deep-submit-button').click(function() {
    if($('#deep-term').val().length === 0) {
        sweetalert2.fire({
            text: 'Please fill the search term',
            icon: 'error',
        });
    }
    else {
        App.outputField.empty();
        App.deepPopupElem.css('display', 'none');
            App.menuOpened = false;
            App.showLoading();
            App.getDeepSpaceObject(App.termElem.val(), App.typeElem.val());
    }
});




