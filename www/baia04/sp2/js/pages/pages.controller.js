import { AppService } from '../app.service.js'
import { Events } from '../enums/events.enum.js'

/*
	Třída PagesController - je třída správce stránek, která se zabývá operováním eventu. Nejdřív zaregestruje všechny eventy do aplikace, pak při vyvolání některého z těch eventu, spustí příslušnou metodu ze služby
*/
export class PagesController {
	constructor(pagesService) {
		this.pagesService = pagesService

		// registrace eventu nastavení nové trasy (nemusí být uplná ani validná)
		AppService.on(Events.OnRouteUpdated, (route) => {
			this.pagesService.onRouteUpdated(route)
		})

		// registrace eventu pro nastavení markeru
		AppService.on(Events.AddMarker, (marker, title, description) => {
			this.pagesService.appendMarker(marker, title, description)
		})

		//!
		AppService.on(Events.SetRouteInfo, (routeInfo) => {
			this.pagesService.setRouteInfo(routeInfo)
		})

		AppService.on(Events.InitLightLoader, () => {
			this.pagesService.initLightLoader()
		})

		AppService.on(Events.RemoveLightLoader, () => {
			this.pagesService.removeLightLoader()
		})
	}


}