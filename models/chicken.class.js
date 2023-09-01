/**
 * Represents a chicken enemy in the game.
 * @extends MovableObject
 */
class Chicken extends MovableObject {
    y = 334;
    height = 100
    width = 80
    
    IMAGES_WALKING = [
        'img/3_enemies_chicken/chicken_normal/1_walk/1_w.png',
        'img/3_enemies_chicken/chicken_normal/1_walk/2_w.png',
        'img/3_enemies_chicken/chicken_normal/1_walk/3_w.png'
    ];

    IMAGES_DEAD = [
        'img/3_enemies_chicken/chicken_normal/2_dead/dead.png'
    ];

    die_sound = new Audio('audio/dieChicken.mp3');


    /**
    * Initializes a new instance of the Chicken class.
    */
    constructor(audioManager) {
        super()
        this.audioManager = audioManager;
        this.loadImage('img/3_enemies_chicken/chicken_normal/1_walk/1_w.png');
        this.x = (Math.random() * 2600) + 600; 
        this.loadImages(this.IMAGES_WALKING) 
        this.loadImages(this.IMAGES_DEAD) 
        this.animate();
        this.speed = 1.5 + Math.random() * 0.55; 
    }

    
    /**
    * Animates the chicken, making it move and play its walking animation.
    */
    animate(){
        this.direction = -1;  
        this.movementInterval = setInterval(() => {
            this.moveChicken();
        }, 1000 / 60)
        this.animationInterval = setInterval(()=> {
            this.playAnimation(this.IMAGES_WALKING)
        }, 100)
    }


    /**
    * Moves the chicken based on its speed and direction.
    */
    moveChicken() {
        this.x += this.speed * this.direction;
        if(this.x <= 50) {
            this.direction = 1;
            this.otherDirection = true;
        } else if(this.x >= 2500) {
            this.direction = -1;
            this.otherDirection = false;
        }
    }
    

    /**
    * Stops the chicken's animation and movement.
    */
    stopAnimation() {
        clearInterval(this.movementInterval);
        clearInterval(this.animationInterval);
    }
    

    /**
    * Kills the chicken, stopping its animation and playing its death animation.
    */
    die() {
        this.stopAnimation();
        this.isDead = true;
        this.playAnimation(this.IMAGES_DEAD);
        this.outOfGameAnimation();
        this.audioManager.playAudio(this.die_sound);
    } 
}
