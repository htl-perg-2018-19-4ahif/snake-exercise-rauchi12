var ansi = require('ansi');
var keypress = require('keypress');

keypress(process.stdin);
process.stdout.write('\x1Bc');
process.stdout.write('\x1B[?25l');

var cursor = ansi(process.stdout);

var sizeX = 20;
var sizeY=20;
var poseX=10;
var poseY=sizeX/2;
var aposeX=sizeY/2;
var aposeY=0;
var dirX=0;
var dirY=0;
var speed=1;
var points=0;

cursor.bg.grey();

for(var i=0; i<sizeX;i++){
    cursor.goto(i,0).write(' ');
}

for(var i=0;i<sizeY;i++){
    cursor.goto(0,i).write(' ');
}

for(var i=0;i<sizeX;i++){
    cursor.goto(i,sizeY).write(' ');
}

for(var i=0;i<sizeY;i++){
    cursor.goto(sizeX,i).write(' ');
}

//Apple
aposeX = Math.ceil(Math.random() * (sizeX - 3)) + 1;
aposeY = Math.ceil(Math.random() * (sizeY - 3)) + 1;
cursor.bg.red();
cursor.goto(aposeX,aposeY).write(' ');
cursor.reset();

process.stdin.setRawMode(true);
process.stdin.resume();
process.setMaxListeners(0);
game();


function game(){
    var keypress = require('keypress');

    // make `process.stdin` begin emitting "keypress" events
    keypress(process.stdin);
     
    // listen for the "keypress" event
    process.stdin.on('keypress', function (ch, key) {
        if (key && key.ctrl && key.name == 'c') {
          cursor.bg.reset();
          process.stdin.pause();
      } else if (key.name == 'right') {
          dirX = 1;
          dirY = 0;
      } else if (key.name == 'left') {
          dirX = -1;
          dirY = 0;
      } else if (key.name == 'up') {
          dirX = 0;
          dirY = -1;
      } else if (key.name == 'down') {
          dirX = 0;
          dirY = 1;
      }
    }); 
    
    cursor.bg.reset();
    cursor.goto(poseX,poseY).write(' ');

    //Snake
    poseX+=dirX;
    poseY+=dirY;
    cursor.bg.green();
    cursor.goto(poseX,poseY).write(' ');
    

    //cursor.goto(1, sizeY + 2).write( "Points: " + points.toString());
    //cursor.goto(1, sizeY + 3).write( "Speed: " + speed.toString());

    if (poseX <= 1 || poseX >= sizeX || poseY <= 1 || poseY >= sizeY) {
        cursor.blue();
        cursor.bg.red();
        cursor.goto(sizeX / 2 -4 , sizeY / 2).write( "Game Over");
        cursor.reset();
        cursor.bg.reset();
        process.stdout.write('\x1B[?25h');
        process.exit();
    }

    if(poseX==aposeX && poseY==aposeY){
        points++;
        if(speed<25)speed++;
        aposeX = Math.ceil(Math.random() * (sizeX - 2)) + 1;
        aposeY = Math.ceil(Math.random() * (sizeY - 2)) + 1;
        cursor.bg.red();
        cursor.goto(aposeX,aposeY).write(' ');
    }

    
    
    setTimeout(game, 1000 / speed);
}