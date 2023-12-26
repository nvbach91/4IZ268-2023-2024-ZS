import { GitController } from './git.controller.js'
import { GitService } from './git.service.js'

export class GitModule {

	constructor() {
		const gitService = new GitService()
		new GitController(gitService)
	}
}