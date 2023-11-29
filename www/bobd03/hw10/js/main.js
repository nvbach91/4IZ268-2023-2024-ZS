/**
 * Memorama, Match Match, Match Up, Memory, Pelmanism, Shinkei-suijaku, Pexeso or simply Pairs
 */

let checkCardMatch = (card) => {
  if(lastCards[0].textContent == lastCards[1].textContent) {
    points += 1;
  }
  else
  {
    points -= 1;
    if(points < 0)
      points = 0;
    lastCards[0].classList.remove('revealed');
    lastCards[1].classList.remove('revealed');
    flipped.pop(card);
    flipped.pop(card);
  }
  lastCards[0] = null;
  lastCards[1] = null;
}


let createCard = (city) => {
  const card = document.createElement('div');
  card.classList.add('card');
  card.textContent = city;
  card.addEventListener('click', () => {
    if(card.classList.contains('revealed')) {
      return false;
    }    
    if(lastCards[0] != null && lastCards[1] != null) {
      return false;
    }
    if(move == 0) {
      card.classList.add('revealed');
      flipped.push(card);
      lastCards[0] = card;
      move += 1;
      return false
    }
    lastCards[1] = card
    card.classList.add('revealed'); //problém - výhra před udělením posledního bodu
    flipped.push(card);
    move += 1;
    if(move == 2) {
      setTimeout(() => {
        move = 0;
        checkCardMatch(card);
        pointField.textContent = points;

        if(flipped.length == cities.length) {
          alert(`You have won the game. Your score: ${points}`);
          setTimeout(() => {
            location.reload();
          }, 1000);
        }

      }, 1000);
    }
  });

  gameField.appendChild(card);
}


const citiesBase = ['Prague', 'Ottawa', 'Washington D.C.', 'Mexico city', 'Paris', 'London', 'Berlin', 'Madrid', 'Moscow', 'Tokyo']
let cities = citiesBase;
cities = cities.concat(cities);
cities.sort(() => {
  return 0.5 - Math.random();
});
console.log(cities);

const pointField = document.querySelector('#points');
const gameField = document.querySelector('#game-field');

let points = 0;
let move = 0;
let flipped = [];
let lastCards = [];
lastCards[0] = null;
lastCards[1] = null;

cities.forEach(city => {
  createCard(city);
});
