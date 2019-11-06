var c = document.getElementById("c");
var ctx = c.getContext("2d");


function circle(x,y){
    ctx.beginPath();
    ctx.arc(x, y, 15, 0, 2 * Math.PI);
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
    player.draw();
    caps.forEach(function(element){
        element.draw();
        element.move();
    });
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
        this.y += 3;
    }
}

class Cup{
    constructor(){
        //TODO: do if mouse pressed down
        this.x = 30; //TODO: Mouse x-coord
        this.y = c.height-20;
    }
    draw(){
        rectangle(this.x,this.y) 
    }
}
var caps = [];
var player = new Cup();

setInterval(update, 17);
setInterval(spawnCap, 1000);
