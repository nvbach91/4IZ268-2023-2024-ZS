/*LOG GOOGLE SHEET*/
const CLIENT_ID = '365198237909-jj3drgjanpboakidi422ek0gbhoh4odq.apps.googleusercontent.com'
const API_KEY2 = 'AIzaSyBTmJ3B-Rd96fsmPz71-Y-SmjUH22JZ7Cc';

// Array of API discovery doc URLs for APIs used by the sample
const DISCOVERY_DOCS = [
    'https://sheets.googleapis.com/$discovery/rest?version=v4'];

// Authorization scopes required by the API; multiple scopes can be
// included, separated by spaces.
const SCOPE_READ = 'https://www.googleapis.com/auth/spreadsheets.readonly';
const SCOPE_WRITE = 'https://www.googleapis.com/auth/drive';
//const SCOPE_SHEET = 'https://www.googleapis.com/auth/spreadsheets';

const SHEET_ID = '1vmCEEhOVdES-JpLhw8iGC15VPcAZ_maTHEAF4RA3_TU';

let result = '';
let numRows = '';

let dataf = [];

const signin_button = document.getElementById('button-add-third');
const signout_button = document.getElementById('button-logout');
const add_button = document.querySelector('#button-add-first');

const result2 = document.getElementById('result');
/**
       *  On load, called to load the auth2 library and API client library.
       */
function handleClientLoad() {
    gapi.load('client:auth2', initClient);
}

/**
 *  Initializes the API client library and sets up sign-in state
 *  listeners.
 */
function initClient() {
    gapi.client.init({
        apiKey: API_KEY2,
        clientId: CLIENT_ID,
        discoveryDocs: DISCOVERY_DOCS,
        scope: SCOPE_WRITE,
        plugin_name: 'sharedMap'
    }).then(function () {
        // Listen for sign-in state changes.
        gapi.auth2.getAuthInstance().isSignedIn.listen(updateSigninStatus);

        // Handle the initial sign-in state.
        updateSigninStatus(gapi.auth2.getAuthInstance().isSignedIn.get());
        //handleAuthClick();
        console.log('inited');
        getValues('1vmCEEhOVdES-JpLhw8iGC15VPcAZ_maTHEAF4RA3_TU', 'A1:M' + numRows);
    });
}

/**
 *  Called when the signed in status changes, to update the UI
 *  appropriately. After a sign-in, the API is called.
 */
function updateSigninStatus(isSignedIn) {
    if (isSignedIn && (signin_button!==null&&add_button!==null)) {
        //getValues('1vmCEEhOVdES-JpLhw8iGC15VPcAZ_maTHEAF4RA3_TU', 'A1:M' + numRows);
        signin_button.style.display = 'none';
        signout_button.style.visibility = 'visible';
        signout_button.style.display = 'inline-block';
        add_button.style.display = 'inline-block';
    }
    else if(isSignedIn && (signin_button==null&&add_button==null)){
        location.href = 'main';
    }
    else if(!isSignedIn && (signin_button!==null&&add_button!==null)){
        add_button.style.display = 'none';
        signout_button.style.visibility = 'hidden';
        signout_button.style.display = 'none';

        signin_button.style.display = 'inline-block';        
    }
    else {
        return false;
    }
}

/**
 *  Sign in the user upon button click.
 */
function handleAuthClick(event) {
    gapi.auth2.getAuthInstance().signIn();
    if(document.getElementById('popup-all3') !== null){
        showHideLogin();
    }
}

/**
 *  Sign out the user upon button click.
 */
function handleSignoutClick(event) {
    gapi.auth2.getAuthInstance().signOut();
    showHideSignout();
}

