let settingsCzechScorers = {
    "url": "https://v3.football.api-sports.io/players/topscorers?league=345&season=2023",
    "method": "GET",
    "timeout": 0,
    "headers": {
        "x-rapidapi-key": "acaed1c7252266f82a1b1467c4724453",
        "x-rapidapi-host": "v3.football.api-sports.io"
    },
};

let settingsCzech = {
    "url": "https://v3.football.api-sports.io/standings?league=345&season=2023",
    "method": "GET",
    "timeout": 0,
    "headers": {
        "x-rapidapi-key": "acaed1c7252266f82a1b1467c4724453",
        "x-rapidapi-host": "v3.football.api-sports.io"
    },
};

let settingsGerman = {
    "url": "https://v3.football.api-sports.io/standings?league=78&season=2023",
    "method": "GET",
    "timeout": 0,
    "headers": {
        "x-rapidapi-key": "acaed1c7252266f82a1b1467c4724453",
        "x-rapidapi-host": "v3.football.api-sports.io"
    },
};

let settingsGermanScorers = {
    "url": "https://v3.football.api-sports.io/players/topscorers?league=78&season=2023",
    "method": "GET",
    "timeout": 0,
    "headers": {
        "x-rapidapi-key": "acaed1c7252266f82a1b1467c4724453",
        "x-rapidapi-host": "v3.football.api-sports.io"
    },
};

let settingsEnglish = {
    "url": "https://v3.football.api-sports.io/standings?league=39&season=2023",
    "method": "GET",
    "timeout": 0,
    "headers": {
        "x-rapidapi-key": "acaed1c7252266f82a1b1467c4724453",
        "x-rapidapi-host": "v3.football.api-sports.io"
    },
};

let settingsEnglishScorers = {
    "url": "https://v3.football.api-sports.io/players/topscorers?league=39&season=2023",
    "method": "GET",
    "timeout": 0,
    "headers": {
        "x-rapidapi-key": "acaed1c7252266f82a1b1467c4724453",
        "x-rapidapi-host": "v3.football.api-sports.io"
    },
};

let settingsSpain = {
    "url": "https://v3.football.api-sports.io/standings?league=140&season=2023",
    "method": "GET",
    "timeout": 0,
    "headers": {
        "x-rapidapi-key": "acaed1c7252266f82a1b1467c4724453",
        "x-rapidapi-host": "v3.football.api-sports.io"
    },
};

let settingsSpainScorers = {
    "url": "https://v3.football.api-sports.io/players/topscorers?league=140&season=2023",
    "method": "GET",
    "timeout": 0,
    "headers": {
        "x-rapidapi-key": "acaed1c7252266f82a1b1467c4724453",
        "x-rapidapi-host": "v3.football.api-sports.io"
    },
};

let czechData = {};
let czechDataScorers = {};
let czechLoaded = false;

let germanData = {};
let germanDataScorers = {};
let germanLoaded = false;

let englishData = {};
let englishDataScorers = {};
let englishLoaded = false;

let spainData = {};
let spainDataScorers = {};
let spainLoaded = false;

const containerStandings = $('#dataContainerStandings');
const containerTopScorers = $('#dataContainerTopScorers');

$.ajax(settingsGermanScorers)
    .done(function (german) {
        germanDataScorers = german;
    })
    .fail(function (error) {
        console.log('error', error);
    })
$.ajax(settingsGerman)
    .done(function (german) {
        germanData = german;
    })
    .fail(function (error) {
        console.log('error', error);
    })

$.ajax(settingsCzech)
    .done(function (czech) {
        czechData = czech;
    })
    .fail(function (error) {
        console.log('error', error);
    })

$.ajax(settingsCzechScorers)
    .done(function (czech) {
        czechDataScorers = czech;
    })
    .fail(function (error) {
        console.log('error', error);
    })

$.ajax(settingsEnglish)
    .done(function (english) {
        englishData = english;
    })
    .fail(function (error) {
        console.log('error', error);
    })

$.ajax(settingsEnglishScorers)
    .done(function (english) {
        englishDataScorers = english;
    })
    .fail(function (error) {
        console.log('error', error);
    })

