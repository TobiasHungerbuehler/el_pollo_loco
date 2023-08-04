class Coin extends DrawableObject {
    //x = 250;
    //y = 100;
    height = 130
    width = 130



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
        console.log('animation')
        this.animationInterval = setInterval(()=> {
            this.playAnimation(this.IMAGES_COIN);
        }, 500 )
    }

    picked(){
        this.speedY = 10;
        setInterval(() => {
            this.height -= 20
            this.width  -= 20
            this.y -= 5;
        }, 25)
    }








}