/**
 * Represents a small chicken enemy in the game.
 * @extends MovableObject
 */
class ChickenSmall extends MovableObject {
    y = 0;
    height = 60;
    width = 60;
    speed = 0.2
    fallingSoundON = true;
    
    IMAGES_WALKING = [
        'img/3_enemies_chicken/chicken_small/1_walk/1_w.png',
        'img/3_enemies_chicken/chicken_small/1_walk/2_w.png',
        'img/3_enemies_chicken/chicken_small/1_walk/3_w.png'
    ];

    IMAGES_DEAD = [
        'img/3_enemies_chicken/chicken_small/2_dead/dead.png'
    ];

    die_sound = new Audio('audio/dieSmallChicken.mp3');
    falling_sound = new Audio('audio/falling5.mp3');


    /**
     * Initializes a new instance of the ChickenSmall class.
     * @param {Character} character - The player's character.
     * @param {number} startX - The starting x-coordinate of the small chicken.
     */
    constructor(character, startX, audioManager) {
        super();
        this.audioManager = audioManager;
        this.loadImage('img/3_enemies_chicken/chicken_small/1_walk/1_w.png');
        this.character = character;
        this.startX = startX 
        this.x = this.startX;
        this.loadImages(this.IMAGES_WALKING) 
        this.loadImages(this.IMAGES_DEAD) 
        this.animate();
        this.speed = 2 + Math.random() * 1.5; 
    }


    /**
     * Animates the small chicken, making it move and play its walking animation.
     */
    animate(){
        this.isMoving = false;
        this.direction = -1;  
        this.movementInterval = setInterval(() => {
            this.moveChickenSmall();
        }, 1000 / 60)
        this.animationInterval = setInterval(()=> {
            this.playAnimation(this.IMAGES_WALKING)
        }, 100)
    }


    /**
     * Moves the small chicken based on its speed and direction. The chicken moves in a parabolic path.
     */
    moveChickenSmall() {
        if(this.character.x >= this.x - 500) {
            this.startMoving();
        }
        if(this.isMoving) {
            this.updatePosition();
            this.applyParabolicMovement();
            this.checkBounds();
        }
    }


    /**
     * Starts the small chicken's movement.
     */
    startMoving() {
        this.isMoving = true;
        if(this.fallingSoundON){
            this.audioManager.playAudio(this.falling_sound);
            this.fallingSoundON = false;
        }
    }

    
    /**
     * Updates the small chicken's position based on its speed and direction.
     */
    updatePosition() {
        this.x += this.speed * this.direction;
    }


    /**
     * Applies a parabolic movement to the small chicken's y-coordinate.
     */
    applyParabolicMovement() {
        this.y = 0.01 * Math.pow(this.x - this.startX , 2);
        if(this.y > 355){
            this.y = 355;
        }
    }


    /**
     * Checks and updates the small chicken's direction based on its position.
     */
    checkBounds() {
        if(this.x <= 50) {
            this.direction = 1;
            this.otherDirection = true;
        } else if(this.x >= 2500) {
            this.direction = -1;
            this.otherDirection = false;
        }
    }


    /**
     * Kills the small chicken, stopping its movement and playing its death animation.
     */
    die() {
        clearInterval(this.movementInterval);
        this.isDead = true;
        this.playAnimation(this.IMAGES_DEAD);
        this.outOfGameAnimation();
        this.audioManager.playAudio(this.die_sound);
    } 




    

}