<script setup>
/* Global declarations block */
//https://vuejs.org/guide/introduction.html
import { ref, onMounted, computed, watch } from 'vue';
import Swal from 'sweetalert2'



//define indexedDB structure
const DB_NAME = 'todoAppDB';
const TODO_STORE_NAME = 'todos';
const NAME_STORE_NAME = 'name';

//define db connector variable
let db;

//instantiate string and object representations of internal variables
const todos = ref([]);
const name = ref('');

const input_content = ref('');
const input_category = ref(null);
const input_workstation = ref(null);
const input_date = ref('');

const sortOption = ref('date'); // Default to sorting by date

//define API variables 
const CLIENT_ID = '890652597948-rbcfnkq9c4sm0a21lduqghfv50oa7ae5.apps.googleusercontent.com';
const API_KEY = 'AIzaSyCG0ZgwiC6kIuuzbBArtE9DH1eW98AnGm8';
const DISCOVERY_DOC = 'https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest';
//take note that this scope is considered "sensitive" for the purposes of google API handling
const SCOPES = 'https://www.googleapis.com/auth/calendar';

let tokenClient;
let gapiInited = false;
let gisInited = false;

/* onMounted runs after initial DOM rendering
  loads stored data and prepares google APIs for usage
*/
onMounted(async () => {
  let gapiScript = document.createElement('script')
  gapiScript.defer = true
  gapiScript.async = true
  gapiScript.onreadystatechange = gapiScript.onload = function () {
    const interval = setInterval(function () {
      if (!gapiScript.readyState || /loaded|complete/.test(gapiScript.readyState)) {
        clearInterval(interval)
        if (window.gapi) {
          gapiLoaded()
        } else {
          console.log('Failed to load gapi')
        }
      }
    }, 100)
  }
  gapiScript.src = 'https://apis.google.com/js/api.js'
  document.head.appendChild(gapiScript)

  let gisScript = document.createElement('script')
  gisScript.defer = true
  gisScript.async = true
  gisScript.onreadystatechange = gisScript.onload = function () {
    const interval = setInterval(function () {
      if (!gisScript.readyState || /loaded|complete/.test(gisScript.readyState)) {
        clearInterval(interval)
        if (window.google && window.google.accounts) {
          gisLoaded()
        } else {
          console.log('Failed to load gis')
        }
      }
    }, 100)
  }
  gisScript.src = 'https://accounts.google.com/gsi/client'
  document.head.appendChild(gisScript)

  name.value = localStorage.getItem('name') || '';

  // Open IndexedDB
  db = await openIndexedDB();

  // Load todos from IndexedDB via auxiliary functions
  const todosFromDB = await getAllFromIndexedDB(TODO_STORE_NAME);
  const savedNameDB = await getSingleFromIndexedDB(NAME_STORE_NAME);
  todos.value = todosFromDB || [];
  if (savedNameDB === null) {
    return;
  }
  name.value = savedNameDB.name || '';

});

/* 
  Google APIs handling block.
  Take note that this code is (together with parts of onMounted function)
  build using the official google refernce and adapting it for usage in Vue

  https://developers.google.com/calendar/api/quickstart/js
  https://stackoverflow.com/questions/76337091/how-to-use-google-calendar-api-in-vue3-application 
*/

function gapiLoaded() {
  window.gapi.load('client', initializeGapiClient);
}

async function initializeGapiClient() {
  await window.gapi.client.init({
    apiKey: API_KEY,
    discoveryDocs: [DISCOVERY_DOC],
  });
  gapiInited = true;
  maybeEnableButtons();
}

function gisLoaded() {
  console.log('gisLoaded')
  tokenClient = window.google.accounts.oauth2.initTokenClient({
    client_id: CLIENT_ID,
    scope: SCOPES,
    callback: '',
  });
  gisInited = true;
  maybeEnableButtons();
}

function maybeEnableButtons() {
  if (gapiInited && gisInited) {
    console.log('GAPI initialised')
  }
}

function handleAuthClick() {
  if (gapiInited && gisInited) {
    tokenClient.callback = async (resp) => {
      if (resp.error !== undefined) {
        throw (resp);
      }
      await listUpcomingEvents();
      Swal.fire({
        icon: 'success',
        text: 'Login successful!'
      })
    };

    if (window.gapi.client.getToken() === null) {
      tokenClient.requestAccessToken({ prompt: 'consent' });
    } else {
      tokenClient.requestAccessToken({ prompt: '' });
    }
  }
}

