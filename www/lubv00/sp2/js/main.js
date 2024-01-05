document.addEventListener('DOMContentLoaded', function () {
  document.getElementById('authorize_button').addEventListener('click', handleAuthClick);
  document.getElementById('signout_button').addEventListener('click', handleSignoutClick);
  document.getElementById('authorize_button').style.visibility = 'hidden';
  document.getElementById('signout_button').style.visibility = 'hidden';

  gapiLoaded();
  gisLoaded();

  document.getElementById('event_form').addEventListener('input', clearError);

  initDb();
  syncEventsWithServer();
});

const CLIENT_ID = '372806642611-fnli19n62jvf33fslvefn8m6jsqjnjum.apps.googleusercontent.com';
const API_KEY = 'AIzaSyDX33LAkSIHm2WQug7NcSOqV4Cf--kxRHw';
const DISCOVERY_DOC = 'https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest';
const SCOPES = 'https://www.googleapis.com/auth/calendar';

let tokenClient;
let gapiInited = false;
let gisInited = false;

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
    document.getElementById('authorize_button').style.visibility = 'visible';
    document.getElementById('loader').style.display = 'none';
  }
}

function handleAuthClick() {
  tokenClient.callback = async (resp) => {
    if (resp.error !== undefined) {
      displayError('Authorization failed: ' + resp.error);
      return;
    }
    document.getElementById('signout_button').style.visibility = 'visible';
    document.getElementById('authorize_button').innerText = 'Refresh';
    await listUpcomingEvents();
    clearError();
    clearMessage();
    document.querySelector('main').style.display = 'block';
  };

  if (gapi.client.getToken() === null) {
    tokenClient.requestAccessToken({ prompt: 'consent' });
  } else {
    tokenClient.requestAccessToken({ prompt: '' });
  }
}

function handleSignoutClick() {
  const token = gapi.client.getToken();
  if (token !== null) {
    google.accounts.oauth2.revoke(token.access_token, () => {
      gapi.client.setToken('');
      document.getElementById('upcoming_events_content').innerText = '';
      document.getElementById('authorize_button').innerText = 'Authorize';
      document.getElementById('signout_button').style.visibility = 'hidden';
      clearError();
    });
  } else {
    displayError('You are not signed in.');
  }
}

async function listUpcomingEvents() {
  let response;
  try {
    const request = {
      'calendarId': 'primary',
      'timeMin': (new Date()).toISOString(),
      'showDeleted': false,
      'singleEvents': true,
      'maxResults': 10,
      'orderBy': 'startTime',
    };
    response = await gapi.client.calendar.events.list(request);
  } catch (err) {
    document.getElementById('upcoming_events_content').innerText = err.message;
    return;
  }

  const events = response.result.items;
  if (!events || events.length == 0) {
    document.getElementById('upcoming_events_content').innerText = 'No events found.';
    return;
  }
  document.getElementById('upcoming_events_content').innerHTML = renderEventList(events);
/*   console.log(JSON.stringify(response, null, 2)); */
}

async function addEvent(eventDetails) {
  eventDetails.id = Date.now().toString();
  // console.log("Sending event details:", JSON.stringify(eventDetails, null, 2));

  eventDetails.extendedProperties = { private: { priority: document.getElementById('event_priority').value } };

  if (!navigator.onLine) {
    console.log("Offline - Event saved locally");
    saveEventToDb(eventDetails);
    displayMessage('You are offline. The event has been saved locally and will be synced when you are online.', 'offline');
  } else {
    try {
      const response = await gapi.client.calendar.events.insert({
        'calendarId': 'primary',
        'resource': eventDetails
      });
      console.log('Event created:', response);
      saveEventToDb(response.result);
      listUpcomingEvents();
    } catch (error) {
      console.error('Error creating event:', error);
      if (error.result) {
        console.error('Detailed error message:', error.result.error.message);
      }
    }
  }
}

