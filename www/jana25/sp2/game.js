// Your web app's Firebase configuration


App.score = 0;

App.caughtPouch = 0;
App.lostPouch = 0;
App.odlozSlimak = 0;

App.coinsCaught = 0;

App.droppedBigPouches = 0

App.moved = false;

App.caughtPouchIndicator = 0;
App.odlozSlimakIndicator = 0;

App.canUsing;

App.closedImage
App.openImage
App.odlozImage
if (App.signedIn) {
    App.uid = firebase.auth().currentUser.uid;
    firebase.database().ref("users/" + App.uid).once("value")
        .then(function(snapshot) {
            App.canUsing = snapshot.child("canUsing").val();
            App.closedImage = "url(images/can/can" + App.canUsing + "/can0.png)"
            App.openImage = "url(images/can/can" + App.canUsing + "/can2.png)"
            App.odlozImage = "url(images/can/can" + App.canUsing + "/can1.png)"
        });
} else {
    App.canUsing = 0;
    App.closedImage = "url(images/can/can" + App.canUsing + "/can0.png)"
    App.openImage = "url(images/can/can" + App.canUsing + "/can2.png)"
    App.odlozImage = "url(images/can/can" + App.canUsing + "/can1.png)"
}



App.paddleX = 420;

App.odlozToggle = false;

App.counter = 1;
App.phase = 0;

App.thirdPhaseMinAnimationDuration = 300;

App.randomPouchDropInterval;
App.randomPouchDropAxis;
App.randomPouchDropAxis0 = 400;
App.randomPouch;
App.randomPouchRatio;

App.randomCoin;

App.interval = 2000;

App.min = 200;

App.animationDuration = 2.6;

App.sTimeout;
App.sInterval;

function setup() {



    $("#text1, .selectBackground, .selectBg").remove();
    $("body").css("cursor", "none");
    musicCheck();
    $("<div/>", {
        "class": "scoreBox",
        text: App.score
    }).appendTo(".gameArea");
    for (i = 0; i < 5; i++) {
        $("<div/>", {
            "class": "box",
            "id": "box" + i,
        }).appendTo(".gameArea");
        $("#box" + i).css("right", i * 100 + "px")
    }
    $("<div/>", {
        "class": "paddle",
        "id": "paddle",
    }).appendTo(".gameArea");
    $(".paddle").css("background-image", App.closedImage)
    $("<div/>", {
        "class": "paddlePouches",
        "id": "paddlePouches",
    }).appendTo(".gameArea");
    $("<div/>", {
        "class": "paddleSlugs",
        "id": "paddleSlugs",
    }).appendTo(".gameArea");

    $("<div/>", {
        "class": "collisionDetector",
        "id": "collisionDetector",
    }).appendTo(".gameArea");
    game();

}

