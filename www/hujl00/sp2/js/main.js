const createApp = () => {
    const main = $('<main>').addClass('main');
    const title = $('<div>').addClass('title');
    title.text('Hangman: guess the word')
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
        startGame();
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

    const rules = $('<div>').addClass('rules');
    rules.text('Game rules: You start by clicking on the "Start new game" button. Now at least four lines appear on your screen. The number of lines represent the number of letters in a random english word. Your task is to guess which letters are represented by the lines. By clicking on the letters bellow you can reveal the letter if your guess is correct. However; if you guess too many letters wrong, you lose the game. Good luck, have fun!');
    rules.attr('id', 'rules');
    const unshowRulesButton = $('<button>').addClass('unshow-rules-button');
    unshowRulesButton.attr('id', 'unshow-rules');
    unshowRulesButton.text('Close');
    rules.append(unshowRulesButton);
    $(document).ready(function () {
        $('#show-rules').click(function () {
            $('#rules').fadeIn();
        });
        $('#unshow-rules').click(function () {
            $('#rules').fadeOut();
        });
    });

    leftColumn.append(startButton, showRulesButton);
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
    const keyboardFirstRow = $('<div>').addClass('keyboard-row');
    const keyboardSecondRow = $('<div>').addClass('keyboard-row');
    const keyboardThirdRow = $('<div>').addClass('keyboard-row');
    const lettersFirstRow = ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'];
    const lettersSecondRow = ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'];
    const lettersThirdRow = ['Z', 'X', 'C', 'V', 'B', 'N', 'M'];
    lettersFirstRow.forEach((letterK) => {
        const key = $(`<div>${letterK}</div>`);
        key.addClass('key');
        keyboardFirstRow.append(key)
    });
    lettersSecondRow.forEach((letterK) => {
        const key = $(`<div>${letterK}</div>`);
        key.addClass('key');
        keyboardSecondRow.append(key)
    });
    lettersThirdRow.forEach((letterK) => {
        const key = $(`<div>${letterK}</div>`);
        key.addClass('key');
        keyboardThirdRow.append(key)
    });
    keyboard.append(keyboardFirstRow, keyboardSecondRow, keyboardThirdRow);

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
    const startGame = () => {
        const getWordsURL = 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/111863/dictionary.txt';
        $.get(getWordsURL, (data) => {
            const words = data.split('\n');
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
                })
                rightColumn.append(showHint1);
                showHint1.on('click', () => {
                    showLoading();
                    hintN1(randomWord);
                    rightColumn.append(showHint2);
                    showHint2.on('click', () => {
                        showLoading();
                        hintN2(randomWord);
                    });
                });
                keyboard.off('click', '.key').on('click', '.key', function () {
                    keyClick($(this), randomWord);
                });
                hideLoading();
            }
        });
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
        hideLoading();
    }
    const keyClick = (key, randomWord) => {
        const clickableKey = key.attr('class');
        if (clickableKey === 'unclickable' || numberOfTrials === 0) {
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
    leftColumn.append(rules);
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