document.getElementById('add_event_button').addEventListener('click', () => {
  const title = document.getElementById('event_title').value;
  const description = document.getElementById('event_description').value;
  let start = document.getElementById('event_start').value;
  let end = document.getElementById('event_end').value;

  if (!title || !start) {
    console.warn('Please fill in the title and start date');
    displayError('Please fill in the title and start date');
    return;
  }

  start = appendSeconds(start);

  if (!end) {
    end = new Date(new Date(start).getTime() + 60 * 60000).toISOString();
  } else {
    end = appendSeconds(end);
  }

  if (new Date(start) >= new Date(end)) {
    console.warn('Start time must be before end time.');
    displayError('Start time must be before end time.');
    return;
  }

  const eventDetails = {
    'summary': title,
    'description': description,
    'start': { 'dateTime': start, 'timeZone': 'Europe/Prague' },
    'end': { 'dateTime': end, 'timeZone': 'Europe/Prague' },
    'synced': navigator.onLine
  };

  const eventId = document.getElementById('event_id').value;
  if (eventId) {
    updateEvent(eventDetails, eventId).then(() => {
      resetFormFields();
    }).catch(error => {
      console.error('Error updating event:', error);
      displayError('Error updating event: ' + error.message);
    });
  } else {
    addEvent(eventDetails).then(() => {
      resetFormFields();
    }).catch(error => {
      console.error('Error adding event:', error);
      displayError('Error adding event: ' + error.message);
    });
  }
});

function resetFormFields() {
  document.getElementById('event_title').value = '';
  document.getElementById('event_description').value = '';
  document.getElementById('event_start').value = '';
  document.getElementById('event_end').value = '';
  document.getElementById('event_id').value = '';

  clearError();
}

async function listPastEvents(timeMin, timeMax) {
  let response;
  try {
    const request = {
      'calendarId': 'primary',
      'timeMin': timeMin.toISOString(),
      'timeMax': timeMax.toISOString(),
      'showDeleted': false,
      'singleEvents': true,
      'orderBy': 'startTime',
    };
    response = await gapi.client.calendar.events.list(request);
  } catch (err) {
    document.getElementById('past_events_content').innerText = err.message;
    return;
  }

  const events = response.result.items;
  if (!events || events.length == 0) {
    document.getElementById('past_events_content').innerText = 'No past events found.';
    return;
  }
  document.getElementById('past_events_content').innerHTML = renderEventList(events);
  // console.log(JSON.stringify(response, null, 2));
}

document.getElementById('day_events').addEventListener('click', () => {
  const now = new Date();
  const timeMax = new Date(now);
  const timeMin = new Date(now.setDate(now.getDate() - 1));
  listPastEvents(timeMin, timeMax);
});

document.getElementById('week_events').addEventListener('click', () => {
  const now = new Date();
  const timeMax = new Date(now);
  const timeMin = new Date(now.setDate(now.getDate() - 7));
  listPastEvents(timeMin, timeMax);
});

document.getElementById('month_events').addEventListener('click', () => {
  const now = new Date();
  const timeMax = new Date(now);
  const timeMin = new Date(now.setMonth(now.getMonth() - 1));
  listPastEvents(timeMin, timeMax);
});

function formatDateTimeCzech(start, end) {
  const optionsDate = { day: '2-digit', month: '2-digit', year: 'numeric' };
  const optionsTime = { hour: '2-digit', minute: '2-digit' };

  const startDate = new Date(start);
  const endDate = new Date(end);

  const startDateFormatted = startDate.toLocaleString('cs-CZ', optionsDate);
  const startTimeFormatted = startDate.toLocaleString('cs-CZ', optionsTime);
  const endTimeFormatted = endDate.toLocaleString('cs-CZ', optionsTime);

  if (startDate.toDateString() === endDate.toDateString()) {
    return `${startDateFormatted} ${startTimeFormatted} - ${endTimeFormatted}`;
  } else {
    const endDateFormatted = endDate.toLocaleString('cs-CZ', optionsDate);
    return `${startDateFormatted} ${startTimeFormatted} - ${endDateFormatted} ${endTimeFormatted}`;
  }
}

