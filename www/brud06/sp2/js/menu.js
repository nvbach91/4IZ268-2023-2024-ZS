//Menu scene - displays menu, highscore and best score also sends highscore to restDB
class Menu {
    //Creates the scene
    create(data) {

        let username = localStorage.getItem('username');
        let score = data.score ? data.score : 0;

        this.add.image(400, 300, 'background');

        if (localStorage.getItem('bestScore') === null) {
            localStorage.setItem('bestScore', 0);
        }

        if (score > localStorage.getItem('bestScore')) {
            localStorage.setItem('bestScore', score);
            this.postHighscore({
                nickname: username, // Pass the username
                score: score // Pass the score
            });;
        }
        let usernameText = 'Welcome to the game ' + username;
        console.log(username);

        let nameLabel = this.add.text(400, 170, 'Credit collector',
            { font: '50px Arial', fill: '#fff' });
        nameLabel.setOrigin(0.5, 0.5);

        let usernameLabel = this.add.text(400, 20, usernameText,
            { font: '20px Arial', fill: '#fff' });
        usernameLabel.setOrigin(0.5, 0.5);

        let scoreText = 'score: ' + score +
            '\nbest score: ' + localStorage.getItem('bestScore');
        let scoreLabel = this.add.text(400, 260, scoreText,
            { font: '25px Arial', fill: '#fff' });
        scoreLabel.setOrigin(0.5, 0.5);

        let startText = 'press the up arrow key to start';
        let startLabel = this.add.text(400, 350, startText,
            { font: '25px Arial', fill: '#fff' });
        startLabel.setOrigin(0.5, 0.5);
        let highscoreText = 'press H to see highscores';
        let highscoreLabel = this.add.text(400, 450, highscoreText,
            { font: '25px Arial', fill: '#fff' });
        highscoreLabel.setOrigin(0.5, 0.5);

        this.upKey = this.input.keyboard.addKey('up');
        this.hKey = this.input.keyboard.addKey('h');


    }
    //Starting scenes based on key pressed
    update() {
        if (this.upKey.isDown) {
            this.scene.start('play');
        }
        else if (this.hKey.isDown) {
            this.scene.start('highscores');
        }
    }
    //post highscore to restDB
    postHighscore(data) {
        let newScore = {
            nickname: data.nickname,
            highscore: data.score ? data.score : 0
        };
        const apiKey = '6575b8d23514afc687dcf175';
        $.ajax({
            url: 'https://platformer-474e.restdb.io/rest/highscores',
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'x-apikey': apiKey
            },
            data: JSON.stringify(newScore),
            success: (response) => {
                console.log(newScore);
                console.log('New high score posted:', response);
            },
            error: (error) => {
                console.error('Error posting high score:', error);
            }
        });
    }
}