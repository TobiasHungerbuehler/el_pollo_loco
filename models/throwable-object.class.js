class ThrowableObject extends MovableObject{

    throw_sound = new Audio('audio/whoosh2.mp3');
    
    IMAGES_SPLASH  = [
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/1_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/2_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/3_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/4_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/5_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/6_bottle_splash.png'
    ];


    constructor(x,y, character, world, statusBar, audioManager){
        super();
        this.audioManager = audioManager;
        this.loadImage('img/6_salsa_bottle/salsa_bottle.png');
        this.loadImages(this.IMAGES_SPLASH);
        this.character = character;
        this.x = x;
        this.y = y;
        this.height = 60;
        this.width = 70;
        this.statusBar = statusBar;
        this.world = world;
        this.throw();
    }


    throw() {
        this.speedY = 10;
        this.applyGravity();
        this.audioManager.playAudio(this.throw_sound);
        if(this.character.throwDirectionRight) {
            this.throwInterval = setInterval(() => {
                this.x += 10;
            }, 25)
        } else {
            this.throwInterval = setInterval(() => {
                this.x -= 10;
            }, 25)
        }
        this.world.bottlescore -= 1; // Decrease bottlescore by 1
        let imgIndex =  this.world.bottlescore;
        if(imgIndex >= 5){
            imgIndex = 5;
        }
        this.statusBar.setBottlesPercentage(imgIndex);
        intervals.push(this.throwInterval);
    }
    

    bottleSplash(){
        this.dieAnimation(this.IMAGES_SPLASH);
    }

 


}