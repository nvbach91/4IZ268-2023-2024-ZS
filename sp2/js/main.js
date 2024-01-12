let matchupHeroId = null;
    // Set matchupHeroId
    function setMatchupHeroId(id)
    {
        matchupHeroId = id;
        console.log(matchupHeroId, id);
    }



$(document).ready(function () {
    const baseUrl = "https://api.opendota.com";
    const guessedHeroes = JSON.parse(localStorage.getItem("guessedHeroes")) || [];

    let heroes = [];
    let correctHero = null;
    let correctHeroId = null;

    let score = 0;

    // Add an ID to the spinner element
    const spinnerElement = $('<div id="spinner" class="spinner" style="display: none;"></div>');

    // Append spinner to the hero image container initially
    const heroImageContainer = $('#hero-image-container');
    $('#hero-image-container').append(spinnerElement);

    // Function to show the spinner
    const showSpinner = () => {
        heroImageContainer.append(spinnerElement);
    };

    // Function to hide the spinner
    const hideSpinner = () => {
        $('#spinner').css('display', 'none');
    };

    // Initialize game
    function initialize() {
        updateUI();
        getData();
    }

    const heroImage = $('#hero-image');

    function displayHero(hero) {
        correctHero = getFormattedName(hero.localized_name);
        correctHeroId = hero.id;

        // Use the heroImage variable to set the source attribute
        heroImage.attr('src', "https://cdn.dota2.com" + hero.img);
        $('#result-message').text('');
        $('#guess-input').val('');
    }

    // Pick random hero
    function getRandomHero() {
        return heroes[Math.floor(Math.random() * heroes.length)];
    }

    // Get hero and display

    //const hero-image-container = $('#hero-image-container');

    function newHero() {
        if (guessedHeroes.length >= 123) {
            $('#hero-image-container').text('Congratulations! You have guessed all the heroes. The game is over.');
            return;
        }
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
    const scoreElement = $('.score');

    function updateUI() {
        scoreElement.text(score);
    }

    const submitButton = $('#submit-guess');
    const guessInput = $('#guess-input');

    // Function to handle user guesses
    function handleGuess() {
        const userGuess = getFormattedName(guessInput.val());

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




    // Updates the display of guessed heroes with images and names
    function guessedHeroImage() {
        const container = $('#guessed-heroes-container');
        //container.empty(); // Clear the container

        let content = '';


        guessedHeroes.forEach(heroName => {
            const hero = heroes.find(h => getFormattedName(h.localized_name) === heroName);
            content += `<div class="guessed-hero">
        <div class="guessed-hero-image"
        onclick = "setMatchupHeroId('${hero.id}')"
        style="background-image: url('https://cdn.dota2.com${hero.img}')">
                    </div>
                        <p class="guessed-hero-name">${hero.localized_name}</p>     
                    </div>`;

        });

        container.html(content); // Append the built HTML content to the container in one operation
    }
    // Function to fetch a random Dota 2 hero from the OpenDota API
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
    console.log('Current correctHero:', correctHero);

    // Click handler for "Give Up" 
    $('#give-up').on('click', function () {
        giveUp();
    });


    function shuffle(array) {
        let currentIndex = array.length,
            randomIndex;
        while (currentIndex > 0) {
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex--;
            [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
        }
        return array;
    }

    function showHint() {
        if (!correctHero) return;

        let letterIndexArray = Array.from(Array(correctHero.length).keys())
        let shuffled = shuffle(letterIndexArray)

        let halfLenght = Math.floor(correctHero.length / 2)

        let letterArray = correctHero.split("")

        let hint = ""

        for (let i = 0; i < halfLenght; i++) {
            hint = hint.concat(letterArray[shuffled[i]])
        }

        alert(`Hint: ${hint}`);
    }

    document.getElementById('hint-button').addEventListener('click', showHint);
    //https://api.opendota.com/api/heroes/{hero_id}/matchups


    function matchups() {
        console.log(correctHeroId,"Correct Id");
        $.getJSON(`${baseUrl}/api/heroes/${correctHeroId}/matchups`).done(data => {
            console.log('Matchups Data:', data);
            console.log('Second Hero Id:', matchupHeroId);
            
           let matchupHeroData = data.find(someData => someData.hero_id==matchupHeroId)
           console.log("Correct Matchup Data",matchupHeroData );
           alert(matchupHeroData.wins)


        }).fail((error) => {
            console.error('Error fetching hero data:', error);
        }).always(() => {
        });

    }



    document.getElementById('matchups').addEventListener('click', matchups);

    

   


    // Initialize the game
    initialize();
});