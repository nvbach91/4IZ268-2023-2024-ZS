async function initMap() {
  
  // The location of Uluru
  const position = { lat: -25.344, lng: 131.031 };
  
  // Request needed libraries.
  const { Map } = await google.maps.importLibrary('maps');
  
  // The map, centered at Uluru
  let map = new Map($('#map')[0], {
    zoom: 4,
    center: position,
    mapId: 'DEMO_MAP_ID',
  });

  //Classes from Google API
  const marker = new google.maps.Marker();
  const infoWindow = new google.maps.InfoWindow();
  const directionsService = new google.maps.DirectionsService();
  const directionsRenderer = new google.maps.DirectionsRenderer();
  let travelMode = google.maps.TravelMode.DRIVING;

  //Local variables
  const originInput = $('#origin')[0];
  const destinationInput = $('#final')[0];
  let originPlace = '';
  let finalPlace = '';
  const waypointPlace = [];
  
  //Loading animation
  const spinner = $('<div class="spinner"></div>');
  
  const showLoading = () => {
    $('#route-search').append(spinner[0]);
    console.log('cvbcc');
  };
  
  const hideLoading = () => {
    spinner.remove();
  };

  //Autocomplete handlers
  const autocompletePlaces = new google.maps.places.Autocomplete(
    $('#p-search')[0],
    { fields: ['geometry', 'formatted_address', 'name']},
  );

  autocompletePlaces.addListener('place_changed', () => {
    const place = autocompletePlaces.getPlace()
    const placeLatLng = {lat: place.geometry.location.lat(), lng: place.geometry.location.lng()};
    setMarker(placeLatLng);
    setInfoWindowPlace(place);
  });

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
    originPlace = place.place_id;
  });

  finalAutocomplete.addListener('place_changed', () => {
    const place = finalAutocomplete.getPlace();
    finalPlace = place.place_id;
    route();
  });

  //Functional methods for search of single place
  const setInfoWindowPlace = (place) => {
    const infoContent = `<p>
    Name: ${place.name}<br/>
    Adress: ${place.formatted_address}
    </p>`;

    infoWindow.setContent(infoContent);
    infoWindow.open({anchor: marker, map: map,});

    marker.addListener('click', () => {
    infoWindow.open({anchor: marker, map: map,});
    })
  }

  const setMarker = (placeLatLng) => {
    showLoading();
    marker.setMap(null);
    marker.setPosition(placeLatLng);
    marker.setMap(map);
    map.setCenter(placeLatLng);
    map.setZoom(12);
  }
  
  const geolocation = () => {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        const placeLatLng = {lat: position.coords.latitude, lng: position.coords.longitude};
        setMarker(placeLatLng);
      })
    } else {
      console.log('asdas');
    }
  }

  const clearPlace = () => {
    marker.setMap(null);
    infoWindow.setPosition(null);
  }

  //Functional methods for search of routes
  const route = () => {
    showLoading();
    if (!originPlace || !finalPlace) {
      window.swal('Fill in the place you want to find.');
      return $('#final')[0].value='';
    };
  
    directionsService.route(
      {
        origin: { placeId: originPlace },
        destination: { placeId: finalPlace },
        waypoints: waypointPlace, 
        travelMode: travelMode,
      },
      (response, status) => {
        if (status === 'OK') {
          directionsRenderer.setMap(map);
          directionsRenderer.setDirections(response);
          setInfoWindowRoutes(response);
          hideLoading();
        } else {
          window.swal('Directions request failed due to ' + status, '', 'error');
        };
      }
    );
  }  

  const changeOfTravelMode = (id, mode) => {
    $(`#${id}`).on('click', () => {
      showLoading();
      travelMode = mode;
      route();
    });
  };

  const clearRoute = () => {
    originInput.value = '';
    destinationInput.value = '';
    $('#waypoint-wrapper').remove();
    originPlace = '';
    finalPlace = '';
    waypointPlace.length = 0;
    $('#waypoint-button').show();
    directionsRenderer.setMap(null);
    infoWindow.setPosition(null);
  }

  const setInfoWindowRoutes = (response) => {
    const infoContent = `<p>
    Time of travel: ${response.routes[0].legs[0].distance.text}<br/>
    Distance: ${response.routes[0].legs[0].duration.text}
    </p>`;
    infoWindow.setContent(infoContent);

    const step = Math.floor(response.routes[0].legs[0].steps.length / 2);
  
    infoWindow.setPosition(response.routes[0].legs[0].steps[step].end_location);
    infoWindow.open(map);
  }

  const addWaypoint = () => {
    const waypoint = $(`<div id='waypoint-wrapper' class='waypoint-wrapper'>
                          <input id='waypoint-input' class='waypoint-input' type='text'>
                          <button id='clear-waypoint' class='clear-waypoint'>X</button>
                        </div>`)
      $('#route-search').append(waypoint);
      const waypointAutocomplete = new google.maps.places.Autocomplete(
        $('#waypoint-input')[0],
        {fields: ['place_id']}
      );
      waypointAutocomplete.addListener('place_changed', () => {
        const place = waypointAutocomplete.getPlace();
        if (waypointPlace.length === 1) {
          window.swal('Sorry. We currently support only one waypoint.')
        } else {
          waypointPlace.push({
          location: { placeId: place.place_id },
          stopover: true,
        });}
        route();
      });
      $('#waypoint-button').hide();
      $('#clear-waypoint').on('click', clearWaypoint);
  }

  const clearWaypoint = () => {
    $('#waypoint-input')[0].value = '';
    waypointPlace.length= 0;
    console.log('asas');
    route();
  }

  //Change of travel option
  changeOfTravelMode(
    'changemode-walking',
    google.maps.TravelMode.WALKING,
  );
  changeOfTravelMode(
    'changemode-transit',
    google.maps.TravelMode.TRANSIT,
  );
  changeOfTravelMode(
    'changemode-driving',
    google.maps.TravelMode.DRIVING,
  );

  //Event handlers
  $('#geolocation-button').on('click', geolocation);
  $('#place-button').on('click', clearPlace);
  $('#route-button').on('click', clearRoute);
  $('#waypoint-button').on('click', addWaypoint);
  
};