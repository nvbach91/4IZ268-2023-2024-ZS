import { lang } from '../configs/language.config.js'

/*
	Třída PagesView - je třída pro vytváření statického přehledu stránek a jejich vizuální částí
*/
export class PagesView {
	service

	constructor(service) {
		this.service = service
	}

	// metoda vytváří hlavní přehled hlavní obrazovky
	getMainPage = (languageName) => {
		const language = lang[languageName]
		const pageElements = {}
		const form = document.createElement("div")
		$(form).addClass("main-form")
		pageElements.form = form

		// blok vyběru jazyka
		const langChoose = document.createElement("div")
		$(langChoose).addClass("language-container")
		const languageTextContainer = document.createElement("div")
		const languageText = document.createElement("p")
		$(languageText).addClass("language-text")
		$(languageTextContainer).append(languageText)
		$(languageText).text(language.lang)
		const laguageButtonsContainer = document.createElement("div")
		const englishButton = document.createElement("button")
		const czechButton = document.createElement("button")
		const isEnglish = languageName === "ENG"
		$(englishButton)
			.addClass("language-button-left")
			.text("EN")
			.addClass(isEnglish ? "active" : "")
			.attr("id", "ENG")
			.click(() => { this.service.setCurrentLanguage("ENG") })
		$(czechButton)
			.addClass("language-button-right")
			.text("CZ")
			.addClass(isEnglish ? "" : "active")
			.attr("id", "CZ")
			.click(() => { this.service.setCurrentLanguage("CZ") })
		$(laguageButtonsContainer).append(englishButton, czechButton)
		$(langChoose).append(languageTextContainer, laguageButtonsContainer)
		$(form).append(langChoose)
		pageElements.languageText = languageText
		pageElements.englishButton = englishButton
		pageElements.czechButton = czechButton

		// pole inputu destinace
		const toInput = document.createElement("input")
		$(toInput).addClass("field-input")
			.attr("placeholder", language.place)
			.type = "text"
		$(form).append(toInput)
		pageElements.toInput = toInput

		// pole inputu původního místa
		const from = document.createElement("div")
		const fromField = document.createElement("input")
		$(fromField)
			.addClass("from-field")
			.attr("placeholder", language.from)
			.attr("readonly", "")
			.addClass("readonly")
		const editButton = document.createElement("button")
		$(editButton)
			.addClass("edit-button")
			.addClass("readonly")
			.text(language.edit)
			.click(() => {
				$(fromField).removeAttr("readonly")
				$(fromField).removeClass("readonly")
			})
		$(from).append(fromField, editButton)
		$(form).append(from)
		pageElements.editButton = editButton
		pageElements.fromInput = fromField

		// tlačitko potvrzení
		const submitButton = document.createElement("button")
		$(submitButton).addClass("submit")
		$(submitButton).text(language.go)
		$(submitButton).click(() => { this.service.initMapPage() })
		$(form).append(submitButton)
		pageElements.submitButton = submitButton

		// dolní menu pro uložené trasy
		const bottomPane = document.createElement("div")
		$(bottomPane).addClass("bottom-pane")
		pageElements.bottomPane = bottomPane
		$(form).append(bottomPane)

		return [form, pageElements]
	}

