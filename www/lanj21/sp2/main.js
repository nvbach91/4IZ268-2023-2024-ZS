import { initializeApp } from "https://www.gstatic.com/firebasejs/9.1.1/firebase-app.js";
import { getDatabase, ref, onValue } from "https://www.gstatic.com/firebasejs/9.1.1/firebase-database.js";
import { set } from "https://www.gstatic.com/firebasejs/9.1.1/firebase-database.js";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    
};

const app = initializeApp(firebaseConfig);
const database = getDatabase();

document.addEventListener("DOMContentLoaded", function () {
    var COLS = 26,
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
        canvas,
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


    var highScoreDisplay = document.getElementById("highScoreDisplay");

    function updateHighScoreDisplay() {
        if (highScoreDisplay) {
            highScoreDisplay.textContent = "High Score: " + highScore;
        } else {
            console.error("High Score Display Element Not Found");
        }
    }

    function getHighScoreFromDatabase() {
        const highScoreRef = ref(database, 'highScore');

        return new Promise((resolve, reject) => {
            onValue(highScoreRef, (snapshot) => {
                const data = snapshot.val();
                console.log(data);
                resolve(Number(data));
            }, (error) => {
                console.error("Error getting high score:", error);
                reject(error);
            });
        });
    }

    function main() {
        canvas = document.createElement("canvas");
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

        init();
        loop();
    }

    function init() {
        getHighScoreFromDatabase()
            .then((fetchedHighScore) => {
                // Use the retrieved high score to update the game state
                highScore = fetchedHighScore;

                // Update the high score display element content
                updateHighScoreDisplay();

                score = 0;

                try {
                    // Reset the grid
                    grid._grid = Array.from({ length: COLS }, () => Array(ROWS).fill(EMPTY));
                } catch (error) {
                    console.error("Error resetting the grid:", error);
                }

                var sp = {
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
            })
            .catch((error) => {
                console.error("Error initializing the game:", error);
            });

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

    var gameOverMessage = "";
    var pauseMessage = "";

    function updateHighScoreInDatabase(newHighScore) {
        if (getHighScoreFromDatabase() > highScore) {

        } else {
            const highScoreRef = ref(database, 'highScore');
            set(highScoreRef, newHighScore);
        }
    }

    function updateHighScoreDuringGame() {
        highScore = Math.max(highScore, score);
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
        var empty = [];

        for (var x = 0; x < grid.width; x++) {
            for (var y = 0; y < grid.height; y++) {
                if (grid.get(x, y) === EMPTY) {
                    empty.push({
                        x: x,
                        y: y
                    });
                }
            }
        }

        var randpos = empty[Math.round(Math.random() * (empty.length - 1))];
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
                var nx = snake.last.x;
                var ny = snake.last.y;

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
                    var tail = snake.remove();
                    grid.set(EMPTY, tail.x, tail.y);
                }

                grid.set(SNAKE, nx, ny);
                snake.insert(nx, ny);

                updateHighScoreDuringGame();
            }
        }
    }

    function draw() {
        var tw = canvas.width / COLS;
        var th = canvas.height / ROWS;

        for (var x = 0; x < COLS; x++) {
            for (var y = 0; y < ROWS; y++) {
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

        ctx.fillStyle = "#000";
        ctx.fillText("SCORE: " + score, 10, canvas.height - 10);

        if (gameOver || paused) {
            ctx.fillStyle = "#000";
            var message = gameOver ? gameOverMessage : pauseMessage;
            ctx.fillText(message, canvas.width / 4, canvas.height / 2);
        }
    }


    main();
});
