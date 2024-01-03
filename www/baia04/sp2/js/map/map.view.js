/*
	Třída MapView - je třída pro vytváření statických elementů pro stráneku a jejich obslužení událostí
*/
export class MapView {

	// metoda vytváří popup menu pro marker
	getMarkerPopUp = (titleText, descriptionText) => {
		const popUp = document.createElement("div")
		$(popUp).addClass("popUp")
		const title = document.createElement("h3")
		$(title).text(titleText)
		const description = document.createElement("p")
		$(description).text(descriptionText)
		$(popUp).append(title, description)
		return popUp.outerHTML
	}
}