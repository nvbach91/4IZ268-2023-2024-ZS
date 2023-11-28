const cities = ['Prague', 'London', 'Paris', 'Moscow', 'California', 'Vancouver', 'Sydney', 'Berlin', 'Rome', 'Tokyo'];
const doubledCities = cities.concat(cities).sort(() => 0.5 - Math.random());

const gameField = document.querySelector('#game-field');
const pointsDisplay = document.querySelector('#points');

let points = 0;
let firstCard = null;
let secondCard = null;
let revealedCards = 0;

const handleCardClick = (card) => {
  if (card.classList.contains('revealed') || (firstCard && secondCard)) {
    return;
  }

  card.classList.add('revealed');

  if (!firstCard) {
    firstCard = card;
  } else {
    secondCard = card;

    if (firstCard.innerText === secondCard.innerText) {
      points++;
      revealedCards += 2;
      resetCards();
      if (revealedCards === doubledCities.length) {
        setTimeout(() => {
          alert(`Congratulations! You have completed the game with ${points} points`);
        }, 1000);
      }
    } else {
      handleMismatch();
    }
    pointsDisplay.innerText = points;
  }
};

const resetCards = () => {
  firstCard = null;
  secondCard = null;
};

const handleMismatch = () => {
  points = Math.max(0, points - 1);
  setTimeout(() => {
    firstCard.classList.remove('revealed');
    secondCard.classList.remove('revealed');
    resetCards();
  }, 1000);
};

const createCardElement = (name) => {
  const card = document.createElement('div');
  card.classList.add('card');
  card.innerText = name;
  card.addEventListener('click', () => handleCardClick(card));
  gameField.appendChild(card);
};

doubledCities.forEach((city) => createCardElement(city));
