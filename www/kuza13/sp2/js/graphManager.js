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

	async fetchCategoryColors() {
		try {
			const categoryColors = await this.#graphClient
				.api('/me/outlook/masterCategories')
				.get();

			return categoryColors.value.reduce((acc, category) => {
				acc[category.displayName] = category.color;
				console.log(acc);
				return acc;
			}, {});
		} catch (error) {
			console.error('Error fetching category colors:', error);
			return {};
		}
	}

	async getEventsForDays(days) {
		console.log('Getting events...');
		this.#authManager.ensureScope('Calendars.read');

		this.#dateNext.setDate(this.#dateNow.getDate() + days);

		const query = `startDateTime=${this.#dateNow.toISOString()}&endDateTime=${this.#dateNext.toISOString()} `;

		return await this.#graphClient
			.api('/me/calendarview')
			.query(query)
			.select('subject,start,end,location,categories,bodyPreview')
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
