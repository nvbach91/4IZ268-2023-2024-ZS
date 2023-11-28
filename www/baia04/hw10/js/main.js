class Main {
	static instance
	cardController
	cities = [
		"New York City", "Tokyo", "Paris", "London", "Moscow", "Istanbul", "Cape Town", "Rome", "Toronto", "Prague"
	]
	cardList
	pointsField = document.getElementById('points')

	constructor() {
		this.createGame()
	}

	createGame = () => {
		this.cardController = CardController.getCardController()
		this.cardController.clearPoints()
		this.cardList = this.cardController.createCardList(this.cities)
		this.cardController.registerObserver(this)
		const gameField = document.getElementById('game-field')
		gameField.innerHTML = ""
		this.cardList.forEach((card) => {
			gameField.appendChild(card.getHTML().div)
		})
	}

	static getMain = () => {
		if (!this.instance) {
			this.instance = new Main()
		}
		return this.instance
	}

	update() {
		const points = this.cardController.getPoints()
		this.pointsField.innerHTML = points
		if (this.cardController.getOpenedPairsAmount() == this.cities.length) {
			alert("You have won with score " + points)
			this.createGame()
		}
	}
}

class CardController {
	static cardController
	openedPairsAmount = 0;
	openedCard
	isOpenAble = true
	points = 0
	observers = []

	static getCardController = () => {
		if (!this.cardController) {
			this.cardController = new CardController()
		}
		return this.cardController
	}

	getPoints = () => { return this.points }
	getOpenedPairsAmount = () => { return this.openedPairsAmount }

	clearPoints = () => {
		this.points = 0
		this.isOpenAble = true
		this.openedPairsAmount = 0
		this.openedCard = undefined
		this.notifyObservers()
	}

	createCardList = (cities) => {
		let cardList = []
		for (let i = 0; i < 2; i++) {
			cities.forEach((city) => {
				const card = new Card(city)
				cardList.push(card)
			})
		}
		cardList = this.shuffle(cardList)
		return cardList
	}

	shuffle = (array) => {
		for (let i = array.length - 1; i > 0; i--) {
			const random = Math.floor(Math.random() * (i + 1))
			const temp = array[i]
			array[i] = array[random]
			array[random] = temp
		}
		return array
	}

	onClick = (card) => {
		if (!card.isReversable) return
		if (!this.isOpenAble) return
		if (this.openedCard === card) return
		if (!this.openedCard) {
			this.openedCard = card
			card.setVisibility(true)
			return
		}
		if (this.openedCard.getName() == card.getName()) {
			this.points++
			this.openedPairsAmount++
			this.openedCard.setIsReversable(false)
			card.setVisibility(true)
			card.setIsReversable(false)
			this.openedCard = undefined
			this.notifyObservers()
			return
		}
		card.setVisibility(true)
		this.isOpenAble = false
		setTimeout(() => {
			card.setVisibility(false)
			this.openedCard.setVisibility(false)
			this.openedCard = undefined
			this.isOpenAble = true
			this.points = this.points <= 0 ? 0 : this.points - 1
			this.notifyObservers()
		}, 2 * 1000)
	}

	registerObserver = (observer) => {
		this.observers.push(observer)
	}

	unregisterObserver = (observer) => {
		this.observers.splice(this.observers.indexOf(observer))
	}

	notifyObservers = () => {
		this.observers.forEach((observer) => {
			observer.update()
		})
	}
}

class Card {
	name
	isHidden = true;
	isReversable = true;
	html = {
		div: undefined,
		p: undefined
	}
	controller = CardController.getCardController()

	constructor(name) {
		this.name = name
		const [cardDiv, cardP] = this.createCardHTML()
		this.html = {
			div: cardDiv,
			p: cardP
		}
	}

	getName = () => { return this.name }
	getHTML = () => { return this.html }
	getIsHidden = () => { return this.isHidden }
	getIsReversable = () => { return this.isReversable }

	setName = (name) => { this.name = name }
	setIsReversable = (isReversable) => { this.isReversable = isReversable }

	createCardHTML = () => {
		const card = document.createElement("div")
		card.setAttribute("class", this.getCurrentClassDiv())
		card.addEventListener("click", () => { this.controller.onClick(this) })

		const text = document.createElement("p")
		text.setAttribute("class", this.getCurrentClassP())
		text.innerHTML = this.name
		card.appendChild(text)
		return [card, text]
	}

	getCurrentClassDiv = () => {
		return this.isHidden ? "card down" : "card up"
	}

	getCurrentClassP = () => {
		return this.isHidden ? "text hidden" : "text"
	}

	setVisibility = (isVisible) => {
		if (!this.isReversable) return
		const isHidden = !isVisible
		this.isHidden = isHidden
		this.html.div.setAttribute("class", this.getCurrentClassDiv())
		this.html.p.setAttribute("class", this.getCurrentClassP())
	}
}

Main.getMain()