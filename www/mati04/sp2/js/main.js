

const appContainer = $('#app');
const searchContainer = $('#search');
const leftContainer = $('#left_panel')
moment.locale('cs');
const loc = document.location;

// Po načtení stránky odstraní spinner - knihovny se dlouho načítají
$(document).ready(() => {
    hideLoading();
    const currentLang = getCurrentLanguage();
    langButton.text(currentLang);
    startHoliday(loc.search);
});

function notifyMe() {
    if (!("Notification" in window)) {
      // Check if the browser supports notifications
      alert("This browser does not support desktop notification");
    } else if (Notification.permission === "granted") {
      // Check whether notification permissions have already been granted;
      // if so, create a notification
      const notification = new Notification("Hi there!");
      // …
    } else if (Notification.permission !== "denied") {
      // We need to ask the user for permission
      Notification.requestPermission().then((permission) => {
        // If the user accepts, let's create a notification
        if (permission === "granted") {
          const notification = new Notification("Hi there!");
          // …
        }
      });
    }
  
    // At last, if the user has denied notifications, and you
    // want to be respectful there is no need to bother them anymore.
  }
  


//Nastavení tlačítek a vstupu
const spin = $('.spinner');
const calendarContainer = $('<div>').attr('id', 'calendar');
const calendarTable = $('<table>').attr('id', 'calendar-table');
const containerDiv = $('<form>').addClass('center-container');
const input = $('<input>').attr('id', 'name');
const searchButton = $('<button>Hledat</button>').attr('id', 'search-btn');
const langButton = $('<button>').attr('id', 'lang-btn');
const inputDescription = $('<div class = "description">Zadejte jméno nebo datum v těchto možných formátech (DDMM, D/M, D.M)</div>')
containerDiv.append(input, searchButton, langButton);
appContainer.append(calendarContainer, containerDiv, inputDescription);
const monthSelect = $('<select>').attr('id', 'month-select');

//zobrazování spinneru a jeho následné odstranění
const showLoading = () => {
    appContainer.append(spin);
};
const showLoadingLeft = () => {
    leftContainer.append(spin);
}
const showLoadingCalendar = () => {
    calendarContainer.append(spin);
}
const hideLoading = () => {
    spin.remove();
};


//formátování datumu na DDMM kvůli API
const parseAndFormatDate = (inputValue) => {
    const formats = ['DDMM', 'D/M', 'D.M'];
    const cleanedInput = inputValue.replace(/\s/g, '');
    for (const format of formats) {
        const parsedDate = moment(cleanedInput, format, true);
        if (parsedDate.isValid()) {
            return parsedDate.format('DDMM');
        }
    }
    return false;
};

const startHoliday = (date) => {
    const startIndex = date.indexOf('=') + 1;
    const endIndex = date.length;
    const extractedValue = date.substring(startIndex, endIndex);
    const momentDate = parseAndFormatDate(extractedValue);
    if (momentDate) {
        loadHoliday(momentDate);
    }

}

//nastavování select u kalendáře
const months = [
    "Leden",
    "Únor",
    "Březen",
    "Duben",
    "Květen",
    "Červen",
    "Červenec",
    "Srpen",
    "Září",
    "Říjen",
    "Listopad",
    "Prosinec"
];
const optionsMonth = months.map((month, index) => `<option value="${index}">${month}</option>`);
monthSelect.append(optionsMonth.join(''));
calendarContainer.append(monthSelect, calendarTable);

//pokud v localstorage nic není, tak defaultně je český kalendář
const getCurrentLanguage = () => {
    return localStorage.getItem('lang') || 'cz';
};

//darkmode
const options = {
    label: '🌙'
}
const darkmode = new Darkmode(options);
darkmode.showWidget();

