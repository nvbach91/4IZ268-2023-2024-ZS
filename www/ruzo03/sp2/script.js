    const playBoard = $(".play-board");
    const scoreElement = $(".score");
    const highScoreElement = $(".high-score");
    const controls = $(".controls i");
    var Chance
    
    let gameOver = false;
    let foodX, foodY;
    let snakeX = 5, snakeY = 5;
    let velocityX = 0, velocityY = 0;
    let snakeBody = [];
    let setIntervalId;
    let score = 0;
    var my_chance = new Chance();
    
    // Načtení nejvyššího skóre z local storage
    let highScore = localStorage.getItem("high-score") || 0;
    highScoreElement.text(`High Score: ${highScore}`);

    const updateFoodPosition = () => {
      // Náhodná hodnota pro umístění jídla
      //foodX = Math.floor(Math.random() * 90) + 1;
      //foodY = Math.floor(Math.random() * 60) + 1;
      foodX = Math.floor(my_chance.integer({ min: 2, max: 59 }))+1 ;
      foodY = Math.floor(my_chance.integer({ min: 2, max: 59 }))+1 ;
    };

    const handleGameOver = () => {
      // Vynulování počítadla a znovunačtení stránky po prohře
      clearInterval(setIntervalId);
      alert("Game Over! Press OK to replay...");
      location.reload();
    };

    const changeDirection = e => {
      // změna směru po zmáčknutí klávesy
      if (e.key === "ArrowUp" && velocityY != 1) {
        velocityX = 0;
        velocityY = -1;
      } else if (e.key === "ArrowDown" && velocityY != -1) {
        velocityX = 0;
        velocityY = 1;
      } else if (e.key === "ArrowLeft" && velocityX != 1) {
        velocityX = -1;
        velocityY = 0;
      } else if (e.key === "ArrowRight" && velocityX != -1) {
        velocityX = 1;
        velocityY = 0;
      }
    };

    // Volání changeDirection při každém on each key click and passing key dataset value as an object
    controls.on("click", function() {
      changeDirection({ key: $(this).data("key") });
    });

    const initGame = () => {
      if (gameOver) return handleGameOver();
      let html = `<div class="food" style="grid-area: ${foodY} / ${foodX}"></div>`;
      
      if (snakeX === foodX && snakeY === foodY) {
        updateFoodPosition();
        snakeBody.push([foodY, foodX]); // přidá tělo Snakovi
        score++; // přidá skóre o 1
        highScore = score >= highScore ? score : highScore;
        localStorage.setItem("high-score", highScore);
        scoreElement.innerText = `Score: ${score}`;
        highScoreElement.innerText = `High Score: ${highScore}`;
    }
    // pohyb Snaka vpřed
    snakeX += velocityX;
    snakeY += velocityY;

    // posun jednotlivých částí těla vpřed
    for (let i = snakeBody.length - 1; i > 0; i--) {
        snakeBody[i] = snakeBody[i - 1];
    }
    snakeBody[0] = [snakeX, snakeY]; // posune první část těla vpřed
    // Kontrola nárazu do zdi
    if (snakeX <= 0 || snakeX > 60 || snakeY <= 0 || snakeY > 60) {
        // nastaví konec hry
        return gameOver = true;
    }
    for (let i = 0; i < snakeBody.length; i++) {
        // přidá element div pro každou část těla
        html += `<div class="head" style="grid-area: ${snakeBody[i][1]} / ${snakeBody[i][0]}"></div>`;
        // Kontrola nárazu do těla
        if (i !== 0 && snakeBody[0][1] === snakeBody[i][1] && snakeBody[0][0] === snakeBody[i][0]) {
            // nastaví konec hry
            gameOver = true;
        }
    }

      playBoard.html(html);
    }
    updateFoodPosition();
    setIntervalId = setInterval(initGame, 100);
    document.addEventListener("keyup", changeDirection);
