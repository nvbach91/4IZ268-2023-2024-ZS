const App = {};

App.applicationID = '5500fad7-8ec6-427c-b175-93eb33660414';
App.applicationSecret = 'a6cd4dad16c91b700a881695552e19a3e023244a178f63eb61d92aae8556c4f595b0d10ad6ab88a5f989e4797cd28a50d91ee1f1ef9844e32a209da35dbfc09fade0b373940dec5915964c905bd9bd9352e36431038497a4799d8a5fdf8909a24f867849ed52c9feaf53b98abf06f825';
// function to handle autofill of GPS coordinates using geolocation API
App.authString = btoa(`${App.applicationID}:${App.applicationSecret}`);


App.loadingIcon = $(`<div>
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                    </div>`).addClass('loading-icon');
App.outputField = $('.outputs-field');
App.main = $('main');
App.usagePopup = $('.usage-popup');
App.termsPopup = $('.terms-popup');

App.usageButton = $('.button-usage');
App.objectsButton = $('.button-objects');
App.deepButton = $('.button-deep');
App.termsButton = $('.button-terms');
App.closeButton = $('.close-button');
App.autofillButton = $('.autofill-button');


App.showLoading = () => {
    App.main.append(App.loadingIcon);
};

App.hideLoading = () => {
    App.loadingIcon.remove();
};

App.formatDate = (date) => {
    const dateArray = date.split('T');
    const splitDate = dateArray[0].split('-');
    dateArray[0] = splitDate[0] + '-' + splitDate[1] + '-' + splitDate[2];

    return dateArray;
}

App.createDetailsPopup = (pos, name, date) => {
    /*
        This function creates modal with additional info for each observation of each displayed object.
    */
    const detailsPopupContent = $('<div>').addClass('popup-content');

    detailsPopupContent.append($(`<h2>${name}</h2>`));
    detailsPopupContent.append($(`<h2>Date: ${date[0]}</h2>`));
    detailsPopupContent.append($(`<h2>Time and timezone: ${date[1]}</h2>`));

    const table = $('<table>');
    const distanceRow = $('<tr>');

    distanceRow.append('<th>Distance from Earth</th>')
    distanceRow.append(`<td>${pos.distance.fromEarth.km}` + ' km</td>');
    table.append(distanceRow)

    const magnitudeRow = $('<tr>');
    magnitudeRow.append('<th>Apparent magnitude</th>')
    magnitudeRow.append(`<td>${pos.extraInfo.magnitude}</td>`);
    table.append(magnitudeRow);

    const altitudeRow = $('<tr>');
    altitudeRow.append('<th>Horizontal: altitude</th>')
    altitudeRow.append(`<td>${pos.position.horizontal.altitude.string}</td>`);
    table.append(altitudeRow);

    const azimuthRow = $('<tr>');
    azimuthRow.append('<th>Horizontal: azimuth</th>')
    azimuthRow.append(`<td>${pos.position.horizontal.azimuth.string}</td>`);
    table.append(azimuthRow);

    const ascensionRow = $('<tr>');
    ascensionRow.append('<th>Equatorial: right ascension</th>')
    ascensionRow.append(`<td>${pos.position.equatorial.rightAscension.string}</td>`);
    table.append(ascensionRow);

    const declinationRow = $('<tr>');
    declinationRow.append('<th>Equatorial: declination</th>')
    declinationRow.append(`<td>${pos.position.equatorial.declination.string}</td>`);
    table.append(declinationRow);

    detailsPopupContent.append(table);

    Swal.fire({
        title: 'Further observation information.',
        icon: 'info',
        html: $(detailsPopupContent),
        width: '60%',
    });
}

