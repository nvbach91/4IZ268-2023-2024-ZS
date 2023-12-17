const tasks = [];
let taskIdCounter = 0;

function addTask() {
    const taskName = document.getElementById('taskName').value;
    const taskDate = document.getElementById('taskDate').value;

    if (taskName && taskDate) {
        const task = { id: taskIdCounter++, name: taskName, date: taskDate, status: 'pending' };
        tasks.push(task);

        updateTaskList();

        document.getElementById('taskForm').reset();
    } else {
        alert('Please fill in all fields.');
    }
}

function updateTaskList() {
    const taskList = document.getElementById('taskList');
    taskList.innerHTML = '';

    const pendingTasks = tasks.filter(task => task.status === 'pending');
    const completedTasks = tasks.filter(task => task.status === 'completed');

    displayTasks('Pending Tasks', pendingTasks);
    displayTasks('Completed Tasks', completedTasks);
}

function displayTasks(title, tasksArray) {
    const taskList = document.getElementById('taskList');

    if (tasksArray.length > 0) {
        const titleElement = document.createElement('h3');
        titleElement.innerHTML = title;
        taskList.appendChild(titleElement);

        tasksArray.forEach((task) => {
            const listItem = document.createElement('div');
            listItem.className = 'card mb-2';
            listItem.innerHTML = `
          <div class="card-body">
            ${task.status === 'pending' ? `<h5>${task.name}</h5>` : ''}
            ${task.status === 'completed' ? `<h5 style="text-decoration: line-through;">${task.name}</h5>` : ''}
            <p class="card-text">${task.date}</p>
            <button type="button" class="btn btn-success btn-sm" onclick="markAsCompleted(${task.id})">Completed</button>
            <button type="button" class="btn btn-danger btn-sm ml-2" onclick="deleteTask(${task.id})">Delete</button>
          </div>
        `;
            taskList.appendChild(listItem);
        });
    }
}

function markAsCompleted(taskId) {
    const task = tasks.find(task => task.id === taskId);
    if (task) {
        task.status = 'completed';
        updateTaskList();
    }
}

function deleteTask(taskId) {
    const taskIndex = tasks.findIndex(task => task.id === taskId);
    if (taskIndex !== -1) {
        tasks.splice(taskIndex, 1);
        updateTaskList();
    }
}