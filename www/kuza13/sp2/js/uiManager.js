export default class UIManager {
	#graphManager;
	#authManager;
	#notificationManager;

	constructor(graphManager, notificationManager, authManager) {
		this.#graphManager = graphManager;
		this.#authManager = authManager;
		this.#notificationManager = notificationManager;
	}

	async displayUI() {
		const user = await this.#authManager.getUser();
		if (user) {
			$('#userName').text(user.displayName);
			$('#signinButton').hide();
			$('#content').show();
		} else {
			$('#signinButton').show();
			$('#content').hide();
		}
	}

	async displayEvents() {
		try {
			const days = await this.getDays();
			const events = await this.#graphManager.getEventsForDays(days);
			console.log(events);

			if (!events || events.value.length < 1) {
				this.#notificationManager.showNotification(
					'No events for coming days!',
					'error',
				);
			} else {
				const eventsList = $('#events');
				eventsList.empty(); // Clear existing items
				$('#eventWrapper').show();
				$('#eventWrapper p')
					.html(
						`Your events retrieved from Microsoft calendar for ${days} days:`,
					)
					.show();
				console.log('Events showed');

				console.log('Days:', days);
				console.log('Events Data:', events);

				events.value.forEach(event => {
					const eventText = `${event.subject} - From ${new Date(
						event.start.dateTime,
					).toLocaleString()} to ${new Date(
						event.end.dateTime,
					).toLocaleString()}`;
					eventsList.append($('<li>').text(eventText));
				});
				this.#notificationManager.showNotification(
					'All events showed!',
					'info',
				);
			}
		} catch (error) {
			// Assuming showNotification is a method of another class or a global function
			this.#notificationManager.showNotification(error.message, 'error');
			console.log(error);
			$('#daysInput').focus();
		}
	}

	getDays() {
		const days = $('#daysInput').val();

		if (isNaN(+days) || !days) {
			throw new Error('Enter a valid number of days!');
		} else {
			return +days;
		}
	}
}
