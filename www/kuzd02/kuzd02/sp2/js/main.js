const api_key = "17e9867c69f6474bb328918b0132e685";
const mockData = JSON.parse("{\"coord\":{\"lon\":14.4208,\"lat\":50.088},\"weather\":[{\"id\":803,\"main\":\"Clouds\",\"description\":\"broken clouds\",\"icon\":\"04d\"}],\"base\":\"stations\",\"main\":{\"temp\":273.69,\"feels_like\":266.69,\"temp_min\":272.19,\"temp_max\":275.38,\"pressure\":995,\"humidity\":66},\"visibility\":10000,\"wind\":{\"speed\":11.32,\"deg\":270},\"clouds\":{\"all\":75},\"dt\":1705318034,\"sys\":{\"type\":2,\"id\":2010430,\"country\":\"CZ\",\"sunrise\":1705301744,\"sunset\":1705332407},\"timezone\":3600,\"id\":3067696,\"name\":\"Prague\",\"cod\":200}")
//animace logo
const setLoading = () => {
    if (!$("#logo").hasClass("animate-spin")) {
        $("#logo").addClass("animate-spin");
    }
    //TODO3: disablovani tlacitka
    $("#check-weather").prop("disabled", true);
    if ($("#check-weather").hasClass("hover:bg-sky-600") && $("#check-weather").hasClass("hover:text-sky-200")) {
        $("#check-weather").removeClass("hover:bg-sky-600");
        $("#check-weather").removeClass("hover:text-sky-200");
        $("#check-weather").addClass("bg-gray-500");
        $("#check-weather").addClass("text-neutral-50");

    }
}
//vratime tlacitko do hoveru a nastavime enabled
const unsetLoading = () => {
    $("#check-weather").prop("disabled", false);
    $("#logo").removeClass("animate-spin")
    $("#check-weather").addClass("hover:bg-sky-600");
    $("#check-weather").addClass("hover:text-sky-200");
    $("#check-weather").removeClass("bg-gray-500");
    $("#check-weather").removeClass("text-neutral-50");
};

const ajax_request = (method, cityName) => {
    setLoading()
    let units;
    if ($("#imperial-checkbox").is(":checked")) {
        units = "imperial"
    }
    else {
        units = "metric"
    }
    //kdyz undefine upizorni alertem 
    if (!cityName) {
        window.alert("Please, enter city name")
        return
    }
    return {
        type: method,
        url: `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${api_key}&units=${units}`,
        success: function (response) {
            $("#info").empty();
            //data z json
            const { weather, name, main } = response
            const { description } = weather[0]
            const mainName = weather[0].main
            $("#city-name-result").text(name);
            $("#add-favorities").show()
            $("#city-weather-result").text(mainName);
            $("#city-desc-result").text(description);
            // vytvorime tabulku
            const table = document.createElement("table");
            // vytvorme hlavicku tabulky
            const thead = document.createElement("thead") //hlavicka
            const trThead = document.createElement("tr") //radek hlavicky
            const thTheadKey = document.createElement("th") //sloupec category
            const thTheadValue = document.createElement("th") //hodnota: teplota .. atd
            thTheadKey.textContent = "Category" //nazvy
            thTheadValue.textContent = "Value" 
            trThead.appendChild(thTheadKey) //pridavame do DOM
            trThead.appendChild(thTheadValue)
            thead.appendChild(trThead)
            table.appendChild(thead)

            const tbody = document.createElement("tbody");
            //TODO1: volime jednotku teploty
            const tempUnit = units === "metric" ? "°C" : "°F";
            Object.entries(main).forEach(([key, value]) => {
                var tr = document.createElement("tr");
                let unit;
                if (key.includes("temp") > 0 || key === "feels_like") {
                    unit = tempUnit;
                    //TODO2: zaokrouhlime na cele ciso
                    value = Math.round(value);
                }
                else if (key === "pressure") {
                    unit = "Pa"
                }
                else if (key === "humidity") {
                    unit = "%"
                }
                const tdKey = document.createElement("td")
                const tdValue = document.createElement("td")
                tdKey.innerText = `${key}`//pridavam hodnoty
                tdValue.innerText = `${value} ${unit}`
                tr.appendChild(tdKey);
                tr.appendChild(tdValue);
                tbody.append(tr)
            })
            table.appendChild(tbody)
            $("#info").append(table); //pridavam tabulku do info
        },
        complete: function (response) {
            unsetLoading()
        }
    }
}

$(document).ready(function () {    
    // dialog neni videtelny zpocatku
    $("#dialog").hide();
    // add to favorites button neni videtelny zpocatku
    $("#add-favorities").hide()
    $("#add-favorities").click(function (e) { 
        e.preventDefault();
        const cityName = $("#city-name-result").text();
        let savedCities = JSON.parse(localStorage.getItem('saved-cities'));
        if (!savedCities) {
            savedCities = {}
        }
        if (!savedCities['cities']) {
            // vytvarime klic savedCities
            savedCities['cities'] = []
        }
        if (!savedCities['cities'].includes(cityName)) {
            savedCities['cities'].push(cityName) 
        }
        localStorage.setItem('saved-cities', JSON.stringify(savedCities))
    });
    // tlacitko close
    $("#close-dialog").click(function (e) { 
        e.preventDefault();
        $("#dialog").hide();
    });
});

$(document).ready(function () {
    // get weather by current location
    $("#current-location").click(function (e) { 
        e.preventDefault();
        // najde geopozice
        setLoading()
        navigator.geolocation.getCurrentPosition((position) => {
            // nachazi pozice (geolokace)
            const lat = position.coords.latitude;
            const lon = position.coords.longitude;
            $.ajax({
                type: "GET",
                url: `http://api.openweathermap.org/geo/1.0/reverse?lat=${lat}&lon=${lon}&limit=1&appid=${api_key}`,
                success: function (response) {
                    if (!response || response.lenght < 1) {
                        alert("Not available location")
                    }
                    const { name } = response[0]
                    if (!name) {
                        alert("City name does not exist")
                    }
                    else {
                        $.ajax(ajax_request("GET", name));
                    }
                },
                complete: function (response) {
                    unsetLoading()
                }
            });
        })
    });
    // pridani do saved cities
    $("#favorite-button").click(function (e) { 
        e.preventDefault();
        $("#dialog-content").empty();
        const savedCities = JSON.parse(localStorage.getItem('saved-cities'));
        //TODO4: oprava pomoci savedCities['cities'], tato podminka ověří jestli jíž existujou nějaké oblibená místa
        if (!savedCities || !savedCities['cities'] || savedCities['cities'].length == 0) {
            const warning = "No saved cities";
            $("#dialog-content").append(warning);
        }
        else {
            const citiesDiv = document.createElement("div");
            savedCities['cities'].forEach(city => {
                const li = document.createElement('li');
                const a = document.createElement('button');
                a.textContent = city
                a.classList = [...a.classList, 'saved-city-item']
                li.appendChild(a)
                citiesDiv.appendChild(li)
            })
            $("#dialog-content").append(citiesDiv);
        }
        $("button.saved-city-item").click(function (e) {
            e.preventDefault();
            const name = e.currentTarget.innerText;
            $("#city-name-input").val(name);
            $("#ck-weather").click();
        });
        $("#dialog").show();
    });
});

$(document).ready(function() {
    $("#search-bar-form").submit(function (e) { 
        e.preventDefault();
        const cityName = $("#city-name-input").val();
        $.ajax(ajax_request(
            "GET",
            cityName,
        ));
    });
});
