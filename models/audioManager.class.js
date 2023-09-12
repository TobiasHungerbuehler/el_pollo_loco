class AudioManager {

    music = new Audio('audio/music.mp3');
    loose_sound = new Audio('audio/loose.mp3');
    winn_sound = new Audio('audio/winn.mp3');

    constructor(world) {
        window.audioManager = this;
        this.world = world;
        this.isMuted = muteModus; // Mute startstatus from start window
        this.allAudio = [];
        this.addAudio(this.music);
        this.playAudio(this.music)
        this.ingameAudioControls();
    }


    // Methode zum Abspielen einer Audiodatei
    playAudio(audio) {
        audio.play();

        //setzte auf mute wenn isMuted = true
        if (this.isMuted) {
            audio.muted = this.isMuted;
        }
        this.addAudio(audio);
    }


    // Methode zum Hinzufügen von Audiodateien zum Manager
    addAudio(audio) {
        this.allAudio.push(audio);
    }


    updateAudioButton(imageSrc) {
        document.getElementById('ingame-audio-btn-container').innerHTML = /*html*/ `

                <img src="${imageSrc}" alt="">

        `;
    }


    ingameAudioControls() {
        let imageSrc;
        if (this.isMuted) {
            imageSrc = 'img/10_controls/mute.png';
        } else {
            imageSrc = 'img/10_controls/volume.png';
        }
        this.updateAudioButton(imageSrc);
    }
    


    // Methode zum Umschalten der Stummschaltung
    toggleMute() {
        this.isMuted = !this.isMuted;
        muteModus = this.isMuted;  // aktualisiert die globale Variable
        this.allAudio.forEach(audio => {
            audio.muted = this.isMuted;
        });
        this.ingameAudioControls();
    }

    
    closingMusic(result){
        //this.world.gameOn = false;
        if(result === 'loose'){
            this.music.pause(); // Stoppt die Musik
            //this.music.currentTime = 0; // Setzt den Zeitpunkt der Musik auf 0 zurück
            this.playAudio(this.loose_sound); // Spielt den "loose"-Sound ab
        }
        if(result === 'winn'){
            this.music.pause(); // Stoppt die Musik
            //this.music.currentTime = 0; // Setzt den Zeitpunkt der Musik auf 0 zurück
            this.playAudio(this.winn_sound); // Spielt den "winn"-Sound ab
        }
    }


    stopAllAudio() {
        this.allAudio.forEach(audio => {
            audio.pause();        // Pausiert das Audio
        });
    }
    


}
