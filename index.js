
var gamePattern = [];
var userClickedPattern = [];
 

$(document).on("keydown", function (event) {
    if (event.key === "a") {
        var level = 0;
        newSequence(level);
    }
});

function gameOverScreen() {
    $("h1").text("Game Over, Press Any Key to Restart");
    $("body").addClass("game-over");  
        setTimeout(function () {
            $("body").removeClass("game-over");
            var gameOverSound = new Audio("./sounds/wrong.mp3");
            gameOverSound.play();
        }, 200);
    $(document).on("keydown", function startOver(event) {
        level = 0;
        gamePattern = [];
        userClickedPattern = [];
        newSequence(level)
    });
}



$(".btn").on("click", function clickButton() {
    var userChosenColour = $(this).attr("id");
    var btnClick = $(this).hasClass(userChosenColour)
    $(this).addClass("pressed");
    userClickedPattern.push(userChosenColour);
    switch(btnClick) {
        case "green":
            var greenSound = new Audio("./sounds/green.mp3");
            greenSound.play();
            break;
        case "red":
            var redSound = new Audio("./sounds/red.mp3");
            redSound.play();
        
            break;
        case "yellow":
            var yellowSound = new Audio("./sounds/yellow.mp3");
            yellowSound.play();
            
            break;
        case "blue":
            var blueSound = new Audio("./sounds/blue.mp3");
            blueSound.play();
        
            break;
        default: setTimeout( function () {
            $(".btn").removeClass("pressed")
         }, 200);
    }
    checkAnswer(userClickedPattern.length-1);
    
});

function checkAnswer(currentlevel)
{
    if(userClickedPattern[currentlevel] === gamePattern[currentlevel])
    {   
        if(userClickedPattern.length === gamePattern.length) {
            setTimeout(function () {
                newSequence(currentlevel+1);
                userClickedPattern = [];
            }, 1000);
        }
    }
    if(userClickedPattern[currentlevel] !== gamePattern[currentlevel]) {
        gameOverScreen();
    }
}
function newSequence (level) {
    level++;
    $("h1").text("Level "+ level);
    var randomNum  = Math.floor(Math.random()*4);
    var buttonColours = ["red", "blue", "green", "yellow"];
    var randomChosenColour = buttonColours[randomNum];
    gamePattern.push(randomChosenColour);
    setTimeout( 
        function() {
            $( "."+ randomChosenColour).addClass("pressed");
            var buttonSound = new Audio("./sounds/" + randomChosenColour +".mp3");
            buttonSound.play();
            setTimeout( function () {
                $( "."+ randomChosenColour).removeClass("pressed");
            }, 200);  
     }, 1000);
    
}