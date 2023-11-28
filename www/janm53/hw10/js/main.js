document.addEventListener('DOMContentLoaded', () => {
    const cities = ['Prague', 'London', 'Paris', 'Moscow', 'California', 'Vancouver', 'Sydney', 'Tokyo', 'Berlin', 'Rome', 'Madrid', 'Lisbon', 'Beijing', 'Seoul', 'Istanbul', 'Dubai', 'New York', 'Los Angeles', 'Toronto', 'Brussels'];
    let gameField = document.getElementById('game-field');
    let pointsDisplay = document.getElementById('points');
    let points = 0;
    let firstCard = null;
    let secondCard = null;
    let freezeGame = false;

    // Prepare the game field
    function createCard(city) {
        let card = document.createElement('div');
        card.classList.add('card');
        card.dataset.city = city;
        card.addEventListener('click', revealCard);
        return card;
    }

    function setupGame() {
        let shuffledCities = cities.concat(cities).sort(() => 0.5 - Math.random());
        shuffledCities.forEach(city => {
            gameField.appendChild(createCard(city));
        });
    }

    function revealCard() {
        if (freezeGame || this === firstCard || this.classList.contains('revealed')) {
            return;
        }

        this.classList.add('revealed');
        this.innerText = this.dataset.city;

        if (!firstCard) {
            firstCard = this;
        } else {
            secondCard = this;
            checkForMatch();
        }
    }

    function checkForMatch() {
        let isMatch = firstCard.dataset.city === secondCard.dataset.city;

        if (isMatch) {
            points++;
            firstCard.removeEventListener('click', revealCard);
            secondCard.removeEventListener('click', revealCard);
            resetTurn();
        } else {
            points = Math.max(points - 1, 0);
            freezeGame = true;
            setTimeout(() => {
                firstCard.classList.remove('revealed');
                secondCard.classList.remove('revealed');
                firstCard.innerText = '';
                secondCard.innerText = '';
                resetTurn();
            }, 2000);
        }
        updatePointsDisplay();
    }

    function resetTurn() {
        [firstCard, secondCard] = [null, null];
        freezeGame = false;
    }

    function updatePointsDisplay() {
        pointsDisplay.innerText = points;
    }

    setupGame();
});
