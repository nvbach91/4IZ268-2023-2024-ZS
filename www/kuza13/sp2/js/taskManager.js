export default class TaskManager {
	#tasks = [];
	#notificationManager;
	constructor(notificationManager) {
		this.#notificationManager = notificationManager;
		this.#loadTasks();
	}

	// Implementation for adding a task
	addTask() {
		const taskText = $('#taskForm').find('#taskInput').val();
		const taskPriority = $('#taskForm').find('#taskPriority').val();
		const taskDueDate = $('#taskForm').find('#taskDueDate').val();

		const task = {
			id: Date.now(),
			text: taskText,
			priority: taskPriority,
			dueDate: taskDueDate,
			done: false,
		};

		this.#renderTask(task);

		this.#tasks.push(task);
		TaskManager.addToLS('tasks', JSON.stringify(this.#tasks));
		this.#checkEmptyList($('#tasksList'));

		setTimeout(() => {
			this.formRenew();
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

	#loadTasks() {
		if (localStorage.getItem('tasks')) {
			this.#tasks = JSON.parse(localStorage.getItem('tasks'));

			// Sort tasks by due date
			this.#tasks.sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate));

			// Render sorted tasks
			this.#renderAllTasks();
		}
		this.#checkEmptyList($('#tasksList'));
	}

	// Method to render all tasks at once
	#renderAllTasks() {
		const tasksHTML = this.#tasks
			.map(task => this.#createTaskHTML(task))
			.join('');
		$('#tasksList').html(tasksHTML);
	}

	// Logic to render a task
	#renderTask(task) {
		this.#tasks.push(task);
		this.#renderAllTasks();
	}

	// New method to create a task element
	#createTaskHTML(task) {
		const priorityColor = {
			low: '#28a745',
			medium: '#ffc107',
			high: '#dc3545',
		};

		let taskHTML = `<li id="${
			task.id
		}" class="list-group-item" tabindex="0" style="border-left: 4px solid ${
			priorityColor[task.priority]
		};">`;
		taskHTML += `<span class="${
			task.done ? 'task-title--done' : 'task-title'
		}">${task.text}</span>`;
		taskHTML += `<span class="task-due-date">Due: ${task.dueDate}</span>`;
		taskHTML += `<div class="task-item__buttons">`;
		taskHTML += `<button type="button" data-action="done" class="btn-action"><img src="./styles/img/tick.svg" alt="Done" width="18" height="18"></button>`;
		taskHTML += `<button type="button" data-action="delete" class="btn-action"><img src="./styles/img/cross.svg" alt="Delete" width="18" height="18"></button>`;
		taskHTML += `</div></li>`;

		return taskHTML;
	}

	// Renews the input
	formRenew() {
		$('#taskInput').val('');
		$('#taskDueDate').val(new Date().toISOString().split('T')[0]);
		$('#taskPriority').val('low');
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
