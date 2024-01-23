

/* ------------------------------- DATE -------------------------------------------*/

function updateDate() {
    const currentDate = new Date();
    const currentDateTime = currentDate.toLocaleString();
    document.querySelector('#date').textContent = currentDateTime;
}
setInterval(updateDate, 1000);

/*------------------------------------ SPINNER --------------------------------------*/

window.addEventListener("load", () => {
    const loader = document.querySelector(".loader");

    loader.classList.add("loader-hidden");

    loader.addEventListener("transitionend", () => {
        document.body.removeChild("loader");
    })
})

/*------------------------------------- TASK LIST ----------------------------------------------*/

window.addEventListener('load', () => {
	const taskForm = document.querySelector("#tasks-form");
	const taskInput = document.querySelector("#tasks-input");
	const tasksElement = document.querySelector("#tasks");

	taskForm.addEventListener('submit', (e) => {
		e.preventDefault();

		const task = taskInput.value.trim().toUpperCase();
		if (task === '') {
			return false
		}

		const taskElement = document.createElement('div');
		taskElement.classList.add('task');

		const taskContent = document.createElement('div');
		taskContent.classList.add('task-content');

		taskElement.appendChild(taskContent);

		const inputElement = document.createElement('input');
		inputElement.classList.add('text');
		inputElement.type = 'text';
		inputElement.value = task;
		inputElement.setAttribute('readonly', 'readonly');
		inputElement.setAttribute('size', '50');

		taskContent.appendChild(inputElement);

		const buttonsElement = document.createElement('div');
		buttonsElement.classList.add('buttons');
		
		const editButton = document.createElement('button');
		editButton.classList.add('edit-button');
		editButton.innerText = 'Edit';

		const removeButton = document.createElement('button');
		removeButton.classList.add('remove-button');
		removeButton.innerText = 'Remove';

		buttonsElement.appendChild(editButton);
		buttonsElement.appendChild(removeButton);

		taskElement.appendChild(buttonsElement);

		tasksElement.appendChild(taskElement);

		taskInput.value = '';

		editButton.addEventListener('click', (e) => {
			if (editButton.innerText.toLowerCase() == "edit") {
				editButton.innerText = "Save";
				inputElement.removeAttribute("readonly");
				inputElement.focus();
			} else {
				editButton.innerText = "Edit";
				inputElement.setAttribute("readonly", "readonly");
			}
		});

		removeButton.addEventListener('click', (e) => {
			tasksElement.removeChild(taskElement);
		});
	});
});

/* ---------------------------------- geolocation ------------------------------------- */

if ('geolocation' in navigator) {
    navigator.geolocation.getCurrentPosition((position) => {
        console.log(position);
    });
} else {
    console.log('geolocation is not available');
}

/* ----------------------------- AJAX ------------------------------------------- */ 
/* 
.___ = function() {
	.append();
	$.ajax({
	  url: url,
	  data: {
	  },
	}).done(function() {
	  });
	  .append(); 
*/

/* ============================== CALENDAR API ======================================*/


/* =================================== google ==================== 
const CLIENT_ID = '592978563326-1lb16k4lf5bd1c3rdecbnfg866pflcvt.apps.googleusercontent.com';
const API_KEY = 'AIzaSyDMrS6TtnTMpEpr7rr4gnNV54DNui7lIEw';
const DISCOVERY_DOCS = ["https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest"];
const SCOPES = "https://www.googleapis.com/auth/calendar.readonly";
const authorizeButton = document.querySelector('#signIn');

function handleClientLoad() {
    gapi.load('client:auth2', initClient);
  }
  
  function initClient() {
    gapi.client.init({
      apiKey: API_KEY,
      clientId: CLIENT_ID,
      discoveryDocs: DISCOVERY_DOCS,
      scope: SCOPES
    }).then(function () {

      gapi.auth2.getAuthInstance().isSignedIn.listen(updateSigninStatus);
      updateSigninStatus(gapi.auth2.getAuthInstance().isSignedIn.get());
      authorizeButton.addEventListener('click', handleSignInClick);
    }).catch(function(error) {
      console.error('Client initialization error:', error);
    });
  }
  
  function updateSigninStatus(isSignedIn) {
    if (isSignedIn) {
      authorizeButton.style.display = 'none';
      listUpcomingEvents();
    } else {
      authorizeButton.style.display = 'block';
    }
  }
  
  function handleSignInClick() {
    const authInstance = gapi.auth2.getAuthInstance();
    if (authInstance) {
      authInstance.signIn().then(() => {
        listUpcomingEvents();
      });
    } else {
      console.error('Auth2 client is not initialized correctly.');
    }
  }
  
  function handleSignOutClick() {
    gapi.auth2.getAuthInstance().signOut();
  }
  
  function authorizeAndLoadCalendar() {
    const authInstance = gapi.auth2.getAuthInstance();
    if (authInstance) {
      authInstance.signIn().then(() => {
        listUpcomingEvents();
      });
    } else {
      console.error('Auth2 client is not initialized correctly.');
    }
  }
  
  function listUpcomingEvents() {
    gapi.client.calendar.events.list({
      'calendarId': 'primary',
      'timeMin': (new Date()).toISOString(),
      'showDeleted': false,
      'singleEvents': true,
      'maxResults': 10,
      'orderBy': 'startTime'
    }).then(function (response) {
      const events = response.result.items;
      const eventsContainer = document.getElementById('events');
		
      if (events.length > 0) {
        eventsContainer.innerHTML = '<h2>Upcoming events:</h2>';
        for (const event of events) {
          const when = event.start.dateTime || event.start.date;
          eventsContainer.innerHTML += `<div>${event.summary} - ${when}</div>`;
        }
      } else {
        eventsContainer.innerHTML = 'No upcoming events found.';
      }
    });
  }
  eventsContainer.appendChild(events);

  

  document.addEventListener('DOMContentLoaded', handleClientLoad);

  app.use((req, res, next) => {
    res.setHeader('Cross-Origin-Opener-Policy', 'same-origin');
    next();
  });
  */