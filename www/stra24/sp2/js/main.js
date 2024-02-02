function updateLeaderBoard() {
  $('#leader-board-list').empty();
  $.ajax({
    url: 'https://robot-gravity-man-default-rtdb.europe-west1.firebasedatabase.app/.json',
    type: "GET",
    success: function (data) {
      var i = 0;
      var dataArray = Object.entries(data);
      dataArray.sort(function (a, b) {
        return b[1] - a[1];
      });
      dataArray.forEach(function (item) {
        i++
        var key = item[0];
        var value = item[1];
        if (i <= 5) {
          $('#leader-board-list').append(`<li class="list-item">${key}: ${value}</li>`);
        }
      });
    },
    error: function (error) {
      alert("error: " + error);
    }
  });
}

function sendScore(name, score) {
  var param = {};
  param[name] = score;
  $.ajax({
    url: 'https://robot-gravity-man-default-rtdb.europe-west1.firebasedatabase.app/.json',
    type: "PATCH",
    data: JSON.stringify(param),
    success: function () {
      console.log(param)
    },
    error: function (error) {
      alert("error: " + error);
    }
  });
  updateLeaderBoard();
}

$("#player-name").keydown(function (event) {
  if (event.keyCode == 13) {
    event.preventDefault();
  }
});

$("#player-name").click(function () {
  $(this).text("");
});

$("#enter-score-button").click(function () {
  var name = $('#player-name').text().trim();
  var score = parseInt($('#score').text());
  if (name === '' || name.length > 10) {
    $('#player-name').css('color', 'red').text('Invalid name');
    return;
  }
  restartGame()
  sendScore(name, score);
  $('#player-name').css('color', 'white')
  $('#score').text(0);
});

$(document).keydown(function(e){
  if (e.which === 27 && gameOver === true) {
    restartGame()
    $('#score').text(0);
  }
});

$(document).ready(function () {
  updateLeaderBoard();
});