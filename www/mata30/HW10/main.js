/**
 * Memorama, Match Match, Match Up, Memory, Pelmanism, Shinkei-suijaku, Pexeso or simply Pairs
 */
document.addEventListener('DOMContentLoaded', function () {
  const gameField = document.getElementById('game-field');
  const pointsDisplay = document.getElementById('points');

  let cities = ['Prague', 'Kyoto', 'Rome', 'Paris', 'Moscow', 'Barcelona', 'Helsinki', 'Stockholm', 'London', 'Berlin'];
  cities = cities.concat(cities);
  cities.sort(() => 0.5 - Math.random());

  let score = 0;
  let flippedCards = [];
  let unflippedCards = false;

  function makeCard(city) {
    const card = document.createElement('div');
    card.classList.add('card');
    card.innerText = city;
    card.addEventListener('click', () => flipCard(card, city));
    return card;
  }

  function flipCard(card, city) {
    if (unflippedCards) return;

    card.classList.add('flipped');
    flippedCards.push({ card, city });

    if (flippedCards.length === 2) {
      unflippedCards = true;
      setTimeout(updateGame, 2000);
    }
  }

  function updateGame() {
    const [card1, card2] = flippedCards;
    if (card1.city === card2.city) {
      score++;
      updatePoints();
      flippedCards = [];
    } else {
      card1.card.classList.remove('flipped');
      card2.card.classList.remove('flipped');
      flippedCards = [];
    }
    unflippedCards = false;

    if (score === cities.length / 2) {
      endGame();
    }
  }

  function updatePoints() {
    pointsDisplay.textContent = score;
  }

  function endGame() {
    alert('Game End. All cads have been matched. Your score: ' + score);
  }
  
  function initializeGame() {
    for (let i = 0; i < cities.length; i++) {
      const card = makeCard(cities[i]);
      gameField.appendChild(card);
    }
  }

  initializeGame();
});