	// metoda vytváří stránku mapy
	getMapPage = (langName) => {
		const pageElements = {}
		const language = lang[langName]
		const container = document.createElement("div")
		$(container).addClass("container")

		// hlavní kontejner
		const rowContainer = document.createElement("div")
		$(rowContainer).addClass("row-container")
		const map = document.createElement("div")
		$(map).addClass("map")
		$(rowContainer).append(map)
		pageElements.map = map

		// pravé menu
		const rightBar = document.createElement("div")
		$(rightBar).addClass("rightbar")

		// pole inputu původního místa
		const fromField = document.createElement("div")
		$(fromField).addClass("field")
		const fromText = document.createElement("p")
		$(fromText)
			.addClass("field-text")
			.text(language.fromText)
		$(fromField).append(fromText)
		const fromInput = document.createElement("input")
		$(fromInput)
			.addClass("field-input")
			.attr("placeholder", language.from)
		pageElements.fromInput = fromInput
		$(fromField).append(fromInput)
		$(rightBar).append(fromField)

		// pole inputu destinace
		const toField = document.createElement("div")
		$(toField).addClass("field")
		const toText = document.createElement("p")
		$(toText)
			.addClass("field-text")
			.text(language.toText)
		$(toField).append(toText)
		const toInput = document.createElement("input")
		$(toInput)
			.addClass("field-input")
			.attr("placeholder", language.place)
		$(toField).append(toInput)
		$(rightBar).append(toField)
		pageElements.toInput = toInput

		// tlačítko potvrzení a obnovení trasy
		const submitChangesButton = document.createElement("button")
		$(submitChangesButton).addClass("submit")
		$(submitChangesButton).addClass("wide-button")
		$(submitChangesButton).text(language.submitChanges)
		$(submitChangesButton).click(() => { this.service.checkRoute() })
		$(rightBar).append(submitChangesButton)

		// menu markerků
		const markers = document.createElement("div")
		$(markers).addClass("markers")
		const markersTitle = document.createElement("p")
		$(markersTitle).text(language.markers)
		$(markersTitle).addClass("field-text")
		const markersPane = document.createElement("div")
		$(markersPane).addClass("markers-pane")
		$(markers).append(markersTitle, markersPane)
		pageElements.markers = markersPane
		$(rightBar).append(markers)

		// dolní menu s tlačítky
		const bottomPane = document.createElement("div")
		$(bottomPane).addClass("bottom-pane")

		// tlačítko uložení mapy
		const saveButton = document.createElement("div")
		$(saveButton)
			.addClass("button")
			.addClass("save")
			.text(language.save)
			.click(this.service.save)
		const saveImage = document.createElement('img')
		$(saveImage)
			.attr("src", "assets/images/save.png")
			.addClass("icon")
			.addClass("inverted")
		$(document).ready(() =>
			$(saveButton).append(saveImage)
		)

		// tlačítko vymazání mapy
		const deleteImage = document.createElement('img')
		$(deleteImage)
			.attr("src", "assets/images/delete.png")
			.addClass("icon")
		const deleteButton = document.createElement("div")
		$(deleteButton)
			.addClass("button")
			.addClass("delete")
			.text(language.delete)
			.click(() => {
				this.service.deleteMap()
			})
		const deleteText = document.createElement("p")
		$(deleteText).text(language.delete)
		$(deleteImage)
			.append(saveImage)
		$(document).ready(() =>
			$(deleteButton).append(deleteImage)
		)
		$(bottomPane).append(saveButton, deleteButton)

		$(rowContainer).append(rightBar)
		$(container).append(rowContainer, bottomPane)
		return [container, pageElements]
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

		// lement názvu markeru
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
	getStoredMap = (id, places, langName,) => {
		const language = lang[langName]

		// hlavní kontejner uložené mapy
		const container = document.createElement("div")
		$(container).addClass("stored-map")
			.attr("id", `map-${id}`)

		// element míst trasy 
		const textContainer = document.createElement("div")
		const fromText = document.createElement("p")
		$(fromText).text(`${language.fromText}: ${places.origin.name}`)
		const toText = document.createElement("p")
		$(toText).text(`${language.toText}: ${places.destination.name}`)
		$(textContainer).append(fromText, toText)
		// tlačítko pro vymazání trasy
		const deleteButton = this.getButton(
			() => { this.service.deleteStored(id, container) },
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

	getPreloader = () => {
		const preloader = document.createElement("div")
		$(preloader).addClass("preloader")
		const loader = document.createElement("div")
		$(loader).addClass("loader")
		$(preloader).append(loader)
		return preloader
	}
}