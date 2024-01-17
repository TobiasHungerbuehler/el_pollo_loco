/**
 * Generates the HTML for the start screen.
 *
 * @returns {string} The HTML content for the start screen.
 */
function startScreenHTML(){
  return /*html*/ `
            <div class="overlay frame" id="overlay">

                    <div class="start-btn hovering"  onclick="startGame()">
                        <h2>Start</h2>
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


/**
 * Displays an end screen with the provided image.
 *
 * @param {string} img - The URL of the image to display on the end screen.
 */
function endScreen(img) {
    const endScreenDiv = document.createElement('div');
    endScreenDiv.className = 'endscreen';
    endScreenDiv.id = 'endscreen';
    endScreenDiv.innerHTML = createEndscreenHtml(img);
    document.getElementById('stage').appendChild(endScreenDiv);
  }


/**
 * Creates the HTML content for the end screen with the provided image.
 *
 * @param {string} img - The URL of the image to display on the end screen.
 * @returns {string} The HTML content for the end screen.
 */
function createEndscreenHtml(img){
    return `
            <img src="${img}">
            <div onclick="returnToStart()" class="return-btn hovering" id="return-btn">Return</div>
        `;
}


/**
 * Updates the fullscreen button based on the current fullscreen state.
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
