
Chart.register(ChartDataLabels);




const App = {};
App.url = 'https://ergast.com/api/f1/';

App.visuals = {
    loadingSpinner: $(`<div class='flex-row'>
                                <div class='spinner'></div>
                        </div>`),

    divContainer: $(`<div class='flex-row table-container'></div>`),
    chartContainer: $(`<div class='flex-row bar-chart-container'></div>`),
    table3Cols: $(`<table>
                        <thead>
                            <tr>
                                <th>Year</th>
                                <th>Winner</th>
                                <th>Team</th>
                            </tr>
                        </thead>
                        <tbody>
                        </tbody>
                    </table>`),


    table5Cols: $(`<table>
                        <thead>
                            <tr>
                                <th>Year</th>
                                <th>Position</th>
                                <th>Positions Gained</th>
                                <th>Driver</th><th>Team</th>
                            </tr>
                        </thead>
                        <tbody>
                        </tbody>
                    </table>`),


    removeFromFavouritesBtn: $(`<button>Delete from favourites</button>`),
    removeButtonContainer: $(`<div class='flex-row remove-btn-container'></div>`),
    favouritesContainer: $(`<div class='container favourite-container'></div>`),
    btnFavouritesContainer: $(`<div class='flex-row'></div>`),
    error: $(`<div class='flex-row'><h3>An Error has occured while retrieving data from API</h3></div>`),
};

App.map = {
    markers: L.layerGroup(),
    mapVisual: L.map('map').setView([47.010, 20.391], 5),

    maplayer: L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: `&copy; <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a>`
    }),

    overlay: undefined,
};
App.map.constructNewOverlay = (reason) => {

    if (reason === 'loading') {
        return (L.imageOverlay('./assets/img/loading.svg', App.map.mapVisual.getBounds(), {
            opacity: 1,
            interactive: false
        }));
    }
    App.map.markers.clearLayers();
    return (L.imageOverlay('./assets/img/waiting.svg', App.map.mapVisual.getBounds(), {
        opacity: 1,
        interactive: false
    }));
};
App.map.addOverlay = (type) => {
    App.map.overlay = App.map.constructNewOverlay(type);
    App.map.mapVisual.removeControl(App.map.mapVisual.zoomControl);
    App.map.mapVisual._handlers.forEach((handler) => {
        handler.disable();
    });
    App.map.overlay.addTo(App.map.mapVisual);
    $(App.map.overlay._image).fadeIn(5000);
};
App.map.removeOverlay = () => {
    App.map.mapVisual.removeLayer(App.map.overlay);
    App.map.mapVisual.addControl(App.map.mapVisual.zoomControl);
    App.map.mapVisual._handlers.forEach((handler) => {
        handler.enable();
    });
};

App.mapContainer = $('.map-container');
App.mapBtnContainer = $('.map-btn-container');
App.getBackMapBtn = $('.map-btn-container button');
App.favouritesBtnContainer = $('.favourites-btn-container');
App.addToFavouritesBtn = $('.favourites-btn-container button');
App.dataContainer = $('.data-container');
App.favouriteTab = $('.nav-fav');
App.homeTab = $('.nav-home');
App.pageTitle = $('.title');
App.filterConfirmBtn = $('.filter-confirm-btn');

App.showLoading = () => {
    App.dataContainer.append(App.visuals.loadingSpinner);
};
App.hideLoading = () => {
    App.visuals.loadingSpinner.remove();
};

App.showMapUI = () => {
    App.mapContainer.removeClass('hide');
    App.filter.filterRow.removeClass('hide');
    App.mapBtnContainer.addClass('hide');
    App.favouritesBtnContainer.addClass('hide');
    App.dataContainer.addClass('hide');
    App.dataContainer.empty();
    App.pageTitle.html('<h1>Main Page</h1>');
};
App.hideMapUI = () => {
    App.mapContainer.addClass('hide');
    App.filter.filterRow.addClass('hide');
    App.dataContainer.removeClass('hide');
    App.mapBtnContainer.removeClass('hide');
    App.favouritesBtnContainer.removeClass('hide');
    App.dataContainer.empty();
};

