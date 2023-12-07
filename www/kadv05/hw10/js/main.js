/**
 * Memorama, Match Match, Match Up, Memory, Pelmanism, Shinkei-suijaku, Pexeso or simply Pairs
 */

const cities = ['Prague', 'Berlin', 'Paris', 'London', 'Rome', 'Madrid', 'Athens', 'Vienna', 'Amsterdam', 'Lisbon'];

let shuffledCities = [];

for (let i = 0; i < 2; i++) {
    shuffledCities = shuffledCities.concat(cities);
}

shuffledCities.sort(() => 0.5 - Math.random());

const gameField = document.getElementById('game-field');
const pointField = document.getElementById('points');
let selectedCards = [];
let allRevealedCards = [];
let points = 0;

function createCard(city, index) {
    const card = document.createElement('div');
    card.classList.add('card');
    card.dataset.index = index;
    card.textContent = city;
    card.addEventListener('click', () => revealCard(card));
    gameField.appendChild(card);
}

function revealCard(card) {
    if (selectedCards.length < 2 && !card.classList.contains('revealed')) {
        card.classList.add('revealed');
        selectedCards.push(card);

        if (selectedCards.length === 2) {
            setTimeout(checkMatch, 1000);
        }
    }
}

function checkMatch() {
    const [card1, card2] = selectedCards;

    if (card1.textContent === card2.textContent) {
        points += 1;
        pointField.textContent = points;
        selectedCards = [];
        allRevealedCards.push(card1);
        allRevealedCards.push(card2);

        if (allRevealedCards.length === cities.length * 2) {
            alert('Congratulations! You matched all the pairs.');
        }
    } else {
        points = Math.max(0, points - 1);
        pointField.textContent = points;
        setTimeout(() => {
            card1.classList.remove('revealed');
            card2.classList.remove('revealed');
            selectedCards = [];
        }, 500);
    }
}

shuffledCities.forEach(createCard);
