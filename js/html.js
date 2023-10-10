

function endScreen(img) {
    const endScreenDiv = document.createElement('div');
    endScreenDiv.className = 'endscreen';
    endScreenDiv.id = 'endscreen';
    endScreenDiv.innerHTML = createEndscreenHtml(img);
    document.getElementById('stage').appendChild(endScreenDiv);
  }


function createEndscreenHtml(img){
    return `
            <img src="${img}">
            <div onclick="returnToStart()" class="return-btn hovering" id="return-btn">Return</div>
        `;
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
