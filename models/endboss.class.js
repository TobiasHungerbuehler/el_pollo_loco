 /**
 * Represents the Endboss character, an extended version of MovableObject.
 * @extends MovableObject
 */
 class Endboss extends MovableObject{
    height = 400;
    width = 230;
    y = 50;
    startX
    endbossHits = 0;
    endbossInterval = 0;
    isHurt = false;
    lastHurtTime = 0;
    hurtCooldown = 1200; 
    currentTime = 0;
    hurt_sound = new Audio('audio/endbossHurt.mp3');

    IMAGES_ALERT = [
        'img/4_enemie_boss_chicken/2_alert/G5.png',
        'img/4_enemie_boss_chicken/2_alert/G6.png',
        'img/4_enemie_boss_chicken/2_alert/G7.png',
        'img/4_enemie_boss_chicken/2_alert/G8.png',
        'img/4_enemie_boss_chicken/2_alert/G9.png',
        'img/4_enemie_boss_chicken/2_alert/G10.png',
        'img/4_enemie_boss_chicken/2_alert/G11.png',
        'img/4_enemie_boss_chicken/2_alert/G12.png'
    ];

    IMAGES_WALKING = [
        'img/4_enemie_boss_chicken/1_walk/G1.png',
        'img/4_enemie_boss_chicken/1_walk/G2.png',
        'img/4_enemie_boss_chicken/1_walk/G3.png',
        'img/4_enemie_boss_chicken/1_walk/G4.png'
    ];

    IMAGES_ATTACK = [
        'img/4_enemie_boss_chicken/3_attack/G13.png',
        'img/4_enemie_boss_chicken/3_attack/G14.png',
        'img/4_enemie_boss_chicken/3_attack/G15.png',
        'img/4_enemie_boss_chicken/3_attack/G16.png',
        'img/4_enemie_boss_chicken/3_attack/G17.png',
        'img/4_enemie_boss_chicken/3_attack/G18.png',
        'img/4_enemie_boss_chicken/3_attack/G19.png',
        'img/4_enemie_boss_chicken/3_attack/G20.png'
    ];

    IMAGES_HURT  = [
        'img/4_enemie_boss_chicken/4_hurt/G21.png',
        'img/4_enemie_boss_chicken/4_hurt/G22.png',
        'img/4_enemie_boss_chicken/4_hurt/G23.png'
    ];

    IMAGES_DEAD  = [
        'img/4_enemie_boss_chicken/5_dead/G24.png',
        'img/4_enemie_boss_chicken/5_dead/G25.png',
        'img/4_enemie_boss_chicken/5_dead/G26.png'
    ];


    /**
     * Creates an instance of Endboss.
     * @param {Object} statusBar - The status bar associated with the Endboss.
     */
    constructor(statusBar, audioManager){
        super()
        this.audioManager = audioManager;
        this.loadImage(this.IMAGES_ALERT[0]);
        this.loadImages(this.IMAGES_ALERT);
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_ATTACK);
        this.loadImages(this.IMAGES_HURT);
        this.loadImages(this.IMAGES_DEAD);
        this.statusBar = statusBar;
        this.x = 2500;
        this.startX = this.x;
        this.animate();
    }


    /**
     * Initiates the Endboss animation.
     */
    animate(){
        this.attack();
    }


    /**
     * Clears the scene from any ongoing animations or timeouts.
     */
    clearScene(){
        clearInterval(this.endbossInterval);
        clearTimeout(this.sceneTimeout); // Fügen Sie diese Zeile hinzu, um den aktuellen Timeout zu löschen
    }


    /**
     * Handles scene animations with a specified speed and then triggers the next function.
     * @param {string[]} array - The animation frames.
     * @param {Function} nextFunction - The next function to execute after the animation.
     * @param {number} speed - The speed of the animation.
     */
    sceneInterval(array, nextFunction, speed) {
        this.clearScene()
        this.endbossInterval = setInterval(() => {
            this.playAnimation(array);
            this.x += speed;
        }, 200);
        this.sceneTimeout = setTimeout(() => { 
            if (!this.isHurt) { 
                nextFunction();
            }
        }, 1600);
        intervals.push(this.endbossInterval);
    }


    /**
     * Executes the attack animation.
     */
    attack(){
        this.isHurt = false;
        this.sceneInterval(this.IMAGES_WALKING, this.alert.bind(this), -15);
    }
    

    /**
     * Executes the alert animation.
     */
    alert(){
        this.isHurt = false;
        this.sceneInterval(this.IMAGES_ALERT, this.walking.bind(this), 0);
    }
    

    /**
     * Executes the walking animation.
     */
    walking(){
        this.isHurt = false;
        this.sceneInterval(this.IMAGES_WALKING, this.attack.bind(this), 15);
    }
    
    
    /**
     * Handles the logic when the Endboss gets hurt.
     */
    getHurt() {
        this.currentTime = Date.now();
        if (this.currentTime - this.lastHurtTime < this.hurtCooldown) {
            return; 
        }
        this.isHurt = true; 
        this.endbossHurtAnimations()
        this.lastHurtTime = this.currentTime;
        this.checkWin()
    }


    /**
     * Animates the hurt sequences of the Endboss and checks win conditions.
     */
    endbossHurtAnimations(){
        this.clearScene()
        this.audioManager.playAudio(this.hurt_sound);
        this.endbossHits += 1;
        this.statusBar.endbossHit();
        this.sceneInterval(this.IMAGES_HURT, this.attack.bind(this), 0);
        this.isHurt = false;
    }


    /**
     * Checks the win conditions.
     */
    checkWin(){
        if (this.endbossHits >= 3) {
            this.clearScene()
            this.dieAnimation(this.IMAGES_DEAD);
            this.audioManager.closingMusic('winn');
            endScreen('img/9_intro_outro_screens/game_over/win4.png');
            gameOn = false;
        }
    }
} 