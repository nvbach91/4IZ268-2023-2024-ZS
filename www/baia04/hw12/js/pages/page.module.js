import { PageController } from './page.controller.js'
import { PageService } from './page.service.js'

export class PageModule {

	constructor() {
		const pageService = new PageService()
		new PageController(pageService)
	}

}