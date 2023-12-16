

// Your web app's Firebase configuration


var score = 0;

var caughtPouch = 0;
var lostPouch = 0;
var odlozSlimak = 0;

var coinsCaught = 0;

var droppedBigPouches = 0

var moved = false;

var caughtPouchIndicator = 0;
var odlozSlimakIndicator = 0;

var canUsing;
 
var closedImage 
var openImage 
var odlozImage 
if(signedIn) {
    var uid = firebase.auth().currentUser.uid;
    firebase.database().ref("users/" + uid).once("value")
      .then(function (snapshot) {
        canUsing = snapshot.child("canUsing").val();
        closedImage = "url(images/can/can"+ canUsing +"/can0.png)"
openImage = "url(images/can/can"+ canUsing +"/can2.png)"
odlozImage = "url(images/can/can"+ canUsing +"/can1.png)"
      });
} else {
    canUsing = 0;
closedImage = "url(images/can/can"+ canUsing +"/can0.png)"
openImage = "url(images/can/can"+ canUsing +"/can2.png)"
odlozImage = "url(images/can/can"+ canUsing +"/can1.png)"
}



var paddleX = 420;

var odlozToggle = false;

var counter = 1;
var phase = 0;

var thirdPhaseMinAnimationDuration = 300;

var randomPouchDropInterval;
var randomPouchDropAxis;
var randomPouchDropAxis0 = 400;
var randomPouch;
var randomPouchRatio;

var randomCoin;

var interval = 2000;

var min = 200;

var animationDuration = 2.6;

var sTimeout;
var sInterval;

