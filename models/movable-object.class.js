/**
 * Represents a movable object in the game, which includes characters and throwable objects.
 * This class provides methods for movement, collision detection, and status management.
 */
class MovableObject extends DrawableObject { // test
    speed = 0.15;
    otherDirection = false;
    throwDirectionRight = true;
    speedY = 0;
    acceleration = 2.5;
    energy = 100;
    lastHit = 0;
    isDead = false;
    audioManager;


    /**
     * Applies gravity to the object, causing it to fall when not on the ground.
     */
    applyGravity() {
        setInterval(() =>{
            if(this.isAboveGround() || this.speedY > 0){
                this.y -= this.speedY;
                this.speedY -= this.acceleration;
            }
        }, 1000 / 25);
    }


    /**
     * Checks if the object is above the ground or falling.
     * @returns {boolean} - True if the object is above the ground, false otherwise.
     */
    isAboveGround() {
        if(this instanceof ThrowableObject) { //Thrwable object allways falls
            return true
        } else {
            return this.y < 150;
        }
    }


    /**
     * Moves the object to the right.
     */
    moveRight(){
        this.x += this.speed;
        this.otherDirection = false; // bild nicht gespiegelt
    }


    /**
     * Moves the object to the left.
     */
    moveLeft(){
        this.x -= this.speed;
        this.otherDirection = true; // bild gespiegelt
    }
    

    /**
     * Checks if the object is colliding with another object.
     * @param {DrawableObject} obj - The other object to check for collision.
     * @returns {boolean} - True if the objects are colliding, false otherwise.
     */
    isColliding (obj) {
        return  this.x + (this.width - this.offset.right) > obj.x + obj.offset.left && 
                this.y + (this.height - this.offset.bottom) > obj.y + obj.offset.top &&
                this.x + this.offset.left < obj.x + (obj.width - obj.offset.right) &&
                this.y + this.offset.top < obj.y + (obj.height - obj.offset.bottom); 
    }


    /**
     * Inflicts damage to the object, reducing its energy.
     */
    hit(){
        this.energy -= 5;      
        if(this.energy < 0){
            this.energy = 0;
        } else {
            this.lastHit = new Date().getTime();
        }  
    }


    /**
     * Checks if the object is hurt (recently hit).
     * @returns {boolean} - True if the object is hurt, false otherwise.
     */
    isHurt(){
        let timepassed = new Date().getTime() -this.lastHit; // Difference in ms
        timepassed = timepassed / 400;
        return timepassed < 1;
    }


    /**
     * Checks if the object is dead (energy depleted).
     * @returns {boolean} - True if the object is dead, false otherwise.
     */
    dead(){
        return this.energy == 0;
    }


    /**
     * Performs an out-of-game animation for the object.
     * This is typically used for objects that have fallen out of the game world.
     */
    outOfGameAnimation(){
        this.speedY = 10;
        this.applyGravity();
        setInterval(() => {
            this.x += 5;
            this.y += 10;
        }, 25)
    } 


    /**
     * Plays a die animation using a sequence of images.
     * @param {string[]} array - An array of image paths for the animation.
     */
    dieAnimation(array){
        for (let i = 0; i < array.length - 1; i++) {
            setTimeout(() => {
                let path = array[i];
                this.img = this.imageCache[path];
            }, i * 30);
        }
    }
}
