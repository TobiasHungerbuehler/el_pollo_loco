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
        this.x = (Math.random() * 500) + 200; // Zufällige Position  + position pepe
        this.loadImages(this.IMAGES_WALKING) // load all walking images in imageCache
        this.animate();
        console.log('chicken function=', this.imageCache)
    }

    animate(){
        setInterval(()=> {
            let i = this.currentImage % this.IMAGES_WALKING.length;
            let path = this.IMAGES_WALKING[i];
            this.img = this.imageCache[path];
            this.currentImage++; 
        }, 1000)
    }




}