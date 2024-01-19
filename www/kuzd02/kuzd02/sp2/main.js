const api_key = "17e9867c69f6474bb328918b0132e685";
const mockData = JSON.parse("{\"coord\":{\"lon\":14.4208,\"lat\":50.088},\"weather\":[{\"id\":803,\"main\":\"Clouds\",\"description\":\"broken clouds\",\"icon\":\"04d\"}],\"base\":\"stations\",\"main\":{\"temp\":273.69,\"feels_like\":266.69,\"temp_min\":272.19,\"temp_max\":275.38,\"pressure\":995,\"humidity\":66},\"visibility\":10000,\"wind\":{\"speed\":11.32,\"deg\":270},\"clouds\":{\"all\":75},\"dt\":1705318034,\"sys\":{\"type\":2,\"id\":2010430,\"country\":\"CZ\",\"sunrise\":1705301744,\"sunset\":1705332407},\"timezone\":3600,\"id\":3067696,\"name\":\"Prague\",\"cod\":200}")

$(document).ready(function () {
    $("#dialog").hide();
});

$(document).ready(function () {
    $("#close-dialog").click(function (e) { 
        e.preventDefault();
        $("#dialog").hide();
    });
});

$(document).ready(function () {
    $("#add-favorities").hide()
    $("#add-favorities").click(function (e) { 
        e.preventDefault();
        const cityName = $("#city-name-result").text();
        let savedCities = JSON.parse(localStorage.getItem('saved-cities'));
        if (!savedCities) {
            savedCities = {}
        }
        if (!savedCities['cities']) {
            savedCities['cities'] = []
        }
        if (!savedCities['cities'].includes(cityName)) {
            savedCities['cities'].push(cityName) 
        }
        localStorage.setItem('saved-cities', JSON.stringify(savedCities))
    });
});

$(document).ready(function () {
    $("#favorite-button").click(function (e) { 
        e.preventDefault();
        $("#dialog-content").empty();
        const savedCities = JSON.parse(localStorage.getItem('saved-cities'));
        if (!savedCities || savedCities['cities'].length == 0) {
            const warning = "Not saved cities";
            $("#dialog-content").append(warning);
        }  
        savedCities['cities'].forEach(city => {
            const li = document.createElement('li');
            const a = document.createElement('button');
            a.textContent = city
            a.classList = [...a.classList, 'saved-city-item']
            li.appendChild(a)
            $("#dialog-content").append(li);
        })
        $("button.saved-city-item").click(function (e) {
            e.preventDefault();
            const name = e.currentTarget.innerText;
            $("#city-name-input").val(name);
            $("#check-weather").click();
        });
        $("#dialog").show();
    });
});

$(document).ready(function() {
    $("#check-weather").click(function (e) { 
        e.preventDefault();
        const cityName = $("#city-name-input").val();
        if (!cityName) {
            window.alert("Please, enter city name")
            return
        }
        $.ajax({
            type: "GET",
            url: `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${api_key}&units=metric`,
            success: function (response) {
                $("#info").empty();
                const { weather, name, main } = response
                const { description } = weather[0]
                const mainName = weather[0].main
                $("#city-name-result").text(name);
                $("#add-favorities").show()
                $("#city-weather-result").text(mainName);
                $("#city-desc-result").text(description);
                var contentList = document.createElement("ul");
                Object.entries(main).forEach(([key, value]) => {
                    const li = document.createElement("li")
                    li.innerText = `${key}: ${value}`
                    contentList.append(li)
                })
                $("#info").append(contentList);
            }
        });
    });
});