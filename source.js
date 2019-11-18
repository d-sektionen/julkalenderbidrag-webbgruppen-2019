var c = document.getElementById("c");
var ctx = c.getContext("2d");

var lives = 3;
var totalScore = 0;

var xCoord = 0;
var circleR = 15;

var spawnInterval = 0.02;

var stage = 1;

capImg = new Image();
capImg.src = "cap.png";

window.onmousemove = function(event) {
  rect = c.getBoundingClientRect();
  xCoord = event.clientX - rect.left;
};

function randStartCoord() {
  return Math.floor(Math.random() * 500) + 15;
}
function randSpeed() {
  return Math.floor(Math.random() * 2 * stage) + 2;
}
function update() {
  ctx.clearRect(0, 0, c.width, c.height);
  player.x = xCoord - player.width / 2;
  if (player.x < 10) player.x = 10;
  var capRight = c.width - player.width - 10;
  if (player.x > capRight) player.x = capRight;
  player.draw();

  var spawnRandNum = Math.random();
  if (spawnRandNum < spawnInterval) {
    spawnCap();
  }
  for (let i = 0; i < caps.length; i++) {
    const element = caps[i];
    element.draw();
    element.move();

    if (element.y > c.height) {
      caps.splice(i, 1);
      lives--;
    }
    if (
      player.y - element.y <= circleR &&
      element.x - player.x < 100 &&
      element.x - player.x > 0
    ) {
      caps.splice(i, 1);
      totalScore += 100;
      if (totalScore % 2000 == 0) {
        stage++;
        spawnInterval += 0.005;
      }
      console.log(totalScore);
    }
  }
}

function spawnCap() {
  caps.push(new BottleCap(randStartCoord(), 0));
}

class BottleCap {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.speed = randSpeed();
  }
  draw() {
    ctx.drawImage(capImg, this.x - 20, this.y - 20);
  }
  move() {
    this.y += this.speed;
  }
}

class Cup {
  constructor() {
    this.x = 30;
    this.y = c.height - 60;
    this.width = 100;
    this.height = 10;
  }
  draw() {
    ctx.beginPath();
    ctx.rect(this.x, this.y, this.width, this.height);
    ctx.fillStyle = "darkred";
    ctx.fill();
  }
}
var caps = [];
var player = new Cup();

setInterval(update, 17);
