import { AppService } from '../app.service.js'
import { apis } from '../configs/apis.config.js'
import { config } from '../configs/config.js'
import { Events } from '../configs/events.js'

/*
	Třída MapService - je třída služby mapy, která se zabývá zpracováním logiky mapy. 
*/
export class MapService {

	constructor() { }

	// metoda pro inicializace mapy a jeji počatecní nastavení podle specifikováného kontejneru, jazyka a počátečných koordinát
	initMap = (container, language, initialCoordinates = null) => {
		// pokud nejsou zadány počateční koordináty, vezme si běžné z konfigu
		initialCoordinates = initialCoordinates ? initialCoordinates : config.defaultPlace.coords
		this.mapContainer = container
		const key = apis.google
		const callbackName = 'initMapCallback'
		if (this.map) {
			this.createMap(initialCoordinates)
			return
		}
		// do globální proměnné window bude uložená callback funkce pro její spuštění hned po získání mapy z google serveru, až metoda je vyvolaná proměnná je hned vymázaná
		window[callbackName] = () => {
			this.createMap(initialCoordinates)
			delete window[callbackName]
		}

		// pro získání google mapy je potřeba přes REST API se připojít k jejich serveru a na tento požadávek server vrátí objekt mapy podle jazyka či chyby a vyvolá příslušnou metodu
		$.ajax({
			url: `https://maps.googleapis.com/maps/api/js?key=${key}&libraries=places&language=${language}&callback=${callbackName}`,
			dataType: 'script',
		})
	}

	// metoda pro vytváření markerů. Když uživatel klikne příslušném tlačítkem po mapě, ta spustí příslušnou metodou pro nastavení markeru podle koordinát
	setupClickEvent() {
		google.maps.event.addListener(
			this.map,
			config.markerClickType,
			(event) => {
				const clickedCoords = {
					lat: event.latLng.lat(),
					lng: event.latLng.lng(),
				}

				this.addMarker(clickedCoords.lat, clickedCoords.lng)
			})
	}

	// metoda pro vytváření mapy po jí získání od google serveru
	createMap = (initialCoordinates) => {
		this.map = new google.maps.Map(this.mapContainer, {
			center: {
				lat: initialCoordinates.lat,
				lng: initialCoordinates.lng
			},
			zoom: config.zoom,
		})

		// vytvořění standardních služeb zpracovávání tras
		this.directionsService = new google.maps.DirectionsService()
		this.directionsDisplay = new google.maps.DirectionsRenderer()
		this.directionsDisplay.setMap(this.map)

		// po vytoření mapy a služeb zpracovávání tras je možné spustit poslouchač kliknutí po ní
		this.setupClickEvent()
		// nahlašení eventu, že mapa je připravená
		AppService.emit(Events.GOOGLELOADED)
	}

	// nastavení centru koordinát mapy
	setCoords = (newCoords) => {
		if (!this.map) return
		this.map.setCenter({
			lat: newCoords.lat,
			lng: newCoords.lng
		})
	}

	// metoda pro vytváření markeru na mapě podle koordinát, názvu a popisu
	addMarker(lat, lng, title, description) {
		const marker = new google.maps.Marker({
			position: { lat, lng },
			map: this.map,
			title: title,
		})
		const infoWindow = new google.maps.InfoWindow({
			content: description,
		})

		// poslouchač eventu zmačknutí markeru, běžně spustí okénko s informacemi, resp. popisem
		marker.addListener('click', () => {
			infoWindow.open(this.map, marker)
		})

		// objeckt s metody pro obnovení markeru
		const update = {
			// metoda pro nastavení nového názvu markeru
			setTitle: (title) => {
				marker.setTitle(title)
			},
			// metoda pro úpravu popisu markeru
			setDescription: (description) => {
				infoWindow.setContent(description)
			},
			// metoda pro vymazání markeru
			delete: () => {
				marker.setMap(null)
			}
		}

		// event vyvoláný pro další zpracování markeru stránkami
		AppService.emit(Events.ADDMARKER, marker, update, title, description)
		return marker
	}

	// metoda pro nastavení trasy na mapě
	getDirections(origin, destination) {
		const request = {
			origin,
			destination,
			travelMode: 'DRIVING',
		}

		// požádá službu tras vytvořit novou trasu podle zadáných koordinát destinace a původního místa
		this.directionsService.route(request, (result, status) => {
			if (status === 'OK') {
				this.directionsDisplay.setDirections(result)
			}
		})
	}
}
