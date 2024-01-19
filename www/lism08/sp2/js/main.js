const apiKey = "acaed1c7252266f82a1b1467c4724453";
const apiUrl = "https://v3.football.api-sports.io";

const league = {};
const scorers = {};

const containerStandings = $('#dataContainerStandings');
const containerTopScorers = $('#dataContainerTopScorers');

const spinner = $(`<div>`).addClass('loader').attr('id', 'loadingSpinner');
containerStandings.append(spinner);
spinner.hide();

const leagues = {
    345: { name: "Czech Liga" },
    78: { name: "Bundesliga" },
    39: { name: "Premier League" },
    140: { name: "La Liga" },
    195: { name: "Victoria NPL" },
    61: { name: "Ligue 1" },
    332: { name: "Super Liga" },
    88: { name: "Eredivisie" },
    179: { name: "Premiership" },
    106: { name: "Ekstraklasa" },
}

const nav = $('nav');
const selectionLeagues = $(`<select id="selectedLeague"></select>`);
const leagueOption = Object.keys(leagues).map((leagueId) => {
    const leagueName = leagues[leagueId].name;
    const option = $(` <option data-id="${leagueId}">${leagueName}</option>`);
    return option;
});

const loadButton = $(`<button id="loadbutton">Načíst data</button>`);

loadButton.on('click', () => {
    const selectedLeagueId = $('#selectedLeague option:selected').data('id');
    loadData(selectedLeagueId);
})

nav.append(selectionLeagues);
nav.append(loadButton);
selectionLeagues.append(leagueOption);

let loadedState = null;

function loadData(state) {
    loadTeamsData(state);
    loadScorersData(state);
}

function loadTeamsData(state) {
    spinner.show();
    if (state !== loadedState) {
        removeElements();

        if (league[state] === undefined) {
            $.ajax({
                "url": apiUrl + "/standings?league=" + state + "&season=2023",
                "method": "GET",
                "timeout": 0,
                "headers": {
                    "x-rapidapi-key": apiKey,
                    "x-rapidapi-host": "v3.football.api-sports.io"
                }
            })
                .done(function (data) {
                    league[state] = data;
                    loadStandigs(data);
                    spinner.hide();
                })
                .fail(function (error) {
                    console.log('error', error);
                })
        } else {
            loadStandigs(league[state]);
            spinner.hide();
        }
        } else {
        console.log('Data byla již načtena.');
        spinner.hide();
    }
}

function loadScorersData(state) {
    if (state !== loadedState) {
        if (scorers[state] === undefined) {
            $.ajax({
                "url": apiUrl + "/players/topscorers?league=" + state + "&season=2023",
                "method": "GET",
                "timeout": 0,
                "headers": {
                    "x-rapidapi-key": apiKey,
                    "x-rapidapi-host": "v3.football.api-sports.io"
                }
            })
                .done(function (data) {
                    scorers[state] = data;
                    loadScorers(data);
                })
                .fail(function (error) {
                    console.log('error', error);
                })
        } else {
            loadScorers(scorers[state]);
        }
        loadedState = state;
    } else {
        console.log('Data byla již načtena.');
    }
}

function loadStandigs(data) {
    let standings = data.response[0].league.standings[0];
    let leagueTable = $('<div>').attr('id', 'loadedStandings');

    for (let i = 0; i < standings.length; i++) {
        const team = standings[i].team;
        const all = standings[i].all;

        const teamData = $('<div>').addClass('team-data');

        const ranking = $('<p>').text(standings[i].rank + ".");
        teamData.append(ranking);

        const teamName = $('<p>').text(team.name).addClass('name');
        teamData.append(teamName);

        const matches = $('<p>').text(all.played);
        teamData.append(matches);

        const goals = $('<div>').addClass('goals');
        teamData.append(goals);

        const goalsfor = $('<p>').text(all.goals.for + ' :');
        goals.append(goalsfor);

        const goalsagainst = $('<p>').text(all.goals.against);
        goals.append(goalsagainst);

        const points = $('<p>').text(standings[i].points).addClass('points');
        teamData.append(points);

        const form = $('<p>').text(standings[i].form).attr('id', 'form');
        teamData.append(form);
        colorizeLetters(form);

        leagueTable.append(teamData);
    }
    containerStandings.append(leagueTable);
}

function loadScorers(data) {
    let scorers = data.response;
    let leagueScorers = $('<div>').attr('id', 'loadedScorers');

    for (let i = 0; i < Math.min(scorers.length, 10); i++) {
        const player = scorers[i].player;
        const statistics = scorers[i].statistics[0];

        const playerData = $('<div>').addClass('team-data');

        const ranking = $('<p>').text(i + 1 + ".");
        playerData.append(ranking);

        const playerName = $('<p>').text(player.name).addClass('name');
        playerData.append(playerName);

        const playerTeam = $('<p>').text(statistics.team.name);
        playerData.append(playerTeam);

        const appearences = $('<p>').text(statistics.games.appearences);
        playerData.append(appearences);

        const goals = $('<p>').text(statistics.goals.total);
        playerData.append(goals);

        leagueScorers.append(playerData);
    }
    containerTopScorers.append(leagueScorers);
}

function removeElements() {
    $('[id="loadedStandings"]').remove();
    $('[id="loadedScorers"]').remove();
}

function colorizeLetters(form) {
    let text = form.text();
    $(form).empty();
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
    form.append(letterElements);
}
