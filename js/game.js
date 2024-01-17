let canvas;
let world; 
let keyboard;
let muteModus = false;
let intervals = [];
let gameOn;
let isFullscreen = false;


/**
 * Initializes the game.
 */
function init() {
    document.getElementById('stage').innerHTML += startScreenHTML();
    updateStartAudioBtn();
    updateFullscreenBtn();
}


/**
 * Toggles the mute mode for all audio in the game.
 */
function muteAllAudio() {
    muteModus = !muteModus;
    updateStartAudioBtn();
}


/**
 * Updates the audio button on the start screen based on the mute mode.
 */
function updateStartAudioBtn(){
  let src;
  if(muteModus){
    src = 'img/10_controls/mute.png';
  } 
  if(!muteModus){
    src = 'img/10_controls/volume.png';
  }
  document.getElementById('ingame-audio-btn-container').innerHTML = `<img src="${src}">`
}


/**
 * Updates the fullscreen button on the start screen based on the fullscreen mode.
 */
function updateFullscreenBtn(){
  let src;
  let funct
  if(isFullscreen){
    src = 'img/10_controls/fullscreen-exit.png';
    funct = 'closeFullscreen()'
  } 
  if(!isFullscreen){
    src = 'img/10_controls/fullscreen.png';
    funct = 'fullscreen("stage")';
  }
  document.getElementById('fullscreen-img-container').innerHTML = `<img src="${src}">`
  let fullscreenBtn = document.getElementById("fullscreen-img-container");
  fullscreenBtn.setAttribute("onclick", funct);
}

/**
 * Starts the game.
 */
function startGame(){
  gameOn = true;
  document.querySelector('.overlay').remove();
  keyboard = new Keyboard();
  canvas = document.getElementById('canvas'); // canvas html element in variable
  world = new World(canvas, keyboard); // erzeuge neue Welt und übergieb canvas
  changeAudioFunc();
  ingameControlsForGame();
}


/**
 * Adjusts the in-game controls for the game state.
 */
function ingameControlsForGame() {
  document.getElementById('stopGameBtn').classList.remove('d-none');
  document.getElementById('ingameControl').style.right = 'auto';
}


/**
 * Adjusts the in-game controls for the start screen state.
 */
function ingameControlsForStartscreen() {
  document.getElementById('stopGameBtn').classList.add('d-none');
  document.getElementById('ingameControl').style.right = '10px';
}


/**
 * Changes the audio functionality based on the game state.
 */
function changeAudioFunc() {
    let funct;
    if(gameOn){
      funct = "audioManager.toggleMute()";
    }
    if(!gameOn){
      funct = "muteAllAudio()";
    }
    let audioButton = document.getElementById("ingame-audio-btn-container");
    audioButton.setAttribute("onclick", funct);
}


/**
 * Returns to the start screen from the game or end screen.
 */
function returnToStart(){
    document.querySelector('.endscreen').remove();
    stopGame();

}


/**
 * Stops the game and returns to the start screen.
 */
function stopGame(){
  stopAllIntervals();
  gameOn = false;  
  audioManager.stopAllAudio();
  changeAudioFunc();
  ingameControlsForStartscreen();
  init();
}


/**
 * Stops all intervals used in the game.
 */
function stopAllIntervals() {
  intervals.forEach((intervalId) => {
      clearInterval(intervalId);
  });
  intervals = []; // Das Array leeren
}


/**
 * Handles keyboard keydown events during the game.
 *
 * @param {Event} event - The keydown event.
 */
window.addEventListener('keydown', (event) => {
  if (gameOn) {
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
  }
});


/**
 * Handles keyboard keyup events during the game.
 *
 * @param {Event} event - The keyup event.
 */
window.addEventListener('keyup', (event) => {
  if (gameOn) {
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
  }
});


/**
 * Sets the state of a keyboard key for mobile controls.
 *
 * @param {string} key - The key to set.
 * @param {boolean} state - The state to set (true for pressed, false for released).
 */
function setKey(key, state) {
    keyboard[key] = state;
}


/**
 * Enters fullscreen mode for a specified element.
 *
 * @param {string} id - The ID of the HTML element to enter fullscreen.
 */
function fullscreen(id){
  isFullscreen = true;
  let fullscreen = document.getElementById(id);
  openFullscreen(fullscreen);
  updateFullscreenBtn();
}

/**
 * Opens fullscreen mode for a specified element.
 *
 * @param {HTMLElement} elem - The HTML element to enter fullscreen.
 */
function openFullscreen(elem) {
  if (elem.requestFullscreen) {
    elem.requestFullscreen();
  } else if (elem.webkitRequestFullscreen) { /* Safari */
    elem.webkitRequestFullscreen();
  } else if (elem.msRequestFullscreen) { /* IE11 */
    elem.msRequestFullscreen();
  }
  isFullscreen = true;
}


/**
 * Exits fullscreen mode.
 */
function closeFullscreen() {
    if (document.exitFullscreen) {
      document.exitFullscreen();
    } else if (document.webkitExitFullscreen) { /* Safari */
      document.webkitExitFullscreen();
    } else if (document.msExitFullscreen) { /* IE11 */
      document.msExitFullscreen();
    }
    isFullscreen = false;
    updateFullscreenBtn();
}