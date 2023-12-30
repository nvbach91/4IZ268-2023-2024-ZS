import { AppService } from '../app.service.js'
import { Events } from '../enums/Events.enum.js'

export class GitController {

	constructor(gitService) {
		this.gitService = gitService

		AppService.on(Events.GetUser, (userName) => {
			this.gitService.getUser(userName)
		})

		AppService.on(Events.GetRepositories, (userName) => {
			this.getRepositories(userName)
		})
	}
}