//moment.js
const yesterdayDiv = $('<div>').attr('id', 'yesterday');
const todayDiv = $('<div>').attr('id', 'today');
const tomorrowDiv = $('<div>').attr('id', 'tomorrow');
leftContainer.append(tomorrowDiv, todayDiv, yesterdayDiv);
const yesterday = moment().subtract(1, 'days').format('DDMM');
const today = moment().format('DDMM');
const tomorrow = moment().add(1, 'days').format('DDMM');
const formatLeftDate = (date) => moment(date, 'DDMM').format('ll');

//vypsání svátků do levého panelu
const processDate = (date, element) => { // podobnost s isValidDate
    const userUrl = forNameUrl(date);
    showLoadingLeft();
    $.getJSON(userUrl).done((data) => {

        const name = data.map(holiday => holiday.name);
        const formattedDate = formatDate(date);
        element.text(`${formattedDate} - Svátek má ${name.join(' a ')}`);
        hideLoading();
    })

};

const forNameUrl = (dateInput) => {
    const format = parseAndFormatDate(dateInput);
    const lang = getCurrentLanguage();
    const Url = `https://svatky.adresa.info/json?date=${format}&lang=${lang}`;
    return Url;
}

//vyplnění včerejším, dnešním a zítřejším datumem a kdo má v daný den svátek
processDate(tomorrow, tomorrowDiv);
processDate(today, todayDiv);
processDate(yesterday, yesterdayDiv);

//Vracení datumu svátku pro jméno
const renderUser = (user) => {
    const formattedDate = formatDate(user[0].date);
    const userHtml = `
        <div class = "search_find">${formattedDate}
        <button class="remove-button">Odstranit</button>
        </div>
    `;
    searchContainer.empty().append(userHtml);
    searchContainer.on('click', '.remove-button', function () { // musí být function, protože u => nefunguje this
        $(this).closest('.search_find').remove();
    });
};
// Vrácení jména pro datum svátku
const renderDate = (date) => {
    const userNames = date.map(entry => entry.name);
    const userHtml = `<div class="search_find">${userNames.join(', ')}
    <button class="remove-button">Odstranit</button>
    </div>`;
    searchContainer.empty().append(userHtml);
    searchContainer.on('click', '.remove-button', function () { // musí být function, protože u => nefunguje this
        $(this).closest('.search_find').remove();
    });
    if (Notification.permission === "granted"){
    const notification = new Notification(`${userNames.join(', ')}`);
    }
};


//Ochrana vstupu aby se vždy text dal tak že první písmeno bude velké a ostatní malé
const formatInput = (input) => {
    return input.charAt(0).toUpperCase() + input.slice(1).toLowerCase();
};


//formátování datumu svátku ve výstupu
const formatDate = (dateString) => {

    let day;
    if (dateString.charAt(0) === '0') {
        day = dateString.slice(1, 2);
    } else {
        day = dateString.slice(0, 2);
    }
    const month = dateString.slice(2);

    const monthNames = [
        'ledna', 'února', 'března', 'dubna', 'května', 'června',
        'července', 'srpna', 'září', 'října', 'listopadu', 'prosince'
    ];
    const monthName = monthNames[parseInt(month) - 1];
    const formattedDate = `${day}. ${monthName}`;
    return formattedDate;
};

//vyhledávání datumu a podle jména
containerDiv.on('submit', (e) => {
    e.preventDefault();
    const inputValue = input.val().trim();
    if (inputValue === '') {
        searchContainer.empty().append('<div class="search_find">Prázdný vstup</div>');
    }
    else {
        if (isValidDate(inputValue)) {
            const currentLang = getCurrentLanguage();
            const userUrl = forNameUrl(inputValue);
            showLoading();
            $.getJSON(userUrl).done((date) => {
                if ($.isEmptyObject(date)) {
                    handleFailure();
                    hideLoading();
                } else {
                    renderDate(date);
                    hideLoading();
                    const stateObject = {
                        date: inputValue,
                        lang: currentLang
                    };
                    const url = `?date=${inputValue}`;
                    history.pushState(stateObject, "", url);
                }
            }).fail(() => {
                handleFailure();
                hideLoading();
            });
        } else
            if (/\d/.test(inputValue)) {
                alert("Špatné číslo ve vstupu");
            }
            else {
                const searchValue = formatInput(inputValue);
                const currentLang = getCurrentLanguage();
                const userUrl = `https://svatky.adresa.info/json?name=${searchValue}&lang=${currentLang}`;
                showLoading();
                $.getJSON(userUrl).done((user) => {
                    if ($.isEmptyObject(user)) {
                        handleFailure();
                        hideLoading();
                    } else {
                        renderUser(user);
                        hideLoading();
                        const stateObject = {
                            name: searchValue,
                            lang: currentLang
                        };
                        const url = `?name=${searchValue}`;
                        history.pushState(stateObject, "", url);
                    }
                }).fail(() => {
                    handleFailure();
                    hideLoading();
                });
            }
    }
});

