class DrawableObject {
    img;
    imageCache = {}; //image json Array 
    currentImage = 0;
    x = 120;
    y = 280;
    height = 150;
    width = 100;

    loadImage(path) {
    this.img = new Image();  // Erstelle ein neues Image-Objekt. Image Standard Tag
    this.img.src = path;  // Setze den Pfad als src-Eigenschaft des Image-Objekts
    }

    loadImages(array) { // befüllt das imageCache json mit den img's
        array.forEach((path) => {
            let img = new Image(); // neues Image.Objekt
            img.src = path; //pfad zu image
            this.imageCache[path] = img; //image wird mit path als key in "imageCache gespeichert" 
        })
    }

    draw(ctx){
    ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
    }

    drawFrame(ctx){ // zeichnet einen frame um chicken und character
        if(this instanceof Character || this instanceof Chicken){
            ctx.beginPath();
            ctx.lineWidth = '2';
            ctx.strokeStyle = "red";
            ctx.rect(this.x, this.y, this.width, this.height);
            ctx.stroke();
        }
    }
}