$.ajax(settingsSpain)
    .done(function (spain) {
        spainData = spain;
    })
    .fail(function (error) {
        console.log('error', error);
    })

$.ajax(settingsSpainScorers)
    .done(function (spain) {
        spainDataScorers = spain;
    })
    .fail(function (error) {
        console.log('error', error);
    })

$('#loadCzechButton').click(function () {
    loadDataAndColorize(czechData, czechLoaded);
    loadScorers(czechDataScorers, czechLoaded);
});

$('#loadEnglishButton').click(function () {
    loadDataAndColorize(englishData, englishLoaded);
    loadScorers(englishDataScorers, englishLoaded);
});

$('#loadSpainButton').click(function () {
    loadDataAndColorize(spainData, spainLoaded);
    loadScorers(spainDataScorers, spainLoaded);
});

$('#loadGermanButton').click(function () {
    loadDataAndColorize(germanData, germanLoaded);
    loadScorers(germanDataScorers, germanLoaded);
});

function loadDataAndColorize(data, loadedFlag) {
    if (loadedFlag === false) {
        removeElements();

        let standings = data.response[0].league.standings[0];
        let leagueTable = $('<div>').attr('id', 'loaded');

        for (let i = 0; i < standings.length; i++) {
            let team = standings[i].team;
            let all = standings[i].all;

            let teamData = $('<div>').addClass('team-data');

            let ranking = $('<p>').text(standings[i].rank + ".");
            teamData.append(ranking);

            let teamName = $('<p>').text(team.name).addClass('name');
            teamData.append(teamName);

            let matches = $('<p>').text(all.played);
            teamData.append(matches);

            let goals = $('<div>').addClass('goals');
            teamData.append(goals);

            let goalsfor = $('<p>').text(all.goals.for + ' :');
            goals.append(goalsfor);

            let goalsagainst = $('<p>').text(all.goals.against);
            goals.append(goalsagainst);

            let points = $('<p>').text(standings[i].points).addClass('points');
            teamData.append(points);

            let form = $('<p>').text(standings[i].form).attr('id', 'form');
            teamData.append(form);

            leagueTable.append(teamData);
        }
        containerStandings.append(leagueTable);
        loadedFlag = true;
        colorizeLetters('form');
    } else {
        console.log('Data byla již načtena.');
    }
}

function loadScorers(data, loadedFlag) {
    if (loadedFlag === false) {
        let scorers = data.response;

        let leagueScorers = $('<div>').attr('id', 'loaded');

        for (let i = 0; i < Math.min(10, scorers.length); i++) {
            let player = scorers[i].player;
            let statistics = scorers[i].statistics[0];

            let playerData = $('<div>').addClass('team-data');

            let ranking = $('<p>').text(i + 1 + ".");
            playerData.append(ranking);

            let playerName = $('<p>').text(player.name).addClass('name');
            playerData.append(playerName);

            let playerTeam = $('<p>').text(statistics.team.name);
            playerData.append(playerTeam);

            let appearences = $('<p>').text(statistics.games.appearences);
            playerData.append(appearences);

            let goals = $('<p>').text(statistics.goals.total);
            playerData.append(goals);

            leagueScorers.append(playerData);
        }
        containerTopScorers.append(leagueScorers);
        loadedFlag = true;
        colorizeLetters('form');
    } else {
        console.log('Data byla již načtena.');
    }
}

function removeElements() {
    $('[id="loaded"]').remove();
}

function colorizeLetters(idName) {
    $('[id="' + idName + '"]').each(function () {
        let text = $(this).text();
        $(this).empty();
        let letterElements = [];

        for (let i = 0; i < text.length; i++) {
            let letterElement = $('<span>').text(text[i]);

            switch (text[i].toLowerCase()) {
                case 'w':
                    letterElement.addClass('classForW');
                    break;
                case 'l':
                    letterElement.addClass('classForL');
                    break;
                case 'd':
                    letterElement.addClass('classForD');
                    break;
            }
            letterElements.push(letterElement);
        }

        $(this).append(letterElements);
    });
}