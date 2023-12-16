import { AppService } from '../app.service.js'
import { config } from '../configs/config.js'
import { Events } from '../configs/events.js'
import { getLanguageCode } from '../utils/getLanguageCode.js'
import { secToMs } from '../utils/secToMs.js'
import { Marker } from './Marker.js'
import { PagesView } from './pages.view.js'

/*
	Třída PagesService - je třída služby stránek, která se zabývá zpracováním logiky stránek. 
*/
export class PagesService {
	// konstruktor uloží hlavní pramatry služby 
	constructor() {
		// vytvoření instance třídy přehledu
		const view = new PagesView(this)

		this.currentLanguage = config.defaultLanguage
		this.isPageChangeable = true
		this.initMainPage(view) // inicializace hlavní stránky
	}

	// GETTERY
	getCurrentLanguage = () => { return this.currentLanguage }

	// SETTERY
	setOrigin = (origin) => {
		this.originPlace = origin
		$(this.currentPageElements.fromInput).attr("value", origin.name)
	}

	// Metoda vytvářející hlávní stránku
	initMainPage = (view) => {
		this.mainContainer = document.querySelector("main")
		this.view = this.view ? this.view : view
		const language = this.currentLanguage ? this.currentLanguage : config.defaultLanguage
		const [mainPage, elements] = this.view.getMainPage(language)
		this.currentPageElements = elements
		// metoda vyvolaná, až bude statická stránka hotová
		const onLoaded = () => {
			this.setCurrentPage(mainPage)
			// event pro nastavení původní geolokace
			AppService.emit(Events.ORIGINGET, getLanguageCode(this.currentLanguage))
		}
		this.initPreloader(onLoaded)
		// vyvolá metodu ověření uložených map
		this.updateStored()
	}

	// metoda ověřující zda jsou nějaké uložené trasy v localStorage, pokud jsou take je doplní do stránky
	updateStored = () => {
		if (localStorage.length === 0) return
		const bottomPane = this.currentPageElements.bottomPane
		if (!bottomPane) return
		Object.getOwnPropertyNames(localStorage).forEach((currentPlaceName) => {
			const currentPlaces = JSON.parse(localStorage[currentPlaceName])
			const id = currentPlaceName.split("-")[1]
			const storedItem = this.view.getStoredMap(
				id,
				currentPlaces,
				this.currentLanguage,
			)
			$(bottomPane).append(storedItem)
		})
	}

	// metoda uloží nové nastavení jazyku stránky a obnoví ji
	setCurrentLanguage = (language) => {
		if (!this.isPageChangeable) return
		if (this.currentLanguage === language) return
		this.currentLanguage = language
		const [page, pageElements] = this.view.getMainPage(language)
		this.currentPageElements = pageElements
		this.setCurrentPage(page)
		this.updateStored()
	}

	// metoda zajištující obnovení stránky, dostane novou stránku, zpracuje animaci a pak zobrazí ji
	setCurrentPage = (newPage) => {
		this.isPageChangeable = false
		const oldPage = this.currentPage
		// metoda, která vyvolaná po skrytí minulé stránky, zajistí animaci a zobrazí novou
		const set = () => {
			$(newPage).hide()
			this.currentPage = newPage
			$(this.mainContainer).append(newPage)
			$(newPage).fadeIn(secToMs(0.25), 0, () => {
				AppService.emit(Events.ORIGINGET, getLanguageCode(this.currentLanguage))
				this.isPageChangeable = true
			})
			$(oldPage).remove()
		}
		if (!this.currentPage) {
			set()
			return
		}
		$(this.currentPage).fadeOut(secToMs(0.25), 0, set)
	}

	// metoda inicializuje stránku plánování cesty
	initMapPage = (from, to) => {
		if (!this.isPageChangeable) return
		const [mapPage, mapPageElements] = this.view.getMapPage(this.currentLanguage)
		this.checkRoute(from, to)
		this.setCurrentPage(mapPage)
		this.currentPageElements = mapPageElements
		// vyvolá event vytvoření mapy
		AppService.emit(Events.INITMAP,
			mapPageElements.map,
			getLanguageCode(this.currentLanguage),
		)
	}

