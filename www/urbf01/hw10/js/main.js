let score = 0,
  firstCard = null,
  secondCard = null,
  revealedCards = 0;

const game = document.querySelector("#game-field");
const points = document.querySelector("#points");

let cities = ["Tokyo", "Warsaw", "Istanbul", "Berlin", "London", "Paris", "Rome", "Vienna", "Amsterdam", "Oslo"];
cities = cities.concat(cities);
cities.sort(() => {
  return 0.5 - Math.random();
});

function cardClicked() {
  if ((firstCard && secondCard) || this.classList.contains("revealed")) {
    return;
  }

  this.classList.add("revealed");

  if (!firstCard) {
    firstCard = this;
    return;
  }

  secondCard = this;

  if (firstCard.dataset.city === secondCard.dataset.city) {
    score++;
    revealedCards += 2;
    resetBoard();
  } else {
    if (score > 0) {
      score--;
    }

    setTimeout(() => {
      firstCard.classList.remove("revealed");
      secondCard.classList.remove("revealed");
      resetBoard();
    }, 1000);
  }
}

function resetBoard() {
  [firstCard, secondCard] = [null, null];
  points.innerText = score;

  setTimeout(() => {
    checkWin();
  }, 1000);
}

function checkWin() {
  if (revealedCards === cities.length) {
    alert("You won! Score: " + score);
  }
}

cities.map((city) => {
  const card = document.createElement("div");
  card.classList.add("card");
  card.innerText = city;
  card.dataset.city = city;
  card.addEventListener("click", cardClicked);
  game.appendChild(card);
});
