
var buttonColours=["red","blue","green","yellow"];
var gamePattern=[];//['red']
var userClickedPattern=[];//['red']
var level=0;


var toggle=false;
$("body").keydown(function(){

  if(!toggle){
    $("#level-title").text("level:"+level);
    nextSequence();//red;
//checkAnswer();
    toggle=true;
  }


});

$(".btn").click(function(){

  var userChosenColor=$(this).attr("id");
  userClickedPattern.push(userChosenColor);
  playSound(userChosenColor);
  animatePress(userChosenColor);
  checkAnswer(userClickedPattern.length);


});
function checkAnswer(currentLevel){
  if (gamePattern[currentLevel-1]===userClickedPattern[currentLevel-1]) {
    // nextSequence();
    if (userClickedPattern.length===gamePattern.length) {
        setTimeout( function(){nextSequence();},1000);
    }
  } else {
     console.log("wrong");
    playSound("wrong");
    $("body").addClass("game-over");
    setTimeout( function(){
    $("body").removeClass("game-over");
    },1000);
    $("#level-title").text("Game Over, Press Any Key to Restart");
    startOver();
  }


}

function nextSequence(){
  userClickedPattern=[];
  var randomNumber=Math.round(Math.random()*3);
  var randomChosenColor=buttonColours[randomNumber];
  level++;
  $("h1").text("level"+level);
  gamePattern.push(randomChosenColor);
  $("#"+randomChosenColor).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
  playSound(randomChosenColor);



}

function playSound(name){
  var audio= new Audio("sounds/"+name+".mp3");
  audio.play();
}


function animatePress(currentColour){
  $("#"+currentColour).addClass("pressed");
  setTimeout( function(){
  $("#"+currentColour).removeClass("pressed");
  },1000);

}

function startOver(){
gamePattern=[];//['red']
 level=0;
toggle=false;

}
