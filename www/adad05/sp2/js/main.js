let weekShift = 0;
let weekKey = "";
let weekDataSorted = {
    "monday": [],
    "tuesday": [],
    "wednesday": [],
    "thursday": [],
    "friday": [],
    "saturday": [],
    "sunday": []
};

let weekDates = [];

const formButton = $("#formButton");
const eventName = $("#input1");
const eventPlace = $("#input2");
const eventDate = $("#input3");
const eventStartTime = $("#input4");
const eventEndTime = $("#input5");
const weekOfCalendar = $("#weekOfCalendar");
const leftButton = $("#arrowLeftButton");
const rightButton = $("#arrowRightButton");

formButton.click(() => {
    createEvent();
});

leftButton.click(() => {
    clickLeft();
});

rightButton.click(() => {
    clickRight();
});

const monday = $("#monday");
const tuesday = $("#tuesday");
const wednesday = $("#wednesday");
const thursday = $("#thursday");
const friday = $("#friday");
const saturday = $("#saturday");
const sunday = $("#sunday");

//funkce pro získání aktuálního data ve formátu yyyy-mm-dd
const currentDate = () => {
    let d = new Date(),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2)
        month = '0' + month;
    if (day.length < 2)
        day = '0' + day;

    return [year, month, day].join('-');
}

//funkce pro získání prvního a posledního dne v aktuálním týdnu (v případě n = 0), nebo n-tého týdne oběma směry
const weekRange = (n) => {
    weekDates.splice();
    let dates = [];
    for (let i = 0; i < 7; i++) {
        const date = new Date();
        date.setUTCDate(date.getUTCDate() + (n * 7) - date.getDay() + 1 + i);
        let month = '' + (date.getMonth() + 1),
            day = '' + date.getDate(),
            year = '' + date.getFullYear();

        if (month.length < 2)
            month = '0' + month;
        if (day.length < 2)
            day = '0' + day;

        dates.push([year, month, day].join('-'));
        weekDates.push([year, month, day].join('-'));
    }

    return dates;
}

// funkce pro vyčištění všech input polí
const clearInputs = () => {
    eventName.val("");
    eventPlace.val("");
    eventDate.val("");
    eventStartTime.val("");
    eventEndTime.val("");
}

// funkce pro vytvoření události v kalendáři za pomocí informací z input polí
const createEvent = () => {
    if (eventName.val() === "" || eventPlace.val() === "" || eventDate.val() === "" || eventStartTime.val() === "" || eventEndTime.val() === "") {
        console.log("Chybí údaje!");
        return;
    };
    let timeStartHours = parseInt(eventStartTime.val().split(':')[0]);
    let timeStartMinutes = parseInt(eventStartTime.val().split(':')[1]);
    let timeEndHours = parseInt(eventEndTime.val().split(':')[0]);
    let timeEndMinutes = parseInt(eventEndTime.val().split(':')[1]);
    let durationMinutes = (timeEndHours * 60 + timeEndMinutes) - (timeStartHours * 60 + timeStartMinutes);
    if (durationMinutes < 60) {
        console.log("Minimální délka akce je 60 minut!");
        return;
    }
    let height = (1000 / 1440) * durationMinutes;
    let marginTop = (1000 / 1440) * (timeStartHours * 60 + timeStartMinutes);
    let newEvent = $("<div></div>").addClass("event");
    newEvent.css("height", `${height}px`);
    newEvent.css("margin-top", `${marginTop}px`);
    let newEventName = $(`<div>${eventName.val()}</div>`).addClass("eventTitle");
    let newEventTime = $(`<div>${eventStartTime.val()}-${eventEndTime.val()}</div>`).addClass("eventTime");
    newEvent.append(newEventName, newEventTime);
    monday.append(newEvent);
    clearInputs();
}

const loadEvent = (eventItem, pixels) => {
    let timeStartHours = eventItem["startTime"].slice(0,2);
    let timeStartMinutes = eventItem["startTime"].slice(3,5);
    let timeEndHours = eventItem["endTime"].slice(0,2);
    let timeEndMinutes = eventItem["endTime"].slice(3,5);
    let durationMinutes = (parseInt(timeEndHours) * 60 + parseInt(timeEndMinutes)) - (parseInt(timeStartHours) * 60 + parseInt(timeStartMinutes));
    let height = (1000 / 1440) * durationMinutes;
    let marginTop = (1000 / 1440) * (parseInt(timeStartHours) * 60 + parseInt(timeStartMinutes)) - pixels;
    pixels = pixels + height + marginTop;
    let newEvent = $("<div></div>").addClass("event");
    newEvent.css("height", `${height}px`);
    newEvent.css("margin-top", `${marginTop}px`);
    let newEventName = $(`<div>${eventItem["title"]}</div>`).addClass("eventTitle");
    let newEventTime = $(`<div>${eventItem["startTime"]}-${eventItem["endTime"]}</div>`).addClass("eventTime");
    newEvent.append(newEventName, newEventTime);
    return [pixels, newEvent];
}

