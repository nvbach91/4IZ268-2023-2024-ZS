document.addEventListener('DOMContentLoaded', (event) => {
  console.log('DOM fully loaded and parsed');

  let cities = ['Barcelona', 'Berlin', 'Madrid', 'Rome', 'Prague', 'Bratislava', 'Warsaw', 'London', 'Oslo', 'Helsinki'];
cities = cities.concat(cities);
cities.sort(() => 0.5 - Math.random());

const gameField = document.getElementById('game-field');
const pointsDisplay = document.getElementById('points');
let points = 0;
let firstCard = null;
let secondCard = null;
let isTurnInProgress = false;

function onCardClick(event) {
    if (isTurnInProgress || event.currentTarget.classList.contains('revealed')) {
        return; // Prevents flipping more cards or re-flipping the same card during a turn
    }

    const clickedCard = event.currentTarget;
    clickedCard.classList.add('revealed');

    if (!firstCard) {
        firstCard = clickedCard;
    } else if (!secondCard) {
        secondCard = clickedCard;
        isTurnInProgress = true;

        // Check for a match
        setTimeout(checkForMatch, 1000);
    }
}


// ... (rest of the cities array and variables setup)

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

  card.addEventListener('click', () => {
      // Prevent further action if two cards are already flipped or if the current card is already matched
      if (isTurnInProgress || card.classList.contains('matched')) return;

      card.classList.add('revealed');

      if (!firstCard) {
          firstCard = card;
      } else if (firstCard && !secondCard) {
          secondCard = card;
          isTurnInProgress = true;
          // Delay for the player to see the cards before evaluating the match
          setTimeout(checkForMatch, 1000);
      }
  });

  return card;
}

function checkForMatch() {
  if (firstCard.innerText === secondCard.innerText) {
      firstCard.classList.add('matched');
      secondCard.classList.add('matched');
      points += 1;
  } else {
      points = Math.max(0, points - 1);
      firstCard.classList.remove('revealed');
      secondCard.classList.remove('revealed');
  }

  // Update points display
  pointsDisplay.textContent = points.toString();

  // Reset the turn
  firstCard = null;
  secondCard = null;
  isTurnInProgress = false;

  // Check if the game is over
  if (document.querySelectorAll('.card:not(.matched)').length === 0) {
      alert('Game over! Your score: ' + points);
  }
}

// Create and append cards to the game field
cities.forEach(city => {
  const cardElement = createCard(city);
  gameField.appendChild(cardElement);
});

console.log('Cards should be displayed now');

});