function game() {
    var keyDownA = false;
    var keyDownD = false;
    document.onkeydown = function(e) {
        if (e.keyCode == 37 || e.keyCode == 65) {
            keyDownA = true;
        } else if (e.keyCode == 39 || e.keyCode == 68) {
            keyDownD = true;
        }
    }

    document.onkeyup = function(e) {
        if (e.keyCode == 37 || e.keyCode == 65) {
            keyDownA = false;
        } else if (e.keyCode == 39 || e.keyCode == 68) {
            keyDownD = false;
        }
    }

    App.sInterval = setInterval(function() {
        if (keyDownA) {
            if (!App.moved) {
                $(".paddle").css("background-image", App.openImage);
                App.moved = true;
            }
            if (App.paddleX < 1092) {
                App.paddleX += 16;
                document.getElementById("paddle").style.right = App.paddleX + "px";
                document.getElementById("paddlePouches").style.right = App.paddleX + "px";
                document.getElementById("paddleSlugs").style.right = App.paddleX + "px";
                document.getElementById("collisionDetector").style.right = App.paddleX + "px";
            }
        } else if (keyDownD) {
            if (!App.moved) {
                $(".paddle").css("background-image", App.openImage);
                App.moved = true;
            }
            if (App.paddleX > 4) {
                App.paddleX -= 16;
                document.getElementById("paddle").style.right = App.paddleX + "px";
                document.getElementById("paddlePouches").style.right = App.paddleX + "px";
                document.getElementById("paddleSlugs").style.right = App.paddleX + "px";
                document.getElementById("collisionDetector").style.right = App.paddleX + "px";

            }
        }
    }, 12.5)

    document.addEventListener("keyup", function(e) {
        if (e.code === "ArrowUp" || e.code === "KeyW") {
            if (!App.odlozToggle) {
                $(".paddle").css("background-image", App.odlozImage);
                $(".paddlePouches").css("display", "none");
                $(".paddleSlugs").css("display", "block");
                App.odlozToggle = true
            } else if (App.odlozToggle) {
                $(".paddle").css("background-image", App.openImage);
                $(".paddleSlugs").css("display", "none");
                $(".paddlePouches").css("display", "block");
                App.odlozToggle = false
            }
        }

    });

    setTimeout(function() {
        startDropping();
    }, 2300);

}

function dropPouch(a, b, c, x, y, z) {
    if (App.randomPouchRatio <= a) App.randomPouch = x;
    else if (App.randomPouchRatio <= b) App.randomPouch = y;
    else if (App.randomPouchRatio <= c) App.randomPouch = z;

    App.randomCoin = Math.floor(Math.random() * 12);

    if (App.counter > 10 && App.randomCoin == 0) {
        $("<div/>", {
            "class": "coinPouch pouch4",
            "id": "coin" + App.counter
        }).appendTo(".gameArea");

        document.getElementById("coin" + App.counter).style.right = App.randomPouchDropAxis0 + "px";
        document.getElementById("coin" + App.counter).addEventListener("animationend", reachedCan)
    }

    if (App.randomPouch <= 2) {
        $("<div/>", {
            "class": "pouch pouch" + App.randomPouch,
            "id": "pouch" + App.counter,
        }).appendTo(".gameArea");

    } else if (App.randomPouch == 3) {
        $("<div/>", {
            "class": "bigPouch pouch" + App.randomPouch,
            "id": "pouch" + App.counter,
        }).appendTo(".gameArea");
    }
    if (App.randomPouch == 3 && App.randomPouchDropAxis > 1130) {
        document.getElementById("pouch" + App.counter).style.right = App.randomPouchDropAxis - 140 + "px";
    } else {
        document.getElementById("pouch" + App.counter).style.right = App.randomPouchDropAxis + "px";
    }
}

function dropPouchPhase3(a, b, c, d, x, y, z, q) {
    if (App.randomPouchRatio <= a) App.randomPouch = x;
    else if (App.randomPouchRatio <= b) App.randomPouch = y;
    else if (App.randomPouchRatio <= c) App.randomPouch = z;
    else if (App.randomPouchRatio <= d) App.randomPouch = q;

    App.randomCoin = Math.floor(Math.random() * 3);

    if (App.randomCoin == 0) {
        $("<div/>", {
            "class": "coinPouch pouch4",
            "id": "coin" + App.counter
        }).appendTo(".gameArea");

        document.getElementById("coin" + App.counter).style.right = App.randomPouchDropAxis0 + "px";
        document.getElementById("coin" + App.counter).addEventListener("animationend", reachedCan)
    }

    if (App.randomPouch <= 2) {
        $("<div/>", {
            "class": "pouch pouch" + App.randomPouch,
            "id": "pouch" + App.counter,
        }).appendTo(".gameArea");
    } else if (App.randomPouch == 3) {
        $("<div/>", {
            "class": "bigPouch pouch" + App.randomPouch,
            "id": "pouch" + App.counter,
        }).appendTo(".gameArea");
    }
    if (App.randomPouch == 3 && App.randomPouchDropAxis > 1130) {
        document.getElementById("pouch" + App.counter).style.right = App.randomPouchDropAxis - 140 + "px";
    } else {
        document.getElementById("pouch" + App.counter).style.right = App.randomPouchDropAxis + "px";
    }
}



