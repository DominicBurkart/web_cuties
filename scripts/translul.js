var bNum = 3;

var backgroundImagePath= "/assets/translul/bg.jpg"; //images and backgrounds
var bg;
var sphereImagePath = "/assets/translul/spherebg.jpg";
var spherebg;

var speed = 20;

var keysPressed = []; //returns "true" for every key value currently being pressed.
var spacePressed = false; //so that the space key is not continuously counted
var isPlaying = false; //true when a song is being played.
var playing; //what object is playing.

var vect = new p5.Vector(0,0,0);

var xleash = [300, -(bNum*300)];
var yleash = [-400, 400];

var txt = []; //info for each post
var aud = []; //audio for each post

function playCheck(){
  
  var closestX = -1 - Math.round(vect.x / 300);
  var closestY = 0 - Math.round(vect.y / 300);
  
  for(var i = 0; i < bNum; i++){
    if (aud[i].isPlaying()){
      aud[i].pause();
    }
  }
  
  if (closestY == 0){
    if (aud[closestX] != undefined && aud[closestX].isLoaded()){
      aud[closestX].play();
      playing = aud[closestX];
    }
  }
  
}


function keyPressed(){
  keysPressed[key]=true;
  if (key == " "){
    playCheck();
  }
}

function keyReleased(){
  keysPressed[key]=false;
}

function movement(){
  
  if (keysPressed["&"] && vect.x > xleash[1]){ //up arrow 
    vect.x -= speed;
  }
  
  if (keysPressed["("] && vect.x < xleash[0]){ //down arrow
    vect.x += speed;
  }
}

function preload(){
  bg = loadImage(backgroundImagePath);
  spherebg = loadImage(sphereImagePath);
}

function setup() {
  for (var i = 0; i < bNum; i++){
    aud[i] = loadSound('assets/translul/'+i+'.mp3');
  }
  createCanvas(window.innerWidth,window.innerHeight, WEBGL);
}

function draw() {
  if(!mouseIsPressed){
    this.rotateY((this.mouseX - this.width ) / (this.width/2) *  4);
    this.rotateX((this.mouseY - this.height ) / (this.width/2) * 6 );
  }
  
  movement();
  
  //the shape that stays in the same place
  texture(spherebg);
  sphere(100);
  
  //background (static)
  texture(bg);
  sphere(6000);
  
  //everything that moves
  translate(vect.x,vect.y,vect.z);
  for(var i = 0; i < bNum; i++){
    translate(300, 0, 0);
    box(100);
  }
  
}



