const taskInput = document.querySelector('#taskInput');
const form = document.querySelector('#form');
const tasksList = document.querySelector('#tasksList');

let tasks = [];

// Button listeners

form.addEventListener('submit', addTask);
tasksList.addEventListener('click', removeTask);
tasksList.addEventListener('click', completeTask);

if (localStorage.getItem('tasks')) {
	tasks = JSON.parse(localStorage.getItem('tasks'));
	tasks.forEach(task => renderTask(task));
}

checkEmptyList(tasksList);

// Functions

async function addTask(event) {
	event.preventDefault();

	const taskText = taskInput.value;

	const task = {
		id: Date.now(),
		text: taskText,
		done: false,
	};

	renderTask(task);

	tasks.push(task);

	addToLS('tasks', JSON.stringify(tasks));
	addEvent(taskText);
	checkEmptyList(tasksList);

	setTimeout(function () {
		displayEvents();
		inputRenew(taskInput);
	}, 1000);
}

function removeTask(event) {
	if (event.target.dataset.action === 'delete') {
		const parentNode = event.target.closest('.list-group-item');

		const taskId = Number(parentNode.id);

		//Filter an array and delete task
		tasks = tasks.filter(task => task.id !== taskId);

		parentNode.remove();

		checkEmptyList(tasksList);

		addToLS('tasks', JSON.stringify(tasks));
	}
}
function completeTask(event) {
	if (event.target.dataset.action === 'done') {
		const parentNode = event.target.closest('.list-group-item');

		const classTitle = parentNode.querySelector('.task-title');
		classTitle.classList.toggle('task-title--done');

		const taskId = Number(parentNode.id);

		const task = tasks.find(task => {
			if (task.id === taskId) {
				task.done = !task.done;
			}
		});
		addToLS('tasks', JSON.stringify(tasks));
	}
}

// Clean and focus on input
function inputRenew(input) {
	input.value = '';
	input.focus();
}

function checkEmptyList(tasksList) {
	if (tasks.length === 0) {
		const emptyListHTML = `<li id="emptyList" class="list-group-item empty-list">
		<img src="./img/leaf.svg" alt="Empty" width="48" class="mt-3">
		<div class="empty-list__title">TODO list is empty</div>
	</li>`;
		tasksList.insertAdjacentHTML('afterbegin', emptyListHTML);
	}
	if (tasks.length > 0) {
		const emptyListElement = tasksList.querySelector('#emptyList');
		emptyListElement ? emptyListElement.remove() : null;
	}
}

function addToLS(key, value) {
	localStorage.setItem(key, value);
}

function renderTask(task) {
	const isDone = () => (task.done ? 'task-title--done' : 'task-title');

	const taskHTML = `<li id = "${
		task.id
	}" class="list-group-item d-flex justify-content-between task-item">
	<span class="${isDone()}">${task.text}</span>
	<div class="task-item__buttons">
		<button type="button" data-action="done" class="btn-action">
			<img src="./img/tick.svg" alt="Done" width="18" height="18">
		</button>
		<button type="button" data-action="delete" class="btn-action">
			<img src="./img/cross.svg" alt="Done" width="18" height="18">
		</button>`;

	// Add task to the taskList
	tasksList.insertAdjacentHTML('beforeend', taskHTML);
}
