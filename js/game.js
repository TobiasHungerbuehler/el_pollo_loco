let canvas;
let world; 
let keyboard = new Keyboard();
let muteModus = false;
let intervals = [];
let gameOn;


function muteAllAudio() {
  muteModus = !muteModus;
  startAudioToggle();
}


function init() {
  console.log('Mutemodus =', muteModus);
  document.getElementById('stage').innerHTML += startScreenHTML();
  startAudioToggle();
}

function startAudioToggle(){
  let src;
  if(muteModus){
    src = 'img/10_controls/mute.png';
  } 
  if(!muteModus){
    src = 'img/10_controls/volume.png';
  }
  document.getElementById('audio-img-container').innerHTML = `<img src="${src}">`
}


function startGame(){
  gameOn = true;
  document.querySelector('.overlay').remove();
  canvas = document.getElementById('canvas'); // canvas html element in variable
  world = new World(canvas, keyboard); // erzeuge neue Welt und übergieb canvas
}


function gameOverScreen(){
  console.log('game over')
}


function stopGame(){
  stopAllIntervals();
  gameOn = false;  // Setzt die gameOn-Variable in der World-Instanz auf false
  audioManager.stopAllAudio();
  init();
}


function stopAllIntervals() {
  intervals.forEach((intervalId) => {
      clearInterval(intervalId);
  });
  intervals = []; // Das Array leeren
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
  

function startScreenHTML(){
    return /*html*/ `
              <div class="overlay frame" id="overlay">

                <div class="startscreen-top">

                    <div class="audio-img-container" id="audio-img-container" onclick="muteAllAudio()">
                        <img src="img/10_controls/volume.png" alt="">
                    </div>

                    <div class="start-btn hovering"  onclick="startGame()">
                        <h2>Start</h2>
                    </div>
    
                </div>
                
    
                <div class="description">
                    <div class="box-wrapper" id="desktop-box">
                        <div class="box">
                            <img src="img/10_controls/volume.png" alt="">
                            <div class="des-txt">Left</div>
                        </div>
                        <div class="box">
                            <img src="img/10_controls/volume.png" alt="">
                            <div class="des-txt">Right</div>
                        </div>
                        <div class="box">
                            <img src="img/10_controls/volume.png" alt="">
                            <div class="des-txt">Jump</div>
                        </div>
                        <div class="box">
                            <img src="img/10_controls/volume.png" alt="">
                            <div class="des-txt">Throw</div>
                        </div>
                        <div class="box">
                            <img src="img/10_controls/volume.png" alt="">
                            <div class="des-txt">Left</div>
                        </div>
    
                    </div>
    
                </div>
            </div>
    
    
    
    
    `;
  }
