/* exported gapiLoaded */
/* exported gisLoaded */
/* exported handleAuthClick */
/* exported handleSignoutClick */

// TODO: Set to client ID and API key from the Developer Console
const CLIENT_ID = '28589106437-g75vggvqjrsgr2ts6npautv2d6fi4u52.apps.googleusercontent.com';
const API_KEY = 'AIzaSyBZxFdDfg6U-pEHOVaPiC6K3lAxUo6-Rdo';

// Discovery doc URL for APIs used by the quickstart
const DISCOVERY_DOC = 'https://www.googleapis.com/discovery/v1/apis/tasks/v1/rest';

// Authorization scopes required by the API; multiple scopes can be included, separated by spaces.
const SCOPES = 'https://www.googleapis.com/auth/tasks';

let tokenClient;
let gapiInited = false;
let gisInited = false;

document.getElementById('authorize_button').style.visibility = 'hidden';
document.getElementById('signout_button').style.visibility = 'hidden';

/**
 * Callback after api.js is loaded.
 */
function gapiLoaded() {
    gapi.load('client', initializeGapiClient);
}

/**
 * Callback after the API client is loaded. Loads the
 * discovery doc to initialize the API.
 */
async function initializeGapiClient() {
    await gapi.client.init({
        apiKey: API_KEY,
        discoveryDocs: [DISCOVERY_DOC],
    });
    gapiInited = true;
    maybeEnableButtons();
}

/**
 * Callback after Google Identity Services are loaded.
 */
function gisLoaded() {
    tokenClient = google.accounts.oauth2.initTokenClient({
        client_id: CLIENT_ID,
        scope: SCOPES,
        callback: '', // defined later
    });
    gisInited = true;
    maybeEnableButtons();
}

/**
 * Enables user interaction after all libraries are loaded.
 */
function maybeEnableButtons() {
    if (gapiInited && gisInited) {
        document.getElementById('authorize_button').style.visibility = 'visible';
    }
}

document.getElementById("authorize_button").addEventListener("click", handleAuthClick);
document.getElementById("signout_button").addEventListener("click", handleSignoutClick);
document.getElementById("deleteTaskListButton").addEventListener("click", deleteTaskList);
document.getElementById("newTaskListButton").addEventListener("click", addTaskList);
document.getElementById("addTaskButton").addEventListener("click", addTask);
document.getElementById("deleteTaskButton").addEventListener("click", deleteTask);

/**
 *  Tlacitko prihlaseni
 */
function handleAuthClick() {
    tokenClient.callback = async (resp) => {
        if (resp.error !== undefined) {
            throw (resp);
        }
        document.getElementById('signout_button').style.visibility = 'visible';
        document.getElementById('authorize_button').innerText = 'Refresh';
        loadTaskLists();
    };

    if (gapi.client.getToken() === null) {
        // Prompt the user to select a Google Account and ask for consent to share their data
        // when establishing a new session.
        tokenClient.requestAccessToken({prompt: 'consent'});
    } else {
        // Skip display of account chooser and consent dialog for an existing session.
        tokenClient.requestAccessToken({prompt: ''});
    }
}

/**
 *  Tlacitko odhlaseni
 */
function handleSignoutClick() {
    const token = gapi.client.getToken();
    if (token !== null) {
        google.accounts.oauth2.revoke(token.access_token);
        gapi.client.setToken('');
        document.getElementById('content').innerText = '';
        document.getElementById('authorize_button').innerText = 'Authorize';
        document.getElementById('signout_button').style.visibility = 'hidden';
    }
}

// Vlastni kod aplikace

// Loader 

const loader = document.getElementById('loader')
loader.style.display = 'none';
function showLoader() {
    loader.style.display = 'block';
}
function hideLoader() {
    loader.style.display = 'none';
}

// Pridani noveho seznamu ukolu
function addTaskList() {
    showLoader();
    // Ziskat nazev seznamu z inputu
    var newListName = document.getElementById('newTaskList').value;

    // Kontrola, zda byl zadán název seznamu
    if (!newListName) {
        console.error("List name is not entered.");
        alert("List name is not entered.");
        hideLoader();
        return;
    }

    // Volani funkce pro pridani seznamu ukolu

    newList(newListName);
    hideLoader();
}

function newList(newListName) {
    // Volani API pro vlozeni seznamu ukolu
    return gapi.client.tasks.tasklists.insert({ 
            "title": newListName
    })
    .then(
        function(response) {
            // Zpracovani vysledku
            console.log("New List has been created", response);
        },
        function(err) {
            console.error("List creation error", err);
            alert("List creation error");
        }
    );
}

// Funkce pro zobrazeni seznamu ukolu jako tlacitek
function displayTaskListsAsButtons(taskLists) {
    const taskListSelect = document.getElementById('taskList');
    const taskListsContainer = document.getElementById('taskListsContainer');

    taskListSelect.innerHTML = '';
    taskListsContainer.innerHTML = '';

    if (taskLists && taskLists.length > 0) {
        for (let i = 0; i < taskLists.length; i++) {
            const option = document.createElement('option');
            option.value = taskLists[i].id;
            option.text = taskLists[i].title;
            taskListSelect.add(option);

            const listButton = document.createElement('button');
            listButton.innerText = taskLists[i].title;
            listButton.onclick = () => loadTasks(taskLists[i].id);
            listButton.classList.add('buttonWithPadding'); // Add the class
            taskListsContainer.appendChild(listButton);
            
        }
    }
}

