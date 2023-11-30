
let cities = ['Prague', 'Astana', 'Madrid', 'Krumlov', 'Paris', 'London', 'Kyoto', 'Hawaii', 'Frankfurt',
'Sydney', 'New York', 'Berlin', 'Rome', 'Bali'];
cities = cities.concat(cities);
cities.sort(() => {
  return 0.5 - Math.random();
});

let flippedCards = [];
let score = 0;
let isFrozen = false;

const gameField = document.getElementById('game-field');
const pointsDisplay = document.getElementById('points');

function createCard(city) {
  const card = document.createElement('div');
  card.classList.add('card');
  card.dataset.city = city;

  const innerCard = document.createElement('div');
  innerCard.classList.add('inner-card');
  innerCard.innerText = city;

  card.appendChild(innerCard);
  card.addEventListener('click', () => flipCard(card))

  return card;
}

function flipCard(card) {
  if (!isFrozen && card !== flippedCards[0] && flippedCards.length < 2) {
    card.classList.add('revealed');
    flippedCards.push(card);

    if (flippedCards.length === 2) {
      setTimeout(checkMatch, 1000);
    }
  }
}

function checkMatch() {
  const [card1, card2] = flippedCards;
  const city1 = card1.dataset.city;
  const city2 = card2.dataset.city;

  if (city1 === city2) {
    score++;
  } else {
    card1.classList.remove('revealed');
    card2.classList.remove('revealed');
  }

  updateScore();
  flippedCards = []
  isFrozen = frozen;
}

function updateScore() {
  pointsDisplay.textContent = score;
}

function startNewTurn() {
  isFrozen = true;
  setTimeout(() => {
    flippedCards.forEach(card => card.classList.remove('revealed'));
    flippedCards = [];
    isFrozen = false;
  }, 2000);
}

function initGame() {
  cities.forEach(city => {
    const card = createCard(city);
    gameField.appendChild(card);
  });
}

initGame();