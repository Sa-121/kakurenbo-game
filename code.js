onEvent("clicktostartpage", "click", function( ) {
  playSound("assets/---------------------.mp3", true);
  setScreen("homepage");
});
var welcomeText = "哈囉！歡迎來到我的樂園！\n要不要和我玩一場捉迷藏?\n\n……我保證很好玩！\n\n準備好了嗎？\n\n\n捉迷藏規則：\n小心綠色怪物\n不要分神\n\n\n\n\n別讓我跑了！";

var opacity = 0;
var isClicked = false;
var typing = false;
var typingDone = false;

var score = 0;
var hasClickedGhost = false;
var gameTimer = null;
var ghostTimer = null;

onEvent("startbutton", "click", function(){
stopSound("assets/---------------------.mp3");
playSound("assets/category_app/app_menu_button_5.mp3", false);
setScreen("welcomePage");
setText("welcomeInfo", "");
hideElement("infoOKbtn");
playSound("assets/freesound_community-typewriter-typing-68696.mp3", false);

opacity = 0;
isClicked = false;
typing = true;
typingDone = false;

var currentText = "";
var index = 0;

timedLoop(200, function() {
  currentText = currentText + welcomeText.substring(index, index + 1);
  setText("welcomeInfo", currentText);
  
  index = index + 1;
  if (index >= welcomeText.length) {
    stopTimedLoop();
    typing = false;
    typingDone = true;
    stopSound("assets/freesound_community-typewriter-typing-68696.mp3");
    
 console.log("打字完成！");
}});
});

onEvent("welcomePage", "click", function() {
  if(typing){
    stopTimedLoop();
    stopSound("assets/freesound_community-typewriter-typing-68696.mp3");
  
  setText("welcomeInfo", welcomeText);
typing = false;
typingDone = true;
}

else if (typingDone && isClicked == false) {
  isClicked = true;
  showNextButton();
}});

function showNextButton(){
    showElement("infoOKbtn");
    setProperty("infoOKbtn", "text-color", "rgb(0,0,0,0)");
    setProperty("infoOKbtn", "border-color", "rgb(0,0,0,0)");
    timedLoop(50, function() {
    opacity = opacity + 0.05;   
    setProperty("infoOKbtn", "text-color",rgb(255,255,255,opacity));
    setProperty("infoOKbtn", "border-color",rgb(203,0,0,opacity)); 
    if (opacity >= 1) {
      stopTimedLoop();
      console.log("漸變完成！");
    }
    });
  }
  
function updateGhosts() {
  if (ghostTimer) {
    clearTimeout(ghostTimer);
    ghostTimer = null;
  }
  
  hideElement("ghost");
  hideElement("ghost2");

  var chance = randomNumber(1, 10);
  var hasGhost2 = false;
  var ghostDuration = 2000;
  
  if (chance <= 5) { 
    showElement("ghost");
    setPosition("ghost", randomNumber(0, 265), randomNumber(70, 316), 50, 50);
    hasGhost2 = false;
    ghostDuration = 2000;
  } else if (chance <= 8) { 
    showElement("ghost2");
    setPosition("ghost2", randomNumber(0, 265), randomNumber(70, 316), 50, 50);
   hasGhost2 = true;
    ghostDuration = 1200;
  } else { 
    showElement("ghost");
    showElement("ghost2");
    setPosition("ghost", randomNumber(0, 130), randomNumber(70, 316), 50, 50);
      setPosition("ghost2", randomNumber(135, 265), randomNumber(70, 316), 50, 50);
  hasGhost2 = false;
    ghostDuration = 1200;}
    
  ghostTimer = setTimeout(function() {
    if (hasGhost2) {
      score = score + 1; 
      console.log("成功閃避ghost2！獎勵 +1 分，當前分數: " + score);
    }
    
    updateGhosts();
  }, ghostDuration);
}

function stopGameTimers() {
  if (gameTimer) {
    clearTimeout(gameTimer);
    gameTimer = null;
  }
  if (ghostTimer) {
    clearTimeout(ghostTimer);
    ghostTimer = null;
  }
}

