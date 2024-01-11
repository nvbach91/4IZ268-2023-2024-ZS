const firebaseConfig = {
    apiKey: 'AIzaSyBoi-qZ84DkgvWvyfQI2h59ip1Ku7oyGbk',
    authDomain: 'snake2-cc1a1.firebaseapp.com',
    projectId: 'snake2-cc1a1',
    storageBucket: 'snake2-cc1a1.appspot.com',
    messagingSenderId: '921758460549',
    appId: '1:921758460549:web:8492540ad81cebb4bbd7ec',
    measurementId: 'G-CG484NK4R2'
};
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
const canvas = document.getElementById('game');
const ctx = canvas.getContext('2d');
const backgroundImage = new Image();
backgroundImage.src = 'img/background.jpg';
const ateSound = new Audio('sounds/ate.mp3');
const gameoverSound = new Audio('sounds/gameover.wav');


let speed, tileCount, tileSize, headX, headY, foodX, foodY, over, gameStarted, 
xspeed, yspeed, speedIncreased, speedFrame, highscore, snakebody, snaketail, 
prevspeedX, prevspeedY, foodTimeout, bonusFoodTimeout, bonusFoodX, bonusFoodY;

function startGame() {
    speed = 4;
    tileCount = 20;
    tileSize = canvas.width / tileCount - 0.5;
    headX = 10;
    headY = 10;
    foodX = Math.floor(Math.random() * tileCount);
    foodY = Math.floor(Math.random() * tileCount);
    over = false; // Start of the game can't crash
    gameStarted = false;
    xspeed = 0;
    yspeed = 0;
    speedIncreased = false;
    speedFrame = 0;
    highscore = 0;
    snakebody = [];
    snaketail = 2;
    prevspeedX = 0;
    prevspeedY = 0;
    clearTimeout(foodTimeout);
    clearTimeout(bonusFoodTimeout);
    bonusFoodX = undefined;
    bonusFoodY = undefined;
}
startGame();


document.body.addEventListener('keydown', keyDown);

window.onload = function () {
    displayHighscores();
}

class snakePart {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
}


//game loop
function update() {
    if (prevspeedX === 1 && xspeed === -1) {
        xspeed = prevspeedX;
    }
    if (prevspeedX === -1 && xspeed === 1) {
        xspeed = prevspeedX;
    }

    if (prevspeedY === -1 && yspeed === 1) {
        yspeed = prevspeedY;
    }
    if (prevspeedY === 1 && yspeed === -1) {
        yspeed = prevspeedY;
    }
    prevspeedX = xspeed;
    prevspeedY = yspeed;

    if (!gameStarted) {
        requestAnimationFrame(update);
        startScreen();
        return;
    }
    directionSnake();
    let result = gameOver();
    if (result) {
        return
    }
    clearScreen();
    checkFood();
    checkBonusFood();
    createFood();
    createBonusFood();
    createSnake();
    calcScore();
    if (highscore > 4 && !speedIncreased) {
        speed = 8;
        speedIncreased = true;
        speedFrame = 10;
    }
    if (highscore > 8 && speed < 10) {
        speed = 10;
        speedFrame = 10;
    }
    if (highscore > 12 && speed < 12) {
        speed = 12;
        speedFrame = 10;
    }
    if (highscore > 16 && speed < 14) {
        speed = 14;
        speedFrame = 10;
    }
    if (highscore > 20 && speed < 16) {
        speed = 16;
        speedFrame = 10;
    }
    if (highscore > 30 && speed < 22) {
        speed = 22;
        speedFrame = 10;
    }
    if (speedFrame > 0) {
        ctx.fillStyle = 'white';
        ctx.font = '10px Segoe UI';
        ctx.fillText('Speed increase!', canvas.width / 2, 200);
        speedFrame--;
    }

    setTimeout(update, 1000 / speed);
}

// other functions

