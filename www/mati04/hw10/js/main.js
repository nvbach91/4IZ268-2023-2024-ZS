document.addEventListener('DOMContentLoaded', () => {
    const cities = ['Praha', 'Brno', 'Plzeň', 'Cheb', 'Olomouc', 'Ostrava', 'Znojmo', 'Otrokovice', 'Sokolov', 'Liberec'];
    const cards = cities.concat(cities).sort(() => 0.5 - Math.random());
    let first = null;
    let second = null;
    let revealedPairs = 0;
    let points = 0;
    const maxPairs = cities.length;
    let canFlip = true;
  
    const createCard = (value, index) => {
      const card = document.createElement('div');
      card.className = 'card';
      card.addEventListener('click', () => flipCard(index));
      return card;
    };
  
    const initGame = () => {
      const gameField = document.getElementById('game-field');
  
      const cardElements = cards.map((value, index) => createCard(value, index));
      const gameBoardArray = [];
      cardElements.forEach(card => {
        gameBoardArray.push(card);
      });
  
      gameField.append(...gameBoardArray);
    };
  
    const flipCard = index => {
      if (!canFlip || revealedPairs === maxPairs) {
        return;
      }
  
      const card = document.getElementsByClassName('card')[index];
  
      if (card.classList.contains('revealed') || card.classList.contains('correct')) {
        return;
      }
  
      card.classList.add('revealed');
      card.textContent = cards[index];
  
      if (!first) {
        first = { index, value: cards[index] };
      } else {
        second = { index, value: cards[index] };
  
        if (first.value === second.value) {
          revealedPairs++;
          first = null;
          second = null;
          updatePoints(1); // Přičíst jeden bod za nalezený pár
          if (revealedPairs === maxPairs) {
            setTimeout(() => {
                updateScore();
                alert(`Gratulace! Hra skončila. Počet získaných bodů: ${points}`);
            }, 200)
          }
        } else {
          canFlip = false;
          updatePoints(-1); // Odečíst jeden bod za nesprávný pár
          setTimeout(() => {
            flipBack(first.index);
            flipBack(second.index);
            first = null;
            second = null;
            canFlip = true;
          }, 1000);
        }
      }
  
      updateScore();
    };
  
    const flipBack = index => {
      const card = document.getElementsByClassName('card')[index];
      card.classList.remove('revealed');
    };
  
    const updateScore = () => {
      const pointsElement = document.getElementById('points');
      pointsElement.textContent = `${points} / ${maxPairs}`;
    };
  
    const updatePoints = amount => {
      points = (points + amount >= 0) ? points + amount : 0;
    };
  
    initGame();
    updateScore();
  });