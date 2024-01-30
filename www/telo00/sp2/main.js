
const $taskList = $('#list-items');

$(document).ready(function () {
    const todoistToken = '1191db6d76082d2f8ac72f67f8b29e95c01175cc';
    const projectId = '2327479882';

    // Function to add task 
    const addTaskToTodoist = async (taskContent, successCallback, errorCallback) => {
        const $spinner = $('#loading-spinner');
        const $messageBox = $('#message-box');

        $spinner.show();
        $messageBox.removeClass('alert-success alert-danger').hide();

        try {
            const requestData = { content: taskContent, project_id: projectId };
            const response = await $.ajax({
                type: 'POST',
                url: 'https://api.todoist.com/rest/v2/tasks',
                contentType: 'application/json; charset=UTF-8',
                data: JSON.stringify(requestData),
                headers: { "Authorization": 'Bearer ' + todoistToken }
            });

            if (successCallback) successCallback(response);
            $messageBox.text('Task added successfully').addClass('alert-success').show();
        } catch (error) {
            if (errorCallback) errorCallback(error);
            $messageBox.text('Error adding task to Todoist').addClass('alert-danger').show();
        } finally {
            $spinner.hide();
        }
    };

    // Function to delete task 
    const deleteTaskFromTodoist = async (taskId) => {
        try {
            await $.ajax({
                url: `https://api.todoist.com/rest/v2/tasks/${taskId}`,
                type: 'DELETE',
                headers: { "Authorization": `Bearer ${todoistToken}` }
            });

            $(`li[data-task-id=${taskId}]`).remove();
            $('#message-box').text('Task deleted successfully').addClass('alert-success').show();
        } catch (error) {
            console.error("Error deleting task", error);
            $('#message-box').text('Error deleting task').addClass('alert-danger').show();
        }
    };

    // Function to complete task 
    const completeTaskInTodoist = async (taskId) => {
        try {
            await $.ajax({
                url: `https://api.todoist.com/rest/v2/tasks/${taskId}/close`,
                type: 'POST',
                headers: { "Authorization": `Bearer ${todoistToken}` }
            });

            $(`li[data-task-id=${taskId}]`).addClass('checked');
            $('#message-box').text('Task marked as completed').addClass('alert-success').show();
        } catch (error) {
            console.error("Error completing task", error);
            $('#message-box').text('Error marking task as completed').addClass('alert-danger').show();
        }
    };

    // Event handler for form submission (Add task)
    $('#task-form').submit(async function (event) {
        event.preventDefault();

        const taskContent = $('#input').val().trim();
        const taskPriority = $('#priority').val();
        const dueDate = $('#due-date').val();
        if (taskContent) {
            const displayDate = dueDate ? `Due: ${dueDate}` : '';
            const displayPriority = `Priority: ${taskPriority}`;
            const $listItem = $('<li>').html(`
            ${taskContent} 
            <span class="task-priority">${displayPriority}</span>
            <span class="task-due-date">${displayDate}</span>
            <i class="fa fa-check" aria-hidden="true"></i> 
            <i class="fa fa-trash" aria-hidden="true"></i>
        `);
            $taskList.append($listItem);

            await addTaskToTodoist(taskContent, function (response) {
                $listItem.attr('data-task-id', response.id);
                checkAllTasksComplete();
            }, function (error) {
                console.error('Error adding task:', error);
                $listItem.remove();
            });

            $('#input').val('');
        }
    });

    // Event handler for deleting a task
    $taskList.on('click', '.fa-trash', function () {
        const taskId = $(this).closest('li').data('task-id');
        if (taskId) {
            deleteTaskFromTodoist(taskId);
            checkAllTasksComplete();
        }
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

    if (allCompleted) {
        $(".modal_btn").show(); // Show the modal button
    } else {
        $(".modal_btn").hide(); // Hide the modal button
    }
};
$(document).ready(function () {
    $(".modal_btn").click(function () {
        $(".modal_box").addClass("active");
    });

    $(".modal_close").click(function () {
        $(".modal_box").removeClass("active");
    });
});
function openModal() {
    document.querySelector('.wrapper .modal_box').classList.add('active');
    document.querySelector('.modal_btn').style.display = 'block';
    document.body.classList.add('blurred-background');
}


function closeModal() {
    document.querySelector('.wrapper .modal_box').classList.remove('active');
    document.querySelector('.modal_btn').style.display = 'none';
    document.body.classList.remove('blurred-background');
}