class StatusBar extends DrawableObject {

    IMAGES_HEALTH = [
        'img/7_statusbars/1_statusbar/2_statusbar_health/blue/0.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/blue/20.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/blue/40.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/blue/60.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/blue/80.png', //4
        'img/7_statusbars/1_statusbar/2_statusbar_health/blue/100.png' //5
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


    setHealthPercentage(percentage) {
        this.percentageHealth = percentage;
        let path = this.IMAGES_HEALTH[this.resolveImageIndex(this.percentageHealth)];
        this.imgHealth = this.imageCache[path];
    }

    setCoinsPercentage(index) {
        let path = this.IMAGES_COIN[index];
        this.imgCoins = this.imageCache[path];
    }
    
    
    setBottlesPercentage(index) {
        let path = this.IMAGES_BOTTLE[index];
        this.imgBottles = this.imageCache[path];
    }

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
    
    
    setEndbossPercentage(percentage) {
        this.endbossPercentage = percentage;
        let path = this.IMAGES_ENDBOSS[this.resolveImageIndex2(this.endbossPercentage)];
        this.imgEndboss = this.imageCache[path];
    }
    
    

    resolveImageIndex2(percentage) {
        if (percentage >= 100) {
            return 0; // Grün
        } else if (percentage >= 90) {
            return 1; // Blau
        } else {
            return 2; // Orange
        }
    }

    
    drawBars(ctx) {
        // Zeichne den Health-Balken
        ctx.drawImage(this.imgHealth, this.x, this.y, this.width, this.height);
        // Zeichne den Coins-Balken unter dem Health-Balken
        ctx.drawImage(this.imgCoins, this.x, this.y + this.height, this.width, this.height);
        // Zeichne den Bottles-Balken unter dem Coins-Balken
        ctx.drawImage(this.imgBottles, this.x, this.y + 2 * this.height, this.width, this.height);
        // Zeichne den Endboss-Balken oben rechts
        ctx.drawImage(this.imgEndboss, ctx.canvas.width - this.width - 15, this.y, this.width, this.height);
    }

    
    endbossHit() {
        if (this.endbossPercentage > 0) {
            this.setEndbossPercentage(this.endbossPercentage - 10);
        }
    }
    
    
    
    

}