

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
