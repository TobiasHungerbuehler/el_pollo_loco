/**
 * Represents a throwable object in the game.
 */
class ThrowableObject extends MovableObject{

    /**
     * The offset values for collision detection.
     * @type {object}
    */
    offset = {
        top: 8,
        left: 25,
        right: 25,
        bottom: 8
    }
    rotationAngle = 0;
    throw_sound = new Audio('audio/whoosh2.mp3');
    

    /**
     * An array of image paths for the throwable object's splash animation.
     * @type {string[]}
     */
    IMAGES_SPLASH  = [
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/1_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/2_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/3_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/4_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/5_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/6_bottle_splash.png'
    ];


    /**
     * Creates an instance of the ThrowableObject class.
     * @param {number} x - The initial x-coordinate of the throwable object.
     * @param {number} y - The initial y-coordinate of the throwable object.
     * @param {Character} character - The character associated with the throwable object.
     * @param {World} world - The game world where the throwable object exists.
     * @param {StatusBar} statusBar - The status bar displaying game information.
     * @param {AudioManager} audioManager - The audio manager responsible for game audio.
     */
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


    /**
     * Throws the throwable object.
     */
    throw() {
        this.speedY = 10;
        this.applyGravity();
        this.audioManager.playAudio(this.throw_sound);
        if(this.character.throwDirectionRight) {
            this.throwInterval = setInterval(() => {
                this.x += 10;
                this.rotationAngle += Math.PI / 10;  
            }, 25);
        } else {
            this.throwInterval = setInterval(() => {
                this.x -= 10;
                this.rotationAngle += Math.PI / 10;  
            }, 25);
        }
        this.decreaseBottlescore();
    }


    /**
     * Draws the throwable object on the canvas with rotation.
     * It translates the canvas context to the object's center, rotates it, 
     * draws the object, and then restores the context to its original state.
     *
     * @param {CanvasRenderingContext2D} ctx - The 2D rendering context of the canvas.
     */
    draw(ctx) {
        ctx.save();
        ctx.translate(this.x + this.width / 2, this.y + this.height / 2); // Verschiebt den Drehpunkt zur Mitte der Flasche
        ctx.rotate(this.rotationAngle);
        ctx.drawImage(this.img, -this.width / 2, -this.height / 2, this.width, this.height); // Zeichnet das Bild zentriert
        ctx.restore();
    }


    /**
     * Decreases the bottlescore and updates the status bar accordingly.
     * This function decreases the bottlescore by 1, ensures the bottlescore doesn't go below 0,
     * and updates the status bar to reflect the current bottlescore.
     */
    decreaseBottlescore(){
        this.world.bottlescore -= 1; // Decrease bottlescore by 1
        let imgIndex =  this.world.bottlescore;
        if(imgIndex >= 5){
            imgIndex = 5;
        }
        this.statusBar.setBottlesPercentage(imgIndex);
        intervals.push(this.throwInterval);
    }


    /**
     * Initiates the splash animation of the throwable object.
     */
    bottleSplash(){
        this.dieAnimation(this.IMAGES_SPLASH);
    }
}