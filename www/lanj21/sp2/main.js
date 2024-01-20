document.addEventListener("DOMContentLoaded", function () {
		

		// Initialize Firebase with your project config
		const firebaseConfig = {
		    apiKey: "YOUR_API_KEY",
		    authDomain: "YOUR_AUTH_DOMAIN",
		    projectId: "YOUR_PROJECT_ID",
		    storageBucket: "YOUR_STORAGE_BUCKET",
		    messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
		    appId: "YOUR_APP_ID"
		};
		
		firebase.initializeApp(firebaseConfig);
		
		// Get a reference to the database
		const database = firebase.database();

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
            highScore = 0,
            grid = {
                width: null,
                height: null,
                _grid: null,

                init: function (d, c, r) {
                    this.width = c;
                    this.height = r;

                    this._grid = [];
                    for (var x = 0; x < c; x++) {
                        this._grid.push([]);
                        for (var y = 0; y < r; y++) {
                            this._grid[x].push(d);
                        }
                    }
                },

                set: function (val, x, y) {
                    this._grid[x][y] = val;
                },

                get: function (x, y) {
                    return this._grid[x][y];
                }
            },

            snake = {
                direction: null,
                last: null,
                _queue: null,

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
                    this.last = this._queue[0];
                },

                remove: function () {
                    return this._queue.pop();
                }
            };

		var highScoreDisplay = document.getElementById("highScoreDisplay");
		function updateHighScoreDisplay() {
			// Check if the highScoreDisplay element exists before updating its content
			if (highScoreDisplay) {
				highScoreDisplay.textContent = "High Score: " + highScore;
			} else {
				console.error("High Score Display Element Not Found");
			}
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

        function handleKeyDown(evt) {
			// Check for the Escape key to toggle pause
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
		
			// Check if the game is over and the Space key is pressed to restart
			if (gameOver && evt.keyCode === KEY_SPACE) {
				restartGame();
			}
		
			// Check if the game is not over and not paused before accepting input
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
            score = 0;

            grid.init(EMPTY, COLS, ROWS);
            var sp = {
                x: Math.floor(COLS / 2),
                y: ROWS - 1
            };
            snake.init(UP, sp.x, sp.y);
            grid.set(SNAKE, sp.x, sp.y);

            setFood();

            // Reset high score when restarting
            highScore = Math.max(highScore, score);

            // Update the high score display element content
            updateHighScoreDisplay();
        }

		document.addEventListener("DOMContentLoaded", function () {
            main();
        });


        function loop() {
            update();
            draw();
            window.requestAnimationFrame(loop, canvas);
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
		
					// Update high score during the game
					highScore = Math.max(highScore, score);
		
					// Update the high score display element content
					updateHighScoreDisplay();
				}
			}
		}
		

        function draw() {
			var tw = canvas.width / COLS;
			var th = canvas.height / ROWS;
		
			for (var x = 0; x < COLS; x++) {
				for (var y = 0; y < ROWS; y++) {
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
					}
					ctx.fillRect(x * tw, y * th, tw, th);
				}
			}
		
			ctx.fillStyle = "#000";
			ctx.fillText("SCORE: " + score, 10, canvas.height - 10);
		
			// Display game over or pause message if applicable
			if (gameOver || paused) {
				ctx.fillStyle = "#000";
				var message = gameOver ? gameOverMessage : pauseMessage;
				ctx.fillText(message, canvas.width / 4, canvas.height / 2);
			}
		}
		
		

        main();

	});