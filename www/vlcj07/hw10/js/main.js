let fruits = ['apple', 'banana', 'pear', 'apricot', 'avocado', 'blueberry', 'grapes', 'kiwi', 'orange', 'strawberry'];
fruits = fruits.concat(fruits);
fruits.sort(() => 0.5 - Math.random());

let textArea = document.body.appendChild(document.createElement('div'));
textArea.classList.add('text-area');

let playground = document.body.appendChild(document.createElement('div'));
playground.classList.add('playground');

let heading = textArea.appendChild(document.createElement('h1'));
heading.classList.add('heading');
heading.innerText = 'Fruits pexeso';

let pointsCounter = textArea.appendChild(document.createElement('p'));
pointsCounter.classList.add('point-counter');
let points = 0;
pointsCounter.innerText = `Points: ${points}`;

let firstCard = null;
let activeCards = 0;

const cardClick = (card) => {
    if (activeCards < 2 && !card.classList.contains('card-active') && !card.classList.contains('card-matched')) {
        card.classList.add('card-active');
        activeCards++;

        if (!firstCard) {
            firstCard = card;
        } else {
            if (firstCard.innerText === card.innerText) {
                firstCard.classList.add('card-matched');
                card.classList.add('card-matched');

                firstCard.classList.remove('card-active');
                card.classList.remove('card-active');
                firstCard = null;
                activeCards = 0;
                points++;
                if (points === 10) {
                    pointsCounter.innerText = `Good job! 🍌🍉🥑`;
                } else {
                    pointsCounter.innerText = `Points: ${points}`;
                }
            } else {
                setTimeout(() => {
                    card.classList.remove('card-active');
                    firstCard.classList.remove('card-active');
                    firstCard = null;
                    activeCards = 0;
                }, 2000);
            }
        }
    }
};

const cards = [];

for (let i = 0; i < 20; i++) {
    let card = document.createElement('div');
    card.classList.add('card');

    card.innerText = fruits[i];
    card.addEventListener('click', () => cardClick(card));

    cards.push(card);
}

playground.append(...cards,);
