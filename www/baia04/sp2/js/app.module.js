import { AppService } from './app.service.js'
import { MapModule } from './map/map.module.js'
import { NotificationModule } from './notification/notification.module.js'
import { PagesModule } from './pages/pages.module.js'
import { PositionModule } from './position/position.module.js'
import { RouteModule } from './route/route.module.js'

/*
	Třída AppModule - je třída modulu, který se zabývá zracovaním hlavního modulu applikace a spuštěním vedlejších modulů 
*/
export class AppModule {

	constructor() {
		this.initModules()
	}

	// Metoda vytvoří třídy vedlejších modulů, čímž je spustí
	initModules() {
		new AppService()
		new PagesModule()
		new PositionModule()
		new MapModule()
		new RouteModule()
		new NotificationModule()
	}
}