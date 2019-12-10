var c = document.getElementById("c");
var ctx = c.getContext("2d");

var capImg = new Image();
capImg.src = "cap.png";

var cupImg = new Image();
cupImg.src = "cupphotos/1.png";

const kaps = new Audio('sounds/konstkaps.mp3');

var plopps = [new Audio('sounds/plopp4.mp3'),
              new Audio('sounds/plopp2.mp3'),
              new Audio('sounds/plopp1.mp3'),
              new Audio('sounds/plopp3.mp3')];

var sweardooms = [new Audio('sounds/helvete.mp3'),
                  new Audio('sounds/fan.mp3'),
                  new Audio('sounds/jarnspikar.mp3'),
                  new Audio('sounds/capsans.mp3')];

var slurps = [new Audio('sounds/slurp_tiny.mp3'),
              new Audio('sounds/slurp_kort2.mp3'),
              new Audio('sounds/slurp_medium.mp3'),
              new Audio('sounds/slurp_long.mp3')];


class Score {
  constructor() {
    this.value = 0;
    this.lives = 3;
    this.scoreCounter = document.getElementById("scoreCounter");
    this.heartCounter = document.getElementById("heartCounter");
    this.lostScreen = document.getElementById("lostScreen");
    this.sidebar = document.getElementById("sidebar");
    this.lastSeenStage = 1;
  }

  getStage() {
    var stage = Math.floor(this.value / 2000) + 1;
    if (this.lastSeenStage !== stage) {
      this.lastSeenStage = stage;
      slurps[(stage-2)%slurps.length].play();
    }
    return stage;
  }

  getSpawnInterval() {
    return 0.02 + Math.floor(this.value / 2000) * 0.005;
  }

  add(amount) {
    this.value += amount;
    this.scoreCounter.textContent = this.value;
    const stage = this.getStage();
    this.sidebar.style.backgroundImage = `url(capsphotos/${Math.min(
      5,
      stage
    )}.jpg)`;
    cupImg.src = `cupphotos/${Math.min(5,stage)}.png`
    if (Math.random() < 0.05){
      kaps.play();
    }
    plopps[Math.floor(Math.random()*plopps.length)].play();
  }
  removeLife() {
    this.lives--;
    var hearts = "";
    for (let i = 0; i < this.lives; i++) {
      hearts += "❤";
    }
    this.heartCounter.textContent = hearts;
    if (this.lives < 1) {
      this.lostScreen.classList.remove("hidden");
      var eh = 3;
      setInterval(function(){
        sweardooms[eh].play();
        eh = (eh + 1) % sweardooms.length;
      },1000);
    }
    sweardooms[this.lives % sweardooms.length].play();
  }
}

var totalScore = new Score();

var xCoord = 0;

window.onmousemove = function(event) {
  rect = c.getBoundingClientRect();
  xCoord = event.clientX - rect.left;
};

window.ontouchmove = function(event) {
  rect = c.getBoundingClientRect();
  xCoord = event.changedTouches[0].pageX - rect.left;
};

function randStartCoord() {
  return Math.floor(Math.random() * (c.width - 35)) + 15;
}
function randSpeed() {
  return Math.floor(Math.random() * 2 * totalScore.getStage()) + 2;
}
function update() {
  ctx.clearRect(0, 0, c.width, c.height);
  player.x = xCoord - player.width / 2;
  if (player.x < 10) player.x = 10;
  var capRight = c.width - player.width - 10;
  if (player.x > capRight) player.x = capRight;
  player.draw();

  var spawnRandNum = Math.random();
  if (spawnRandNum < totalScore.getSpawnInterval()) {
    spawnCap();
  }
  for (let i = 0; i < caps.length; i++) {
    const element = caps[i];
    element.draw();
    element.move();

    if (element.y > c.height) {
      caps.splice(i, 1);
      totalScore.removeLife();
    }
    if (
      player.y - element.y <= capImg.width &&
      element.x - player.x < 100 &&
      element.x - player.x > 0
    ) {
      caps.splice(i, 1);
      totalScore.add(100);
    }
  }
  if (totalScore.lives > 0) {
    window.requestAnimationFrame(update);
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
    this.y = c.height - 100;
    this.width = cupImg.width;
    this.height = 10;
  }
  draw() {
    this.width = cupImg.width;
    ctx.drawImage(cupImg, this.x, this.y - 30);
  }
}
var caps = [];
var player = new Cup();

var startScreen = document.getElementById("startScreen");

startScreen.onclick = function(){
  window.requestAnimationFrame(update);
  startScreen.remove();
}
// setInterval(update, 17);
