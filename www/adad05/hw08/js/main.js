/**
 * Memorama, Match Match, Match Up, Memory, Pelmanism, Shinkei-suijaku, Pexeso or simply Pairs
 */

const points = document.querySelector('#points');
const playground = document.querySelector('#game-field');
cities = ['prague.jpg', 'barcelona.jpg', 'amsterdam.jpg', 'budapest.jpg', 'edinburgh.jpg', 'london.jpg', 'neworleans.jpg', 'newyork.jpg', 'paris.jpg', 'rome.jpg'];
cities = cities.concat(cities);
const citiesFinal = cities.sort(() => {
    return 0.5 - Math.random();
});
let revealed = [];

let score = 0;
let card1 = "";
let card2 = "";
let waiting = false;

const createCards = function () {
    citiesFinal.forEach((city) => {
        div = document.createElement('div');
        div.classList.add('card');
        img = document.createElement('img');
        img.setAttribute('alt', './images/' + city);
        img.setAttribute('src', './images/question-mark.png');
        img.addEventListener('click', function () {
            if (!waiting && !revealed.includes(this)) {
                if (card1 === "") {
                    this.setAttribute('src', this.getAttribute('alt'));
                    card1 = this;
                } else {
                    this.setAttribute('src', this.getAttribute('alt'));
                    card2 = this;
                    if (card1.getAttribute('alt') === card2.getAttribute('alt')) {
                        console.log("nice");
                        score = score + 1;
                        points.innerHTML = score;
                        revealed.push(card1);
                        revealed.push(card2);
                        console.log(revealed);
                        if (revealed.length === 20) {
                            setTimeout(() => {
                                alert("You won! Your score: " + score);
                            }, 500);
                        }
                        card1 = "";
                        card2 = "";
                    } else {
                        waiting = true;
                        console.log("ne - nice");
                        if (score > 0) {
                            score = score - 1;
                            points.innerHTML = score;
                        }
                        setTimeout(() => {
                            card1.setAttribute('src', './images/question-mark.png');
                            card2.setAttribute('src', './images/question-mark.png');
                            card1 = "";
                            card2 = "";
                            waiting = false;
                        }, 1000);
                    }
                }
            } else {
                return;
            }

        });
        playground.appendChild(div);
        div.appendChild(img);
    });
}

createCards()