function startDropping() {
    App.randomPouchRatio = Math.floor(Math.random() * 15);
    App.randomPouchDropAxis = Math.floor(Math.random() * 1280);

    checkPosition();




    if (App.phase == 0) {
        dropPouch(7, 12, 14, 0, 2, 1);
        if (App.counter < 50) {
            if (App.counter > 0 && App.counter < 20) {
                App.min = App.min + 14

            }
            App.animationDuration = App.animationDuration - 0.03;
            $("#pouch" + App.counter).css("animation-duration", App.animationDuration + "s");
            App.interval = App.interval - 20
        } else {

            App.min = 450;
            App.interval = 750;


            App.phase = 1;


        }
    } else if (App.phase == 1) {
        if (App.counter < 140) {
            dropPouch(4, 13, 14, 1, 2, 3);
        } else {
            dropPouch(4, 13, 14, 1, 2, 1);
        }
        if (App.counter < 150) {
            App.interval = App.interval - 5;
            App.min = App.min - 5;
            App.animationDuration = Math.floor(Math.random() * (350 - 250) + 250) / 100
            if (App.randomPouch == 3) {
                $(".pouch3").css("animation-duration", "6s");
            } else {
                $("#pouch" + App.counter).css("animation-duration", App.animationDuration + "s");
            }
        } else {

            App.min = 900;
            App.interval = 1400;
            $(".pouch0, .pouch1, .pouch2").css("animation-duration", "");
            App.phase = 2;
        }
    } else if (App.phase == 2) {
        dropPouch(6, 10, 14, 0, 1, 2)


        if (App.counter < 250) {
            App.animationDuration = Math.floor(Math.random() * (100 - 70) + 70) / 100;
            $("#pouch" + App.counter).css("animation-duration", App.animationDuration + "s");
            App.interval = App.interval + 5;



        } else {
            App.min = 800;
            App.interval = 1600;
            App.phase = 3;
        }

    } else if (App.phase == 3) {
        dropPouchPhase3(6, 7, 13, 14, 0, 1, 2, 3);

        App.thirdPhaseMinAnimationDuration = App.thirdPhaseMinAnimationDuration - 2;
        App.interval = App.interval - 5;
        App.min = App.min - 1;

        App.animationDuration = Math.floor(Math.random() * (800 - App.thirdPhaseMinAnimationDuration) + App.thirdPhaseMinAnimationDuration) / 100;
        $("#pouch" + App.counter).css("animation-duration", App.animationDuration + "s");
    }



    document.getElementById("pouch" + App.counter).addEventListener("animationend", reachedCan)
    App.counter++;
    App.randomPouchDropAxis0 = App.randomPouchDropAxis;
    App.sTimeout = setTimeout(startDropping, Math.floor(Math.random() * App.interval) + App.min)

}

function checkPosition() {
    if (((App.randomPouchDropAxis + 700) < App.randomPouchDropAxis0) || ((App.randomPouchDropAxis - 700) > App.randomPouchDropAxis0)) {
        App.randomPouchDropAxis = Math.floor(Math.random() * 1280);
        checkPosition();
    } else return
}

