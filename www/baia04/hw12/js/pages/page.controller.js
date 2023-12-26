import { AppService } from '../app.service.js'
import { Events } from '../enums/Events.enum.js'

export class PageController {

	constructor(pageService) {
		this.pageService = pageService

		AppService.on(Events.PostUser, (isFound, userData) => {
			this.pageService.postUser(isFound, userData)
		})

		AppService.on(Events.PostRepositories, (isFound, repositories) => {
			this.pageService.postRepositories(isFound, repositories)
		})
	}

}