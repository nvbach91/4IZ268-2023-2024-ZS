/**
 * Memorama, Match Match, Match Up, Memory, Pelmanism, Shinkei-suijaku, Pexeso or simply Pairs
 */

document.addEventListener('DOMContentLoaded', function () {
  let cities = ['Acapulco', 'Bitola', 'Calabar', 'Delhi', 'Faro', 'Honolulu', 'Khost', 'Lima', 'Macau', 'Nazret'];
  cities = cities.concat(cities);
  cities.sort(() => {
    return 0.5 - Math.random();
  });

  let points = 0;
  let flippedCards = [];
  let blocked = false;

  const createCard = (city) => {
    const card = document.createElement('div');
    card.classList.add('card');
    card.setAttribute('data-city', city);
    card.addEventListener('click', () => {
      if (!blocked && !card.classList.contains('revealed') && flippedCards.length < 2) {
        flipCard(card);
        flippedCards.push(card);
        if (flippedCards.length === 2) {
          blocked = true;
          setTimeout(checkMatch, 1000);
        }
      }
    });
    const gameField = document.getElementById('game-field');
    gameField.appendChild(card);
  }

  const flipCard = (card) => {
    card.classList.add('revealed');
    card.textContent = card.getAttribute('data-city');
  }

  const checkMatch = () => {
    const [card1, card2] = flippedCards;
    if (card1.getAttribute('data-city') === card2.getAttribute('data-city')) {
      points++;
      card1.removeEventListener('click', () => { });
      card2.removeEventListener('click', () => { });
    } else {
      points = Math.max(0, points - 1);
      card1.classList.remove('revealed');
      card2.classList.remove('revealed');
      card1.textContent = '';
      card2.textContent = '';
    }
    flippedCards = [];
    blocked = false;
    updatePoints();
    checkEndGame();
  }

  const updatePoints = () => {
    const pointsElement = document.getElementById('points');
    pointsElement.innerText = points;
  }

  const checkEndGame = () => {
    const revealedCards = document.querySelectorAll('.card.revealed');
    if (revealedCards.length === cities.length) {
      endGame();
    }
  }

  const endGame = () => {
    const pointsElement = document.getElementById('points');
    alert(`Congratulations! You've earned ${points} points.`);
    // Zde můžeš přidat další logiku, jak restartovat hru nebo zobrazit výsledky.
  }

  cities.forEach(city => createCard(city));
});
