

/* ------------------------------- DATE -------------------------------------------*/

function updateDate() {
	const currentDate = new Date();
	const currentDateTime = currentDate.toLocaleString();
	document.querySelector('#date').textContent = currentDateTime;
}
setInterval(updateDate, 1000);

/*------------------------------------ SPINNER --------------------------------------*/

window.addEventListener("load", () => {
	const loader = document.querySelector(".loader");

	loader.classList.add("loader-hidden");

	loader.addEventListener("transitionend", () => {
		document.body.removeChild("loader");
	})
})

/*------------------------------------- TASK LIST ----------------------------------------------*/

window.addEventListener('load', () => {
	const taskForm = document.querySelector("#tasks-form");
	const taskInput = document.querySelector("#tasks-input");
	const taskDateInput = document.querySelector("#tasks-datepicker");
	const tasksElement = document.querySelector("#tasks");

	// Load tasks from localStorage on page load
	const storedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
	storedTasks.forEach(storedTask => {
		const taskElement = createTaskElement(storedTask.task, storedTask.date);
		tasksElement.appendChild(taskElement);
	});

	taskForm.addEventListener('submit', (e) => {
		e.preventDefault();

		const task = taskInput.value.trim().toUpperCase();
		if (task === '') {
			return false;
		}

		const date = taskDateInput.value;
		if (date === '') {
			return false;
		}

		const taskElement = createTaskElement(task, date);
		tasksElement.appendChild(taskElement);

		taskInput.value = '';

		// Save tasks to localStorage after adding a new task
		saveTasksToLocalStorage();


	});

	// Function to create task element
	function createTaskElement(task, date) {
		const taskElement = document.createElement('div');
		taskElement.classList.add('task');

		const taskContent = document.createElement('div');
		taskContent.classList.add('task-content');
		taskElement.appendChild(taskContent);

		const inputElement = document.createElement('input');
		inputElement.classList.add('text');
		inputElement.type = 'text';
		inputElement.value = task;
		inputElement.setAttribute('readonly', 'readonly');
		inputElement.setAttribute('size', '50');
		taskContent.appendChild(inputElement);

		const inputDateElement = document.createElement('input');
		inputDateElement.classList.add('taskItemDate');
		inputDateElement.type = 'date';
		inputDateElement.value = date;
		inputDateElement.setAttribute('readonly', 'readonly');
		taskContent.appendChild(inputDateElement);

		const buttonsElement = document.createElement('div');
		buttonsElement.classList.add('buttons');

		const editButton = document.createElement('button');
		editButton.classList.add('edit-button');
		editButton.innerText = 'Edit';

		const removeButton = document.createElement('button');
		removeButton.classList.add('remove-button');
		removeButton.innerText = 'Remove';

		const sendButton = document.createElement('button');
		sendButton.classList.add('send-button');
		sendButton.innerText = 'Send';

		buttonsElement.appendChild(editButton);
		buttonsElement.appendChild(removeButton);
		buttonsElement.appendChild(sendButton);

		taskElement.appendChild(buttonsElement);

		// Event listeners for editButton, removeButton, and sendButton
		editButton.addEventListener('click', () => handleEditTask(inputElement, inputDateElement, editButton));
		removeButton.addEventListener('click', () => handleRemoveTask(taskElement));
		sendButton.addEventListener('click', () => handleSendTask(inputElement.value, inputDateElement.value));

		return taskElement;
	}

	// Function to save tasks to localStorage
	function saveTasksToLocalStorage() {
		const tasks = Array.from(tasksElement.children).map(taskElement => {
			const inputElement = taskElement.querySelector('.text');
			const inputDateElement = taskElement.querySelector('.taskItemDate');
			return { task: inputElement.value, date: inputDateElement.value };
		});

		localStorage.setItem('tasks', JSON.stringify(tasks));
	}

	// Function to handle editing a task
	function handleEditTask(inputElement, inputDateElement, editButton) {
		if (editButton.innerText.toLowerCase() === "edit") {
			editButton.innerText = "Save";
			inputElement.removeAttribute("readonly");
			inputDateElement.removeAttribute("readonly");
			inputElement.focus();
		} else {
			editButton.innerText = "Edit";
			inputElement.setAttribute("readonly", "readonly");
			saveTasksToLocalStorage(); // Save tasks after editing
		}
	}

	// Function to handle removing a task
	function handleRemoveTask(taskElement) {
		tasksElement.removeChild(taskElement);
		saveTasksToLocalStorage(); // Save tasks after removing
	}

	// Function to handle sending a task (example function, replace with your own logic)
	function handleSendTask(taskContent, taskDate) {
		console.log("Sending task:", taskContent, "on date:", taskDate);


		// JSON representation events in calendar
		var event = {
			'summary': taskContent, // event name

			start: {
				date: taskDate,
				timeZone: 'UTC',
			},

			end: {
				date: taskDate,
				timeZone: 'UTC',
			}
		}

		//sends request to google API
		const request = gapi.client.calendar.events.insert({
			'calendarId': 'primary', //primary = personal calendar of user
			'resource': event // event content in google calendar
		});

		// processing request, logging output
		request.execute(function (event) {
			console.log(event)
		});

	}
});




/* ---------------------------------- geolocation ------------------------------------- */

if ('geolocation' in navigator) {
	navigator.geolocation.getCurrentPosition((position) => {
		console.log(position);
	});
} else {
	console.log('geolocation is not available');
}
