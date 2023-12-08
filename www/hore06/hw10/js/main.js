
var cards = ['Prague', 'Rome', 'Berlin', 'Vienna', 'London', 'Oslo', 'Bratislava', 'Paris', 'Madrid', 'Zagreb'];


cards = cards.concat(cards);


function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;


    while (0 !== currentIndex) {


        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;


        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

cards = shuffle(cards);


var gameField = document.getElementById("game-field");
var points = document.getElementById("points");


var firstCard = null;
var secondCard = null;
var score = 0;
var pairsFound = 0;


function createCard(cardText) {

    var card = document.createElement("div");
    card.classList.add("card-incorrect");


    var cardTextElement = document.createElement("p");
    cardTextElement.textContent = cardText;
    card.appendChild(cardTextElement);


    cardTextElement.style.visibility = "hidden";


    return card;
}


function playGame(card) {

    card.addEventListener("click", function () {

        if (card.classList.contains("flipped") || card.classList.contains("found")) {
            return;
        }


        if (firstCard === null) {
            firstCard = card;
            card.classList.add("flipped");

            card.children[0].style.visibility = "visible";
        }

        else if (secondCard === null) {
            secondCard = card;
            card.classList.add("flipped");

            card.children[0].style.visibility = "visible";

            if (firstCard.textContent === secondCard.textContent) {

                firstCard.classList.add("found");
                secondCard.classList.add("found");
                firstCard.classList.add('card-correct');
                secondCard.classList.add('card-correct');



                score++;
                pairsFound++;


                points.textContent = score;


                if (pairsFound === cards.length / 2) {

                    score++;
                    firstCard.classList.add('card-correct');
                    secondCard.classList.add('card-correct');
                    
                    
                    setTimeout(() => {
                        score++;
                        alert(`Gratulace! Hra skončila. Počet získaných bodů: ${score}`);
                    }, 200)
                }


                firstCard = null;
                secondCard = null;
            }
            else {

                if (score > 0) {
                    score--;
                }


                points.textContent = score;


                setTimeout(function () {
                    firstCard.classList.remove("flipped");
                    secondCard.classList.remove("flipped");

                    firstCard.children[0].style.visibility = "hidden";
                    secondCard.children[0].style.visibility = "hidden";


                    firstCard = null;
                    secondCard = null;
                }, 1000);
            }
        }
    });
}


var cardList = [];


for (var i = 0; i < cards.length; i++) {
    var card = createCard(cards[i]);
    cardList.push(card);
}


gameField.append(...cardList);


for (var i = 0; i < cardList.length; i++) {
    playGame(cardList[i]);
}
