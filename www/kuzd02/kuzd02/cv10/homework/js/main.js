/**
 * Memorama, Match Match, Match Up, Memory, Pelmanism, Shinkei-suijaku, Pexeso or simply Pairs
 */

let cities = [
  'Moscow',
  'New York',
  'Madrid',
  'Berlin',
  'Tokyo',
  'London',
  'Sydney',
  'Cairo',
  'Prague',
  'Istanbul'
];
cities = cities.concat(cities);
cities.sort(() => {
  return 0.5 - Math.random();
});

let firstCard = null;
let secondCard = null;
let points = 0;
let cardsToReveal = cities.length;

const gameFieldElem = document.querySelector('#game-field');
const pointsElem = document.querySelector('#points');

cities.forEach((city) => {
  const card = document.createElement('div');
  card.classList.add('card');
  card.innerText = city;
  card.addEventListener('click', () => {
    if (card.classList.contains('revealed') || (firstCard && secondCard)) {
      return;
    }
    card.classList.add('revealed');
    if (!firstCard) {
      firstCard = card;
      return;
    }
    secondCard = card;
    if (firstCard.innerText === secondCard.innerText) {
        points++;
        cardsToReveal--;
        if (cardsToReveal <= 0) {
          alert('You won!');
          return;
        }
        firstCard = null; 
        secondCard = null;
    }     
    else {
      if (points > 0) {
        points--
      }
      setTimeout(() => {
        firstCard.classList.remove('revealed');
        secondCard.classList.remove('revealed');
        firstCard = null; 
        secondCard = null;
      }, 500);
    }
    pointsElem.innerText = points;
  })
  gameFieldElem.appendChild(card);
});