function handleSignoutClick() {
  const token = window.gapi.client.getToken();
  if (token !== null) {
    window.google.accounts.oauth2.revoke(token.access_token);
    window.gapi.client.setToken('');
    Swal.fire({
      icon: 'info',
      text: 'Disconnected from Google Account'
    })

    return;
  }
  Swal.fire({
    icon: 'warning',
    text: 'No one is logged in!'
  })
}

//take note that this function is called after successful login
//logs (un)successful logins and lists incoming events as per calendar
// of the user
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
    response = await window.gapi.client.calendar.events.list(request);
  } catch (err) {
    console.log('GAPI error:' + err.message)
    return;
  }

  const events = response.result.items;
  if (!events || events.length == 0) {
    console.log('GAPI: No events found.')
    return;
  }
  const output = events.reduce(
    (str, event) => `${str}${event.summary} (${event.start.dateTime || event.start.date})\n`,
    'Events:\n');
  console.log('GAPI: ' + output)
}

/* Application native code section */
// Updated sortedTodos computed property to use the selected sort option
// Uses compartmentalised sorting helper functions for the options given
const sortedTodos = computed(() => {
  if (sortOption.value === 'date') {
    return todos_asc.value; // Sort by date
  } else if (sortOption.value === 'workstation') {
    return todosByWorkstation.value; // Sort by workstation
  } else if (sortOption.value === 'category') {
    return todosByCategory.value; // Sort by category
  } else if (sortOption.value === 'due') {
    return todosByDueDate.value; // Sort by due date
  } else if (sortOption.value === 'done') {
    return todosByDone.value; // Sort by done attribute
  }
});

//default sort function, sorts ascending by date of creation
const todos_asc = computed(() =>
  todos.value.sort((a, b) => {
    return new Date(b.createdAt) - new Date(a.createdAt);
    // return b.createdAt - a.createdAt;
  })
);


// Auxiliary function to sort by workstation
const todosByWorkstation = computed(() =>
  todos.value.slice().sort((a, b) => {
    return a.workstation.localeCompare(b.workstation);
  })
);

// Auxiliary function to sort by category
const todosByCategory = computed(() =>
  todos.value.slice().sort((a, b) => {
    return a.category.localeCompare(b.category);
  })
);

// Auxiliary function to sort by due date
const todosByDueDate = computed(() =>
  todos.value.slice().sort((a, b) => {
    return new Date(a.due_date) - new Date(b.due_date);
  })
);

// Auxiliary function to sort by done attribute
const todosByDone = computed(() =>
  todos.value.slice().sort((a, b) => {
    return a.done - b.done;
  })
);

//adds todos to the indexedDB and the list
//performs validation against empty fields 
const addTodo = async () => {

  if (input_content.value.trim() === '' || input_content.value === null) {
    Swal.fire({
      icon: 'error',
      text: 'Please fill in the content of the todo (What needs to get done?)'
    });
    return;
  }


  if (input_workstation.value === null || input_category === null) {
    Swal.fire({
      icon: 'error',
      text: 'Please fill in the category and workstation of the todo.'
    });
    return;
  }

  if (input_date.value === '') {
    Swal.fire({
      icon: 'error',
      text: 'Please fill in the Due Date of the todo.'
    });
    return;
  }


  const todo = {
    content: input_content.value.trim(),
    category: input_category.value,
    workstation: input_workstation.value,
    due_date: input_date.value,
    done: false,
    createdAt: new Date().toISOString()
  };

  await addToIndexedDB(TODO_STORE_NAME, todo);

  todos.value.push(todo);

  //clear inputs in between additions
  input_content.value = '';
  input_category.value = null;
  input_workstation.value = null;
  input_date.value = '';
};

