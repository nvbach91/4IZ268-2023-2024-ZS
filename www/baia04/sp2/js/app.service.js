/*
	Třída AppService - je služba aplikace, která se zabývá zpracováním základní logiky applikace
*/
export class AppService {
	// Seznam všech registorvaných eventů 
	static events = {}

	// Metoda pro registraci nového eventu
	static on = (name, func) => {
		Object.defineProperty(this.events, name, { value: func })
	}

	// Metoda pro spuštění eventu podle jeho názvu
	static emit = (name, ...params) => {
		Object.getOwnPropertyNames(this.events).forEach((eventName) => {
			if (eventName === name) {
				this.events[eventName](...params)
			}
		})
	}
}