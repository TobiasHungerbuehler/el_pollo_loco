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


    IMAGES_IDLE = [
        'img/2_character_pepe/1_idle/idle/I-1.png',
        'img/2_character_pepe/1_idle/idle/I-2.png',
        'img/2_character_pepe/1_idle/idle/I-3.png',
        'img/2_character_pepe/1_idle/idle/I-4.png',
        'img/2_character_pepe/1_idle/idle/I-5.png',
        'img/2_character_pepe/1_idle/idle/I-6.png',
        'img/2_character_pepe/1_idle/idle/I-7.png',
        'img/2_character_pepe/1_idle/idle/I-8.png',
        'img/2_character_pepe/1_idle/idle/I-9.png',
        'img/2_character_pepe/1_idle/idle/I-10.png'
    ];


    IMAGES_LONG_IDLE = [
        'img/2_character_pepe/1_idle/long_idle/I-11.png',
        'img/2_character_pepe/1_idle/long_idle/I-12.png',
        'img/2_character_pepe/1_idle/long_idle/I-13.png',
        'img/2_character_pepe/1_idle/long_idle/I-14.png',
        'img/2_character_pepe/1_idle/long_idle/I-15.png',
        'img/2_character_pepe/1_idle/long_idle/I-16.png',
        'img/2_character_pepe/1_idle/long_idle/I-17.png',
        'img/2_character_pepe/1_idle/long_idle/I-18.png',
        'img/2_character_pepe/1_idle/long_idle/I-19.png',
        'img/2_character_pepe/1_idle/long_idle/I-20.png'
    ];


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
        this.loadImages(this.IMAGES_IDLE); 
        this.loadImages(this.IMAGES_LONG_IDLE); 
        this.loadImages(this.IMAGES_WALKING); 
        this.loadImages(this.IMAGES_JUMPING); 
        this.loadImages(this.IMAGES_DEAD); 
        this.loadImages(this.IMAGES_HURT); 
        this.animate();     
        this.applyGravity();
        this.isIdle = false;
        this.idleTimer = 0;
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
     * Handles the character's movement based on keyboard input.
     */
    moveAnimation(){
        this.characterMoveAnimation = setInterval(()=> {
            this.walking_sound.pause();
            if(this.world.keyboard.RIGHT && this.x < this.world.level.level_end_x){ 
                this.characterMoveRight();
            }
            if(this.world.keyboard.LEFT && this.x > 0){ 
                this.characterMoveLeft();
            }
            if(this.world.keyboard.SPACE && !this.isAboveGround()){
                this.characterJump();
            } 
            this.world.camera_x = -this.x +250; 
        }, 1000 / 60)

    }


    /**
     * Manages the character's rightward movement and triggers the corresponding sound.
     */
    characterMoveRight(){
        this.moveRight();
        this.throwDirectionRight = true;
        this.audioManager.playAudio(this.walking_sound);
    }


    /**
     * Manages the character's leftward movement and triggers the corresponding sound.
     */
    characterMoveLeft(){
        this.moveLeft();
        this.throwDirectionRight = false;
        this.audioManager.playAudio(this.walking_sound);
    }


    /**
     * Manages the character's jumping action and triggers the corresponding sound.
     */
    characterJump() {
        this.jump();       
        this.audioManager.playAudio(this.jump_sound);
    }


    /**
     * Manages the character's image animation based on various states like dead, hurt, jumping, or idle.
     */
    imageAnimation() {
        this.characterImageAnimation = setInterval(() => {
            if (this.dead()) {
                this.characterDeadAnimation();
            } else if (this.isHurt()) {
                this.playAnimation(this.IMAGES_HURT);
                this.audioManager.playAudio(this.hurt_sound);
            } else if (this.isAboveGround()) {
                this.playAnimation(this.IMAGES_JUMPING);
            } else {
                this.handleIdleAndWalkingState();
            }
        }, 100);
    }


    /**
     * Handles the idle and walking state of the character, including switching between idle animations.
     */
    handleIdleAndWalkingState() {
        if (!this.world.keyboard.RIGHT && !this.world.keyboard.LEFT && !this.world.keyboard.SPACE) {
            this.isIdle = true;
            this.idleTimer += 50; 
            this.characterIdleTimer()
        } else {
            this.isIdle = false;
            this.idleTimer = 0;
            if (this.world.keyboard.RIGHT || this.world.keyboard.LEFT) {
                this.playAnimation(this.IMAGES_WALKING);
            }
        }
    }


    /**
     * Handles the character's dead animation and game over logic.
     */
    characterDeadAnimation(){
        this.CharacterEndAnimation();
        this.audioManager.closingMusic('loose');
        endScreen('img/9_intro_outro_screens/game_over/gameover!.png');
        gameOn = false;
    }


    /**
     * Manages the timer for idle animations and switches between idle and long idle animations.
     */
    characterIdleTimer() {
        if (this.idleTimer > 2000) {
            this.playAnimation(this.IMAGES_LONG_IDLE);
        } else {
            this.playAnimation(this.IMAGES_IDLE);
        }
    }


    /**
     * Makes the character jump.
     */
    jump(){
        this.speedY = 30;
    }


    /**
     * Initiates the character's end animation sequence upon death.
     */
    CharacterEndAnimation() {
        this.dieAnimation(this.IMAGES_DEAD);
        clearInterval(this.characterImageAnimation);
        clearInterval(this.characterMoveAnimation);
    }
}