//auxiliary function
//sets timeout to prevent unreasonable read/write operations
/*KNOWN ISSUE: presumably due to how todos are handled as separate objects this might prevent deletion of objects 
when rapid clicking several delete buttons in row, possible solution is to shorten the debounce timers if proven problematic */
const debounce = (func, wait) => {
  let timeout;
  return function () {
    const context = this;
    const args = arguments;
    const later = function () {
      timeout = null;
      func.apply(context, args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
};

//adds watches to the todo (and name) objects, this ensures that editing the values 
//within the confines of the aplication maintains the data consistently up to date
//take note that watch is the default Vue implementation
watch(todos, (newVal) => {
  // Use a debounce function to prevent multiple rapid writes to IndexedDB
  debounce(() => {
    updateIndexedDB(TODO_STORE_NAME, newVal);
  }, 1000)();
}, { deep: true });

watch(name, (newVal) => {
  debounce(() => {
    updateNameIDB(NAME_STORE_NAME, newVal)
  }, 1000)();
}, { deep: true });

const removeTodo = async (todo) => {
  await removeFromIndexedDB(TODO_STORE_NAME, todo.createdAt);
  todos.value = todos.value.filter((t) => t !== todo);
};

const addToIndexedDB = async (storeName, data) => {
  const transaction = db.transaction(storeName, 'readwrite');
  const store = transaction.objectStore(storeName);
  await store.add(data);
};

const removeFromIndexedDB = async (storeName, key) => {
  const transaction = db.transaction(storeName, 'readwrite');
  const store = transaction.objectStore(storeName);
  await store.delete(key);
};

/* Handles the "creation" of DB objects */
const openIndexedDB = async () => {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, 1);

    request.onupgradeneeded = (event) => {
      const db = event.target.result;

      if (!db.objectStoreNames.contains(TODO_STORE_NAME)) {
        db.createObjectStore(TODO_STORE_NAME, { keyPath: 'createdAt' });
      }

      if (!db.objectStoreNames.contains(NAME_STORE_NAME)) {
        db.createObjectStore(NAME_STORE_NAME, { keyPath: 'id', autoIncrement: true });
      }
    };

    request.onsuccess = () => {
      resolve(request.result);
    };

    request.onerror = (event) => {
      reject(event.target.error);
    };
  });
};

/* Used for accessing indexedDB stores organized into objects (individual todos in this case) */
const getAllFromIndexedDB = async (storeName) => {
  return new Promise((resolve, reject) => {
    const transaction = db.transaction(storeName, 'readonly');
    const store = transaction.objectStore(storeName);

    const request = store.getAll();

    request.onsuccess = () => {
      resolve(request.result);
    };

    request.onerror = (event) => {
      reject(event.target.error);
    };
  });
};

/* Can be used for acessing a single entry in an indexedDB (greeting name in this case) */
const getSingleFromIndexedDB = async (storeName) => {
  return new Promise((resolve, reject) => {
    const transaction = db.transaction(storeName, 'readonly');
    const store = transaction.objectStore(storeName);

    const request = store.getAll();

    request.onsuccess = () => {
      const result = request.result;
      if (result && result.length > 0) {
        resolve(result[0]);
      } else {
        resolve(null);
      }
    };

    request.onerror = (event) => {
      reject(event.target.error);
    };
  });
}
// called from the watch functions to update data in indexedDB
const updateNameIDB = async (storeName, data) => {
  const transaction = db.transaction(storeName, 'readwrite');
  const store = transaction.objectStore(storeName);

  // Clear existing data
  const clearRequest = store.clear();

  const parsedNameObject = {
    updatedAt: new Date().getTime(),
    name: data
  }

  clearRequest.onsuccess = async () => {

    await addToIndexedDB(storeName, parsedNameObject);
  };
};
// called from the watch functions to update data in indexedDB
const updateIndexedDB = async (storeName, data) => {
  const transaction = db.transaction(storeName, 'readwrite');
  const store = transaction.objectStore(storeName);

  for (const item of data) {
    // Get the existing item from the database
    const getRequest = store.get(item.createdAt);

    getRequest.onsuccess = async () => {
      const existingItem = getRequest.result;

      // Update the existing item with the new values
      const updateRequest = store.put({
        ...existingItem,
        ...item,
      });

      updateRequest.onerror = (event) => {
        console.error('Error updating item in IndexedDB:', event.target.error);
      };
    };

    getRequest.onerror = (event) => {
      console.error('Error retrieving item from IndexedDB:', event.target.error);
    };
  }
};

