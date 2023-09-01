let canvas;
let world; 
let keyboard = new Keyboard();
//let music = new Audio('audio/music.mp3');
let muteModus = false;
//window.allAudio = [];



function muteAllAudio() {
  muteModus = !muteModus;
  console.log('Mute =', muteModus);
}


function init() {
  document.getElementById('overlay').classList.remove('d-none');
  //allAudio.push(music);
}




function startGame(){
  document.querySelector('.overlay').remove();
  canvas = document.getElementById('canvas'); // canvas html element in variable
  world = new World(canvas, keyboard); // erzeuge neue Welt und übergieb canvas
  world.draw();
  //music.play();
}



function gameOverScreen(){
  console.log('game over')
}


window.addEventListener('keydown', (event) => {
    if (event.keyCode === 37) {
      keyboard.LEFT = true;
    } else if (event.keyCode === 39) {
      keyboard.RIGHT = true;
    } else if (event.keyCode === 38) {
      keyboard.UP = true;
    } else if (event.keyCode === 40) {
      keyboard.DOWN = true;
    } else if (event.keyCode === 32) {
      keyboard.SPACE = true;
    } else if (event.keyCode === 68) {
      keyboard.D = true;
    }
  });



  window.addEventListener('keyup', (event) => {
    if (event.keyCode === 37) {
      keyboard.LEFT = false;
    } else if (event.keyCode === 39) {
      keyboard.RIGHT = false;
    } else if (event.keyCode === 38) {
      keyboard.UP = false;
    } else if (event.keyCode === 40) {
      keyboard.DOWN = false;
    } else if (event.keyCode === 32) {
      keyboard.SPACE = false;
    } else if (event.keyCode === 68) {
      keyboard.D = false;
    }
  });
  
