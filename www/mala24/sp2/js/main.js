const CLIENT_ID = '883380303808-imakqbjabrfiecv30o921rm9rpdkluv5.apps.googleusercontent.com';
const API_KEY = 'AIzaSyAQAUrtE1-hy_vE4UFLnPJuxEPXi5oWC-Q';
const DISCOVERY_DOC = 'https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest';
const SCOPES = 'https://www.googleapis.com/auth/calendar';

let tokenClient;
let gapiInited = false;
let gisInited = false;

$(document).ready(function () {
  $('#signin_button').hide();

  $.getScript('https://apis.google.com/js/api.js', function () {
    gapiLoaded();
  });

  $.getScript('https://accounts.google.com/gsi/client', function () {
    gisLoaded();
  });
});

function gapiLoaded() {
  gapi.load('client', initializeGapiClient);
}

async function initializeGapiClient() {
  await gapi.client.init({
    apiKey: API_KEY,
    discoveryDocs: [DISCOVERY_DOC],
  });
  gapiInited = true;
  maybeEnableButtons();
}

function gisLoaded() {
  tokenClient = google.accounts.oauth2.initTokenClient({
    client_id: CLIENT_ID,
    scope: SCOPES,
    callback: '',
  });
  gisInited = true;
  maybeEnableButtons();
}

function maybeEnableButtons() {
  if (gapiInited && gisInited) {
    $('#signin_button').show();
  }
}

function handleAuthClick() {
  tokenClient.callback = async (resp) => {
    if (resp.error !== undefined) {
      throw (resp);
    }
  };

  if (gapi.client.getToken() === null) {
    tokenClient.requestAccessToken({ prompt: 'consent' });
  } else {
    tokenClient.requestAccessToken({ prompt: '' });
  }
}

const pendingTasks = [];
const completedTasks = [];
let taskIdCounter = 0;

function updateTaskLists() {
  updateTaskList('Pending Tasks', 'pendingList', pendingTasks);
  updateTaskList('Completed Tasks', 'completedList', completedTasks);
}

function updateTaskList(listTitle, listId, taskArray) {
  const listElement = $('#' + listId);
  listElement.empty();

  taskArray.forEach(task => {
    const listItem = $('<li>').text(`${task.title} - ${task.date} (${task.start} - ${task.end})`);

    if (!task.completed) {
      const completeButton = createButton('Mark as Completed', 'btn btn-success btn-sm', () => markTaskAsCompleted(task.id));
      listItem.append(completeButton);
    }

    const deleteButton = createButton('Delete', 'btn btn-danger btn-sm', () => deleteTask(task.id));
    listItem.append(deleteButton);

    listElement.append(listItem);
  });
}

const addEvent = () => {
  const title = $('#title').val();
  const date = $('#date').val();
  const start = $('#st').val();
  const end = $('#et').val();

  const startTime = new Date(date + "," + start).toISOString();
  const endTime = new Date(date + "," + end).toISOString();

  const event = {
    summary: title,
    start: {
      dateTime: startTime,
      timeZone: "Europe/Prague"
    },
    end: {
      dateTime: endTime,
      timeZone: "Europe/Prague"
    },
  };

  console.log(event)
  var request = gapi.client.calendar.events.insert({
    calendarId: "primary",
    resource: event
  });

  request.execute(function (event) {
    console.log(event.htmlLink);

    const newTask = {
      id: taskIdCounter++,
      title: title,
      date: date,
      start: start,
      end: end,
      completed: false
    };
    pendingTasks.push(newTask);

    updateTaskLists();

    $('#taskForm').trigger('reset');
  });
};

function createButton(text, classes, clickHandler) {
  const button = $('<button>').text(text).addClass(classes).on('click', clickHandler);
  return button;
}

function deleteTask(taskId) {
  const pendingTaskIndex = pendingTasks.findIndex(task => task.id === taskId);
  const completedTaskIndex = completedTasks.findIndex(task => task.id === taskId);

  if (pendingTaskIndex !== -1) {
    pendingTasks.splice(pendingTaskIndex, 1);
  } else if (completedTaskIndex !== -1) {
    completedTasks.splice(completedTaskIndex, 1);
  }

  updateTaskLists();
}

function markTaskAsCompleted(taskId) {
  const taskIndex = pendingTasks.findIndex(task => task.id === taskId);
  if (taskIndex !== -1) {
    const completedTask = pendingTasks.splice(taskIndex, 1)[0];
    completedTask.completed = true;
    completedTasks.push(completedTask);
    updateTaskLists();
  }
}