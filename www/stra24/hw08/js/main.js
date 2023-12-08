/**
 * Memorama, Match Match, Match Up, Memory, Pelmanism, Shinkei-suijaku, Pexeso or simply Pairs
 */


var cities = ['Prague', 'London', 'Paris', 'Moscow', 'California','Vancouver','Sydney', 'Aachen', 'Opava', 'Lviv'];
cities = cities.concat(cities);
cities.sort(() => {
  return 0.5 - Math.random();
});

var selectedCard1 = ''
var selectedCard2 = ''
var revealedCards = 0
const scoreElement = document.getElementById('points')
var score = 0

const play = (card) => {
    if(selectedCard1=='' && selectedCard2=='')
    {
      card.classList.add('revealed');
      selectedCard1 = card
    }
    else if(selectedCard2 =='' && selectedCard1!=''){
      card.classList.add('revealed'); 
      selectedCard2 = card
      if (selectedCard1 != selectedCard2)
      {
        if(selectedCard1.innerText == selectedCard2.innerText)
        {
          score +=2
          revealedCards += 2
          scoreElement.innerText = score
          selectedCard1 = ''
          selectedCard2 = ''
          if(revealedCards==20)
          {
            scoreElement.innerText = "Congrats you won"
          }
        }
        else{
          setTimeout(function(){ 
          selectedCard1.classList.remove('revealed'); 
          selectedCard1 = ''; 
          selectedCard2.classList.remove('revealed');
          selectedCard2 = '';
          },1000)
          if(score-1 >= 0)
          {
            score -=1
            scoreElement.innerText = score
          }
        }
      }
    }
};

for (let index = 0; index < cities.length; index++) {
  let card = document.createElement('div');
  card.innerText = cities[index];
  card.classList.add('card');
  document.getElementById('game-field').appendChild(card);
  card.addEventListener('click', () => {play(card)
    ;})
}
