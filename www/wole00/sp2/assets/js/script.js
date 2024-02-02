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
            let firstLetter = searchInput.slice(0, 1).toUpperCase()
            let rest = searchInput.slice(1).toLowerCase()
            searchInput = firstLetter + rest;

            if (searchInput.length < 50 && /^[\p{L} ]+$/u.test(searchInput)) {
                loader.show();
                App.fetchDateByName(searchInput)
                    .then((resp) => {
                        loader.hide();
                        searchResult.innerHTML = "<span class='purple' id='nameSpan'>" + searchInput + "</span> má svátek <span class='purple' id='dateSpan'>" + App.getFormattedDate(resp[0].date) + "</span>";
                        addToFav.style.display = "block";
                        App.checkIfFav()
                    })
                    .catch((error) => {
                        loader.hide();

                        searchResult.innerHTML = "<span class='red'> Špatně zadané jméno!</span>";
                        addToFav.style.display = "none";

                    });
            } else {
                searchResult.innerHTML = "<span class='red'> Špatně zadané jméno!</span>";
                addToFav.style.display = "none";
            }


        } else if (searchType === "by-date") {//search by date
            loader.show();
            const datePicker = new Date(document.getElementById("datePicker").value);
            const day = String(datePicker.getDate()).padStart(2, '0');
            const month = String(datePicker.getMonth() + 1).padStart(2, '0');
            const pickedDate = day + month;

            App.fetchNameByDate(pickedDate)
                .then((resp) => {
                    loader.hide();
                    searchResult.innerHTML = "<span class='purple' id='dateSpan'>" + App.getFormattedDate(pickedDate) + "</span> má svátek <span class='purple' id='nameSpan'>" + resp[0].name + "</span>";
                    addToFav.style.display = "block";
                    App.checkIfFav()
                })
                .catch((error) => {
                    loader.hide();
                    searchResult.innerHTML = "<span class='red'> Špatně zadané datum!</span>";
                    addToFav.style.display = "none";

                });
        }

    },

    getTodaysDate: (alter) => { //returns todays date in DDMM format
        const today = new Date();
        today.setDate(today.getDate() + alter);
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

                let button = document.createElement("button");
                button.classList.add("buttonUnderlined")
                button.textContent = "Odebrat";
                button.addEventListener("click", function (event) {
                    event.preventDefault();
                    App.removeFav(key);
                    this.parentNode.remove();
                });

                // Append the span elements and anchor element to the div
                div.appendChild(spanValue);
                div.appendChild(spanKey);
                div.appendChild(button);

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
const searchTypeEl = document.getElementById("searchType")
searchTypeEl.addEventListener('change', function () {
    App.handleSearchTypeChange();
});
document.getElementById("searchForm").addEventListener("submit", (event) => {
    event.preventDefault();
    App.handleSubmit();
});


const addToFav = document.getElementById("addToFav");
addToFav.addEventListener("click", function (event) {
    event.preventDefault();
    App.addToFav();
});

let loader = $('#loader');
loader.hide();
const todaysDateSpan = document.getElementById("todaysDate"); // variable for todays date
const todaysDate = App.getTodaysDate(0); //get todays date in DDMM format
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


const yesterdaysNameSpan = document.getElementById("yesterdaysName"); // variable for yesterdays name span
const yesterdaysDate = App.getTodaysDate(-1);
App.fetchNameByDate(yesterdaysDate)
    .then((yesterdaysName) => {
        yesterdaysNameSpan.textContent = yesterdaysName[0].name
    })
    .catch((error) => {
        console.error('Error:', error);
    });

const tomorrowsNameSpan = document.getElementById("tomorrowsName"); // variable for yesterdays name span
const tomorrowsDate = App.getTodaysDate(1);
App.fetchNameByDate(tomorrowsDate)
    .then((tomorrowsName) => {
        tomorrowsNameSpan.textContent = tomorrowsName[0].name
    })
    .catch((error) => {
        console.error('Error:', error);
    });

let elements = document.getElementsByClassName("dayButton");
for (let element of elements) {
    let toInt = parseInt(element.value, 10);

    let desiredDate = App.getTodaysDate(toInt)

    let formattedDesiredDate = App.getFormattedDate(desiredDate);
    element.innerText += " " + formattedDesiredDate;

    element.addEventListener("click", (event) => {
        event.preventDefault();
        /*let toInt = parseInt(element.value, 10);

        let desiredDate = App.getTodaysDate(toInt)*/

        App.fetchNameByDate(desiredDate)
            .then((resp) => {
                loader.hide();
                searchResult.innerHTML = "<span class='purple' id='dateSpan'>" + App.getFormattedDate(desiredDate) + "</span> má svátek <span class='purple' id='nameSpan'>" + resp[0].name + "</span>";
                addToFav.style.display = "block";
                App.checkIfFav()
            })
            .catch((error) => {
                loader.hide();
                searchResult.innerHTML = "<span class='red'> Špatně zadané datum!</span>";
                addToFav.style.display = "none";

            });
    });
}




//Startup END