App.setFavouriteButtonState = (data) => {
    if (data === 'remove') {
        App.addToFavouritesBtn.html('Remove from favourites');
        App.addToFavouritesBtn.off('click');
        App.addToFavouritesBtn.addClass('remove-btn');
        App.addToFavouritesBtn.on('click', () => {
            App.removeFromFavourites(App.filter.trackId);
        });
    }
    else {
        App.addToFavouritesBtn.html('Add to favourites');
        App.addToFavouritesBtn.off('click');
        App.addToFavouritesBtn.removeClass('remove-btn');
        App.addToFavouritesBtn.on('click', () => {
            App.addToFavourites({
                trackID: App.filter.trackId, trackName: App.filter.track, trackCountry: App.filter.country
            })
        });
    }
};
App.addToFavourites = (data) => {
    data.yearFilter = App.filter.getFilterYear();
    data.teamFilter = App.filter.getFilterTeam();
    data.driverFilter = App.filter.getFilterDriver();
    const favourites = JSON.parse(localStorage.getItem('favVisualsFilters')) || [];
    favourites.push(data);
    localStorage.setItem('favVisualsFilters', JSON.stringify(favourites));
    App.setFavouriteButtonState('remove');
};
App.removeFromFavourites = (trackID) => {
    const favourites = JSON.parse(localStorage.getItem('favVisualsFilters'));
    const newFavourites = favourites.filter((item) => {
        return !(item.trackID === trackID &&
            item.yearFilter === App.filter.getFilterYear() &&
            item.teamFilter === App.filter.getFilterTeam() &&
            item.driverFilter === App.filter.getFilterDriver()
        )
    });
    localStorage.setItem('favVisualsFilters', JSON.stringify(newFavourites));
    App.setFavouriteButtonState('add');
};
App.visualiseFavouritesList = () => {
    App.hideMapUI();
    App.favouritesBtnContainer.addClass('hide');
    App.mapBtnContainer.addClass('hide');
    App.dataContainer.empty();
    const favourites = JSON.parse(localStorage.getItem('favVisualsFilters')) || [];
    const favouriteVisuals = [];
    if (favourites.length === 0) {
        App.dataContainer.append($(`<div class='flex-row favourite-title'><h3>No favourites added yet!</h3></div>`));
    }
    else {
        favourites.forEach(favourite => {

            const element = $(`
                <div class='container favourite-container'>
                    <div class='flex-row favourite-title'>
                        <h3>${favourite.trackName} (${favourite.trackCountry})</h3>
                    </div>
                    <div class='flex-row'>
                        <p>Filter state: ${App.filter.getFavouriteFilterStateName(favourite.yearFilter, favourite.teamFilter, favourite.driverFilter)}</p>
                    </div>
                </div>`
            );
            const visualiseBtn = $(`<button class='visualise-btn'>Visualise</button>`).on('click', () => {
                App.visualiseFavouriteFromList(favourite.trackID, favourite.trackName, favourite.trackCountry, favourite.yearFilter, favourite.teamFilter, favourite.driverFilter);
            });
            const removeBtn = $(`<button class='remove-btn'>Remove</button>`).on('click', () => {
                App.removeFavouriteFromList(favourite.trackID, favourite.yearFilter, favourite.teamFilter, favourite.driverFilter, elements);
            });
            const elements = [element, visualiseBtn, removeBtn];
            favouriteVisuals.push(element, visualiseBtn, removeBtn);
        });

        App.dataContainer.append(favouriteVisuals);
    }

};
App.removeFavouriteFromList = (trackId, filterYear, filterTeam, filterDriver, element) => {
    const favourites = JSON.parse(localStorage.getItem('favVisualsFilters'));
    const newFavourites = favourites.filter((item) => {
        return !(item.trackID === trackId &&
            item.yearFilter === filterYear &&
            item.teamFilter === filterTeam &&
            item.driverFilter === filterDriver
        )
    });
    localStorage.setItem('favVisualsFilters', JSON.stringify(newFavourites));
    element.forEach(element => element.remove());
};
App.visualiseFavouriteFromList = (trackId, trackName, trackCountry, filterYear, filterTeam, filterDriver) => {
    App.filter.previousDriver = App.filter.getFilterDriver();
    App.filter.previousTeam = App.filter.getFilterTeam();
    App.filter.previousYear = App.filter.getFilterYear();
    App.filter.setFilterDriver(filterDriver);
    App.filter.setFilterTeam(filterTeam);
    App.filter.setFilterYear(filterYear);
    App.favouritesBtnContainer.removeClass('hide').addClass('solo-button-container');
    App.visualiseData({ target: { options: { title: trackName, country: trackCountry, data: trackId } } }, 'Favourite - Race detail')
};

App.canAddToFavourites = (trackId) => {
    const favourites = JSON.parse(localStorage.getItem('favVisualsFilters')) || [];

    favourites.filter((item) => {
        return (
            item.trackID === trackId &&
            item.yearFilter === App.filter.getFilterYear() &&
            item.teamFilter === App.filter.getFilterTeam() &&
            item.driverFilter === App.filter.getFilterDriver())
    })
        .length > 0 ? App.setFavouriteButtonState('remove') : App.setFavouriteButtonState('add');
};
App.deleteFavouriteVisual = (trackId, filterYear, filterTeam, filterDriver, elements) => {
    const favourites = JSON.parse(localStorage.getItem('favVisualsFilters'));
    const newFavourites = favourites.filter((item) => {
        return !(item.trackID === trackId &&
            item.yearFilter === filterYear &&
            item.teamFilter === filterTeam &&
            item.driverFilter === filterDriver
        )
    });
    localStorage.setItem('favVisualsFilters', JSON.stringify(newFavourites));
    elements.forEach(element => { element.remove() });
};

App.filter = {
    year: null,
    team: null,
    driver: null,
    filterRow: $('.filters'),

    track: null,
    country: null,
    trackId: null,


    previousYear: null,
    previousTeam: null,
    previousDriver: null,

    driverFilterSelect: $('.select-driver'),
    teamFilterSelect: $('.select-team'),
    yearFilterSelect: $('.select-year'),
    driverFilterClearBtn: $('.clear-driver'),
    teamFilterClearBtn: $('.clear-team'),
    yearFilterClearBtn: $('.clear-year'),
};

App.filter.driverFilterChange = (caller) => {
    const driver = App.filter.driverFilterSelect.val();;
    App.filter.setFilterDriver(driver);
    if (caller !== 'filter') {
        App.map.removeOverlay();
        App.map.addOverlay(App.map.constructNewOverlay('waiting'));
    }
    App.filter.getDataForFilterYears('filter');
    App.filter.getDataForFilterTeams('filter');
};
App.filter.yearFilterChange = (caller) => {
    const year = App.filter.yearFilterSelect.val();
    App.filter.setFilterYear(year);
    if (caller !== 'filter') {
        App.map.removeOverlay();
        App.map.addOverlay(App.map.constructNewOverlay('waiting'));
    }
    App.filter.getDataForFilterTeams('filter');
    App.filter.getDataForFilterDrivers('filter');
};
App.filter.teamFilterChange = (caller) => {
    const team = App.filter.teamFilterSelect.val();
    App.filter.setFilterTeam(team);
    if (caller !== 'filter') {
        App.map.removeOverlay();
        App.map.addOverlay(App.map.constructNewOverlay('waiting'));
    }
    App.filter.getDataForFilterDrivers('filter');
    App.filter.getDataForFilterYears('filter');
};

