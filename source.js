var c = document.getElementById("c");
var ctx = c.getContext("2d");

var score = 0;
var totalScore = 0;

var spawnRate = 1000;

var xCoord = 0;
var circleR = 15;

function mouseX(event){
    xCoord = event.clientX;
}

function circle(x,y){
    ctx.beginPath();
    ctx.arc(x, y, circleR, 0, 2 * Math.PI);
    ctx.fillStyle= "red";
    ctx.fill(); 
}
function rectangle(x,y){
    ctx.beginPath();
    ctx.rect(x, y, 100, 10);
    ctx.fillStyle= "darkred";
    ctx.fill(); 
}
function randStartCoord(){
    return Math.floor(Math.random() * 500) + 15
}

function update(){
    ctx.clearRect(0, 0, c.width, c.height);
    player.x = xCoord - 50;
    player.draw();
    for (let i = 0; i < caps.length; i++) {
        const element = caps[i];
        element.draw();
        element.move();

        if (element.y > c.height){
            caps.splice(i, 1);
            score--;
            console.log(score);
        }
        if (player.y - element.y <= circleR && element.x - player.x < 100 && element.x - player.x > 0) {
            caps.splice(i, 1);
            score++;
            totalScore++;
            if (totalScore >= 10){
                spawnRate *= 0,5; //TODO: FUNKAR INTE ?!?!?!??!?!?!?!
            }
            console.log(score)
        }
    }
}

function spawnCap(){
    caps.push(new BottleCap(randStartCoord(),0));
}

class BottleCap{
    constructor(x,y){
        this.x = x;
        this.y = y;
    }
    draw(){
        circle(this.x,this.y);
    }
    move(){
        this.y += 5;
    }
}

class Cup{
    constructor(){
        this.x = 30; 
        this.y = c.height-20;
    }
    draw(){
        rectangle(this.x,this.y) 
    }
}
var caps = [];
var player = new Cup();

setInterval(update, 17);
setInterval(spawnCap, spawnRate);
