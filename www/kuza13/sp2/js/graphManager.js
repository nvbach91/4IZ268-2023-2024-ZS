export default class GraphManager {
	#authProvider;
	#graphClient;
	#notificationManager;
	#authManager;
	#dateNow = new Date();
	#dateNext = new Date();

	constructor(authManager, notificationManager) {
		this.#authProvider = this.#createAuthProvider();
		this.#authManager = authManager;
		this.#notificationManager = notificationManager;
		this.#graphClient = MicrosoftGraph.Client.initWithMiddleware({
			authProvider: this.#authProvider,
		});
	}

	#createAuthProvider() {
		return {
			getAccessToken: async () => {
				// Call getToken in auth.js
				return await this.#authManager.getToken();
			},
		};
	}

	async getEventsForDays(days) {
		console.log('Getting events...');
		this.#authManager.ensureScope('Calendars.read');

		this.#dateNext.setDate(this.#dateNow.getDate() + days);

		const query = `startDateTime=${this.#dateNow.toISOString()}&endDateTime=${this.#dateNext.toISOString()} `;

		return await this.#graphClient
			.api('/me/calendarview')
			.query(query)
			.select('subject,start,end')
			.orderby('Start/DateTime')
			.get();
	}

	async addEvent(taskText) {
		ensureScope('Calendars.ReadWrite');

		return await this.#graphClient
			.api('/me/events')
			.post({
				subject: taskText,
				start: {
					dateTime: this.#dateNow.toISOString(),
					timeZone: 'Europe/Prague',
				},
				end: {
					dateTime: this.#dateNext.toISOString(),
					timeZone: 'Europe/Prague',
				},
			})
			.then(response => console.log(response))
			.catch(error => console.error(error));
	}
}
