/*
	Třída Route - je třída pro uložení a zpracování tras
*/
export class Route {
	static route
	waypoints = [] // seznam markerů na mapě

	constructor() { }

	// Route - je třídou realizující pattern SINGLTON, proto pro získání jeho instance není možné přímo zavolat na konstruktor třídy, ale je potřeba získat statickou instanci pomocí statické třídy
	static getRoute = () => {
		if (!this.route) {
			this.route = new Route()
		}
		return this.route
	}

	// Getters
	getOrigin = () => { return this.origin }
	getDestination = () => { return this.destination }
	getLastValidOrigin = () => { return this.lastValidOrigin }
	getLastValidDestination = () => { return this.lastValidDestination }
	getWaypoints = () => { return this.waypoints }

	// Setters
	setOrigin = (origin) => {
		this.origin = origin
		if (!this.origin.getIsValid()) return
		this.lastValidOrigin = origin
	}
	setDestination = (destination) => {
		this.destination = destination
		if (!this.destination.getIsValid()) return
		this.lastValidDestination = destination
	}

	// metoda pro uložení markeru do seznamu
	addWaypoint = (waypoint) => {
		this.waypoints.push(waypoint)
	}

	// metoda pro obnovení existujícího markeru ze seznamu
	updateWaypoint = (waypoint) => {
		const oldWaypoint = this.getWaypointByID(waypoint.getID())
		if (!oldWaypoint) return
		const index = this.waypoints.indexOf(oldWaypoint)
		this.waypoints[index] = waypoint
	}

	// metoda pro vymazání existujícího markeru ze seznamu
	removeWaypoint = (waypoint) => {
		const isExists = this.getWaypointByID(waypoint.getID())
		if (!isExists) return
		const index = this.waypoints.indexOf(isExists)
		this.waypoints.splice(index, 1)
	}

	// metoda pro získání existujícího markeru ze seznamu
	getWaypointByID = (id) => {
		let waypoint = undefined
		this.waypoints.forEach((currentWaypoint) => {
			if (currentWaypoint.getID() === id) {
				waypoint = currentWaypoint
			}
		})
		return waypoint
	}


}