const writeDataToCalendar = () => {
    let pixels = 0;
    weekDataSorted["monday"].forEach ((item) => {
        let result = loadEvent(item, pixels);
        pixels = result[0];
        monday.append(result[1]);
    });

    pixels = 0;
    weekDataSorted["tuesday"].forEach ((item) => {
        let result = loadEvent(item, pixels);
        pixels = result[0];
        tuesday.append(result[1]);
    });

    pixels = 0;
    weekDataSorted["wednesday"].forEach ((item) => {
        let result = loadEvent(item, pixels);
        pixels = result[0];
        wednesday.append(result[1]);
    });

    pixels = 0;
    weekDataSorted["thursday"].forEach ((item) => {
        let result = loadEvent(item, pixels);
        pixels = result[0];
        thursday.append(result[1]);
    });

    pixels = 0;
    weekDataSorted["friday"].forEach ((item) => {
        let result = loadEvent(item, pixels);
        pixels = result[0];
        friday.append(result[1]);
    });

    pixels = 0;
    weekDataSorted["saturday"].forEach ((item) => {
        let result = loadEvent(item, pixels);
        pixels = result[0];
        saturday.append(result[1]);
    });

    pixels = 0;
    weekDataSorted["sunday"].forEach ((item) => {
        let result = loadEvent(item, pixels);
        pixels = result[0];
        sunday.append(result[1]);
    });
}

const cleanData = () => {
    weekDataSorted["monday"] = [];
    weekDataSorted["tuesday"] = [];
    weekDataSorted["wednesday"] = [];
    weekDataSorted["thursday"] = [];
    weekDataSorted["friday"] = [];
    weekDataSorted["saturday"] = [];
    weekDataSorted["sunday"] = [];
}

const cleanHTML = () => {
    monday.empty();
    tuesday.empty();
    wednesday.empty();
    thursday.empty();
    friday.empty();
    saturday.empty();
    sunday.empty();
}

const updateWeek = () => {
    let week = weekRange(weekShift);
    let title = week[0].slice(8, 10) + "-" + week[6].slice(8, 10) + "." + week[6].slice(5, 7) + "." + week[6].slice(0, 4);
    console.log("Current week: " + weekRange(weekShift)[0] + " - " + weekRange(weekShift)[6]);
    weekKey = title;
    weekOfCalendar.text(title);
    cleanData();
    cleanHTML();
    console.log(weekKey);
    getDataFromUser(weekKey);
    writeDataToCalendar();
    return title;
}

//funkce po kliknutí na šipku pro minulý týden
const clickLeft = () => {
    weekShift = weekShift - 1;
    updateWeek();
}

//funkce po kliknutí na šipku pro následující týden
const clickRight = () => {
    weekShift = weekShift + 1;
    updateWeek();
}

const events = {
    "2023-12-11": [
        { "title": "Škola", "place": "Žižkov", "startTime": "15:30", "endTime": "16:30" },
        { "title": "Škola", "place": "Žižkov", "startTime": "18:30", "endTime": "19:30" },
        { "title": "Škola", "place": "Žižkov", "startTime": "20:30", "endTime": "21:30" },
        { "title": "Škola", "place": "Žižkov", "startTime": "12:30", "endTime": "13:30" },
        { "title": "Škola", "place": "Žižkov", "startTime": "10:25", "endTime": "11:30" }
    ],
    "2023-12-12": [
        { "title": "Škola", "place": "Žižkov", "startTime": "15:30", "endTime": "16:30" },
        { "title": "Škola", "place": "Žižkov", "startTime": "18:30", "endTime": "19:30" },
        { "title": "Škola", "place": "Žižkov", "startTime": "20:30", "endTime": "21:30" },
        { "title": "Škola", "place": "Žižkov", "startTime": "12:30", "endTime": "13:30" },
        { "title": "Škola", "place": "Žižkov", "startTime": "10:25", "endTime": "11:30" }
    ]
}


const compareByStartTime = (a, b) => {
    return (a.startTime.slice(0, 2) * 60 + a.startTime.slice(3, 5)) - (b.startTime.slice(0, 2) * 60 + b.startTime.slice(3, 5));
}

const getDataFromUser = (key) => {
    let data = JSON.parse(localStorage.getItem(key));
    if (data){
        if (data[weekDates[0]]) { weekDataSorted["monday"] = data[weekDates[0]].sort(compareByStartTime); }
        if (data[weekDates[1]]) { weekDataSorted["tuesday"] = data[weekDates[1]].sort(compareByStartTime); }
        if (data[weekDates[2]]) { weekDataSorted["wednesday"] = data[weekDates[2]].sort(compareByStartTime); }
        if (data[weekDates[3]]) { weekDataSorted["thursday"] = data[weekDates[3]].sort(compareByStartTime); }
        if (data[weekDates[4]]) { weekDataSorted["friday"] = data[weekDates[4]].sort(compareByStartTime); }
        if (data[weekDates[5]]) { weekDataSorted["saturday"] = data[weekDates[5]].sort(compareByStartTime); }
        if (data[weekDates[6]]) { weekDataSorted["sunday"] = data[weekDates[6]].sort(compareByStartTime); }
        console.log(weekDataSorted);
    } else {
        console.log("No data available for this week!");
    }
}

getDataFromUser(updateWeek());

//localStorage.setItem('11-17.12.2023', JSON.stringify(events));
//console.log(localStorage.getItem("11-17.12.2023"));

