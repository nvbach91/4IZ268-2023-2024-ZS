$(document).ready(function () {

    $('#input').change(function () {
        var inputVal = $(this).val();

        if (inputVal.trim().length === 0) {
            alert('Please enter a task');
            return;
        }
        $.ajax({
            url: 'http://localhost:443/addTask', 
            type: 'POST',
            contentType: 'application/json',
            data: JSON.stringify({ content: inputVal }), 
            success: function (response) {
                var taskId = response.id;
                $('ul').append('<li class="list-group-item d-flex justify-content-between align-items-center" data-task-id="' + taskId + '">' + inputVal +  '<i class="fa fa-check" aria-hidden="true"></i> <i class="fa fa-trash" aria-hidden="true"></i></li>');

                $('#input').val('');
            },
            error: function (error) {

                console.error("Error adding task", error);
            }
        });
        $(this).val('');
    });


    $('ul').on('click', '.fa-trash', function () {
  
        var taskId = $(this).closest('li').data('task-id');

        if (!taskId) {
            console.error("Task ID is undefined.");
            return;
        }

        var $li = $(this).closest('li');
        $.ajax({
            url: 'http://localhost:443/deleteTask/' + taskId,
            type: 'DELETE',
            success: function (response) {
                $li.remove();
            },
            error: function (error) {
                console.error("Error deleting task", error);
            }
        });
    });


    $('ul').on('click', '.fa-check', function () {
        $(this).parent('li').toggleClass('checked');
    });
});