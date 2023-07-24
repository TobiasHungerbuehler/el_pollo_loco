class Chicken extends MovableObject {
    y = 334;
    height = 100
    width = 80
    IMAGES_WALKING = [
        'img/3_enemies_chicken/chicken_normal/1_walk/1_w.png',
        'img/3_enemies_chicken/chicken_normal/1_walk/2_w.png',
        'img/3_enemies_chicken/chicken_normal/1_walk/3_w.png'
    ];

    constructor() {
        super().loadImage('img/3_enemies_chicken/chicken_normal/1_walk/1_w.png');
        this.x = (Math.random() * 2600) + 600; // Zufällige Position  + position pepe
        this.loadImages(this.IMAGES_WALKING) // load all walking images in imageCache
        this.animate();
        this.speed = 1.5 + Math.random() * 0.55; // random speed for chicken
    }

    animate(){
   
        //Chicken walking left
        setInterval(() => {
            this.x -= this.speed;
        }, 1000 / 60) 

        setInterval(()=> {
            this.playAnimation(this.IMAGES_WALKING)
        }, 100)
    }




}