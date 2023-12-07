/**
 * Memorama, Match Match, Match Up, Memory, Pelmanism, Shinkei-suijaku, Pexeso or simply Pairs
 */

document.addEventListener('DOMContentLoaded', () => {
    const gameBoard = document.getElementById('game-field');
    const scoreDisplay = document.getElementById('points');

    let score = 0;
    let firstCard = null;
    let secondCard = null;
    let isFlipped = false;

    let cities = ['Prague', 'London', 'Paris', 'Madrid', 'Tallinn', 'Vienna', 'Sydney', 'Tokyo', 'Berlin', 'Rome'];
    cities = cities.concat(cities);

    const sortCards = () => {
        cities.sort(() => 0.5 - Math.random());
    };

    const cardClick = function () {
        if (isFlipped || this.classList.contains('matched') || this === firstCard) {
            return;
        }

        this.classList.remove('hidden');

        if (!firstCard) {
            firstCard = this;
        } else {
            secondCard = this;
            checkMatch();
        }
    };

    const updateScore = () => {
        scoreDisplay.innerText = `${score}`;
    };

    const createCard = (city) => {
        const card = document.createElement('div');
        card.classList.add('card', 'hidden');
        card.innerText = city;
        card.addEventListener('click', cardClick);
        return card;
    };

    const createGameBoard = () => {
        gameBoard.innerHTML = '';

        for (let i = 0; i < cities.length; i++) {
            const card = createCard(cities[i], i);
            gameBoard.appendChild(card);
        }
    };

    const checkWin = () => {
        const allCards = document.querySelectorAll('.card');
        const matchedCards = document.querySelectorAll('.card.matched');

        if (allCards.length === matchedCards.length) {
            alert(`Congratulations!\nYour final score is ${score}`);
        }
    };

    const checkMatch = () => {
        isFlipped = true;
        if (firstCard.innerText === secondCard.innerText) {
            firstCard.classList.add('matched');
            secondCard.classList.add('matched');
            score++;
        } else {
            score = Math.max(0, score - 1);

            setTimeout(() => {
                firstCard.classList.add('hidden');
                secondCard.classList.add('hidden');
            }, 1000);
        }

        updateScore();
        setTimeout(() => {
            resetCards();
            checkWin();
        }, 1000);
    };

    const resetCards = () => {
        firstCard = null;
        secondCard = null;
        isFlipped = false;
    };

    //restart hry
    const createRestartButton = () => {
        const restartButton = document.createElement('button');
        restartButton.innerText = 'Restart';
        restartButton.addEventListener('click', () => {
            resetGame();
        });
        restartButton.classList.add('restart-button');
        return restartButton;
    };

    const resetGame = () => {
        score = 0;
        firstCard = null;
        secondCard = null;
        isFlipped = false;

        const allCards = document.querySelectorAll('.card');
        allCards.forEach(card => {
            card.classList.add('hidden');
            card.classList.remove('matched');
        });

        initializeGame();
    };

    const restartButton = createRestartButton();

    gameBoard.insertAdjacentElement('afterend', restartButton);

    //inicializace
    const initializeGame = () => {
        sortCards();
        createGameBoard();
        updateScore();
    };

    initializeGame();

});

