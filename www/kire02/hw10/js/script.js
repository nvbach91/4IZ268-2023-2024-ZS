let cities = ['Prague', 'London', 'Paris', 'Moscow', 'Brno', 'Vancouver', 'Sydney', 'Madrid', 'Rome', 'Berlin'];
cities = cities.concat(cities); 
cities.sort(() => 0.5 - Math.random()); 

let firstCard = null;
let secondCard = null;
let score = 0;
let flippedCards = 0;

function createCard(city) {
    const card = document.createElement('div');
    card.classList.add('card');
  
    const cardInner = document.createElement('div');
    cardInner.classList.add('card-inner');
  
    const cardFront = document.createElement('div');
    cardFront.classList.add('card-front');
  
    const cardBack = document.createElement('div');
    cardBack.classList.add('card-back');
    cardBack.innerText = city;
  
    cardInner.appendChild(cardFront);
    cardInner.appendChild(cardBack);
  
    card.appendChild(cardInner);
  
    card.addEventListener('click', () => handleCardClick(card));
  
    return card;
  }

function handleCardClick(card) {
  if (card === firstCard || card.classList.contains('flipped')) {
    return; 
  }

  card.classList.add('flipped');

  if (!firstCard) {
    firstCard = card;
  } else if (!secondCard) {
    secondCard = card;
    checkForMatch();
  }

}

function checkForMatch() {
  if (firstCard.innerText === secondCard.innerText) {
    score++;
    flippedCards += 2;
    resetCards();
    if (flippedCards === cities.length) {
      alert(`Hra skončila! Tvůj počet bodů: ${score}`);
    }
  } else {
    score = Math.max(0, score - 1);
    setTimeout(() => {
      firstCard.classList.remove('flipped');
      secondCard.classList.remove('flipped');
      resetCards();
    }, 2000);
  }
}

function resetCards() {
  firstCard = null;
  secondCard = null;
}

const gameBoard = document.querySelector('.game-board');
const scoreElement = document.querySelector('.score');

cities.forEach(city => {
  const card = createCard(city);
  gameBoard.appendChild(card);
});

function updateScore() {
  scoreElement.innerText = `Počet bodů: ${score}`;
}

