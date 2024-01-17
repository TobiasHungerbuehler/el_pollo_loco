/**
 * Represents a cloud object that moves across the screen as part of the background.
 */
class Cloud extends MovableObject {
    y = 0;
    height = 300;
    width = 1200;
    x = 0;
    imageCount = 3; 


    /**
     * Creates a new cloud object and starts its animation.
     */
    constructor() {
        super();
        this.loadImage('img/5_background/layers/4_clouds/full.png');
        this.startAnimation();
    }


    /**
     * Initiates the cloud's animation by moving it across the screen.
     */ 
    startAnimation() {
        this.animationInterval = setInterval(() => {
            this.animate();
        }, 1000 / 60); // Aufruf der animate Methode 60 mal pro Sekunde
        intervals.push(this.animationInterval);
    }


    /**
     * Animates the cloud by moving it to the left and resetting its position when it goes off the screen.
     */
    animate() {
        this.x -= this.speed;
        // Wenn die Wolke vollständig aus dem Bild gelaufen ist, setze sie wieder an den rechten Rand
        if (this.x < -this.width) {
            this.x = 0;
        }
    }


    /**
     * Draws the cloud on the canvas, repeating the image to cover the specified number of times.
     * @param {CanvasRenderingContext2D} ctx - The 2D rendering context of the canvas.
     */
    draw(ctx) {
        for (let i = 0; i < this.imageCount; i++) {
            ctx.drawImage(this.img, this.x + i * this.width, this.y, this.width, this.height);
        }
    }
}
 