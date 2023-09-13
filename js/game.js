let canvas;
let world; 
let keyboard = new Keyboard();
let muteModus = false;
let intervals = [];
let gameOn;
let isFullscreen = false;



function muteAllAudio() {
  muteModus = !muteModus;
  updateStartAudioBtn();
}


function init() {
  console.log('Mutemodus =', muteModus);
  document.getElementById('stage').innerHTML += startScreenHTML();
  updateStartAudioBtn();
  //updateFullscreenBtn();
}


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


function startGame(){
  gameOn = true;
  document.querySelector('.overlay').remove();
  canvas = document.getElementById('canvas'); // canvas html element in variable
  world = new World(canvas, keyboard); // erzeuge neue Welt und übergieb canvas
  changeAudioFunc();
}


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



// function endScreen(img){
//   document.getElementById('stage').innerHTML += `
//     <div class="endscreen" id="endscreen">
//       <img src="${img}">
//     </div>
//   `;
// }

function endScreen(img) {
  const endScreenDiv = document.createElement('div');
  endScreenDiv.className = 'endscreen';
  endScreenDiv.innerHTML = `
    <img src="${img}">
  `;
  document.getElementById('stage').appendChild(endScreenDiv);
}



function stopGame(){
  stopAllIntervals();
  gameOn = false;  
  audioManager.stopAllAudio();
  changeAudioFunc();
  init();
}


function stopAllIntervals() {
  intervals.forEach((intervalId) => {
      clearInterval(intervalId);
  });
  intervals = []; // Das Array leeren
}


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



// for mobile buttons
function setKey(key, state) {
    keyboard[key] = state;
}

// Fullscreen /////////////////////////////////////////////

function fullscreen(id){
  isFullscreen = true;
  let fullscreen = document.getElementById(id);
  openFullscreen(fullscreen);
  updateFullscreenBtn();
}

/* View in fullscreen */
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


/* Close fullscreen */
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
  

function startScreenHTML(){
    return /*html*/ `
              <div class="overlay frame" id="overlay">

                  <div class="startscreen-top">
                    
                      <!-- <div class="start-controls">
                          <div class="start-img-container" id="audio-img-container" onclick="muteAllAudio()">
                              <img src="img/10_controls/volume.png" alt="">
                          </div>
                          <div class="start-img-container" id="fullscreen-img-container" onclick="fullscreen('stage')">
                              <img src="img/10_controls/fullscreen.png" alt="">
                          </div>
                      </div> -->

                      <div class="start-btn hovering"  onclick="startGame()">
                          <h2>Start</h2>
                      </div>
      
                  </div>
                
    
                <div class="description">

                    <div class="box-wrapper" id="desktop-box">
                        <div class="box">
                            <img src="img/10_controls/arrow.png" alt="">
                            <div class="des-txt">Left</div>
                        </div>
                        <div class="box">
                            <img src="img/10_controls/arrow.png" alt="">
                            <div class="des-txt">Right</div>
                        </div>
                        <div class="box">
                            <img src="img/10_controls/letter-d.png" alt="">
                            <div class="des-txt">Throw</div>
                        </div>
                        <div class="box">
                            <img src="img/10_controls/space.png" alt="">
                            <div class="des-txt">Jump</div>
                        </div>
                    </div>

                    <div class="box-wrapper" id="mobile-box">
                        <div class="box">
                            <img src="img/10_controls/arrow-mobile-btn.png" alt="">
                            <div class="des-txt">Left</div>
                        </div>
                        <div class="box">
                            <img src="img/10_controls/arrow-mobile-btn.png" alt="">
                            <div class="des-txt">Right</div>
                        </div>
                        <div class="box">
                            <img src="img/10_controls/arrow-mobile-btn-btl.png" alt="">
                            <div class="des-txt">Throw</div>
                        </div>
                        <div class="box">
                            <img src="img/10_controls/arrow-mobile-btn-up.png" alt="">
                            <div class="des-txt">Jump</div>
                        </div>
                    </div>

    
                </div>
            </div>
    
    
    
    
    `;
  }
