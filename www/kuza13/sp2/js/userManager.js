export default class UserManager {
	#uiManager;
	constructor(uiManager) {
		this.#uiManager = uiManager;
		this.user = this.getUserFromSession();
		this.initUserUI();
	}

	getUserFromSession() {
		return sessionStorage.getItem('msalAccount');
	}

	initUserUI() {
		if (this.user !== null) {
			// Logic to handle logged-in user

			this.#uiManager.displayUI();
		} else {
			$('#signin').show();
		}
	}

	// Additional user-related methods can be added here
}
