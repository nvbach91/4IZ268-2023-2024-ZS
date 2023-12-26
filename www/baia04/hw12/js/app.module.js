import { AppService } from './app.service.js'
import { GitModule } from './git/git.module.js'
import { PageModule } from './pages/page.module.js'

export class AppModule {

	constructor() {
		new AppService()
		this.initModules()
	}

	initModules = () => {
		new PageModule()
		new GitModule()
	}
}