function setup() {



    $("#text1, .selectBackground, .selectBg").css("display", "none");
    $("body").css("cursor", "none");
    musicCheck();
    $("<div/>", {
        "class": "scoreBox",
        text: score
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
    $(".paddle").css("background-image",closedImage)
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
    document.onkeydown = function (e) {
        if (e.keyCode == 37 || e.keyCode == 65) {
            keyDownA = true;
        } else if (e.keyCode == 39 || e.keyCode == 68) {
            keyDownD = true;
        }
    }

    document.onkeyup = function (e) {
        if (e.keyCode == 37 || e.keyCode == 65) {
            keyDownA = false;
        } else if (e.keyCode == 39 || e.keyCode == 68) {
            keyDownD = false;
        }
    }

    sInterval = setInterval(function () {
        if (keyDownA) {
            if (!moved) {
                $(".paddle").css("background-image", openImage);
                moved = true;
            }
            if (paddleX < 1092) {
                paddleX += 16;
                document.getElementById("paddle").style.right = paddleX + "px";
                document.getElementById("paddlePouches").style.right = paddleX + "px";
                document.getElementById("paddleSlugs").style.right = paddleX + "px";
                document.getElementById("collisionDetector").style.right = paddleX + "px";
            }
        } else if (keyDownD) {
            if (!moved) {
                $(".paddle").css("background-image", openImage);
                moved = true;
            }
            if (paddleX > 4) {
                paddleX -= 16;
                document.getElementById("paddle").style.right = paddleX + "px";
                document.getElementById("paddlePouches").style.right = paddleX + "px";
                document.getElementById("paddleSlugs").style.right = paddleX + "px";
                document.getElementById("collisionDetector").style.right = paddleX + "px";

            }
        }
    }, 12.5)

    document.addEventListener("keyup", function (e) {
        if (e.code === "ArrowUp" || e.code === "KeyW") {
            if (!odlozToggle) {
                $(".paddle").css("background-image", odlozImage);
                $(".paddlePouches").css("display","none");
                $(".paddleSlugs").css("display","block");
                odlozToggle = true
            } else if (odlozToggle) {
                $(".paddle").css("background-image", openImage);
                $(".paddleSlugs").css("display","none");
                $(".paddlePouches").css("display","block");
                odlozToggle = false
            }
        }

    });

    setTimeout(function () {
        startDropping();
    }, 2300);

}

function dropPouch(a,b,c,x,y,z) {
    if (randomPouchRatio <= a) randomPouch = x;
        else if (randomPouchRatio <= b) randomPouch = y;
        else if (randomPouchRatio <= c) randomPouch = z;
        
        randomCoin = Math.floor(Math.random() * 12);

        if (counter > 10 && randomCoin == 0) {
            $("<div/>", {
                "class" : "coinPouch pouch4",
                "id" : "coin"+counter
            }).appendTo(".gameArea");

            document.getElementById("coin" + counter).style.right = randomPouchDropAxis0 + "px";
            document.getElementById("coin" + counter).addEventListener("animationend", reachedCan)
        }
        
        if (randomPouch <= 2) {
        $("<div/>", {
            "class": "pouch pouch" + randomPouch,
            "id": "pouch" + counter,
        }).appendTo(".gameArea");
        
        } else if (randomPouch == 3) {
            $("<div/>", {
                "class": "bigPouch pouch" + randomPouch,
                "id": "pouch" + counter,
            }).appendTo(".gameArea");
        }
        if(randomPouch == 3 && randomPouchDropAxis > 1130) {
            document.getElementById("pouch" + counter).style.right = randomPouchDropAxis - 140 + "px";
        } else {
            document.getElementById("pouch" + counter).style.right = randomPouchDropAxis + "px";
        }
}

function dropPouchPhase3(a,b,c,d,x,y,z,q) {
    if (randomPouchRatio <= a) randomPouch = x;
        else if (randomPouchRatio <= b) randomPouch = y;
        else if (randomPouchRatio <= c) randomPouch = z;
        else if (randomPouchRatio <= d) randomPouch = q;
        
        randomCoin = Math.floor(Math.random() * 3);

        if (randomCoin == 0) {
            $("<div/>", {
                "class" : "coinPouch pouch4",
                "id" : "coin"+counter
            }).appendTo(".gameArea");

            document.getElementById("coin" + counter).style.right = randomPouchDropAxis0 + "px";
            document.getElementById("coin" + counter).addEventListener("animationend", reachedCan)
        }

        if (randomPouch <= 2) {
        $("<div/>", {
            "class": "pouch pouch" + randomPouch,
            "id": "pouch" + counter,
        }).appendTo(".gameArea");
        } else if (randomPouch == 3) {
            $("<div/>", {
                "class": "bigPouch pouch" + randomPouch,
                "id": "pouch" + counter,
            }).appendTo(".gameArea");
        }
        if(randomPouch == 3 && randomPouchDropAxis > 1130) {
            document.getElementById("pouch" + counter).style.right = randomPouchDropAxis - 140 + "px";
        } else {
            document.getElementById("pouch" + counter).style.right = randomPouchDropAxis + "px";
        }
}



function startDropping() {
    randomPouchRatio = Math.floor(Math.random() * 15);
    randomPouchDropAxis = Math.floor(Math.random() * 1280);
    
    checkPosition();

    



    

    
    
    if(phase == 0) {
        dropPouch(7,12,14,0,2,1);
        if (counter < 50) {
            if (counter > 0 && counter < 20) {
                min = min + 14
                
            }
            animationDuration = animationDuration - 0.03;
            $("#pouch"+counter).css("animation-duration", animationDuration + "s");
        interval = interval - 20
        } else {

            min = 450;
            interval = 750;
            

                phase = 1;


        }
    } else if (phase == 1) {   
        if (counter < 140) {
            dropPouch(4,13,14,1,2,3);
        } else {
            dropPouch(4,13,14,1,2,1);
        }
        if (counter < 150) {
            interval = interval - 5;
            min = min - 5;
            animationDuration = Math.floor(Math.random() * (350 - 250) + 250) / 100
            if(randomPouch == 3) {
                $(".pouch3").css("animation-duration","6s");
            } else {
            $("#pouch"+counter).css("animation-duration", animationDuration + "s");
            }
        } else {

            min = 900;
            interval = 1400;
            $(".pouch0, .pouch1, .pouch2").css("animation-duration","");
            phase = 2;
        }
    } else if (phase == 2) {
        dropPouch(6,10,14,0,1,2)
        
        
        if (counter < 250) {
            animationDuration = Math.floor(Math.random() * (100 - 70) + 70) / 100;
            $("#pouch"+counter).css("animation-duration", animationDuration + "s");
            interval = interval + 5;



        } else {
            min = 800;
            interval = 1600;
            phase = 3;
        }
        
    } else if (phase == 3) {
        dropPouchPhase3(6,7,13,14,0,1,2,3);

            thirdPhaseMinAnimationDuration = thirdPhaseMinAnimationDuration - 2;
            interval = interval - 5;
            min = min - 1;
        
        animationDuration = Math.floor(Math.random() * (800 - thirdPhaseMinAnimationDuration) + thirdPhaseMinAnimationDuration) / 100;
        $("#pouch"+counter).css("animation-duration", animationDuration + "s");
    }
    
    

    document.getElementById("pouch" + counter).addEventListener("animationend", reachedCan)
    counter++;
    randomPouchDropAxis0 = randomPouchDropAxis;
    sTimeout = setTimeout(startDropping, Math.floor(Math.random() * interval) + min)
    
}

function checkPosition() {
    if(((randomPouchDropAxis + 700) < randomPouchDropAxis0) || ((randomPouchDropAxis - 700) > randomPouchDropAxis0)) {
        randomPouchDropAxis = Math.floor(Math.random() * 1280);
        checkPosition();
    } else return
    }

function reachedCan() {
    var xP, xC;
    if(this.classList.contains("bigPouch")) {
        xP = 120;
        xC = 167
    } else if(this.classList.contains("coinPouch")) {
        xP = 25;
        xC = 262
    } else  {
        xP = 50;
        xC = 237
    }
    
    
    if (parseInt(this.style.right) + xP >= parseInt(document.getElementById("collisionDetector").style.right) && parseInt(this.style.right) <= parseInt(document.getElementById("collisionDetector").style.right) + xC) {
        if (!odlozToggle) {
            if (this.className.split(' ')[1] == "pouch0") {
                changeScore(1, "pouch");
                if (sound == 1) document.getElementById("pouchCan").play();
            } else if (this.className.split(' ')[1] == "pouch1") {
                endClear();
            } else if (this.className.split(' ')[1] == "pouch2") {
                if (score > 0) changeScore(-1, "lyft")
                if (sound == 1) document.getElementById("lyft").play();
            } else if (this.className.split(' ')[1] == "pouch3") {
                changeScore(5, "pouch")
                if (sound == 1) document.getElementById("bigPouchCan").play();
            } else if (this.className.split(' ')[1] == "pouch4") {
                coinsCaught++;
                if (sound == 1) document.getElementById("coinCatch").play();
                $(".scoreBox").css({"background-color": "#ffff00", "color": "#1a1a00"});
                setTimeout(function(){
                    $(".scoreBox").css({"background-color": "#ff1100", "color": "#fff"});
                },150)
            }
        } else if (odlozToggle) {
            if (this.className.split(' ')[1] == "pouch0") {
                missedPouch();
                if (sound == 1) document.getElementById("pouchLoss").play();
            } else if (this.className.split(' ')[1] == "pouch1") {
                changeScore(1, "slimak");
                if (sound == 1) document.getElementById("slimejs").play();
            } else if (this.className.split(' ')[1] == "pouch2") {
                if (score > 0) changeScore(-1, "lyft")
                if (sound == 1) document.getElementById("lyft").play();
            } else if (this.className.split(' ')[1] == "pouch3") {
                if (score > 9) changeScore(-5, "pouch");
                missedPouch();
                if (sound == 1) document.getElementById("pouchLoss").play();
            } else if (this.className.split(' ')[1] == "pouch4") {
                coinsCaught++;
                if (sound == 1) document.getElementById("coinCatch").play();
                $(".scoreBox").css({"background-color": "#ffff00", "color": "#1a1a00"});
                setTimeout(function(){
                    $(".scoreBox").css({"background-color": "#ff1100", "color": "#fff"});
                },150)
            }
        }
        this.remove();
    } else {
        if (this.className.split(' ')[1] == "pouch0") {
            missedPouch();
            if (sound == 1) document.getElementById("pouchLoss").play();
        } else if (this.className.split(' ')[1] == "pouch3") {
            if (score > 9) changeScore(-5, "pouch");
            missedPouch();
            if (sound == 1) document.getElementById("pouchLoss").play();
        }
        if(this.classList.contains("pouch")) {
            this.classList.remove("pouch");
            this.classList.add("pouchMissed");
            this.addEventListener("animationend", removeMissedPouch)
        } else if(this.classList.contains("bigPouch")) {
            this.classList.remove("bigPouch");
            this.classList.add("bigPouchMissed");
            this.addEventListener("animationend", removeMissedPouch)
        } else if(this.classList.contains("coinPouch")) {
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
    score = score + change;
    $(".scoreBox").text(score);
    if (pouchOrSlimak == "pouch") {
        caughtPouch++
        if (caughtPouch % 4 == 0 && caughtPouch <= 40) {
            
            if(canUsing == 3) {
                
            $(".paddlePouches").css("background-image", "url(images/pouchLayers/pouchLayers3/pouchLayer" + caughtPouchIndicator + ".png");
            } else {
            $(".paddlePouches").css("background-image", "url(images/pouchLayers/pouchLayers/pouchLayer" + caughtPouchIndicator + ".png");
            }
            caughtPouchIndicator++
        }
    } else if (pouchOrSlimak == "slimak") {
        odlozSlimak++
        if (odlozSlimak <= 10) {
            
            if(canUsing == 3) {
            $(".paddleSlugs").css("background-image", "url(images/slugLayers/slugLayers3/slugLayer" + odlozSlimakIndicator + ".png");
            } else {
            $(".paddleSlugs").css("background-image", "url(images/slugLayers/slugLayers/slugLayer" + odlozSlimakIndicator + ".png");
            }
            odlozSlimakIndicator++
        } else if (odlozSlimak == 20) {
            if(canUsing == 3) {
                $(".paddleSlugs").css("background-image", "url(images/slugLayers/slugLayers3/slugLayer10.png");
            } else {
                $(".paddleSlugs").css("background-image", "url(images/slugLayers/slugLayers/slugLayer10.png");
            }
            

        }
    }
}

function missedPouch() {
    $("#box" + lostPouch).css("background-image", "url(images/pouch/pouchLoss.png");
    lostPouch++;
    if (lostPouch == 5) endClear();
}

function endClear() {
    clearTimeout(sTimeout);
    clearInterval(sInterval);
    $(".box, .scoreBox, .paddle, .paddlePouches, .paddleSlugs, .collisionDetector, .pouch, .pouchMissed, .bigPouch, .bigPouchMissed, .coinPouch, .coinPouchMissed").remove();
    $(".gameArea").css("background-image", "url(images/background/finish.jpg)");
    $("body").css("cursor", "default");
    if (music == 1) {
        music = 0;
        musicCheck();
    }
    if (sound == 1) {
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
        text: "SCORE " + score
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

    $(".submitName").click(function () {
        $(".saveScore").css({ "width": "900", "height": "680", "margin-top": "80px" });
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
        
        
        
        if (signedIn) {
            var uid = firebase.auth().currentUser.uid;

            var balanceI;
            var caughtPouchesI;
            var gamesPlayedI;
            var highScoreI;
 

            firebase.database().ref("users/" + uid).once("value")
                .then(function(snapshot) {
                    balanceI = snapshot.child("balance").val();
                    balanceI = balanceI + coinsCaught;
                    caughtPouchesI = snapshot.child("caughtPouches").val();
                    caughtPouchesI = caughtPouchesI + caughtPouch;
                    gamesPlayedI = snapshot.child("gamesPlayed").val();
                    gamesPlayedI++;
                    highScoreI = snapshot.child("highScore").val();
                    if (score >= highScoreI) {
                        highScoreI = score;
                    } else {
                        highScoreI = highScoreI
                    }

                })

           setTimeout(function(){
            firebase.database().ref("users/" + uid)
                                  .child("balance").set(balanceI);
                                  firebase.database().ref("users/" + uid)
                                  .child("caughtPouches").set(caughtPouchesI);
                                  firebase.database().ref("users/" + uid)
                                  .child("gamesPlayed").set(gamesPlayedI);
                                  firebase.database().ref("users/" + uid)
                                  .child("highScore").set(highScoreI);
            
            
           },3000)


        }

        var ref = firebase.database().ref("leaderboard");
        
        if(score > 10) {

                var data = {
                    name: username.value,
                    score: score,
                }
            
            
            ref.push(data);
        }

        ref.on("value", getData)

        
        $(".textStats, .enterName, .submitName").remove();
        
        setTimeout(function(){
            $("<input>", {
                "class": "goOverview",
                "type": "button",
                "value": "OK"
            }).appendTo(".saveScore");

            $(".goOverview").hover(function () {
                if (sound == 1) {
                    document.getElementById("click0").play();
                }
            }, function () { });

                $(".goOverview").click(function () {
                    if(sound == 1) document.getElementById("click2").play();
                    $(".goOverview, .leaderboard, .saveScore").remove();
                    overview();
                });
          

        },2000)
        
        
    });
    $(".submitName").hover(function () {
        if (sound == 1) {
            document.getElementById("click0").play();
        }
    }, function () { });
    $(".submitName").click(function () {
        if (sound == 1) {
            document.getElementById("click2").play();
        }
    });

}

function getData(data) {
    var leaderboard = data.val();
    var keys = Object.keys(leaderboard);
    keys.sort((a, b) => (leaderboard[a].score < leaderboard[b].score) ? 1 : -1)
    for (i = 0; i < 100; i++) {
        var k = keys[i]
        var name = leaderboard[k].name;
        var score = leaderboard[k].score;
        $("#place" + i).text(i+1+". "+name + " " + score);
    }
}

function overview() {
    $("<p/>", {
        "class": "textEnd",
        text: "THE GAME HAS ENDED"
    }).appendTo(".gameArea")
    $("<p/>", {
        "class": "textStats",
        text: caughtPouch + " POUCHES IN THE CAN"
    }).appendTo(".gameArea")
    $("<p/>", {
        "class": "textStats",
        text: odlozSlimak + " SLUGS IN THE CATCH LID"
    }).appendTo(".gameArea")
    $("<p/>", {
        "class": "textStats",
        text: "SCORE " + score
    }).appendTo(".gameArea")
    $("<input>", {
        "class": "playAgain",
        "type": "button",
        "value": "PLAY AGAIN"
    }).appendTo(".gameArea")

    $(".playAgain").click(function () {
        $(".textEnd, .textStats, .playAgain").remove();
        location.reload();

    });
}
