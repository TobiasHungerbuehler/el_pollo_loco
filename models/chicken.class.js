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

    constructor() {
        super().loadImage('img/3_enemies_chicken/chicken_normal/1_walk/1_w.png');
        this.x = (Math.random() * 2600) + 600; // Zufällige Position  + position pepe
        this.loadImages(this.IMAGES_WALKING) // load all walking images in imageCache
        this.loadImages(this.IMAGES_DEAD) // load all walking images in imageCache
        //this.loadImage(this.IMAGE_DEAD);
        this.animate();
        this.speed = 1.5 + Math.random() * 0.55; // random speed for chicken
    }

    animate(){
        //Chicken walking left
        this.movementInterval = setInterval(() => {
            this.x -= this.speed;
        }, 1000 / 60) 
    
        this.animationInterval = setInterval(()=> {
            this.playAnimation(this.IMAGES_WALKING)
        }, 100)
    }
    
    stopAnimation() {
        clearInterval(this.movementInterval);
        clearInterval(this.animationInterval);
    }
    

    die() {
        this.stopAnimation();
        console.log('test');
        // Setzt das Bild auf das Bild des toten Huhns
        //this.img = this.imageCache[this.IMAGE_DEAD];
        this.playAnimation(this.IMAGES_DEAD);
    }
    
}
