/**
 * Represents a drawable object that can be displayed on the canvas.
 */
class DrawableObject {
    img;
    imageCache = {}; //image json Array 
    currentImage = 0;
    x = 120;
    y = 280;
    height = 150;
    width = 100;
    offset = {
        top: 8,
        left: 8,
        right: 8,
        bottom: 8
    }


    /**
     * Loads an image from the specified path and sets it as the drawable object's image.
     * @param {string} path - The path to the image.
     */
    loadImage(path) {
        this.img = new Image();  // Erstelle ein neues Image-Objekt. Image Standard Tag
        this.img.src = path;  // Setze den Pfad als src-Eigenschaft des Image-Objekts
    }



    /**
     * Loads images from an array of paths and stores them in the image cache.
     * @param {string[]} array - An array of image paths to load and cache.
     */
    loadImages(array) { 
        array.forEach((path) => {
            let img = new Image(); 
            img.src = path; 
            this.imageCache[path] = img; 
        })
    }


    /**
     * Draws the drawable object on the canvas context.
     * @param {CanvasRenderingContext2D} ctx - The canvas rendering context.
     */
    draw(ctx) {
        if (this.img) { 
            try {
                ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
            } catch (error) {
                console.log("Fehler beim Zeichnen des Bildes:", error);
                console.log(this.img.src);
            }
        } 
    }
    

    /**
     * Plays an animation by cycling through a series of images.
     * @param {string[]} images - An array of image paths for the animation frames.
     */
    playAnimation(images){
        let i = this.currentImage % images.length;
        let path = images[i];
        this.img = this.imageCache[path];
        this.currentImage++; 
    }


    /**
     * Initiates a "picked" animation for the object.
     * Reduces the object's size and moves it upwards.
     * @param {object} object - The object that was picked.
     */
    picked(object){
        this.speedY = 10;
        this.pickInterval = setInterval(() => {
            this.height -= 5;
            this.width  -= 5;
            this.y -= 15;
            this.x -= 10;
        }, 25)
        intervals.push(this.pickInterval);
    }


    /**
     * Draws a frame around the object for debugging and collision detection.
     * @param {CanvasRenderingContext2D} ctx - The canvas rendering context.
     */
    drawFrame(ctx){ 
        if(this instanceof Character || this instanceof Chicken || this instanceof Endboss || this instanceof ChickenSmall || this instanceof Coin || this instanceof Bottle || this instanceof ThrowableObject){
            ctx.beginPath();
            ctx.lineWidth = '2';
            ctx.strokeStyle = "red";
            ctx.rect(this.x, this.y, this.width, this.height);
            ctx.stroke();
        }
    }
}

