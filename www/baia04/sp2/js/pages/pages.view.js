import { lang } from '../configs/language.config.js'

/*
	Třída PagesView - je třída pro vytváření přechledu statických prvků stránky a nastavení jejich dynamické zpracování údalostí
*/
export class PagesView {
	constructor(service) {
		this.service = service
	}

	// metoda nastavující přehled a zpracování hlavní obrazovky
	getMainPage = (languageName) => {
		document.querySelectorAll("main").forEach((page) => {
			$(page).hide()
				.removeClass("undisplayed")
		})

		this.setTexts(languageName)

		$("#CZ").click(() => { this.service.setCurrentLanguage("CZ") })
		$("#ENG").click(() => { this.service.setCurrentLanguage("ENG") })

		$("#edit").click(() => {
			$("#fromMain").removeAttr("readonly")
			$("#fromMain").removeClass("readonly")
		})

		$("#go").click(() => { this.service.initMapPage() })
		this.mainPage = $("#main-page")
		return $("#main-page")
	}

	// metoda nastavující textové prvky na stránku podle zvoleného jazyka
	setTexts = (languageName) => {
		const language = lang[languageName]
		// klíč v objektu language je vždy shoden s ID prvku pro který je určen text
		Object.keys(language).forEach((elementID) => {
			const element = $("#" + elementID)
			if (!element) return
			const elementType = $(element).prop("nodeName")
			const text = language[elementID]
			switch (elementType) {
				case "INPUT":
					$(element).attr("placeholder", text)
					break
				case "P":
				case "BUTTON":
				case "H1":
				case "H2":
					$(element).text(text)
					break
			}
		})
	}

	// metoda nastavující přehled a zpracování stránky mapy
	getMapPage = (languageName) => {

		$('.submit').click(this.service.checkRoute)
		$('.save').click(this.service.save)
		$('.delete').click(this.service.deleteMap)

		this.setTexts(languageName)

		return $('#map-page')
	}

	// metoda vytváří element markeru
	getMarkerHTML = (marker, langName) => {
		const language = lang[langName]

		// hlavní kontejner markeru
		const markerContainer = document.createElement("div")
		$(markerContainer).addClass("marker")
		$(markerContainer).attr("id", marker.getID())

		// levá část markeru
		const markerLeftSide = document.createElement("div")
		$(markerLeftSide).addClass("side")

		// element názvu markeru
		const markerNameContainer = document.createElement("div")
		const markerNameInput = document.createElement("input")
		$(markerNameInput).addClass("clean-input")
			.attr("value", marker.getTitle())
			.attr("placeholder", lang.markerTitle)
			.attr("id", marker.getID())
		$(markerNameContainer).append(markerNameInput)

		// element popisu markeru
		const markerDescriptionContainer = document.createElement("div")
		const markerDescriptionInput = document.createElement("textarea")
		$(markerDescriptionContainer).append(markerDescriptionInput)
		$(markerDescriptionInput)
			.attr("placeholder", language.description)
			.attr("id", marker.getID())
			.css("resize", "none")
			.text(marker.getDescription())
		$(markerLeftSide).append(markerNameContainer, markerDescriptionContainer)

		// pravá část markeru
		const rightSide = document.createElement("div")
		$(rightSide).addClass("side")

		// tlačítko potvrzení změn markeru
		const markerConfirmationContainer = this.getButton(
			() => {
				this.service.changeMarker(
					markerNameInput,
					markerDescriptionInput
				)
			},
			"confirm",
			language.confirm
		)

		// tlačítko vymazání markeru
		const markerRemovementContainer = this.getButton(
			() => {
				this.service.deleteMarker(
					markerContainer
				)
			},
			"delete",
			language.delete
		)
		$(rightSide).append(markerConfirmationContainer, markerRemovementContainer)

		$(markerContainer).append(
			markerLeftSide,
			rightSide
		)
		return markerContainer
	}

	// matoda vytvárí kontejner uložené mapy
	getStoredMap = (id, places, langName) => {
		const language = lang[langName]

		// hlavní kontejner uložené mapy
		const container = document.createElement("div")
		$(container).addClass("stored-map")
			.attr("id", `route-${id}`)
		const textContainer = document.createElement("div")

		// element míst trasy 
		const fromText = document.createElement("p")
		$(fromText).text(`${language.fromText}: ${places.origin?.name || ''}`)
		const toText = document.createElement("p")
		$(toText).text(`${language.toText}: ${places.destination?.name || ''}`)
		$(textContainer).append(fromText, toText)

		// tlačítko pro vymazání trasy
		const deleteButton = this.getButton(
			() => { this.service.deleteStored(container, id) },
			"delete",
			language.delete
		)

		// tlačítko pro otevření mapy
		const openButton = this.getButton(
			() => {
				this.service.openStored(id, places)
			},
			"open",
			language.open
		)
		const buttonsPane = document.createElement("div")
		$(buttonsPane).append(openButton, deleteButton)
		$(container).append(textContainer, buttonsPane)
		return container
	}

	// metoda pro vytváření malého tlačítka
	getButton = (action, name, text) => {
		const buttonContainer = document.createElement("div")
		const buttonImage = document.createElement("img")
		$(buttonImage)
			.addClass("icon")
			.addClass("clickable")
			.attr("src", `assets/images/${name}.png`)
			.attr("alt", text)
			.click(action)
		$(buttonContainer).append(buttonImage)
		return buttonContainer
	}

	// metoda pro vytvoření preloaderu
	getPreloader = () => {
		const preloader = document.createElement("div")
		$(preloader).addClass("preloader")
		const loader = document.createElement("div")
		$(loader).addClass("loader")
		$(preloader).append(loader)
		return preloader
	}
}