const cities = [
    'Prague', 'London', 'Vancouver', 'Sydney',
    'Rome', 'Tokyo', 'Berlin', 'Amsterdam', 'Barcelona', 'Vienna'
];

let pairs = cities.concat(cities);
pairs.sort(() => 0.5 - Math.random());//shuffling the list

const gameField = document.getElementById('game-field');
const pointsDisplay = document.getElementById('points');
let points = 0;
let flippedCard = null;
let flippedCount = 0;

pairs.forEach((city, index) => {
    const card = document.createElement('div');
    card.classList.add('card');
    card.innerText = city;

    card.addEventListener('click', () => {
        if (!card.classList.contains('flipped') && flippedCard !== card) {
            card.classList.add('flipped');
            if (flippedCard) {
                if (flippedCard.innerText === card.innerText) {
                    points++;
                    pointsDisplay.innerText = points;
                    flippedCard = null;
                    flippedCount += 2;
                    if (flippedCount === pairs.length) {
                        setTimeout(() => {
                            alert(`Game Over! Total Points: ${points}`);
                        }, 500);
                    }
                    document.querySelectorAll('.flipped').forEach(matchedCard => {
                        if (matchedCard.innerText === card.innerText) {
                            matchedCard.style.backgroundColor = 'lime';
                        }
                    });
                } else {
                    if (points > 0) {
                        points--;
                        pointsDisplay.innerText = points;
                    }
                    setTimeout(() => {
                        card.classList.remove('flipped');
                        flippedCard.classList.remove('flipped');
                        flippedCard = null;
                    }, 1000);
                }
            } else {
                flippedCard = card;
            }
        }
    });

    gameField.appendChild(card);
});