function reachedCan() {
    var xP, xC;
    if (this.classList.contains("bigPouch")) {
        xP = 120;
        xC = 167
    } else if (this.classList.contains("coinPouch")) {
        xP = 25;
        xC = 262
    } else {
        xP = 50;
        xC = 237
    }


    if (parseInt(this.style.right) + xP >= parseInt(document.getElementById("collisionDetector").style.right) && parseInt(this.style.right) <= parseInt(document.getElementById("collisionDetector").style.right) + xC) {
        if (!App.odlozToggle) {
            if (this.className.split(' ')[1] == "pouch0") {
                changeScore(1, "pouch");
                if (App.sound == 1) document.getElementById("pouchCan").play();
            } else if (this.className.split(' ')[1] == "pouch1") {
                endClear();
            } else if (this.className.split(' ')[1] == "pouch2") {
                if (App.score > 0) changeScore(-1, "lyft")
                if (App.sound == 1) document.getElementById("lyft").play();
            } else if (this.className.split(' ')[1] == "pouch3") {
                changeScore(5, "pouch")
                if (App.sound == 1) document.getElementById("bigPouchCan").play();
            } else if (this.className.split(' ')[1] == "pouch4") {
                App.coinsCaught++;
                if (App.sound == 1) document.getElementById("coinCatch").play();
                $(".scoreBox").css({
                    "background-color": "#ffff00",
                    "color": "#1a1a00"
                });
                setTimeout(function() {
                    $(".scoreBox").css({
                        "background-color": "#ff1100",
                        "color": "#fff"
                    });
                }, 150)
            }
        } else if (App.odlozToggle) {
            if (this.className.split(' ')[1] == "pouch0") {
                missedPouch();
                if (App.sound == 1) document.getElementById("pouchLoss").play();
            } else if (this.className.split(' ')[1] == "pouch1") {
                changeScore(1, "slimak");
                if (App.sound == 1) document.getElementById("slimejs").play();
            } else if (this.className.split(' ')[1] == "pouch2") {
                if (App.score > 0) changeScore(-1, "lyft")
                if (App.sound == 1) document.getElementById("lyft").play();
            } else if (this.className.split(' ')[1] == "pouch3") {
                if (App.score > 9) changeScore(-5, "pouch");
                missedPouch();
                if (App.sound == 1) document.getElementById("pouchLoss").play();
            } else if (this.className.split(' ')[1] == "pouch4") {
                App.coinsCaught++;
                if (App.sound == 1) document.getElementById("coinCatch").play();
                $(".scoreBox").css({
                    "background-color": "#ffff00",
                    "color": "#1a1a00"
                });
                setTimeout(function() {
                    $(".scoreBox").css({
                        "background-color": "#ff1100",
                        "color": "#fff"
                    });
                }, 150)
            }
        }
        this.remove();
    } else {
        if (this.className.split(' ')[1] == "pouch0") {
            missedPouch();
            if (App.sound == 1) document.getElementById("pouchLoss").play();
        } else if (this.className.split(' ')[1] == "pouch3") {
            if (App.score > 9) changeScore(-5, "pouch");
            missedPouch();
            if (App.sound == 1) document.getElementById("pouchLoss").play();
        }
        if (this.classList.contains("pouch")) {
            this.classList.remove("pouch");
            this.classList.add("pouchMissed");
            this.addEventListener("animationend", removeMissedPouch)
        } else if (this.classList.contains("bigPouch")) {
            this.classList.remove("bigPouch");
            this.classList.add("bigPouchMissed");
            this.addEventListener("animationend", removeMissedPouch)
        } else if (this.classList.contains("coinPouch")) {
            this.classList.remove("coinPouch");
            this.classList.add("coinPouchMissed");
            this.addEventListener("animationend", removeMissedPouch)
        }



    }
}

function removeMissedPouch() {
    this.remove();
}