App.filter.disableFilters = () => {
    App.filter.yearFilterSelect.prop('disabled', true);
    App.filter.teamFilterSelect.prop('disabled', true);
    App.filter.driverFilterSelect.prop('disabled', true);
    App.filter.driverFilterClearBtn.prop('disabled', true);
    App.filter.teamFilterClearBtn.prop('disabled', true);
    App.filter.yearFilterClearBtn.prop('disabled', true);
    App.filterConfirmBtn.prop('disabled', true);
};
App.filter.enableFilters = () => {
    App.filter.yearFilterSelect.prop('disabled', false);
    App.filter.teamFilterSelect.prop('disabled', false);
    App.filter.driverFilterSelect.prop('disabled', false);
    App.filter.driverFilterClearBtn.prop('disabled', false);
    App.filter.teamFilterClearBtn.prop('disabled', false);
    App.filter.yearFilterClearBtn.prop('disabled', false);
    App.filterConfirmBtn.prop('disabled', false);
};

App.filter.getFilterState = () => {
    let filterState = 0;

    if (!(!App.filter.year)) {
        filterState += 1;
    };
    if (!(!App.filter.team)) {
        filterState += 2;
    };
    if (!(!App.filter.driver)) {
        filterState += 4;
    }
    return (filterState);
};
App.filter.getFavouriteFilterState = (year, team, driver) => {
    let filterState = 0;
    if (!(!year)) {
        filterState += 1;
    };
    if (!(!team)) {
        filterState += 2;
    };
    if (!(!driver)) {
        filterState += 4;
    }
    return (filterState);
};
App.filter.getFilterStateName = () => {
    const filterState = App.filter.getFilterState();
    switch (filterState) {
        case 0: return 'No filters';
        case 1: return App.filter.getFilterYear();
        case 2: return App.filter.getFilterTeam();
        case 3: return `${App.filter.getFilterYear()}, ${App.filter.getFilterTeam()}`;
        case 4: return App.filter.getFilterDriver();
        case 5: return `${App.filter.getFilterYear()}, ${App.filter.getFilterDriver()}`;
        case 6: return `${App.filter.getFilterTeam()}, ${App.filter.getFilterDriver()}`;
        case 7: return `${App.filter.getFilterYear()}, ${App.filter.getFilterTeam()}, ${App.filter.getFilterDriver()}`;
    }
};
App.filter.getFavouriteFilterStateName = (year, team, driver) => {
    const filterState = App.filter.getFavouriteFilterState(year, team, driver);
    switch (filterState) {
        case 0: return 'No filters';
        case 1: return year;
        case 2: return team;
        case 3: return `${year}, ${team}`;
        case 4: return driver;
        case 5: return `${year}, ${driver}`;
        case 6: return `${team}, ${driver}`;
        case 7: return `${year}, ${team}, ${driver}`;
    }
};

App.filter.getFilterYear = () => {
    return App.filter.year;
};
App.filter.getFilterTeam = () => {
    return App.filter.team;
};
App.filter.getFilterDriver = () => {
    return App.filter.driver;
};

App.filter.setFilterYear = (year) => {
    App.filter.year = year;
};
App.filter.setFilterTeam = (team) => {
    App.filter.team = team;
};
App.filter.setFilterDriver = (driver) => {
    App.filter.driver = driver;
};

App.filter.yearFilterURLObject = {
    0: () => { return `${App.url}seasons.json?limit=100`; },
    1: () => { return `${App.url}seasons.json?limit=100`; },
    2: () => { return `${App.url}constructors/${App.filter.getFilterTeam()}/seasons.json?limit=100`; },
    3: () => { return `${App.url}constructors/${App.filter.getFilterTeam()}/seasons.json?limit=100`; },
    4: () => { return `${App.url}drivers/${App.filter.getFilterDriver()}/seasons.json?limit=100`; },
    5: () => { return `${App.url}drivers/${App.filter.getFilterDriver()}/seasons.json?limit=100`; },
    6: () => { return `${App.url}constructors/${App.filter.getFilterTeam()}/drivers/${App.filter.getFilterDriver()}/seasons.json?limit=100`; },
    7: () => { return `${App.url}constructors/${App.filter.getFilterTeam()}/drivers/${App.filter.getFilterDriver()}/seasons.json?limit=100`; },
};
App.filter.teamFilterURLObject = {
    0: () => { return `${App.url}constructors.json?limit=200`; },
    1: () => { return `${App.url}${App.filter.getFilterYear()}/constructors.json?limit=220`; },
    2: () => { return `${App.url}constructors.json?limit=200`; },
    3: () => { return `${App.url}${App.filter.getFilterYear()}/constructors.json?limit=220`; },
    4: () => { return `${App.url}drivers/${App.filter.getFilterDriver()}/constructors.json?limit=200`; },
    5: () => { return `${App.url}${App.filter.getFilterYear()}/drivers/${App.filter.getFilterDriver()}/constructors.json?limit=200`; },
    6: () => { return `${App.url}drivers/${App.filter.getFilterDriver()}/constructors.json?limit=200`; },
    7: () => { return `${App.url}${App.filter.getFilterYear()}/drivers/${App.filter.getFilterDriver()}/constructors.json?limit=200`; },
};
App.filter.driverFilterURLObject = {
    0: () => { return `${App.url}drivers.json?limit=900`; },
    1: () => { return `${App.url}${App.filter.getFilterYear()}/drivers.json?limit=900`; },
    2: () => { return `${App.url}constructors/${App.filter.getFilterTeam()}/drivers.json?limit=900`; },
    3: () => { return `${App.url}${App.filter.getFilterYear()}/constructors/${App.filter.getFilterTeam()}/drivers.json?limit=900`; },
    4: () => { return `${App.url}drivers.json?limit=900`; },
    5: () => { return `${App.url}${App.filter.getFilterYear()}/drivers.json?limit=900`; },
    6: () => { return `${App.url}constructors/${App.filter.getFilterTeam()}/drivers.json?limit=900`; },
    7: () => { return `${App.url}${App.filter.getFilterYear()}/constructors/${App.filter.getFilterTeam()}/drivers.json?limit=900`; },
};

