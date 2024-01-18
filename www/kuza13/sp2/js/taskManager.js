export default class TaskManager {
	#tasks = [];
	#notificationManager;
	constructor(notificationManager) {
		this.#notificationManager = notificationManager;
		this.#loadTasks();
	}

	// Logic to load tasks from localStorage and render them
	#loadTasks() {
		if (localStorage.getItem('tasks')) {
			this.#tasks = JSON.parse(localStorage.getItem('tasks'));
			this.#tasks.forEach(task => this.#renderTask(task));
		}
		this.#checkEmptyList($('#tasksList'));
	}

	// Implementation for adding a task
	addTask(event) {
		const taskText = $('#taskForm').find('#taskInput').val();

		const task = {
			id: Date.now(),
			text: taskText,
			done: false,
		};

		this.#renderTask(task);

		this.#tasks.push(task);

		TaskManager.addToLS('tasks', JSON.stringify(this.#tasks));

		this.#checkEmptyList($('#tasksList'));

		setTimeout(function () {
			$('#taskInput').val('');
			$('#tasksList').find('.list-group-item:first').focus();
		}, 50);
		this.#notificationManager.showNotification('Task added!', 'info');
	}

	// Implementation for removing a task

	removeTask(taskId) {
		// Filter the tasks array to remove the task with the given taskId

		const taskToRemove = this.#tasks.find(task => task.id === +taskId);
		this.#tasks = this.#tasks.filter(task => task.id !== +taskId);

		// Find and remove the DOM element that corresponds to the task with taskId
		const taskElement = $('#tasksList').find(`#${taskId}`);
		if (taskElement.length > 0) {
			taskElement.remove();
		}
		const undoRemoveTask = () => {
			this.#tasks.push(taskToRemove); // Re-add the removed task
			this.#renderTask(taskToRemove); // Re-render the removed task in the DOM
			TaskManager.addToLS('tasks', JSON.stringify(this.#tasks)); // Update localStorage
			this.#checkEmptyList($('#tasksList')); // Check if the list is empty
		};

		// Check if the list is empty and update the UI accordingly
		this.#checkEmptyList($('#tasksList'));

		// Update the tasks in localStorage
		TaskManager.addToLS('tasks', JSON.stringify(this.#tasks));
		this.#notificationManager.showNotification(
			'Task removed!',
			'info',
			undoRemoveTask,
		);
	}

	// Implementation for completing a task
	completeTask(taskId) {
		// Find the task item in the DOM
		const taskElement = $('#tasksList').find(`#${taskId}`);
		const classTitle = taskElement.find('.task-title');

		// Toggle the 'done' class in the DOM
		classTitle.toggleClass('task-title--done');

		// Find and update the task in the tasks array
		this.#tasks = this.#tasks.map(task => {
			if (task.id === +taskId) {
				return { ...task, done: !task.done }; // Toggle the 'done' status
			}
			return task;
		});

		// Update the tasks in localStorage
		TaskManager.addToLS('tasks', JSON.stringify(this.#tasks));
		this.#notificationManager.showNotification('Task completed!', 'info');
	}

	// Logic to render a task
	#renderTask(task) {
		const isDone = () => (task.done ? 'task-title--done' : 'task-title');

		const $taskItem = $('<li>', {
			id: task.id,
			class: 'list-group-item',
			tabindex: 0,
		}).append(
			$('<span>', {
				class: isDone(),
				text: task.text,
			}),
			$('<div>', {
				class: 'task-item__buttons',
			}).append(
				$('<button>', {
					type: 'button',
					'data-action': 'done',
					class: 'btn-action',
				}).append(
					$('<img>', {
						src: './styles/img/tick.svg',
						alt: 'Done',
						width: 18,
						height: 18,
					}),
				),
				$('<button>', {
					type: 'button',
					'data-action': 'delete',
					class: 'btn-action',
				}).append(
					$('<img>', {
						src: './styles/img/cross.svg',
						alt: 'Delete',
						width: 18,
						height: 18,
					}),
				),
			),
		);

		// Append the task item to the tasks list
		$('#tasksList').append($taskItem);

		// Add task to the taskList
		$('#tasksList').prepend($taskItem);
	}

	// Renews the input
	inputRenew(input) {
		input.value = '';
		input.focus();
	}

	// Check if the list is empty and show/hide placeholder
	#checkEmptyList(tasksList) {
		if (this.#tasks.length === 0) {
			const emptyListHTML = `<li id="emptyList" class="list-group-item empty-list">
			<img src="./styles/img/leaf.svg" alt="Empty" width="48" class="mt-3">
			<div class="empty-list__title">TODO list is empty</div>
		</li>`;
			tasksList.prepend(emptyListHTML);
		}
		if (this.#tasks.length > 0) {
			const emptyListElement = tasksList.find('#emptyList');
			emptyListElement ? emptyListElement.remove() : null;
		}
	}

	// Utility method to interact with localStorage
	static addToLS(key, value) {
		localStorage.setItem(key, value);
	}
}
