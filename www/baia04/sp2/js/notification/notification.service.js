import { Notifications } from '../enums/notifications.enum.js'
import { secToMs } from '../utils/secToMs.js'
import { NotificationView } from './notification.view.js'

/*
	Třída NotificationService - je třída služby upozornění, která se zabývá zpracováním logiky upozornění. 
*/
export class NotificationService {

	constructor() {
		this.view = new NotificationView()
	}

	// metoda pro zobrazovaní upozornění
	showMessage = (type, title, message) => {
		const typesString = {
			"confirm": Notifications.Success,
			"warning": Notifications.Warning,
			"error": Notifications.Error,
		}

		title = (title?.length >= 25 ? title.slice(0, 25) + "..." : title) || ""
		message = (message?.length >= 30 ? message.slice(0, 30) + "..." : message) || ""

		let typeString
		Object.entries(typesString).forEach((notificationImage, currentType) => {
			if (currentType === type) {
				typeString = notificationImage[0]
			}
		})

		const notification = this.view.create(typeString, title, message)
		$(notification).hide()
		$("body").append(notification)
		$(notification).fadeIn(secToMs(0.5), () => {
			setTimeout(() => {
				$(notification).fadeOut(secToMs(0.5), () => {
					$(notification).remove()
				})
			}, secToMs(2))
		})
	}
}