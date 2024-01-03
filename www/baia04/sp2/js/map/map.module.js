import { mapController } from './map.controller.js'
import { MapService } from './map.service.js'

/*
	Třída MapModule - je třída modulu mapy, která se zabývá vytvařením služby a správce mapy
*/
export class MapModule {
	constructor() {
		const mapService = new MapService()
		new mapController(mapService)
	}
}