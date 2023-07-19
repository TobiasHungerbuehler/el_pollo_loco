class Character extends MovableObject {
    width = 120;
    height = 280;
    y = 155;
    speed = 10;
    IMAGES_WALKING = [
        '../img/2_character_pepe/2_walk/W-21.png',
        '../img/2_character_pepe/2_walk/W-22.png',
        '../img/2_character_pepe/2_walk/W-23.png',
        '../img/2_character_pepe/2_walk/W-24.png',
        '../img/2_character_pepe/2_walk/W-25.png',
        '../img/2_character_pepe/2_walk/W-26.png'
    ]
    world;

    constructor() {
        super().loadImage('../img/2_character_pepe/2_walk/W-21.png')
        this.loadImages(this.IMAGES_WALKING) // load all walking images in imageCache
        this.animate();     
    }
    
    animate(){

        // vor und zurück bewegen
        setInterval(()=> {
            if(this.world.keyboard.RIGHT && this.x < this.world.level.level_end_x){ 
                this.x += this.speed;
                this.otherDirection = false; // bild nicht gespiegelt
            }
            if(this.world.keyboard.LEFT && this.x > 0){ 
                this.x -= this.speed;
                this.otherDirection = true; // bild gespiegelt
            }
            this.world.camera_x = -this.x +100; // x koordinate an camera_x übergeben
        }, 1000 / 60)

        // bilder animieren
        setInterval(()=> {
            if(this.world.keyboard.RIGHT || this.world.keyboard.LEFT){ 

                let i = this.currentImage % this.IMAGES_WALKING.length;
                let path = this.IMAGES_WALKING[i];
                this.img = this.imageCache[path];
                this.currentImage++; 
            }
        }, 50)
    }



}