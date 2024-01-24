//game scene - responsible for the game itself
class Play {
    create() {
        this.player = this.physics.add.sprite(400, 300, 'player');
        this.player.body.gravity.y = 500;
        this.arrow = this.input.keyboard.createCursorKeys();
        this.coin = this.physics.add.sprite(60, 130, 'coin');
        this.score = 0;
        this.scoreLabel = this.add.text(30, 25, 'Score: ' + this.score, { font: '18px Arial', fill: '#fff' });
        this.enemies = this.physics.add.group();
        this.jumpSound = this.sound.add('jump');
        this.coinSound = this.sound.add('coin');
        this.deadSound = this.sound.add('dead');

        this.nextEnemy = 0;

        /*this.time.addEvent({
            delay: 2200,
            callback: () => this.addEnemy(),
            loop: true,
        });*/

        //Animations for character movement
        this.anims.create({
            key: 'right',
            frames: this.anims.generateFrameNumbers('player', { frames: [1, 2] }),
            framerate: 8,
            repeat: -1,
        });

        this.anims.create({
            key: 'left',
            frames: this.anims.generateFrameNumbers('player', { frames: [3, 4] }),
            framerate: 8,
            repeat: -1,
        });



        this.createWorld();
    }

    update() {
        //game logic
        this.physics.collide(this.player, this.walls);
        this.physics.collide(this.walls, this.enemies);
        //this.player.angle++;
        this.movePlayer();
        if (this.player.y < 0 || this.player.y > 600) {
            this.playerDie();
        }
        if (this.physics.overlap(this.player, this.coin)) {
            this.takeCoin();
        }
        if (this.physics.overlap(this.player, this.enemies)) {
            this.playerDie();
        }
        this.updateEnemySpawn();

    }
    movePlayer() {
        if (this.arrow.left.isDown) {
            this.player.body.velocity.x = -200;
            this.player.anims.play('left', true);
        }
        else if (this.arrow.right.isDown) {
            this.player.body.velocity.x = 200;
            this.player.anims.play('right', true);
        }
        else {
            this.player.body.velocity.x = 0;
            this.player.setFrame(0);
        }
        if (this.arrow.up.isDown && this.player.body.onFloor()) {
            this.player.body.velocity.y = -400;
            this.jumpSound.play();
        }
    };
    //creates the level
    createWorld() {
        this.walls = this.physics.add.staticGroup();

        this.walls.create(10, 170, 'wallV');
        this.walls.create(10, 340, 'wallV');
        this.walls.create(10, 500, 'wallV');

        this.walls.create(790, 170, 'wallV');
        this.walls.create(790, 340, 'wallV');
        this.walls.create(790, 500, 'wallV');

        this.walls.create(150, 10, 'wallH');
        this.walls.create(650, 10, 'wallH');
        this.walls.create(150, 590, 'wallH');
        this.walls.create(650, 590, 'wallH');

        this.walls.create(300, 150, 'wallH');
        this.walls.create(500, 150, 'wallH');
        this.walls.create(300, 450, 'wallH');
        this.walls.create(500, 450, 'wallH');
        this.walls.create(50, 300, 'wallH');
        this.walls.create(750, 300, 'wallH');
    }
    playerDie() {
        this.deadSound.play();

        this.scene.start('menu', { score: this.score });
    }
    takeCoin() {
        this.score += 1;
        this.coin.destroy();
        this.scoreLabel.setText('Score: ' + this.score);
        this.updateCoinPosition();
        this.coinSound.play();

        this.coin.setScale(0);
        this.tweens.add({
            targets: this.coin,
            scale: 1,
            duration: 300,
        });
        this.tweens.add({
            targets: this.player,
            scale: 1.3,
            duration: 100,
            yoyo: true,
        });
    }
    //Fixed coin positions to prevent it from spawning in walls
    updateCoinPosition() {
        let positions = [
            { x: 100, y: 60 },
            { x: 600, y: 60 },
            { x: 60, y: 140 },
            { x: 40, y: 40 },
            { x: 130, y: 400 },
            { x: 370, y: 400 },
        ];

        positions = positions.filter(coin => coin.x !== this.coin.x);

        let newPosition = Phaser.Math.RND.pick(positions);

        this.coin = this.physics.add.sprite(newPosition.x, newPosition.y, 'coin');
    }
    addEnemy() {
        let enemy = this.enemies.create(400, 10, 'enemy');

        enemy.body.gravity.y = 500;
        enemy.body.velocity.x = Phaser.Math.RND.pick([-100, 100]);
        enemy.body.bounce.x = 1;

        this.time.addEvent({
            delay: 13000,
            callback: () => enemy.destroy(),
        });
    }
    updateEnemySpawn() {
        let now = Date.now();
        if (this.nextEnemy < now) {
            let startDifficulty = 4000;
            let endDifficulty = 1000;
            let scoreToReachEndDifficulty = 100;

            let progress = Math.min(this.score / scoreToReachEndDifficulty, 1);
            let delay = startDifficulty - (startDifficulty - endDifficulty) * progress;

            this.addEnemy();
            this.nextEnemy = now + delay;
        }
    }

}