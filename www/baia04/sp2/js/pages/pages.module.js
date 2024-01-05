import { PagesController } from './pages.controller.js'
import { PagesService } from './pages.service.js'

/*
	Třída PagesModule - je třída modulu stránek, která se zabývá vytvařením služby a správce stránek
*/
export class PagesModule {
	constructor() {
		const pagesService = new PagesService()
		new PagesController(pagesService)
	}
}