function startGame() {
  playSound("assets/astronautflute-the-creepy-circus-484992.mp3", false);
  score = 0;
  hasClickedGhost = false;
  setScreen("game");
  
  stopGameTimers();
  
  updateGhosts();
  
  gameTimer = setTimeout(function() {
    stopGameTimers();
    stopSound("assets/astronautflute-the-creepy-circus-484992.mp3");
    
    if (hasClickedGhost) {
      setText("yourscore", score);
      setScreen("winScreen");
      playSound("assets/category_music/level_up_brightly_1.mp3", false);
      setTimeout(function() {
        playSound("assets/louder_tsukama.mp3", false);
      }, 1000);
      console.log("時間到！勝利，得分：" + score);
    } else {
      playSound("assets/himei_kyaaaaaaaa.mp3");
      setText("losescore", "0");
      setScreen("gameoverScreen");
      console.log("時間到但得分為 0！判定失敗！");
    }
  }, 60000); 
}
onEvent("infoOKbtn", "click", function() {
  playSound("assets/category_app/app_menu_button_5.mp3", false);
  startGame();
});

onEvent("ghost", "click", function(){
  playSound("assets/category_explosion/8bit_explosion.mp3");
  score = score + 1;
  hasClickedGhost = true;
  console.log("點中ghost！當前分數: " + score);
  
  updateGhosts();
});

onEvent("ghost2", "click", function(){
  stopGameTimers();
  stopSound("assets/astronautflute-the-creepy-circus-484992.mp3");
  playSound("assets/himei_kyaaaaaaaa.mp3");
  setScreen("gameoverScreen");
  setText("losescore",score);
  console.log("點中ghost2！Game Over！得分：" + score);
  console.log("點中ghost2！Game Over！");
});


  

  onEvent("gamebackgrund", "click", function(){
  stopGameTimers();
  stopSound("assets/astronautflute-the-creepy-circus-484992.mp3");
  playSound("assets/himei_kyaaaaaaaa.mp3");
  setScreen("gameoverScreen");
  setText("losescore",score);
  setScreen("gameoverScreen");
  console.log("點中background！Game Over！得分：" + score);
  console.log("background clicked!");
  });




onEvent("backtohomepagebtn", "click", function(){
stopGameTimers();
playSound("assets/category_app/app_menu_button_5.mp3", false);
setScreen("homepage");
playSound("assets/---------------------.mp3", true);
});





onEvent("tryagainbtn", "click", function(){
playSound("assets/louder_moikkaimp3.mp3", false);
setTimeout(function() {
  startGame();
}, 2700);
});

var haseasterghost = false;

onEvent("door", "click", function() {
  playSound("assets/category_objects/door_squeak.mp3", false);
  
  var lucky = randomNumber(1, 10);
  
  if (lucky <= 8) {
    haseasterghost = false;
    hideElement("easterghost");
    playSound("assets/knockknock.mp3", true);
    setScreen("EasterEggPage");
  } else {
    playSound("assets/louder_tsuginoban.mp3", false);
    setTimeout(function() {
      setScreen("homepage");
      playSound("assets/---------------------.mp3", true);
    }, 4000);
  }
});

onEvent("luckydoor", "click", function() {
  if (haseasterghost) {
    stopSound("assets/knockknock.mp3");
    playSound("assets/category_objects/door_close.mp3", false);
    setScreen("homepage");
    playSound("assets/---------------------.mp3", true);
    return; 
  }
  
  var luckydoor = randomNumber(1, 10);
  
  if (luckydoor <= 5) {
    playSound("assets/himei_kyaaaaaaaa.mp3", false);
    showElement("easterghost");
    
    haseasterghost = true;
    
    setTimeout(function() {
      hideElement("easterghost");
    }, 2000);
    
  } else {
    playSound("assets/category_objects/door_close.mp3", false);
    setTimeout(function() {
      stopSound("assets/knockknock.mp3");
      setScreen("homepage");
      playSound("assets/---------------------.mp3", true);
    }, 1000);
  }
});
