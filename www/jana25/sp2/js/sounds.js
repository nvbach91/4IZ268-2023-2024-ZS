App.music = 0;
App.sound = 0;
App.gameStart = 0;
App.randomMusic = Math.floor(Math.random() * 3) + 1;
$(document).ready(() => {
    for (let i = 3; i > 0; i--) {
        $("<audio/>", {
            "id": "game" + i
        }).prependTo("body");
        $("<source>", {
            "src": "sounds/game" + i + ".mp3",
            "type": "audio/mpeg"
        }).appendTo("#game" + i);
    }


    setUpSounds();

});

const musicCheck = () => {
    if (App.music == 1) {
        document.getElementById("main").pause();
        document.getElementById("game" + App.randomMusic).play();
        document.getElementById("game" + App.randomMusic).onended = () => {
            document.getElementById("game" + App.randomMusic).play();
        }
    } else if (App.music == 0) {
        document.getElementById("game" + App.randomMusic).pause();


    }
}


const setUpSounds = () => {
    $(".buttonDiv").hover(() => {
        if (App.sound == 1) {
            document.getElementById("click0").play();
        }
    }, () => {});
    $(".playButton").hover(() => {
        if (App.sound == 1) {
            document.getElementById("click1").play();
        }
    }, () => {});
    $("#soundButton").click(() => {
        if (App.sound == 0) {
            document.getElementById("click0").play();
            $("#soundDiv").css("background-image", "url(images/buttons/soundOn.png)");
            App.sound = 1;
        } else if (App.sound == 1) {
            document.getElementById("click0").play();
            $("#soundDiv").css("background-image", "url(images/buttons/soundOff.png)");
            App.sound = 0;
        }
    });
    $("#musicButton").click(() => {
        if (App.music == 0) {
            document.getElementById("main").play();
            $("#musicDiv").css("background-image", "url(images/buttons/musicOn.png)");
            App.music = 1;
            document.getElementById("main").onended = () => {
                document.getElementById("main").play();
            }
        } else if (App.music == 1) {
            document.getElementById("main").pause();
            document.getElementById("main").currentTime = 0;
            $("#musicDiv").css("background-image", "url(images/buttons/musicOff.png)");
            App.music = 0;
        }
    });
    $("#profileButton").click(() => {
        if (App.sound == 1) document.getElementById("click0").play();
    });


    $("#tutorialButton").click(() => {
        window.open("https://youtu.be/48p4Ljkqb9U")
    });
}