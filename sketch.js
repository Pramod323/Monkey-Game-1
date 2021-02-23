//..
var ground;
var banana, bananaImage, obstacle, obstacleImage;
var foodGroup, obstacleGroup;
var monkey, monkey_running;
var score;
var survivalTime = 0;

function preload() {
  monkey_running = loadAnimation("sprite_0.png", "sprite_1.png", "sprite_2.png", "sprite_3.png", "sprite_4.png", "sprite_5.png", "sprite_6.png", "sprite_7.png", "sprite_8.png");

  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");

  foodGroup = new Group();
  obstacleGroup = new Group();

}


function setup() {
  createCanvas(500, 300);

  ground = createSprite(250, 250, 1000, 10);
  ground.velocityX = -12;

  monkey = createSprite(65, 138, 25, 25);
  monkey.addAnimation("running_monkey", monkey_running);
  monkey.scale = 0.1;

}


function draw() {
  background("lightyellow");

  spawnBananas();
  spawnObstacles();

  monkey.velocityY = monkey.velocityY + 0.8;

  if (ground.x < 0) {
    ground.x = ground.width / 2;
  }
  monkey.collide(ground);

  if (keyDown("space") && monkey.y > 210) {
    monkey.velocityY = -15;
  }

  drawSprites();

  survivalTime = Math.ceil(frameCount / frameRate());
  text("Survival Time: " + survivalTime, 100, 50);

}

function spawnBananas() {
  if (frameCount % 80 === 0) {
    banana = createSprite(550, Math.round(random(60, 150)), 20, 20);
    banana.addImage(bananaImage);
    banana.scale = 0.1;
    banana.velocityX = -5;
    banana.lifetime = 115;
    banana.depth = monkey.depth;
    monkey.depth = banana.depth + 1;
    foodGroup.add(banana);
  }
}

function spawnObstacles() {
  if (frameCount % 300 === 0) {
    obstacle = createSprite(550, 211.5, 20, 20);
    obstacle.addImage(obstacleImage);
    obstacle.scale = 0.18;
    obstacle.velocityX = -5;
    obstacle.lifetime = 115;
    obstacle.depth = monkey.depth;
    obstacle.depth = banana.depth + 1;
    obstacleGroup.add(obstacle);
  }
}