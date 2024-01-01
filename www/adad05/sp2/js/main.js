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

const transportDirections = $("#transportDirections");
const directionsButton = $("#directionsButton");

formButton.click(() => {
    createEvent();
});

leftButton.click(() => {
    clickLeft();
});

rightButton.click(() => {
    clickRight();
});

directionsButton.click(() => {
    eventOrigin = "Začátek cesty";
    origin.text(eventOrigin);
    eventDestination = "Cíl cesty";
    destination.text(eventDestination);
    transportDirections.empty();
})

const monday = $("#monday");
const tuesday = $("#tuesday");
const wednesday = $("#wednesday");
const thursday = $("#thursday");
const friday = $("#friday");
const saturday = $("#saturday");
const sunday = $("#sunday");

let eventOrigin = "Začátek cesty";
let eventDestination = "Cíl cesty";
const origin = $("#origin");
const destination = $("#destination");

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
    weekDates.splice(0);
    let dates = [];
    for (let i = 0; i < 7; i++) {
        const date = new Date();

        // neděle se z nějakého důvodu reprezentuje jako date.getDay() === 0, což mi rozhodilo vzorec. Proto je zde
        // podmínka, která zjistí, když je zrovna neděle, a namísto vzorce použije konstantu - 6
        if (date.getDay() === 0) {
            date.setUTCDate(date.getUTCDate() + (n * 7) - 6 + i);
        } else {
            date.setUTCDate(date.getUTCDate() + (n * 7) - date.getDay() + 1 + i);
        }

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

    console.log(eventDate.val());
    let key = getKeyFromDate(eventDate.val());
    let data = JSON.parse(localStorage.getItem(key));
    let fitsCalendar = true;

    if (!(data)) {
        let newJSON = [];
        data = { [eventDate.val()]: newJSON };
        console.log(data);
    }

    // případ, kdy je v datech obsažen týden, ale v rámci týdne není obsažen konkrétní den
    if (!(data[eventDate.val()])) {
        let newJSON = [];
        data = { ...data, [eventDate.val()]: newJSON };
        console.log(data);
    }

    console.log(data[eventDate.val()].forEach((element) => {
        let startMinutesNewEvent = (timeStartHours * 60) + timeStartMinutes;
        let endMinutesNewEvent = (timeEndHours * 60) + timeEndMinutes;
        let startMinutesElement = (parseInt(element.startTime.slice(0, 2)) * 60) + parseInt(element.startTime.slice(3, 5));
        let endMinutesElement = (parseInt(element.endTime.slice(0, 2)) * 60) + parseInt(element.endTime.slice(3, 5));
        if ((endMinutesNewEvent <= startMinutesElement) || (startMinutesNewEvent >= endMinutesElement)) {
            console.log("OK");
            console.log(endMinutesNewEvent + "<=" + startMinutesElement);
            console.log(startMinutesNewEvent + ">=" + endMinutesElement);
        } else {
            fitsCalendar = false;
            console.log("BAD");
        }
    }));

    if (fitsCalendar) {
        let newJSON = { "title": `${eventName.val()}`, "place": `${eventPlace.val()}`, "startTime": `${eventStartTime.val()}`, "endTime": `${eventEndTime.val()}` };
        data[eventDate.val()].push(newJSON);
        console.log(data[eventDate.val()]);
        localStorage.setItem(key, JSON.stringify(data));
    }

    updateWeek();
    clearInputs();
}

const loadEvent = (eventItem, pixels) => {
    let timeStartHours = eventItem["startTime"].slice(0, 2);
    let timeStartMinutes = eventItem["startTime"].slice(3, 5);
    let timeEndHours = eventItem["endTime"].slice(0, 2);
    let timeEndMinutes = eventItem["endTime"].slice(3, 5);
    let durationMinutes = (parseInt(timeEndHours) * 60 + parseInt(timeEndMinutes)) - (parseInt(timeStartHours) * 60 + parseInt(timeStartMinutes));
    let height = (1000 / 1440) * durationMinutes;
    let marginTop = (1000 / 1440) * (parseInt(timeStartHours) * 60 + parseInt(timeStartMinutes)) - pixels;
    pixels = pixels + height + marginTop;
    let newEvent = $("<div></div>").addClass("event");
    newEvent.css("height", `${height}px`);
    newEvent.css("margin-top", `${marginTop}px`);
    newEvent.click(() => {
        addEventToDirections(newEvent);
    });
    let newEventName = $(`<div>${eventItem["title"]}</div>`).addClass("eventTitle");
    let newEventTime = $(`<div>${eventItem["startTime"]}-${eventItem["endTime"]}</div>`).addClass("eventTime");
    let newEventPlace = $(`<div>${eventItem["place"]}</div>`).addClass("eventPlace");
    newEvent.append(newEventName, newEventTime, newEventPlace);
    return [pixels, newEvent];
}

