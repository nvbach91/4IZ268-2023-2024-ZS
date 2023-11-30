let points = 0;
let flippedCards = 0;
let firstCard = null;
let secondCard = null;
let canClick = true;

const initialCities = ['Bratislava', 'Košice', 'Prešov', 'Žilina', 'Banská Bystrica', 'Nitra', 'Trnava', 'Trenčín', 'Martin', 'Poprad'];
let cities = initialCities.concat(initialCities);
cities.sort(() => {
    return 0.5 - Math.random();
});
let gameBoard = document.getElementById('game-field');
let pointsDisplay = document.getElementById('points');

function createCard(city) {
    let card = document.createElement('div');
    card.classList.add('card');
    let front = document.createElement('div');
    front.classList.add('front');
    let back = document.createElement('div');
    back.classList.add('back');

    let cityName = document.createElement('span');
    cityName.classList.add('city-name');
    cityName.innerText = city;

    back.appendChild(cityName);
    card.appendChild(front);
    card.appendChild(back);
    card.addEventListener('click', () => {
        flipCard(card);
    });
    return card;
}

function flipCard(card) {
    if (!canClick || card.classList.contains('found') || card.classList.contains('removed') || card.classList.contains('flipped')) {
        return;
    }

    card.classList.add('flipped');
    flippedCards++;

    if (flippedCards === 1) {
        firstCard = card;
    } else if (flippedCards === 2) {
        secondCard = card;
        canClick = false;
        checkPair();
    }
}

function checkPair() {
    if (firstCard.querySelector('.city-name').innerText === secondCard.querySelector('.city-name').innerText) {
        points++;
        pointsDisplay.textContent = points;
        firstCard.classList.add('found', 'matched');
        secondCard.classList.add('found', 'matched');
        resetCards();
    } else {
        setTimeout(() => {
            firstCard.classList.remove('flipped');
            secondCard.classList.remove('flipped');
            if (points > 0) {
                points--;
                pointsDisplay.textContent = points;
            }
            resetCards();
        }, 1000);
    }
}

function resetCards() {
    flippedCards = 0;
    firstCard = null;
    secondCard = null;
    canClick = true;
}

function createGameBoard() {
    cities.forEach(city => {
        let card = createCard(city);
        gameBoard.appendChild(card);
    });
}

createGameBoard();