//tlačítko na změnu jazyka
langButton.on('click', (e) => {
    e.preventDefault();
    toggleLanguage();
    processDate(tomorrow, tomorrowDiv);
    processDate(today, todayDiv);
    processDate(yesterday, yesterdayDiv);
});

//uložení jazyka do localStorage a změna jazyka
const toggleLanguage = () => {
    const currentLang = getCurrentLanguage();
    const newLang = currentLang === 'sk' ? 'cz' : 'sk';
    localStorage.setItem('lang', newLang);
    langButton.text(newLang);
};

//chyba, když uživatel zadá špatný vstup
const handleFailure = () => {
    searchContainer.empty().append('<div class="search_find">Nenalezeno</div>');
};

// Funkce pro ověření, zda vstupní hodnota je platné datum
const isValidDate = (inputValue) => {
    const formats = ['DDMM', 'D/M', 'D.M'];
    const cleanedInput = inputValue.replace(/\s/g, '');
    for (const format of formats) {
        if (moment(cleanedInput, format, true).isValid()) {
            return true;
        }
    }
    return false;
};


//generování kalendáře
const generateCalendar = (month, year) => {
    calendarTable.empty();
    let firstDay = moment(`${year}-${month}-01`, 'YYYY-MM-DD').day() - 1;
    if (firstDay === -1) //pokud měsíc začíná v neděli tak musíme přičíst 7 dní, aby kalendář začal správně
    {
        firstDay = firstDay + 7;
    }
    else {
        firstDay = firstDay;
    }
    const daysInMonth = moment(`${year}-${month}`, 'YYYY-MM').daysInMonth();
    const daysOfWeek = moment.weekdaysShort();
    const daysOfWeekShift = daysOfWeek.shift();
    daysOfWeek.push(daysOfWeekShift);// abychom začínali pondělkem
    const thead = $('<thead>').appendTo(calendarTable);
    const row = $('<tr>').appendTo(thead);
    const thElements = daysOfWeek.map(day => $('<th>').text(day));
    row.append(...thElements);
    let currentDay = 1;

    const rows = [];
    for (let i = 0; i < 6; i++) {
        const cells = [];
        for (let j = 0; j < 7; j++) {
            if (i === 0 && j < firstDay) {
                cells.push($('<td>'));
            } else if (currentDay <= daysInMonth) {
                const cell = $('<td>').text(currentDay);
                cells.push(cell);
                currentDay++;
            }
        }
        const row = $('<tr>').append(...cells);//přidáváme najednou
        rows.push(row);
    }

    calendarTable.append(...rows);//přidáváme najednou

};

//volání kalendáře
const currentMonth = moment().month() + 1; // měsíce se indexují od 0
const currentYear = moment().year();
//vyběr měsíce
monthSelect.on('click', (e) => {

    e.preventDefault();
    const month = parseInt(currentMonth) + parseInt(monthSelect.val());
    generateCalendar(month, currentYear);
})
generateCalendar(currentMonth, currentYear);//poprvé začínáme v měsíci který reálně teď je

