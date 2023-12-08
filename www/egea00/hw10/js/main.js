const numberOfCards = 20;

const cityNames = ['Praha', 'Plzeň', 'Brno', 'Ostrava', 'Olomouc', 'Liberec', 'Hradec Králové', 'České Budějovice', 'Ústí nad Labem', 'Pardubice', 'Karlovy Vary', 'Jihlava','Zlín', 'Warszawa', 'Kraków', 'Katowice', 'Poznań', 'Lublin', 'Rzeszów', 'Gdańsk', 'Gdynia', 'Sopoty', 'Bielsko-Biała', 'Białstok', 'Zakopane', 'Wrocław', 'Łódź', 'Bydgoszcz', 'Olsztyn', 'Bratislava', 'Žilina', 'Zvolen', 'Banská Bysrica', 'Trenčín', 'Nitra', 'Trnava', 'Prešov', 'Poprad', 'Košice', 'Budapest', 'Debrecen', 'Szeged', 'Miskolc', 'Pécs', 'Győr', 'Szolnok', 'Veszprém', 'Eger', 'Vác', 'Orosháza', 'Visegrád'];

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

let cards = [];
function initializeCards() {
    shuffleArray(cityNames);
    const selectedCities = cityNames.slice(0, (numberOfCards / 2));
    cards = selectedCities.reduce((acc, city) => acc.concat([{ city, matched: false }, { city, matched: false }]), []);
    shuffleArray(cards);
}

const gameBoard = document.getElementById('game-field');
gameBoard.style.display = 'flex';
gameBoard.style.flexWrap = 'wrap';
gameBoard.style.justifyContent = 'center';

let selectedCard = null;
let points = 0;
let canPlay = false;
let matchesFound = 0;
let isFlipping = false;


function createCardElement(card) {
    const cardContainer = document.createElement('div');
    cardContainer.classList.add('card-container');

    const cardElement = document.createElement('div');
    cardElement.classList.add('card');

    // Create the front side
    const frontSide = document.createElement('div');
    frontSide.classList.add('card-front');
    frontSide.textContent = card.city;

    // Create the back side
    const backSide = document.createElement('div');
    backSide.classList.add('card-back');

    cardElement.appendChild(frontSide);
    cardElement.appendChild(backSide);
    cardContainer.appendChild(cardElement);

    return { cardContainer, cardElement };
}

function handleCardClick(card, cardElement) {
    if (!canPlay || card.matched || isFlipping || (selectedCard && selectedCard.cardElement === cardElement)) {
        return;
    }

    cardElement.classList.add('flip');
    isFlipping = true;

    if (!selectedCard) {
        selectedCard = { card, cardElement };
        isFlipping = false; // Allow another card to be flipped immediately
    } else {
        if (selectedCard.card.city === card.city) {
            // Cards match
            selectedCard.card.matched = true;
            card.matched = true;
            points++;
            matchesFound += 2;
            document.getElementById('points').textContent = points;
            selectedCard.cardElement.classList.add('matched');
            cardElement.classList.add('matched');

            if (matchesFound === cards.length) {
                setTimeout(restartGame, 2000);
            }

            selectedCard = null;
            isFlipping = false; // Allow another card to be flipped immediately
        } else {
            // Cards do not match
            setTimeout(() => {
                selectedCard.cardElement.classList.remove('flip');
                cardElement.classList.remove('flip');
                selectedCard = null;
                isFlipping = false; // Allow another card to be flipped after the delay

                // Deduct a point for a wrong guess, but don't go below 0
                if (points > 0) {
                    points--;
                    document.getElementById('points').textContent = points;
                }
            }, 1000); // Keep the cards visible for 1 second before flipping back
        }
    }
}

function restartGame() {
    gameBoard.innerHTML = '';
    points = 0;
    matchesFound = 0;
    document.getElementById('points').textContent = points;
    initializeCards();
    startGame();
}

function startGame() {
    canPlay = false;

    for (const card of cards) {
        const { cardContainer, cardElement } = createCardElement(card);
        cardContainer.addEventListener('click', () => handleCardClick(card, cardElement));
        gameBoard.appendChild(cardContainer);
    }

    setTimeout(() => {
        canPlay = true;
    }, 2000);
}

initializeCards();
startGame();
