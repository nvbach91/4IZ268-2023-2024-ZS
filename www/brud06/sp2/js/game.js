class Main {
    preload() {
        this.load.image('player', 'assets/player.png')
    }
    create() {
        this.player = this.physics.add.sprite(400, 300, 'player');
    }

    update() {
        this.player.angle++;
    }
}

let game = new Phaser.Game({

    width: 800,
    height: 600,
    backgroundColor: '#3498db',
    physics: { default: 'arcade' },
    parent: 'game-container',
});

game.scene.add('main', Main);
game.scene.start('main');