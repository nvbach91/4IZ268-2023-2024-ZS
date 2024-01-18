const createApp = () => {
    const main = $('<main>').addClass('main');
    const title = $('<div>').addClass('title');
    title.text('Hangman: guess the word');
    const header = $('<header>').addClass('header');
    const leftColumn = $('<div>').addClass('left-column');
    const startButton = $('<button>').addClass('start-button');
    startButton.text('Start new game');
    startButton.on('click', (event) => {
        spaceForWord.empty();
        rightColumn.empty();
        hints.empty();
        end.empty();
        showLoading();
        getWord();
        gameWon = false;
        $('.unclickable').removeClass('unclickable').addClass('key');
        gamesPlayed = gamesPlayed + 1;
        countGames.text('Games played: ' + gamesPlayed);
        localStorage.setItem('hangmanGamesPlayed', gamesPlayed);
        localStorage.setItem('hangmanPoints', points);
        numberOfTrials = 8;
        updateTrialsColor();
        trialsLeft.text('Number of trials left: ' + numberOfTrials);
        localStorage.setItem('hangmanPoints', points);
    });
    const showRulesButton = $('<button>').addClass('show-rules-button');
    showRulesButton.attr('id', 'show-rules');
    showRulesButton.text('Game rules');
    const guessedWordsDictionary = {};
    const addWordToDictionary = (word, definition) => {
            guessedWordsDictionary[word] = definition;
        };
    const showDictionaryButton = $('<button>').addClass('dictionary-button');
    showDictionaryButton.text('Show dictionary of guessed words');
    const dictionary = $('<div>').addClass('dictionary');
    const unshowDictionaryButton = $('<button>').addClass('dictionary-button');
    unshowDictionaryButton.text('Close dictionary of guessed words');
    const wordsInDictionary = $('<div>').addClass('words-dictionary');
    dictionary.append(wordsInDictionary, unshowDictionaryButton);
    showDictionaryButton.click(function () {
        wordsInDictionary.empty();
        wordsInDictionary.append($('<h2>').text('Guessed Words Dictionary'));
        for (const [word, definition] of Object.entries(guessedWordsDictionary)) {
            const guessedWordLine = $('<div>').text(`${word}: ${definition}`);
            wordsInDictionary.append(guessedWordLine);
        } 
        dictionary.fadeIn();
        });
    unshowDictionaryButton.click(function () {
        dictionary.fadeOut();
    });
    dictionary.fadeOut();
    const rules = $('<div>').addClass('rules');
    rules.text('Game rules: You start by clicking on the "Start new game" button. Now at least four lines appear on your screen. The number of lines represent the number of letters in a random english word. Your task is to guess which letters are represented by the lines. By clicking on the letters bellow you can reveal the letter if your guess is correct. However; if you guess too many letters wrong, you lose the game. Good luck, have fun!');
    rules.attr('id', 'rules');
    const unshowRulesButton = $('<button>').addClass('unshow-rules-button');
    unshowRulesButton.attr('id', 'unshow-rules');
    unshowRulesButton.text('Close');
    rules.append(unshowRulesButton);
    showRulesButton.click(function () {
            rules.fadeIn();
        });
    unshowRulesButton.click(function () {
            rules.fadeOut();
        });
    leftColumn.append(startButton, showRulesButton, showDictionaryButton);
    const showHint1 = $('<button>').addClass('show-hint-button');
    showHint1.text('Show first hint');
    const rightColumn = $('<div>').addClass('right-column');
    const hints = $('<div>').addClass('hints');
    const showHint2 = $('<button>').addClass('show-hint-button');
    showHint2.text('Show second hint');

    const shareButton = $('<button>').addClass('share-facebook');
    shareButton.text('Share on Facebook');

    let numberOfTrials = 8;
    const trialsLeft = $('<div>').addClass('space-for-trials');
    const updateTrialsColor = () => {
        const color = numberOfTrials >= 6 ? 'darkgreen' :
            numberOfTrials === 5 ? 'yellowgreen' :
                numberOfTrials === 4 ? 'orange' :
                    numberOfTrials <= 3 ? 'red' : 'black';

        trialsLeft.css('color', color);
    };
    const spaceForWord = $('<div>').addClass('space-for-guessed-word');
    const spaceForDefinition = $('<div>').addClass('space-for-definition');
    const spaceForSynonyms = $('<div>').addClass('space-for-synonyms');
    const end = $('<div>').addClass('end');

    const keyboard = $('<div>').addClass('keyboard');
    const letterRows = [
        ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'], 
        ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'], 
        ['Z', 'X', 'C', 'V', 'B', 'N', 'M'], 
      ];
      letterRows.forEach((row) => {
        const keyboardRow = $('<div>').addClass('keyboard-row'); 
    
        row.forEach((letter) => {
            const key = $('<div>').text(letter).addClass('key'); 
            keyboardRow.append(key);
        });
    
        keyboard.append(keyboardRow); 
    });
    

    let points = parseInt(localStorage.getItem('hangmanPoints')) || 0;
    const counters = $('<div>').addClass('count-points');
    const countPoints = $('<div>').addClass('count-points');
    countPoints.text('Total score: ' + points);

    let gamesPlayed = parseInt(localStorage.getItem('hangmanGamesPlayed')) || 0;
    const countGames = $('<div>').addClass('count-games');
    countGames.text('Games played: ' + gamesPlayed);

    const footer = $('<footer>').addClass('footer');
    footer.text('Hangman © Lucie Hujerová 2024');

    const spinner = $('<div>').addClass('spinner');
    const showLoading = () => {
        spaceForWord.append(spinner);
    };
    const hideLoading = () => {
        spinner.remove();
    };
    const getWordsURL = 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/111863/dictionary.txt';
    const getWord = () => {$.get(getWordsURL, (data) => {
        const words = data.split('\n');
        startGame(words); 
    });}
    getWord();
    gamesPlayed = gamesPlayed + 1;
    countGames.text('Games played: ' + gamesPlayed);
    localStorage.setItem('hangmanGamesPlayed', gamesPlayed);
    localStorage.setItem('hangmanPoints', points);
    numberOfTrials = 8;
    updateTrialsColor();
    trialsLeft.text('Number of trials left: ' + numberOfTrials);
    localStorage.setItem('hangmanPoints', points);
    
    const startGame = (words) => {
        const randomIndex = Math.floor(Math.random() * words.length);
        const randomWord = words[randomIndex];
        if (randomWord.length <= 3) {
                startGame();
        } else {
                const letters = randomWord.split('');
                letters.forEach((letter) => {
                    const line = $(`<div>${letter}</div>`);
                    line.addClass('line-unrevealed line');
                    spaceForWord.append(line)
                });
                rightColumn.append(showHint1);
                showHint1.prop('disabled', false);
                showHint1.on('click', () => {
                    showLoading();
                    hintN1(randomWord);
                    rightColumn.append(showHint2);
                    showHint2.prop('disabled', false);
                    showHint2.on('click', () => {
                        showLoading();
                        hintN2(randomWord);
                    });
                });
                const settings = {
                    async: true,
                    crossDomain: true,
                    url: 'https://wordsapiv1.p.rapidapi.com/words/' + randomWord + '/definitions',
                    method: 'GET',
                    headers: {
                        'X-RapidAPI-Key': 'e8c33a1ec8msh2020509a6ffe124p105323jsnf081559fa303',
                        'X-RapidAPI-Host': 'wordsapiv1.p.rapidapi.com'
                    }
                };
                let definitions;
                $.ajax(settings)
                    .done(function (response) {
                        if (response.definitions && response.definitions.length > 0) {
                            definitions = response.definitions.map(def => def.definition);
                            definitions = definitions.join('\n');
                        } 
                    })
                keyboard.off('click', '.key').on('click', '.key', function () {
                    keyClick($(this), randomWord, definitions);
                });
                hideLoading();
            }
        };
    const hintN1 = (randomWord) => {
        const settings = {
            async: true,
            crossDomain: true,
            url: 'https://wordsapiv1.p.rapidapi.com/words/' + randomWord + '/definitions',
            method: 'GET',
            headers: {
                'X-RapidAPI-Key': 'e8c33a1ec8msh2020509a6ffe124p105323jsnf081559fa303',
                'X-RapidAPI-Host': 'wordsapiv1.p.rapidapi.com'
            }
        };
        $.ajax(settings)
            .done(function (response) {
                if (response.definitions && response.definitions.length > 0) {
                    const definitions = response.definitions.map(def => def.definition);
                    hints.append(spaceForDefinition);
                    spaceForDefinition.text('Definition: ' + definitions.join('\n'));
                } else {
                    hints.append(spaceForDefinition);
                    spaceForDefinition.text('Sorry, we could not find the definition.');
                }
            })
            .fail(function () {
                hints.append(spaceForDefinition);
                spaceForDefinition.text('Sorry, we could not find the definition.');
            });
        showHint1.prop('disabled', true);
        hideLoading();
    }
    const hintN2 = (randomWord) => {
        showLoading();
        const settings = {
            async: true,
            crossDomain: true,
            url: 'https://wordsapiv1.p.rapidapi.com/words/' + randomWord + '/synonyms',
            method: 'GET',
            headers: {
                'X-RapidAPI-Key': 'e8c33a1ec8msh2020509a6ffe124p105323jsnf081559fa303',
                'X-RapidAPI-Host': 'wordsapiv1.p.rapidapi.com'
            }
        };
        $.ajax(settings)
            .done(function (response) {
                const synonyms = response.synonyms || [];
                if (synonyms.length > 0) {
                    hints.append(spaceForSynonyms);
                    spaceForSynonyms.text('Synonyms: ' + synonyms);
                } else {
                    hints.append(spaceForSynonyms);
                    spaceForSynonyms.text('Sorry, we could not find any synonyms.');
                }
            })
            .fail(function (error) {
                hints.append(spaceForSynonyms);
                spaceForSynonyms.text('Sorry, we could not find any synonyms.');
            });
        showHint2.prop('disabled', true);
        hideLoading();
    }
    let gameWon = false;
    const keyClick = (key, randomWord, definitions) => {
        const clickableKey = key.attr('class');
        if (clickableKey === 'unclickable' || numberOfTrials === 0 || gameWon === true) {
            return false;
        }
        key.removeClass('key').addClass('unclickable');
        const numberOfLetters = randomWord.length;
        let correct = false;
        const letterKey = key.text().toLowerCase();
        $('.line').each(function (i) {
            if (randomWord[i].toLowerCase() === letterKey) {
                correct = true;
                $(this).removeClass('line-unrevealed').addClass('line-revealed');
                let numberOfLettersRevealed = $('.line-revealed').length;
                if (numberOfLetters === numberOfLettersRevealed) {
                    gameWon = true;
                    addWordToDictionary(randomWord, definitions);
                    end.text('You won!');
                    end.append(shareButton);
                    points = points + 1;
                    countPoints.text('Total score: ' + points);
                    localStorage.setItem('hangmanPoints', points);
                }
            }
        });
        if (!correct) {
            numberOfTrials = numberOfTrials - 1;
            trialsLeft.text('Number of trials left: ' + numberOfTrials);
            updateTrialsColor();
            if (numberOfTrials === 0) {
                $('.line-unrevealed').removeClass('line-unrevealed').addClass('line-revealed');
                end.text('You lost!');
                if (points > 0) {
                    points = points - 1;
                    countPoints.text('Total score: ' + points);
                    localStorage.setItem('hangmanPoints', points);
                }
            }
        }
    }
    leftColumn.append(rules, dictionary);
    header.append(leftColumn, rightColumn);
    counters.append(countPoints, countGames);
    main.append(title, header, hints, trialsLeft, spaceForWord, keyboard, counters, end, footer);
    FB.init({
        appId: '349548737936309',
        version: 'v18.0',
    });
    function shareOnFacebook() {
        FB.ui({
            method: 'share',
            href: encodeURI(window.location.href),
        }, function (response) { });
    }
    shareButton.on('click', () => shareOnFacebook());

    return main
}
const appContainer = $('#app');

const app = createApp();

appContainer.append(app);