App.filter.getDataForFilterYears = () => {
    const url = App.filter.yearFilterURLObject[App.filter.getFilterState()]();
    const currYear = App.filter.getFilterYear();
    const elements = [];
    App.filter.disableFilters();
    $.getJSON(url).done((data) => {
        $('.select-year option:not(:first)').remove();
        data.MRData.SeasonTable.Seasons.forEach(season => {
            const element = $(`
            <option value='${season.season}'>
                ${season.season}
            </option>
        `);
            elements.push(element);
        });
        $('.select-year').append(elements);
        currYear === null ? App.filter.yearFilterSelect.val('0') : App.filter.yearFilterSelect.val(currYear);
        App.filter.enableFilters();
    });
};
App.filter.getDataForFilterTeams = () => {
    const url = App.filter.teamFilterURLObject[App.filter.getFilterState()]();
    const currTeam = App.filter.getFilterTeam();
    const elements = [];
    App.filter.disableFilters();
    $.getJSON(url).done((data) => {
        $('.select-team option:not(:first)').remove();
        data.MRData.ConstructorTable.Constructors.forEach(constructor => {
            const element = $(`
            <option value='${constructor.constructorId}'>
                ${constructor.name}
            </option>
        `);
            elements.push(element);
        });
        $('.select-team').append(elements);
        currTeam === null ? App.filter.teamFilterSelect.val('0') : App.filter.teamFilterSelect.val(currTeam);
        App.filter.enableFilters();
    });
};
App.filter.getDataForFilterDrivers = () => {
    const url = App.filter.driverFilterURLObject[App.filter.getFilterState()]();
    const currDriver = App.filter.getFilterDriver();
    const elements = [];
    App.filter.disableFilters();
    $.getJSON(url).done((data) => {
        $('.select-driver option:not(:first)').remove();
        data.MRData.DriverTable.Drivers.forEach(driver => {
            const element = $(`
            <option value='${driver.driverId}'>
                ${driver.givenName} ${driver.familyName}
            </option>
        `);
            elements.push(element);
        });
        $('.select-driver').append(elements);
        currDriver === null ? App.filter.driverFilterSelect.val('0') : App.filter.driverFilterSelect.val(currDriver);
        App.filter.enableFilters();
    });
};

App.circuitURLObject = {
    0: () => { return `${App.url}circuits.json?limit=100`; },
    1: () => { return `${App.url}${App.filter.getFilterYear()}/circuits.json?limit=100` },
    2: () => { return `${App.url}constructors/${App.filter.getFilterTeam()}/circuits.json?limit=100` },
    3: () => { return `${App.url}${App.filter.getFilterYear()}/constructors/${App.filter.getFilterTeam()}/circuits.json?limit=100` },
    4: () => { return `${App.url}drivers/${App.filter.getFilterDriver()}/circuits.json?limit=100` },
    5: () => { return `${App.url}${App.filter.getFilterYear()}/drivers/${App.filter.getFilterDriver()}/circuits.json?limit=100` },
    6: () => { return `${App.url}constructors/${App.filter.getFilterTeam()}/drivers/${App.filter.getFilterDriver()}/circuits.json?limit=100` },
    7: () => { return `${App.url}${App.filter.getFilterYear()}/constructors/${App.filter.getFilterTeam()}/drivers/${App.filter.getFilterDriver()}/circuits.json?limit=100` },
};
App.getCircuits = () => {
    App.map.markers.clearLayers();
    App.map.mapVisual.removeLayer(App.map.markers);
    App.map.addOverlay('loading');
    const filterState = App.filter.getFilterState();
    const url = App.circuitURLObject[filterState]();
    $.getJSON(url).done((data) => {
        data.MRData.CircuitTable.Circuits.forEach(circuit => {

            L.marker([circuit.Location.lat, circuit.Location.long],
                { title: circuit.circuitName, data: circuit.circuitId, country: circuit.Location.country }).on('click', ((event) => {
                    App.hideMapUI();
                    App.visualiseData(event, 'Race detail');
                })).addTo(App.map.markers);
        });
        App.map.removeOverlay();
        App.map.markers.addTo(App.map.mapVisual);
    });
};

