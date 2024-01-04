import { AppService } from '../app.service.js'
import { Events } from '../enums/events.enum.js'
import { RouteData } from '../enums/routeData.enum.js'
import { Route } from './Route.js'

/*
	Třída RouteService - je třída služby tras, která se zabývá zpracováním logiky trasy. 
*/
export class RouteService {

	constructor() {
		// najednou může být pouze jedna trasa, proto načte ji instanci
		this.route = Route.getRoute()
	}

	// metoda pro nastavení dat do aktuální trasy podle jejich druhů
	setRouteData = (dataType, data) => {
		switch (dataType) {
			case RouteData.Origin:
				this.route.setOrigin(data)
				break
			case RouteData.Destination:
				this.route.setDestination(data)
				break
			case RouteData.AddWaypoint:
				this.route.addWaypoint(data)
				break
			case RouteData.UpdateWaypoint:
				this.route.updateWaypoint(data)
				break
			case RouteData.RemoveWaypoint:
				this.route.removeWaypoint(data)
				break
		}
		// vyvolá event obnovení trasy
		AppService.emit(Events.OnRouteUpdated, this.route)
	}

	// metoda pro publikaci aktuální trasy
	postRoute = () => {
		// vyvolá event pro vracení aktuální trasy
		AppService.emit(Events.PostRouteData, this.route)
	}

	// metoda pro uložení trasy do localStorage
	save = (id) => {
		if (!id) return
		localStorage.removeItem(id)
		// data z trasy se naparsují v čítelné podobě
		const routeObjectToSave = {
			origin: this.route.getLastValidOrigin() || null,
			destination: this.route.getLastValidDestination() || null,
			waypoints: []
		}
		this.route.getWaypoints().forEach((marker) => {
			const coords = marker.getMapMarker().getLngLat()
			const waypointObject = {
				title: marker.getTitle(),
				description: marker.getDescription(),
				lat: coords.lat,
				lng: coords.lng
			}
			routeObjectToSave.waypoints.push(waypointObject)
		})
		localStorage.setItem(id, JSON.stringify(routeObjectToSave))
	}

	// metoda pro vymazání mapy z localStorage
	deleteStored = (id) => {
		if (!id) return
		localStorage.removeItem(id)
		$(`#${id}`).remove()
	}
}