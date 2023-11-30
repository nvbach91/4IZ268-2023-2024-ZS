/**
 * Memorama, Match Match, Match Up, Memory, Pelmanism, Shinkei-suijaku, Pexeso or simply Pairs
 */

let cities = ['Prague', 'London', 'Paris', 'Moscow', 'Vancouver', 'Sydney', 'Riga', 'Reykjvik', 'Oslo', 'Tallinn'];
cities = cities.concat(cities);
cities.sort(() => { 
    return 0.5 - Math.random(); 
});

let firstCard = null;
let secondCard = null;
let pairsFound = 0;
let score = 0;
let preventClick = false;
let foundPairs = [];

const gameField = document.querySelector('#game-field');
const points = document.querySelector('#points');

cities.forEach(city => {
  const card = document.createElement('div');
  card.classList.add('card');
  card.innerText = city;
  card.addEventListener('click', () => {
    if (preventClick || card === firstCard) return;
    if (!firstCard) {
      firstCard = card;
      card.classList.add('revealed');
    } else if (!secondCard) {
      secondCard = card;
      card.classList.add('revealed');
      if (firstCard.innerText === secondCard.innerText) {
        score++;
        pairsFound++;
        firstCard = null;
        secondCard = null;
        if (pairsFound === cities.length / 2) {
          alert(`Game over! Your score is ${score}.`);
        }
      } else {
        score = Math.max(score - 1, 0);
        preventClick = true;
        setTimeout(() => {
          firstCard.classList.remove('revealed');
          secondCard.classList.remove('revealed');
          firstCard = null;
          secondCard = null;
          preventClick = false;
        }, 1000);
      }
      points.innerText = score;
    }
  });
  gameField.appendChild(card);
});