App.visualiseData = (e, title) => {
    App.pageTitle.html(`<h1>${title}</h1>`);
    App.dataContainer.empty();
    App.canAddToFavourites(e.target.options.data);
    const chartContainer = App.visuals.chartContainer.clone();
    const divContainer = App.visuals.divContainer.clone()
        .append($(`<div class='flex-row table-title'><h2>${e.target.options.title} - (${e.target.options.country})</h2></div>`))
        .append($(`<div class='flex-row'><p>Filter state: ${App.filter.getFilterStateName()}</p></div>`))
        .append($(`<div class='flex-row table-title'><h3>Results</h3></div>`));
    const table3Cols = App.visuals.table3Cols.clone();
    const table5Cols = App.visuals.table5Cols.clone();

    let url = App.url;
    App.showLoading();
    App.filter.track = e.target.options.title;
    App.filter.country = e.target.options.country;
    App.filter.trackId = e.target.options.data;
    switch (App.filter.getFilterState()) {
        case 0:


            url = `${App.url}circuits/${App.filter.trackId}/results/1.json?limit=100`
            $.getJSON(url).done((data) => {
                const winners = [];
                const fastestLaps = [];
                let biggestYear = 0;
                const tableRows = [];
                data.MRData.RaceTable.Races.forEach(race => {
                    const tableRow = $(`<tr><td>${race.season}</td><td>${race.Results[0].Driver.givenName} ${race.Results[0].Driver.familyName}</td><td>${race.Results[0].Constructor.name}</td></tr>`);
                    const season = Number(race.season);
                    const driverName = `${race.Results[0].Driver.givenName} ${race.Results[0].Driver.familyName}`;
                    season > biggestYear ? biggestYear = season : biggestYear;
                    tableRows.push(tableRow)
                    if (winners[driverName]) {
                        winners[driverName] += 1;
                    }
                    else {
                        winners[driverName] = 1;
                    }
                });
                table3Cols.append(tableRows);
                const chartData = App.constructDatasetFromObject(winners);
                const colours = Array(chartData.length).fill('#8dd7d7');
                chartContainer.append(App.constructBarChart(chartData.map(x => x.data).splice(0, 4), chartData.map(x => x.label).splice(0, 4), '# Wins (TOP4)', 'vertical', 40, 'TOP4 - Wins', colours, true));
                chartContainer.append($(`<div class='flex-row-column10'></div>`));

                if (biggestYear > 2004) {
                    url = `${App.url}circuits/${App.filter.trackId}/fastest/1/results.json?limit=100`;
                    $.getJSON(url).done((data) => {
                        data.MRData.RaceTable.Races.forEach(race => {
                            if (race.Results[0].FastestLap.rank === '1') {
                                const driverName = `${race.Results[0].Driver.givenName} ${race.Results[0].Driver.familyName}`;
                                if (fastestLaps[driverName]) {
                                    fastestLaps[driverName] += 1;
                                }
                                else {
                                    fastestLaps[driverName] = 1;
                                }
                            };
                        });

                        const chartData = App.constructDatasetFromObject(fastestLaps);
                        chartContainer.append(App.constructPieChart(chartData.map(x => x.data).splice(0, 4), chartData.map(x => x.label).splice(0, 4), '# Fastest Laps (TOP4, 2004 +)', ['#8dd7d7', '#72bdf1', '#c5a8ff', '#ffb771'], 40, 'TOP4 - Fastest Laps (2004 +)'));

                    }).fail((error) => {
                        App.hideLoading();
                        App.dataContainer.empty();
                        console.log(error);
                        App.favouritesBtnContainer.addClass('hide');
                        App.dataContainer.append(App.visuals.error.clone());
                    });
                }
                else {
                    chartContainer.append($(`<div class='flex-row-column40'><h3>Fastest laps data are availible from 2004 onwards</h3></div>`));
                }
                App.hideLoading();
                divContainer.append(table3Cols);
                App.dataContainer.append(divContainer);
                App.dataContainer.append(chartContainer);

            }).fail((error) => {
                App.hideLoading();
                App.dataContainer.empty();
                console.log(error);
                App.favouritesBtnContainer.addClass('hide');
                App.dataContainer.append(App.visuals.error.clone());
            });
            break;


        case 1:
            url = `${App.url}${App.filter.getFilterYear()}/circuits/${App.filter.trackId}/results.json?limit=100`;

            $.getJSON(url).done((data) => {
                const fastestLap = {};
                const driverIdToName = {};
                const positionsGained = [];
                const positions = [];
                let laps;
                const tableRows = [];
                const round = data.MRData.RaceTable.Races[0].round;
                data.MRData.RaceTable.Races[0].Results.forEach(result => {
                    const tableRow = $(`<tr><td>${result.position}</td><td>${result.Driver.givenName} ${result.Driver.familyName}</td><td>${result.Constructor.name}</td></tr>`);
                    tableRows.push(tableRow);
                    driverIdToName[result.Driver.driverId] = `${result.Driver.givenName} ${result.Driver.familyName}`;
                    const gained = Number(result.grid) - Number(result.position);

                    positionsGained[driverIdToName[result.Driver.driverId]] = gained;
                    positions[driverIdToName[result.Driver.driverId]] = result.grid !== '0' ? [result.grid] : [data.MRData.RaceTable.Races[0].Results.length];

                    if (result.FastestLap && result.FastestLap.rank === '1') {
                        fastestLap[driverIdToName[result.Driver.driverId]] = result.FastestLap.Time.time;
                    }
                });
                table3Cols.append(tableRows);
                const fastestLapVisual = App.filter.getFilterYear() > 2003 ? $(`<div class='flex-row'><h3>Fastest lap of the race</h3></div><div class='flex-row'>${Object.keys(fastestLap)[0]}</div><div class=flex-row>${fastestLap[Object.keys(fastestLap)[0]]}</div>`) : $(`<h3>Fastest lap is availible from 2004 onwards</h3>`);

                const chartData = App.constructDatasetFromObject(positionsGained);
                const colours = Array(chartData.length).fill('#8dd7d7')
                chartContainer.append(App.constructBarChart(chartData.map(x => x.data).splice(0, 4), chartData.map(x => x.label).splice(0, 4), '# Positions Gained (TOP4)', 'vertical', 40, 'TOP4 - Positions Gained', colours, true));
                chartContainer.append($(`<div class='flex-row-column10'></div>`));
                chartContainer.append($(`<div class='flex-row-column40'></div>`).append(fastestLapVisual));

                if (App.filter.getFilterYear() > 1995) {
                    url = `${App.url}${App.filter.getFilterYear()}/${round}/laps.json?limit=1500`;
                    $.getJSON(url).done((data) => {
                        laps = data.MRData.RaceTable.Races[0].Laps.length + 1;
                        data.MRData.RaceTable.Races[0].Laps.forEach(lap => {
                            lap.Timings.forEach(driver => {
                                const driverName = driverIdToName[driver.driverId];
                                positions[driverName].push(driver.position);
                            });
                        });

                        const raceStory = App.constructRaceStory(App.constructDatasetFromObject(positions), laps, 'Race Story');
                        App.hideLoading();
                        divContainer.append(table3Cols);
                        App.dataContainer.append(divContainer);
                        App.dataContainer.append(chartContainer);
                        App.dataContainer.append(raceStory);

                    }).fail((error) => {
                        App.hideLoading();
                        App.dataContainer.empty();
                        console.log(error);
                        App.favouritesBtnContainer.addClass('hide');
                        App.dataContainer.append(App.visuals.error.clone());
                    });
                }
                else {
                    const raceStory = $(`<div class='flex-row'><h3>Race story is availible from 1995 onwards</h3></div>`);
                    App.hideLoading();
                    divContainer.append(table3Cols);
                    App.dataContainer.append(divContainer);
                    App.dataContainer.append(chartContainer);
                    App.dataContainer.append(raceStory);

                }

            }).fail((error) => {
                App.hideLoading();
                App.dataContainer.empty();
                console.log(error);
                App.favouritesBtnContainer.addClass('hide');
                App.dataContainer.append(App.visuals.error.clone());
            });

            break;
        case 2:
            url = `${App.url}circuits/${App.filter.trackId}/constructors/${App.filter.getFilterTeam()}/results.json?limit=200`;
            $.getJSON(url).done((data) => {
                const points = [];
                const tableRows = [];
                const constructorName = data.MRData.RaceTable.Races[0].Results[0].Constructor.name;
                data.MRData.RaceTable.Races.forEach(race => {
                    race.Results.forEach(driver => {
                        const tableRow = $(`<tr><td>${race.season}</td><td>${driver.position}</td><td>${Number(driver.grid) - Number(driver.position)}</td><td>${driver.Driver.givenName} ${driver.Driver.familyName}</td><td>${driver.Constructor.name}</td></tr>`);
                        tableRows.push(tableRow);
                        const driverName = `${driver.Driver.givenName} ${driver.Driver.familyName}`;
                        if (points[driverName]) {
                            points[driverName] += Number(driver.points);
                        }
                        else {
                            points[driverName] = Number(driver.points);
                        }

                    });
                });
                table5Cols.append(tableRows);
                App.hideLoading();
                divContainer.append(table5Cols);
                const chartData = App.constructDatasetFromObject(points);
                const colours = Array(chartData.length).fill('#8dd7d7')
                const chart = chartContainer.append(App.constructBarChart(chartData.map(x => x.data), chartData.map(x => x.label), 'Points gained', 'horizontal', 100, `Total points scored by drivers at ${App.filter.track} for ${constructorName}`, colours, true));
                App.dataContainer.append(divContainer);
                App.dataContainer.append(chart);

            }).fail((error) => {
                App.hideLoading();
                App.dataContainer.empty();
                console.log(error);
                App.favouritesBtnContainer.addClass('hide');
                App.dataContainer.append(App.visuals.error.clone());
            });




            break;
        case 3:
            url = `${App.url}${App.filter.getFilterYear()}/circuits/${App.filter.trackId}/constructors/${App.filter.getFilterTeam()}/results.json?limit=100`;

            $.getJSON(url).done((data) => {
                const tableRows = [];
                const drivers = [];
                let visualData;
                const round = data.MRData.RaceTable.Races[0].round;
                const team = data.MRData.RaceTable.Races[0].Results[0].Constructor.name;
                data.MRData.RaceTable.Races[0].Results.forEach(result => {

                    const tableRow = $(`<tr><td>${data.MRData.RaceTable.Races[0].season}</td><td>${result.position}</td><td>${Number(result.grid) - Number(result.position)}</td><td>${result.Driver.givenName} ${result.Driver.familyName}</td><td>${result.Constructor.name}</td></tr>`);
                    tableRows.push(tableRow);
                    const driverName = `${result.Driver.givenName} ${result.Driver.familyName}`;
                    drivers.push(driverName);

                });


                if (App.filter.getFilterYear() > 1957) {
                    url = `${App.url}${App.filter.getFilterYear()}/${round}/constructorStandings.json?limit=100`;
                    $.getJSON(url).done((data) => {
                        const points = [];
                        data.MRData.StandingsTable.StandingsLists[0].ConstructorStandings.forEach(constructor => {
                            points[constructor.Constructor.name] = Number(constructor.points);
                        });
                        table5Cols.append(tableRows);
                        const chartData = App.constructDatasetFromObject(points);
                        const colours = Array(chartData.length).fill('#8dd7d7');
                        colours[chartData.map(el => el.label).indexOf(team)] = '#ffb7c6';
                        const displayDataLabels = colours.length < 25 ? true : false;
                        visualData = chartContainer.append(App.constructBarChart(chartData.map(x => x.data), chartData.map(x => x.label), 'Points gained', 'horizontal', 100, `Constructer Standings after the race`, colours, displayDataLabels));

                    }).fail(() => {
                        App.hideLoading();
                        App.dataContainer.empty();
                        console.log(error);
                        App.favouritesBtnContainer.addClass('hide');
                        App.dataContainer.append(App.visuals.error.clone());
                    });
                }
                else {
                    visualData = chartContainer.append(`<div class='container chart-container'><div class='flex-row'><h3>Constructor Standing is availible from 1958 onwards</h3></div></div>`);
                }
                url = `${App.url}${App.filter.getFilterYear()}/${round}/driverStandings.json?limit=100`;
                $.getJSON(url).done((data) => {
                    const points = [];
                    data.MRData.StandingsTable.StandingsLists[0].DriverStandings.forEach(driver => {
                        const driverName = `${driver.Driver.givenName} ${driver.Driver.familyName}`;

                        points[driverName] = Number(driver.points);

                    });


                    const chartData = App.constructDatasetFromObject(points);
                    const colours = Array(chartData.length).fill('#8dd7d7');
                    colours[chartData.map(el => el.label).indexOf(drivers[0])] = '#ffb7c6';
                    colours[chartData.map(el => el.label).indexOf(drivers[1])] = '#ffb7c6';
                    const displayDataLabels = colours.length < 25 ? true : false;

                    App.hideLoading();
                    divContainer.append(table5Cols);
                    const chart = chartContainer.append(App.constructBarChart(chartData.map(x => x.data), chartData.map(x => x.label), 'Points gained', 'horizontal', 100, `Driver Standings after the race`, colours, displayDataLabels));
                    App.dataContainer.append(divContainer);
                    App.dataContainer.append(visualData);
                    App.dataContainer.append(chart);

                }).fail((error) => {
                    App.hideLoading();
                    App.dataContainer.empty();
                    console.log(error);
                    App.favouritesBtnContainer.addClass('hide');
                    App.dataContainer.append(App.visuals.error.clone());
                });


            }).fail((error) => {
                App.hideLoading();
                App.dataContainer.empty();
                console.log(error);
                App.favouritesBtnContainer.addClass('hide');
                App.dataContainer.append(App.visuals.error.clone());
            });

            break;
        case 4:
            url = `${App.url}circuits/${App.filter.trackId}/drivers/${App.filter.getFilterDriver()}/results.json?limit=200`;


            $.getJSON(url).done((data) => {
                const points = [];
                const tableRows = [];
                const driverName = `${data.MRData.RaceTable.Races[0].Results[0].Driver.givenName} ${data.MRData.RaceTable.Races[0].Results[0].Driver.familyName}`;
                data.MRData.RaceTable.Races.forEach(race => {
                    const tableRow = $(`<tr><td>${race.season}</td><td>${race.Results[0].position}</td><td>${Number(race.Results[0].grid) - Number(race.Results[0].position)}</td><td>${race.Results[0].Driver.givenName} ${race.Results[0].Driver.familyName}</td><td>${race.Results[0].Constructor.name}</td></tr>`);
                    tableRows.push(tableRow);
                    if (Object.entries(points).some(teams => teams.includes(race.Results[0].Constructor.name))) {
                        points[race.Results[0].Constructor.name] = points[race.Results[0].Constructor.name] + Number(race.Results[0].points);
                    }
                    else {
                        points[race.Results[0].Constructor.name] = Number(race.Results[0].points);
                    }

                });

                App.hideLoading();
                table5Cols.append(tableRows);
                divContainer.append(table5Cols);
                const chartData = App.constructDatasetFromObject(points);
                const colours = Array(chartData.length).fill('#8dd7d7');

                const chart = chartContainer.append(App.constructBarChart(chartData.map(x => x.data), chartData.map(x => x.label), 'Points gained', 'horizontal', 100, `Total points scored by ${driverName} at ${e.target.options.title} per team`, colours, true));
                App.dataContainer.append(divContainer);
                App.dataContainer.append(chart);

            }).fail((error) => {
                App.hideLoading();
                App.dataContainer.empty();
                console.log(error);
                App.favouritesBtnContainer.addClass('hide');
                App.dataContainer.append(App.visuals.error.clone());
            });;




            break;
        case 5: case 7:
            url = `${App.url}${App.filter.getFilterYear()}/circuits/${App.filter.trackId}/drivers/${App.filter.getFilterDriver()}/results.json?limit=200`;

            $.getJSON(url).done((data) => {
                const result = data.MRData.RaceTable.Races[0].Results[0];

                const tableRow = $(`<tr><td>${data.MRData.RaceTable.season}</td><td>${result.position}</td><td>${Number(result.grid) - Number(result.position)}</td><td>${result.Driver.givenName} ${result.Driver.familyName}</td><td>${result.Constructor.name}</td></tr>`);
                const driverName = `${result.Driver.givenName} ${result.Driver.familyName}`;
                table5Cols.append(tableRow);


                App.hideLoading();
                divContainer.append(table5Cols);
                const chart = chartContainer.append(App.constructBarChart([Number(result.points)], [driverName], 'Points gained', 'vertical', 100, `Total points scored by ${driverName} at ${App.filter.track} in ${App.filter.getFilterYear()}`, '#8dd7d7', true));
                App.dataContainer.append(divContainer);
                App.dataContainer.append(chart);

            }).fail((error) => {
                App.hideLoading();
                App.dataContainer.empty();
                console.log(error);
                App.favouritesBtnContainer.addClass('hide');
                App.dataContainer.append(App.visuals.error.clone());
            });;

            break;

        case 6:
            url = `${App.url}circuits/${App.filter.trackId}/constructors/${App.filter.getFilterTeam()}/drivers/${App.filter.getFilterDriver()}/results.json?limit=200`;
            $.getJSON(url).done((data) => {
                let points = 0;
                let driverName, teamName;
                const tableRows = [];
                data.MRData.RaceTable.Races[0].Results.forEach(result => {
                    const tableRow = $(`<tr><td>${data.MRData.RaceTable.Races[0].season}</td><td>${result.position}</td><td>${Number(result.grid) - Number(result.position)}</td><td>${result.Driver.givenName} ${result.Driver.familyName}</td><td>${result.Constructor.name}</td></tr>`);
                    tableRows.push(tableRow);
                    points += Number(result.points);
                    driverName = `${result.Driver.givenName} ${result.Driver.familyName}`;
                    teamName = result.Constructor.name;
                });
                App.hideLoading();
                table5Cols.append(tableRows);
                divContainer.append(table5Cols);
                const chart = chartContainer.append(App.constructBarChart([points], [driverName], 'Points gained', 'vertical', 100, `Total points scored by ${driverName} at ${App.filter.track} for ${teamName}`, '#8dd7d7', true));
                App.dataContainer.append(divContainer);
                App.dataContainer.append(chart);

            }).fail((error) => {
                App.hideLoading();
                App.dataContainer.empty();
                console.log(error);
                App.favouritesBtnContainer.addClass('hide');
                App.dataContainer.append(App.visuals.error.clone());
            });



            break;
    }
};

