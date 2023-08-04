class ChickenSmall extends MovableObject {
    y = 0;
    height = 60;
    width = 60;
    speed = 0.2
    
    IMAGES_WALKING = [
        'img/3_enemies_chicken/chicken_small/1_walk/1_w.png',
        'img/3_enemies_chicken/chicken_small/1_walk/2_w.png',
        'img/3_enemies_chicken/chicken_small/1_walk/3_w.png'
    ];

    IMAGES_DEAD = [
        'img/3_enemies_chicken/chicken_small/2_dead/dead.png'
    ];

    constructor(character, startX) {
        super().loadImage('img/3_enemies_chicken/chicken_small/1_walk/1_w.png');
        this.character = character;
        this.startX = startX //800; // startpunk der animation
        this.x = this.startX ;//(Math.random() * 2600) + 600; // Zufällige Position  + position character
        this.loadImages(this.IMAGES_WALKING) // load all walking images in imageCache
        this.loadImages(this.IMAGES_DEAD) // load all walking images in imageCache
        this.animate();
        this.speed = 2 + Math.random() * 1.5; // random speed for chicken
    }


    animate(){
        this.isMoving = false;
        this.direction = -1;  // -1 bedeutet links, 1 bedeutet rechts
        this.movementInterval = setInterval(() => {
            this.moveChickenSmall();
        }, 1000 / 60)
        
        this.animationInterval = setInterval(()=> {
            this.playAnimation(this.IMAGES_WALKING)
        }, 100)
    }


    moveChickenSmall(){
        if(this.character.x >= this.x - 500){
            this.isMoving = true;
        }
        if(this.isMoving){
            this.x += this.speed * this.direction;
            this.y = 0.01 * Math.pow(this.x - this.startX , 2); //Parabelbewegung
            if(this.y > 355){
                this.y = 355;
            }
            if(this.x <= 50) {
                this.direction = 1;
                this.otherDirection = true;
            } else if(this.x >= 2500) {
                this.direction = -1;
                this.otherDirection = false;
            }
        }
    }


    die() {
        clearInterval(this.movementInterval);
        this.isDead = true;
        this.playAnimation(this.IMAGES_DEAD);
        this.outOfGameAnimation();
    } 




    

}