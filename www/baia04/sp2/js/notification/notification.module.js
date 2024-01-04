import { NotificationController } from './notification.controller.js'
import { NotificationService } from './notification.service.js'

/*
	Třída NotificationModule - je třída modulu upozornění, která se zabývá vytvařením služby a správce notifikací
*/
export class NotificationModule {

	constructor() {
		const notificationService = new NotificationService()
		new NotificationController(notificationService)
	}
}