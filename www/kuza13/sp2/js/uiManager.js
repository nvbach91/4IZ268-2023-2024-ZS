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
		const msCategoryColors = {
			'Purple category': '#800080',
			'Blue category': '#0000FF',
			'Green category': '#008000',
			'Orange category': '#FFA500',
			'Yellow category': '#FFFF00',
			'Red category': '#FF0000',
		};
		try {
			this.toggleSpinnerOnButton('#showEventsButton', true);
			const days = await this.getDays();
			const events = await this.#graphManager.getEventsForDays(days);
			console.log(events);

			if (!events || events.value.length < 1) {
				this.#notificationManager.showNotification(
					'No events for coming days!',
					'error',
				);
			} else {
				let allEvents = '';
				const eventsList = $('#events');
				eventsList.empty(); // Clear existing items
				$('#eventWrapper').show();
				$('#eventWrapper p')
					.html(
						`Your events retrieved from Microsoft calendar for ${days} days:`,
					)
					.show();

				events.value.forEach(event => {
					const eventStartDate = new Date(
						event.start.dateTime,
					).toLocaleString();

					const eventEndDate = new Date(event.end.dateTime).toLocaleString();

					let eventDetails = `<li><strong>${event.subject}</strong> - From <span class="event-date">${eventStartDate}</span> to <span class="event-date">${eventEndDate}</span>`;

					if (event.location && event.location.displayName) {
						const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
							event.location.displayName,
						)}`;
						eventDetails += `<br><strong>Location:</strong> <a href="${mapsUrl}" target="_blank" class="maps-link">${event.location.displayName}</a>`;
					}

					if (event.categories && event.categories.length > 0) {
						const categoryColorStyles = event.categories
							.map(category => {
								const color = msCategoryColors[category];
								return `<span style="color: ${color};">${category}</span>`;
							})
							.join(', ');

						eventDetails += `<br><strong>Categories:</strong> ${categoryColorStyles}`;
					}

					if (event.bodyPreview) {
						eventDetails += `<br><strong>Description:</strong> ${event.bodyPreview}</li>`;
					}
					allEvents += eventDetails;
				});
				eventsList.append(eventsList).html(allEvents);

				this.#notificationManager.showNotification(
					'All events showed!',
					'info',
				);
				this.toggleSpinnerOnButton('#showEventsButton', false);
			}
		} catch (error) {
			// Assuming showNotification is a method of another class or a global function
			this.#notificationManager.showNotification(error.message, 'error');
			console.log(error);
			$('#daysInput').focus();
			this.toggleSpinnerOnButton('#showEventsButton', false);
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

	toggleSpinnerOnButton(buttonSelector, show) {
		const button = $(buttonSelector);
		if (show) {
			button.prop('disabled', true);
			button.html(
				`<img src="styles/img/spinner.svg" alt="Loading..." style="width: 30px; height: 30px;">`,
			);
		} else {
			button.prop('disabled', false);
			button.text('Show Events');
		}
	}
}
