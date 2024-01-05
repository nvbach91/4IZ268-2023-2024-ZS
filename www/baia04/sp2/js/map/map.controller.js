import { AppService } from '../app.service.js'
import { Events } from '../enums/events.enum.js'

/*
	Třída MapController - je třída správce mapy, která se zabývá operováním mapy. Nejdřív zaregestruje všechny eventy do aplikace, pak při vyvolání některého z těch eventu, spustí příslušnou metodu ze služby
*/
export class mapController {
	mapService

	constructor(mapService) {
		this.mapService = mapService

		// registrace eventu pro spuštění inicializace mapy
		AppService.on(Events.InitMap, (mapContainer) => {
			this.mapService.initMap(mapContainer)
		})

		// registrace eventu pro obnovení centu koordinát mapy
		AppService.on(Events.UpdateMapCenter, (centre) => {
			this.mapService.setCoords(centre)
		})

		// registrace eventu pro vytváření trasy
		AppService.on(Events.CreateRoute, (origin, destination) => {
			this.mapService.setRoute(origin, destination)
		})

		// registrace eventu pro vytváření markeru na mapě
		AppService.on(Events.CreateMarker, (lat, lng, title, description) => {
			this.mapService.addMarker(lat, lng, title, description)
		})

		// registrace eventu pro obnovení informace o markeru na mapě
		AppService.on(Events.UpdateMarker, (marker, title, description) => {
			this.mapService.updateMarker(marker, title, description)
		})

		// registrace eventu pro smazání markeru z mapy
		AppService.on(Events.RemoveMarker, (marker) => {
			this.mapService.removeMarker(marker)
		})

		// registrace eventu pro nastávení několika markerů najednou
		AppService.on(Events.SetMarkers, (markers) => {
			this.mapService.addMarkers(markers)
		})
	}
}