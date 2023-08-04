class Character extends MovableObject {
    width = 120;
    height = 280;
    y =  155;
    speed = 7;
    IMAGES_WALKING = [
        'img/2_character_pepe/2_walk/W-21.png',
        'img/2_character_pepe/2_walk/W-22.png',
        'img/2_character_pepe/2_walk/W-23.png',
        'img/2_character_pepe/2_walk/W-24.png',
        'img/2_character_pepe/2_walk/W-25.png',
        'img/2_character_pepe/2_walk/W-26.png'
    ];

    IMAGES_JUMPING = [
        'img/2_character_pepe/3_jump/J-31.png',
        'img/2_character_pepe/3_jump/J-32.png',
        'img/2_character_pepe/3_jump/J-33.png',
        'img/2_character_pepe/3_jump/J-34.png',
        'img/2_character_pepe/3_jump/J-35.png',
        'img/2_character_pepe/3_jump/J-36.png',
        'img/2_character_pepe/3_jump/J-37.png',
        'img/2_character_pepe/3_jump/J-38.png',
        'img/2_character_pepe/3_jump/J-39.png'
    ];

    IMAGES_DEAD = [
        'img/2_character_pepe/5_dead/D-51.png',
        'img/2_character_pepe/5_dead/D-52.png',
        'img/2_character_pepe/5_dead/D-53.png',
        'img/2_character_pepe/5_dead/D-54.png',
        'img/2_character_pepe/5_dead/D-55.png',
        'img/2_character_pepe/5_dead/D-56.png',
        'img/2_character_pepe/5_dead/D-57.png'
    ];

    IMAGES_HURT = [
        'img/2_character_pepe/4_hurt/H-41.png',
        'img/2_character_pepe/4_hurt/H-42.png',
        'img/2_character_pepe/4_hurt/H-43.png'
    ];

    world;
    walking_sound = new Audio('audio/running.mp3');

    constructor() {
        super().loadImage('img/2_character_pepe/2_walk/W-21.png')
        this.loadImages(this.IMAGES_WALKING) // load all walking images in imageCache
        this.loadImages(this.IMAGES_JUMPING) // load all walking images in imageCache
        this.loadImages(this.IMAGES_DEAD) // load all walking images in imageCache
        this.loadImages(this.IMAGES_HURT) // load all walking images in imageCache
        this.animate();     
        this.applyGravity();
    }
    
    animate(){

        // bewegen
        setInterval(()=> {
            this.walking_sound.pause();
            if(this.world.keyboard.RIGHT && this.x < this.world.level.level_end_x){ 
                this.moveRight();
                this.throwDirectionRight = true;
                this.walking_sound.play();
            }
            if(this.world.keyboard.LEFT && this.x > 0){ 
                this.moveLeft();
                this.throwDirectionRight = false;
                this.walking_sound.play();
            }
            if(this.world.keyboard.SPACE && !this.isAboveGround()){
                this.jump();       
            } 


            this.world.camera_x = -this.x +250; // x koordinate an camera_x übergeben
        }, 1000 / 60)

        // bilder animieren
        setInterval(()=> {

            if(this.dead()){
                this.playAnimation(this.IMAGES_DEAD);
             } else if (this.isHurt()) {
                 this.playAnimation(this.IMAGES_HURT);
            } 
            else if(this.isAboveGround() ){
                this.playAnimation(this.IMAGES_JUMPING);
            } else {

                if(this.world.keyboard.RIGHT || this.world.keyboard.LEFT){ 
                    this.playAnimation(this.IMAGES_WALKING)
                }

            }


        }, 50)
    }

    jump(){
        this.speedY = 30;
    }



}