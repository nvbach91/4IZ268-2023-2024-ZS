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
		// Event handler for setting date to tomorrow
		$('#setTomorrow').click(e => {
			e.preventDefault();
			$('#taskDueDate').val(this.getTomorrowDate());
		});

		// Event handler for setting date to next week
		$('#setNextWeek').click(e => {
			e.preventDefault();
			$('#taskDueDate').val(this.getNextWeekDate());
		});
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

	getTomorrowDate() {
		const today = new Date();
		const tomorrow = new Date(
			today.getFullYear(),
			today.getMonth(),
			today.getDate() + 2,
		);
		return tomorrow.toISOString().split('T')[0];
	}

	getNextWeekDate() {
		const today = new Date();
		const nextWeek = new Date(
			today.getFullYear(),
			today.getMonth(),
			today.getDate() + 8,
		);
		return nextWeek.toISOString().split('T')[0];
	}
}
