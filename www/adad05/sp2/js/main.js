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

const daysOfWeek = [
    "monday",
    "tuesday",
    "wednesday",
    "thursday",
    "friday",
    "saturday",
    "sunday"
]

const form = $("#form");
const controls = $("#controls");

let weekDates = [];
let currentLocation = [];
let weekTemperatures = [[], [], [], [], [], [], []];

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
const deleteButton = $("#deleteButton");

const weather0 = $("#weather0");
const weather1 = $("#weather1");
const weather2 = $("#weather2");
const weather3 = $("#weather3");
const weather4 = $("#weather4");
const weather5 = $("#weather5");
const weather6 = $("#weather6");

const weatherList = [
    weather0,
    weather1,
    weather2,
    weather3,
    weather4,
    weather5,
    weather6
]

const weatherIcon0 = $("#weatherIcon0");
const weatherIcon1 = $("#weatherIcon1");
const weatherIcon2 = $("#weatherIcon2");
const weatherIcon3 = $("#weatherIcon3");
const weatherIcon4 = $("#weatherIcon4");
const weatherIcon5 = $("#weatherIcon5");
const weatherIcon6 = $("#weatherIcon6");

const weatherIconList = [
    weatherIcon0,
    weatherIcon1,
    weatherIcon2,
    weatherIcon3,
    weatherIcon4,
    weatherIcon5,
    weatherIcon6,
]

const timeColumn = $("#timeColumn");

form.submit((e) => {
    e.preventDefault();
    const formData = {};
    form.serializeArray().forEach(({ name, value }) => {
        formData[name] = value;
    });
    createEvent(formData);
    form[0].reset();
});

leftButton.click(() => {
    clickLeft();
});

rightButton.click(() => {
    clickRight();
});

deleteButton.click(() => {
    deleteMode = !deleteMode;
    console.log(deleteMode);
})

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

const arrayOfDays = [
    monday,
    tuesday,
    wednesday,
    thursday,
    friday,
    saturday,
    sunday
]

let eventOrigin = "Začátek cesty";
let eventDestination = "Cíl cesty";
const origin = $("#origin");
const destination = $("#destination");

let deleteMode = false;

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
    form[0].reset();
}

