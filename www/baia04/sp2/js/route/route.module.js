import { RouteController } from './route.controller.js'
import { RouteService } from './route.service.js'

/*
	Třída RouteModule - je třída modulu tras, která se zabývá vytvařením služby a správce stránek
*/
export class RouteModule {
	constructor() {
		const routeService = new RouteService()
		new RouteController(routeService)
	}
}