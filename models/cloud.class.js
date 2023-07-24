class Cloud extends MovableObject {
    y = 0;
    height = 300;
    width = 1200;
    x = 0;
    imageCount = 3; // Anzahl der Bilder, die gezeichnet werden sollen

    constructor() {
        super();
        this.loadImage('../img/5_background/layers/4_clouds/full.png');
        this.startAnimation();
    }

    startAnimation() {
        setInterval(() => {
            this.animate();
        }, 1000 / 60); // Aufruf der animate Methode 60 mal pro Sekunde
    }

    animate() {
        this.x -= this.speed;
        // Wenn die Wolke vollständig aus dem Bild gelaufen ist, setze sie wieder an den rechten Rand
        if (this.x < -this.width) {
            this.x = 0;
        }
    }

    draw(ctx) {
        for (let i = 0; i < this.imageCount; i++) {
            ctx.drawImage(this.img, this.x + i * this.width, this.y, this.width, this.height);
        }
    }
}
 