App.constructBarChart = (chart_data, chart_labels, chart_label, orientation, size, title, colours, displayLabels) => {
    let chartContainer = $(`<div class='flex-row-column${size}'><div class='flex-row chart-title'><h3>${title}</h3></div></div>`);
    const chartSubContainer = $(`<div class='flex-row'></div>`);
    const canvas = $('<canvas></canvas>');
    new Chart(canvas, {
        type: 'bar',
        data: {
            labels: chart_labels,
            datasets: [{
                label: chart_label,
                data: chart_data,
                borderWidth: 1,
                backgroundColor: colours
            }]
        },
        options: {
            indexAxis: orientation === 'vertical' ? 'x' : 'y',
            responsive: true,
            scales: {
                y: {
                    beginAtZero: true,
                    ticks: {
                        autoSkip: false,
                        font: {
                            size: displayLabels ? 12 : 6
                        }
                    }
                },

            },
            plugins: {
                datalabels: {
                    anchor: 'top',
                    align: 'center',
                    formatter: Math.round,
                    font: {
                        weight: 'bold',
                        size: 12
                    },
                    display: displayLabels
                },
            }
        }
    });
    if (size === 100) {
        chartContainer = $(`<div class='container chart-container'><div class='flex-row chart-title'><h3>${title}</h3></div></div>`);
    }
    chartSubContainer.append(canvas)
    chartContainer.append(chartSubContainer)
    return chartContainer;
};
App.constructPieChart = (chart_data, chart_labels, chart_label, colours, size, title) => {
    const chartContainer = $(`<div class='flex-row-column${size}'><div class='flex-row chart-title'><h3>${title}</h3></div></div>`);
    const chartSubContainer = $(`<div class='flex-row'></div>`);
    const canvas = $('<canvas></canvas>');
    new Chart(canvas, {
        type: 'pie',
        data: {
            labels: chart_labels,
            datasets: [{
                label: chart_label,
                data: chart_data,
                backgroundColor: colours,
                hoverOffset: 5
            }]
        },
        options: {
            responsive: true,
            plugins: {
                datalabels: {
                    anchor: 'center',
                    align: 'center',
                    formatter: Math.round,
                    font: {
                        weight: 'bold',
                        size: 15
                    }
                },
                legend: {
                    position: 'right'
                }
            }
        }
    });
    chartSubContainer.append(canvas)
    chartContainer.append(chartSubContainer)
    return chartContainer;

};
App.constructDatasetFromObject = (data) => {
    let dataset = [];
    for (const [key, value] of Object.entries(data)) {
        dataset.push({
            label: key,
            data: value,
        })
    }
    dataset = dataset.sort((a, b) => b.data - a.data);
    return dataset;
};
App.constructRaceStory = (dataset, lapsNum, title) => {
    const chartContainer = $(`<div class='container chart-container race-story'><div class='flex-row'><h3>${title}</h3></div></div>`);
    const chartSubContainer = $(`<div class='flex-row'></div>`);
    const canvas = $('<canvas></canvas>');
    const labels = [...Array(lapsNum)].map((_, i) => `Lap ${i}`);


    new Chart(canvas, {
        type: 'line',
        data: {
            labels: labels,
            datasets: dataset
        },
        options: {
            responsive: true,
            plugins: {
                datalabels: {
                    display: false
                },
                legend: {
                    position: 'right'
                }
            },
            scales: {
                y: {
                    reverse: true,
                    ticks: {
                        min: 1,
                        stepSize: 1,
                    }
                }
            }
        }
    });
    chartSubContainer.append(canvas)
    chartContainer.append(chartSubContainer)
    return chartContainer;
};