function renderEventList(events) {
  return events.map(event => {
    const description = event.description ? `<br><small>${event.description}</small>` : '';
    const priority = event.extendedProperties?.private?.priority || 'Medium';

    return `
      <li data-event-id="${event.id}" class="event-item">
        <div class="event-details">
          <span class="event-view">${event.summary} (${formatDateTimeCzech(event.start.dateTime || event.start.date, event.end.dateTime || event.end.date)})${description} <div class="priority-display">Priority: ${priority}</div></span>
          <div class="event-edit" style="display:none;">
            <input type="text" class="edit-title" value="${event.summary}">
            <input type="text" class="edit-description" value="${event.description || ''}" placeholder="Enter description here">
            <input type="datetime-local" class="edit-start" value="${event.start.dateTime.slice(0, 16)}">
            <input type="datetime-local" class="edit-end" value="${event.end.dateTime ? event.end.dateTime.slice(0, 16) : ''}">
            <select class="edit-priority">
            <option value="High" ${priority === 'High' ? 'selected' : ''}>High</option>
            <option value="Medium" ${priority === 'Medium' ? 'selected' : ''}>Medium</option>
            <option value="Low" ${priority === 'Low' ? 'selected' : ''}>Low</option>
        </select>
          </div>
        </div>
        <div class="event-actions">
          <button class="edit-event-button"><i class="fas fa-edit"></i>Edit</button>
          <button class="save-event-button" style="display:none;"><i class="fas fa-save"></i>Save</button>
          <button class="cancel-event-button" style="display:none;"><i class="fas fa-times"></i>Cancel</button>
          <button class="delete-event-button"><i class="fas fa-trash-alt"></i>Delete</button>
        </div>
      </li>
    `;
  }).join('');
}

document.addEventListener('click', function (event) {
  if (event.target.classList.contains('edit-event-button')) {
    const li = event.target.closest('li');
    const eventId = li.dataset.eventId;

    originalEventData[eventId] = {
      title: li.querySelector('.edit-title').value,
      start: li.querySelector('.edit-start').value
    };

    li.querySelector('.event-view').style.display = 'none';
    li.querySelector('.event-edit').style.display = '';
    li.querySelector('.edit-event-button').style.display = 'none';
    li.querySelector('.save-event-button').style.display = '';
    li.querySelector('.cancel-event-button').style.display = '';
    clearError();
  }

  if (event.target.classList.contains('save-event-button')) {
    const li = event.target.closest('li');
    const eventId = li.dataset.eventId;
    const newTitle = li.querySelector('.edit-title').value;
    const newDescription = li.querySelector('.edit-description').value;
    const newStart = li.querySelector('.edit-start').value;
    let newEnd = li.querySelector('.edit-end').value;
    const updatedPriority = li.querySelector('.edit-priority').value;

    if (!newTitle || !newStart) {
      displayError('Please fill in the title and start date');
      return;
    }

    if (!newEnd) {
      newEnd = new Date(new Date(newStart).getTime() + 60 * 60000).toISOString();
    } else {
      newEnd = appendSeconds(newEnd);
    }

    if (new Date(newStart) >= new Date(newEnd)) {
      displayError('Start time must be before end time');
      return;
    }

    let updatedDetails = {
      summary: newTitle,
      description: newDescription,
      start: { dateTime: appendSeconds(newStart), timeZone: 'Europe/Prague' },
      end: { dateTime: newEnd, timeZone: 'Europe/Prague' },
      extendedProperties: { private: { priority: updatedPriority }}
    };

    updateEvent(updatedDetails, eventId).then(() => {
      li.querySelector('.event-view').style.display = '';
      li.querySelector('.event-edit').style.display = 'none';
      li.querySelector('.edit-event-button').style.display = '';
      li.querySelector('.save-event-button').style.display = 'none';
      li.querySelector('.cancel-event-button').style.display = 'none';
      clearError();
    }).catch(error => {
      console.error('Error updating event:', error);
      displayError('Error updating event: ' + error.message);
    });
  }

  if (event.target.classList.contains('cancel-event-button')) {
    const li = event.target.closest('li');
    const eventId = li.dataset.eventId;

    if (originalEventData[eventId]) {
      li.querySelector('.edit-title').value = originalEventData[eventId].title;
      li.querySelector('.edit-start').value = originalEventData[eventId].start;
    }

    li.querySelector('.event-view').style.display = '';
    li.querySelector('.event-edit').style.display = 'none';
    li.querySelector('.edit-event-button').style.display = '';
    li.querySelector('.save-event-button').style.display = 'none';
    li.querySelector('.cancel-event-button').style.display = 'none';
    clearError();
  }

  if (event.target.classList.contains('delete-event-button')) {
    const li = event.target.closest('li');
    const eventId = li.dataset.eventId;
    deleteEvent(eventId).then(() => {
      li.remove();
      clearError();
    }).catch(error => {
      console.error('Error deleting event:', error);
      displayError('Error deleting event: ' + error.message);
    });
  }
});

