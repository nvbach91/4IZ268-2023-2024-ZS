const $taskList = $('#list-items');
const $messageBox = $('#message-box');
$(document).ready(function () {
    const $taskList = $('#list-items');
    const $messageBox = $('#message-box');
    const $spinner = $('#loading-spinner');
    const todoistToken = '1191db6d76082d2f8ac72f67f8b29e95c01175cc';
    const projectId = '2327479882';
    loadTasksFromTodoist(projectId, todoistToken);

    $(".modal_close").click(function () {
        $(".modal_box").removeClass("active");
    });


    const priorityMapping = {
        'High': 3,
        'Medium': 2,
        'Low': 1
    };

    function sortTasks() {
        const tasksArray = $taskList.children('li').get();
        tasksArray.sort(function (a, b) {
            // Convert due dates to date objects, using a far future date if not set
            const dateA = $(a).data('due-date') ? new Date($(a).data('due-date')) : new Date('9999-12-31');
            const dateB = $(b).data('due-date') ? new Date($(b).data('due-date')) : new Date('9999-12-31');
            const priorityA = $(a).data('priority');
            const priorityB = $(b).data('priority');

            // Compare by due date first
            if (dateA < dateB) return -1;
            if (dateA > dateB) return 1;

            // If due dates are equal, compare by priority
            return priorityB - priorityA;
        });

        $.each(tasksArray, function (idx, item) { $taskList.append(item); }); // Re-append items in sorted order
    }



    async function loadTasksFromTodoist(_projectId, todoistToken) {
        $spinner.show();
        $messageBox.removeClass('alert-success alert-danger').hide();

        try {
            const response = await fetch('https://api.todoist.com/rest/v2/tasks', {
                method: 'GET',
                headers: {
                    'Authorization': 'Bearer ' + todoistToken
                }
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const tasks = await response.json();

            tasks.forEach(task => {
                const taskContent = task.content;
                const taskPriority = task.priority; // Todoist uses numbers 1 to 4
                const dueDate = task.due_date;
                const taskId = task.id;
                const displayDate = dueDate ? `Due: ${dueDate}` : '';

                // Use getPriorityClass to map Todoist priority to your priority classes
                const priorityClass = getPriorityClass(taskPriority);

                const displayPriority = `Priority: ${taskPriority}`;
                const $listItem = $('<li>').html(`
                    ${taskContent} 
                    <span class="task-priority ${priorityClass}">${displayPriority}</span>
                    <span class="task-due-date">${displayDate}</span>
                    <i class="fa fa-check" aria-hidden="true"></i> 
                    <i class="fa fa-trash" aria-hidden="true"></i>
                `)  .attr('data-task-id', taskId)
                    .attr('data-priority', taskPriority)
                    .attr('data-due-date', dueDate);
                $taskList.append($listItem);
            });

            sortTasks(); // Call sort after appending all tasks



            $messageBox.text('Tasks loaded successfully').addClass('alert-success').show();
        } catch (error) {
            console.error('Error loading tasks:', error);
            $messageBox.text('Error loading tasks from Todoist').addClass('alert-danger').show();
        } finally {
            $spinner.hide();
        }
    }

    // Function to add task
    const addTaskToTodoist = async (taskContent, priority, successCallback, errorCallback) => {
        $spinner.show();
        $messageBox.removeClass('alert-success alert-danger').hide();
    
        try {
            const requestData = { content: taskContent, project_id: projectId , priority: priority };
            const response = await fetch('https://api.todoist.com/rest/v2/tasks', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json; charset=UTF-8',
                    'Authorization': 'Bearer ' + todoistToken
                },
                body: JSON.stringify(requestData)
            });
    
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
    
            const data = await response.json();
    
            if (successCallback) {
                checkAllTasksComplete(); // Check after adding task
                sortTasks(); // Sort tasks after adding
            }
            $messageBox.text('Task added successfully').addClass('alert-success').show();
        } catch (error) {
            console.log(error);
            if (errorCallback) errorCallback(error); // Call the error callback function if it exists
            $messageBox.text('Error adding task to Todoist').addClass('alert-danger').show();
        } finally {
            $spinner.hide();
        }
    };
    
    // Function to delete task 
    const deleteTaskFromTodoist = async (taskId) => {
        try {
            const response = await fetch(`https://api.todoist.com/rest/v2/tasks/${taskId}`, {
                method: 'DELETE',
                headers: {
                    "Authorization": `Bearer ${todoistToken}`
                }
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            $(`li[data-task-id=${taskId}]`).remove();
            $('#message-box').text('Task deleted successfully').addClass('alert-success').show();
            checkAllTasksComplete(); // Check after deleting task
        } catch (error) {
            console.error("Error deleting task", error);
            $('#message-box').text('Error deleting task').addClass('alert-danger').show();
        }
    };

    // Function to complete task 
    const completeTaskInTodoist = async (taskId) => {
        try {
            const response = await fetch(`https://api.todoist.com/rest/v2/tasks/${taskId}/close`, {
                method: 'POST',
                headers: {
                    "Authorization": `Bearer ${todoistToken}`
                }
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            $(`li[data-task-id=${taskId}]`).addClass('checked');
            $('#message-box').text('Task marked as completed').addClass('alert-success').show();
            checkAllTasksComplete(); // Check after completing task
        } catch (error) {
            console.error("Error completing task", error);
            $('#message-box').text('Error marking task as completed').addClass('alert-danger').show();
        }
    };


   // Event handler for form submission (Add task)
$('#task-form').submit(async function (event) {
    event.preventDefault();

    const taskContent = $('#input').val().trim();
    const taskPriority = $('#priority').val(); // This gets the selected priority value from the form
    const dueDate = $('#due-date').val();
    if (taskContent) {
        const displayDate = dueDate ? `Due: ${dueDate}` : '';

        // Translate the selected priority to Todoist's priority scale (1 to 4)
        const todoistPriority = priorityMapping[taskPriority]; // Ensure this maps correctly

        // No changes needed here for displaying the task, but adjust the priority passed to addTaskToTodoist
        const $listItem = $('<li>').html(`
            ${taskContent} 
            <span class="task-priority ${getPriorityClass(todoistPriority)}">Priority: ${taskPriority}</span>
            <span class="task-due-date">${displayDate}</span>
            <i class="fa fa-check" aria-hidden="true"></i> 
            <i class="fa fa-trash" aria-hidden="true"></i>
        `);
        $taskList.append($listItem);

        await addTaskToTodoist(taskContent, todoistPriority, dueDate, function (response) {
            // Adjust data attributes to reflect the actual priority and due date
            $listItem
                .attr('data-task-id', response.id)
                .attr('data-priority', todoistPriority) 
                .attr('data-due-date', dueDate);
            checkAllTasksComplete();
            sortTasks();
        }, function (error) {
            console.error('Error adding task:', error);
            $listItem.remove();
        });

        $('#input').val(''); // Clear the input after submitting
    }
});
    // Event handler for deleting a task
    $taskList.on('click', '.fa-trash', function () {
        const $listItem = $(this).closest('li');
        const taskId = $listItem.data('task-id');
        if (taskId) {
    
            $('#confirmDeleteModal').show();
    
            $('#confirmDeleteBtn').off('click').on('click', function () {
    
                deleteTaskFromTodoist(taskId);
                $('#confirmDeleteModal').hide();
            });
    
            $('#cancelDeleteBtn').off('click').on('click', function () {
    
                $('#confirmDeleteModal').hide();
            });
        }
    });

    // Close modal if user clicks on the close button
    $('.modal-close').click(function () {
        $('.modal').hide();
    });
    // Event handler for completing a task
    $taskList.on('click', '.fa-check', function () {
        const taskId = $(this).closest('li').data('task-id');
        if (taskId) {
            completeTaskInTodoist(taskId);
            checkAllTasksComplete();
        }
    });

    $taskList.on('click', '.fa-check', function () {
        $(this).parent('li').toggleClass('checked');
        checkAllTasksComplete();
    });
});

// Function to check if all tasks are completed
const checkAllTasksComplete = () => {
    const allTasks = $taskList.children('li');
    const allCompleted = allTasks.length > 0 && allTasks.not('.checked').length === 0;
    console.log("All tasks completed:", allCompleted); // Debug log

    if (allCompleted) {

        $(".modal_box").addClass("active");
    }
};


function openModal() {
    $('.wrapper .modal_box').addClass('active');
    $('body').addClass('blurred-background');
}

function closeModal() {
    $('.wrapper .modal_box').removeClass('active');
    $('body').removeClass('blurred-background');
}
// Function to get the CSS class name based on the priority level
function getPriorityClass(priority) {
    switch (priority) {
        case 3:
            return 'priority-high';
        case 2:
            return 'priority-medium';
        case 1:
        default:
            return 'priority-low';
    }
}