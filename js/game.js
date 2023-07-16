let canvas;
let world; 
let keyboard = new Keyboard();

function init() {
    canvas = document.getElementById('canvas'); // canvas html element in variable
    world = new World(canvas, keyboard); // erzeuge neue Welt und übergieb canvas
    world.draw();


}

window.addEventListener('keydown', (event) => {
    console.log(event.keyCode)
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
    }
  });



  window.addEventListener('keyup', (event) => {
    console.log(event.keyCode)
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
    }
  });
  
