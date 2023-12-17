const createApp = () => {
    const spaceToPlay = $('<div>').addClass('space-to-play');
    const title = $('<div>').addClass('title');
    title.text("Hangman: guess the word")
    const primaryRow = $('<div>').addClass('primary-row');
    const leftColumn = $('<div>').addClass('left-column');
    const startButton = $('<button>').addClass('start-button');
    startButton.text('Start new game');
    startButton.on('click', (event) => {
        spaceForWord.empty();
        rightColumn.empty();
        end.empty();
        showLoading();
        startGame();
        });
    const showRulesButton = $('<button>').addClass('show-rules-button');
    showRulesButton.text('Game rules');
    const rules = $('<div>').addClass('rules');
    showRulesButton.on('click', (event) => {
        rules.empty();
        rules.text('Game rules: You start by clicking on the "Start new game" button. Now at least four lines appear on your screen. The number of lines represent the number of letters in a random english word. Your task is to guess which letters are represented by the lines. By clicking on the letters bellow you can reveal the letter if your guess is correct. However; if your guess too many letters wrong, you loose the game. Good luck!');
        });
    leftColumn.append(startButton, showRulesButton);
    const showHint1 = $('<button>').addClass('show-hint-button');
    showHint1.text('Show first hint');
    const rightColumn = $('<div>').addClass('right-column');
    const showHint2 = $('<button>').addClass('show-hint-button');
    showHint2.text('Show second hint');
    
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
    

    const counters = $('<div>').addClass('count-points');
    let points = 0;
    const countPoints = $('<div>').addClass('count-points');
    countPoints.text('Total score: ' + points);

    let gamesPlayed = 0;
    const countGames = $('<div>').addClass('count-games');
    countGames.text('Games played: ' + gamesPlayed);


    const spinner = $(`<div class="spinner"></div>`);
    const showLoading = () => {
        spaceForWord.append(spinner);
    };
    const hideLoading = () => {
        spinner.remove();
    };
    const startGame = () => {
        keyboardFirstRow.empty();
        keyboardSecondRow.empty();
        keyboardThirdRow.empty();
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
                    line.addClass('line-unrevealed');
                    spaceForWord.append(line)
                })
                rightColumn.append(showHint1);
                showHint1.on('click', () => {
                    hintN1(randomWord);
                    rightColumn.append(showHint2);
                    showHint2.on('click', () => {
                        hintN2(randomWord);
                });});
                lettersFirstRow.forEach((letterK) => {
                    const key = $(`<div>${letterK}</div>`);
                    key.addClass('key');
                    key.on('click', () => keyClick(key, randomWord));
                    keyboardFirstRow.append(key)});
                lettersSecondRow.forEach((letterK) => {
                    const key = $(`<div>${letterK}</div>`);
                    key.addClass('key');
                    key.on('click', () => keyClick(key, randomWord));
                    keyboardSecondRow.append(key)});
                lettersThirdRow.forEach((letterK) => {
                    const key = $(`<div>${letterK}</div>`);
                    key.addClass('key');
                    key.on('click', () => keyClick(key, randomWord));
                    keyboardThirdRow.append(key)});
                keyboard.append(keyboardFirstRow, keyboardSecondRow, keyboardThirdRow);
                hideLoading();
        }});
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
                            rightColumn.append(spaceForDefinition);
                            spaceForDefinition.text('Definition: ' + definitions.join('\n'));
                        } else {
                            rightColumn.append(spaceForDefinition);
                            spaceForDefinition.text('Sorry, we could not find the definition.');
                        }
                    })
                    .fail(function () {
                        rightColumn.append(spaceForDefinition);
                        spaceForDefinition.text('Sorry, we could not find the definition.');
                    });
                    }
    const hintN2 = (randomWord) => {
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
                        rightColumn.append(spaceForSynonyms);
                        spaceForSynonyms.text('Synonyms: ' + synonyms);
                    } else {
                        rightColumn.append(spaceForSynonyms);
                        spaceForSynonyms.text('Sorry, we could not find any synonyms.');
                    }
                })
                .fail(function (error) {
                    rightColumn.append(spaceForSynonyms);
                    spaceForSynonyms.text('Sorry, we could not find any synonyms.');
                });
                    }
    let numberOfTrials = 3;
    let numberOfLettersRevealed = 0;
    const keyClick = (key, randomWord) => {
        const numberOfLetters = randomWord.length;
        let correct = false;
        $('.letter').each(function (i) {
            if (randomWord[i] === key.text) {
                correct = true;
                $(this).removeClass('line-unrevealed').addClass('line-revealed');
                numberOfLettersRevealed = numberOfLettersRevealed + 1;
                if (numberOfLetters === numberOfLettersRevealed) {
                    spaceToPlay.append(end);
                    end.text('You won!')
                }
          }}) 
        if (!correct) {
            numberOfTrials = numberOfTrials - 1;
            if (numberOfTrials === 0) {
                spaceToPlay.append(end);
                end.text('You lost!');
            }
        }
       
    }
    leftColumn.append(rules);
    primaryRow.append(leftColumn, rightColumn);
    counters.append(countPoints, countGames);
    spaceToPlay.append(title, primaryRow, spaceForWord, keyboard, counters);

    return spaceToPlay
}
const appContainer = $('#app');

const app = createApp();

appContainer.append(app);