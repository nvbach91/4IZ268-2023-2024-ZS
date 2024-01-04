App.music = 0;
App.sound = 0;
App.gameStart = 0;
App.randomMusic = Math.floor(Math.random() * 3) + 1;
$(document).ready(function() {
    for (i = 3; i > 0; i--) {
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

function musicCheck() {
    if (App.music == 1) {
        document.getElementById("main").pause();
        document.getElementById("game" + App.randomMusic).play();
        document.getElementById("game" + App.randomMusic).onended = function() {
            document.getElementById("game" + App.randomMusic).play();
        }
    } else if (App.music == 0) {
        document.getElementById("game" + App.randomMusic).pause();


    }
}


function setUpSounds() {
    $(".buttonDiv").hover(function() {
        if (App.sound == 1) {
            document.getElementById("click0").play();
        }
    }, function() {});
    $(".playButton").hover(function() {
        if (App.sound == 1) {
            document.getElementById("click1").play();
        }
    }, function() {});
    $("#soundButton").click(function() {
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
    $("#musicButton").click(function() {
        if (App.music == 0) {
            document.getElementById("main").play();
            $("#musicDiv").css("background-image", "url(images/buttons/musicOn.png)");
            App.music = 1;
            document.getElementById("main").onended = function() {
                document.getElementById("main").play();
            }
        } else if (App.music == 1) {
            document.getElementById("main").pause();
            document.getElementById("main").currentTime = 0;
            $("#musicDiv").css("background-image", "url(images/buttons/musicOff.png)");
            App.music = 0;
        }
    });
    $("#profileButton").click(function() {
        if (App.sound == 1) document.getElementById("click0").play();
    });


    $("#tutorialButton").click(function() {
        window.open("https://youtu.be/48p4Ljkqb9U")
    });
}