const getKeyFromDate = (dateFromEvent) => {
    console.log(dateFromEvent);
    const date = new Date(dateFromEvent);
    console.log(date.getDay());

    if (date.getDay() === 0) {
        date.setUTCDate(date.getUTCDate() - 6);
    } else {
        date.setUTCDate(date.getUTCDate() - date.getDay() + 1);
    }


    console.log(date);
    let date1 = '' + date.getDate();
    date.setUTCDate(date.getUTCDate() + 6);
    let date2 = '' + date.getDate();
    let month = '' + (date.getMonth() + 1);
    let year = '' + date.getFullYear();

    if (month.length < 2)
        month = '0' + month;
    if (date1.length < 2)
        date1 = '0' + date1;
    if (date2.length < 2)
        date2 = '0' + date2;

    let key = date1 + '-' + date2 + '.' + month + '.' + year
    console.log(key);
    return key;
}

const writeDataToCalendar = () => {
    let pixels = 0;
    weekDataSorted["monday"].forEach((item) => {
        let result = loadEvent(item, pixels);
        pixels = result[0];
        monday.append(result[1]);
    });

    pixels = 0;
    weekDataSorted["tuesday"].forEach((item) => {
        let result = loadEvent(item, pixels);
        pixels = result[0];
        tuesday.append(result[1]);
    });

    pixels = 0;
    weekDataSorted["wednesday"].forEach((item) => {
        let result = loadEvent(item, pixels);
        pixels = result[0];
        wednesday.append(result[1]);
    });

    pixels = 0;
    weekDataSorted["thursday"].forEach((item) => {
        let result = loadEvent(item, pixels);
        pixels = result[0];
        thursday.append(result[1]);
    });

    pixels = 0;
    weekDataSorted["friday"].forEach((item) => {
        let result = loadEvent(item, pixels);
        pixels = result[0];
        friday.append(result[1]);
    });

    pixels = 0;
    weekDataSorted["saturday"].forEach((item) => {
        let result = loadEvent(item, pixels);
        pixels = result[0];
        saturday.append(result[1]);
    });

    pixels = 0;
    weekDataSorted["sunday"].forEach((item) => {
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
    "2023-12-17": [
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
    if (data) {
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

const addEventToDirections = (event) => {
    if (eventOrigin === "Začátek cesty" && eventDestination === "Cíl cesty") {
        eventOrigin = event.children(".eventPlace").text();
        origin.text(eventOrigin);
        console.log(eventOrigin);
    } else if (eventDestination === "Cíl cesty") {
        eventDestination = event.children(".eventPlace").text();
        destination.text(eventDestination);
        console.log(eventDestination);
        callForDirections();
    } else {
        console.log("Both places are set. Delete them if you wish to add new!");
    }
}

// Google Directions API - předávají se parametry eventOrigin a eventDestination
const callForDirections = () => {
    let directionsService = new google.maps.DirectionsService();
    let directionRequest = {
        origin: eventOrigin,
        destination: eventDestination,
        travelMode: 'TRANSIT',
        transitOptions: {
            departureTime: new Date(),
            routingPreference: 'LESS_WALKING'
        },
        unitSystem: google.maps.UnitSystem.IMPERIAL,
        region: 'cs'
    };

    directionsService.route(directionRequest).then((resp) => {
        resp["routes"][0]["legs"][0]["steps"].forEach((item) => {
            if (item["travel_mode"] === "WALKING") {
                let instructions = item["instructions"];
                let estimatedTime = item["duration"]["text"];
                let step = `${instructions} (${estimatedTime} chůze)`;
                console.log(step);

                let newStep = $(`<div>${step}</div>`).addClass("textSection");
                transportDirections.append(newStep);
            } else if (item["travel_mode"] === "TRANSIT") {
                let departureStop = item["transit"]["departure_stop"]["name"];
                let departureTime = item["transit"]["departure_time"]["text"];
                let arrivalStop = item["transit"]["arrival_stop"]["name"];
                let arrivalTime = item["transit"]["arrival_time"]["text"];
                let step = `MHD: Z ${departureStop} (Odjezd: ${departureTime}) do ${arrivalStop} (Příjezd: ${arrivalTime})`;
                console.log(step);

                let newStep = $(`<div>${step}</div>`).addClass("textSection");
                transportDirections.append(newStep);

            }
        });
    });
}

updateWeek();

//localStorage.clear();
//localStorage.setItem('11-17.12.2023', JSON.stringify(events));
//console.log(localStorage.getItem("11-17.12.2023"));