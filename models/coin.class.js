/**
 * Represents a coin object that can be collected in the game.
 */
class Coin extends DrawableObject {
    height = 130
    width = 130
    offset = {
        top: 40,
        left: 40,
        right: 40,
        bottom: 40
    }


    IMAGES_COIN  = [
        'img/8_coin/coin_1.png',
        'img/8_coin/coin_2.png'
    ];


    /**
     * Creates a new coin object at the specified coordinates.
     * @param {number} x - The X-coordinate of the coin's position.
     * @param {number} y - The Y-coordinate of the coin's position.
     */
    constructor(x,y) {
        super();
        this.x = x;
        this.y = y;
        this.loadImages(this.IMAGES_COIN)
        this.animate();
    }


    /**
     * Initiates a coin animation by continuously playing a sequence of images.
     */
    animate(){
        this.animationInterval = setInterval(()=> {
            this.playAnimation(this.IMAGES_COIN);
        }, 500 )
        intervals.push(this.animationInterval);
    }
}