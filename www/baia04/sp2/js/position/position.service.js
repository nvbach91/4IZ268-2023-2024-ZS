import { AppService } from '../app.service.js'
import { Events } from '../enums/events.enum.js'
import { RouteData } from '../enums/routeData.enum.js'
import { Place } from '../utils/Place.js'
import { positionConfig } from './position.config.js'

/*
	Třída PositionService - je třída služby pozic, která se zabývá zpracováním logiky zjištění, ověření a ukladnání geolokací. 
*/
export class PositionService {

	// metoda, která se pokusí získat polohu uživatele, pokud ji dovolí a ověřit ji
	requestOrigin = (langName) => {
		const origin = new Place(langName, null, false)

		// dotaz na geolokaci
		this.getGeoLocation()
			.then((coords) => {
				origin.setCoords({
					lat: coords[0],
					lng: coords[1]
				})
				origin.setIsValid(true)

				// dotaz na ověření získaných koordinát
				this.getPlaceByCoords(coords, langName)
					.then((place) => {
						origin.setName(place)
						// vyvolá event nastavení názvu pozice na stránce
						AppService.emit(Events.SetRouteData, RouteData.Origin, origin)
					})
					.catch((error) => {
						// vyvolá event nastavení názvu pozice na stránce
						AppService.emit(Events.SetRouteData, RouteData.Origin, origin)
					})
			})
			.catch((error) => {
				// vyvolá event nastavení názvu pozice na stránce
				AppService.emit(Events.SetRouteData, RouteData.Origin, origin)
			})
	}

	// nastaví pro tuto službu aktuální trasu
	setRoute = (route) => { this.route = route }

	// metoda pro nastavení koordinát centru mapy
	requestMapCentre = () => {
		if (!this.places.origin.isOk) return
		// vyvolá event pro nastavení koordinát na mapě, pokud jsou správné
		AppService.emit(Events.UpdateMapCenter, this.places.origin.coords)
	}

	// metoda pro ověření trasy z místa A do místa B
	checkRoute = (originName, destinationName) => {
		const newOrigin = new Place(originName, null, false)
		const newDestination = new Place(destinationName, null, null)

		const originPromise = this.getCoordsByPlace(originName)
			.then((coords) => {
				newOrigin.setCoords(coords)
				newOrigin.setIsValid(true)
				// vyvolá event nastavení centru mapy
				AppService.emit(Events.UpdateMapCenter, newOrigin.coords)
			})
			.catch((error) => {
				newOrigin.setIsValid(false)
			})

		const destinationPromise = this.getCoordsByPlace(destinationName)
			.then((coords) => {
				newDestination.setCoords(coords)
				newDestination.setIsValid(true)
			})
			.catch((error) => {
				newDestination.setIsValid(false)
			})

		Promise.all([originPromise, destinationPromise])
			.then(() => {
				// vyvolá event nastavení trasy u správce tras
				AppService.emit(Events.SetRouteData, RouteData.Origin, newOrigin)
				AppService.emit(Events.SetRouteData, RouteData.Destination, newDestination)
				if (newOrigin.getIsValid() && newDestination.getIsValid()) {
					// vyvolá event nastavení trasy na mapě, pokud jsou validní
					AppService.emit(Events.CreateRoute, newOrigin.getCoords(), newDestination.getCoords())
				}
			})
			.catch((error) => {
				// vyvolá event nastavení trasy u správce tras
				AppService.emit(Events.SetRouteData, RouteData.Origin, newOrigin)
				AppService.emit(Events.SetRouteData, RouteData.Destination, newDestination)
			})
	}

	// metoda pro zjištění koordinát geolokace
	getGeoLocation = () => {
		const geolocation = navigator.geolocation
		if (!geolocation) {
			return Promise.reject(new Error('Geolocation is not supported by this browser.'))
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
		const key = positionConfig.openCage
		const [latitude, longitude] = coords

		return new Promise((resolve, reject) => {
			// pro zjíštění místa, je potřeba se připojít přes API k OpenCage API, které na tento požadávek vrátí objekt buď místa nebo chyby
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
		const key = positionConfig.openCage

		return new Promise((resolve, reject) => {
			if (!placeName) {
				reject(null)
				return
			}
			// pro zíštění koordinát je potřeba se připojít přes API k OpenCage API, které na tento požadávek vrátí buď objekt koordinát místa nebo chybu
			$.ajax({
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