const createSpaceForPexeso = () => {
    const spaceForPexeso = document.createElement('div');
    spaceForPexeso.classList.add('space');

    const rows = document.createElement('div');
    rows.classList.add('row');

    let points = 0;
    const pointCounter = document.createElement('div');
    pointCounter.classList.add('counter');
    pointCounter.textContent = 'Počet bodů: ' + points;

    const startGameButton = document.createElement('button');
    startGameButton.classList.add('start-button');
    startGameButton.textContent = 'Začni hru.';

    startGameButton.addEventListener('click', () => {
        rows.innerHTML = '';
        startGame();
        });

    let states = ['Canada', 'United Kingdom', 'France', 'Mexico', 'Japan', 'India', 'Australia', 'Uruguay', 'Moldavia', 'China'];
        states = states.concat(states);
    
    const startGame = () => {
        states.sort(() => { return 0.5 - Math.random(); });
        states.forEach((state) => {
            const pexeso = createPexeso(state);
        });
    };

    const createPexeso = (state) => {
        const card = document.createElement('div');
        card.classList.add('cards-hidden');
        card.textContent = state;
        card.addEventListener('click', () => cardClick(card));
        rows.append(card);
    }
    
    let flippedCards = [];
    const pexesoElementsToWin = [];

    const cardClick = (card) => {
        if (flippedCards.length === 2 || !card.classList.contains('cards-hidden')) {
            return void 0;
        } else {
            card.classList.remove('cards-hidden');
            card.classList.add('turned');
            flippedCards.push(card);
    
            if (flippedCards.length === 2) {
                const firstCard = flippedCards[0];
                const secondCard = flippedCards[1];
    
                if (firstCard.textContent === secondCard.textContent) {
                    flippedCards.forEach((card) => card.classList.remove('turned'));
                    flippedCards.forEach((card) => card.classList.add('matched'));
                    points += 1;
                    pexesoElementsToWin.push(firstCard, secondCard);
                    if (pexesoElementsToWin.length === 20) {
                        const winner = document.createElement('div');
                        winner.classList.add('win');
                        winner.textContent = 'Vyhráli jste!';
                        spaceForPexeso.append(winner);                    
                    }
                } else {
                    const turningDown = (flippedCards) => {flippedCards.forEach((card) => card.classList.remove('turned'));};
                    setTimeout(turningDown, 1500, flippedCards);
                    flippedCards.forEach((card) => card.classList.add('cards-hidden'));
                    points = Math.max(points - 1, 0);
                }
                setTimeout(function() {flippedCards = [];}, 2000);
            }
        } 
        const updatePointCounter = () => {
            pointCounter.textContent = 'Počet bodů: ' + points;
        };
        updatePointCounter();
    };
    
    
    spaceForPexeso.append(pointCounter, startGameButton, rows);
    return spaceForPexeso
}
const appContainer = document.querySelector('#app');

const space = createSpaceForPexeso();

appContainer.append(space);