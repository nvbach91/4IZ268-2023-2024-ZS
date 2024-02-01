const App = {
    handleSearchTypeChange: () => { // triggered by the select input in html form, displays the date input instead of text input and vice versa

        let searchType = searchTypeEl.value;
        let searchInputContainer = document.getElementById("searchInputContainer");
        let datePickerContainer = document.getElementById("datePickerContainer");

        let searchInput = document.getElementById("searchInput");
        let datePicker = document.getElementById("datePicker");

        if (searchType === "by-name") {
            searchInputContainer.style.display = "block";
            datePickerContainer.style.display = "none";
            datePicker.removeAttribute('required');
            searchInput.setAttribute('required', '');

        } else if (searchType === "by-date") {
            searchInputContainer.style.display = "none";
            datePickerContainer.style.display = "block";
            datePicker.setAttribute('required', '');
            searchInput.removeAttribute('required');
        }
    },

    handleSubmit: () => { //handle the html form
        let searchType = searchTypeEl.value;

        if (searchType === "by-name") { //search by name
            let searchInput = document.getElementById("searchInput").value.trim();

            if (searchInput.length < 50 && /^[\p{L} ]+$/u.test(searchInput)) {
                App.fetchDateByName(searchInput)
                    .then((resp) => {
                        searchResult.innerHTML = "<span class='purple' id='nameSpan'>" + searchInput + "</span> má svátek <span class='purple' id='dateSpan'>" + App.getFormattedDate(resp[0].date) + "</span>";
                        addToFav.style.display = "block";
                        App.checkIfFav()
                    })
                    .catch((error) => {
                        searchResult.innerHTML = "<span class='red'> Špatně zadané jméno!</span>";
                        addToFav.style.display = "none";

                    });
            } else {
                searchResult.innerHTML = "<span class='red'> Špatně zadané jméno!</span>";
                addToFav.style.display = "none";
            }


        } else if (searchType === "by-date") {//search by date
            const datePicker = new Date(document.getElementById("datePicker").value);
            const day = String(datePicker.getDate()).padStart(2, '0');
            const month = String(datePicker.getMonth() + 1).padStart(2, '0');
            const pickedDate = day + month;

            App.fetchNameByDate(pickedDate)
                .then((resp) => {
                    searchResult.innerHTML = "<span class='purple' id='dateSpan'>" + App.getFormattedDate(pickedDate) + "</span> má svátek <span class='purple' id='nameSpan'>" + resp[0].name + "</span>";
                    addToFav.style.display = "block";
                    App.checkIfFav()
                })
                .catch((error) => {
                    searchResult.innerHTML = "<span class='red'> Špatně zadané datum!</span>";
                    addToFav.style.display = "none";

                });
        }

    },

    getTodaysDate: () => { //returns todays date in DDMM format
        const today = new Date();
        const day = String(today.getDate()).padStart(2, '0');
        const month = String(today.getMonth() + 1).padStart(2, '0'); // months are zero based; january = 0
        return day + month;
    },

    fetchNameByDate: (date) => { //returns promise with a response containing the name, takes date in DDMM format as argument
        return new Promise((resolve, reject) => {
            $.ajax({
                method: 'GET',
                url: 'https://svatky.adresa.info/json?date=' + date,
                success: (resp) => {
                    resolve(resp);
                },
                error: (err) => {
                    reject(err);
                },
            });
        });
    },
    fetchDateByName: (name) => { //returns promise with a response containing the date, takes name as argument
        return new Promise((resolve, reject) => {
            $.ajax({
                method: 'GET',
                url: 'https://svatky.adresa.info/json?name=' + name,
                success: (resp) => {
                    resolve(resp);
                },
                error: (err) => {
                    reject(err);
                },
            });
        });
    },

    getFormattedDate: (date) => { // changes the date format from DDMM to "(D)D. (M)M." example: 0101 = 1. 1.
        if (date.length !== 4) {
            console.error("Invalid date format.");
            return null;
        }

        const day = date.substring(0, 2).replace(/^0/, '');
        const month = date.substring(2).replace(/^0/, '');

        const formattedDay = day + ". " + month + ".";

        return formattedDay
    },
    addToFav: () => { //adds name and date to localstorage, if not already present
        const currentValue = localStorage.getItem(document.getElementById("nameSpan").textContent);
        if (currentValue === null) {
            // If not present, add  to localStorage
            localStorage.setItem(document.getElementById("nameSpan").textContent, document.getElementById("dateSpan").textContent);
            App.loadFavorites();
            App.checkIfFav();
        } else {

            // If present (handled by handleSubmit)
        }
    },
    loadFavorites: (firstTime) => { //load all favorites from local storage

        if (localStorage.length == 0 && firstTime) { // Adds the saint Valentine's day to favorites automatically on startup if storage is empty
            localStorage.setItem("Valentýn", "14. 2.");
        }

        let favDiv = document.getElementById("favDiv");
        let fragment = document.createDocumentFragment(); //fragment to store divs created from looping localstorage

        favDiv.innerHTML = ""
        for (const key in localStorage) {
            if (localStorage.hasOwnProperty(key)) {

                let div = document.createElement("div");
                div.className = "row";

                let spanValue = document.createElement("span");
                spanValue.textContent = localStorage.getItem(key);

                let spanKey = document.createElement("span");
                spanKey.textContent = key;

                let anchor = document.createElement("a");
                anchor.href = "";
                anchor.textContent = "Odebrat";
                anchor.addEventListener("click", function (event) {
                    event.preventDefault();
                    App.removeFav(key);
                    this.parentNode.remove();
                });

                // Append the span elements and anchor element to the div
                div.appendChild(spanValue);
                div.appendChild(spanKey);
                div.appendChild(anchor);

                // Append the div to the document body or any other container element
                fragment.appendChild(div);
            }
        }
        favDiv.appendChild(fragment);

    },
    removeFav: (key) => { // removes chosen name from favorites
        localStorage.removeItem(key);
        App.loadFavorites();
        App.checkIfFav();

    },
    checkIfFav: () => { //checks if current searched for name is already in favorites, displays/hides the add to favorite button accordingly
        let nameSpan = document.getElementById("nameSpan");
        if (nameSpan) { //checks if there even is an element to check exist to prevent site crash
            if (localStorage.getItem(nameSpan.textContent) !== null) {
                addToFav.style.display = "none";
            } else {
                addToFav.style.display = "block";

            }
        }

    }
}


//Startup START
let searchTypeEl = document.getElementById("searchType")
searchTypeEl.addEventListener('change', function() {
    App.handleSearchTypeChange();
  });
document.getElementById("searchForm").addEventListener("submit", function (event) {
    event.preventDefault();
    App.handleSubmit();
});


let addToFav = document.getElementById("addToFav");
addToFav.addEventListener("click", function (event) {
    event.preventDefault();
    App.addToFav();
});

const todaysDateSpan = document.getElementById("todaysDate"); // variable for todays date
const todaysDate = App.getTodaysDate(); //get todays date in DDMM format
const formattedTodaysDate = App.getFormattedDate(todaysDate); // format date from DDMM to "(D)D. (M)M.""
todaysDateSpan.textContent = formattedTodaysDate;

const todaysNameSpan = document.getElementById("todaysName"); // variable for todays name
const searchResult = document.getElementById("searchResult");

App.fetchNameByDate(todaysDate)
    .then((todaysName) => {
        todaysNameSpan.textContent = todaysName[0].name
    })
    .catch((error) => {
        console.error('Error:', error);
    });


App.loadFavorites(true)

//Startup END

