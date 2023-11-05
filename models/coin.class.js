class Coin extends DrawableObject {
    //x = 250;
    //y = 100;
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

    constructor(x,y) {
        super();
        this.x = x;
        this.y = y;
        this.loadImages(this.IMAGES_COIN)
        this.animate();
    }

    animate(){
        this.animationInterval = setInterval(()=> {
            this.playAnimation(this.IMAGES_COIN);
        }, 500 )
        intervals.push(this.animationInterval);
    }

}