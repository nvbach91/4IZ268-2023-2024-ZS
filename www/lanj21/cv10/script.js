// List of cities or any other theme you prefer
const cards = [
    'Prague', 'London', 'Paris', 'Moscow', 'California',
    'Vancouver', 'Sydney', 'New York', 'Tokyo', 'Berlin'
];

const gameContainer = document.getElementById('game-container');
let points = 0;
let selectedCards = [];
let highScore = localStorage.getItem('highScore') || 0;
const pointsDisplay = document.getElementById('points-display');
updatePointsDisplay();

// Duplicate the cards array to create pairs
const cardPairs = [...cards, ...cards];

// Shuffle the cards
cardPairs.sort(() => Math.random() - 0.5);

// ... (unchanged code)

// Create cards and add them to the game container
cardPairs.forEach((city, index) => {
    const card = document.createElement('div');
    card.classList.add('card');
    
    const cardInner = document.createElement('div');
    cardInner.classList.add('card-inner');
    
    const frontFace = document.createElement('div');
    frontFace.classList.add('card-face', 'back');
    frontFace.textContent = city;

    const backFace = document.createElement('div');
    backFace.classList.add('card-face', 'front');
    
    cardInner.appendChild(frontFace);
    cardInner.appendChild(backFace);
    card.appendChild(cardInner);

    card.dataset.index = index;
    card.addEventListener('click', flipCard);
    gameContainer.appendChild(card);
});

// ... (unchanged code)


// Handle card flipping
function flipCard() {
    const selectedCard = this;
    if (selectedCard.classList.contains('flipped') || selectedCards.length === 2) {
        return;
    }

    selectedCard.classList.add('flipped');
    selectedCards.push(selectedCard);

    if (selectedCards.length === 2) {
        setTimeout(checkMatch, 500);
    }
}

// Check if the selected cards match
function checkMatch() {
    const [card1, card2] = selectedCards;
    
    if (card1.textContent === card2.textContent) {
        points++;
        selectedCards = [];
    } else {
        card1.classList.remove('flipped');
        card2.classList.remove('flipped');
        points = Math.max(0, points - 1);
        selectedCards = [];
    }

    updatePointsDisplay();

    if (points === cards.length) {
        endGame();
    }
}

function updatePointsDisplay() {
    pointsDisplay.textContent = 'Points: ' + points;
}

function endGame() {
    alert('Game Over! Your total points: ' + points);

    if (points > highScore) {
        highScore = points;
        localStorage.setItem('highScore', highScore);
        alert('New High Score: ' + highScore);
    } else {
        alert('High Score: ' + highScore);
    }
}