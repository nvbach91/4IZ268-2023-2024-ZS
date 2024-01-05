import { AppService } from '../app.service.js'
import { Events } from '../enums/events.enum.js'

/*
	Třída PositionController - je třída správce pozic, která se zabývá operováním eventu. Nejdřív zaregestruje všechny eventy do aplikace, pak při vyvolání některého z těch eventu, spustí příslušnou metodu ze služby
*/
export class PositionController {
	constructor(positionService) {
		this.positionService = positionService

		// registrace eventu požadavku polohy uživatele a úpravou podle jazyka 
		AppService.on(Events.OriginGet, (langName) => {
			this.positionService.requestOrigin(langName)
		})

		// registrace eventu pro nastavení aktualní trasy službě pozic
		AppService.on(Events.PostRouteData, (route) => {
			this.positionService.setRoute(route)
		})

		// registrace eventu požadávku ověření a nastavení centru mapy 
		AppService.on(Events.RequestMapCenter, () => {
			this.positionService.requestMapCentre()
		})

		// registrace eventu ověření trasy podle destinace a původního místa
		AppService.on(Events.RouteGet, (destination, origin) => {
			this.positionService.checkRoute(origin, destination)
		})
	}


}