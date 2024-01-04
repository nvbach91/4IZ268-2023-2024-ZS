


$(document).ready(function () {
  $("<div/>", {
    "class": "gameArea"
  }).appendTo("body");
  
  
  start();



});

function start() {
  $("<input>", {
    "type": "button",
    "class": "playButton",
    value: "LOADING.."
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
  $("<input>", {
    "type": "button",
    "class": "buttonButton",
    "id": "soundButton"
  }).appendTo("#soundDiv");
  $("<input>", {
    "type": "button",
    "class": "buttonButton",
    "id": "musicButton"
  }).appendTo("#musicDiv");
  $("<input>", {
    "type": "button",
    "class": "buttonButton",
    "id": "tutorialButton"
  }).appendTo("#tutorialDiv");
  $("<input>", {
    "type": "button",
    "class": "buttonButton",
    "id": "profileButton"
  }).appendTo("#profileDiv");

  setTimeout(function(){ //LOADING

  $(".playButton").addClass("playButtonLoaded");

  /*if(!signedIn) {
    if(Math.floor(Math.random() * 4) == 0 ) {
      alert("You should sign up for better gaming experience!")
    }
  }*/
  
  $("#profileButton").click(function() {
    profilePage();
  })
  


  $(".playButton").attr("value","PLAY")

  $(".playButton").click(function () {
    $(".playButton, .buttonDiv, .buttonButton").css("display", "none")
    $("<p/>", {
      text: "SELECT BACKGROUND",
      "id": "text1"
    }).appendTo(".gameArea");
    $("<div/>", {
      "class": "selectBackground"
    }).appendTo(".gameArea")
    for (i = 0; i < 4; i++) {
      if(i < 3) {
      $("<input>", {
        "type": "button",
        "class": "selectBg",
        "id": "selectBg" + i,
      }).appendTo(".selectBackground");
      $("#selectBg" + i).css("background-image", "url(" + "images/background/bgs" + i + ".jpg");
    } else if (i == 3 && signedIn) {
      $("<div/>", {
        "class": "selectBg",
        "id": "selectBg3",
      }).appendTo(".selectBackground");

      $("#selectBg3").css("cursor","default")

      var specialBgOwned;
      firebase.database().ref("../users/" + uid).once("value")
            .then(function(snapshot) {
                specialBgOwned = snapshot.child("specialBgOwned").val()
                caughtPouches = snapshot.child("caughtPouches").val();

                var remainingPouches = 50000 - caughtPouches

                if(specialBgOwned == 0) {
                  
                  $("<div/>", {
                    "class" : "caughtPouchesRemainingTag",
                    "id" : "caughtPouchesRemainingTagBg",
                    "text" : remainingPouches
                  }).appendTo("#selectBg3");

                  

                  

                  $("#caughtPouchesRemainingTagBg").hover(function(){
                    $(this).text("You need to catch "+remainingPouches+" more pouches to unlock this legendary background");
                    $(this).css({"width" : "230px", "height": "140px"})
                    }, function(){
                      $(this).text(remainingPouches);
                      $(this).css({"width" : "auto", "height": "auto"})
                  });
                }  else if (specialBgOwned == 1) {
                  $("#selectBg3").css("background-image", "url(images/background/bgs3.jpg");
                  $("#selectBg3").addClass("selectSpecialBg");
                  $("#selectBg3").hover(function () {
                    if (sound == 1) {
                      document.getElementById("click0").play();
                    }
                  }, function () { });
                  $("#selectBg3").click(function () {
                    $(".gameArea").css("background-image", "url(" + "images/background/bg3.jpg");
                    setup();
                  });
                }

                

              });

    }
    }
    $("#selectBg0").click(function () {
      $(".gameArea").css("background-image", "url(" + "images/background/bg0.jpg");
      setup();
    });
    $("#selectBg1").click(function () {
      $(".gameArea").css("background-image", "url(" + "images/background/bg1.jpg");
      setup();
    });
    $("#selectBg2").click(function () {
      $(".gameArea").css("background-image", "url(" + "images/background/bg2.jpg");
      setup();
    });
    
    $("#selectBg0, #selectBg1, #selectBg2").hover(function () {
      if (sound == 1) {
        document.getElementById("click0").play();
      }
    }, function () { });
    $(".selectBg").click(function () {
      if (sound == 1) {
        document.getElementById("click2").play();
      }});
  });
},1250)
}