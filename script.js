$(document).ready(function () {
    const baseUrl = "https://api.opendota.com";
    const guessedHeroes = JSON.parse(localStorage.getItem("guessedHeroes")) || [];

    let heroes = [];
    let correctHero = null;

    let score = 0;

    const spinnerElement = $('<div class="spinner"></div>');

    const showSpinner = () => {
        $('#hero-image-container').append(spinnerElement);
    }

    const hideSpinner = () => {
        spinnerElement.remove();
    }

    // Initialize game
    function initialize() {
        updateUI();
        getData();
    }

    // Function to display the hero on the page
    function displayHero(hero) {
        correctHero = getFormattedName(hero.localized_name);

        $('#hero-image').attr('src', `${baseUrl}${hero.img}`);
        $('#result-message').text('');
        $('#guess-input').val('');
    }

    // Pick random hero
    function getRandomHero() {
        return heroes[Math.floor(Math.random() * heroes.length)];
    }

    // Get hero and display
    function newHero() {
        let hero = getRandomHero();
        while (guessedHeroes.includes(getFormattedName(hero.localized_name))) {
            hero = getRandomHero();
        }
        displayHero(hero);
    }

    // Get formatted name
    function getFormattedName(name) {
        return name.toLowerCase().trim();
    }

    // Update UI
    function updateUI () {
        $('.score').text(score);
    }

    // Function to handle user guesses
    function handleGuess() {
        const userGuess = getFormattedName($('#guess-input').val());

        if (userGuess === correctHero) {
            $('#result-message').text('Correct! You guessed the hero.');
            score++;
            saveGuessedHero(correctHero);
            newHero();
            updateUI();
        } else {
            $('#result-message').text('Incorrect. Try again!');
            score = Math.max(0, score - 1);
            updateUI();
        }
    }

    // Function to save guessed hero in localStorage
    function saveGuessedHero(hero) {
        if (!guessedHeroes.includes(hero)) {
            guessedHeroes.push(hero);
            localStorage.setItem('guessedHeroes', JSON.stringify(guessedHeroes));
        }
    }

    // Event listener for the "Submit Guess" button
    $('#submit-guess').on('click', function () {
        handleGuess();
    });

    // Function to fetch a random Dota 2 hero from the OpenDota API
    function getData() {
        showSpinner();
        $.getJSON(
            `${baseUrl}/api/heroStats`
        ).done(data => {
            heroes = data;
            newHero();
        }).fail((error) => {
            console.error('Error fetching hero data:', error);
        }).always(() => {
            hideSpinner();
        });
    }

    // Initialize the game
    initialize();
});