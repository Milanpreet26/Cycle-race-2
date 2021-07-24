var path,mainCyclist;
var pathImg,mainRacerImg1,Racer_collided;
var opponent1Img, opponent1Img2;
var opponent2Img, opponent2Img2;
var opponent3Img, opponent3Img2;

var cycleBell, cycleBellsound;

var obstacle1, obstacle2, obstacle3;

var gameover, gameoverImg;

var END = 0;
var PLAY = 1;
var gameState = PLAY;

var distance=0;

function preload(){
  pathImg = loadImage("images/Road.png");
  
  gameoverImg = loadImage("images/gameOver.png");
  
  mainRacerImg1 = loadAnimation("images/mainPlayer1.png","images/mainPlayer2.png");
  Racer_collided = loadAnimation("images/mainPlayer3.png");
  
  opponent1Img = loadAnimation("images/opponent1.png","images/opponent2.png");
  opponent1Img2 = loadImage("images/opponent3.png");
  
  opponent2Img = loadAnimation("images/opponent4.png","images/opponent5.png");
  opponent2Img2 = loadImage("images/opponent6.png");
  
  opponent3Img = loadAnimation("images/opponent7.png","images/opponent8.png");
   opponent3Img2 = loadImage("images/opponent9.png");

  obstacle1 = loadImage("images/obstacle1.png");
  obstacle2 = loadImage("images/obstacle2.png");
  obstacle3 = loadImage("images/obstacle3.png");
  
  cycleBellSound = loadSound("sound/bell.mp3");
  
}

function setup(){
  
createCanvas(500,300);
  
// Moving background
path=createSprite(100,150);
path.addImage(pathImg);
path.velocityX = -5;

//creating boy running
mainCyclist  = createSprite(70,150,100,100);
mainCyclist.addAnimation("SahilRunning",mainRacerImg1);
mainCyclist.addAnimation("Collided", Racer_collided);
mainCyclist.scale=0.07;
  
  
  gameover = createSprite(350, 110, 100, 50);
  gameover.addImage(gameoverImg);
  gameover.scale = 0.6
  
   cyclist = new Group();
   obs = new Group();
}

function draw() {
  
  mainCyclist.debug = false;
  mainCyclist.setCollider("rectangle", 0,0, mainCyclist.width, mainCyclist.height)
  
  background(0);
  
  drawSprites();
  textSize(20);
  fill(255);
  text("Distance: "+ distance,350,30);
  
  if(gameState === PLAY) {
  
    gameover.visible = false;
    
    distance = distance + Math.round(getFrameRate()/50);
    path.velocityX = -(6 + 2 *distance/500);
    
    s = Math.round(random(1,3))
    switch(s) {
        case 1: opponent1();
                break;
        case 2:opponent2();
               break;
        case 3: opponent3();
                break;
        default: break;
        
        
    }
    
    if (keyWentDown("space")) {
          cycleBellSound.play();
        }
    
    if (mainCyclist.isTouching(obs) || mainCyclist.isTouching(cyclist)) {
      gameState = END;
      mainCyclist.changeAnimation("Collided" , Racer_collided);

    }
        
   mainCyclist.y = World.mouseY;
  
   edges= createEdgeSprites();
   mainCyclist.collide(edges);
  
  //code to reset the background
  if(path.x < -1000 ){
    path.x = width/2;     
  }        
 }
 
  if(gameState === END) {
    
    textSize(20);
    text("Press up arrow to reset the game", 150, 200);
    
    path.velocityX = 0;
    
    obs.setLifetimeEach(-1);
    cyclist.setLifetimeEach(-1);
    
    obs.setVelocityEach(0, 0);
    cyclist.setVelocityEach(0, 0);
    
    gameover.visible = true;
    
    if (keyDown("UP_ARROW")) {
      reset();
    }
    
  }
  
 spawnObstacle();
}

function spawnObstacle() {
  if (frameCount % 200 === 0) {
    var obstacle = createSprite(600, random(50, 250), 10, 10);
    obstacle.velocityX = path.velocityX;
    
    t = Math.round(random(1,3))
    switch(t) {
      case 1: obstacle.addImage(obstacle1);
              obstacle.y = 75;
              break;
      case 2: obstacle.addImage(obstacle2);
              obstacle.y = 225;
              break;
      case 3: obstacle.addImage(obstacle3);
              obstacle.y = 150;
              break;
      default: break;
    }
    
    obstacle.scale = 0.15;
    obs.add(obstacle);
    
    obstacle.velocityX = -(6 + 2 *distance/500);
    
  }
}

function opponent1() {
  if(frameCount%300 === 0) {
    var opponent1 = createSprite(600, 225, 10, 10);
    opponent1.velocityX = -4;
    opponent1.addAnimation("opponent1", opponent1Img);
    opponent1.addanimation("collided", opponenet1Img2);
    
    y = Math.round(random(1,2))
    switch(y) {
      case 1: opponent1.y =65;
              break;
      default: break;
    }
    
    opponent1.scale = 0.07;
    cyclist.add(opponent1)
    opponent1.velocityX =  -(6 + 2 *distance/500);
  }
}

function opponent2() {
  if(frameCount%300 === 0) {
    var opponent2 = createSprite(600, 225, 10, 10);
    opponent2.velocityX = -4;
    opponent2.addAnimation("opponent1", opponent2Img);
    
    y = Math.round(random(1,2))
    switch(y) {
      case 1: opponent2.y = 65;
              break;
      default: break;
    }
    
    opponent2.scale = 0.07;
    cyclist.add(opponent2)
    opponent2.velocityX =  -(6 + 2 *distance/500);
  }
}

function opponent3() {
  
  if(frameCount%300 === 0) {
    var opponent3 = createSprite(600, 225, 10, 10);
    opponent3.velocityX = -4;
    opponent3.addAnimation("opponent1", opponent3Img);
    
    
    
    y = Math.round(random(1,2))
    switch(y) {
      case 1: opponent3.y = 65;
              break;
      default: break;
    }
    
    opponent3.scale = 0.07;
    cyclist.add(opponent3)
    opponent3.velocityX =  -(6 + 2 *distance/500);
  }
}

function reset() {
 
  gameState = PLAY;
  
  mainCyclist.changeAnimation("SahilRunning", mainRacerImg1);
  
  distance = (0);
  
  gameover.visible = false;
  
  cyclist.destroyEach();
  obs.destroyEach();
  
  
  
}