async function editEvent(eventId) {
  try {
    const response = await gapi.client.calendar.events.get({
      'calendarId': 'primary',
      'eventId': eventId
    });

    const event = response.result;
    document.getElementById('event_id').value = eventId;
    document.getElementById('event_title').value = event.summary;
    document.getElementById('event_description').value = event.description || '';
    document.getElementById('event_start').value = event.start.dateTime ? event.start.dateTime.slice(0, 16) : '';
    document.getElementById('event_end').value = event.end && event.end.dateTime ? event.end.dateTime.slice(0, 16) : '';
    document.getElementById('event_priority').value = response.result.extendedProperties?.private?.priority || 'Medium';
  } catch (error) {
    console.error('Error fetching event details:', error);
  }
}

async function updateEvent(updatedDetails, eventId) {
  try {
    updatedDetails.start.dateTime = appendSeconds(updatedDetails.start.dateTime);

    if (!updatedDetails.end || !updatedDetails.end.dateTime) {
      updatedDetails.end = { dateTime: appendSeconds(new Date(new Date(updatedDetails.start.dateTime).getTime() + 60 * 60000).toISOString()), timeZone: 'Europe/Prague' };
    } else {
      updatedDetails.end.dateTime = appendSeconds(updatedDetails.end.dateTime);
    }

    const newPriority = document.querySelector(`li[data-event-id="${eventId}"] .edit-priority`).value;
    updatedDetails.extendedProperties = { private: { priority: newPriority }};

    // console.log("Updating event with details:", JSON.stringify(updatedDetails, null, 2));

    const response = await gapi.client.calendar.events.update({
      'calendarId': 'primary',
      'eventId': eventId,
      'resource': updatedDetails
    });
    console.log('Event updated:', response);

    refreshEventLists();
  } catch (error) {
    console.error('Error updating event:', error);
    if (error.result) {
      console.error('Detailed error message:', error.result.error.message);
    }
    throw error;
  }

  clearError();
}

function appendSeconds(dateTime) {
  if (dateTime.length === 16) {
    dateTime += ':00';
  }
  return dateTime;
}

function refreshEventLists() {
  listUpcomingEvents();

  const now = new Date();
  const pastTimeMax = new Date(now);
  const pastTimeMin = new Date(now.setDate(now.getDate() - 30));

  listPastEvents(pastTimeMin, pastTimeMax);
}

async function deleteEvent(eventId) {
  try {
    await gapi.client.calendar.events.delete({
      'calendarId': 'primary',
      'eventId': eventId
    });
    console.log('Event deleted');
  } catch (error) {
    console.error('Error deleting event:', error);
    throw error;
  }
}

