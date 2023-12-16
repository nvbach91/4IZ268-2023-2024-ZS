import { AppService } from '../app.service.js'
import { apis } from '../configs/apis.config.js'
import { Events } from '../configs/events.js'
import { Marker } from '../pages/Marker.js'

/*
	Třída PositionService - je třída služby pozic, která se zabývá zpracováním logiky zjištění, ověření a ukladnání geolokací. 
*/
export class PositionService {
	constructor() {
		// objekt pro ukladání lokací
		this.places = {
			origin: {
				name: null,
				coords: {
					lat: null,
					lng: null,
				},
				isOk: null
			},
			destination: {
				name: null,
				coords: {
					lat: null,
					lng: null,
				},
				isOk: null
			},
			checkpoints: []
		}
	}

	// metoda, která ověří správnost zadáné lokace
	requestOrigin = (langName) => {
		this.getGeoLocation()
			.then((coords) => {
				this.places.origin.coords = {
					lat: coords[0],
					lng: coords[1]
				}
				this.getPlaceByCoords(coords, langName)
					.then((place) => {
						this.places.origin.name = place
						this.places.origin.isOk = true
						// vyvolá event nastavení názvu pozice na stránce
						AppService.emit(Events.ORIGINPOST, this.places.origin)
					})
					.catch((error) => {
						this.places.origin.isOk = false
						// vyvolá event nastavení názvu pozice na stránce
						AppService.emit(Events.ORIGINPOST, this.places.origin)
					})
			})
			.catch((error) => {
				this.places.origin.isOk = false
				// vyvolá event nastavení názvu pozice na stránce
				AppService.emit(Events.ORIGINPOST, this.places.origin)
			})
	}

	// metoda pro nastavení koordinát centru mapy
	requestMapCentre = () => {
		if (!this.places.origin.isOk) return
		AppService.emit(Events.UPDATEMAPCENTRE, this.places.origin.coords)
	}

	// metoda pro ověření trasy z místa A do místa B
	checkRoute = (origin, destination) => {
		this.places.destination.name = destination
		this.places.origin.name = origin
		this.getCoordsByPlace(destination)
			.then((coords) => {
				this.places.destination.coords = coords
				this.places.destination.isOk = true
				this.getCoordsByPlace(origin)
					.then((coords) => {
						this.places.origin.coords = coords
						this.places.origin.isOk = true
						// vyvolá event nastavení trasy na mapě
						AppService.emit(Events.ROUTEPOST, this.places.origin, this.places.destination)
					})
					.catch((error) => {
						this.places.origin.isOk = false
						// vyvolá event nastavení trasy na mapě
						AppService.emit(Events.ROUTEPOST, this.places.origin, this.places.destination
						)
					})
			})
			.catch((error) => {
				this.places.destination.isOk = false
				// vyvolá event nastavení trasy na mapě
				AppService.emit(Events.ROUTEPOST, this.places.origin, this.places.destination
				)
			})
	}

	// metoda pro obnovení uložených markerů do localStorage
	updateMarkers = () => {
		// vymaže existující markery
		this.places.checkpoints = []
		// převezme ze seznamů markeru nutné informace a uloží je do vlastního pole checkpointů
		Marker.makerList.forEach((marker) => {
			const id = marker.getID()
			const pos = marker.getMapMarker().position
			const point = {
				id: id,
				title: marker.getTitle(),
				description: marker.getDescription(),
				lat: pos.lat(),
				lng: pos.lng()
			}
			if (!(id in this.places.checkpoints)) {
				this.places.checkpoints.push(point)
			} else {
				for (
					let i = 0; i < this.places.checkpoints.length; i++
				) {
					const currentPoint = this.places.checkpoints[i]
					if (currentPoint.id !== id) continue
					this.places.checkpoints[i] = point
				}
			}
		})
	}

	// uloží mapu nebo jí změny do localStorage
	save = (id) => {
		if (id) localStorage.removeItem(`places-${id}`)

		const newID = id ? id : localStorage.length
		this.is = id
		localStorage.setItem("places-" + newID, JSON.stringify(this.places))
	}

	// metoda pro zjištění koordinát geolokace
	getGeoLocation = () => {
		const geolocation = navigator.geolocation
		if (!geolocation) {
			return Promise.reject(
				new Error('Geolocation is not supported by this browser.')
			)
		}
		return new Promise((resolve, reject) => {
			const success = (position) => {
				const coords = position.coords
				const latitude = coords.latitude
				const longitude = coords.longitude
				resolve([latitude, longitude])
			}
			const error = (error) => {
				reject(error)
			}
			geolocation.getCurrentPosition(success, error)
		})
	}

	// metoda pro zjištění místa podle zadáných koordinát
	getPlaceByCoords = (coords, lang) => {
		const key = apis.openCage
		const [latitude, longitude] = coords

		return new Promise((resolve, reject) => {
			// pro zjíštění místa, je potřeba se připojít přes REST API k OpenCage API, které na tento požadávek vrátí objekt buď místa nebo chyby
			$.ajax({
				url: `https://api.opencagedata.com/geocode/v1/json?key=${key}&q=${latitude}+${longitude}&language=${lang}`,
				dataType: 'json',
				success: function (response) {
					const results = response.results
					if (results <= 0) {
						reject('No results found.')
					} else {
						const components = response.results[0].components
						const place = [components.city, components.country]
						resolve(place)
					}
				},
				error: function (status) {
					reject(`Error fetching data: ${status}`)
				},
			})
		})
	}

	// metoda pro zjíštění koordinát podle názvu místa
	getCoordsByPlace = (placeName, lang) => {
		const key = apis.openCage
		return new Promise((resolve, reject) => {
			if (!placeName) {
				reject(null)
				return
			}
			$.ajax({
				// pro zíštění koordinát je potřeba se připojít přes REST API k OpenCage API, které na tento požadávek vrátí buď objekt koordinát místa nebo chybu
				url: `https://api.opencagedata.com/geocode/v1/json?key=${key}&q=${encodeURIComponent(placeName)}&language=${lang}`,
				dataType: 'json',
				success: (response) => {
					const results = response.results
					if (results <= 0) {
						reject('No results found.')
					} else {
						const geometry = response.results[0].geometry
						const coordinates = { lat: geometry.lat, lng: geometry.lng }
						resolve(coordinates)
					}
				},
				error: (errorStatus, textStatus) => {
					if (errorStatus === 400) {
						reject('Invalid input or Bad Request.')
					} else {
						reject(`Error fetching data: ${textStatus}`)
					}
				},
			})
		})
	}

}