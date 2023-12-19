const appContainer = $('#app');
const mapContainer = $('<div>', {id: 'map','class': 'map'});
const mapSearch = $('<div>', {'class': 'search-wrapper'});

appContainer.append(mapSearch);
appContainer.append(mapContainer);

const placeSearch = $('<div>', {'class': 'place-search'});
const routeSearch = $('<div>', {'class': 'route-search'});

mapSearch.append(placeSearch);
mapSearch.append(routeSearch);

const placeSearchBar = $('<input>', {id: 'p-search','class': 'p-search'});
const originDestination = $('<input>', {id: 'origin','class': 'origin'});
const finalDestination = $('<input>', {id: 'final','class': 'final'});
const placeButton = $('<button>', {id: 'place-button','class': 'place-button'});
const routeButton = $('<button>', {id: 'route-button','class': 'route-button'});

placeSearch.append(placeSearchBar);
placeSearch.append(placeButton);
routeSearch.append(originDestination);
routeSearch.append(finalDestination);
routeSearch.append(routeButton);

let map;

async function initMap() {
  // The location of Uluru
  const position = { lat: -25.344, lng: 131.031 };
  // Request needed libraries.
  //@ts-ignore
  const { Map } = await google.maps.importLibrary("maps");

  // The map, centered at Uluru
  map = new Map(document.getElementById("map"), {
    zoom: 4,
    center: position,
    mapId: "DEMO_MAP_ID",
  });

  //new AutocompleteDirectionsHandler(map);
}

let place;


$(document).ready(function initialize() {
  let autocompletePlaces = new google.maps.places.Autocomplete(
    document.getElementById('p-search'),
    { fields: ['geometry']},
  );
  autocompletePlaces.addListener("place_changed", () => {
    place = autocompletePlaces.getPlace();
    place = {lat: place.geometry.location.lat(), lng: place.geometry.location.lng()};
    map.setCenter(place);
    map.setZoom(10);
    new google.maps.Marker({position: place, map: map});
  });
});




/*class AutocompleteDirectionsHandler {
  map;
  originPlaceId;
  finalPlaceId;
  constructor (map) {
    this.map = map;
    this.originPlaceId = '';
    this.finalPlaceId = '';
  }
}*/

$(document).ready(initMap());
