export class AppService {
	static events = {}

	static on = (name, func) => {
		Object.defineProperty(this.events, name, { value: func })
	}

	static emit = (name, ...params) => {
		Object.getOwnPropertyNames(this.events).forEach((currentEvent) => {
			if (currentEvent === name) {
				this.events[currentEvent](...params)
			}
		})
	}

}