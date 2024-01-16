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
const routeButton = $(`<button id='route-button' class='route-button'>Delete route</button>`);
const modeSelector = $('<div>', {id: 'mode-selector','class': 'mode-selector'});
const walking = $('<input>', {id: 'changemode-walking', name: 'type', type: 'radio', checked: 'checked', 'class': 'mode walking'});
const driving = $('<input>', {id: 'changemode-driving', name: 'type', type: 'radio', checked: 'checked', 'class': 'mode driving'});
const transit = $('<input>', {id: 'changemode-transit', name: 'type', type: 'radio', checked: 'checked', 'class': 'mode transit'});
const labelWalking= $('<label>', {for: 'changemode-walking'}).text('Walking');
const labelDriving = $('<label>', {for: 'changemode-driving'}).text('Driving');
const labelTransit = $('<label>', {for: 'changemode-transit'}).text('Transit');

placeSearch.append(placeSearchBar);
placeSearch.append(placeButton);
routeSearch.append(originDestination);
routeSearch.append(finalDestination);
routeSearch.append(routeButton);
routeSearch.append(modeSelector);
modeSelector.append(walking);
modeSelector.append(driving);
modeSelector.append(transit);
modeSelector.append(labelWalking);
modeSelector.append(labelDriving);
modeSelector.append(labelTransit);

let map;

//routeButton.addEventListener("click", a);


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

  new SearchPlace(map)
  new AutocompleteRouteHandler(map);
};

// class handling search of individual place
class SearchPlace {
  map;
  place;
  placeLatLng;
  marker;
  //infoWindow;

  constructor(map) {
    this.map = map;
    this.place = [];
    this.placeLatLng = {};
    this.marker = new google.maps.Marker();
    this.infoWindow = new google.maps.InfoWindow();
    
    const autocompletePlaces = new google.maps.places.Autocomplete(
      document.getElementById('p-search'),
      { fields: ['geometry', 'formatted_address', 'name']},
    );
    autocompletePlaces.addListener('place_changed', () => {
      this.place = autocompletePlaces.getPlace();
      this.placeLatLng = {lat: this.place.geometry.location.lat(), lng: this.place.geometry.location.lng()};
      this.setMarker();
      this.setInfoWindow();
      const placeInfo = this.place.formatted_address;
      console.log(placeInfo);
    });

   //routeButton.addEventListener("click", a);
  };

  setMarker() {
    this.marker.setMap(null);
    this.marker.setPosition(this.placeLatLng);
    this.marker.setMap(this.map);
    this.marker.setTitle(this.place.name);
    this.map.setCenter(this.placeLatLng);
    this.map.setZoom(12);
  }

  setInfoWindow() {
    const infoContent = `<p>
    Name: ${this.place.name}<br/>
    Adress: ${this.place.formatted_address}
    </p>`;

    this.infoWindow.setContent(infoContent);
    this.infoWindow.open({anchor: this.marker, map: map,});

    this.marker.addListener('click', () => {
      this.infoWindow.open({anchor: this.marker, map: map,});
    })
  }

};

// class for handling search for route
class AutocompleteRouteHandler {
  map;
  originPlace;
  finalPlace;
  directionsService;
  directionsRenderer;
  travelMode;
  infoWindow;
  travelTime;
  travelDistance;

  constructor() {
    this.map = map;
    this.originPlace = '';
    this.finalPlace = '';
    this.travelTime = '';
    this.travelDistance = '';
    this.directionsService = new google.maps.DirectionsService();
    this.directionsRenderer = new google.maps.DirectionsRenderer();
    this.directionsRenderer.setMap(map);
    this.travelMode = google.maps.TravelMode.DRIVING;
    this.infoWindow = new google.maps.InfoWindow();

    const originInput = document.getElementById("origin");
    const destinationInput = document.getElementById("final");
    
    const originAutocomplete = new google.maps.places.Autocomplete(
      originInput,
      {fields: ['place_id']}
    );
    const finalAutocomplete = new google.maps.places.Autocomplete(
      destinationInput,
      {fields: ['place_id']}
    );

    originAutocomplete.addListener('place_changed', () => {
      const place = originAutocomplete.getPlace();
      this.originPlace = place.place_id;
    });

    finalAutocomplete.addListener('place_changed', () => {
      const place = finalAutocomplete.getPlace();
      this.finalPlace = place.place_id;
      this.route();
      this.setInfoWindow();
    });

    this.changeOfTravelMode(
      "changemode-walking",
      google.maps.TravelMode.WALKING,
    );
    this.changeOfTravelMode(
      "changemode-transit",
      google.maps.TravelMode.TRANSIT,
    );
    this.changeOfTravelMode(
      "changemode-driving",
      google.maps.TravelMode.DRIVING,
    );
  };

  changeOfTravelMode(id, mode) {
    document.getElementById(id).addEventListener("click", () => {
      this.travelMode = mode;
      this.route();
      this.setInfoWindow();
    });

    routeButton.on('click', this.clearRouteOutput)
  };

  route() {
    if (!this.originPlace || !this.finalPlace) {
      window.alert("Fill in the place you want to find.");
      return document.getElementById("final").value='';
    };
  
    this.directionsService.route(
      {
        origin: { placeId: this.originPlace },
        destination: { placeId: this.finalPlace },
        travelMode: this.travelMode,
      },
      (response, status) => {
        if (status === "OK") {
          this.directionsRenderer.setDirections(response);
          this.setInfoWindow(response);
        } else {
          window.alert("Directions request failed due to " + status);
        };
      }
    );
  };

  clearRouteOutput() {
    document.getElementById("origin").value='';
    document.getElementById("final").value='';
    this.directionsRenderer.setMap(null);
  }

  setInfoWindow(response) {
    const infoContent = `<p>
    Time of travel: ${response.routes[0].legs[0].distance.text}<br/>
    Distance: ${response.routes[0].legs[0].duration.text}
    </p>`;
    this.infoWindow.setContent(infoContent);

    const step = Math.floor(response.routes[0].legs[0].steps.length / 2);
  
    this.infoWindow.setPosition(response.routes[0].legs[0].steps[step].end_location);
    this.infoWindow.open(map);

    this.directionsRenderer.addListener('click', () => {
      this.infoWindow.open(map);
    })
  }
};