	// metoda vyvolaná po ověření koordinátů obnoví stránku a mapu, pokud parametry míst jsou zadány správně
	createRoute = (origin, destination) => {
		if (destination && destination.isOk) {
			$(this.currentPageElements.toInput).attr("value", destination.name)
		}
		if (origin && origin.isOk) {
			$(this.currentPageElements.fromInput).attr("value", origin.name)
			this.setOrigin(origin)
		}
		if (!origin || !destination) return
		if (!origin.isOk || !destination.isOk) return
		// vyvolá event vytvoření trasy na mapě
		AppService.emit(Events.CREATEROUTE, origin.coords, destination.coords)
	}

	// metoda vyvolaná po zmačknutí tlačitka změn na mapě ověří, vezme data z inputů a pošle je na ověření
	checkRoute = (from = null, to = null) => {
		const destination = to ? to : this.currentPageElements.toInput.value

		const origin = from ? from : this.currentPageElements.fromInput.value

		// vovolá event ověření trasy
		AppService.emit(Events.ROUTEGET, destination, origin)
	}

	// metoda vyvolaná po vytvoření markeru na mapě, vytvoří vlastní instanci markeru a uloží změny na stránce
	appendMarker = (
		mapMarker, mapMarkerUpdate, title, description
	) => {
		const marker = new Marker() // instace třídy Marker
		const name = title ? title : "Marker #" + marker.getID()
		const desc = description ? description : ""
		marker.setTitle(name)
		marker.setDescription(desc)
		marker.setMapMarker(mapMarker)
		marker.setMapMarkerUpdate(mapMarkerUpdate)
		const markerHTML = this.view.getMarkerHTML(marker, this.currentLanguage)
		$(this.currentPageElements.markers).append(markerHTML)
		// vyvolá event uložení markeru do localStorage
		AppService.emit(Events.UPDATEMARKERS)
	}

	// metoda pro změnu markeru
	changeMarker = (nameInput, descriptionInput) => {
		const name = nameInput.value
		const description = $(descriptionInput).val()
		const markerID = $(nameInput).attr("id")
		const marker = Marker.getByID(markerID)
		marker.setTitle(name)
		marker.setDescription(description)
		const markerUpdater = marker.getMapMarkerUpdate()
		markerUpdater.setDescription(description)
		markerUpdater.setTitle(name)
		// vyvolá event uložení změn markeru do localStorage
		AppService.emit(Events.UPDATEMARKERS)
	}

	// metoda pro smazání mareku
	deleteMarker = (container) => {
		const markerID = $(container).attr("id")
		$(container).fadeOut(
			secToMs(0.25),
			0,
			() => {
				$(container).remove()
			}
		)
		const marker = Marker.getByID(markerID)
		marker.getMapMarkerUpdate().delete()
		Marker.removeByID(markerID)
		// vyvolá event vymazání markeru z localStorage
		AppService.emit(Events.UPDATEMARKERS)
	}

	// metoda pro uložení trasy do localStorage
	save = () => {
		// vyvolá event uložení
		AppService.emit(Events.SAVE, this.openStoredID)
	}

	// metoda pro vymazání mapy z localStorage
	deleteStored = (id) => {
		localStorage.removeItem(`places-${id}`)
		$(`#map-${id}`).fadeOut(secToMs(0.5), 0, () => {
			$(`#map-${id}`).remove()
		})
	}

	// metoda pro otevření uložené trasy ze seznamu
	openStored = (id, places) => {
		this.openStoredID = id
		this.initMapPage(
			places.origin.name,
			places.destination.name
		)
		this.checkpoints = places.checkpoints
	}

	// metoda obnoví checkpointy na uložené mapě, až bude mapa připravená
	onGoogleLoaded = () => {
		if (!this.checkpoints) return
		this.checkpoints.forEach((currentPoint) => {
			// vyvolá event pro vytvoření checkpointu
			AppService.emit(
				Events.CREATEMARKER,
				currentPoint.lat,
				currentPoint.lng,
				currentPoint.title,
				currentPoint.description
			)
		})
		this.checkpoints = undefined
	}

	// metoda pro obnovení obrazovky bez mapy a ji vymazání 
	deleteMap = () => {
		const id = this.openStoredID
		this.openStoredID = undefined
		this.deleteStored(id)
		this.initMainPage()
	}

	initPreloader = (action) => {
		if (this.isDOMLoaded) {
			action()
			return
		}
		const loader = this.view.getPreloader()
		this.setCurrentPage(loader)
		$(document).ready(() => {
			this.isDOMLoaded = true
			$(loader).fadeOut("slow")
			action()
		})
	}

}