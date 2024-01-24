/**
 * Represents a bottle object in the game.
 * @extends DrawableObject
 */
class Bottle extends DrawableObject {
    y = 365;
    x = 300;
    offset = {
        top: 8,
        left: 25,
        right: 15,
        bottom: 8
    }


    IMAGES_BOTTLE  = [
        'img/6_salsa_bottle/1_salsa_bottle_on_ground.png',
        'img/6_salsa_bottle/2_salsa_bottle_on_ground.png'
    ];


    /**
     * Creates a new Bottle instance at the specified x-coordinate.
     * @param {number} x - The initial x-coordinate of the bottle.
     */
    constructor(x){
        super();
        let randomIndex = Math.floor(Math.random() * this.IMAGES_BOTTLE.length);
        this.loadImage(this.IMAGES_BOTTLE[randomIndex])
        this.x = x;
        this.height = 60;
        this.width = 70;
    }
}