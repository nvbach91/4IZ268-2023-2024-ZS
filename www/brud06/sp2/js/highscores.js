//Class responsible for the highscores scene and fetching data from restDB
class Highscores {
    create() {
        this.loadingGroup = this.add.group();

        const apiKey = '6575b8d23514afc687dcf175';
        let highscoresLabel = this.add.text(400, 50, 'Highscores',
            { font: '50px Arial', fill: '#fff' });
        highscoresLabel.setOrigin(0.5, 0.5);
        this.showLoading();
        // Fetch high scores from RestDB API using jQuery AJAX
        $.ajax({
            url: 'https://platformer-474e.restdb.io/rest/highscores',
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'x-apikey': apiKey,
            }
        })
            .done((data) => {
                this.hideLoading();
                // Process the fetched data
                console.log('Fetched high scores:', data);
                // Sorting highscores
                data.sort((a, b) => b.highscore - a.highscore);
                // Get highest score for a nickname
                const uniqueData = data.filter((value, index, self) => {
                    return self.findIndex(obj => obj.nickname === value.nickname) === index;
                });
                // Only displaying 10 best scores from db
                const topScores = uniqueData.slice(0, 10);

                const fixedX = 300;
                const maxNicknameLength = 10;

                topScores.forEach((score, index) => {
                    const formattedIndex = `${index + 1}.`.padEnd(4);
                    const nickname = score.nickname.padEnd(maxNicknameLength);
                    const text = this.add.text(
                        fixedX,
                        100 + index * 30,
                        `${formattedIndex} ${nickname}: ${score.highscore}`,
                        { fill: '#ffffff', align: 'left' }
                    );
                });

                // Display player's personal best
                const username = localStorage.getItem('username');
                const playerScores = data.filter(score => score.nickname === username);
                if (playerScores.length > 0) {
                    const playerScore = playerScores[0];
                    this.add.text(
                        fixedX,
                        100 + (topScores.length + 1.1) * 30,
                        `Your best: ${playerScore.highscore}`,
                        { fill: '#ffffff', align: 'left', fontSize: '20px' }
                    );
                } else {
                    this.add.text(
                        fixedX,
                        100 + (topScores.length + 1.1) * 30,
                        `Your best: 0`,
                        { fill: '#ffffff', align: 'left', fontSize: '20px' }
                    );
                }
            })
            .fail((error) => {
                this.hideLoading();
                console.error('Error fetching high scores:', error);
            });
        let menuText = 'press M to get back to menu';
        let menuLabel = this.add.text(400, 500, menuText,
            { font: '25px Arial', fill: '#fff' });
        menuLabel.setOrigin(0.5, 0.5);


        this.mKey = this.input.keyboard.addKey('m');
    };

    //After pressing M key - menu scene is started
    update() {
        if (this.mKey.isDown) {
            this.scene.start('menu');
        };
    }
    //Loading spinner
    showLoading() {
        const loadingPlayer = this.add.sprite(400, 300, 'player');
        this.tweens.add({
            targets: loadingPlayer,
            angle: 360,
            duration: 1000,
            repeat: -1,
            ease: 'Linear'
        });
        this.loadingGroup.add(loadingPlayer);
    }
    hideLoading() {
        this.loadingGroup.clear(true, true);
    }
}   
