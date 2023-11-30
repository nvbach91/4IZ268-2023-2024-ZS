let cities = [
  'Prague', 'London', 'Paris', 'Moscow', 'California',
  'Vancouver', 'Sydney', 'New York', 'Tokyo', 'Berlin',
  'Rome', 'Beijing', 'Cairo', 'Madrid', 'Dubai',
  'Athens', 'Vienna', 'Amsterdam', 'Stockholm', 'Oslo'
];;
cities = cities.concat(cities);
cities.sort(() => { return 0.5 - Math.random(); });

let score = 0;
let firstCard = null;
let secondCard = null;
let correctPairs = 0;

function createCard(city) {
    let card = document.createElement('div');
    card.classList.add('card');
    card.innerText = city;
    card.addEventListener('click', flipCard);
    document.getElementById('game-field').appendChild(card);
}

function flipCard() {
    if (firstCard && secondCard) return;
    this.classList.add('flipped');
    if (!firstCard) {
        firstCard = this;
    } else {
        secondCard = this;
        checkForMatch();
    }
}

function checkForMatch() {
    if (firstCard.innerText === secondCard.innerText) {
        score++;
        correctPairs++;
        firstCard = null;
        secondCard = null;
        if (correctPairs === cities.length / 2) {
            alert(`Game over! Your score: ${score}`);
        }
    } else {
        score = Math.max(score - 1, 0);
        setTimeout(resetCards, 2000);
    }
    document.getElementById('score').innerText = `Score: ${score}`;
}

function resetCards() {
    firstCard.classList.remove('flipped');
    secondCard.classList.remove('flipped');
    firstCard = null;
    secondCard = null;
}

cities.forEach(createCard);