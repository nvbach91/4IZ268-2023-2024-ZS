App.signedIn;

App.displayName;

App.canCode;

App.canPrices = [0, 100, 500, 1000, 3500]

App.firebaseConfig = {
    apiKey: "AIzaSyCZ5E91k9NMc-FT5t5uA21FMaJoA0EyB2w",
    authDomain: "thesiberiacatcher.firebaseapp.com",
    databaseURL: "https://thesiberiacatcher.firebaseio.com",
    projectId: "thesiberiacatcher",
    storageBucket: "thesiberiacatcher.appspot.com",
    messagingSenderId: "748486934698",
    appId: "1:748486934698:web:85a86a219189cc43f510d3",
    measurementId: "G-FDMN1RJ8PE"
};
// Initialize Firebase
firebase.initializeApp(App.firebaseConfig);
firebase.analytics();

function profilePage() {
    $(".buttonDiv, .buttonButton, .playButton").css("display", "none");

    $(".gameArea").css("background-image", "url(images/background/finish.jpg)")

    $("<button/>", {
        "class": "menuButton",

        "text": "< MENU"
    }).appendTo(".gameArea");

    if (App.signedIn) {
        $("<button/>", {
            "class": "signButton",
            "id": "signOutButton",
            "text": "SIGN OUT"
        }).appendTo(".gameArea");
    } else {

        $("<button/>", {
            "class": "signButton",
            "id": "signInButton",
            "text": "SIGN IN"
        }).appendTo(".gameArea");

        $("<button/>", {
            "class": "signButton",
            "id": "signUpButton",
            "text": "SIGN UP"
        }).appendTo(".gameArea");



    }

    $("<div/>", {
        "class": "profileContainer",
        "id": "profileName"
    }).appendTo(".gameArea");

    $("<div/>", {
        "class": "profileContainer",
        "id": "profileStats"
    }).appendTo(".gameArea");

    $("<div/>", {
        "class": "profileContainer",
        "id": "profileCans"
    }).appendTo(".gameArea");

    if (App.signedIn) {
        //NAME

        if (App.displayName.length < 21) {
            $("#profileName").text(App.displayName + " the siberia catcher")
        } else if (App.displayName.length < 36) {
            $("#profileName").text(App.displayName)
        } else {
            $("#profileName").text("idiot")
        }

        //

        var uid = firebase.auth().currentUser.uid;

        var balanceS;
        var caughtPouchesS;
        var gamesPlayedS;
        var highScoreS;




        firebase.database().ref("users/" + App.uid).once("value")
            .then(function(snapshot) {
                balanceS = snapshot.child("balance").val();
                caughtPouchesS = snapshot.child("caughtPouches").val();
                gamesPlayedS = snapshot.child("gamesPlayed").val();
                highScoreS = snapshot.child("highScore").val();


                //STATS

                $("<img>", {
                    "class": "stat",
                    "id": "coinIndicator",
                    "src": "images/pouch/pouchGold.png",
                    "height": "33px",
                    "width": "50px"
                }).appendTo("#profileStats")

                $("<p/>", {
                    "class": "stat",
                    "id": "coinAmount",
                    "text": balanceS
                }).appendTo("#profileStats");

                $("<p/>", {
                    "class": "stat",
                    "id": "pouchesCaught",
                    "text": caughtPouchesS + " Pouches"
                }).appendTo("#profileStats");

                $("<p/>", {
                    "class": "stat",
                    "id": "gamesPlayed",
                    "text": gamesPlayedS + " Games Played"
                }).appendTo("#profileStats");

                $("<p/>", {
                    "class": "stat",
                    "id": "topScore",
                    "text": "Highest Score " + highScoreS,
                }).appendTo("#profileStats");



                //SHOP




                var uid = firebase.auth().currentUser.uid;
                firebase.database().ref("users/" + uid).once("value")
                    .then(function(snapshot) {
                        App.canCode = snapshot.child("canCode").val();
                        balance = snapshot.child("balance").val();
                        caughtPouches = snapshot.child("caughtPouches").val();

                        for (i = 0; i <= 5; i++) {
                            $("<div/>", {
                                "class": "shopCans",
                                "id": "shopCan" + i,
                            }).appendTo("#profileCans");

                            $("#shopCan" + i).css("background-image", "url(images/shopCans/shopCan" + i + ".png)")



                            if (App.canCode.charAt(i) == "0") {
                                $("<div/>", {
                                    "class": "canLocked",
                                    "id": "canLocked" + i
                                }).appendTo("#shopCan" + i);

                                if (i <= 4) {
                                    $("<input>", {
                                        "type": "button",
                                        "class": "canPriceTag",
                                        "id": "canPriceTag" + i,
                                        value: App.canPrices[i]
                                    }).appendTo("#shopCan" + i);

                                    switch (i) {
                                        case 0:
                                            buyCan(0, 0);
                                            break;
                                        case 1:
                                            buyCan(100, 1);
                                            break;
                                        case 2:
                                            buyCan(500, 2);
                                            break;
                                        case 3:
                                            buyCan(1000, 3);
                                            break;
                                        case 4:
                                            buyCan(3500, 4);
                                            break;
                                    }




                                } else if (i == 5) {
                                    if (caughtPouches < 30000) {
                                        var remainingPouches = 30000 - caughtPouches;

                                        $("<div/>", {
                                            "class": "caughtPouchesRemainingTag",
                                            "id": "caughtPouchesRemainingTagCan",
                                            "text": remainingPouches
                                        }).appendTo("#shopCan5");

                                        $("#caughtPouchesRemainingTagCan").hover(function() {
                                            $(this).text("You need to catch " + remainingPouches + " more pouches to unlock this legendary can");
                                            $(this).css({
                                                "width": "210px",
                                                "height": "210px",
                                                "font-size": "23px"
                                            })
                                        }, function() {
                                            $(this).text(remainingPouches);
                                            $(this).css({
                                                "width": "auto",
                                                "height": "auto",
                                                "font-size": "20px"
                                            })
                                        });
                                    } else {
                                        App.canCode = App.canCode.slice(0, -1);
                                        App.canCode = App.canCode.concat("1");
                                        firebase.database().ref("users/" + uid)
                                            .child("canCode").set(App.canCode);
                                        $("#canLocked5").remove();

                                        $("#caughtPouchesRemainingTagCan").remove();
                                    }
                                }
                            } else {
                                switch (i) {
                                    case 0:
                                        $("#shopCan0").click(function() {
                                            selectCan(0);
                                        })
                                        break;
                                    case 1:
                                        $("#shopCan1").click(function() {
                                            selectCan(1);
                                        })
                                        break;
                                    case 2:
                                        $("#shopCan2").click(function() {
                                            selectCan(2);
                                        })
                                        break;
                                    case 3:
                                        $("#shopCan3").click(function() {
                                            selectCan(3);
                                        })
                                        break;
                                    case 4:
                                        $("#shopCan4").click(function() {
                                            selectCan(4);
                                        })
                                        break;
                                    case 5:
                                        $("#shopCan5").click(function() {
                                            selectCan(5);
                                        })
                                        break;
                                }



                            }
                        }

                        $("#shopCan" + App.canUsing).css("border", "8px solid #39e600");



                    });




            })



    }

    function selectCan(index) {
        $(".shopCans").css("border", "none");
        $("#shopCan" + index).css("border", "8px solid #39e600");
      
        App.canUsing = index;

        firebase.database().ref("users/" + App.uid)
            .child("canUsing").set(App.canUsing);

        location.reload();

    }

    function buyCan(price, index) {
        if (balance >= price) {
            $("#canPriceTag" + index).css("background-color", "#33cc33");

            $("#canPriceTag" + index).click(function() {
                if (App.sound == 1) document.getElementById("cash").play();
                balance = balance - price;

                App.canCode = App.canCode.substring(0, index) + "1" + App.canCode.substring(index + 1)

                var uid = firebase.auth().currentUser.uid;
                firebase.database().ref("users/" + uid)
                    .child("canCode").set(App.canCode);
                firebase.database().ref("users/" + uid)
                    .child("balance").set(balance);

                $("#canPriceTag" + index).remove();
                document.getElementById("coinAmount").innerHTML = balance;
                $("#canLocked" + index).remove();

                $(".canPriceTag").remove();

                setTimeout(function() {

                    switch (index) {
                        case 0:
                            $("#shopCan0").click(function() {
                                selectCan(0);
                            })
                            break;
                        case 1:
                            $("#shopCan1").click(function() {
                                selectCan(1);
                            })
                            break;
                        case 2:
                            $("#shopCan2").click(function() {
                                selectCan(2);
                            })
                            break;
                        case 3:
                            $("#shopCan3").click(function() {
                                selectCan(3);
                            })
                            break;
                        case 4:
                            $("#shopCan4").click(function() {
                                selectCan(4);
                            })
                            break;
                        case 5:
                            $("#shopCan5").click(function() {
                                selectCan(5);
                            })
                            break;
                    }
                }, 167)
            });

        } else {
            $("#canPriceTag" + index).css("background-color", "#ff3300")
        }
    }

    $(".menuButton").click(function() {
        goMenu();


    });



    $("#signInButton").click(function() {
        $(".signButton, .profileContainer").css("display", "none");

        $("<form/>", {
            "class": "signInForm"
        }).appendTo(".gameArea")

        $("<input>", {
            "type": "email",
            "placeholder": "email",
            "class": "email",
            "id": "emailSigningIn"
        }).appendTo(".signInForm");

        $("<input>", {
            "type": "password",
            "placeholder": "password",
            "class": "password",
            "id": "passwordSigningIn"
        }).appendTo(".signInForm");

        $("<input>", {
            "type": "button",
            "class": "submitSigning",
            "id": "submitSigningIn",
            value: "SIGN IN"
        }).appendTo(".signInForm");

        document.getElementById("passwordSigningIn").addEventListener("keyup", function(event) {
            if (event.keyCode === 13) {
                event.preventDefault();
                document.getElementById("submitSigningIn").click();
            }
        });

        $("#submitSigningIn").click(function() {
            if (/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(emailSigningIn.value) && document.getElementById("passwordSigningIn").value.length >= 4) {
                signIn();
            } else alert("error")
        });


    })

    $("#signUpButton").click(function() {
        $(".signButton, .profileContainer").css("display", "none");

        $("<form/>", {
            "class": "signUpForm"
        }).appendTo(".gameArea")

        $("<input>", {
            "type": "email",
            "placeholder": "email",
            "class": "email",
            "id": "emailSigningUp"
        }).appendTo(".signUpForm");

        $("<input>", {
            "type": "password",
            "placeholder": "password",
            "class": "password",
            "id": "passwordSigningUp"
        }).appendTo(".signUpForm");

        $("<input>", {
            "type": "password",
            "placeholder": "confirm password",
            "class": "password",
            "id": "passwordSigningUpConfirm"
        }).appendTo(".signUpForm");

        $("<input>", {
            "type": "button",
            "class": "submitSigning",
            "id": "submitSigningUp",
            value: "SIGN UP"
        }).appendTo(".signUpForm");

        document.getElementById("passwordSigningUpConfirm").addEventListener("keyup", function(event) {
            if (event.keyCode === 13) {
                event.preventDefault();
                document.getElementById("submitSigningUp").click();
            }
        });

        $("#submitSigningUp").click(function() {
            if (/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(emailSigningUp.value) && document.getElementById("passwordSigningUp").value == document.getElementById("passwordSigningUpConfirm").value) {
                signUp();
            } else alert("Either the email is in an incorrect format or the passwords do not match.")
        });


    })

    $("#signOutButton").click(function() {
        signOut();


    })

    $(".signButton, .menuButton").hover(function() {
        if (App.sound == 1) {
            document.getElementById("click0").play();
        }
    }, function() {});
    $(".signButton, .menuButton").click(function() {
        if (App.sound == 1) {
            document.getElementById("click2").play();
        }
    });
}

