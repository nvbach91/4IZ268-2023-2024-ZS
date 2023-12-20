async function displayUI() {
	await signIn();

	// Display info from user profile
	const user = await getUser();

	let userName = document.getElementById('userName');
	userName.innerText = user.displayName;

	// Hide login button and initial UI
	let signInButton = document.getElementById('signin');
	signInButton.style = 'display: none';

	let content = document.getElementById('content');
	content.style = 'display: block';

	let btnShowEvents = document.getElementById('btnShowEvents');
	btnShowEvents.style = 'display: block';
}

async function displayEvents() {
	let events = await getEvents();

	if (!events || events.value.length < 1) {
		let content = document.getElementById('content');
		let noItemsMessage = document.createElement('p');

		noItemsMessage.innerHTML = `No events for the coming week!`;
		content.appendChild(noItemsMessage);
	} else {
		let wrapperShowEvents = document.getElementById('eventWrapper');
		wrapperShowEvents.style = 'display: block';

		const eventsElement = document.getElementById('events');
		eventsElement.innerHTML = '';
		events.value.forEach(event => {
			var eventList = document.createElement('li');
			eventList.innerText = `${event.subject} - From  ${new Date(
				event.start.dateTime,
			).toLocaleString()} to ${new Date(event.end.dateTime).toLocaleString()} `;

			eventsElement.appendChild(eventList);
		});
	}

	let btnShowEvents = document.getElementById('btnShowEvents');
	btnShowEvents.style = 'display: none';
}
