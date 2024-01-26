//Class that puts all the scenes together and starts the game
let game = new Phaser.Game({

    width: 800,
    height: 600,
    backgroundColor: '#3498db',
    physics: { default: 'arcade' },
    parent: 'game-container',
    dom: {
        createContainer: true
    },
});

game.scene.add('load', Load);
game.scene.add('menu', Menu);
game.scene.add('play', Play);
game.scene.add('nickname', Nickname);
game.scene.add('highscores', Highscores);


game.scene.start('load');