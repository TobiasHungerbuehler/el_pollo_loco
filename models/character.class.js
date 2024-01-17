/**
 * Represents the main character of the game.
 * @extends MovableObject
 */
class Character extends MovableObject {
    width = 120;
    height = 280;
    y =  155;
    speed = 7;
    offset = {
        top: 150,
        left: 40,
        right: 40,
        bottom: 30
    }


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
    walking_sound = new Audio('audio/running3.mp3');
    jump_sound = new Audio('audio/jump2.mp3');
    hurt_sound = new Audio('audio/character_hurt.mp3');


    /**
     * Creates a new Character instance.
     * @param {AudioManager} audioManager - The audio manager for handling character's audio.
     */
    constructor(audioManager) {
        super();
        this.audioManager = audioManager;
        this.loadImage('img/2_character_pepe/2_walk/W-21.png');
        this.loadImages(this.IMAGES_WALKING); // load all walking images in imageCache
        this.loadImages(this.IMAGES_JUMPING); // load all walking images in imageCache
        this.loadImages(this.IMAGES_DEAD); // load all walking images in imageCache
        this.loadImages(this.IMAGES_HURT); // load all walking images in imageCache
        this.animate();     
        this.applyGravity();
    }
    

    /**
     * Initiates character animations and movements.
     */
    animate(){
        this.moveAnimation();
        this.imageAnimation();
        intervals.push(this.characterImageAnimation);
        intervals.push(this.characterMoveAnimation);
    }


    /**
     * Handles character's movement animation.
     */
    moveAnimation(){
        this.characterMoveAnimation = setInterval(()=> {
            this.walking_sound.pause();
            if(this.world.keyboard.RIGHT && this.x < this.world.level.level_end_x){ 
                this.moveRight();
                this.throwDirectionRight = true;
                this.audioManager.playAudio(this.walking_sound);
            }
            if(this.world.keyboard.LEFT && this.x > 0){ 
                this.moveLeft();
                this.throwDirectionRight = false;
                this.audioManager.playAudio(this.walking_sound);
            }
            if(this.world.keyboard.SPACE && !this.isAboveGround()){
                this.jump();       
                this.audioManager.playAudio(this.jump_sound);
            } 
            this.world.camera_x = -this.x +250; // x koordinate an camera_x übergeben
        }, 1000 / 60)

    }


    /**
     * Handles character's image animation.
     */
    imageAnimation(){
        this.characterImageAnimation = setInterval(()=> {
            if(this.dead()){
                this.CharacterEndAnimation();
                this.audioManager.closingMusic('loose');
                endScreen('img/9_intro_outro_screens/game_over/gameover!.png');
                gameOn = false;
            } else if (this.isHurt()) {
                this.playAnimation(this.IMAGES_HURT);
                this.audioManager.playAudio(this.hurt_sound);
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


    /**
     * Makes the character jump.
     */
    jump(){
        this.speedY = 30;
    }


    /**
     * Initiates the character's end animation (death animation).
     */
    CharacterEndAnimation() {
        this.dieAnimation(this.IMAGES_DEAD);
        clearInterval(this.characterImageAnimation);
        clearInterval(this.characterMoveAnimation);
    }
    
    

    




}