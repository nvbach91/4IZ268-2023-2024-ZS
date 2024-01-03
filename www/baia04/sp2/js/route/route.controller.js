import { AppService } from '../app.service.js'
import { Events } from '../enums/events.enum.js'

/*
	Třída RouteController - je třída správce tras, která se zabývá operováním eventu. Nejdřív zaregestruje všechny eventy do aplikace, pak při vyvolání některého z těch eventu, spustí příslušnou metodu ze služby
*/
export class RouteController {

	constructor(routeService) {
		this.routeService = routeService

		// registrace eventu požadavku na data trasy
		AppService.on(Events.GetRouteData, () => {
			this.routeService.postRoute()
		})

		// registrace eventu požadavku na obnovení dat trasy
		AppService.on(Events.SetRouteData, (dataType, data) => {
			this.routeService.setRouteData(dataType, data)
		})

		// registrace eventu uložení na data trasy do localStorage
		AppService.on(Events.Save, (id) => {
			this.routeService.save(id)
		})

		// registrace eventu požadavku na načítání dat trasy z localStorage
		AppService.on(Events.SetOpenStoredID, (id) => {
			this.routeService.openStoredID = id
		})

		// registrace eventu požadavku na vymázaní dat trasy z localStorage
		AppService.on(Events.DeleteStored, () => {
			this.routeService.deleteStored()
		})

	}
}