App.showHomeTab = () => {
    App.showMapUI();
    App.homeTab.addClass('active');
    App.favouriteTab.removeClass('active');
    App.filter.setFilterYear(App.filter.previousYear);
    App.filter.setFilterTeam(App.filter.previousTeam);
    App.filter.setFilterDriver(App.filter.previousDriver);
    App.favouritesBtnContainer.removeClass('solo-button-container');
    App.pageTitle.html(`<h1>Home Page</h1>`);
};
App.showFavoritesTab = () => {
    App.visualiseFavouritesList();
    App.favouriteTab.addClass('active');
    App.homeTab.removeClass('active');
    App.homeTab.on('click', () => { App.showHomeTab(); });
    App.favouritesBtnContainer.removeClass('solo-button-container');
    App.pageTitle.html(`<h1>Favourites</h1>`);
};

App.init = () => {
    App.filter.getDataForFilterYears();
    App.filter.getDataForFilterTeams();
    App.filter.getDataForFilterDrivers();
    App.getCircuits();

    App.filter.driverFilterSelect.on('change', () => {
        App.filter.driverFilterChange();
    });
    App.filter.teamFilterSelect.on('change', () => {
        App.filter.teamFilterChange();
    });
    App.filter.yearFilterSelect.on('change', () => {
        App.filter.yearFilterChange();
    });

    App.filter.yearFilterClearBtn.on('click', () => {
        App.filter.yearFilterSelect.val('0');
        App.filter.setFilterYear(null);
        App.filter.yearFilterChange();
    });

    App.filter.driverFilterClearBtn.on('click', () => {
        App.filter.driverFilterSelect.val('0');
        App.filter.setFilterDriver(null);
        App.filter.driverFilterChange();
    });

    App.filter.teamFilterClearBtn.on('click', () => {
        App.filter.teamFilterSelect.val('0');
        App.filter.setFilterTeam(null);
        App.filter.teamFilterChange();
    });

    App.getBackMapBtn.on('click', () => {
        App.showMapUI();
        App.homeTab.addClass('active');
        App.favouriteTab.removeClass('active');
    });
    App.addToFavouritesBtn.on('click', (() => {
        App.addToFavourites({ trackName: App.filter.track, trackCountry: App.filter.country, trackID: App.filter.trackId });
    }));

    App.favouriteTab.on('click', () => { App.showFavoritesTab(); });


    App.map.maplayer.addTo(App.map.mapVisual);

    App.filterConfirmBtn.on('click', () => {
        App.map.removeOverlay();
        App.getCircuits();
    });
};

App.init();

