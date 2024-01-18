function buildWeatherApp() {
    createAppLoadingScreen();
    showAppLoadingScreen();

    window.addEventListener('popstate', (event) => {
        if (event.state) {
            const city = {name: event.state.city};
            const contentType = event.state.contentType;

            selectAndDisplayCity(city, contentType);
        }
    });

    function createElement(tag, {id = '', classes = [], text = '', attributes = {}}) {
        const element = document.createElement(tag);
        if (id) {
            element.id = id;
        }
        classes.forEach(cls => element.classList.add(cls));

        if (text) {
            const textNode = document.createTextNode(text);
            element.appendChild(textNode);
        }
        Object.entries(attributes).forEach(([attr, value]) => element.setAttribute(attr, value));

        return element;
    }

    function createCookieConsentDialog() {
        const consentCookie = getCookie('cookieConsent');
        if (consentCookie !== 'true') {
            const overlay = createElement('div', {id: 'cookie-consent-overlay', classes: ['overlay']});
            const dialog = createElement('div', {classes: ['dialog']});
            const dialogBody = createElement('div', {classes: ['dialog-body']});
            const consentText = createElement('p', {text: 'We use cookies to enhance your experience. By continuing to visit this site you agree to our use of cookies.'});
            const agreeButton = createElement('button', {
                id: 'agree-button', classes: ['default-button'], text: 'Agree'
            });

            agreeButton.addEventListener('click', function () {
                setCookie('cookieConsent', 'true', 365);
                document.getElementById('cookie-consent-overlay').remove();
            });

            dialogBody.appendChild(consentText);
            dialogBody.appendChild(agreeButton);
            dialog.appendChild(dialogBody);
            overlay.appendChild(dialog);
            document.body.appendChild(overlay);
        }
    }


    //ICONS
    let iconPerson = '<i class="bi bi-person-fill"></i>';
    let iconGeo = '<i class="bi bi-geo-fill"></i>';
    let iconEnvelope = '<i class="bi bi-envelope-fill"></i>';
    let iconLink = '<i class="bi bi-link-45deg"></i>';
    let iconPeople = '<i class="bi bi-person-heart"></i>';
    let iconPlus = '<i class="bi bi-plus-circle"></i>';
    let iconLeft = '<i class="bi bi-caret-left-square"></i>';
    let iconRight = '<i class="bi bi-caret-right-square"></i>';
    let iconCity = '<i class="bi bi-buildings"></i>';
    let iconInfo = '<i class="bi bi-info-circle-fill"></i>';
    let iconMinus = '<i class="bi bi-dash-circle"></i>';
    let iconApprove = '<i class="bi bi-check-circle-fill"></i>';
    let iconSave = '<i class="bi bi-save-fill"></i>';
    let iconSearch = '<i class="bi bi-search"></i>';
    let iconMapPinFull = '<i class="bi bi-pin-map-fill"></i>';
    let iconMapPin = '<i class="bi bi-pin-map"></i>';
    let iconPinFull = '<i class="bi bi-pin-fill"></i>';
    let iconPin = '<i class="bi bi-pin"></i>';
    let iconCalendar = '<i class="bi bi-calendar3"></i>';
    let iconClock = '<i class="bi bi-clock"></i>';
    let iconWind = '<i class="bi bi-wind"></i>';
    let iconHumidity = '<i class="bi bi-droplet-half"></i>';
    let iconTemperature = '<i class="bi bi-thermometer-half"></i>';


    let resultsContainer;
    let searchInput;
    let mainContent;
    let noCitiesFound;

    let currentCityIndex = 0;
    let currentContentType = 'weather';


    function buildWeatherAppStructure() {

        createCookieConsentDialog();

        savedCities = getCitiesFromCookie();


        const appContainer = createElement('div', {id: 'app-container', classes: ['app-container']});

        const addCityButton = createElement('button', {
            id: 'add-city-btn', classes: ['nav-button', 'add-city-btn'], attributes: {'aria-label': 'Add City'}
        });
        addCityButton.innerHTML = `${iconPlus} Add City`;

        const header = createElement('header', {id: 'app-header', classes: ['app-header']});

        const cityNavigation = createElement('div', {id: 'city-navigation', classes: ['city-navigation']});

        const prevCityButton = createElement('button', {
            id: 'prev-city-btn', classes: ['nav-button'], attributes: {'aria-label': 'Previous City'}
        });
        prevCityButton.innerHTML = iconLeft;

        const selectedCityButton = createElement('button', {
            id: 'selected-city-btn',
            classes: ['nav-button', 'selected-city-button'],
            text: 'SELECT CITY',
            attributes: {'aria-label': 'Selected City'}
        });
        selectedCityButton.addEventListener('click', createSavedCitiesDialog);

        const nextCityButton = createElement('button', {
            id: 'next-city-btn', classes: ['nav-button'], attributes: {'aria-label': 'Next City'}
        });
        nextCityButton.innerHTML = iconRight;

        cityNavigation.appendChild(prevCityButton);
        cityNavigation.appendChild(selectedCityButton);
        cityNavigation.appendChild(nextCityButton);


        const eventButton = createElement('button', {
            id: 'event-btn', classes: ['nav-button'], text: 'EVENTS', attributes: {'aria-label': 'Events'}
        });

        const weatherButton = createElement('button', {
            id: 'weather-btn', classes: ['nav-button'], text: 'WEATHER', attributes: {'aria-label': 'Weather'}
        });

        const navList = createElement('ul', {id: 'nav-list', classes: ['nav-list']});

        navList.appendChild(weatherButton);
        navList.appendChild(eventButton);


        mainContent = createElement('main', {
            id: 'content', classes: ['content'], text: 'CONTENT'
        });

        const footer = createElement('footer', {id: 'app-footer', classes: ['app-footer']});
        const footerContent = createElement('div', {
            id: 'footer-content', classes: ['footer-content'], text: 'v0.1 - by Adacine2'
        });
        const logoFooter = createElement('div', {id: 'logo-footer', classes: ['logo-footer']});
        const logoImage = createElement('img', {id: 'logo-image', classes: ['logo-image']});
        logoImage.src = './resources/img/weather_app_logo_BG.png';
        logoImage.alt = 'Logo of Weather App';

        logoFooter.appendChild(logoImage);

        const documentationButton = createElement('button', {
            id: 'documentation-btn', classes: ['documentation', 'nav-button'], text: 'DOCUMENTATION',
        });

        addCityButton.addEventListener('click', onAddCityClick);
        prevCityButton.addEventListener('click', onPrevCityClick);
        nextCityButton.addEventListener('click', onNextCityClick);
        weatherButton.addEventListener('click', onWeatherClick);
        eventButton.addEventListener('click', onEventClick);
        documentationButton.addEventListener('click', onDocumentationClick);


        // DOM implementation
        header.appendChild(navList);
        header.appendChild(cityNavigation);
        header.appendChild(addCityButton);
        footer.appendChild(logoFooter);
        footer.appendChild(footerContent);
        footer.appendChild(documentationButton);

        appContainer.appendChild(header);
        appContainer.appendChild(mainContent);
        appContainer.appendChild(footer);

        document.body.appendChild(appContainer);
    }

    function manipulateContent(state) {
        const mainContent = document.getElementById('content');
        mainContent.innerHTML = '';
        if (state === 'loading') {
            const loadingSpinner = createElement('div', {classes: ['spinner']});
            mainContent.appendChild(loadingSpinner);
        }
        const defaultContent = createElement('div', {id: 'default-content', classes: ['default-content']});
        mainContent.appendChild(defaultContent);
        if (state === 'default') {
            const defaultText = createElement('p', {text: 'Add City to see weather or events.'});
            defaultContent.appendChild(defaultText);
            const defaultButton = createElement('button', {
                id: 'default-button', classes: ['default-button'], attributes: {'aria-label': 'Add City'}
            });
            defaultButton.innerHTML = `${iconPlus} Add City`;
            defaultButton.addEventListener('click', onAddCityClick);
            defaultContent.appendChild(defaultButton);
        }
        if (state === 'error') {
            const errorText = createElement('p', {text: 'Error loading data.'});
            defaultContent.appendChild(errorText);
            const defaultButton = createElement('button', {
                id: 'default-button', classes: ['switch-button'], attributes: {'aria-label': 'Add City'}
            });
            defaultButton.innerHTML = `Switch to Weather`;
            defaultButton.addEventListener('click', onWeatherClick);
            defaultContent.appendChild(defaultButton);

            const errorButton = createElement('button', {
                id: 'error-select-button', classes: ['default-button'], attributes: {'aria-label': 'Select City'}
            });
            errorButton.innerHTML = `Select Other Cities`;
            errorButton.addEventListener('click', createSavedCitiesDialog);
            defaultContent.appendChild(errorButton);
        }
    }


    function documentationDialog() {
        const overlay = createElement('div', {id: 'documentation-overlay', classes: ['overlay']});
        overlay.addEventListener('click', function (event) {
            if (event.target === overlay) {
                closeDocumentationDialog();
            }
        });
        overlay.addEventListener('keydown', function (event) {
            if (event.key === 'Escape') {
                event.preventDefault();
                closeDocumentationDialog();
            }
        });

        const dialog = createElement('div', {classes: ['dialog', 'documentation-dialog']});

        const dialogHeader = createElement('div', {classes: ['dialog-header']});
        dialog.appendChild(dialogHeader);

        const dialogBody = createElement('div', {classes: ['dialog-body', 'documentation-body']});
        dialog.appendChild(dialogBody);


        /*******HEADER********/
        const closeButton = createElement('button', {classes: ['close-button'], text: 'X'});
        dialogHeader.appendChild(closeButton);

        closeButton.onclick = closeDocumentationDialog;

        const title = createElement('h2', {classes: ['dialog-title'], text: 'Documentation'});
        dialogHeader.appendChild(title);

        const subtitle = createElement('h3', {classes: ['dialog-subtitle']});
        dialogHeader.appendChild(subtitle);


        /*******BODY********/
        const documentationContainer = createElement('div', {classes: ['documentation-container']});
        dialogBody.appendChild(documentationContainer);

        const documentationText = createElement('p', {text: 'This is a weather app that shows the weather and events for a city. You can add cities to your list of saved cities and switch between them. You can also switch between weather and events for a city.'});
        documentationContainer.appendChild(documentationText);

        const documentationText2 = createElement('p', {id: 'documentation-text-2'});
        documentationText2.innerHTML = '<b>The app uses the following APIs:</b><br> https://api.api-ninjas.com/v1/city;<br> https://app.ticketmaster.com/discovery/v2/events;<br> https://api.openweathermap.org/data/2.5/;<br> https://en.wikipedia.org/api/rest_v1/page/summary/';
        documentationContainer.appendChild(documentationText2);

        overlay.appendChild(dialog);
        document.body.appendChild(overlay);
    }


    function createSearchCityDialog() {
        const overlay = createElement('div', {id: 'search-city-overlay', classes: ['overlay']});

        overlay.addEventListener('click', function (event) {
            if (event.target === overlay) {
                closeSearchCityDialog();
            }
        });
        overlay.addEventListener('keydown', function (event) {
            if (event.key === 'Escape') {
                event.preventDefault();
                closeSearchCityDialog();
            }
        });

        const dialog = document.createElement('div');
        dialog.classList.add('dialog');

        const dialogHeader = document.createElement('div');
        dialogHeader.classList.add('dialog-header');
        dialog.appendChild(dialogHeader);

        const dialogBody = document.createElement('div');
        dialogBody.classList.add('dialog-body');
        dialog.appendChild(dialogBody);


        /*******HEADER********/
        const closeButton = document.createElement('button');
        closeButton.textContent = 'X';
        closeButton.classList.add('close-button');
        dialogHeader.appendChild(closeButton);

        closeButton.onclick = closeSearchCityDialog;

        const title = document.createElement('h2');
        title.textContent = 'Look up cities';
        dialogHeader.appendChild(title);

        const subtitle = document.createElement('h3');
        dialogHeader.appendChild(subtitle);


        /*******BODY********/
        searchInput = createElement('input', {id: 'search-input', classes: ['search-input']});
        searchInput.type = 'text';
        searchInput.placeholder = 'Enter city name';
        dialogBody.appendChild(searchInput);

        searchInput.addEventListener('keypress', function (event) {
            if (event.key === 'Enter') {
                event.preventDefault();
                searchCities(searchInput.value);
            }
        });

        const searchButton = document.createElement('button');
        searchButton.innerHTML = `${iconSearch}`;
        searchButton.setAttribute('aria-label', 'Search');
        searchButton.onclick = () => searchCities(searchInput.value);
        searchButton.classList.add('search-button');
        dialogBody.appendChild(searchButton);

        noCitiesFound = document.createElement('div');
        noCitiesFound.textContent = '';
        noCitiesFound.classList.add('no-cities-found');

        resultsContainer = document.createElement('div');
        resultsContainer.appendChild(noCitiesFound);
        dialog.appendChild(resultsContainer);

        overlay.appendChild(dialog);
        document.body.appendChild(overlay);
        searchInput.focus();
    }


    let lookedUpCities = [];
    let savedCities = [];


    function searchCities(query) {
        fetchCitiesByQuery(query, function (result) {
            if (result && result.length > 0) {
                noCitiesFound.textContent = '';
                updateSearchResults(result);
            } else {
                if (noCitiesFound) {
                    noCitiesFound.textContent = 'No cities found.';
                }
            }
        }, function (jqXHR) {
            console.error('Error: ', jqXHR.responseText);
        });
    }


    function updateSearchResults(cities) {
        const existingResults = document.querySelector('.search-results');
        if (existingResults) {
            existingResults.remove();
        }

        resultsContainer.classList.add('search-results');

        cities.forEach(city => {
            if (!lookedUpCities.includes(city.name)) {
                lookedUpCities.push(city.name);

                const cityDiv = document.createElement('div');
                cityDiv.classList.add('city-result');

                const cityName = document.createElement('div');
                cityName.classList.add('city-name');

                cityName.innerHTML = `${iconCity}` + '  <span>' + city.name + '</span> (' + city.country + ')';

                const cityButtons = document.createElement('div');
                cityButtons.classList.add('city-buttons');

                const infoCityButton = document.createElement('button');
                infoCityButton.innerHTML = `${iconInfo} Info`;
                infoCityButton.classList.add('info-city-button');
                cityButtons.appendChild(infoCityButton);

                const saveCityButton = document.createElement('button');
                saveCityButton.innerHTML = `${iconPlus} Save`;
                saveCityButton.classList.add('save-city-button');
                cityButtons.appendChild(saveCityButton);
                saveCityButton.onclick = () => {
                    addCityToCookie({name: city.name, latitude: city.latitude, longitude: city.longitude});
                };

                cityDiv.appendChild(cityName);
                cityDiv.appendChild(cityButtons);
                resultsContainer.appendChild(cityDiv);

                infoCityButton.addEventListener('click', () => {
                    fetchCityInfoData(city.name)
                });
            }
            searchInput.value = '';
        });

        const dialog = document.querySelector('.dialog');
        dialog.appendChild(resultsContainer);
    }


    function addCityToCookie(cityData) {
        if (!savedCities.some(city => city.name === cityData.name)) {
            savedCities.push(cityData);
            const d = new Date();
            d.setTime(d.getTime() + (365 * 24 * 60 * 60 * 1000)); // 1 year
            const expires = "expires=" + d.toUTCString();
            document.cookie = `cities=${encodeURIComponent(JSON.stringify(savedCities))};${expires};path=/`;
        }
        currentCityIndex = savedCities.length - 1;
    }

    function getCitiesFromCookie() {
        const citiesCookie = document.cookie.split('; ').find(cookie => cookie.startsWith('cities='));
        if (citiesCookie) {
            const citiesData = citiesCookie.split('=')[1];
            try {
                return JSON.parse(decodeURIComponent(citiesData));
            } catch (e) {
                console.error('Error parsing cities from cookie:', e);
                return [];
            }
        }
        return [];
    }

    function removeCityFromCookie(cityName) {
        const isCurrentCity = savedCities[currentCityIndex] && savedCities[currentCityIndex].name === cityName;

        savedCities = savedCities.filter(city => city.name !== cityName);

        const d = new Date();
        d.setTime(d.getTime() + (365 * 24 * 60 * 60 * 1000));
        const expires = "expires=" + d.toUTCString();
        document.cookie = `cities=${encodeURIComponent(JSON.stringify(savedCities))};${expires};path=/`;

        if (isCurrentCity) {
            if (savedCities.length > 0) {
                if (currentCityIndex >= savedCities.length) {
                    currentCityIndex = 0;
                }
                selectAndDisplayCity(savedCities[currentCityIndex], currentContentType);
            } else {
                currentCityIndex = -1;
                updateSelectedCityButton("SELECT CITY");
            }
        }
        if (savedCities.length === 0) {
            currentCityIndex = -1;
            manipulateContent('default');
        }
        loadSavedCities(resultsContainer);
    }

    function updateSelectedCityButton(cityName) {
        const selectedCityButton = document.getElementById('selected-city-btn');
        if (selectedCityButton) {
            selectedCityButton.textContent = cityName;
        }
    }


    function createSavedCitiesDialog() {
        const overlay = createElement('div', {id: 'saved-cities-overlay', classes: ['overlay']});
        overlay.addEventListener('click', function (event) {
            if (event.target === overlay) {
                closeSavedCitiesDialog();
            }
        });
        overlay.addEventListener('keydown', function (event) {
            if (event.key === 'Escape') {
                event.preventDefault();
                closeSavedCitiesDialog();
            }
        });

        const dialog = createElement('div', {classes: ['dialog', 'saved-cities-dialog']});

        const dialogHeader = createElement('div', {classes: ['dialog-header']});
        dialog.appendChild(dialogHeader);

        const dialogBody = createElement('div', {classes: ['dialog-body']});
        dialog.appendChild(dialogBody);

        /*******HEADER********/
        const closeButton = createElement('button', {classes: ['close-button'], text: 'X'});
        closeButton.onclick = closeSavedCitiesDialog;
        dialogHeader.appendChild(closeButton);

        const title = createElement('h2', {classes: ['dialog-title'], text: 'Saved Cities'});
        dialogHeader.appendChild(title);

        const subtitle = createElement('h3', {classes: ['dialog-subtitle']});
        dialogHeader.appendChild(subtitle);

        /*******BODY********/
        resultsContainer = createElement('div', {classes: ['results-container']});
        dialogBody.appendChild(resultsContainer);

        overlay.appendChild(dialog);
        document.body.appendChild(overlay);

        loadSavedCities(resultsContainer);
    }


    function loadSavedCities(container) {
        const cities = getCitiesFromCookie();

        container.innerHTML = '';

        if (cities.length === 0) {
            const noCitiesMessage = document.createElement('p');
            noCitiesMessage.textContent = 'No cities saved.';
            container.appendChild(noCitiesMessage);
        } else {
            cities.forEach(city => {
                const cityDiv = document.createElement('div');
                cityDiv.classList.add('city-result');

                const cityName = document.createElement('div');
                cityName.classList.add('city-name');

                cityName.innerHTML = `${iconCity}` + '  <span>' + `${city.name}`;

                const cityButtons = document.createElement('div');
                cityButtons.classList.add('city-buttons');

                const selectCityButton = document.createElement('button');
                selectCityButton.innerHTML = `${iconApprove} Select`;
                selectCityButton.classList.add('select-city-button');
                selectCityButton.addEventListener('click', () => selectAndDisplayCity(city, currentContentType));
                selectCityButton.addEventListener('click', closeSavedCitiesDialog);
                cityButtons.appendChild(selectCityButton);

                const infoCityButton = document.createElement('button');
                infoCityButton.innerHTML = `${iconInfo} Info`;
                infoCityButton.classList.add('info-city-button');
                cityButtons.appendChild(infoCityButton);

                const removeCityButton = document.createElement('button');
                removeCityButton.innerHTML = `${iconMinus} Remove`;
                removeCityButton.classList.add('remove-city-button');
                removeCityButton.addEventListener('click', () => removeCityFromCookie(city.name));
                cityButtons.appendChild(removeCityButton);

                cityDiv.appendChild(cityName);
                cityDiv.appendChild(cityButtons);
                resultsContainer.appendChild(cityDiv);

                infoCityButton.addEventListener('click', () => {
                    fetchCityInfoData(city.name)
                });
            });
        }
    }


    /************* INFO CITY DIALOG *************/
    function createInfoCityDialog(cityName, htmlContent) {
        document.getElementsByClassName('overlay')[0].style.display = 'none';
        const overlay = createElement('div', {id: 'info-city-overlay', classes: ['overlay', 'info-overlay']});
        overlay.addEventListener('click', function (event) {
            if (event.target === overlay) {
                closeInfoCityDialog();
            }
        });
        overlay.addEventListener('keydown', function (event) {
            if (event.key === 'Escape') {
                event.preventDefault();
                closeSearchCityDialog();
            }
        });


        const dialog = createElement('div', {classes: ['dialog', 'info-city-dialog']});

        const dialogHeader = createElement('div', {classes: ['dialog-header']});
        dialog.appendChild(dialogHeader);

        const dialogBody = createElement('div', {classes: ['dialog-body']});
        dialog.appendChild(dialogBody);

        /*******HEADER********/
        const closeButton = createElement('button', {classes: ['close-button'], text: 'X'});
        closeButton.onclick = closeInfoCityDialog;
        dialogHeader.appendChild(closeButton);

        const title = createElement('h2', {classes: ['dialog-title'], text: `${cityName} - Basic Info`});
        dialogHeader.appendChild(title);

        const subtitle = createElement('h3', {classes: ['dialog-subtitle']});
        dialogHeader.appendChild(subtitle);

        /*******BODY********/
        const infoContainer = createElement('div', {classes: ['results-container']});
        infoContainer.innerHTML = `${htmlContent}`;
        dialogBody.appendChild(infoContainer);


        overlay.appendChild(dialog);
        document.body.appendChild(overlay);
    }


    /************ WEATHER / EVENTS for city ************/
    let cityWeatherData = {};

    function isWeatherDataRecent(cityName) {
        const data = cityWeatherData[cityName];
        if (data && data.current && data.forecast) {
            const currentAge = (Date.now() - data.current.timestamp) / 60000;
            const forecastAge = (Date.now() - data.forecast.timestamp) / 60000;
            return currentAge < 10 && forecastAge < 10;
        }
        return false;
    }

    let cityEventData = {};

    function isEventDataRecent(cityName) {
        const data = cityEventData[cityName];
        if (data) {
            const dataAge = (Date.now() - data.timestamp) / 60000;  //60min
            return dataAge < 60;
        }
        return false;
    }


    function selectAndDisplayCity(city, contentType) {
        history.pushState({city: city.name, contentType: contentType}, '', `#city/${city.name}`);
        return new Promise((resolve, reject) => {
            if (!city || !city.name) {
                console.error("Invalid city object:", city);
                reject("Invalid city object");
                return;
            }

            localStorage.setItem('selectedCity', JSON.stringify(city));
            localStorage.setItem('selectedContentType', contentType);
            updateSelectedCityButton(city.name);
            manipulateContent('loading');
            hideAppLoadingScreen();

            if (contentType === 'weather') {
                let promises = [];
                document.getElementById('event-btn').classList.remove('selected');
                document.getElementById('weather-btn').classList.add('selected');

                if (!isWeatherDataRecent(city.name)) {
                    promises.push(fetchCurrentWeatherData(city).then(currentWeatherData => {
                        cityWeatherData[city.name] = {
                            ...cityWeatherData[city.name], current: {
                                data: currentWeatherData, timestamp: Date.now()
                            }
                        };
                    }));

                    promises.push(fetchForecastWeatherData(city).then(forecastWeatherData => {
                        cityWeatherData[city.name] = {
                            ...cityWeatherData[city.name], forecast: {
                                data: forecastWeatherData, timestamp: Date.now()
                            }
                        };
                    }));
                }

                Promise.all(promises).then(() => {
                    if (cityWeatherData[city.name].current && cityWeatherData[city.name].forecast) {
                        displayWeatherData(cityWeatherData[city.name]);
                    }
                    resolve();
                }).catch(error => {
                    manipulateContent('error');
                    console.error("Error loading weather data:", error);
                    reject(error);
                });
            } else if (contentType === 'events') {
                document.getElementById('event-btn').classList.add('selected');
                document.getElementById('weather-btn').classList.remove('selected');
                if (!isEventDataRecent(city.name)) {
                    fetchEventsData(city.name).then(eventsData => {
                        cityEventData[city.name] = {
                            data: eventsData, timestamp: Date.now()
                        };
                        displayEventsData(cityEventData[city.name]);
                        resolve();
                    }).catch(error => {
                        manipulateContent('error');
                        console.error("Error loading event data:", error);
                        reject(error);
                    });
                } else {
                    if (cityEventData[city.name] && cityEventData[city.name].data) {
                        displayEventsData(cityEventData[city.name]);
                        resolve();
                    } else {
                        manipulateContent('error');
                        reject("No existing event data available");
                    }
                }
            } else {
                resolve();
            }
        });
    }


    function switchCity(direction) {
        const savedCities = getCitiesFromCookie();
        const numCities = savedCities.length;
        if (numCities === 0) {
            console.error("No saved cities available");
            return;
        }
        if (direction === 'prev') {
            if (currentCityIndex === 0) {
                currentCityIndex = numCities - 1;
            } else {
                currentCityIndex--;
            }
        } else if (direction === 'next') {
            if (currentCityIndex === numCities - 1) {
                currentCityIndex = 0;
            } else {
                currentCityIndex++;
            }
        }
        const selectedCity = savedCities[currentCityIndex];
        if (selectedCity) {
            updateSelectedCityButton(selectedCity.name);
            selectAndDisplayCity(savedCities[currentCityIndex], currentContentType);
        }
    }

    function displayEventsData(eventsData) {
        const mainContainer = document.getElementById('content');
        mainContainer.innerHTML = '';
        const eventsContainer = createElement('div', {id: 'events-container', classes: ['events-container']});
        mainContainer.appendChild(eventsContainer);

        function dateToString(date) {
            const day = date.getDate();
            const month = date.getMonth() + 1;
            const year = date.getFullYear();
            return `${day}.${month}.${year}`;
        }

        if (!eventsData || !eventsData.data || !eventsData.data._embedded || !eventsData.data._embedded.events) {
            console.error("Invalid or missing events data");
            return;
        }

        function createEventCard(event) {
            const eventCard = createElement('div', {classes: ['event-card']});
            eventCard.addEventListener('click', () => {
                window.open(event.url, '_blank');
            });

            const eventImage = createElement('img', {classes: ['event-image']});
            eventImage.src = event.images[0].url;
            eventCard.appendChild(eventImage);

            const eventName = createElement('h3', {classes: ['event-name'], text: event.name});
            eventCard.appendChild(eventName);


            const eventDetails = createElement('div', {classes: ['event-details']});
            eventCard.appendChild(eventDetails);

            const eventDate = createElement('div', {classes: ['event-date']});
            eventDetails.appendChild(eventDate);


            if (event.dates && event.dates.start && event.dates.start.localDate) {
                const dateString = event.dates.start.localDate;
                const dateParts = dateString.split('-');
                const dateObject = new Date(dateParts[0], dateParts[1] - 1, dateParts[2]);

                const formattedDate = dateToString(dateObject);
                const eventDateElement = createElement('p', {classes: ['event-date']});
                eventDateElement.innerHTML = `${iconCalendar} ${formattedDate}`;
                eventDate.appendChild(eventDateElement);
            } else {
                const noDateElement = createElement('p', {classes: ['event-date']});
                noDateElement.innerHTML = `${iconCalendar} NaN`;
                eventDate.appendChild(noDateElement);
            }
            if (event.dates && event.dates.start && event.dates.start.localTime) {
                const timeParts = event.dates.start.localTime.split(':');
                const formattedTime = timeParts[0] + ':' + timeParts[1];

                const eventTime = createElement('p', {classes: ['event-time']});
                eventTime.innerHTML = `${iconClock} ${formattedTime}`;
                eventDate.appendChild(eventTime);
            } else {
                const noEventTime = createElement('p', {classes: ['event-time']});
                noEventTime.innerHTML = `${iconClock} NaN`;
                eventDate.appendChild(noEventTime);
            }


            const eventLocation = createElement('p', {
                classes: ['event-location'], text: event._embedded.venues[0].name
            });
            eventLocation.innerHTML = `${iconMapPinFull} ${event._embedded.venues[0].name}`;
            eventDetails.appendChild(eventLocation);


            eventsContainer.appendChild(eventCard);
        }

        eventsData.data._embedded.events.forEach(event => createEventCard(event));
    }


    /****** API communication ******/
    function fetchEventsData(cityName) {
        return new Promise((resolve, reject) => {
            fetchEventsByCity(cityName, (data) => {
                resolve(data);
            }, (errorCode, textStatus) => {
                console.error(`Error fetching events: ${errorCode} - ${textStatus}`);
                resolveError(errorCode);
                reject(errorCode);
            });
        });
    }

    function fetchCurrentWeatherData(city) {
        return new Promise((resolve, reject) => {
            fetchCurrentWeatherByCoordinates(city.latitude, city.longitude, (data) => {
                resolve(data);
            }, (errorCode) => {
                console.error('Error fetching weather:', errorCode);
                resolveError(errorCode);
                reject(errorCode);
            });
        });
    }

    function fetchForecastWeatherData(city) {
        return new Promise((resolve, reject) => {
            fetchForecastWeatherByCoordinates(city.latitude, city.longitude, (data) => {
                resolve(data);
            }, (errorCode) => {
                console.error('Error fetching forecast:', errorCode);
                resolveError(errorCode);
                reject(errorCode);
            });
        });
    }

    function fetchCityInfoData(cityName) {
        return new Promise((resolve, reject) => {
            fetchWikipediaSummary(cityName, data => {
                if (data && data.extract_html) {
                    createInfoCityDialog(cityName, data.extract_html);
                    resolve();
                } else {
                    reject('404');
                }
            }, errorCode => {
                console.error('Error fetching city info:', errorCode);
                resolveError(errorCode);
                reject(errorCode);
            });
        });
    }

    function displayWeatherData(weatherData) {
        const mainContainer = document.getElementById('content');
        mainContainer.innerHTML = '';
        const weatherContainer = createElement('div', {id: 'weather-container', classes: ['weather-container']});
        mainContainer.appendChild(weatherContainer);

        const currentWeather = weatherData.current.data;
        const forecastWeather = weatherData.forecast.data;

        function convertToLocalTime(utcSeconds, timezoneOffset) {
            const date = new Date(utcSeconds * 1000);
            const localTime = new Date(date.getTime() + timezoneOffset * 1000);
            return localTime;
        }

        function formatTime(date) {
            const hours = String(date.getHours()).padStart(2, '0');
            const minutes = String(date.getMinutes()).padStart(2, '0');
            return `${hours}:${minutes}`;
        }

        const timezoneOffset = currentWeather.timezone;

        /************ CURRENT WEATHER ************/
        const weatherHeader = createElement('div', {classes: ['weather-header', 'weather-box']});
        const currentWindDirection = getWindDirection(currentWeather.wind.deg);

        const currentWeatherIcon = createElement('i', {classes: ['weather-icon', 'bi', getWeatherIconClass(currentWeather.weather[0].icon)]});
        weatherHeader.appendChild(currentWeatherIcon);

        const currentMainDiv = createElement('div', {classes: ['current-temp-div']});
        const currentTempCelsius = (currentWeather.main.temp - 273.15).toFixed(1);
        const currentTemp = createElement('h2', {classes: ['weather-temp'], text: `${currentTempCelsius}°C`});
        const currentState = createElement('p', {
            classes: ['weather-condition'], text: `${currentWeather.weather[0].main}`
        });
        currentMainDiv.appendChild(currentTemp);
        currentMainDiv.appendChild(currentState);
        weatherHeader.appendChild(currentMainDiv);

        const currentDetailsDiv = createElement('div', {classes: ['current-weather-details']});
        const currentWind1 = createElement('p', {classes: ['weather-wind']});
        currentWind1.innerHTML = `${iconWind} ${currentWindDirection} - ${currentWeather.wind.speed} m/s`;
        const currentHumidity1 = createElement('p', {classes: ['weather-humidity']});
        currentHumidity1.innerHTML = `${iconHumidity} ${currentWeather.main.humidity}%`;
        currentDetailsDiv.appendChild(currentWind1);
        currentDetailsDiv.appendChild(currentHumidity1);
        weatherHeader.appendChild(currentDetailsDiv);


        weatherContainer.appendChild(weatherHeader);


        /************ FORECAST WEATHER ************/
        const weatherBody = createElement('div', {classes: ['weather-body', 'weather-box']});
        weatherContainer.appendChild(weatherBody);

        const today = new Date();
        let firstDayProcessed = false;

        forecastWeather.list.forEach((forecast) => {
            const forecastDateTime = new Date(forecast.dt_txt);
            const forecastDate = forecastDateTime.toDateString();
            const forecastHour = forecastDateTime.getHours();

            if (forecastDate === today.toDateString() && !firstDayProcessed) {
                forecastDayBox(forecast, true);
                firstDayProcessed = true;
            } else if (forecastHour === 12) {
                forecastDayBox(forecast, false);
            }
        });

        /************ NICHE CURRENT WEATHER ************/
        const currentWeirdDiv = createElement('div', {classes: ['current-weird', 'weather-box']});

        const currentSunriseBox = createElement('div', {classes: ['niche-box']});
        const currentSunsetBox = createElement('div', {classes: ['niche-box']});
        const currentCloudsBox = createElement('div', {classes: ['niche-box']});
        const currentFeelsLikeBox = createElement('div', {classes: ['niche-box']});
        const currentPressureBox = createElement('div', {classes: ['niche-box']});
        const currentHumidityBox = createElement('div', {classes: ['niche-box']});
        const currentWindBox = createElement('div', {classes: ['niche-box']});

        const currentSunriseText = createElement('p', {classes: ['niche-box-text'], text: 'Sunrise'});
        const currentSunsetText = createElement('p', {classes: ['niche-box-text'], text: 'Sunset'});
        const currentCloudsText = createElement('p', {classes: ['niche-box-text'], text: 'Clouds'});
        const currentFeelsLikeText = createElement('p', {classes: ['niche-box-text'], text: 'Feels like'});
        const currentPressureText = createElement('p', {classes: ['niche-box-text'], text: 'Pressure'});
        const currentHumidityText = createElement('p', {classes: ['niche-box-text'], text: 'Humidity'});
        const currentWindText = createElement('p', {classes: ['niche-box-text'], text: 'Wind'});

        const localSunriseTime = convertToLocalTime(currentWeather.sys.sunrise, timezoneOffset);
        const localSunsetTime = convertToLocalTime(currentWeather.sys.sunset, timezoneOffset);

        const formattedSunrise = formatTime(localSunriseTime);
        const formattedSunset = formatTime(localSunsetTime);


        const currentSunrise = createElement('p', {
            classes: ['weather-sunrise', 'niche-box-function'], text: `${formattedSunrise}`
        });
        const currentSunset = createElement('p', {
            classes: ['weather-sunset', 'niche-box-function'], text: `${formattedSunset}`
        });
        const currentClouds = createElement('p', {
            classes: ['weather-clouds', 'niche-box-function'], text: `${currentWeather.clouds.all}%`
        });

        const tempFeelsLike = (currentWeather.main.feels_like - 273.15).toFixed(1);
        const currentFeelsLike = createElement('p', {
            classes: ['weather-feels-like', 'niche-box-function'], text: `${tempFeelsLike}°C`
        });
        const currentPressure = createElement('p', {
            classes: ['weather-pressure', 'niche-box-function'], text: `${currentWeather.main.pressure} hPa`
        });

        const currentWind2 = createElement('p', {
            classes: ['weather-wind', 'niche-box-function'],
            text: `${currentWindDirection} - ${currentWeather.wind.speed} m/s`
        });
        const currentHumidity2 = createElement('p', {
            classes: ['weather-humidity', 'niche-box-function'], text: `${currentWeather.main.humidity}%`
        });

        currentSunriseBox.appendChild(currentSunriseText);
        currentSunriseBox.appendChild(currentSunrise);
        currentSunsetBox.appendChild(currentSunsetText);
        currentSunsetBox.appendChild(currentSunset);
        currentCloudsBox.appendChild(currentCloudsText);
        currentCloudsBox.appendChild(currentClouds);
        currentFeelsLikeBox.appendChild(currentFeelsLikeText);
        currentFeelsLikeBox.appendChild(currentFeelsLike);
        currentPressureBox.appendChild(currentPressureText);
        currentPressureBox.appendChild(currentPressure);
        currentHumidityBox.appendChild(currentHumidityText);
        currentHumidityBox.appendChild(currentHumidity2);
        currentWindBox.appendChild(currentWindText);
        currentWindBox.appendChild(currentWind2);

        currentWeirdDiv.appendChild(currentSunriseBox);
        currentWeirdDiv.appendChild(currentSunsetBox);
        currentWeirdDiv.appendChild(currentCloudsBox);
        currentWeirdDiv.appendChild(currentFeelsLikeBox);
        currentWeirdDiv.appendChild(currentPressureBox);
        currentWeirdDiv.appendChild(currentHumidityBox);
        currentWeirdDiv.appendChild(currentWindBox);

        weatherContainer.appendChild(currentWeirdDiv);

        function forecastDayBox(forecast) {
            const dayBox = createElement('div', {classes: ['forecast-day-box']});

            const weatherIcon = createElement('i', {classes: ['day-weather-icon', 'bi', getWeatherIconClass(forecast.weather[0].icon)]});
            dayBox.appendChild(weatherIcon);

            const dayName = new Date(forecast.dt * 1000).toLocaleDateString(undefined, {weekday: 'long'});
            const dayNameElement = createElement('p', {classes: ['forecast-day-name'], text: dayName});
            dayBox.appendChild(dayNameElement);


            const dayBoxWeatherDetails = createElement('div', {classes: ['forecast-day-box-weather-details']});
            dayBox.appendChild(dayBoxWeatherDetails);

            const weatherState = createElement('p', {
                classes: ['forecast-weather-main'], text: forecast.weather[0].main
            });
            dayBoxWeatherDetails.appendChild(weatherState);

            const tempCelsius = (forecast.main.temp - 273.15).toFixed(1);
            const tempElement = createElement('p', {classes: ['forecast-temp']});
            tempElement.innerHTML = `${iconTemperature} ${tempCelsius}°C`;
            dayBoxWeatherDetails.appendChild(tempElement);

            weatherBody.appendChild(dayBox);
        }
    }

    function getWeatherIconClass(weatherCode) {
        switch (weatherCode) {
            case '01d':
                return 'bi-sun-fill'; // clear day
            case '01n':
                return 'bi-moon-fill'; // clear night
            case '02d':
                return 'bi-cloud-sun'; // few clouds day
            case '02n':
                return 'bi-cloud-moon'; // few clouds night
            case '03d':
            case '03n':
                return 'bi-cloud'; // scattered clouds
            case '04d':
            case '04n':
                return 'bi-clouds'; // broken clouds
            case '09d':
            case '09n':
                return 'bi-cloud-drizzle'; // shower rain
            case '10d':
                return 'bi-cloud-rain'; // rain day
            case '10n':
                return 'bi-cloud-rain-fill'; // rain night
            case '11d':
            case '11n':
                return 'bi-cloud-lightning-rain'; // thunderstorm
            case '13d':
            case '13n':
                return 'bi-cloud-snow'; // snow
            case '50d':
            case '50n':
                return 'bi-cloud-fog'; // mist
            default:
                return 'bi-sun-fill';
        }
    }

    function getWindDirection(degrees) {
        const directions = ['N', 'NNE', 'NE', 'ENE', 'E', 'ESE', 'SE', 'SSE', 'S', 'SSW', 'SW', 'WSW', 'W', 'WNW', 'NW', 'NNW'];
        const index = Math.round((degrees % 360) / 22.5);
        return directions[index % 16];
    }

    function resetLookedUpCities() {
        lookedUpCities = [];
    }

    function closeSearchCityDialog() {
        resetLookedUpCities();
        document.getElementById('search-city-overlay').remove();
    }

    function closeSavedCitiesDialog() {
        document.getElementById('saved-cities-overlay').remove();
    }

    function closeInfoCityDialog() {
        document.getElementsByClassName('overlay')[0].style.display = 'flex';
        document.getElementById('info-city-overlay').remove();
    }

    function onAddCityClick() {
        createSearchCityDialog();
    }

    function onPrevCityClick() {
        switchCity('prev');
    }

    function onNextCityClick() {
        switchCity('next');
    }

    function onDocumentationClick() {
        documentationDialog();
    }

    function closeDocumentationDialog() {
        document.getElementById('documentation-overlay').remove();
    }

    function onWeatherClick() {
        currentContentType = 'weather';
        document.getElementById('weather-btn').classList.add('selected');
        document.getElementById('event-btn').classList.remove('selected');
        if (savedCities.length > 0 && typeof savedCities[currentCityIndex] !== 'undefined') {
            localStorage.setItem('currentContentType', currentContentType);
            selectAndDisplayCity(savedCities[currentCityIndex], currentContentType);
        }
    }

    function onEventClick() {
        currentContentType = 'events';
        document.getElementById('event-btn').classList.add('selected');
        document.getElementById('weather-btn').classList.remove('selected');
        if (savedCities.length > 0 && typeof savedCities[currentCityIndex] !== 'undefined') {
            localStorage.setItem('currentContentType', currentContentType);
            selectAndDisplayCity(savedCities[currentCityIndex], currentContentType);
        }
    }

    function resolveError(errorCode) {
        switch (errorCode) {
            case '404':
                createErrorMessage('No Data Available', 'No data available about chosen city', 'ok');
                break;
            case '400':
                createErrorMessage('Bad Request', 'The request was invalid. Please try again.', 'retry');
                break;
            case '403':
                createErrorMessage('Forbidden', 'Access denied to the requested resource.', 'ok');
                break;
            case '500':
                createErrorMessage('Server Error', 'Internal server error. Please try again later.', 'retry');
                break;
            case '502':
                createErrorMessage('Bad Gateway', 'The server received an invalid response. Please try again later.', 'retry');
                break;
            case '503':
                createErrorMessage('Service Unavailable', 'The server is currently unavailable. Please try again later.', 'retry');
                break;
            case '504':
                createErrorMessage('Gateway Timeout', 'The server did not get a timely response. Please try again later.', 'retry');
                break;
            case 'network':
                createErrorMessage('Network Error', 'Failed to connect. Check your internet connection.', 'reload');
                break;
            default:
                createErrorMessage(`Error ${errorCode}`, `An error occurred: ${errorCode}. Please try again later.`, 'retry');
        }
    }

    function createErrorMessage(head, content, button) {
        const existingErrorOverlay = document.getElementById('error-overlay');
        if (existingErrorOverlay) {
            existingErrorOverlay.remove();
        }

        const overlay = createElement('div', {id: 'error-overlay', classes: ['overlay']});

        const dialog = createElement('div', {classes: ['dialog']});

        const dialogHeader = createElement('div', {classes: ['dialog-header']});
        dialog.appendChild(dialogHeader);

        const dialogBody = createElement('div', {classes: ['error-dialog-body']});
        dialog.appendChild(dialogBody);

        /*******HEADER********/
        const closeButton = createElement('button', {classes: ['close-button'], text: 'X'});
        closeButton.onclick = () => overlay.remove();
        dialogHeader.appendChild(closeButton);

        const title = createElement('h2', {classes: ['dialog-title'], text: `${head}`});
        dialogHeader.appendChild(title);

        const subtitle = createElement('h3', {classes: ['dialog-subtitle']});
        dialogHeader.appendChild(subtitle);

        /*******BODY********/
        const errorMessage = createElement('p', {classes: ['error-message'], text: `${content}`});
        dialogBody.appendChild(errorMessage);
        if (button === 'reload') {
            const reloadButton = createElement('button', {
                id: 'reload-button', classes: ['error-button'], text: 'Reload'
            });
            reloadButton.onclick = () => window.location.reload();
            dialogBody.appendChild(reloadButton);
        }
        if (button === 'ok') {
            const okButton = createElement('button', {id: 'ok-button', classes: ['error-button'], text: 'OK'});
            okButton.onclick = () => overlay.remove();
            dialogBody.appendChild(okButton);
        }
        if (button === 'retry') {
            const retryButton = createElement('button', {id: 'retry-button', classes: ['error-button'], text: 'Retry'});
            retryButton.onclick = () => overlay.remove();
            dialogBody.appendChild(retryButton);
        }
        overlay.appendChild(dialog);
        document.body.appendChild(overlay);

    }

    function initializeApp() {
        const savedCity = JSON.parse(localStorage.getItem('selectedCity'));
        const savedContentType = localStorage.getItem('selectedContentType');


        if (savedCities.length === 0) {
            currentCityIndex = -1;
            manipulateContent('default');
            hideAppLoadingScreen();
        } else {
            selectAndDisplayCity(savedCity, savedContentType).then(() => {
                hideAppLoadingScreen();
            });
        }
    }

    window.onload = initializeApp;

    window.addEventListener('popstate', (event) => {
        if (event.state) {
            const city = {name: event.state.city};
            const contentType = event.state.contentType;
            selectAndDisplayCity(city, contentType);
        }
    });


    buildWeatherAppStructure();
}

document.addEventListener('DOMContentLoaded', buildWeatherApp);