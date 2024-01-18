export default class EventHandler {
	#taskManager;
	#uiManager;
	constructor(taskManager, uiManager) {
		this.#taskManager = taskManager;
		this.#uiManager = uiManager;
	}

	setupEventListeners() {
		$('#taskForm').on('submit', this.handleTaskSubmit.bind(this));

		$('#tasksList').on(
			'click',
			'[data-action="delete"]',
			this.handleTaskDelete.bind(this),
		);

		$('#tasksList').on(
			'click',
			'[data-action="done"]',
			this.handleTaskComplete.bind(this),
		);

		$('#signinButton').on(
			'click',
			this.#uiManager.displayUI.bind(this.#uiManager),
		);
		$('#showEventsButton').on(
			'click',
			this.#uiManager.displayEvents.bind(this.#uiManager),
		);
	}

	handleTaskSubmit(event) {
		event.preventDefault();
		const taskText = $('#taskInput').val();
		this.#taskManager.addTask(taskText);
	}

	handleTaskDelete(event) {
		const taskId = $(event.target).closest('.list-group-item').prop('id');
		this.#taskManager.removeTask(taskId);
	}

	handleTaskComplete(event) {
		const taskId = $(event.target).closest('.list-group-item').prop('id');
		this.#taskManager.completeTask(taskId);
	}
}
