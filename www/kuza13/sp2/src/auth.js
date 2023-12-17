const msalConfig = {
	auth: {
		clientId: 'cc618676-c343-4c51-8df5-e3dac80f6ae4',
		// comment out if you use a multi-tenant AAD app
		authority:
			'https://login.microsoftonline.com/2b51a4b3-443f-4406-8ca4-19056a79a444',
		redirectUri: 'http://localhost:5500',
	},
};

const msalRequest = { scopes: [] };

function ensureScope(scope) {
	if (!msalRequest.scopes.some(s => s.toLowerCase() === scope.toLowerCase())) {
		msalRequest.scopes.push(scope);
	}
}

//Initialize MSAL client
const msalClient = new msal.PublicClientApplication(msalConfig);

// Log the user in
async function signIn() {
	const authResult = await msalClient.loginPopup(msalRequest);
	sessionStorage.setItem('msalAccount', authResult.account.username);
}
//Get token from Graph
async function getToken() {
	let account = sessionStorage.getItem('msalAccount');

	if (!account) {
		throw new Error(
			'User info cleared from session. Please sign out and sign in again.',
		);
	}

	try {
		// First, attempt to get the token silently
		const silentRequest = {
			scopes: msalRequest.scopes,
			account: msalClient.getAccountByUsername(account),
		};

		const silentResult = await msalClient.acquireTokenSilent(silentRequest);
		return silentResult.accessToken;
	} catch (silentError) {
		// If silent requests fails with InteractionRequiredAuthError,
		// attempt to get the token interactively
		if (silentError instanceof msal.InteractionRequiredAuthError) {
			const interactiveResult = await msalClient.acquireTokenPopup(msalRequest);
			return interactiveResult.accessToken;
		} else {
			throw silentError;
		}
	}
}
