buttonColours = ["red", "blue", "green", "yellow"];
var here = 0;
gamePattern = []; //the order of the game color the user need to follow
userClickedPattern = []; //the order of user color

var level = 0; //level number
var started = false; //game not staeted yet

//the start of the game: level 0 and the game choose te first color
$(document).keydown(function () {
  if (!started) {
    //3. The h1 title starts out saying "Press A Key to Start", when the game has started, change this to say "Level 0".
    $("#level-title").text("Level " + level);
    nextSequence();
    started = true;
  }
});

//when the user click any color 1.check the Answer
$(".btn").click(function () {
  //push the user color
  var userChosenColour = $(this).attr("id");
  userClickedPattern.push(userChosenColour);

  playSound(userChosenColour);
  animatePress(userChosenColour);
  checkAnswer();
});

function checkAnswer() {
  //if the user right
  if (
    userClickedPattern[userClickedPattern.length - 1] ==
    gamePattern[userClickedPattern.length - 1]
  ) {
    // if the user finish the level seccessfuly we move to new level
    if (userClickedPattern.length == level) {
      userClickedPattern = []; //empty the old level array
      setTimeout(function () {
        nextSequence();
      }, 1000);
    }
  } else {
    //if the user wrong
    $("#level-title").text("Game Over, Press Any Key to Restart");

    animateWrongAnswer();
    playSound("wrong");
    startOver();
  }
}

//1.update level number 2.choose next random color 3.show the user the next color
function nextSequence() {
  level++;
  $("#level-title").text("Level " + level);

  //push the game color
  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);

  //show to user
  $("#" + randomChosenColour)
    .fadeOut(100)
    .fadeIn(100)
    .fadeOut(100)
    .fadeIn(100);
  animatePress(randomChosenColour);
  playSound(randomChosenColour);
}

// play uniqe sound acordding to the color
function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

//do animation when the user click on some button
function animatePress(currentColour) {
  var self = $("#" + currentColour).addClass("pressed");
  setTimeout(function () {
    self.removeClass("pressed");
  }, 100);
}

//do animation when the user click on wrong button
function animateWrongAnswer() {
  var self = $("body").addClass("game-over");
  setTimeout(function () {
    self.removeClass("game-over");
  }, 200);
}

function startOver() {
  //Initialize variables
  gamePattern = [];
  userClickedPattern = [];
  level = 0;
  started = false;
}
