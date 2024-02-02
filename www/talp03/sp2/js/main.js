async function initMap() {

  // The location of Uluru
  const position = { lat: -25.344, lng: 131.031 };

  // Request needed libraries.
  const { Map } = await google.maps.importLibrary('maps');

  // The map, centered at Uluru
  let map = new Map($('#map')[0], {
    zoom: 4,
    center: position,
    mapId: '1',
  });

  //Classes from Google API
  const marker = new google.maps.Marker();
  const infoWindowPlace = new google.maps.InfoWindow();
  const infoWindowRoute = new google.maps.InfoWindow();
  const directionsService = new google.maps.DirectionsService();
  const directionsRenderer = new google.maps.DirectionsRenderer();
  const geocoder = new google.maps.Geocoder();
  let travelMode = google.maps.TravelMode.DRIVING;

  //Local variables
  const originInput = $('#origin')[0];
  const destinationInput = $('#final')[0];
  const placeInput = $('#p-search')[0];
  let originPlace = '';
  let finalPlace = '';
  const waypointPlace = [];
  const routeSearch = $('#route-search');
  const routeList = $('#route-list');
  let finalBoolean = false;
  let routeOptions = []

  //Loading animation
  const spinner = $(`<div class="center">
                        <div class="orbit">
                          <div class="circle circle-1">
                            <div class="circle circle-2"></div>
                          </div>
                        </div>
                      </div>`);

  const showLoading = () => {
    routeSearch.append(spinner[0]);
    anime({
      targets: '.orbit',
      rotate: 360,
      duration: 500,
      easing: 'linear',
      loop: true
    });
  };

  const hideLoading = () => {
    spinner.remove();
  };

  //Autocomplete handlers
  const autocompletePlaces = new google.maps.places.Autocomplete(
    placeInput,
    { fields: ['geometry', 'formatted_address', 'name'] },
  );

  autocompletePlaces.addListener('place_changed', () => {
    const place = autocompletePlaces.getPlace()
    const placeLatLng = { lat: place.geometry.location.lat(), lng: place.geometry.location.lng() };
    setMarker(placeLatLng);
    setInfoWindowPlace(place);
  });

  const originAutocomplete = new google.maps.places.Autocomplete(
    originInput,
    { fields: ['place_id'] }
  );
  const finalAutocomplete = new google.maps.places.Autocomplete(
    destinationInput,
    { fields: ['place_id'] }
  );

  originAutocomplete.addListener('place_changed', () => {
    const place = originAutocomplete.getPlace();
    originPlace = place.place_id;
    if (finalBoolean) {
      route();
    }
  });

  finalAutocomplete.addListener('place_changed', () => {
    const place = finalAutocomplete.getPlace();
    finalPlace = place.place_id;
    finalBoolean = true;
    route();
  });

  //Functional methods for search of single place
  const setInfoWindowPlace = (place) => {
    const infoContent = `<p>
    Name: ${place.name}<br/>
    Adress: ${place.formatted_address}
    </p>`;

    infoWindowPlace.setContent(infoContent);
    infoWindowPlace.open({ anchor: marker, map: map, });

    marker.addListener('click', () => {
      infoWindowPlace.open({ anchor: marker, map: map, });
    })
  }

  const setMarker = (placeLatLng) => {
    showLoading();
    marker.setMap(null);
    marker.setPosition(placeLatLng);
    marker.setMap(map);
    map.setCenter(placeLatLng);
    map.setZoom(12);
    hideLoading();
  }

  const codeAddress = (placeLatLng) => {
    geocoder.geocode({'location': placeLatLng}, (results, status) => {
      if (status === 'OK') {
        originInput.value = results[0].formatted_address;
        originPlace = results[0].place_id;
        console.log(results[0].address_components[3].short_name);
      } else {
        alert('Geocode was not successful for the following reason: ' + status);
      }
    })
  }

  const saveRoute = async() => {
    routeOptions = [originPlace, finalPlace,];
    if (waypointPlace[0]) {
      routeOptions.push(waypointPlace[0].location.placeId)
    }
    const routeOptionsName = [];
    for (let i = 0; i < routeOptions.length; i++) {
      const response = await geocoder.geocode({'placeId': routeOptions[i]})
        if (response) {
          routeOptionsName.push(response.results[0].formatted_address);
          
          localStorage.setItem('routeNames', JSON.stringify(routeOptionsName));
          localStorage.setItem('route', JSON.stringify(routeOptions));
        } else {
          alert('Geocode was not successful for the following reason: ');
        }
    }

    //routeOptions.push(travelMode);
    console.log(routeOptionsName);
    console.log(routeOptions);
    createList();
  }

  const clickOnList = () => {
    routeOptions.push(travelMode);
    localStorage.setItem('route', JSON.stringify(routeOptions));
    originPlace = JSON.parse(localStorage.getItem('route'))[0];
    finalPlace = JSON.parse(localStorage.getItem('route'))[1];
    if (JSON.parse(localStorage.getItem('route')).length === 4) {
      travelMode = JSON.parse(localStorage.getItem('route'))[3]
      waypointPlace.push({
        location: { placeId: JSON.parse(localStorage.getItem('route'))[2] },
        stopover: true,
      });
    } else {
      travelMode = JSON.parse(localStorage.getItem('route'))[2]
    }
    route();

  }

  const createList = () => {
    const listElement = $(`<li id="saved-route">
    <div id="saved-route1">Origin: ${JSON.parse(localStorage.getItem('routeNames'))[0]}</div>
    <div>Destination: ${JSON.parse(localStorage.getItem('routeNames'))[1]}</div>
    </li>`).on('click', () => {
      clickOnList();
      console.log('das')
    })
    routeList.append(listElement);
  }

  const geolocation = () => {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        const placeLatLng = { lat: position.coords.latitude, lng: position.coords.longitude };
        setMarker(placeLatLng);
        infoWindowPlace.close();
        codeAddress(placeLatLng);
      }, (error) => {
        if (error.code == error.PERMISSION_DENIED) {
          window.swal('We are not able to locate your position', '', 'error');
        }
      })
    } else {
      window.swal('We are not able to locate your position', '', 'error');
    }
  }

  const clearPlace = () => {
    marker.setMap(null);
    infoWindowPlace.setPosition(null);
    placeInput.value = '';
  }

  //Functional methods for search of routes
  const route = () => {
    if (!originPlace || !finalPlace) {
      window.swal('Fill in the place you want to find.');
      destinationInput.value = '';
      finalBoolean = false;
      return;
    };
    showLoading();
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
          hideLoading();
          window.swal('Directions request failed due to ' + status, '', 'error');
        };
      }
    );
  }

  const changeOfTravelMode = (id, mode) => {
    $(`#${id}`).on('click', () => {
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
    infoWindowRoute.close();
    finalBoolean = false;
  }

  const setInfoWindowRoutes = (response) => {
    const infoContent = `<p>
    Distance: ${response.routes[0].legs[0].distance.text}<br/>
    Time of travel: ${response.routes[0].legs[0].duration.text}
    </p>`;
    infoWindowRoute.setContent(infoContent);

    const step = Math.floor(response.routes[0].legs[0].steps.length / 2);

    infoWindowRoute.setPosition(response.routes[0].legs[0].steps[step].end_location);
    infoWindowRoute.open(map);
  }

  const addWaypoint = () => {
    const waypoint = $(`<div id='waypoint-wrapper' class='waypoint-wrapper'>
                          <input id='waypoint-input' class='waypoint-input' type='text'>
                          <button id='clear-waypoint' class='clear-waypoint'>X</button>
                        </div>`)
    routeSearch.append(waypoint);
    const waypointAutocomplete = new google.maps.places.Autocomplete(
      $('#waypoint-input')[0],
      { fields: ['place_id'] }
    );
    waypointAutocomplete.addListener('place_changed', () => {
      const place = waypointAutocomplete.getPlace();
      if (waypointPlace.length === 1) {
        window.swal('Sorry. We currently support only one waypoint.')
      } else {
        waypointPlace.push({
          location: { placeId: place.place_id },
          stopover: true,
        });
      }
      route();
    });
    $('#waypoint-button').hide();
    $('#clear-waypoint').on('click', clearWaypoint);
  }

  const clearWaypoint = () => {
    $('#waypoint-input')[0].value = '';
    waypointPlace.length = 0;
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
  $('#save-button').on('click', () => {
    saveRoute();
  });
};