function changeScore(change, pouchOrSlimak) {
    App.score = App.score + change;
    $(".scoreBox").text(App.score);
    if (pouchOrSlimak == "pouch") {
        App.caughtPouch++
        if (App.caughtPouch % 4 == 0 && App.caughtPouch <= 40) {

            if (App.canUsing == 3) {

                $(".paddlePouches").css("background-image", "url(images/pouchLayers/pouchLayers3/pouchLayer" + App.caughtPouchIndicator + ".png");
            } else {
                $(".paddlePouches").css("background-image", "url(images/pouchLayers/pouchLayers/pouchLayer" + App.caughtPouchIndicator + ".png");
            }
            App.caughtPouchIndicator++
        }
    } else if (pouchOrSlimak == "slimak") {
        App.odlozSlimak++
        if (App.odlozSlimak <= 10) {

            if (App.canUsing == 3) {
                $(".paddleSlugs").css("background-image", "url(images/slugLayers/slugLayers3/slugLayer" + App.odlozSlimakIndicator + ".png");
            } else {
                $(".paddleSlugs").css("background-image", "url(images/slugLayers/slugLayers/slugLayer" + App.odlozSlimakIndicator + ".png");
            }
            App.odlozSlimakIndicator++
        } else if (App.odlozSlimak == 20) {
            if (App.canUsing == 3) {
                $(".paddleSlugs").css("background-image", "url(images/slugLayers/slugLayers3/slugLayer10.png");
            } else {
                $(".paddleSlugs").css("background-image", "url(images/slugLayers/slugLayers/slugLayer10.png");
            }


        }
    }
}

function missedPouch() {
    $("#box" + App.lostPouch).css("background-image", "url(images/pouch/pouchLoss.png");
    App.lostPouch++;
    if (App.lostPouch == 5) endClear();
}

function endClear() {
    clearTimeout(App.sTimeout);
    clearInterval(App.sInterval);
    $(".box, .scoreBox, .paddle, .paddlePouches, .paddleSlugs, .collisionDetector, .pouch, .pouchMissed, .bigPouch, .bigPouchMissed, .coinPouch, .coinPouchMissed").remove();
    $(".gameArea").css("background-image", "url(images/background/finish.jpg)");
    $("body").css("cursor", "default");
    if (App.music == 1) {
        App.music = 0;
        musicCheck();
    }
    if (App.sound == 1) {
        document.getElementById("lose").play();
    }

    saveScore();
}

function saveScore() {
    $("<div/>", {
        "class": "saveScore"
    }).appendTo(".gameArea");
    $("<p/>", {
        "class": "textStats",
        text: "SCORE " + App.score
    }).appendTo(".saveScore")
    $("<input>", {
        "class": "enterName",
        "type": "text",
        "placeholder": "YOUR NAME",
        "maxlength": "16",
        "name": "username",
        "id": "username"
    }).appendTo(".saveScore");
    $("<br/>").appendTo(".saveScore");
    $("<input>", {
        "class": "submitName",
        "id": "submitName",
        "type": "submit",
        "value": "SUBMIT"
    }).appendTo(".saveScore");

    document.getElementById("username").addEventListener("keyup", function(event) {
        if (event.keyCode === 13) {
            event.preventDefault();
            document.getElementById("submitName").click();
        }
    });

    $(".submitName").click(function() {
        $(".saveScore").css({
            "width": "900",
            "height": "680",
            "margin-top": "80px"
        });
        $("<div/>", {
            "class": "leaderboard"
        }).appendTo(".saveScore");
        for (i = 0; i < 100; i++) {
            if (i < 10) {
                $("<div/>", {
                    "class": "place",
                    "id": "place" + i
                }).appendTo(".leaderboard")
            } else {
                $("<div/>", {
                    "class": "placeSmall",
                    "id": "place" + i
                }).appendTo(".leaderboard")
            }

        }



        if (App.signedIn) {
            var uid = firebase.auth().currentUser.uid;

            var balanceI;
            var caughtPouchesI;
            var gamesPlayedI;
            var highScoreI;


            firebase.database().ref("users/" + uid).once("value")
                .then(function(snapshot) {
                    balanceI = snapshot.child("balance").val();
                    balanceI = balanceI + App.coinsCaught;
                    caughtPouchesI = snapshot.child("caughtPouches").val();
                    caughtPouchesI = caughtPouchesI + App.caughtPouch;
                    gamesPlayedI = snapshot.child("gamesPlayed").val();
                    gamesPlayedI++;
                    highScoreI = snapshot.child("highScore").val();
                    if (App.score >= highScoreI) {
                        highScoreI = App.score;
                    } else {
                        highScoreI = highScoreI
                    }

                })

            setTimeout(function() {
                firebase.database().ref("users/" + uid)
                    .child("balance").set(balanceI);
                firebase.database().ref("users/" + uid)
                    .child("caughtPouches").set(caughtPouchesI);
                firebase.database().ref("users/" + uid)
                    .child("gamesPlayed").set(gamesPlayedI);
                firebase.database().ref("users/" + uid)
                    .child("highScore").set(highScoreI);


            }, 3000)


        }

        var ref = firebase.database().ref("leaderboard");

        if (App.score > 10) {

            var data = {
                name: username.value,
                score: App.score,
            }


            ref.push(data);
        }

        ref.on("value", getData)


        $(".textStats, .enterName, .submitName").remove();

        setTimeout(function() {
            $("<button/>", {
                "class": "goOverview",
                "text": "OK"
            }).appendTo(".saveScore");

            $(".goOverview").hover(function() {
                if (App.sound == 1) {
                    document.getElementById("click0").play();
                }
            }, function() {});

            $(".goOverview").click(function() {
                if (App.sound == 1) document.getElementById("click2").play();
                $(".goOverview, .leaderboard, .saveScore").remove();
                overview();
            });


        }, 2000)


    });
    $(".submitName").hover(function() {
        if (App.sound == 1) {
            document.getElementById("click0").play();
        }
    }, function() {});
    $(".submitName").click(function() {
        if (App.sound == 1) {
            document.getElementById("click2").play();
        }
    });

}

