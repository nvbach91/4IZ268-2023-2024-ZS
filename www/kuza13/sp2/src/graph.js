// Create an authentication provider
const authProvider = {
	getAccessToken: async () => {
		// Call getToken in auth.js
		return await getToken();
	},
};
// Initialize the Graph client
const graphClient = MicrosoftGraph.Client.initWithMiddleware({ authProvider });

//Get user info from Graph
async function getUser() {
	ensureScope('user.read');
	return await graphClient.api('/me').select('id,displayName').get();
}

async function getEvents() {
	ensureScope('Calendars.read');

	let dateNow = new Date();
	let dateNextWeek = new Date();

	dateNextWeek.setDate(dateNextWeek.getDate() + 7);

	const query = `startDateTime=${dateNow.toISOString()}&endDateTime=${dateNextWeek.toISOString()} `;

	return await graphClient
		.api('/me/calendarview')
		.query(query)
		.select('subject,start,end')
		.orderby('Start/DateTime')
		.get();
}

async function addEvent(taskText) {
	ensureScope('Calendars.ReadWrite');

	let dateNow = new Date();
	let dateNextWeek = new Date();
	dateNextWeek.setDate(dateNow.getDate() + 7);

	return await graphClient
		.api('/me/events')
		.post({
			subject: taskText,
			start: {
				dateTime: dateNow.toISOString(),
				timeZone: 'Europe/Prague',
			},
			end: {
				dateTime: dateNextWeek.toISOString(),
				timeZone: 'Europe/Prague',
			},
		})
		.then(response => {
			// Handle success
			console.log(response);
		})
		.catch(error => {
			// Handle error
			console.error(error);
		});
}
