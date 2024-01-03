import { AppService } from '../app.service.js'
import { Events } from '../enums/events.enum.js'
import { RouteData } from '../enums/routeData.enum.js'
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
		const view = new PagesView(this)
		this.currentLanguage = "ENG"
		this.isPageChangeable = true
		this.initMainPage(view)
		this.getStored()
	}

	// Getters
	getCurrentLanguage = () => { return this.currentLanguage }

	// metoda vytvářející hlávní stránku
	initMainPage = (view) => {
		this.view = this.view ? this.view : view
		const language = this.language ? this.language : "ENG"
		this.language = language

		// metoda spuštěná po vykreslení stránky
		const onLoaded = () => {
			// plynulé zobrazení obsahu stránky
			this.setCurrentPage(this.view.getMainPage(language))

			// ověření uložení stávu uživatele
			const url = new URL(location)
			// pokud nějaká data jsou, nemusí uživatel zadavat znovu místa
			if (url.searchParams.size > 0) {
				const from = url.searchParams.get("from")
				const to = url.searchParams.get("to")
				$('#fromMain').val(from)
				$('#toMain').val(to)
			} else {
				// pokud nejsou, pokusí se zjistit aspoň poloha uživatele
				AppService.emit(Events.OriginGet, getLanguageCode(this.currentLanguage))
			}
		}
		// spustí preloader, než stránka bude hotova
		this.initPreloader(onLoaded)
	}

	// metoda uloží nové nastavení jazyku stránky a obnoví ji
	setCurrentLanguage = (language) => {
		if (!this.isPageChangeable) return
		if (this.currentLanguage === language) return
		this.currentLanguage = language
		$(this.currentPage).fadeOut(secToMs(0.25), 0, () => {
			// znovu vyvolá ověření polohy uživatele v novém jazyce
			AppService.emit(Events.OriginGet, getLanguageCode(this.currentLanguage))

			this.view.setTexts(language)
			const langButtons = [$("#CZ"), $("#ENG")]
			langButtons.forEach((button) => {
				$(button).attr("id") === language ? $(button).addClass("active") : $(button).removeClass("active")
			})
			$(this.currentPage).fadeIn(secToMs(0.25), 0)
		})
	}

	// metoda zajištující plynulé obnovení stránky, dostane novou stránku, zpracuje animaci a pak zobrazí ji
	setCurrentPage = (newPage, onUpdated) => {
		this.isPageChangeable = false
		// metoda, která vyvolaná po skrytí minulé stránky, zajistí animaci a zobrazí novou
		const set = () => {
			this.currentPage = newPage
			$(newPage).fadeIn(secToMs(0.25), 0, () => {
				this.isPageChangeable = true
			})
			if (onUpdated) onUpdated()
		}
		if (!this.currentPage) {
			set()
			return
		}
		$(this.currentPage).fadeOut(secToMs(0.25), 0, set)
	}

	// metoda pro aktualizace informace o trase
	onRouteUpdated = (route) => {
		// pokud nejsou nová místa, nebo jsou chybná, tak ne vloží nic
		const origin = route.getLastValidOrigin()?.name || ''
		const destination = route.getLastValidDestination()?.name || ''
		$('.from-input').val(origin)
		$('.to-input').val(destination)

		// jelikož je aplikace jednostranná, potřebujeme uchovat stav uživatele v URL adrese pro jednodušší přenosnost toho stavu 
		const url = new URL(location)
		url.searchParams.set("from", origin)
		url.searchParams.set("to", destination)
		history.pushState({}, "", url)
	}

	// metoda vytvářející hlávní stránku
	initMapPage = (from, to) => {
		if (!this.isPageChangeable) return
		const mapPage = this.view.getMapPage(this.currentLanguage)
		const destination = to ? to : $("#toMain").val()
		const origin = from ? from : $("#fromMain").val()
		// vyvolá ověření nové trasy podle zadaných údajů
		AppService.emit(Events.RouteGet, destination, origin)

		// až bude stránka připravená, vyvolá službu mapy pro jeji zobrazení
		this.setCurrentPage(mapPage, () => {
			AppService.emit(Events.InitMap,
				document.getElementById("map"),
				getLanguageCode(this.currentLanguage),
			)
		})
	}

	// metoda vyvolána po kliknutí tklačítka Submit pro zpracovávání nově zadaných údajů
	checkRoute = () => {
		const destination = $("#toMap").val()
		const origin = $("#fromMap").val()

		// vyvolá ověření nové trasy podle zadaných údajů
		AppService.emit(Events.RouteGet, destination, origin)
	}

	// metoda vyvolaná po vytvoření markeru na mapě, vytvoří vlastní instanci markeru a uloží změny na stránce
	appendMarker = (mapMarker, title, description) => {
		const marker = new Marker() // instace třídy Marker
		const name = title ? title : "Marker #" + marker.getID()
		const desc = description ? description : ""
		marker.setTitle(name)
		marker.setDescription(desc)
		marker.setMapMarker(mapMarker)
		// vygeneruje se nový element markeru a vloží se do příslušného pole
		const markerHTML = this.view.getMarkerHTML(marker, this.currentLanguage)
		$(".markers-pane").append(markerHTML)
		// vyvolá event aktualizace markeru na mapě, podle nových dat
		AppService.emit(Events.UpdateMarker, mapMarker, name, desc)
		// vyvolá event uložení markeru
		AppService.emit(Events.SetRouteData, RouteData.AddWaypoint, marker)
	}

	// metoda pro změnu markeru
	changeMarker = (nameInput, descriptionInput) => {
		const name = nameInput.value
		const description = $(descriptionInput).val()
		const markerID = $(nameInput).attr("id")
		const marker = Marker.getByID(markerID)
		marker.setTitle(name)
		marker.setDescription(description)
		// vyvolá event aktualizace markeru na mapě, podle nových dat
		AppService.emit(Events.UpdateMarker, marker.getMapMarker(), name, description)
		// vyvolá event uložení změn markeru do localStorage
		AppService.emit(Events.SetRouteData, RouteData.UpdateWaypoint, marker)
	}

	// metoda pro smazání mareku
	deleteMarker = (container) => {
		const markerID = $(container).attr("id")
		$(container).fadeOut(secToMs(0.25), 0, () => {
			$(container).remove()
		})
		const marker = Marker.getByID(markerID)
		Marker.removeByID(markerID)
		// vyvolá event vymazání markeru z mapy
		AppService.emit(Events.RemoveMarker, marker.getMapMarker())
		// vyvolá event vymazání markeru z uložiště
		AppService.emit(Events.SetRouteData, RouteData.RemoveWaypoint, marker)
	}

	// metoda pro uložení trasy do localStorage
	save = () => {
		// vyvolá event uložení
		AppService.emit(Events.Save)
	}

	// metoda pro načtení uložených tras v localStorage
	getStored = () => {
		Object.getOwnPropertyNames(localStorage).forEach((currentRouteName) => {
			if (!currentRouteName.startsWith("route")) return
			const id = currentRouteName.split("-")[1]
			const currentRoute = JSON.parse(localStorage.getItem(currentRouteName))
			// pokud nějaké trasy jsou vytvoří element a vloží se do dolního panelu
			const mapElement = this.view.getStoredMap(id, currentRoute, this.currentLanguage)
			$("#storedPane").append(mapElement)
		})
	}

	// metoda pro vymazání uložené mapy z localStorage
	deleteStored = (container, id) => {
		$(container).fadeOut(secToMs(0.5), 0, () => {
			$(container).remove()
		})
		localStorage.removeItem(`route-${id}`)
	}

	// metoda pro otevření uložené trasy ze seznamu
	openStored = (id, route) => {
		this.initMapPage(route.origin?.name, route.destination?.name)
		// vyvolá event nastavení všech uložených markerů na mapu
		AppService.emit(Events.SetMarkers, route.waypoints)
		// vyvolá event obnovení otevřené mapy (je potřeba pro zpracování tras)
		AppService.emit(Events.SetOpenStoredID, id)
		this.openStoredID = id
	}

	// metoda pro obnovení obrazovky bez mapy a ji vymazání 
	deleteMap = () => {
		// pokud je však už uložená, také se vymáže
		AppService.emit(Events.DeleteStored)
		this.initMainPage()
	}

	// metoda inicializace preloaderu
	initPreloader = (action) => {
		const loader = this.view.getPreloader()
		this.setCurrentPage(loader)
		$(document).ready(action)
	}

}