App.checkInput = (longitude, latitude, elevation, from, to, time) => {
    /*
        This function makes relevant checks on the validity of the submited form for searching for bodies before the app attempts to fetch the data-
    */
    longitude = longitude.trim();
    latitude = longitude.trim();

    if (!longitude.length || !latitude.length || !elevation.length || !from.length || !to.length || !time.length) {
        Swal.fire({
            text: 'Please fill all input fields.',
            icon: 'error',
        });
        return false;
    } else if (/^-?([0-8]?[0-9]|90)(\.[0-9]{1,10})?$/.test(longitude) === false) {
        Swal.fire({
            text: 'Wrong longitude format',
            icon: 'error',
        });
        return false
    } else if (/^-?([0-9]{1,2}|1[0-7][0-9]|180)(\.[0-9]{1,10})?$/.test(latitude) === false) {
        Swal.fire({
            text: 'Wrong latitude format',
            icon: 'error',
        });
        return false
    } else if (elevation < 0) {
        Swal.fire({
            text: 'Elevation must be at least 0',
            icon: 'error',
        });
        return false;
    } else if (from > to) {
        Swal.fire({
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
    function success(position) {
        if (position.coords.latitude !== null) {
            latitude.val(position.coords.latitude);
        }
        if (position.coords.longitude !== null) {
            longitude.val(position.coords.longitude);
        }
        if (position.coords.elevation !== null) {
            elevation.val(position.coords.elevation)
        }
    };
    //coords > altitude, latitude, longitude
    function error(error) {
        Swal.fire({
            text: 'You have not given permission to the browser to access your location.',
            icon: 'error',
        });
    }
    if ('geolocation' in navigator) {
        navigator.geolocation.getCurrentPosition(success, error);
    } else {
        Swal.fire({
            text: 'Geolocation API is not available',
            icon: 'error',
        });
    }
}


App.outputBodies = (bodies) => {
    /*
        This function processes the data about solar system bodies and their position in each day of observation, creates "card" for each of them and finaly adds the entirety of the output to the output_field on the webpage.
    */
    if (bodies.length === 0) {
        Swal.fire({
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
                let detailsButton = $('<button>').text('Details').addClass('details-button button').click(function () {
                    if (App.menuOpened === false) {
                        App.createDetailsPopup(pos, body.body.name, date);
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

App.crossIdentPopup = (crossIdentification) => {
    const detailsPopupContent = $('<div>').addClass('popup-content');

    const altnNameTable = $('<table>');
    const tableHeader = $('<tr><th>Source catalog</th><th>Name</th></tr>');
    altnNameTable.append(tableHeader);

    crossIdentification.forEach(identification => {
        const tableRow = $('<tr>');
        if (!identification.catalogId) {
            tableRow.append($('<td>N/A</td>'))
        }
        else {
            tableRow.append($(`<td>${identification.catalogId}</td>`));
        }
        tableRow.append($(`<td>${identification.name}</td>`));
        altnNameTable.append(tableRow);
    });
    detailsPopupContent.append(altnNameTable)

    Swal.fire({
        title: 'Alternative object names',
        text: 'Bellow are alternative names for the object in different source stellar catalogues',
        icon: 'info',
        html: $(detailsPopupContent),
    });
}

App.outputDeepSpaceObjects = (objects) => {
    /*
        This function processes the returned objects based on the user search criteria and formats them as a table, which is in it's entirety then rendered on the page.
    */
    if (objects.length === 0) {
        Swal.fire({
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
            const tableRow = $('<tr></tr>');

            if (!object.crossIdentification) {
                tableRow.append($(`<td>${object.name}</td>`));
            }
            else {
                const detailsButton = $('<button>').text(`${object.name}`).addClass('details-button button').click(function () {
                    if (App.menuOpened === false) {
                        App.crossIdentPopup(object.crossIdentification);
                    }
                });
                tableRow.append($('<td>').append(detailsButton));
            }
            tableRow.append($(`<td>${object.type.name}</td>`));
            tableRow.append($(`<td>${object.subType.name}</td>`));
            tableRow.append($(`<td>${object.position.constellation.name}</td>`));
            tableRow.append($(`<td>${object.position.equatorial.rightAscension.string}</td>`));
            tableRow.append($(`<td>${object.position.equatorial.declination.string.replace('Â°', `&deg;`)}</td>`));

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
        Swal.fire({
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
        Swal.fire({
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
    const latitudeInput = $('<input>').attr({ type: 'text', id: 'object-latitude', name: 'object-latitude' });
    inputWrapper.append(latitudeInput);
    objectForm.append(inputWrapper);


    inputWrapper = $('<div>').addClass('object-inputWrap');
    inputWrapper.append($('<label>').attr('for', 'object-longitude').text('Your longitude:'));
    const longitudeInput = $('<input>').attr({ type: 'text', id: 'object-longitude', name: 'object-longitude' });
    inputWrapper.append(longitudeInput);
    objectForm.append(inputWrapper);

    inputWrapper = $('<div>').addClass('object-inputWrap');
    inputWrapper.append($('<label>').attr('for', 'object-elevation').text('Your elevation:'));
    const elevationInput = $('<input>').attr({ type: 'number', id: 'object-elevation', name: 'object-elevation' });
    inputWrapper.append(elevationInput);
    objectForm.append(inputWrapper);

    inputWrapper = $('<div>').addClass('object-inputWrap');
    inputWrapper.append($('<label>').attr('for', 'object-fromDate').text('From date:'));
    const fromDateInput = $('<input>').attr({ type: 'date', id: 'object-fromDate', name: 'object-fromDate' });
    inputWrapper.append(fromDateInput);
    objectForm.append(inputWrapper);

    inputWrapper = $('<div>').addClass('object-inputWrap');
    inputWrapper.append($('<label>').attr('for', 'object-toDate').text('To date:'));
    const toDateInput = $('<input>').attr({ type: 'date', id: 'object-toDate', name: 'object-toDate' });
    inputWrapper.append(toDateInput);
    objectForm.append(inputWrapper);

    inputWrapper = $('<div>').addClass('object-inputWrap');
    inputWrapper.append($('<label>').attr('for', 'object-time').text('Time of observation:'));
    const timeInput = $('<input>').attr({ type: 'time', id: 'object-time', name: 'object-time', step: '1' });
    inputWrapper.append(timeInput);
    objectForm.append(inputWrapper);

    const submitButton = $('<input>').attr({ type: 'submit' }).addClass('button');
    objectForm.append(submitButton);

    objectForm.on('submit', function (e) {
        e.preventDefault();
        if (
            App.checkInput(App.longitudeElem.val(), App.latitudeElem.val(), App.elevationElem.val(), App.fromDateElem.val(), App.toDateElem.val(), App.timeElem.val())
        ) {
            ;
            App.outputField.empty();
            App.objectsPopupElem.hide();
            App.menuOpened = false;
            App.showLoading();
            App.getBodyPositions(App.longitudeElem.val(), App.latitudeElem.val(), App.elevationElem.val(), App.fromDateElem.val(), App.toDateElem.val(), App.timeElem.val());
        }
    })
    App.objectsPopupContentElem = $('.objects-popup .popup-content');
    App.objectsPopupContentElem.append(objectForm);
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
    const termInput = $('<input>').attr({ type: 'text', id: 'deep-term', name: 'deep-term' });
    inputWrapper.append(termInput);
    deepSpaceForm.append(inputWrapper);

    inputWrapper = $('<div>').addClass('deep-inputWrap');
    inputWrapper.append($('<label>').attr('for', 'deep-type').text('Match type:'));
    const typeInput = $('<select>').attr({ id: 'deep-type', name: 'deep-type' });
    typeInput.append($('<option>').attr('value', 'fuzzy').text('Fuzzy'));
    typeInput.append($('<option>').attr('value', 'exact').text('Exact'));
    inputWrapper.append(typeInput);
    deepSpaceForm.append(inputWrapper);

    const submitButton = $('<input>').attr({ type: 'submit' }).addClass('button');
    deepSpaceForm.append(submitButton)

    deepSpaceForm.on('submit', function (e) {
        e.preventDefault();
        if (App.termElem.val().length === 0) {
            Swal.fire({
                text: 'Please fill the search term',
                icon: 'error',
            });
        }
        else {
            App.outputField.empty();
            App.deepPopupElem.hide();
            App.menuOpened = false;
            App.showLoading();
            App.getDeepSpaceObject(App.termElem.val(), App.typeElem.val());
        }
    })
    App.deepPopupContentElem = $('.deep-popup .popup-content');
    App.deepPopupContentElem.append(deepSpaceForm);
    App.deepPopupElem = $('.deep-popup');
    App.termElem = $('#deep-term');
    App.typeElem = $('#deep-type');
})();

App.showUsage = () => {
    const usagePopupContent = $('<div>').addClass('popup-content');
    usagePopupContent.append(`
        <h3>Solar system bodies information</h3>
        <p>
            This app function serves as a basic tool for both amateur and profesional astronomers to know where
            to look for major celestials bodies on the nightsky. By clicking on the 'Major bodies' button, you
            will be asked to submit information necessary in search for major celestial bodies of our solar
            system:
        </p>
        <ul>
            <li><strong>Longitude:</strong> your longitude geographic coordinates.</li>
            <li><strong>Latitude:</strong> your latitude geographic coodinates.</li>
            <li><strong>Elevation:</strong> your position in meters above sea level (0 is minimum).</li>
            <li><strong>From date:</strong> starting day from which you are expecting to observe the sky.</li>
            <li><strong>To date:</strong> last day to which you are expecting to observe the sky.</li>
            <li><strong>Time:</strong> time of observation for each day.</li>
        </ul>
        <p>
            You can use the 'use current location' button to fill the coordinates automatically (if
            geolocationAPI is available in your browser).
        </p>
        <p>
            Once you submit the form, cards containing celestial body and the constellation it's located in each
            day will be displayed. You may click on the 'details' button to display additional observation data
            for each day.
        </p>
        <h3>Information about deep space objects</h3>
        <p>
            This app function serves the purpose of getting information about other starts and deep space
            objects. Click the 'Stars/Deep space objects' button to bring up the search form. Here you have to
            either submit the name of the object, or it's coordinates. See Term definition for more information.
        </p>
    `)
    Swal.fire({
        title: 'Terms to know',
        icon: 'info',
        html: $(usagePopupContent),
        width: '80%',
    });
}

App.showTerminology = () => {
    const detailsPopupContent = $('<div>').addClass('popup-content');
    detailsPopupContent.append(`
        <p>
            <strong>Apparent magnitude =</strong> in astronomy, is a measure of the brightness of a star or other
            celestial body. The brighter the object, the lower the number assigned as a magnitude. Apparent
            magnitude is the brightness of an object as it appears to an observer on Earth. The Sun's apparent
            magnitude is -26.7, that of the full Moon is about -11, and that of the bright star Sirius, -1.5.
            The faintest objects visible through the Hubble Space Telescope are of (approximately) apparent
            magnitude 30.
        </p>
        <p>
            <strong>Altitude =</strong> angular expression of a distance of the object from horizon, measured
            along a vertical circle. For example, if Saturn has altitude of 36°, it there is a 36° vertical
            angle between you, horizon and Saturn.
        </p>
        <p>
            <strong>Azimuth =</strong> angular expression of a distance of the object along horizon from North
            eastwards to vetical circle through object (in southern hemisphere, it's South eastwards). For
            example, if Saturn has an azimuth of 270°, it's directly West. Compasses usually display azimuth as
            well.
        </p>
        <p>
            <strong>Right ascension (RA) =</strong> the celestial equivalent of longitude. RA can be expressed in
            degrees, but it is more common to specify it in hours, minutes, and seconds of time: the sky appears
            to turn 360° in 24 hours, or 15° in one hour. So an hour of RA equals 15° of sky rotation.
        </p>
        <p>
            <strong>Declination (DEC) =</strong> the celestial sphere's equivalent of latitude and it is
            expressed in degrees, as is latitude. For DEC, + and - refer to north and south, respectively. The
            celestial equator is 0° DEC, and the poles are +90° and -90°.
        </p>
    `
    )
    Swal.fire({
        title: 'Terms to know',
        icon: 'info',
        html: $(detailsPopupContent),
        width: '80%',
    });
}
// functions for showing/closing of the individual menus

App.menuOpened = false;

App.usageButton.click(function () {
    App.showUsage();
});

App.objectsButton.click(function () {
    if (App.menuOpened === false) {
        App.objectsPopupElem.show();
        App.menuOpened = true;
    }
});

App.deepButton.click(function () {
    if (App.menuOpened === false) {
        App.deepPopupElem.show();
        App.menuOpened = true;
    }
});

App.termsButton.click(function () {
    App.showTerminology();
});

App.closeButton.click(function () {
    $(this).parents('.popup').hide();
    App.menuOpened = false;
});

App.autofillButton.click(function () {
    App.useGPS(App.latitudeElem, App.longitudeElem, App.elevationElem);
});




