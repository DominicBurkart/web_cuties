var num = 8; //number of the shape to be drawn
var x = 300; //x,y, and z values of the shape
var y = 250;
var z = 200;
var sel = false; //true when the user clicks (for resizing shape).

function dshape(){
  ellipsoid(x,y,z);
}

function irot(){
  rotateZ(frameCount * 0.01);
  rotateX(frameCount * 0.01);
  rotateY(frameCount * 0.01);
}

function cam(){
  camera(0,0,(x+y+z));
}

function windowResized() {
  createCanvas(window.innerWidth,window.innerHeight, WEBGL);
}

function setup() {
  createCanvas(window.innerWidth,window.innerHeight, WEBGL);
}

function draw() {
  if (sel){
    x = abs(mouseX);
    y = abs(mouseY);
  }
  background(200);
  cam();
  var i = 0; //number of translation iterations per draw loop
  while (i < num){
    irot();
    dshape();
    i++;
  }
}

function mousePressed(){
  sel = true;
}

function mouseReleased(){
  sel = false;
}