function gameOver() {
    if (xspeed === 0 && yspeed === 0) {
        return false
    }
    // walls
    if (headX < 0) {
        over = true;
    }
    else if (headX === tileCount) {
        over = true
    }
    else if (headY < 0) {
        over = true;
    }
    else if (headY === tileCount) {
        over = true
    }
    for (let i = 0; i < snakebody.length; i++) {
        let part = snakebody[i];
        if (part.x === headX && part.y === headY) {
            over = true;
            break;
        }
    }

    if (over) {
        ctx.fillStyle = 'white';
        ctx.font = '40px Segoe UI';
        ctx.fillText('Game Over', canvas.width / 2, canvas.height / 2);
        ctx.fillStyle = 'red';
        ctx.font = '20px Segoe UI'
        ctx.fillText('Score ' + highscore, canvas.width / 2, canvas.height / 1.75);
        gameoverSound.play();;
        ctx.fillStyle = 'white';
        ctx.font = '15px Verdana';
        ctx.fillText('Try Again?', canvas.width / 2, canvas.height / 1.5);
        ctx.fillStyle = 'white';
        ctx.font = '10px Verdana';
        ctx.fillText('Press space or enter to play again.', canvas.width / 2, canvas.height / 1.25);
        db.collection('highscores').orderBy('score', 'desc').limit(10).get().then((querySnapshot) => {
            let highscores = [];
            querySnapshot.forEach((doc) => {
                highscores.push(doc.data().score);
            });
            let tenthHighestScore = highscores[highscores.length - 1];

            if (highscore > tenthHighestScore) {
                setTimeout(function () {
                    Swal.fire({
                        title: 'You made it to the TOP 10!',
                        input: 'text',
                        inputPlaceholder: 'Enter your name',
                        inputValidator: (value) => {
                            value = value ? value.trim() : value;
                            if (!value) {
                                return 'Name has to be at least 1 character!';
                            } else if (value.length > 20) {
                                return 'Name must be less than 21 characters!';
                            }
                        }
                    }).then((result) => {
                        if (result.value) {
                            saveHighscore(result.value, highscore);
                        }
                        // Wait for a keydown event before resetting the game
                        window.addEventListener('keydown', function (event) {
                            if (event.key === 'Enter' || event.key === ' ') {
                                resetGame();
                            }
                        });
                    });
                }, 1010);
            } else {
                // If the score is not higher than the 10th score, wait for a click before resetting the game
                window.addEventListener('keydown', function (event) {
                    if (event.key === 'Enter' || event.key === ' ') {
                        resetGame();
                    }
                });
            }
        });
    }
    return over
}

function clearScreen() {
    ctx.drawImage(backgroundImage, 0, 0, canvas.width, canvas.height);
}
function createSnake() {
    ctx.fillStyle = 'rgb(104,200,255)';
    for (let i = 0; i < snakebody.length; i++) {
        let part = snakebody[i];
        ctx.fillRect(part.x * tileCount, part.y * tileCount, tileSize, tileSize)
    }
    snakebody.push(new snakePart(headX, headY)) // movement of the snake - add first, remove last
    if (snakebody.length > snaketail) {
        snakebody.shift();
    }
    ctx.fillStyle = 'rgb(54,146,199)';
    ctx.fillRect(headX * tileCount, headY * tileCount, tileSize, tileSize)
}
function directionSnake() {
    headX = headX + xspeed;
    headY = headY + yspeed;
}

function createFood() {
    ctx.fillStyle = 'rgb(186,19,19)';
    ctx.fillRect(foodX * tileCount, foodY * tileCount, tileSize, tileSize)
}

function createBonusFood() {
    if (bonusFoodX !== undefined && bonusFoodY !== undefined) {
        ctx.fillStyle = 'rgb(255,239,0)';
        ctx.fillRect(bonusFoodX * tileCount, bonusFoodY * tileCount, tileSize, tileSize)
    }
}


function checkFood() {
    if (foodX === headX && foodY === headY) {
        generateFood();
        snaketail++;
        highscore++;
        ateSound.play();
    }
}
function checkBonusFood() {
    if (bonusFoodX === headX && bonusFoodY === headY) {
        bonusFoodX = undefined;
        bonusFoodY = undefined;
        snaketail += 2;
        highscore += 2;
        ateSound.play();
    }
}

