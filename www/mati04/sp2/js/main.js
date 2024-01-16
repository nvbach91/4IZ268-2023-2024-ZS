

const appContainer = $('#app');
const searchContainer = $('#search');
const leftContainer = $('#left_panel')
moment.locale('cs');

// Po načtení stránky odstraní spinner - knihovny se dlouho načítají
$(appContainer).ready(() => {
    $('.spinner').remove();
});

//Nastavení tlačítek a vstupu
const spin = $(`<div class = "spinner"></div>`);
const calendarContainer = $('<div>').attr('id', 'calendar');
const calendarTable = $('<table>').attr('id', 'calendar-table');
const containerDiv = $('<div>').addClass('center-container');
const input = $('<input>').attr('id', 'name');
const searchButton = $('<button>Hledat</button>').attr('id', 'search-btn');
const langButton = $('<button>').attr('id', 'lang-btn');
const inputDescription = $('<div class = "description">Zadejte jméno nebo datum v těchto možných formátech (DDMM, D/M, D.M)</div>')
containerDiv.append(input, searchButton, langButton);
appContainer.append(calendarContainer, containerDiv, inputDescription);
const monthSelect = $("<select id = month-select ></select>");

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

//Nastavení textu v tlačítku pro jazyk při načtení aplikace
appContainer.ready(() => {
    const currentLang = getCurrentLanguage();
    langButton.text(currentLang === 'sk' ? 'SK' : 'CZ');
});

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
const processDate = (date, element) => {
    const currentLang = getCurrentLanguage();
    const userUrl = `https://svatky.adresa.info/json?date=${date}&lang=${currentLang}`;
    showLoadingLeft();
    $.getJSON(userUrl).done((data) => {

        const name = data.map(holiday => holiday.name);
        const formattedDate = formatDate(date);
        element.text(`${formattedDate} - Svátek má ${name.join(' a ')}`);
        hideLoading();

    })
};

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
    const userNames = date.map(entry => entry.name); //těžké
    const userHtml = `<div class="search_find">${userNames.join(', ')}
    <button class="remove-button">Odstranit</button>
    </div>`;
    searchContainer.empty().append(userHtml);
    searchContainer.on('click', '.remove-button', function () { // musí být function, protože u => nefunguje this
        $(this).closest('.search_find').remove();
    });
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
searchButton.on('click', (e) => {
    e.preventDefault();
    const inputValue = input.val().trim();
    if (inputValue === '') {
        searchContainer.empty().append('<div class="search_find">Prázdný vstup</div>');
    }
    else {
        const searchValue = formatInput(inputValue);
        if (isValidDate(searchValue)) {
            const formattedDate = parseAndFormatDate(searchValue);
            const currentLang = getCurrentLanguage();
            const userUrl = `https://svatky.adresa.info/json?date=${formattedDate}&lang=${currentLang}`;
            showLoading();
            $.getJSON(userUrl).done((date) => {
                if ($.isEmptyObject(date)) {
                    handleFailure();
                    hideLoading();
                } else {
                    renderDate(date);
                    hideLoading();
                    const stateObject = {
                        date: searchValue,
                        lang: currentLang
                    };
                    const url = `?date=${searchValue}`;
                    history.pushState(stateObject, "", url);
                }
            }).fail(() => {
                handleFailure();
                hideLoading();
            });
        } else {
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
    langButton.text(newLang === 'sk' ? 'SK' : 'CZ');
};

//chyba, když uživatel zadá špatný vstup
const handleFailure = () => {
    searchContainer.empty().append('<div class="search_find">Nesprávný vstup</div>');
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
    daysOfWeek.forEach(day => {
        $('<th>').text(day).appendTo(row);
    });
    let currentDay = 1;
    for (let i = 0; i < 6; i++) {
        const row = $('<tr>').appendTo(calendarTable);
        const cells = [];
        for (let j = 0; j < 7; j++) {
            const cell = $('<td>').text(currentDay);
            if (i === 0 && j < firstDay) {
                cells.unshift($('<td>'));
            } else if (currentDay > daysInMonth) {
            } else {
                cells.push(cell);
                currentDay++;
            }
        }
        row.append(...cells);
    }
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
    const userUrl = `https://svatky.adresa.info/json?date=${date}&lang=${getCurrentLanguage()}`;

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
        const calendarClick = $(`<div class = "search_find">Dne ${formatMoment} má(mají) svátek: ${holidayNames.join(', ')}
        <button class="remove-button">Odstranit</button>
        </div>`);
        calendarContainer.append(calendarClick);
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
            const calendarClick = $(`<div class = "search_find">Dne ${moment} má(mají) svátek: ${holiday.join(', ')}
        <button class="remove-button">Odstranit</button>
        </div>`);
            calendarContainer.append(calendarClick);
            calendarContainer.on('click', '.remove-button', function () { // musí být function, protože u => nefunguje this
                $(this).closest('.search_find').remove(); 
            });
        }
    }
};

