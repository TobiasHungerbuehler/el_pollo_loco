 class Endboss extends MovableObject{
    height = 400;
    width = 230;
    y = 50;
    startX
    endbossHits = 0;
    endbossScene;

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

    constructor(){
        super().loadImage(this.IMAGES_ALERT[0]);
        this.loadImages(this.IMAGES_ALERT);
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_ATTACK);
        this.loadImages(this.IMAGES_HURT);
        this.loadImages(this.IMAGES_DEAD);
        this.x = 2500;
        this.startX = this.x;
        this.animate();
    }

    animate(){
        this.endbossMove();
        this.setEndbossImages();
    }
    

    endbossMove() {
        if (this.isDead) {
            return;
        }
        this.direction = -1;  // -1 für links, 1 für rechts
        this.endbossMoveInterval = setInterval(() => {
            if (this.direction === 1) { // Wenn die Bewegung nach rechts ist
                if (this.x < this.startX + 120) {
                    this.endbossScene = this.IMAGES_ATTACK;
                    this.x += 40;
                } else { // Wenn wir das rechte Ende erreicht haben, wechseln wir die Richtung
                    this.direction = -1;
                }
            } else { // Wenn die Bewegung nach links ist
                if (this.x > this.startX - 120) {
                    this.endbossScene = this.IMAGES_WALKING;
                    this.x -= 20;
                } else { // Wenn wir das linke Ende erreicht haben, wechseln wir die Richtung
                    this.direction = 1;
                }
            }
        }, 200);
    }

    setEndbossImages() {
        let lastScene; // speichert die letzte Szene
    
        setInterval(() => {
            if (lastScene !== this.endbossScene) { // wenn sich die Szene geändert hat
                lastScene = this.endbossScene; // aktualisiere die letzte Szene
                if (this.endbossScene === this.IMAGES_ALERT) {
                    this.endbossImages(this.IMAGES_ALERT);
                } else if (this.endbossScene === this.IMAGES_WALKING) {
                    this.endbossImages(this.IMAGES_WALKING);
                } else if (this.endbossScene === this.IMAGES_ATTACK) {
                    this.endbossImages(this.IMAGES_ATTACK);
                } else if (this.endbossScene === this.IMAGES_HURT) {
                    this.endbossImages(this.IMAGES_HURT);
                } else if (this.endbossScene === this.IMAGES_DEAD) {
                    this.endbossImages(this.IMAGES_DEAD);
                }
            }
        }, 500);
    }
    
    
    endbossImages(images){
        clearInterval(this.endbossImagesInterval); // Stopp das vorherige endbossImages Intervall
        this.endbossImagesInterval = setInterval(() => {
            this.playAnimation(images)
        },200)
    }
    
    isBeingHurt = false;
    isDead = false;


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
            console.log(this.endbossHits)
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