import { AppService } from '../app.service.js'
import { Events } from '../configs/events.js'

/*
	Třída PositionController - je třída správce pozic, která se zabývá operováním eventu. Nejdřív zaregestruje všechny eventy do aplikace, pak při vyvolání některého z těch eventu, spustí příslušnou metodu ze služby
*/
export class PositionController {
	positionService

	constructor(positionService) {
		this.positionService = positionService

		// registrace eventu požadávku polohy uživatele a úpravou podle jazyka 
		AppService.on(Events.ORIGINGET, (langName) => {
			this.positionService.requestOrigin(langName)
		})

		// registrace eventu požadávku ověření a nastavení centru mapy 
		AppService.on(Events.REQUESTMAPCENTRE, () => {
			this.positionService.requestMapCentre()
		})

		// registrace eventu ověření trasy podle destinace a původního místa
		AppService.on(Events.ROUTEGET, (destination, origin) => {
			this.positionService.checkRoute(origin, destination)
		})

		// registrace eventru obnovení markerů v jejich uložišti
		AppService.on(Events.UPDATEMARKERS, () => {
			this.positionService.updateMarkers()
		})

		// registrace eventu ukladání informací o trase
		AppService.on(Events.SAVE, (id) => {
			this.positionService.save(id)
		})
	}


}