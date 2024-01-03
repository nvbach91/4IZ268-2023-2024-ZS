/*
	Třída Marker - je třída pro uložení a zpracování markerů
*/
export class Marker {
	// seznam všech vytvořených markerů v aplikaci
	static makerList = []

	/* 
		konstruktor uloží název a popis, pokud jsou zadány, jinak uloží nový marker do statického seznamu s identefikácním číslem, které je délkou seznamu
	*/
	constructor(title = "", description = "") {
		this.title = title
		this.description = description
		this.id = Marker.makerList.length
		Marker.makerList.push(this)
	}

	// Getters
	getTitle = () => { return this.title }
	getDescription = () => { return this.description }
	getID = () => { return this.id }
	getMapMarker = () => { return this.mapMarker }

	// Setters
	setTitle = (title) => { this.title = title }
	setDescription = (description) => { this.description = description }
	setID = (id) => { this.id = id }
	setMapMarker = (mapMarker) => { this.mapMarker = mapMarker }

	/*
		statická metoda, která vyhledá marker podle jeho identifikáčního čísla v seznamu
	*/
	static getByID = (id) => {
		let marker = null
		Marker.makerList.forEach((currentMarker) => {
			if (currentMarker.getID().toString() === id) {
				marker = currentMarker
			}
		})
		return marker
	}

	/*
		statická metoda, která smaže marker podle jeho identifikáčního čísla ze seznamu
	*/
	static removeByID = (id) => {
		const marker = this.getByID(id)
		if (!marker) return
		Marker.makerList.splice(Marker.makerList.indexOf(marker), 1)
	}
}