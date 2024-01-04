/*
	Třída NotificationView - je třída pro vytváření přehledu statických prvků stránky a nastavení jejich dynamické zpracování událostí
*/
export class NotificationView {

	// metoda vytvoření elementu upozornění
	create = (type, title, message) => {
		const notification = document.createElement("div")
		$(notification).addClass("notification")
			.addClass(type)

		const notificationIcon = document.createElement("div")
		$(notificationIcon).addClass("notificationIcon")

		const icon = document.createElement("img")
		$(icon).addClass("notification-icon")
			.attr("alt", "Upozornění")
			.attr("src", `assets/images/${type}.png`)
		$(notificationIcon).append(icon)
		$(notification).append(notificationIcon)

		const textBox = document.createElement("div")
		const titleElem = document.createElement("h3")
		$(titleElem).text(title)
		$(textBox).append(titleElem)

		const messageElem = document.createElement("p")
		$(messageElem).text(message)
		$(textBox).append(messageElem)

		$(notification).append(textBox)

		return $(notification)
	}

}