function getValues(spreadsheetId, range) {
    try {
        gapi.client.sheets.spreadsheets.values.get({
            spreadsheetId: spreadsheetId,
            range: range,
        }).then((response) => {
            result = response.result;
            numRows = result.values ? result.values.length : 0;
            console.log(`${numRows} rows retrieved.`);

            let customURL = '';

            map.loadImage(
                '../img/joint3.png',
                (error, image) => {
                    if (error) throw error;
                    map.addImage('joint', image);
                    map.loadImage(
                        '../img/smoke3.png',
                        (error, image) => {
                            if (error) throw error;
                            map.addImage('smoke', image);

                            for (let i = 1; i < numRows; i++) {
                                let nextPoint2 = {
                                    'type': 'Feature' + [i],
                                    'geometry': {
                                        'type': 'Point',
                                        'coordinates': [parseFloat(result?.values[i][4]), parseFloat(result?.values[i][5])]
                                    },
                                    'properties': {
                                        'name2': result?.values[i][2],
                                        'author': result?.values[i][1],
                                        'description': result?.values[i][3],
                                        'vyhlidka': result?.values[i][6],
                                        'rybnik': result?.values[i][7],
                                        'ohniste': result?.values[i][8],
                                        'zricenina': result?.values[i][9],
                                        'pristresek': result?.values[i][10],
                                        'likes': result?.values[i][11],
                                        'imageSRC': 'https://drive.google.com/uc? export=view&id=' + result?.values[i][12],
                                        'image': result?.values[i][12]
                                    }
                                }
                                dataf.push(nextPoint2);
                                console.log(dataf);
                            }

                            map.addSource('point', {
                                'type': 'geojson',
                                'data': {
                                    'type': 'FeatureCollection',
                                    'features': dataf,
                                },
                                'cluster': true,
                                'clusterMaxZoom': 14, // Max zoom to cluster points on
                                'clusterRadius': 65 // Radius of each cluster when clustering points (defaults to 50)
                            });

                            map.addLayer({
                                'id': 'clusters',
                                'type': 'symbol',
                                'source': 'point',
                                'filter': ['has', 'point_count'],
                                'layout': {
                                    'icon-image': 'smoke',
                                    'icon-size': 0.25,
                                    'icon-overlap': 'always',
                                    'icon-padding': 0,
                                    'icon-allow-overlap': true
                                }
                            });
                            map.addLayer({
                                'id': 'cluster-count',
                                'type': 'symbol',
                                'source': 'point',
                                'filter': ['has', 'point_count'],
                                'layout': {
                                    'text-field': '{point_count_abbreviated}',
                                    'text-font': ['SweetLeaf_Regular'],
                                    'text-size': 33,
                                    'icon-allow-overlap': true
                                },
                                'paint': {
                                    'text-color': '#448C1F',
                                    'text-translate': [-4, 4],
                                },
                            });
                            map.addLayer({
                                'id': 'unclustered-points',
                                'type': 'symbol',
                                'source': 'point',
                                'filter': ['!', ['has', 'point_count']],
                                'layout': {
                                    'icon-image': 'joint',
                                    'icon-size': 0.15,
                                    'icon-allow-overlap': true
                                }
                            });
                        }
                    );



                });
        });



    } catch (err) {
        console.log(err.message);
        return;
    }
}


/*ADD MAP*/
const API_KEY_MAP = 'CkkzZYbeWORyINsjMDLb9OpXKxqoxc4GKppEpmUypdE';

const url2 = 'https://my-json-server.typicode.com/auzkya/map/places'

let latitude = 14.8981184;
let longitude = 49.8729317;

let places = { 'random': 'random' };
let points = {};

/*
We create a map with initial coordinates zoom, a raster tile source and a layer using that source.
See https://maplibre.org/maplibre-gl-js-docs/example/map-tiles/
See https://maplibre.org/maplibre-gl-js-docs/style-spec/sources/#raster
See https://maplibre.org/maplibre-gl-js-docs/style-spec/layers/
*/

const map = new maplibregl.Map({
    container: 'map',
    center: [latitude, longitude],
    zoom: 15,
    style: {
        'version': 8,
        'glyphs': '../_fonts/{fontstack}/{range}.pbf',
        'sources': {
            'basic-tiles': {
                'type': 'raster',
                'url': `https://api.mapy.cz/v1/maptiles/basic/tiles.json?apikey=${API_KEY_MAP}`,
                'tileSize': 256,
            },
        },
        'layers': [{
            'id': 'tiles',
            'type': 'raster',
            'source': 'basic-tiles',
            /*'paint':{
                'background-color': 'white'  
            },
            'layout':{
                'visibility': 'visible'
            }*/
        }],
    },
});

let zoom = map.getZoom();

// Add geolocate control to the map.
map.addControl(
    new maplibregl.GeolocateControl({
        positionOptions: {
            enableHighAccuracy: true
        },
        trackUserLocation: true
    })
);

/*
We also require you to include our logo somewhere over the map.
We create our own map control implementing a documented interface,
that shows a clickable logo.
See https://maplibre.org/maplibre-gl-js-docs/api/markers/#icontrol
*/
class LogoControl {
    onAdd(map) {
        this._map = map;
        this._container = document.createElement('div');
        this._container.className = 'maplibregl-ctrl';
        this._container.innerHTML = "<a href='http://mapy.cz/' target='_blank'><img  width='80px' src='https://api.mapy.cz/img/api/logo.svg' ></a>";

        return this._container;
    }

    onRemove() {
        this._container.parentNode.removeChild(this._container);
        this._map = undefined;
    }
};
// finally we add our LogoControl to the map
map.addControl(new LogoControl(), 'bottom-left');


