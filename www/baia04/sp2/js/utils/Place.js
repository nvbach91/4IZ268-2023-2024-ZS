/*
	Třída Place - je pomocní třída popisující vlastností objektu nějakého místa a jeho momentální validnost.
*/
export class Place {

	constructor(name, coords, isValid) {
		this.name = name
		this.coords = coords
		this.isValid = isValid
	}

	// Getters
	getName = () => { return this.name }
	getCoords = () => { return this.coords }
	getIsValid = () => { return this.isValid }

	// Setters
	setName = (name) => { this.name = name }
	setCoords = (coords) => { this.coords = coords }
	setIsValid = (isValid) => { this.isValid = isValid }
}