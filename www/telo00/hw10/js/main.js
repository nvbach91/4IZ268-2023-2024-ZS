document.addEventListener("DOMContentLoaded", function () {
  const cities = ['Prague', 'Paris', 'Moscow', 'California', 'Sydney', 'Berlin', 'Tokyo', 'New York', 'Shanghai', 'Amsterdam'];
  let points = 0;
  let flippedCards = [];
  let lockBoard = false;

  const gameField = document.getElementById('game-field');
  const pointsDisplay = document.getElementById('points');

  const shuffledCities = shuffleArray(cities.concat(cities));

  shuffledCities.forEach((city, index) => {
    const card = createCard(city, index);
    gameField.appendChild(card);
  });

  function createCard(city, index) {
    const card = document.createElement('div');
    card.classList.add('card', 'hidden-text');
    card.innerText = city;

    card.addEventListener('click', function () {
      flipCard(this, index);
    });

    return card;
  }

  function flipCard(clickedCard, index) {
    if (lockBoard) return;
    if (clickedCard === flippedCards[0]) return;

    clickedCard.classList.remove('hidden-text');
    clickedCard.classList.add('revealed');
    flippedCards.push({ card: clickedCard, index });

    if (flippedCards.length === 2) {
      lockBoard = true;
      setTimeout(() => checkMatch(), 800);
    }
  }

  function checkMatch() {
    const [card1, card2] = flippedCards;

    if (card1.card.innerText === card2.card.innerText) {
      points++;
      pointsDisplay.innerText = points;
      card1.card.classList.add('locked-card');
      card2.card.classList.add('locked-card');
    } else {
      if (points > 0) {
        points--;
        pointsDisplay.innerText = points;
      }
      card1.card.classList.remove('revealed');
      card2.card.classList.remove('revealed');
      card1.card.classList.add('hidden-text');
      card2.card.classList.add('hidden-text');
    }

    flippedCards = [];
    lockBoard = false;

    const remainingHiddenCards = document.querySelectorAll('.card.hidden-text');
    if (remainingHiddenCards.length === 0) {
      alert(`Congratulations! You've matched all cards. Your final score: ${points}`);
    }
  }

  function shuffleArray(array) {
    return array.slice().sort(() => 0.5 - Math.random());
  }
});
