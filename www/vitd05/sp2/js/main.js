window.addEventListener('load', function(){
    const canvas = document.getElementById('canvas');
    const cntx = canvas.getContext('2d');
    canvas.width = 1000;
    canvas.height = 500;
    
    class Inputs {
        constructor(game){
            this.game = game;
            window.addEventListener('keydown', e => {
                if ((e.key === 'ArrowUp' || e.key === 'ArrowDown') && this.game.keys.indexOf(e.key) === -1){
                    this.game.keys.push(e.key);
                }
                else if (e.key === ' '){
                    this.game.player.shoot();
                }
            });
            window.addEventListener('keyup', e => {
                if (this.game.keys.indexOf(e.key) > -1){
                    this.game.keys.splice(this.game.keys.indexOf(e.key), 1);
                }
            });
        }
    }
    class Bullet {
        constructor(game, x, y){
            this.game = game;
            this.x = x;
            this.y = y;
            this.width = 10;
            this.height = 3;
            this.speed = 3;
            this.tbDeleted = false;
        }
        update(){
            this.x += this.speed;
            if (this.x > this.game.width * 0.9) this.tbDeleted = true;
        }
        draw(context){
            context.fillStyle = 'yellow';
            context.fillRect(this.x, this.y, this.width, this.height);
        }

    }
    class Player {
        constructor(game){
            this.game = game;
            this.width = 120;
            this.height = 100;
            this.x = 20;
            this.y = 100;
            this.speedY = 0;
            this.maxSpeed = 5;
            this.bullets = [];
            this.lastShoot = 0;
            this.shootInterval = 100;
        }
        update(){
            if (this.game.keys.includes('ArrowUp')) this.speedY = -this.maxSpeed;
            else if (this.game.keys.includes('ArrowDown')) this.speedY = this.maxSpeed;
            else this.speedY = 0;
            this.y += this.speedY;
            if (this.y > this.game.height - this.height) this.y = this.game.height - this.height;
            if (this.y < 0) this.y = 0;
            this.bullets.forEach(bullet => {
                bullet.update();
            });
            this.bullets = this.bullets.filter(bullet => !bullet.tbDeleted);
        }
        draw(context){
            context.fillStyle = 'darkgray';
            context.fillRect(this.x, this.y, this.width, this.height);
            
            context.fillStyle = 'grey';
            context.fillRect(this.x + 5, this.y + 5, this.width - 10, this.height - 10);

            this.bullets.forEach(bullet => {
                bullet.draw(context);
            });
        }
        shoot(){
            const currentTime = performance.now();
            if (currentTime - this.lastShoot > this.shootInterval) {
                this.bullets.push(new Bullet(this.game, this.x + 100, this.y + 50));
                this.lastShoot = currentTime;
            }
        }
    }
    class Enemies {
        constructor(game){
            this.game = game;
            this.x = this.game.width;
            this.speedX = Math.random() * -1.5 - 0.5;
            this.tbDeleted = false;
            this.lives = 5;
            this.score = 1;
            this.width = 100;
            this.height = 80;
            this.y = Math.random() * (this.game.height * 0.9 - this.height);
        }
        update(){
            this.x += this.speedX;
            if (this.x + this.width < 0) this.tbDeleted = true;
        }
        draw(context){
            context.fillStyle = 'darkred';
            context.fillRect(this.x, this.y, this.width, this.height);
            
            context.fillStyle = 'red';
            context.fillRect(this.x + 5, this.y + 5, this.width - 10, this.height - 10);
        }
    }
    class DisplayText {
        constructor(game){
            this.game = game;
            this.fontSize = 35;
            this.fontFamily = 'VT323';
            this.color = 'white';
            this.fact = null;
            this.storedFacts = [];
        }
        async fetchRandomFact() {
            try {
                const response = await fetch('https://uselessfacts.jsph.pl/api/v2/facts/random');
                const data = await response.json();
                this.fact = data.text;
                console.log(data.text);
                this.storedFacts.push(this.fact);
                localStorage.setItem('storedFacts', JSON.stringify(this.storedFacts));

            } catch (error) {
                console.error('Error fetching random fact: ', error);
            }
        }
        showFacts(context) {
            const storedFacts = JSON.parse(localStorage.getItem('storedFacts')) || [];
            if (storedFacts.length === 0) {
                console.log('No stored facts.');
                return;
            }
            context.textAlign = 'left';
            context.fillStyle = 'white';
            context.fillText('Stored Facts:', 10, 180);
            for (let i = 0; i < storedFacts.length; i++) {
                context.fillText((i + 1) + '. ' + storedFacts[i], 20, 210 + i * 30);
            }
        }
        async draw(context){
            context.fillStyle = this.color;
            context.font = this.fontSize + 'px ' + this.fontFamily;
            context.fillText('Score: ' + this.game.score, game.displayTextY, 40);
            const format = (this.game.gameTime * 0.001).toFixed(2);
            context.fillText('Time: ' + format, game.displayTextY, 70);
            if (game.gameOver) {
                context.textAlign = 'center';
                context.fillStyle = 'white';
                context.fillText('GAME OVER, try again!', game.width/2, game.height/5);

                if (!this.fact) {
                    await this.fetchRandomFact();
                }
                if (this.fact) {
                    context.fillText('Random Fact: ' + this.fact, this.game.width / 2, this.game.height / 5 + 40);
                }
            }
        }
    }
    class Game {
        constructor(width, height){
            this.width = width;
            this.height = height;
            this.player = new Player(this);
            this.input = new Inputs(this);
            this.displayText = new DisplayText(this);
            this.keys = [];
            this.enemies = [];
            this.enemyTimer = 0;
            this.enemyInterval = 1000;
            this.gameOver = false;
            this.score = 0;
            this.gameTime = 0;
            this.displayTextY = 60;
            /*
            this.highestScore = localStorage.getItem('highestScore') || 0;
            this.bestTime = localStorage.getItem('bestTime') || 0;
            */
        }
        update(deltaTime){
            if (!this.gameOver) this.gameTime += deltaTime;
            this.player.update();
            this.enemies.forEach(enemy => {
                enemy.update();
                if (this.collisionCheck(this.player, enemy)){
                    this.gameOver = true;
                }
                this.player.bullets.forEach(bullet => {
                    if (this.collisionCheck(bullet, enemy)){
                        enemy.lives--;
                        bullet.tbDeleted = true;
                        if (enemy.lives <= 0){
                            enemy.tbDeleted = true;
                            this.score++;
                        }
                    }
                })
            });
            this.enemies = this.enemies.filter(enemy => !enemy.tbDeleted);
            if (this.enemyTimer > this.enemyInterval && !this.gameOver){
                this.addEnemy();
                this.enemyTimer = 0;
            }
            else {
                this.enemyTimer += deltaTime;
            }
        }
        draw(context){
            this.player.draw(context);
            this.enemies.forEach(enemy => {
                enemy.draw(context);
            });
            this.displayText.draw(context);
        }
        addEnemy(){
            this.enemies.push(new Enemies(this));
        }
        collisionCheck(rect1, rect2){
            return (rect1.x < rect2.x + rect2.width && 
                    rect1.x + rect1.width > rect2.x &&
                    rect1.y < rect2.y + rect2.height &&
                    rect1.height + rect1.y > rect2.y)
        }
        resetGame() {
            this.player = new Player(this);
            this.keys = [];
            this.enemies = [];
            this.enemyTimer = 0;
            this.gameOver = false;
            
            const highestScore = localStorage.getItem('highestScore') || 0;
            const bestTime = localStorage.getItem('bestTime') || 0;
            if (this.score > highestScore) {
                //const highestScore = this.score;
                localStorage.setItem('highestScore', this.score);
                localStorage.setItem('bestTime', this.gameTime);
                console.log('I have a problem here somewhere');
                const topScore = this.score;
                const topTime = this.gameTime;
                document.getElementById('highestScore').innerText = "Highest Score: " + topScore;
                document.getElementById('bestTime').innerText = "Best Time: " + (topTime / 1000).toFixed(2) + "seconds";    
            } else {
                document.getElementById('highestScore').innerText = "Highest Score: " + highestScore;
                document.getElementById('bestTime').innerText = "Best Time: " + (bestTime / 1000).toFixed(2) + "seconds";
            
            }
            //
            console.log('Nejlepší dosažené score: ' + (localStorage.getItem('highestScore') || 0));
            console.log('Jeho čas: ' + (localStorage.getItem('bestTime') / 1000).toFixed(2) + ' sekundy');
            /*
            document.getElementById('highestScore').innerText = "Highest Score: " + highestScore;
            document.getElementById('bestTime').innerText = "Best Time: " + (bestTime / 1000).toFixed(2) + "seconds";
            */
            this.score = 0;
            this.gameTime = 0;
            this.displayText.fetchRandomFact();
        }
    }

    const game = new Game(canvas.width, canvas.height);
    let lastTime = 0;
    let animationId;

    function startAnimation() {
        animationId = requestAnimationFrame(animate);
    }
    document.addEventListener('click', function (e) {
        if (e.target.id === 'showFactsButton') {
            game.displayText.showFacts(cntx);
        }
    });
    function animate(timeStamp){
        const deltaTime = timeStamp - lastTime;
        lastTime = timeStamp;
        cntx.clearRect(0, 0, canvas.width, canvas.height)
        game.update(deltaTime);
        game.draw(cntx);
        if (game.gameOver) {
            document.getElementById('NGbutton').style.display = 'block';
            document.getElementById('showFactsButton').style.display = 'block';
            /*
            document.getElementById('highestScore').innerText = "Highest Score: " + game.highestScore;
            document.getElementById('bestTime').innerText = "Best Time: " + (game.bestTime / 1000).toFixed(2) + " seconds";
            */
            cancelAnimationFrame(animationId);
        } else {
            startAnimation();
        }
    };
    startAnimation();

    document.getElementById('NGbutton').addEventListener('click', function () {
        if (game.gameOver) {
            game.resetGame();
            startAnimation();
        }
    });
});