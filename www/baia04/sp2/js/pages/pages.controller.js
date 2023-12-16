import { AppService } from '../app.service.js'
import { Events } from '../configs/events.js'

/*
	Třída PagesController - je třída správce stránek, která se zabývá operováním eventu. Nejdřív zaregestruje všechny eventy do aplikace, pak při vyvolání některého z těch eventu, spustí příslušnou metodu ze služby
*/
export class PagesController {
	constructor(pagesService) {
		this.pagesService = pagesService

		// registrace eventu nastavení nového původního místa
		AppService.on(Events.ORIGINPOST, (origin) => {
			this.pagesService.setOrigin(origin)
		})

		// registrace eventu pro zpracování nové trasy
		AppService.on(Events.ROUTEPOST, (origin, destination) => {
			this.pagesService.createRoute(origin, destination)
		})

		// registrace eventu pro zpracování změn v trase
		AppService.on(Events.CONFIRMPOSITION, (origin, destination) => {
			this.pagesService.setOrigin(origin)
			this.pagesService.createRoute(origin, destination)
		})

		// registrace eventu pro dodaní markeru
		AppService.on(Events.ADDMARKER, (marker, update, title, description) => {
			this.pagesService.appendMarker(marker, update, title, description)
		})

		// registrace eventu, který bude vyvolán po spuštění mapy
		AppService.on(Events.GOOGLELOADED, () => {
			this.pagesService.onGoogleLoaded()
		})
	}
}