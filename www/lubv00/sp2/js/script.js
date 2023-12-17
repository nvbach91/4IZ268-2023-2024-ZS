$(document).ready(function () {
    let tasks = {
        active: [],
        completed: []
    };

    let isInitialLoad = true;
    let taskIdCounter = 0;

    function deleteAllTasks() {
        tasks = {
            active: [],
            completed: []
        };

        $('#tasks-list').empty();
        $('#done-list').empty();
        updateLocalStorage();
    }

    $('#delete-all').click(function () {
        if (confirm('Are you sure you want to delete all tasks?')) {
            deleteAllTasks();
        }
    });

    function updateLocalStorage() {
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    function createTaskItem(task, isCompleted) {
        const taskItem = $('<li></li>').attr('data-task-id', task.id);

        const titleInput = $('<input type="text" class="edit-field" style="display:none;">').val(task.title);
        const titleDisplay = $('<h3>').text(task.title);

        const descriptionInput = $('<textarea class="edit-field" style="display:none;"></textarea>').val(task.description);
        const descriptionDisplay = $('<p>').text(task.description).hide();
        if (task.description) {
            descriptionDisplay.show();
        }

        const deadlineInput = $('<input type="date" class="edit-field" style="display:none;">').val(task.deadline);
        const deadlineDisplay = $('<p>').text(task.deadline).hide();
        if (task.deadline) {
            deadlineDisplay.show();
        }

        const priorityInput = $('<select class="edit-field" style="display:none;"><option value=""></option><option value="High">High</option><option value="Medium">Medium</option><option value="Low">Low</option></select>').val(task.priority);
        const priorityDisplay = $('<p>').text(`Priority: ${task.priority}`).hide();
        if (task.priority) {
            priorityDisplay.show();
        }

        taskItem.append(titleInput, descriptionInput, deadlineInput, priorityInput, titleDisplay, descriptionDisplay, deadlineDisplay, priorityDisplay);

        const editButton = $('<button>Edit</button>').on('click', function () {
            if (editButton.text() === 'Edit') {
                toggleEditDisplay(taskItem, true);
                editButton.text('Update');
            } else {
                let newTitle = titleInput.val().trim();
                let newDescription = descriptionInput.val().trim();
                let newDeadline = deadlineInput.val().trim();
                let newPriority = priorityInput.val().trim();

                if (!newTitle) {
                    alert('The task title cannot be empty.');
                    return;
                }

                updateTask(task, {
                    title: newTitle,
                    description: newDescription,
                    deadline: newDeadline,
                    priority: newPriority
                }, isCompleted);

                toggleEditDisplay(taskItem, false);
                editButton.text('Edit');
            }
        });

        taskItem.append(editButton);

        const deleteButton = $('<button>Delete</button>').on('click', function () {
            removeTask(task, isCompleted);
        });
        taskItem.append(deleteButton);

        if (isCompleted) {
            const reactivateButton = $('<button>Reactivate</button>').on('click', function () {
                moveTaskToActive(task);
            });
            taskItem.append(reactivateButton);
        } else {
            const doneButton = $('<button>Done</button>').on('click', function () {
                moveTaskToCompleted(task);
            });
            taskItem.append(doneButton);
        }

        return taskItem;
    }

    function moveTaskToActive(taskToReactivate) {
        let updatedTaskIndex = tasks.completed.findIndex(task => task.id === taskToReactivate.id);
        if (updatedTaskIndex > -1) {
            let updatedTask = tasks.completed[updatedTaskIndex];

            tasks.completed.splice(updatedTaskIndex, 1);
            tasks.active.push(updatedTask);

            updateLocalStorage();
            refreshTaskList();
        }
    }

    function toggleEditDisplay(taskItem, isEditing) {
        taskItem.find('.edit-field').css('display', isEditing ? 'block' : 'none');
        taskItem.find('h3, p').css('display', isEditing ? 'none' : 'block');
    }

    function updateTask(oldTask, newValues, isCompleted) {
        let taskList = isCompleted ? tasks.completed : tasks.active;
        let index = taskList.findIndex(task => task.id === oldTask.id);
        if (index > -1) {
            taskList[index] = { ...taskList[index], ...newValues };
            updateLocalStorage();

            const taskItem = $(`li[data-task-id='${oldTask.id}']`);
            updateTaskItemDisplay(taskItem, taskList[index]);
        }
    }

    function updateTaskItemDisplay(taskItem, task) {
        taskItem.find('h3').text(task.title);

        const descriptionDisplay = taskItem.find('p').first();
        descriptionDisplay.text(task.description);
        descriptionDisplay.toggle(!!task.description);

        const deadlineDisplay = taskItem.find('p').eq(1);
        deadlineDisplay.text(task.deadline ? `Deadline: ${task.deadline}` : '');
        deadlineDisplay.toggle(!!task.deadline);

        const priorityDisplay = taskItem.find('p').eq(2);
        priorityDisplay.text(task.priority ? `Priority: ${task.priority}` : '');
        priorityDisplay.toggle(!!task.priority);
    }

    function addTask(task, isCompleted) {
        let taskItem = $(`li[data-task-id='${task.id}']`);
        if (taskItem.length === 0) {
            taskItem = createTaskItem(task, isCompleted);
            if (!isCompleted) {
                $('#tasks-list').append(taskItem);
            } else {
                $('#done-list').append(taskItem);
            }
        } else {
            updateTaskItemDisplay(taskItem, task);
        }

        if (!isInitialLoad) {
            let taskList = isCompleted ? tasks.completed : tasks.active;
            let existingTaskIndex = taskList.findIndex(t => t.id === task.id);
            if (existingTaskIndex > -1) {
                taskList[existingTaskIndex] = task;
            } else {
                taskList.push(task);
            }
            updateLocalStorage();
        }
    }

    function removeTask(taskToRemove, isCompleted) {
        tasks[isCompleted ? 'completed' : 'active'] = tasks[isCompleted ? 'completed' : 'active'].filter(task => task.id !== taskToRemove.id);
        updateLocalStorage();
        refreshTaskList();
    }

    function moveTaskToCompleted(taskToMove) {
        let updatedTaskIndex = tasks.active.findIndex(task => task.id === taskToMove.id);
        if (updatedTaskIndex > -1) {
            let updatedTask = tasks.active[updatedTaskIndex];

            tasks.active.splice(updatedTaskIndex, 1);
            tasks.completed.push(updatedTask);

            updateLocalStorage();
            refreshTaskList();
        }
    }

    function refreshTaskList() {
        $('#tasks-list').empty();
        $('#done-list').empty();
        tasks.active.forEach(task => addTask(task, false));
        tasks.completed.forEach(task => addTask(task, true));
    }

    $('#add-task').click(function () {
        const title = $('#new-task-title').val().trim();
        const description = $('#new-task-description').val().trim();
        const deadline = $('#new-task-deadline').val().trim();
        const priority = $('#new-task-priority').val().trim();

        if (title) {
            const newTask = {
                id: taskIdCounter++,
                title,
                description,
                deadline,
                priority
            };
            addTask(newTask, false);
            $('#new-task-title').val('');
            $('#new-task-description').val('');
            $('#new-task-deadline').val('');
            $('#new-task-priority').val('');
        } else {
            alert('Please enter a title for the task.');
        }
    });

    if (localStorage.getItem('tasks')) {
        tasks = JSON.parse(localStorage.getItem('tasks'));
        taskIdCounter = tasks.active.concat(tasks.completed).reduce((maxId, task) => Math.max(maxId, task.id), 0) + 1;
        tasks.active.forEach(task => addTask(task, false));
        tasks.completed.forEach(task => addTask(task, true));
    }

    isInitialLoad = false;
});
