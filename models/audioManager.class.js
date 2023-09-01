class AudioManager {

    music = new Audio('audio/music.mp3');
    loose_sound = new Audio('audio/loose.mp3');
    winn_sound = new Audio('audio/winn.mp3');

    constructor(world) {
        this.world = world;
        this.isMuted = muteModus; // Mute startstatus from start window
        this.allAudio = [];
        this.addAudio(this.music);
        this.playAudio(this.music)
        this.testControls();
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
        //audio.muted = this.isMuted;

        //console.log('all Audio Index', this.allAudio);
    }


    testControls() {
        // Erstellen des Buttons
        const button = document.createElement('button');
        button.innerText = 'Ton inGame';
    
        // Hinzufügen eines Event Listeners
        button.addEventListener('click', () => this.toggleMute());
    
        // Anhängen des Buttons an den Placeholder
        document.getElementById('placeholder').appendChild(button);
    }
    



    // Methode zum Umschalten der Stummschaltung
    toggleMute() {
        this.isMuted = !this.isMuted;
        muteModus = this.isMuted;  // aktualisiert die globale Variable
        this.allAudio.forEach(audio => {
            audio.muted = this.isMuted;
        });
    }

    
    closingMusic(result){
        this.world.gameOn = false;
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
    


}
