/*INITIALIZE*/
let cities = ['Fentanyl', 'Morphine', 'Heroin', 'Methadone', 'Weed', 'Alcohol', 'MDMA', 'Cocaine', 'Crack', 'DMT', 'LSD', 'Shrooms'];
cities = cities.concat(cities);
cities.sort(() => {
  return 0.5 - Math.random();
});

let fCard = null;
let sCard = null;
let points = 0;
let cardsRevealed = 0;

let gameField = document.querySelector('#game-field');
let pointsContainer = document.querySelector('#points');

let bindCard = function(card) {
    card.addEventListener('click', function() {

      if (card.classList.contains('revealed')) {
        return false;
      }
      if (fCard && sCard) {
        return false;
      }

      // reveal the card through class attribut
      card.classList.add('revealed');
  
      if (!fCard) {
        fCard = card;
        return false;
      }
      sCard = card;
  
      // if all cards are opened -> win
      if (fCard.innerText === sCard.innerText) {
          points++;
          cardsRevealed += 2;
          fCard = null;
          sCard = null;
          if (cardsRevealed === cities.length) {
              setTimeout(function() {
                  alert('Congratulations! You won!');
              }, 500);
          }
      }     
      else {
          setTimeout(function() {
              fCard.classList.remove('revealed');
              sCard.classList.remove('revealed');
              fCard = null;
              sCard = null;
          }, 500);
      }
      pointsContainer.innerText = points;
    });
  };

let addCard = function(name) {
    let card = document.createElement('div');
    card.classList.add('card');
    card.innerText = name;
    bindCard(card);
    gameField.appendChild(card);
};
  
cities.forEach(function(city) {
    addCard(city);
});