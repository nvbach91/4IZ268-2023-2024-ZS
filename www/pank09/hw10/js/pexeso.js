const Pexeso = {

    cities: ['Madrid', 'Helsinki', 'Hanoi', 'Peking', 'Havana', 'Moscow', 'Hamburg', 'Paris', 'Mexico city', 'Ottawa'],
    board: null,
    flippedCards: [],
    matchedPairs: 0,
    score: 0,
    scoreContainer: null,

    setBoardContainer(selector) {
        this.boardContainer = document.querySelector(selector);
        return this;
    },

    setScoreContainer(selector) {
        this.scoreContainer = document.querySelector(selector);
        return this;
    },

    init() {
        if (!this.boardContainer || !this.scoreContainer) {
            console.error(`It is necessary to setBoardContainer and setScoreContainer.`);
            return;
        }

        this.fillBoard();
    },

    fillBoard() {
        this.prepareCities();

        this.cities.forEach(city => {
            this.createCard(city);
        });
    },

    createCard(city) {
        var card = document.createElement('div');
            card.classList.add('card');
            card.addEventListener('click', () => {
                this.flipCard(card, city);
            });
        this.boardContainer.append(card);
    },

    flipCard(card, city) {
        if (card.classList.contains('is-flipped') || this.flippedCards.length >= 2)
            return;

        card.classList.add('is-flipped');
        card.innerText = city;

        this.flippedCards.push({ card, city });

        if (this.flippedCards.length === 2)
            setTimeout(() => this.checkMatch(), 500);
    },

    checkMatch() {
        const [card1, card2] = this.flippedCards;

        if (card1.city === card2.city) {
            this.matchedPairs++;
            this.updateScore(this.score + 1);
            if (this.matchedPairs === this.cities.length / 2) {
                alert(`Congratulations! Your score is ${this.score}`);
            }
            card1.card.classList.add('is-matched');
            card2.card.classList.add('is-matched');
        } else {
            setTimeout(() => {
                this.updateScore(this.score - 1);
                card1.card.classList.remove('is-flipped');
                card1.card.innerText = '';
                card2.card.classList.remove('is-flipped');
                card2.card.innerText = '';
            }, 500);
        }

        this.flippedCards = [];
    },

    updateScore(newScore) {
        this.score = Math.max(0, newScore);
        if (this.scoreContainer)
            this.scoreContainer.innerText = this.score;
    },

    prepareCities() {
        this.cities = this.cities.concat(this.cities);
        this.cities.sort(function() {
          return 0.5 - Math.random();
        });
    }
}

Pexeso.setBoardContainer('#pexeso')
    .setScoreContainer('.score')
    .init();