function getData(data) {
    var leaderboard = data.val();
    var keys = Object.keys(leaderboard);
    keys.sort((a, b) => (leaderboard[a].score < leaderboard[b].score) ? 1 : -1)
    var content = "";
    for (i = 0; i < 100; i++) {
        var k = keys[i];
        var name = leaderboard[k].name;
        var score = leaderboard[k].score;

        if (i < 10) {
            placeClass = "place";
        } else {
            placeClass = "placeSmall";
        }


        content += '<div class="' + placeClass + '" id="place' + i + '">' + (i + 1) + ". " + name + " " + score + '</div>';
    }

    $(".leaderboard").html(content);
}

function overview() {
    $("<p/>", {
        "class": "textEnd",
        text: "THE GAME HAS ENDED"
    }).appendTo(".gameArea")
    $("<p/>", {
        "class": "textStats",
        text: App.caughtPouch + " POUCHES IN THE CAN"
    }).appendTo(".gameArea")
    $("<p/>", {
        "class": "textStats",
        text: App.odlozSlimak + " SLUGS IN THE CATCH LID"
    }).appendTo(".gameArea")
    $("<p/>", {
        "class": "textStats",
        text: "SCORE " + App.score
    }).appendTo(".gameArea")
    $("<button/>", {
        "class": "playAgain",
        "text": "PLAY AGAIN"
    }).appendTo(".gameArea")

    $(".playAgain").click(function() {
        $(".textEnd, .textStats, .playAgain").remove();
        //location.reload();
        restart();
    });
}

function restart() {
    App.score = 0;

    App.caughtPouch = 0;
    App.lostPouch = 0;
    App.odlozSlimak = 0;

    App.coinsCaught = 0;

    App.droppedBigPouches = 0

    App.moved = false;

    App.caughtPouchIndicator = 0;
    App.odlozSlimakIndicator = 0;

    App.paddleX = 420;

    App.odlozToggle = false;

    App.counter = 1;
    App.phase = 0;

    App.thirdPhaseMinAnimationDuration = 300;

    App.randomPouchDropAxis0 = 400;


    App.interval = 2000;

    App.min = 200;

    App.animationDuration = 2.6;
    start();

    $(".buttonDiv, .buttonButton").css("display", "inline-block");


    setUpSounds();

}