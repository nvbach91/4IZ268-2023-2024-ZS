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

        $('#hero-image').attr('src',"https://cdn.dota2.com"+hero.img)
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
        const submitButton = $('#submit-guess');
        const userGuess = getFormattedName($('#guess-input').val());
    
        if (userGuess === correctHero) {
            $('#result-message').text('Correct! You guessed the hero.');
            score++;
            saveGuessedHero(correctHero);
            guessedHeroImage();
            newHero();
            updateUI();
    
            submitButton.removeClass('button-incorrect').addClass('button-correct');
        } else {
            $('#result-message').text('Incorrect. Try again!');
            score = Math.max(0, score - 1);
            updateUI();
    
            submitButton.removeClass('button-correct').addClass('button-incorrect');
        }
    
        // Optional: Remove the color after a short delay
        setTimeout(() => {
            submitButton.removeClass('button-correct button-incorrect');
        }, 2000); 
    }

    // Function to save guessed hero in localStorage
    function saveGuessedHero(hero) {
        if (!guessedHeroes.includes(hero)) {
            guessedHeroes.push(hero);
            localStorage.setItem('guessedHeroes', JSON.stringify(guessedHeroes));
            guessedHeroImage(); 
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

    function guessedHeroImage() {
        const container = $('#guessed-heroes-container');
        container.empty(); // Clear the container

        guessedHeroes.forEach(heroName => {
            const hero = heroes.find(h => getFormattedName(h.localized_name) === heroName);
            if (hero) {
                const heroDiv = $('<div class="guessed-hero"></div>');
                const img = $('<img>').attr('src',"https://cdn.dota2.com"+hero.img).addClass('guessed-hero-image');
                const name = $('<p>').text(hero.localized_name).addClass('guessed-hero-name');
                
                heroDiv.append(img).append(name); // Append both the image and the name
                container.append(heroDiv);
            }
        });
    }

    function getData() {
        showSpinner();
        $.getJSON(
            `${baseUrl}/api/heroStats`
        ).done(data => {
            heroes = data;
            newHero();
            guessedHeroImage(); // Display guessed heroes after data is loaded
        }).fail((error) => {
            console.error('Error fetching hero data:', error);
        }).always(() => {
            hideSpinner();
        });
    }

    function clearLocalStorage() {
        localStorage.removeItem('guessedHeroes');
        guessedHeroes.length = 0; // Clear the array without reassigning
        guessedHeroImage(); // Update the display
    }
    
    // Event listener for the "Clear Guessed Heroes"
    $('#clear-storage').on('click', function () {
        console.log("Clear storage button clicked.");
        clearLocalStorage();
    });

    // Function to toggle the display of the guessed heroes container
    function toggleGuessedHeroes() {
        $('#guessed-heroes-container').toggle();
    }

   
    // Event listener for the "Toggle Guessed Heroes" 
    $('#toggle-guessed-heroes').on('click', function () {
        toggleGuessedHeroes();
    });

    // Function to handle "Give Up" action
    function giveUp() {
        if (!guessedHeroes.includes(correctHero)) {
            guessedHeroes.push(correctHero);
            localStorage.setItem('guessedHeroes', JSON.stringify(guessedHeroes));
            guessedHeroImage(); 
            newHero(); 
        }
    }

    // Click handler for "Give Up" 
    $('#give-up').on('click', function () {
        giveUp();
    });

    // Initialize the game
    initialize();
});
