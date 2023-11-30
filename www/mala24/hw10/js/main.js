const gameField = document.querySelector('#game-field');
const points = document.querySelector('#points');

let score = 0;
let firstCard = null;
let secondCard = null;
let revealedCards = [null, null];

let cities = ['Sydney', 'New York', 'Tokyo', 'Berlin', 'Beijing', 'Dubai', 'Cairo', 'Barcelona', 'Bangkok', 'Mumbai'];
cities = cities.concat(cities);
cities.sort(() => { 
  return 0.5 - Math.random(); 
});

let createCard = (city) => {
  const card = document.createElement('div');
  card.classList.add('card');
  card.innerText = city;
  card.dataset.city = city;
  card.addEventListener('click', cardClicked);
  gameField.appendChild(card);
};

let checkCardMatch = () => {
  if (revealedCards[0].textContent === revealedCards[1].textContent) {
    score++;
  } else {
    if (score > 0) {
      score--;
    }
    revealedCards[0].classList.remove('revealed');
    revealedCards[1].classList.remove('revealed');
  }
  revealedCards = [null, null];
};

function cardClicked() {
  if ((firstCard && secondCard) || this.classList.contains('revealed')) {
    return;
  }

  this.classList.add('revealed');

  if (!firstCard) {
    firstCard = this;
    return;
  }

  secondCard = this;

  if (firstCard.dataset.city === secondCard.dataset.city) {
    score++;
    resetBoard();
  } else {
    if (score > 0) {
      score--;
    }

    setTimeout(() => {
      firstCard.classList.remove('revealed');
      secondCard.classList.remove('revealed');
      resetBoard();
    }, 1000);
  }
};

let resetBoard = () => {
  [firstCard, secondCard] = [null, null];
  points.innerText = score;
};

cities.forEach(city => {
  createCard(city);
});