function signIn() {
    var typedEmail = document.getElementById("emailSigningIn").value;
    var typedPassword = document.getElementById("passwordSigningIn").value;

    firebase.auth().signInWithEmailAndPassword(typedEmail, typedPassword).catch(function(error) {
        var errorCode = error.code;
        var errorMessage = error.message;
        if (errorCode === 'auth/wrong-password') {
            alert('Wrong password.');
        } else {
            alert(errorMessage);
        }


    });




}

function signUp() {

    firebase.auth().createUserWithEmailAndPassword(document.getElementById("emailSigningUp").value, document.getElementById("passwordSigningUp").value).then(() => {
        var uid = firebase.auth().currentUser.uid;
        firebase.database().ref("users/" + uid).set({

            balance: 0,
            caughtPouches: 0,
            gamesPlayed: 0,
            highScore: 0,
            canCode: "100000",
            canUsing: 0,
            specialBgOwned: 0,
        });
    }).catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // [START_EXCLUDE]
        if (errorCode == 'auth/weak-password') {
            alert('The password is too weak.');
        } else {
            alert(errorMessage);
        }



    });


}

function signOut() {
    firebase.auth().signOut();

    location.reload();
}

window.onload = function() {
    firebase.auth().onAuthStateChanged(function(user) {




        if (user) {



            var email = user.email;
            App.displayName = email.substring(0, email.lastIndexOf("@"));

            App.signedIn = true;
            goMenu();
        } else {
            App.signedIn = false;
        }

        const script = document.createElement('script');
        script.src = 'game.js';


        // Append to the `head` element
        document.head.appendChild(script);

    })
};

function goMenu() {
    $(".menuButton, form, .signButton, .profileContainer").remove();
    $(".buttonDiv, .buttonButton").css("display", "inline-block");
    $(".playButton").css("display", "block");

    $(".gameArea").css("background-image", "url(images/background/menu.jpg)");
}