/* Adds whatever is the current representation of the todoitem to
the primary calender of the logged in user. Take note that this throws 401 on attempt to 
add something without login, 400 in poorly parsed data and 200 on success
Furthermore, since we work with simple date representation in the code, all
events are created as "whole date events" (otherwise it is required to pass in
datetime parameters for both start and stop dates)

https://developers.google.com/calendar/api/v3/reference/events/insert
*/
const passToGc = async (todo) => {

  var event = {
    'summary': todo.content,
    'description': todo.category + '\n requires:' + todo.workstation,
    start: {
      date: todo.due_date,
      timeZone: 'UTC',
    },
    end: {
      date: todo.due_date,
      timeZone: 'UTC',
    }
  }

  try {

    // formerly var
    const request = gapi.client.calendar.events.insert({
      'calendarId': 'primary',
      'resource': event
    });

    const response = await request;

    console.log('Event added to Google Calendar:', response);

    Swal.fire({
      icon: 'success',
      text: 'Event added to Google Calendar'
    })
  } catch (error) {
    console.error('Error adding event to Google Calendar:', error);
    Swal.fire({
      icon: 'error',
      text: 'Error adding event to Google Calendar'
    })
  }
};

</script>

<template>
  <main class="app">
    <section class="greeting">
      <div class="greeting-message">
        <h2 class="title">
          Hello there, <input type="text" placeholder="Name here" v-model="name" />
        </h2>
      </div>
      <div class="greeting-buttons">
        <button @click="handleAuthClick" class="button-login">Login into Google</button>
        <button @click="handleSignoutClick" class="button-logout">Logout</button>
      </div>
    </section>

    <div class="main-wrapper">
      <section class="create-todo column-form">
        <h3>Create a todo</h3>
        <form @submit.prevent="addTodo">
          <h4>What needs to get done?</h4>
          <input type="text" placeholder="eg. shoot a hole in the surface of mars" v-model="input_content">
          <h4>Pick a category</h4>
          <div class="options">
            <label>
              <input type="radio" name="category" id="category1" value="Work" v-model="input_category" />
              <span class="bubble primary"></span>
              <div>Work</div>
            </label>
            <label>
              <input type="radio" name="category" id="category1" value="School" v-model="input_category" />
              <span class="bubble secondary"></span>
              <div>School</div>
            </label>
            <label>
              <input type="radio" name="category" id="category1" value="Personal" v-model="input_category" />
              <span class="bubble auxiliary"></span>
              <div>Personal</div>
            </label>
          </div>
          <div class="create-todo-row">
            <div class="workstation">
              <h4> Which workstation is required for the task?</h4>
              <select class="dropdown-selector" v-model="input_workstation">
                <option disabled selected value="">Please select one workstation</option>
                <option>None</option>
                <option>Pen and Paper</option>
                <option>Laptop</option>
                <option>Desktop</option>
              </select>
            </div>
            <div class="duedate">
              <h4> What is the due date of the task?</h4>
              <div class="datepicker-wrapper">
                <input type="date" v-model="input_date" class="datepicker">
              </div>
            </div>
          </div>
          <input type="submit" value="Add todo">
        </form>
      </section>

      <section class="todo-list column-content">
        <h3> TODO LIST</h3>
        <label>
          Sort by:
          <select v-model="sortOption" class="dropdown-selector">
            <option value="date">Date Created</option>
            <option value="workstation">Workstation</option>
            <option value="category">Category</option>
            <option value="due">Due Date</option>
            <option value="done">Done</option>
          </select>
        </label>
        <div class="column-content-todos">

          <div v-for="todo in sortedTodos" :class="`todo-item ${todo.done && 'done'}`">
            <label>
              <input type="checkbox" v-model="todo.done" />
              <span :class="`bubble ${todo.category}`"></span>
            </label>
            <div class="todo-content">
              <input type="text" v-model="todo.content">
              <select v-model="todo.category" class="todo-item-selector">
                <option disabled selected value="">{{ todo.category }}</option>
                <option>Work</option>
                <option>School</option>
                <option>Personal</option>
              </select>
              <select v-model="todo.workstation" class="todo-item-selector">
                <option disabled selected value="">{{ todo.workstation }}</option>
                <option>None</option>
                <option>Pen and Paper</option>
                <option>Laptop</option>
                <option>Desktop</option>
              </select>
              <input type="date" v-model="todo.due_date" class="dateswapper">
            </div>
            <div class="actions">
              <button class="button-calendar-sync" @click="passToGc(todo)">Sent to GC</button>
              <button class="button-delete" @click="removeTodo(todo)">DELETE</button>
            </div>
          </div>

        </div>
      </section>

    </div>

  </main>
</template>


