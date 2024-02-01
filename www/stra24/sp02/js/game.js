var config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    parent: 'game-container',
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 800 },
            debug: false
        }
    },
    scene: {
        key: 'mainScene',
        preload: preload,
        create: create,
        update: update
    }
};

var game = new Phaser.Game(config);
var player;
var cursors;
var platforms;

var playbuttonPressed;
var gameOver;

var title;
var gameOverTitle;
var blackBar;

var backgrounds;
var parallaxPositions;

var downGrav = 800;
var upGrav = -1600;

var originalCameraPos;
var addedSpeed;

var music;


function preload() {
    this.load.image('background1', './realassets/background/1.png');
    this.load.image('background2', './realassets/background/2.png');
    this.load.image('background3', './realassets/background/3.png');
    this.load.image('background4', './realassets/background/4.png');
    this.load.image('background5', './realassets/background/5.png');
    this.load.image('platform', './realassets/platform/maptile.png');
    this.load.spritesheet('stand', './realassets/player/stand.png', { frameWidth: 84, frameHeight: 84 });
    this.load.spritesheet('run', './realassets/player/run.png', { frameWidth: 84, frameHeight: 84 });
    this.load.spritesheet('jump', './realassets/player/jump.png', { frameWidth: 84, frameHeight: 84 });
    this.load.spritesheet('title', './realassets/title/title.png', { frameWidth: 1003, frameHeight: 69 });
    this.load.spritesheet('gameOverTitle', './realassets/title/gameover.png', { frameWidth: 388, frameHeight: 44 });
    this.load.image('bar', './realassets/title/bigblackbar.png');

    this.load.audio('music', './realassets/music/ariamath.mp3');

    this.load.script('mapgeneration', './js/mapgenerator.js');
}

function create() {
    addedSpeed = 0;
    playbuttonPressed = false;
    gameOver = false;
    backgrounds = [];
    parallaxPositions = [];

    music = this.sound.add('music');

    this.physics.world.setBounds(0, -100, 400 * 50, 800);
    createBackgrounds(this);

    title = this.add.sprite(450, 300, 'title').setScale(0.5);
    this.anims.create({
        key: 'titleAnim',
        frames: this.anims.generateFrameNumbers('title', { start: 0, end: 1 }),
        frameRate: 2,
        repeat: -1
    });

    //player
    createPlayer(this);

    //platforms
    platforms = this.physics.add.staticGroup();
    createmap();
    this.physics.add.collider(player, platforms);

    //camera
    this.cameras.main.startFollow(player);
    this.cameras.main.setFollowOffset(-250, 0);
    this.cameras.main.setLerp(0.1, 0);
    originalCameraPos = this.cameras.main.scrollX

    blackBar = this.add.sprite(450, 300, 'bar').setScale(1.5);
    blackBar.setVisible(false)
    gameOverTitle = this.add.sprite(450, 300, 'gameOverTitle').setScale(1);
    this.anims.create({
        key: 'gameOverTitleAnim',
        frames: this.anims.generateFrameNumbers('gameOverTitle', { start: 0, end: 1 }),
        frameRate: 2,
        repeat: -1
    });
    gameOverTitle.setVisible(false)

}

function update() {
    if (playbuttonPressed && !gameOver) {
        if (Math.abs(originalCameraPos - this.cameras.main.scrollX) > 750) {
            originalCameraPos = this.cameras.main.scrollX
            addedSpeed += 5
            updateScore(5)
        }
        updatePlayer();
        updateBackgrounds(this);
        if (player.y == 658 || player.y == -58) {
            player.setVelocityX(0);
            gameOverTitle.x = this.cameras.main.scrollX + 450;
            blackBar.x = this.cameras.main.scrollX + 450;
            gameOverTitle.setVisible(true);
            blackBar.setVisible(true);
            gameOver = true;
            music.stop();
        }
    }
    else if (gameOver) {
        if ($("#player-name").text() == 'ENTER NAME') {
            $("#player-name").addClass('blink');
        }
        else {
            $("#player-name").removeClass('blink');
            $("#enter-score-button").show();
            $(window).scrollTop($(document).height());
        }

    }
    else {
        $("#enter-score-button").hide();
        $("#player-name").removeClass('blink');
        player.anims.play('stand', true);
        title.anims.play('titleAnim', true);
        if (Phaser.Input.Keyboard.JustDown(cursors.space)) {
            music.play();
            playbuttonPressed = true;
            title.anims.stop('titleAnim');
            title.setTexture('title', 0);
        }
    }
}

function createPlayer(scene) {
    player = scene.physics.add.sprite(200, 300, 'stand');
    player.setCollideWorldBounds(true);
    scene.anims.create({
        key: 'stand',
        frames: scene.anims.generateFrameNumbers('stand', { start: 0, end: 3 }),
        frameRate: 8,
        repeat: -1
    });
    scene.anims.create({
        key: 'run',
        frames: scene.anims.generateFrameNumbers('run', { start: 0, end: 9 }),
        frameRate: 12,
        repeat: -1
    });
    scene.anims.create({
        key: 'jump',
        frames: scene.anims.generateFrameNumbers('jump', { start: 0, end: 7 }),
        frameRate: 12,
        repeat: 0
    });
    cursors = scene.input.keyboard.createCursorKeys();
    player.body.gravity.y = downGrav
}

function updatePlayer() {
    player.setVelocityX(250 + addedSpeed);

    //funkce
    if (Phaser.Input.Keyboard.JustDown(cursors.space) && (player.body.touching.down || player.body.touching.up)) {
        switchPlayerGrav()
    }

    //animace
    if (player.body.touching.down || player.body.touching.up) {
        player.anims.play('run', true);
    } else {
        player.anims.play('jump', true);
    }

}

function switchPlayerGrav() {
    if (player.body.gravity.y === downGrav) {
        player.body.gravity.y = upGrav
        player.flipY = true
    }
    else {
        player.body.gravity.y = downGrav
        player.flipY = false
    }
}

function createBackgrounds(scene) {
    for (var i = 1; i <= 5; i++) {
        backgrounds.push(scene.add.image(400, 300, 'background' + i).setScale(1));
        parallaxPositions.push(400)
    }
}
function updateBackgrounds(scene) {
    for (var i = 0; i < backgrounds.length; i++) {
        backgrounds[i].x = parallaxPositions[i] - (scene.cameras.main.scrollX * (i * 0.1));
        if (Math.abs(backgrounds[i].x + 600 - scene.cameras.main.scrollX) < 100) {
            backgrounds[i].x += 1152
            parallaxPositions[i] += 1152
        }
    }
}
function updateScore(newScore) {
    var oldScore = parseInt($("#score").text());
    var updatedScore = oldScore + newScore;
    $('#score').text(updatedScore);
}

function restartGame() {
    game.scene.getScene('mainScene').scene.restart()
}