// funkce pro vytvoření události v kalendáři za pomocí informací z input polí
const createEvent = (formData) => {
    if (formData.title === "" || formData.adress === "" || formData.date === "" || formData.time0 === "" || formData.time1 === "") {
        console.log("Chybí údaje!");
        return;
    };
    let timeStartHours = parseInt(formData.time0.split(':')[0]);
    let timeStartMinutes = parseInt(formData.time0.split(':')[1]);
    let timeEndHours = parseInt(formData.time1.split(':')[0]);
    let timeEndMinutes = parseInt(formData.time1.split(':')[1]);
    let durationMinutes = (timeEndHours * 60 + timeEndMinutes) - (timeStartHours * 60 + timeStartMinutes);
    if (durationMinutes < 60) {
        console.log("Minimální délka akce je 60 minut!");
        return;
    }
    if (formData.title.length > 10) {
        console.log("Název je moc dlouhý!");
        return;
    }

    console.log(formData.date);
    let key = getKeyFromDate(formData.date);
    let data = JSON.parse(localStorage.getItem(key));
    let fitsCalendar = true;

    if (!(data)) {
        let newJSON = [];
        data = { [formData.date]: newJSON };
        console.log(data);
    }

    // případ, kdy je v datech obsažen týden, ale v rámci týdne není obsažen konkrétní den
    if (!(data[formData.date])) {
        let newJSON = [];
        data = { ...data, [formData.date]: newJSON };
        console.log(data);
    }

    console.log(data[formData.date].forEach((element) => {
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
        let newJSON = { "title": `${formData.title}`, "place": `${formData.adress}`, "startTime": `${formData.time0}`, "endTime": `${formData.time1}` };
        data[formData.date].push(newJSON);
        console.log(data[formData.date]);
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

//zkráceno do jednoho for cyklu namísto 7 funkcí
const writeDataToCalendar = () => {
    for (let i = 0; i <= 6; i++) {
        let pixels = 0;
        weekDataSorted[daysOfWeek[i]].forEach((item) => {
            let result = loadEvent(item, pixels);
            pixels = result[0];
            arrayOfDays[i].append(result[1]);
        });
    }
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
    let dataAvailable = checkForLocalTemp();
    console.log("Jsou data v localStorage: " + dataAvailable);
    if (!(dataAvailable)) { getWeekTemperatures(); }
    return title;
}

const checkForLocalTemp = () => {
    weekTemperatures = [[], [], [], [], [], [], []];
    let available;
    weekDates.forEach((date) => {
        let data = JSON.parse(localStorage.getItem(`temp${date}`));
        if (data) {
            available = true;
            let index = weekDates.indexOf(date);
            weekTemperatures[index].push([data.temperature, data.humidity, data.wind]);
            setTemperatures(index);
        }
    })
    return available;
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

//dataset pro zkoušku
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

// zkráceno pomocí cyklu
const getDataFromUser = (key) => {
    let data = JSON.parse(localStorage.getItem(key));
    if (data) {
        for (let i = 0; i <= 6; i++) {
            if (data[weekDates[i]]) { weekDataSorted[daysOfWeek[i]] = data[weekDates[i]].sort(compareByStartTime); }
        }
        console.log(weekDataSorted);
    } else {
        console.log("No data available for this week!");
    }
}

const addEventToDirections = (event) => {
    if (deleteMode === true) {
        console.log("ahoj");
        deleteMode = false;
        console.log(deleteMode);
        console.log(weekDataSorted);
        let evTitle = event.children(".eventTitle").text();
        let evDay = event.parent(".plan").attr('id');
        let evStart = event.children(".eventTime").text().slice(0, 5);
        let evEnd = event.children(".eventTime").text().slice(6, 11);
        weekDataSorted[evDay].forEach((item) => {
            if (item["title"] === evTitle && item["startTime"] === evStart && item["endTime"] === evEnd) {
                console.log("ano " + weekDataSorted[evDay].indexOf(item));
                let index = weekDataSorted[evDay].indexOf(item);
                weekDataSorted[evDay].splice(index, 1);
                updateLocalStorage();
            }
        })
        console.log(weekDataSorted);
        return;
    }
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
    let loader = $(`<span></span>`).addClass("loader");
    transportDirections.append(loader);
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
        loader.remove();
    });
}

const apiExampleRepsonse = {
    "lat": 33,
    "lon": 35,
    "tz": "+02:00",
    "date": "2020-03-04",
    "units": "standard",
    "cloud_cover": {
        "afternoon": 0
    },
    "humidity": {
        "afternoon": 87
    },
    "precipitation": {
        "total": 0
    },
    "temperature": {
        "min": 286.48,
        "max": 299.24,
        "afternoon": 12,
        "night": 289.56,
        "evening": 295.93,
        "morning": 287.59
    },
    "pressure": {
        "afternoon": 1015
    },
    "wind": {
        "max": {
            "speed": 8.7,
            "direction": 120
        }
    }
}

const getWeekTemperatures = () => {
    weekTemperatures = [[], [], [], [], [], [], []];
    let loader = $(`<span></span>`).addClass("loader-small");
    controls.append(loader);
    leftButton.css("display", "none");
    rightButton.css("display", "none");
    let allReady = [false, false, false, false, false, false, false];
    weekDates.forEach((date) => {
        const weatherDataURL = `https://api.openweathermap.org/data/3.0/onecall/day_summary?lat=${currentLocation[0]}&lon=${currentLocation[1]}&date=${date}&units=metric&appid=7659dac6387be0e52b02e162b8aecd64`;
        fetch(weatherDataURL).then((resp) => {
            return resp.json();
        }).then((data) => {
            let date = data["date"];
            let humidity = data["humidity"]["afternoon"];
            let temperature = data["temperature"]["afternoon"];
            let wind = data["wind"]["max"]["speed"];
            console.log(`${date}, vlhkost = ${humidity}, teplota = ${temperature}, vítr = ${wind}`);
            let index = weekDates.indexOf(date);
            weekTemperatures[index].push([temperature, humidity, wind]);
            setTemperatures(index);
            console.log(date);
            localStorage.setItem(`temp${date}`, JSON.stringify({ "temperature": temperature, "humidity": humidity, "wind": wind }));
            allReady[index] = true;
            console.log(allReady[index]);
            loader.remove();
            leftButton.css("display", "");
            rightButton.css("display", "");
        });
    })
}

//nastaví se teploty a změní se ikonky podle počasí
//defaultní ikonka = slunce s mrakem
//vlhkost nad 90 % včetně = mráček s kapkami
//teplota pod 0 včetně = mráček s vločkami
const setTemperatures = (day) => {

    weatherList[day].text(`${Math.round(weekTemperatures[day][0][0])}°C ${Math.round(weekTemperatures[day][0][1])} %`)

    weatherIconList[day].css("background-image", `url(./icons/sun_cloud.png)`);
    if (Math.round(weekTemperatures[day][0][1]) >= 90) {
        weatherIconList[day].css("background-image", `url(./icons/slight_rain.png)`);
    }
    if (Math.round(weekTemperatures[day][0][0]) <= 0) {
        weatherIconList[day].css("background-image", `url(./icons/snow.png)`);
    }


}

//propíše se obsah pole weekDataSorted do localStorage
//využívá se při vymázání eventu
const updateLocalStorage = () => {
    let monday = [];
    weekDataSorted["monday"].forEach((item) => {
        let json = { "title": item["title"], "place": item["place"], "startTime": item["startTime"], "endTime": item["endTime"] };
        monday.push(json);
    });

    let tuesday = [];
    weekDataSorted["tuesday"].forEach((item) => {
        let json = { "title": item["title"], "place": item["place"], "startTime": item["startTime"], "endTime": item["endTime"] };
        tuesday.push(json);
    });

    let wednesday = [];
    weekDataSorted["wednesday"].forEach((item) => {
        let json = { "title": item["title"], "place": item["place"], "startTime": item["startTime"], "endTime": item["endTime"] };
        wednesday.push(json);
    });

    let thursday = [];
    weekDataSorted["thursday"].forEach((item) => {
        let json = { "title": item["title"], "place": item["place"], "startTime": item["startTime"], "endTime": item["endTime"] };
        thursday.push(json);
    });

    let friday = [];
    weekDataSorted["friday"].forEach((item) => {
        let json = { "title": item["title"], "place": item["place"], "startTime": item["startTime"], "endTime": item["endTime"] };
        friday.push(json);
    });

    let saturday = [];
    weekDataSorted["saturday"].forEach((item) => {
        let json = { "title": item["title"], "place": item["place"], "startTime": item["startTime"], "endTime": item["endTime"] };
        saturday.push(json);
    });

    let sunday = [];
    weekDataSorted["sunday"].forEach((item) => {
        let json = { "title": item["title"], "place": item["place"], "startTime": item["startTime"], "endTime": item["endTime"] };
        sunday.push(json);
    });

    let json = {
        [weekDates[0]]: monday,
        [weekDates[1]]: tuesday,
        [weekDates[2]]: wednesday,
        [weekDates[3]]: thursday,
        [weekDates[4]]: friday,
        [weekDates[5]]: saturday,
        [weekDates[6]]: sunday,
    };

    console.log(JSON.stringify(json));
    console.log(weekKey);
    console.log(localStorage.getItem("01-07.01.2024"));
    localStorage.setItem(weekKey, JSON.stringify(json));
    updateWeek();
}

const createTimeColumn = () => {
    for (let i = 0; i <= 23; i++) {
        let time = [];
        if (String(i).length === 1) {
            time.push("0" + i + ":00", "0" + i + ":30");
        } else {
            time.push(i + ":00", i + ":30");
        }
        timeColumn.append($(`<div>${time[0]}</div>`).addClass("time"));
        timeColumn.append($(`<div>${time[1]}</div>`).addClass("time"));
    }
}

navigator.geolocation.getCurrentPosition((position) => {
    currentLocation.push(position.coords.latitude, position.coords.longitude);
    updateWeek();
    createTimeColumn();
});


//localStorage.clear();
//localStorage.setItem('11-17.12.2023', JSON.stringify(events));
//console.log(localStorage.getItem("11-17.12.2023"));

