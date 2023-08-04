class MovableObject extends DrawableObject { // test
    speed = 0.15;
    otherDirection = false;
    throwDirectionRight = true;
    speedY = 0;
    acceleration = 2.5;
    energy = 100;
    lastHit = 0;
    isDead = false;


    applyGravity() {
        setInterval(() =>{
            if(this.isAboveGround() || this.speedY > 0){
                this.y -= this.speedY;
                this.speedY -= this.acceleration;
            }
        }, 1000 / 25);
    }

    isAboveGround() {
        if(this instanceof ThrowableObject) { //Thrwable object allways falls
            return true
        } else {
            return this.y < 150;
        }
    }

    moveRight(){
        this.x += this.speed;
        this.otherDirection = false; // bild nicht gespiegelt
    }

    moveLeft(){
        this.x -= this.speed;
        this.otherDirection = true; // bild gespiegelt
    }
    
    playAnimation(images){
        let i = this.currentImage % images.length;
        let path = images[i];
        this.img = this.imageCache[path];
        this.currentImage++; 
    }
    
    //Formel zur Kollisionsberechnung 
    isColliding (obj) {
        return this.x + this.width > obj.x && 
            this.y + this.height > obj.y &&
            this.x < obj.x + obj.width &&
            this.y < obj.y + obj.height

    }

    hit(){
        this.energy -= 5;      
        if(this.energy < 0){
            this.energy = 0;
        } else {
            this.lastHit = new Date().getTime();
        }  
    }

    isHurt(){
        let timepassed = new Date().getTime() -this.lastHit; // Difference in ms
        timepassed = timepassed / 1000;
        return timepassed < 1;
    }

    dead(){
        return this.energy == 0;
    }

    outOfGameAnimation(){
        this.speedY = 10;
        this.applyGravity();
        setInterval(() => {
            this.x += 5;
            this.y += 10;
        }, 25)
    } 







}
