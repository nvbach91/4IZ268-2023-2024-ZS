document.addEventListener('DOMContentLoaded', function () {
    const gameField = document.getElementById('game-field');
    const pointsDisplay = document.getElementById('points');
    
    let cities = ['Prague', 'London', 'Paris', 'Moscow', 'Barcelona', 'Vancouver', 'Sydney', 'Berlin', 'New York', 'Tokyo'];
    cities = cities.concat(cities);
    cities.sort(() => 0.5 - Math.random());

    let points = 0;
    let flippedCards = [];
    let locked = false;

    function createCard(city) {
        const card = document.createElement('div');
        card.classList.add('card');
        card.innerText = city;
        card.addEventListener('click', () => flipCard(card, city));
        return card;
    }

    function flipCard(card, city) {
        if (locked) return;
        
        card.classList.add('flip');
        flippedCards.push({ card, city });

        if (flippedCards.length === 2) {
            locked = true;
            setTimeout(checkMatch, 1000);
        }
    }

    function checkMatch() {
        const [card1, card2] = flippedCards;
        if (card1.city === card2.city) {
            points++;
            updatePoints();
            flippedCards = [];
        } else {
            card1.card.classList.remove('flip');
            card2.card.classList.remove('flip');
            flippedCards = [];
        }
        locked = false;

        if (points === cities.length / 2) {
            endGame();
        }
    }

    function updatePoints() {
        pointsDisplay.textContent = points;
    }

    function endGame() {
        alert('Congratulations! You have matched all the cards. Your final score is: ' + points);
    }

    function initializeGame() {
        for (let i = 0; i < cities.length; i++) {
            const card = createCard(cities[i]);
            gameField.appendChild(card);
        }
    }

    initializeGame();
});
