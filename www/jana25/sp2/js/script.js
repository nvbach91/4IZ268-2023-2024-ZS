const App = {};


$(document).ready(() => {
    $("<div/>", {
        "class": "gameArea"
    }).appendTo("body");


    start();



});

const start = () => {
    $("<button/>", {
        "class": "playButton",
        "text": "LOADING.."
    }).appendTo(".gameArea");

    $(".gameArea").css("background-image", "url('images/background/menu.jpg')")

    $("<div/>", {
        "class": "buttonDiv",
        "id": "soundDiv"
    }).appendTo(".gameArea");
    $("<div/>", {
        "class": "buttonDiv",
        "id": "musicDiv"
    }).appendTo(".gameArea");
    $("<div/>", {
        "class": "buttonDiv",
        "id": "tutorialDiv"
    }).appendTo(".gameArea");
    $("<div/>", {
        "class": "buttonDiv",
        "id": "profileDiv"
    }).appendTo(".gameArea");
    $("<button/>", {
        "class": "buttonButton",
        "id": "soundButton"
    }).appendTo("#soundDiv");
    $("<button/>", {
        "class": "buttonButton",
        "id": "musicButton"
    }).appendTo("#musicDiv");
    $("<button/>", {
        "class": "buttonButton",
        "id": "tutorialButton"
    }).appendTo("#tutorialDiv");
    $("<button/>", {
        "class": "buttonButton",
        "id": "profileButton"
    }).appendTo("#profileDiv");

    setTimeout(() => { //LOADING

        $(".playButton").addClass("playButtonLoaded");

        /*if(!signedIn) {
          if(Math.floor(Math.random() * 4) == 0 ) {
            alert("You should sign up for better gaming experience!")
          }
        }*/

        $("#profileButton").click(() => {
            profilePage();
        })



        $(".playButton").text("PLAY");

        $(".playButton").click(() => {
            $(".playButton, .buttonDiv, .buttonButton").remove()
            $("<p/>", {
                text: "SELECT BACKGROUND",
                "id": "text1"
            }).appendTo(".gameArea");
            $("<div/>", {
                "class": "selectBackground"
            }).appendTo(".gameArea")
            for (let i = 0; i < 4; i++) {
                if (i < 3) {
                    $("<button/>", {
                        "class": "selectBg",
                        "id": "selectBg" + i,
                    }).appendTo(".selectBackground");
                    $("#selectBg" + i).css("background-image", "url(" + "images/background/bgs" + i + ".jpg");
                } else if (i == 3 && App.signedIn) {
                    $("<div/>", {
                        "class": "selectBg",
                        "id": "selectBg3",
                    }).appendTo(".selectBackground");

                    $("#selectBg3").css("cursor", "default")

                    let specialBgOwned;
                    const uid = firebase.auth().currentUser.uid;

                    firebase.database().ref("users/" + uid).once("value")
                        .then((snapshot) => {
                            specialBgOwned = snapshot.child("specialBgOwned").val()
                            App.caughtPouches = snapshot.child("caughtPouches").val();

                            let remainingPouches = 50000 - App.caughtPouches

                            if (specialBgOwned == 0) {

                                $("<div/>", {
                                    "class": "caughtPouchesRemainingTag",
                                    "id": "caughtPouchesRemainingTagBg",
                                    "text": remainingPouches
                                }).appendTo("#selectBg3");




                                $("#caughtPouchesRemainingTagBg").hover(() => {
                                    $(this).text("You need to catch " + remainingPouches + " more pouches to unlock this legendary background");
                                    $(this).css({
                                        "width": "230px",
                                        "height": "140px"
                                    })
                                }, () => {
                                    $(this).text(remainingPouches);
                                    $(this).css({
                                        "width": "auto",
                                        "height": "auto"
                                    })
                                });
                            } else if (specialBgOwned == 1) {
                                $("#selectBg3").css("background-image", "url(images/background/bgs3.jpg");
                                $("#selectBg3").addClass("selectSpecialBg");
                                $("#selectBg3").hover(() => {
                                    if (App.sound == 1) {
                                        document.getElementById("click0").play();
                                    }
                                }, () => {});
                                $("#selectBg3").click(() => {
                                    $(".gameArea").css("background-image", "url(" + "images/background/bg3.jpg");
                                    setup();
                                });
                            }



                        });

                }
            }
            $("#selectBg0").click(() => {
                $(".gameArea").css("background-image", "url(" + "images/background/bg0.jpg");
                setup();
            });
            $("#selectBg1").click(() => {
                $(".gameArea").css("background-image", "url(" + "images/background/bg1.jpg");
                setup();
            });
            $("#selectBg2").click(() => {
                $(".gameArea").css("background-image", "url(" + "images/background/bg2.jpg");
                setup();
            });

            $("#selectBg0, #selectBg1, #selectBg2").hover(() => {
                if (App.sound == 1) {
                    document.getElementById("click0").play();
                }
            }, () => {});
            $(".selectBg").click(() => {
                if (App.sound == 1) {
                    document.getElementById("click2").play();
                }
            });
        });
    }, 1250)
}