// Funkce pro zobrazeni ukolu jako tlacitek
function displayTasksAsButtons(tasks) {
    const tasksContainer = document.getElementById('tasksContainer');

    tasksContainer.innerHTML = '';

    if (tasks && tasks.length > 0) {
        for (let i = 0; i < tasks.length; i++) {
            const taskButton = document.createElement('button');
            taskButton.innerText = tasks[i].title;
            taskButton.onclick = () => loadTaskDetails(tasks[i].id);
            taskButton.classList.add('buttonWithPadding'); // Add the class
            tasksContainer.appendChild(taskButton);
        }
    }
}

// Funkce nacitajici seznamy ukolu
async function loadTaskLists() {
    try {
        const response = await gapi.client.tasks.tasklists.list({});
        const taskLists = response.result.items;
        displayTaskListsAsButtons(taskLists);
    } catch (err) {
        console.error("Error loading task lists", err);
        alert("Error loading task lists");
    }
}

// Funkce nacitajici jednotlive ukoly
async function loadTasks(taskListId) {
    try {
        const response = await gapi.client.tasks.tasks.list({
            "tasklist": taskListId
        });
        const tasks = response.result.items;
        displayTasksAsButtons(tasks);
    } catch (err) {
        console.error("Error loading tasks", err);
        alert("Error loading tasks");
    }
}

// Funkce nacitajici detaily jednotlivych ukolu
async function loadTaskDetails(taskId) {
    try {
        const response = await gapi.client.tasks.tasks.get({
            "tasklist": document.getElementById('taskList').value,
            "task": taskId
        });

        const taskDetailsContainer = document.getElementById('taskDetailsContainer');
        taskDetailsContainer.innerHTML = '';

        const taskDetails = response.result;
        const titleElement = document.createElement('div');
        titleElement.innerText = `Title: ${taskDetails.title}`;
        taskDetailsContainer.appendChild(titleElement);

        const notesElement = document.createElement('div');
        notesElement.innerText = `Notes: ${taskDetails.notes}`;
        taskDetailsContainer.appendChild(notesElement);

        const dueElement = document.createElement('div');
        dueElement.innerText = `Due: ${taskDetails.due}`;
        taskDetailsContainer.appendChild(dueElement);
    } catch (err) {
        console.error("Error loading task details", err);
        alert("Error loading task details");
    }
}

// Funkce pro odstraneni ukolu
async function deleteTask(taskId) {
    try {
        const response = await gapi.client.tasks.tasks.delete({
            "tasklist": document.getElementById('taskList').value,
            "task": taskId
        });

        loadTasks(document.getElementById('taskList').value);
    } catch (err) {
        alert("Error deleting Task: " + err.body);
        console.error("Error deleting Task", err);
    }
}

// Funkce pro odstraneni seznamu ukolu
function deleteTaskList() {

    var taskListSelect = document.getElementById('taskList');

    var selectedListId = taskListSelect.value;

    // Kontrola, zda byl vybran seznam ukolu
    if (!selectedListId) {
        alert("No task list selected for deletion.");
        return;
    }

    // Zobrazení potvrzovaciho dialogu pro uzivatele
    var userConfirmation = confirm("Do you really want to delete this TaskList?");

    // Pokud uživatel potvrdi, smaz seznam ukolu
    if (userConfirmation) {
        gapi.client.tasks.tasklists.delete({
            "tasklist": selectedListId
        })
        .then(
            function(response) {
                alert("TaskList successfully deleted.");
                console.log("TaskList successfully deleted", response);

                loadTaskLists();
            },
            function(err) {
                alert("Error deleting TaskList: " + err.body);
                console.error("Error deleting TaskList", err);
            }
        );
    }
}

function formatDateToRFC3339(dateString) {
    const date = new Date(dateString);
    return date.toISOString();
}

// Funkce pro pridani ukolu
function addTask() {
    // Ziskani hodnot
    var taskName = document.getElementById('taskName').value;
    var taskDescription = document.getElementById('taskDescription').value;
    var taskDueDate = document.getElementById('taskDueDate').value;
    var taskPrioritySelect = document.getElementById('taskPriority');
    var taskPriority = taskPrioritySelect.options[taskPrioritySelect.selectedIndex].value;
    var taskListSelect = document.getElementById('taskList');
    var selectedListId = taskListSelect.value;
    var taskDueDateFormatted = formatDateToRFC3339(taskDueDate);

    // Kontrola, zda bylo zadano jmeno ukolu
    if (!taskName) {
        alert("Task name cannot be empty.");
        return;
    }

    // Kontrola, zda byl vybrany seznam ukolu
    if (!selectedListId) {
        alert("No task list selected.");
        return;
    }

    // Volani API - kontrola duplikatu
    gapi.client.tasks.tasks.list({
        "tasklist": selectedListId
    })
    .then(function(response) {
        var existingTasks = response.result.items;

        for (var i = 0; i < existingTasks.length; i++) {
            if (existingTasks[i].title === taskName) {
                alert("Task with the same name already exists in the selected list.");
                return;
            }
        }

        var taskDescriptionWithPriority = "Priority: " + taskPriority + "\n\n" + taskDescription;

        // Volani API pro pridani ukolu
        return gapi.client.tasks.tasks.insert({
            "tasklist": selectedListId,
            "resource": {
                "title": taskName,
                "notes": taskDescriptionWithPriority,
                "due": taskDueDateFormatted
            }
        });
    })
    .then(
        function(response) {
            alert("Task successfully added.");
            console.log("Task successfully added", response);
        },
        function(err) {
            alert("Error adding Task: " + err.body);
            console.error("Error adding Task", err);
        }
    );
}