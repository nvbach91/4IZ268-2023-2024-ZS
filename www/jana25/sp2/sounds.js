var music = 0;
var sound = 0;
var gameStart = 0;
var random = Math.floor(Math.random() * 54) + 1;
$(document).ready(function () {
  for (i = 54; i > 0; i--) {
    $("<audio/>", {
      "id": "game" + i
    }).prependTo("body");
    $("<source>", {
      "src": "sounds/game" + i + ".mp3",
      "type": "audio/mpeg"
    }).appendTo("#game" + i);
  }
  $(".buttonDiv").hover(function () {
    if (sound == 1) {
      document.getElementById("click0").play();
    }
  }, function () { });
  $(".playButton").hover(function () {
    if (sound == 1) {
      document.getElementById("click1").play();
    }
  }, function () { });
  $("#soundButton").click(function () {
    if (sound == 0) {
      document.getElementById("click0").play();
      $("#soundDiv").css("background-image", "url(images/buttons/soundOn.png)");
      sound = 1;
    } else if (sound == 1) {
      document.getElementById("click0").play();
      $("#soundDiv").css("background-image", "url(images/buttons/soundOff.png)");
      sound = 0;
    }
  });
  $("#musicButton").click(function () {
    if (music == 0) {
      document.getElementById("main").play();
      $("#musicDiv").css("background-image", "url(images/buttons/musicOn.png)");
      music = 1;
      document.getElementById("main").onended = function () {
        document.getElementById("main").play();
      }
    } else if (music == 1) {
      document.getElementById("main").pause();
      document.getElementById("main").currentTime = 0;
      $("#musicDiv").css("background-image", "url(images/buttons/musicOff.png)");
      music = 0;
    }
  });
  $("#profileButton").click(function() {
    if (sound == 1) document.getElementById("click0").play();
  });
  

  $("#tutorialButton").click(function () {
    window.open("https://youtu.be/48p4Ljkqb9U")
  });



});

function musicCheck() {
  if (music == 1) {
    document.getElementById("main").pause();
    document.getElementById("game" + random).play();
    document.getElementById("game" + random).onended = function () {
      document.getElementById("game" + random).play();
    }
  } else if (music == 0) {
    document.getElementById("game" + random).pause();
    

  }
}