//interaktivita kalendáře
calendarTable.on('click', 'td', function () { //zde musí být function protože jinak by nefungovalo this 
    calendarTable.find('.highlighted').removeClass('highlighted');
    $(this).addClass('highlighted');
    const day = $(this).text();

    if (day !== '') {
        const month = parseInt(currentMonth) + parseInt(monthSelect.val());
        const year = currentYear;
        const formattedDate = moment(`${year}-${month}-${day}`, 'YYYY-MM-DD').format('DDMM');
        loadHoliday(formattedDate);
    }
});
//klikání na dny v kalendáři
const loadHoliday = (date) => {
    const userUrl = forNameUrl(date);

    showLoadingCalendar();
    $.getJSON(userUrl).done((holidays) => {
        hideLoading();
        const holidayNames = holidays.map(entry => entry.name);
        const formatMoment = moment(`${date}`, 'DDMM').format('D.M');
        const stateObject = {
            holiday: holidayNames,
            moment: formatMoment
        };
        const url = `?date=${formatMoment}`;
        history.pushState(stateObject, "", url);
        const existingElement = calendarContainer.find('.search_find');
        existingElement.remove();
        if (holidayNames.length > 1) {
            const calendarClick = $(`<div class = "search_find">Dne ${formatMoment} mají svátek: ${holidayNames.join(', ')}
            <button class="remove-button">Odstranit</button>
            </div>`);
            calendarContainer.append(calendarClick);
        }
        else {
            const calendarClick = $(`<div class = "search_find">Dne ${formatMoment} má svátek: ${holidayNames.join(', ')}
            <button class="remove-button">Odstranit</button>
            </div>`);
            calendarContainer.append(calendarClick);
        }
        calendarContainer.on('click', '.remove-button', function () { // musí být function, protože u => nefunguje this
            $(this).closest('.search_find').remove();
        });
    })
};

//obsluha historie
window.onpopstate = (event) => {
    if (event.state) {
        const previousState = event.state;

        if (previousState.date) {
            // bylo vyhledáno podle data
            const formattedDate = parseAndFormatDate(previousState.date);
            input.val(previousState.date);
            const currentLang = previousState.lang;
            const userUrl = `https://svatky.adresa.info/json?date=${formattedDate}&lang=${currentLang}`;
            showLoading();
            $.getJSON(userUrl).done((date) => {
                if ($.isEmptyObject(date)) {
                    handleFailure();
                    hideLoading();
                } else {
                    renderDate(date);
                    hideLoading();
                }
            }).fail(() => {
                handleFailure();
                hideLoading();
            });
        } else if (previousState.name) {
            // bylo vyhledáno podle jména
            const searchValue = previousState.name;
            input.val(searchValue);
            const currentLang = previousState.lang;
            const userUrl = `https://svatky.adresa.info/json?name=${searchValue}&lang=${currentLang}`;
            showLoading();
            $.getJSON(userUrl).done((user) => {
                if ($.isEmptyObject(user)) {
                    handleFailure();
                    hideLoading();
                } else {
                    renderUser(user);
                    hideLoading();
                }
            }).fail(() => {
                handleFailure();
                hideLoading();
            });
        }
        else if (previousState.holiday) {
            // bylo kliknuto na den v kalendáři
            const holiday = previousState.holiday;
            const moment = previousState.moment;

            const existingElement = calendarContainer.find('.search_find');
            existingElement.remove();
            if (holiday.length > 1) {
                const calendarClick = $(`<div class = "search_find">Dne ${moment} mají svátek: ${holiday.join(', ')}
                <button class="remove-button">Odstranit</button>
                </div>`);
                calendarContainer.append(calendarClick);
            }
            else {
                const calendarClick = $(`<div class = "search_find">Dne ${moment} má svátek: ${holiday.join(', ')}
                <button class="remove-button">Odstranit</button>
                </div>`);
                calendarContainer.append(calendarClick);
            }
            calendarContainer.on('click', '.remove-button', function () { // musí být function, protože u => nefunguje this
                $(this).closest('.search_find').remove();
            });
        }
    }
};

