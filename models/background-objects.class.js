/**
 * Represents a background object in the game.
 * @extends MovableObject
 */
class BackgroundObject extends MovableObject {
    width = 720;
    height = 480;


    /**
     * Creates a new BackgroundObject instance with the specified image path and x-coordinate.
     * @param {string} imgPath - The path to the image of the background object.
     * @param {number} x - The initial x-coordinate of the background object.
     */
    constructor(imgPath, x) {
        super().loadImage(imgPath);
        this.x = x;     
        this.y = 480 - this.height;
    }  
}