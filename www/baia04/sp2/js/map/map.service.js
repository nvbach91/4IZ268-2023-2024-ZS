import { AppService } from '../app.service.js'
import { Events } from '../enums/events.enum.js'
import { mapConfig } from './map.config.js'
import { MapView } from './map.view.js'

/*
	Třída MapService - je třída služby mapy, která se zabývá zpracováním logiky mapy. 
*/
export class MapService {

	constructor() {
		this.map = null
		this.view = new MapView()
	}

	// metoda pro inicializace mapy a jeji počatecní nastavení podle specifikováného kontejneru
	initMap = (container, initialCoordinates = null) => {
		// pokud nejsou zadány počateční koordináty, vezme si běžné z konfigu
		const coordinates = initialCoordinates || mapConfig.defaultPlace.coords
		const token = mapConfig.api
		const user = mapConfig.userName
		const styleID = mapConfig.styleID

		const url = `https://api.mapbox.com/styles/v1/${user}/${styleID}?access_token=${token}`

		// pokud tato funkce je vyvolaná při tom, že už mapa existuje, není potřeba se dotazovat na server, stačí ji vytvořit znovu
		if (this.map) {
			this.createMap(coordinates)
			return
		}

		// pro získání mapboxGL mapy je potřeba přes API se připojít k jejich serveru a na tento požadávek server vrátí objekt mapy či chybu a vyvolá příslušnou metodu
		$.ajax({
			method: "GET",
			dataType: "json",
			url: url,
			success: (style) => { this.createMap(style, container, coordinates) },
			error: (er) => { console.log(er) }
		})
	}

	// metoda pro vytváření mapy po jí získání od serveru
	createMap = (style, container, initialCoordinates) => {
		mapboxgl.accessToken = mapConfig.api
		if (!container) return

		// vytvoří se mapa podle definováného stylu a uloží se do kontejneru na stránce 
		this.map = new mapboxgl.Map({
			container: container,
			center: initialCoordinates,
			zoom: mapConfig.zoom,
			style: style
		})

		// pro následující vytvoření tras potřebujeme mít tzv. router
		this.router = new MapboxDirections({
			accessToken: mapConfig.api,
			interactive: false,
		})

		// přířadí se router k mapě
		this.map.addControl(this.router, 'top-left')

		// funkce pro nastavení markeru
		const addMarkerFunction = (coords) => { this.addMarker(coords) }

		// nastavení udalostí po kliknutí na mapu, vytvoří se nový marker
		this.map.on('click', (event) => {
			// zjistí koordinát klitkuntí
			const clickedCoords = {
				lat: event.lngLat.lat,
				lng: event.lngLat.lng,
			}
			addMarkerFunction(clickedCoords)
		})

		// nahlašení eventu, že mapa je připravená
		AppService.emit(Events.OnMapLoaded)
	}

	// nastavení centru koordinát mapy
	setCoords = (newCoords) => {
		if (this.map) {
			this.map.setCenter([
				newCoords.lng,
				newCoords.lat,
			])
		}
	}

	// metoda pro nastavení trasy na mapě 
	setRoute(origin, destination) {
		// mapa se nemusí načíst hned, ale je velmi důležitá věc stránky, takže nemůžeme dovolit, aby uživatel něco dělal bez mapy. Radši necháme ho cvílku čekat, než se mapa připraví
		const interval = setInterval(() => {
			if (!this.map?.loaded()) return
			const originCoords = [origin.lng, origin.lat]
			const destinationCoords = [destination.lng, destination.lat]

			// nastaví trasu z původního místa na cílové
			this.router.setOrigin(originCoords)
			this.router.setDestination(destinationCoords)

			// až je mapa hotova, žádný interval nepokračuje
			clearInterval(interval)
		}, 50)
	}

	// nastavení nekolika markerů najednou
	addMarkers = (markers) => {
		// mapa se nemusí načíst hned, ale je velmi důležitá věc stránky, takže nemůžeme dovolit, aby uživatel něco dělal bez mapy. Radši necháme ho cvílku čekat, než se mapa připraví
		const interval = setInterval(() => {
			if (!this.map?.loaded()) return

			// pro každý marker ze seznamů, vyvolá funkce pro nastavení markerů
			markers.forEach((currentMarker) => {
				this.addMarker(
					currentMarker,
					currentMarker.title,
					currentMarker.description
				)
			})

			// až je mapa hotova, žádný interval nepokračuje
			clearInterval(interval)
		}, 50)
	}

	// metoda pro vytváření markeru na mapě podle koordinát, názvu a popisu
	addMarker = (coordinates, title, description) => {
		// získá element markeru
		const markerView = this.view.getMarkerPopUp(title, description)

		// vytoří nový marker 
		const marker = new mapboxgl.Marker()
			.setLngLat([coordinates.lng, coordinates.lat])
			.setPopup(new mapboxgl.Popup().setHTML(markerView))
			.addTo(this.map)

		marker.getElement().style.cursor = 'pointer'

		// nastavení popUp menu při kliknutí na marker
		marker.getElement().addEventListener('click', (event) => {
			marker.togglePopup()
			event.stopPropagation() // pokud uživatel kliknul na marker, není potřeba na tomto místě vytvařet nový
		})

		// event vyvoláný pro další zpracování markeru stránkami
		AppService.emit(Events.AddMarker, marker, title, description)
		return marker
	}

	// metoda pro obnovení informace o markeru. Ziská a nasteví nové popUp menu
	updateMarker = (marker, title, description) => {
		const newPopUp = this.view.getMarkerPopUp(title, description)
		marker.getPopup().setHTML(newPopUp)
	}

	// metoda pro vymazání markeru z mapy
	removeMarker = (marker) => { marker.remove() }
}
