/**
 * Represents the status bar at the top of the game screen.
 * The status bar displays the player's health, coins, bottles, and endboss status.
 * It also provides methods for updating and drawing the status bar.
 */
class StatusBar extends DrawableObject {

    IMAGES_HEALTH = [
        'img/7_statusbars/1_statusbar/2_statusbar_health/blue/0.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/blue/20.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/blue/40.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/blue/60.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/blue/80.png', 
        'img/7_statusbars/1_statusbar/2_statusbar_health/blue/100.png' 
    ];

    
    IMAGES_COIN = [
        'img/7_statusbars/1_statusbar/1_statusbar_coin/orange/0.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/orange/20.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/orange/40.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/orange/60.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/orange/80.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/orange/100.png'
    ];
    

    IMAGES_BOTTLE = [
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/green/0.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/green/20.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/green/40.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/green/60.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/green/80.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/green/100.png'
    ];


    IMAGES_ENDBOSS = [
        'img/7_statusbars/2_statusbar_endboss/green.png',
        'img/7_statusbars/2_statusbar_endboss/blue.png',
        'img/7_statusbars/2_statusbar_endboss/orange.png'
    ];


    /**
     * Constructs a new StatusBar object.
     * Initializes the status bar's properties, loads its images, and sets default values.
     */
    constructor() {
        super();
        this.loadImages(this.IMAGES_HEALTH);
        this.loadImages(this.IMAGES_COIN);
        this.loadImages(this.IMAGES_BOTTLE);
        this.loadImages(this.IMAGES_ENDBOSS);
        this.x = 15;
        this.y = 0;
        this.width = 180 ;
        this.height = 50; // Ändere die Höhe zurück zu 70
        this.setHealthPercentage(100);
        this.setCoinsPercentage(0);
        this.setBottlesPercentage(0);
        this.setEndbossPercentage(100); // Setze den Anfa
    }


    /**
     * Sets the health percentage and updates the health bar image accordingly.
     * @param {number} percentage - The health percentage to set.
     */
    setHealthPercentage(percentage) {
        this.percentageHealth = percentage;
        let path = this.IMAGES_HEALTH[this.resolveImageIndex(this.percentageHealth)];
        this.imgHealth = this.imageCache[path];
    }


    /**
     * Sets the coins percentage and updates the coins bar image accordingly.
     * @param {number} index - The index of the coins image to set.
     */
    setCoinsPercentage(index) {
        let path = this.IMAGES_COIN[index];
        this.imgCoins = this.imageCache[path];
    }
    
    
    /**
     * Sets the bottles percentage and updates the bottles bar image accordingly.
     * @param {number} index - The index of the bottles image to set.
     */
    setBottlesPercentage(index) {
        let path = this.IMAGES_BOTTLE[index];
        this.imgBottles = this.imageCache[path];
    }


    /**
     * Resolves the index of the image based on the given percentage.
     * @param {number} percentage - The percentage value to resolve the index for.
     * @returns {number} - The resolved image index.
     */
    resolveImageIndex(percentage) {
        if (percentage == 100) {
            return 5;
        } else if (percentage >= 80) {
            return 4;
        } else if (percentage >= 60) {
            return 3;
        } else if (percentage >= 40) {
            return 2;
        } else if (percentage >= 20) {
            return 1;
        } else {
            return 0;
        }
    }
    
    
    /**
     * Sets the endboss percentage and updates the endboss bar image accordingly.
     * @param {number} percentage - The endboss percentage to set.
     */
    setEndbossPercentage(percentage) {
        this.endbossPercentage = percentage;
        let path = this.IMAGES_ENDBOSS[this.resolveImageIndex2(this.endbossPercentage)];
        this.imgEndboss = this.imageCache[path];
    }
    
    
    /**
     * Resolves the index of the endboss image based on the given percentage.
     * @param {number} percentage - The endboss percentage value to resolve the index for.
     * @returns {number} - The resolved endboss image index.
     */
    resolveImageIndex2(percentage) {
        if (percentage >= 100) {
            return 0; // Grün
        } else if (percentage >= 90) {
            return 1; // Blau
        } else {
            return 2; // Orange
        }
    }

    
    /**
     * Draws the health, coins, bottles, and endboss bars on the canvas.
     * @param {CanvasRenderingContext2D} ctx - The 2D rendering context of the canvas.
     */
    drawBars(ctx) {
        ctx.drawImage(this.imgHealth, this.x, this.y, this.width, this.height);
        ctx.drawImage(this.imgCoins, this.x, this.y + this.height, this.width, this.height);
        ctx.drawImage(this.imgBottles, this.x, this.y + 2 * this.height, this.width, this.height);
        ctx.drawImage(this.imgEndboss, ctx.canvas.width - this.width - 15, this.y, this.width, this.height);
    }

    
    /**
     * Updates the endboss bar when the endboss is hit.
     */
    endbossHit() {
        if (this.endbossPercentage > 0) {
            this.setEndbossPercentage(this.endbossPercentage - 10);
        }
    }
}