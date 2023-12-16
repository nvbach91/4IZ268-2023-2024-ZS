import { AppService } from '../app.service.js'
import { Events } from '../configs/events.js'

/*
	Třída MapController - je třída správce mapy, která se zabývá operováním mapy. Nejdřív zaregestruje všechny eventy do aplikace, pak při vyvolání některého z těch eventu, spustí příslušnou metodu ze služby
*/
export class MapController {
	constructor(mapService) {
		this.mapService = mapService

		// registrace eventu pro spuštění inicializace mapy
		AppService.on(Events.INITMAP, (mapContainer, language) => {
			this.mapService.initMap(mapContainer, language)
		})

		// registrace eventu pro obnovení centu koordinát mapy
		AppService.on(Events.UPDATEMAPCENTRE, (centre) => {
			this.mapService.setCoords(centre)
		})

		// registrace eventu pro vytváření tray
		AppService.on(Events.CREATEROUTE, (origin, destination) => {
			this.mapService.getDirections(origin, destination)
		})

		// registrace eventu pro vytváření markeru na mapě
		AppService.on(Events.CREATEMARKER, (lat, lng, title, description) => {
			this.mapService.addMarker(lat, lng, title, description)
		})
	}
}