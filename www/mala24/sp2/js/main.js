const CLIENT_ID = '883380303808-imakqbjabrfiecv30o921rm9rpdkluv5.apps.googleusercontent.com';
const API_KEY = 'AIzaSyAQAUrtE1-hy_vE4UFLnPJuxEPXi5oWC-Q';
const DISCOVERY_DOC = 'https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest';
const SCOPES = 'https://www.googleapis.com/auth/calendar.readonly';

let tokenClient;
let gapiInited = false;
let gisInited = false;
let userCoordinates;

const $signinButton = $('#signin_button');
const $title = $('#title');
const $date = $('#date');
const $start = $('#st');
const $end = $('#et');
const $taskForm = $('#taskForm');
const $pendingList = $('#pendingList');
const $completedList = $('#completedList');
const $addTaskButton = $('#addTaskButton');


$signinButton.click(function() {
  handleSignInClick();
});


$(document).ready(function () {
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
  }
}


function handleAuthClick() {
  tokenClient.callback = async (resp) => {
    if (resp.error !== undefined) {
      throw (resp);
    } else {
      $addTaskButton.show();
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
  updateTaskList('Pending Tasks', 'pendingList', pendingTasks, 'pending');
  updateTaskList('Completed Tasks', 'completedList', completedTasks, 'completed');
}

function updateTaskList(listTitle, listId, taskArray, listType) {
  const listElement = $('#' + listId);
  listElement.empty();

  let listItems = $();

  taskArray.forEach(task => {
    const listItem = $('<li>').text(`${task.title} - ${task.date} (${task.start} - ${task.end})`);

    if (!task.completed && listType === 'pending') {
      const completeButton = createButton('Mark as Completed', 'btn btn-success btn-sm', () => markTaskAsCompleted(task.id));
      listItem.append(completeButton);
    } else if (task.completed && listType === 'completed') {
      const pendingButton = createButton('Mark as Pending', 'btn btn-warning btn-sm', () => markTaskAsPending(task.id));
      listItem.append(pendingButton);
    }

    const deleteButton = createButton('Delete', 'btn btn-danger btn-sm', () => deleteTask(task.id));
    listItem.append(deleteButton);

    listItems = listItems.add(listItem);
  });

  listElement.append(listItems);
}

const addEvent = () => {
  const title = $title.val();
  const date = $date.val();
  const start = $start.val();
  const end = $end.val();

  if (!title || !date || !start || !end) {
    alert('Please fill in all fields. If all fields are filled, you have entered an invalid date.');
    return;
  }

  if (start >= end) {
    alert('Please enter a valid time range.');
    return;
  }

  const startTime = new Date(date + "," + start).toISOString();
  const endTime = new Date(date + "," + end).toISOString();

  var event = {
    summary: title,
    start: {
      dateTime: startTime,
      timeZone: 'Europe/Prague'
    },
    end: {
      dateTime: endTime,
      timeZone: 'Europe/Prague'
    },
    location: userCoordinates ? `task created in ${userCoordinates.lat}, ${userCoordinates.lng}` : undefined

  };

  console.log(event)
  var request = gapi.client.calendar.events.insert({
    calendarId: 'primary',
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

    $taskForm.trigger('reset');
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

function markTaskAsPending(taskId) {
  const taskIndex = completedTasks.findIndex(task => task.id === taskId);
  if (taskIndex !== -1) {
    const pendingTask = completedTasks.splice(taskIndex, 1)[0];
    pendingTask.completed = false;
    pendingTasks.push(pendingTask);
    updateTaskLists();
  }
}

$addTaskButton.on('click', addEvent);

$('input[name="sortOption"]').on('change', function () {
  const sortByDate = $('#sortByDate').is(':checked');
  const sortByTitle = $('#sortByTitle').is(':checked');

  if (sortByDate) {
    sortTasks(true, false);
  } else if (sortByTitle) {
    sortTasks(false, true);
  }

  updateTaskLists();
});

function sortTasks(sortByDate, sortByTitle) {
  if (sortByDate) {
    pendingTasks.sort((a, b) => new Date(`${a.date}T${a.start}`) - new Date(`${b.date}T${b.start}`));
    completedTasks.sort((a, b) => new Date(`${a.date}T${a.start}`) - new Date(`${b.date}T${b.start}`));
  }

  if (sortByTitle) {
    pendingTasks.sort((a, b) => a.title.localeCompare(b.title));
    completedTasks.sort((a, b) => a.title.localeCompare(b.title));
  }
}

function fetchGoogleCalendarTasks() {
  gapi.client.calendar.events.list({
    calendarId: 'primary',
    timeMin: new Date().toISOString(),
    showDeleted: false,
    singleEvents: true,
    orderBy: 'startTime',
  }).then(response => {
    const events = response.result.items;

    console.log(response);

    pendingTasks.length = 0;
    completedTasks.length = 0;
    taskIdCounter = 0;

    if (events.length > 0) {
      events.forEach(event => {
        const startTime = new Date(event.start.dateTime);
        const endTime = new Date(event.end.dateTime);

        const task = {
          id: taskIdCounter++,
          title: event.summary,
          date: startTime.toISOString().split('T')[0],
          start: startTime.toTimeString().split(' ')[0],
          end: endTime.toTimeString().split(' ')[0],
          completed: false,
        };

        if (event.status === 'confirmed') {
          task.completed = true;
          completedTasks.push(task);
        } else {
          pendingTasks.push(task);
        }
      });
    }

    updateTaskLists();
  }).catch(error => {
    console.error('Error fetching tasks from Google Calendar:', error);
  });
}

async function handleAuthClick() {
  tokenClient.callback = async (resp) => {
    if (resp.error !== undefined) {
      throw (resp);
    }

    fetchGoogleCalendarTasks();
  };

  if (gapi.client.getToken() === null) {
    tokenClient.requestAccessToken({ prompt: 'consent' });
  } else {
    tokenClient.requestAccessToken({ prompt: '' });
  }
}

function getUserLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      function (position) {
        userCoordinates = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        };
      },
      function (error) {
        console.error('Error getting user coordinates:', error.message);
      }
    );
  } else {
    alert('Geolocation is not supported by this browser.');
  }
}

document.addEventListener('DOMContentLoaded', function () {
  getUserLocation();
});
