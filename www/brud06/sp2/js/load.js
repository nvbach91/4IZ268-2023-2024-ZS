//Loading scene - Loading assets to minimize loading times later

class Load {
    //method does the loading
    preload() {
        this.load.html('nameform', 'assets/input.html');
        this.load.spritesheet('player', 'assets/player2.png', {
            frameWidth: 20,
            frameHeight: 20,
        });

        this.load.image('coin', 'assets/coin.png');
        this.load.image('enemy', 'assets/bomb.png')
        this.load.image('background', 'assets/background.png');
        this.load.image('wallV', 'assets/wallVertical.png');
        this.load.image('wallH', 'assets/wallHorizontal.png');
        this.load.audio('coin', ['assets/music/coin.mp3', 'assets/music/coin.ogg']);
        this.load.audio('jump', ['assets/music/jump.mp3', 'assets/music/jump.ogg']);
        this.load.audio('dead', ['assets/music/dead.mp3', 'assets/music/dead.ogg']);

        let loadLabel = this.add.text(400, 400, 'loading\n%', { font: '30px Arial', fill: '#fff', align: 'center' });
        loadLabel.setOrigin(0.5, 0.5);
        this.load.on('progress', (value) => {
            let percentage = Math.round(value * 100) + '%';
            loadLabel.setText('loading\n' + percentage);
        });

    }
    //when everything loads - nickname scene is started
    create() {
        this.scene.start('nickname');
    }


}