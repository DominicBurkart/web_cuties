window.addEventListener("keydown", kp, false); //key pressed function called when key is pressed
window.addEventListener("keyup", kr, false); //key released function called when key is released

var oscillators = []; //will hold an oscillator for each note!
var keysPressed = []; //returns "true" for every key value currently being pressed.
var spacePressed = false; //so that the space key is not continuously counted
var decay = 1; //time in seconds for an oscillator to go quiet when it's key isn't pressed

//the equal-tempered scale in Hertz starting on c3 mapped onto char keys.
//white keys are ASDFGHJKL:' , black are the keys above + between them!
var equal_tempered = {
  65: 130.813, //format is (char key: hertz value;) for each valid char key.
  87: 138.591,
  83: 146.832,  
  69: 155.563,
  68: 164.814,
  70: 174.614,
  84: 184.997,
  71: 195.998,
  89: 207.652,
  72: 220.000,
  85: 233.082,
  74: 246.942,
  75: 261.626,
  79: 277.183,
  76: 293.665,
  80: 311.127,
  186: 329.628,
  219: 369.994,
  222: 391.995,
}

//let's just deal with equal-tempered scales for now tbh!
var tones = equal_tempered;

//keys which the user can play:
var validKeys = Object.keys(tones);
  
	function draw(){
	  if (keysPressed[38]){ //up arrow
	    decay += 0.01;
	  }
	  if (keysPressed[40] && decay > 0.1){ //down arrow
	    decay -= 0.01;
	  }
	  if (keysPressed[49]){ // 1 key
	    decay = 0.05;
	  }
	  if (keysPressed[50]){ // 2 key
	    decay = 1;
	  }
	  
	  for(var i = 0; i < validKeys.length; i++){ // update the situation for each key
	    controlKeys(validKeys[i]);
	  }
	  
	  document.getElementById("user_information").innerHTML = "decay value: "+decay.toFixed(2)+" seconds";
	}
	
	function controlKeys(t){
	  if (keysPressed[t]){
	    oscillators[t].amp(1, 0.05);
	  }
	  else{
	    if (typeof oscillators[t] === "undefined"){
	      oscillators[t] = new p5.Oscillator();
	      oscillators[t].setType('sine');
	      oscillators[t].amp(0);
	      oscillators[t].start();
	      oscillators[t].freq(tones[t]);
	    }
	    else{
	      oscillators[t].amp(0, decay);
	    }
	  }
	}
	
	function kp(k){
    keysPressed[k.keyCode]=true;
  }

  function kr(k){
    keysPressed[k.keyCode]=false;
  }
  
