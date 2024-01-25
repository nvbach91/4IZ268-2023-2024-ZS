import { initializeApp } from "https://www.gstatic.com/firebasejs/9.1.1/firebase-app.js";
import { getDatabase, onValue, set, ref, get } from "https://www.gstatic.com/firebasejs/9.1.1/firebase-database.js";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyAiZQkPwesD0hqVEfM0T-Tu_oTZHFcKe0w",
    authDomain: "sp2-vse.firebaseapp.com",
    databaseURL: "https://sp2-vse-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "sp2-vse",
    storageBucket: "sp2-vse.appspot.com",
    messagingSenderId: "701589936249",
    appId: "1:701589936249:web:21ff03ef56fc8d5dd91ca8",
    measurementId: "G-36D51ETE99"
};

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);


window.addEventListener("keydown", function (evt) {
    // Prevent default scrolling behavior for arrow keys
    if ([32, 37, 38, 39, 40].includes(evt.keyCode)) {
        evt.preventDefault();
    }
});

document.addEventListener("DOMContentLoaded", function () {

    const menuDiv = document.getElementById("menu");
    const canvas = document.getElementById("gameCanvas");
    const playerNameInput = document.getElementById("playerName");

    let playerName = "";

    window.startGame = function() {
        playerName = playerNameInput.value.trim();

        if (playerName === "") {
            alert("Please enter your name before starting the game.");
            return;
        }

        // Hide the menu and display the canvas
        menuDiv.style.display = "none";
        canvas.style.display = "block";

        // Call your game initialization function or start your game logic here
        main();
    };


    let COLS = 26,
        ROWS = 26,
        EMPTY = 0,
        SNAKE = 1,
        FRUIT = 2,
        LEFT = 0,
        UP = 1,
        RIGHT = 2,
        DOWN = 3,
        KEY_LEFT = 37,
        KEY_UP = 38,
        KEY_RIGHT = 39,
        KEY_DOWN = 40,
        KEY_SPACE = 32,
        ctx,
        keystate,
        frames,
        score,
        paused = false,
        gameOver = false,
        highScore = 0;
    const grid = {
        width: COLS,
        height: ROWS,
        _grid: Array.from({ length: COLS }, () => Array(ROWS).fill(EMPTY)),

        set: function (val, x, y) {
            this._grid[x][y] = val;
        },

        get: function (x, y) {
            return this._grid[x][y];
        }
    };

    const snake = {
        direction: null,
        _queue: [],

        init: function (d, x, y) {
            this.direction = d;

            this._queue = [];
            this.insert(x, y);
        },

        insert: function (x, y) {
            this._queue.unshift({
                x: x,
                y: y
            });
        },

        remove: function () {
            return this._queue.pop();
        },

        get last() {
            return this._queue[0];
        }
    };


    let highScoreDisplay = document.getElementById("highScoreDisplay");

    let scoreDisplay = document.getElementById("score");

    function updateScoreDisplay() {
        if (scoreDisplay) {
            scoreDisplay.textContent = "Score: " + score;
        } else {
            console.error("Score Display Element Not Found");
        }
    }

    function updateHighScoreDisplay() {
        if (highScoreDisplay) {
            highScoreDisplay.textContent = "High Score: " + highScore;
        } else {
            console.error("High Score Display Element Not Found");
        }
    }

    function getHighScoreFromDatabase() {
        const highScoreRef = ref(database, 'highScores/' + playerName);


        return new Promise((resolve, reject) => {
            get(highScoreRef).then(snapshot => {
                const data = snapshot.val();
                highScore = data ? data : 0;
                console.log("High score loaded:", highScore);
                resolve();
            }).catch(error => {
                console.error("Error loading high score:", error);
                reject(error);
            });
        });
    }

    async function main() {
        // canvas = document.createElement("canvas");
        canvas.width = COLS * 20;
        canvas.height = ROWS * 20;
        ctx = canvas.getContext("2d");

        document.body.appendChild(canvas);

        ctx.font = "12px Helvetica";

        frames = 0;
        keystate = {};
        document.addEventListener("keydown", handleKeyDown);
        document.addEventListener("keyup", function (evt) {
            if (!paused) {
                delete keystate[evt.keyCode];
            }
        });

        await init();
        loop();
    }

    async function init() {
        try {
            const fetchedHighScore = await getHighScoreFromDatabase()
            
            // Use the retrieved high score to update the game state
            if (typeof fetchedHighScore === 'number') {
                highScore = fetchedHighScore;
            } else {
                highScore = 0;
            }
            

            // Update the high score display element content
            updateHighScoreDisplay();

            score = 0;

            try {
                // Reset the grid
                grid._grid = Array.from({ length: COLS }, () => Array(ROWS).fill(EMPTY));
            } catch (error) {
                console.error("Error resetting the grid:", error);
            }

            let sp = {
                x: Math.floor(COLS / 2),
                y: ROWS - 1
            };
            snake.init(UP, sp.x, sp.y);

            try {
                grid.set(SNAKE, sp.x, sp.y);
            } catch (error) {
                console.error("Error setting snake position in grid:", error);
            }

            setFood();

            // Reset high score when restarting
            highScore = Math.max(highScore, score);

            // Update the high score display element content
            updateHighScoreDisplay();
        } catch (error) {
            console.error("Error initializing the game:", error);
        }
        // Add additional logging
        console.log("Grid width:", grid.width);
        console.log("Grid height:", grid.height);
        console.log("Snake direction:", snake.direction);
        console.log("Snake last:", snake.last);
    }


    function loop() {
        update();
        draw();
        window.requestAnimationFrame(loop, canvas);
    }

    let gameOverMessage = "";
    let pauseMessage = "";

    function updateHighScoreInDatabase() {
        console.log(highScore + 'update');
        const highScoreRef = ref(database, 'highScores/' + playerName);
        if (!isNaN(highScore) && typeof highScore === 'number') {
            set(highScoreRef, highScore).then(() => {
                console.log("High score updated in database:", highScore);
            }).catch(error => {
                console.error("Error updating high score:", error);
            });
        } else {
            console.error("Invalid highScore value:", highScore);
        }
    }

    function updateHighScoreDuringGame() {
        highScore = Math.max(highScore, score);
        updateScoreDisplay();
        updateHighScoreDisplay();
    }

    function handleKeyDown(evt) {
        if (evt.keyCode === 27) {
            paused = !paused;
            if (paused) {
                console.log("Game Paused");
                pauseMessage = "Game Paused";
            } else {
                console.log("Game Resumed");
                pauseMessage = "";
            }
        }

        if (gameOver && evt.keyCode === KEY_SPACE) {
            restartGame();
        }

        if (!paused && !gameOver) {
            keystate[evt.keyCode] = true;
        }
    }

    function restartGame() {
        paused = false;
        gameOver = false;
        keystate = {};
        frames = 0;
        init();
    }

    function setFood() {
        let empty = [];

        for (let x = 0; x < grid.width; x++) {
            for (let y = 0; y < grid.height; y++) {
                if (grid.get(x, y) === EMPTY) {
                    empty.push({
                        x: x,
                        y: y
                    });
                }
            }
        }

        let randpos = empty[Math.round(Math.random() * (empty.length - 1))];
        grid.set(FRUIT, randpos.x, randpos.y);
    }

    function update() {
        frames++;

        if (!paused) {
            if (keystate[KEY_LEFT] && snake.direction !== RIGHT) {
                snake.direction = LEFT;
            }
            if (keystate[KEY_UP] && snake.direction !== DOWN) {
                snake.direction = UP;
            }
            if (keystate[KEY_RIGHT] && snake.direction !== LEFT) {
                snake.direction = RIGHT;
            }
            if (keystate[KEY_DOWN] && snake.direction !== UP) {
                snake.direction = DOWN;
            }

            if (frames % 7 === 0) {
                let nx = snake.last.x;
                let ny = snake.last.y;

                switch (snake.direction) {
                    case LEFT:
                        nx--;
                        break;
                    case UP:
                        ny--;
                        break;
                    case RIGHT:
                        nx++;
                        break;
                    case DOWN:
                        ny++;
                        break;
                }

                if (0 > nx || nx > grid.width - 1 ||
                    0 > ny || ny > grid.height - 1 ||
                    grid.get(nx, ny) === SNAKE
                ) {
                    gameOver = true;
                    gameOverMessage = "Game Over! Press Space to Restart";
                    updateHighScoreInDatabase(highScore);
                    return;
                }

                if (grid.get(nx, ny) === FRUIT) {
                    score++;
                    setFood();
                } else {
                    let tail = snake.remove();
                    grid.set(EMPTY, tail.x, tail.y);
                }

                grid.set(SNAKE, nx, ny);
                snake.insert(nx, ny);

                updateHighScoreDuringGame();
            }
        }
    }

    function draw() {
        let tw = canvas.width / COLS;
        let th = canvas.height / ROWS;

        for (let x = 0; x < COLS; x++) {
            for (let y = 0; y < ROWS; y++) {
                try {
                    switch (grid.get(x, y)) {
                        case EMPTY:
                            ctx.fillStyle = "#fff";
                            break;
                        case SNAKE:
                            ctx.fillStyle = "#1C7D49";
                            break;
                        case FRUIT:
                            ctx.fillStyle = "#ED0000";
                            break;
                        default:
                            console.error("Unknown grid value:", grid.get(x, y));
                    }
                    ctx.fillRect(x * tw, y * th, tw, th);
                } catch (error) {
                    console.error("Error drawing grid at:", x, y);
                    console.error(error);
                }
            }
        }

        // ctx.fillStyle = "#000";
        // ctx.fillText("SCORE: " + score, 10, canvas.height - 10);

        if (gameOver || paused) {
            ctx.fillStyle = "#000";
            let message = gameOver ? gameOverMessage : pauseMessage;
            ctx.fillText(message, canvas.width / 4, canvas.height / 2);
        }
    }


});