function displayError(message) {
  const errorDiv = document.getElementById('error_message');
  errorDiv.innerText = message;
  errorDiv.style.display = 'block';
}

function clearError() {
  const errorDiv = document.getElementById('error_message');
  errorDiv.innerText = '';
  errorDiv.style.display = 'none';
}

let originalEventData = {};

const dbName = "TaskManagerDB";
const dbVersion = 1;
let db;

function initDb() {
  const request = indexedDB.open(dbName, dbVersion);

  request.onerror = function (event) {
    console.error("IndexedDB error:", event.target.errorCode);
  };

  request.onsuccess = function (event) {
    db = event.target.result;
    console.log("IndexedDB initialized successfully");
  };

  request.onupgradeneeded = function (event) {
    const db = event.target.result;
    const store = db.createObjectStore("events", { keyPath: "id" });

    store.createIndex("synced", "synced", { unique: false });
  };
}


async function saveEventToDb(event) {
  if (!db) {
    console.warn("Database is not initialized");
    return;
  }

  const transaction = db.transaction(["events"], "readwrite");
  const store = transaction.objectStore("events");
  const request = store.add(event);

  request.onsuccess = function () {
    console.log("Event saved to IndexedDB:", event);
  };

  request.onerror = function () {
    console.error("Error saving event to IndexedDB:", request.error);
  };
}

async function listEventsFromDb() {
  if (!db) {
    console.warn("Database is not initialized");
    return;
  }

  const transaction = db.transaction(["events"], "readonly");
  const store = transaction.objectStore("events");
  const request = store.getAll();

  request.onsuccess = function () {
    const events = request.result;
    console.log("Events from IndexedDB:", events);
    document.getElementById('upcoming_events_content').innerHTML = renderEventList(events);
  };

  request.onerror = function () {
    console.error("Error fetching events from IndexedDB:", request.error);
  };
}

async function syncEventsWithServer() {
  if (!db) {
    console.warn("Database is not initialized");
    return;
  }

  const transaction = db.transaction(["events"], "readonly");
  const store = transaction.objectStore("events");
  const request = store.getAll();

  request.onsuccess = async function () {
    const events = request.result;
    const unsyncedEvents = events.filter(event => !event.synced);

    if (unsyncedEvents.length > 0) {
      displayMessage('Syncing unsynced events with the server...', 'synced');
    }

    for (let event of unsyncedEvents) {
      try {
        const response = await gapi.client.calendar.events.insert({
          'calendarId': 'primary',
          'resource': event
        });
        console.log('Event synced:', response);

        event.synced = true;
        await updateEventInDb(event);
      } catch (error) {
        console.error('Error syncing event:', error);
        displayMessage('Error syncing event: ' + error.message, 'offline');
      }
    }

    if (unsyncedEvents.length > 0) {
      displayMessage('All unsynced events have been synced. Please, click on Refresh button to see all events.', 'synced');
    }
  };

  request.onerror = function () {
    console.error("Error fetching events from IndexedDB:", request.error);
  };
}

async function updateEventInDb(event) {
  const transaction = db.transaction(["events"], "readwrite");
  const store = transaction.objectStore("events");
  store.put(event);
}

function checkAndSyncEvents() {
  if (navigator.onLine) {
    syncEventsWithServer();
  } else {
    console.log("Currently offline. Events will sync when online.");
  }
}

function displayMessage(message, messageType) {
  const messageDiv = document.getElementById('message_div');
  messageDiv.innerText = message;
  messageDiv.className = messageType;
  messageDiv.style.display = 'block';
}

function clearMessage() {
  const messageDiv = document.getElementById('message_div');
  messageDiv.innerText = '';
  messageDiv.style.display = 'none';
}

setInterval(checkAndSyncEvents, 30000);