class MovableObject {
    x = 120;
    y = 280;
    img;
    height = 150;
    width = 100;
    imageCache = {}; //image json Array 
    currentImage = 0;
    speed = 0.15;

    loadImage(path) {
        this.img = new Image();  // Erstelle ein neues Image-Objekt. Image Standard Tag
        this.img.src = path;  // Setze den Pfad als src-Eigenschaft des Image-Objekts
    }

    loadImages(array) { // befüllt das imageCache json mit den img's
        array.forEach((path) => {
            let img = new Image(); // neues Image.Objekt
            img.src = path; //pfad zu image
            this.imageCache[path] = img; //image wird mit path als key in "imageCache gespeichert" 
            //console.log(this.imageCache)
        })
    }

    moveLeft(){
        setInterval(() => {
            this.x -= this.speed;
        }, 1000 / 60) 
    }
}