const accessToken = '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'; // Obtained after user authentication

let userData;
let repos;

$('#search-form').submit(function (event) {
	event.preventDefault();
	const usernameToFetch = $('#userName').val();
	fetchUserData(usernameToFetch);
});

async function fetchUserData(username) {
	const apiUrl = `https://api.github.com/users/${username}`;

	try {
		const response = await $.ajax({
			url: apiUrl,
			headers: {
				Authorization: `Bearer ${accessToken}`,
			},
			method: 'GET',
			dataType: 'json',
		});

		this.userData = response;
		$('#user-profile').empty(); // Clear previous content
		$('#user-profile').append(
			`<img src="${response.avatar_url}" alt="User Avatar">`
		);
		$('#user-profile').append(`<p>Login: ${response.login}</p>`);
		console.log('User Data for', username, ':', response);
	} catch (error) {
		console.error('Error fetching user data:', error.message);
	}

	const reposUrl = this.userData.repos_url;
	try {
		const response = await $.ajax({
			url: reposUrl,
			headers: {
				Authorization: `Bearer ${accessToken}`,
			},
			method: 'GET',
			dataType: 'json',
		});

		this.repos = response;

		console.log('Repositories of', username, ':', response);
	} catch (error) {
		console.error('Error fetching user data:', error.message);
	}

	this.repos.forEach(repository => {
		console.log(repository.name);
		$('#repositories').append(`<li>${repository.name}</li>`);
	});
}
