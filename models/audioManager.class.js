/**
 * Manages audio in the game, including background music and sound effects.
 */
class AudioManager {
    music = new Audio('audio/music.mp3');
    loose_sound = new Audio('audio/loose.mp3');
    winn_sound = new Audio('audio/winn.mp3');


    /**
     * Creates a new AudioManager instance.
     * @param {World} world - The game world to which the audio manager belongs.
     */
    constructor(world) {
        window.audioManager = this;
        this.world = world;
        this.isMuted = muteModus; // Mute startstatus from start window
        this.allAudio = [];
        this.addAudio(this.music);
        this.playAudio(this.music)
        this.ingameAudioControls();
    }


    /**
     * Plays an audio file.
     * @param {HTMLAudioElement} audio - The audio element to be played.
     */
    playAudio(audio) {
        audio.play();
        if (this.isMuted) {
            audio.muted = this.isMuted;
        }
        this.addAudio(audio);
    }


    /**
     * Adds an audio element to the manager's list.
     * @param {HTMLAudioElement} audio - The audio element to be added.
     */
    addAudio(audio) {
        this.allAudio.push(audio);
    }


    /**
     * Updates the audio control button image based on mute status.
     * @param {string} imageSrc - The image source for the audio control button.
     */
    updateAudioButton(imageSrc) {
        document.getElementById('ingame-audio-btn-container').innerHTML = /*html*/ `
                <img src="${imageSrc}" alt="">
        `;
    }


    /**
     * Initializes in-game audio controls and sets the audio button image.
     */
    ingameAudioControls() {
        let imageSrc;
        if (this.isMuted) {
            imageSrc = 'img/10_controls/mute.png';
        } else {
            imageSrc = 'img/10_controls/volume.png';
        }
        this.updateAudioButton(imageSrc);
    }
    

    /**
     * Toggles mute status for all audio elements.
     */
    toggleMute() {
        this.isMuted = !this.isMuted;
        muteModus = this.isMuted;  // Update the global variable
        this.allAudio.forEach(audio => {
            audio.muted = this.isMuted;
        });
        this.ingameAudioControls();
    }

    
     /**
     * Plays closing music based on the game result.
     * @param {string} result - The game result ('loose' or 'winn').
     */   
    closingMusic(result){
        if(result === 'loose'){
            this.music.pause(); 
            this.playAudio(this.loose_sound); 
        }
        if(result === 'winn'){
            this.music.pause(); 
            this.playAudio(this.winn_sound); 
        }
    }


    /**
     * Stops all audio playback.
     */
    stopAllAudio() {
        this.allAudio.forEach(audio => {
            audio.pause();       
        });
    }
}
