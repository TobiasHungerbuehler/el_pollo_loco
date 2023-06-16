class MovableObject {
    x = 120;
    y = 280;
    img;
    height = 150;
    width = 100;

    loadImage(path) {
        this.img = new Image();  // Erstelle ein neues Image-Objekt. Image Standard Tag
        this.img.src = path;  // Setze den Pfad als src-Eigenschaft des Image-Objekts
    }

    moveRight() {

    }
}