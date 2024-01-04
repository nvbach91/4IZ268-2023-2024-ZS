import { AppService } from '../app.service.js'
import { Events } from '../enums/events.enum.js'

/*
	Třída NotificationController - je třída správce upozornění, která se zabývá upozorněními uživatele. Nejdřív zaregestruje všechny eventy do aplikace, pak při vyvolání některého z těch eventu, spustí příslušnou metodu ze služby
*/
export class NotificationController {

	constructor(notificationsService) {
		this.notificationsService = notificationsService

		// registrace eventu pro zobrazení upozornění
		AppService.on(Events.ShowNotification, (type, title, message) => {
			this.notificationsService.showMessage(type, title, message)
		})
	}
}