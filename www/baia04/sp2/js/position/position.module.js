import { PositionController } from './position.controller.js'
import { PositionService } from './position.service.js'

/*
	Třída PositionModule - je třída modulu operoání geolokacemi, která se zabývá vytvařením služby a správce stránek
*/
export class PositionModule {
	constructor() {
		const positionService = new PositionService()
		new PositionController(positionService)
	}
}