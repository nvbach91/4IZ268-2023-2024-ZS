/**
 * Memorama, Match Match, Match Up, Memory, Pelmanism, Shinkei-suijaku, Pexeso or simply Pairs
 */

const gameArea = document.querySelector('#game-field');
const pointArea = document.querySelector('#points');
let points = 0;
let correctCount = 0;

let cardOne = null;
let cardTwo = null;


const handleCardTurn = (triggerCard) => {

  if (triggerCard.classList.contains('revealed') || triggerCard.classList.contains('correct')) {
    return;
  }

  if (cardOne && cardTwo) {
    return;
  }

  triggerCard.classList.add('revealed');

  if (cardOne == null) {
    cardOne = triggerCard;
    return;
  }
  cardTwo = triggerCard;

  if (cardOne.innerText === cardTwo.innerText) {
    points++;
    correctCount += 2;
    cardOne.classList.add('correct');
    cardTwo.classList.add('correct');
    cardOne = null;
    cardTwo = null;
    if (correctCount === countries.length) {
      setTimeout(() => {
        alert('GG! Final score is: ' + points + ' points!');
      }, 500);
    }
  } else {
    points--;
    points = (points < 0) ? 0 : points;

    setTimeout(() => {
      cardOne.classList.remove('revealed');
      cardTwo.classList.remove('revealed');
      cardOne = null;
      cardTwo = null;
    }, 1000);
  }

  pointArea.innerText = points;

}


let countries = [
  "Austria",
  "Belgium",
  "Bulgaria",
  "Croatia",
  "Republic of Cyprus",
  "Czech Republic",
  "Denmark",
  "Estonia",
  "Finland",
  "France",
  "Germany",
  "Greece",
  "Hungary",
  "Ireland",
  "Italy",
  "Latvia",
  "Lithuania",
  "Luxembourg",
  "Malta",
  "Netherlands",
  "Poland",
  "Portugal",
  "Romania",
  "Slovakia",
  "Slovenia",
  "Spain",
  "Sweden"
];
countries = countries.concat(countries);
countries.sort(() => {
  return 0.5 - Math.random();
});

const createCard = (name) => {
  let card = document.createElement('div');
  card.classList.add('card');
  card.innerText = name;
  card.addEventListener('click', () => handleCardTurn(card));
  gameArea.appendChild(card);
}

countries.forEach(country => {
  createCard(country);
});