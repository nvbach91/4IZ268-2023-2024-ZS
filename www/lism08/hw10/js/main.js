/**
 * Memorama, Match Match, Match Up, Memory, Pelmanism, Shinkei-suijaku, Pexeso or simply Pairs
 */

let cities = ['Prague', 'Berlin', 'Helsinki', 'Stockholm', 'Lisabon', 'Madrid', 'London', 'Oslo', 'Roma', 'Bern'];
cities = cities.concat(cities);
cities.sort(() => {
  return 0.5 - Math.random();
});

let points = 0;
let card1 = null;
let card2 = null;
let round = false;

const createCard = (city) => {
  const card = document.createElement('div');
  card.classList.add('card');
  card.setAttribute('id', 'card');
  card.innerText = city;
  card.addEventListener('click', () => {   
    flipCard(card);
  });
  const gameField = document.getElementById('game-field');
  gameField.appendChild(card);
  
}

const flipCard = (card) => {
  if (round || card.classList.contains('flipped')) {
    return;
  }
  card.classList.add('flipped');
  if (card1 === null) {
    card1 = card;
  }
  else {
    card2 = card;
    round = true;
    setTimeout(match, 2000);
  }
  
}

const match = () => {
  if (card1.innerText === card2.innerText) {
    points++;
  } 
  else {
    if (points > 0 ) {
      points--;
    }
    card1.classList.remove('flipped');
    card2.classList.remove('flipped');
  }
  card1 = null;
  card2 = null;
  round = false;
  document.getElementById('points').innerText = points;
}

cities.forEach(city => {
  createCard(city);
})



