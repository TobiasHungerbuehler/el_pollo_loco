 class Endboss extends MovableObject{
    height = 400;
    width = 230;
    y = 50;
    startX
    endbossHits = 0;
    endbossScene;
    isBeingHurt = false;
    isDead = false;


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

    constructor(statusBar){
        super().loadImage(this.IMAGES_ALERT[0]);
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

    animate(){
        this.endbossMove();
        this.setEndbossImages();
    }
    

    /**
     * Handle the endboss move.
     */
    endbossMove() {
        if (this.isDead) {
            return;
        }
        this.direction = -1;  // -1 for left, 1 for right
        this.endbossMoveInterval = setInterval(() => {
            if (this.direction === 1) {
                this.moveRight();
            } else {
                this.moveLeft();
            }
        }, 1000 /60);
    }

    /**
     * Move the boss to the right.
     */
    moveRight() {
        if (this.x < this.startX + 80) {
            this.endbossScene = this.IMAGES_ATTACK;
            this.x += 2;
        } else { // When we reach the right end, we change the direction
            this.direction = -1;
        }
    }

    /**
     * Move the boss to the left.
     */
    moveLeft() {
        if (this.x > this.startX - 80) {
            this.endbossScene = this.IMAGES_WALKING;
            this.x -= 5;
        } else { // When we reach the left end, we change the direction
            this.direction = 1;
        }
    }



    // setEndbossImages() {
    //     let lastScene; // speichert die letzte Szene
    //     setInterval(() => {
    //         if (lastScene !== this.endbossScene) { // wenn sich die Szene geändert hat
    //             lastScene = this.endbossScene; // aktualisiere die letzte Szene
    //             if (this.endbossScene === this.IMAGES_ALERT) {
    //                 this.endbossImages(this.IMAGES_ALERT);
    //             } else if (this.endbossScene === this.IMAGES_WALKING) {
    //                 this.endbossImages(this.IMAGES_WALKING);
    //             } else if (this.endbossScene === this.IMAGES_ATTACK) {
    //                 this.endbossImages(this.IMAGES_ATTACK);
    //             } else if (this.endbossScene === this.IMAGES_HURT) {
    //                 this.endbossImages(this.IMAGES_HURT);
    //             } else if (this.endbossScene === this.IMAGES_DEAD) {
    //                 this.endbossImages(this.IMAGES_DEAD);
    //             }
    //         }
    //     }, 500);
    // }

    endbossImages(images){
        clearInterval(this.endbossImagesInterval); // Stopp das vorherige endbossImages Intervall
        this.endbossImagesInterval = setInterval(() => {
            this.playAnimation(images)
        },200)
    }
    
    setEndbossImages() {
        setInterval(() => {
                if (this.endbossScene === this.IMAGES_ALERT) {
                    this.playAnimation(this.IMAGES_ALERT);
                } else if (this.endbossScene === this.IMAGES_WALKING) {
                    this.playAnimation(this.IMAGES_WALKING);
                } else if (this.endbossScene === this.IMAGES_ATTACK) {
                    this.playAnimation(this.IMAGES_ATTACK);
                } else if (this.endbossScene === this.IMAGES_HURT) {
                    this.playAnimation(this.IMAGES_HURT);
                } else if (this.endbossScene === this.IMAGES_DEAD) {
                    this.playAnimation(this.IMAGES_DEAD);
                }
        }, 500);
    }
    
    

    


    getHurt() {
        if (!this.isBeingHurt) {
            this.isBeingHurt = true;
            clearInterval(this.endbossMoveInterval);
            this.endbossImages(this.IMAGES_HURT);
            setTimeout(() => {
                clearInterval(this.endbossImagesInterval); // Stopp das "Hurt"-Intervall
                if (!this.isDead) {
                    this.endbossMove();
                }
                this.isBeingHurt = false; // Reset the state
            }, 800);
            this.endbossHits += 1;
            this.statusBar.endbossHit();
            if(this.endbossHits >= 3){
                this.endbossDead();
            }
        }
    }
    
     
    endbossDead() {
        this.isDead = true;
        this.endbossScene = this.IMAGES_DEAD;
    }
    


 } 