function generateFood() {
    clearTimeout(foodTimeout);
    let newfoodX, newfoodY, foodcollision;


    do {
        newfoodX = Math.floor(Math.random() * tileCount);
        newfoodY = Math.floor(Math.random() * tileCount);

        foodcollision = snakebody.some(
            (part) => part.x === newfoodX && part.y === newfoodY
        );
    } while (foodcollision || (headX == newfoodX && headY == newfoodY));

    foodX = newfoodX;
    foodY = newfoodY;
    foodTimeout = setTimeout(generateFood, 8000);
}


function generateBonusFood() {
    clearTimeout(bonusFoodTimeout);
    let newBonusFoodX, newBonusFoodY, bonusFoodCollision;
    do {
        newBonusFoodX = Math.floor(Math.random() * tileCount);
        newBonusFoodY = Math.floor(Math.random() * tileCount);

        bonusFoodCollision = snakebody.some(
            (part) => part.x === newBonusFoodX && part.y === newBonusFoodY
        );
    } while (bonusFoodCollision || (headX == newBonusFoodX && headY == newBonusFoodY));

    bonusFoodX = newBonusFoodX;
    bonusFoodY = newBonusFoodY;
    bonusFoodTimeout = setTimeout(() => {
        bonusFoodX = undefined;
        bonusFoodY = undefined;
    }, 5000);
}
setInterval(generateBonusFood, 30000);

function calcScore() {
    ctx.fillStyle = 'white';
    ctx.font = '10px Segoe UI'
    ctx.fillText('Score   ' + highscore, canvas.width - 40, 20);
}

function startScreen() {
    ctx.fillStyle = 'white';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = 'black';
    ctx.textAlign = 'center';
    ctx.font = '20px Verdana';
    ctx.fillText('Use arrow keys to move the snake', canvas.width / 2, canvas.height / 2);
    ctx.fillText('Press arrow key to start', canvas.width / 2, canvas.height / 2 + 50);
    window.addEventListener('keydown', function () {
        if (!gameStarted) {
            gameStarted = true;            
        }
    });
}

function resetGame() {
    startGame();
    startScreen();
    update();
}



function saveHighscore(name, highscore) {
    db.collection('highscores').add({
        name: name,
        score: highscore
    })
        .then((docRef) => {
            console.log('Document written with ID: ', docRef.id);
        })
        .catch((error) => {
            console.error('Error adding document: ', error);
        });

}

function displayHighscores() {
    let spinner = document.getElementById('spinner');
    spinner.style.display = 'block';

    db.collection('highscores').orderBy('score', 'desc').limit(10)
        .onSnapshot((querySnapshot) => {
            let highscores = [];
            querySnapshot.forEach((doc) => {
                highscores.push(doc.data());
            });
            spinner.style.display = 'none';
            let highscoresTable = document.getElementById('highscores');
            highscoresTable.className = 'highscore-table';
            highscoresTable.innerHTML = '<tr class="header-row"><th>Name</th><th>Score</th></tr>';
            let docFrag = document.createDocumentFragment();
            highscores.forEach((highscore, index) => {
                let row = document.createElement('tr');
                row.className = index % 2 === 0 ? 'even-row' : 'odd-row';
                let nameCell = document.createElement('td');
                let scoreCell = document.createElement('td');
                nameCell.textContent = highscore.name;
                scoreCell.textContent = highscore.score;
                row.appendChild(nameCell);
                row.appendChild(scoreCell);
                docFrag.appendChild(row);
            });
            highscoresTable.appendChild(docFrag);
        })
}

function keyDown(event) {
    //up
    if (event.keyCode === 38) {
        yspeed = -1;
        xspeed = 0;
    }
    //down
    if (event.keyCode === 40) {
        yspeed = 1;
        xspeed = 0;
    }
    //left
    if (event.keyCode === 37) {
        yspeed = 0;
        xspeed = -1;
    }
    //right
    if (event.keyCode === 39) {
        yspeed = 0;
        xspeed = 1;
    }
    else {
        // Do nothing
    }
}
update();
