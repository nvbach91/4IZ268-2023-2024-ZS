//Player sign up scene
//Nickname is stored in local storage to be used in restDB

class Nickname {
    //method creates the scene (text,input)
    create() {
        const errorMessage = this.add.text(400, 500, '', {
            color: 'red',
            fontFamily: 'Arial',
            fontSize: '18px',
        }).setOrigin(0.5);

        const text = this.add.text(400, 80, 'Choose a nickname to play', { color: 'white', fontFamily: 'Arial', fontSize: '32px' });
        text.setOrigin(0.5);

        const element = this.add.dom(400, 300).createFromCache('nameform');

        element.setPerspective(800);

        element.addListener('click');

        let username = localStorage.getItem('username');
        let usernameElement = document.querySelector('#username');
        if (username && usernameElement) {
            usernameElement.value = username;
        }

        //define what happens when the button is clicked
        element.on('click', (event) => {
            if (event.target.name === 'loginButton') {
                const inputUsername = document.getElementById('username');
                const maxCharacters = 10;
                const alphanumericRegex = /^[a-zA-Z0-9]+$/

                // user input validation
                if (inputUsername.value !== '' && inputUsername.value.length <= maxCharacters
                    && alphanumericRegex.test(inputUsername.value)) {
                    
                    element.removeListener('click');

                    //  Fill the welcome text
                    text.setText(`Welcome ${inputUsername.value}`);
                    console.log(inputUsername.value);
                    element.destroy();

                    localStorage.setItem('username', inputUsername.value);

                    // Change scene to 'menu'
                    this.scene.start('menu', { inputUsername: inputUsername.value });

                } else {
                    console.log('Username must be between  1 and 10 characters');
                    errorMessage.setText('Nickname should be 1 to 10 characters and consist of alphanumeric characters');
                    element.destroy();
                    // Restart the scene in case of wrong input
                    setTimeout(() => {
                        this.scene.restart();
                    }, 2500);
                }
            }
        });
    }
}