// inspect a cluster on click
map.on('click', 'clusters', (e) => {
    const features = map.queryRenderedFeatures(e.point, {
        layers: ['clusters']
    });
    const clusterId = features[0].properties.cluster_id;
    map.getSource('point').getClusterExpansionZoom(
        clusterId,
        (err, zoom) => {
            if (err) return;

            map.easeTo({
                center: features[0].geometry.coordinates,
                zoom
            });
        }
    );
});

map.on('click', 'unclustered-points', (e) => {
    let coordinates = e.features[0].geometry.coordinates.slice();
    let description = e.features[0].properties.description;
    let name2 = e.features[0].properties.name2;
    let imageSRC = e.features[0].properties.imageSRC;
    let image = e.features[0].properties.image;
    let author = e.features[0].properties.author;

    let vyhlidka = e.features[0].properties.vyhlidka;
    let rybnik = e.features[0].properties.rybnik;
    let ohniste = e.features[0].properties.ohniste;
    let zricenina = e.features[0].properties.zricenina;
    let pristresek = e.features[0].properties.pristresek;
    let likes = e.features[0].properties.likes;

    console.log(vyhlidka);
    // Ensure that if the map is zoomed out such that multiple
    // copies of the feature are visible, the popup appears
    // over the copy being pointed to.
    while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
        coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
    }

    const mobileDiv = document.getElementById('information-allM');
    mobileDiv.style.display = 'block';
    const popup2 = document.getElementById('popup-all2');
    popup2.style.display = 'block';
    if (marker) {
        removePoint();
    }
    mobileDiv.innerHTML =
        `
        <div class='information-M'>
            <!--<button class='button-exit' onclick='hideInfo()'><i class='fa-solid fa-xmark'></i></button>-->
            <h2>${name2}</h2>
            <p class='author author-${author}'>${author}</p>
            <textarea class='description description-${description}' readonly>${description}</textarea>
            <div class='icons'>
                <i class='fa-solid fa-mountain icon-${vyhlidka}'></i>
                <i class='fa-solid fa-water icon-${rybnik}'></i>
                <i class='fa-solid fa-fire icon-${ohniste}'></i>
                <i class='fa-solid fa-chess-rook icon-${zricenina}'></i>
                <i class='fa-solid fa-umbrella icon-${pristresek}'></i>
            </div>
            <img src='${imageSRC}' class='img-${image}'></img>
        </div>
        `;

    new maplibregl.Popup()
        .setLngLat(coordinates)
        .setHTML(`
        <div class='information-all'>
            <img src='${imageSRC}' class='img-${image}'></img>
            <h2>${name2}</h2>
            <p class='author author-${author}'>${author}</p>
            <textarea class='description description-${description}' readonly>${description}</textarea>
            <div class='icons'>
                <i class='fa-solid fa-mountain icon-${vyhlidka}'></i>
                <i class='fa-solid fa-water icon-${rybnik}'></i>
                <i class='fa-solid fa-fire icon-${ohniste}'></i>
                <i class='fa-solid fa-chess-rook icon-${zricenina}'></i>
                <i class='fa-solid fa-umbrella icon-${pristresek}'></i>
            </div>
        </div>
        `)
        .addTo(map);
});

// Center the map on the coordinates of any clicked symbol from the 'symbols' layer.
map.on('click', 'unclustered-points', (e) => {
    map.flyTo({
        //center: [e.features[0].geometry.coordinates[0], e.features[0].geometry.coordinates[1]+0.0015],
        center: [e.features[0].geometry.coordinates[0], e.features[0].geometry.coordinates[1]],
        zoom: 16
    });
});

// Change the cursor to a pointer when the mouse is over the places layer.
map.on('mouseenter', 'unclustered-points', () => {
    map.getCanvas().style.cursor = 'pointer';
});

// Change it back to a pointer when it leaves.
map.on('mouseleave', 'unclustered-points', () => {
    map.getCanvas().style.cursor = '';
});

/*USER ADD POINT*/
const marker = new maplibregl.Marker({ draggable: false });
const buttonAddS = document.querySelector('#button-add-second');
const buttonRemove = document.querySelector('#button-remove');
function addPoint() {
    marker.setLngLat(map.getCenter().toArray())
    marker.addTo(map);
    add_button.style.display = 'none';
    buttonAddS.style.display = 'inline-block';
    buttonRemove.style.display = 'block';
}
function removePoint() {
    marker.remove();
    add_button.style.display = 'inline-block';
    buttonAddS.style.display = 'none';
    buttonRemove.style.display = 'none';
    signin_button.style.display = 'none';
}

map.on('move', () => {
    /*const mobileDiv = document.getElementById('information-allM');
    mobileDiv.style.display = 'none';*/
    marker.setLngLat(map.getCenter().toArray())
})

function onDragEnd() {
    let lngLat = marker.getLngLat();
    console.log(`Longitude: ${lngLat.lng}<br />Latitude: ${lngLat.lat}`)
}
