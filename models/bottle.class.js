class Bottle extends DrawableObject {
    y = 365;
    x = 300;

    IMAGES_BOTTLE  = [
        'img/6_salsa_bottle/1_salsa_bottle_on_ground.png',
        'img/6_salsa_bottle/2_salsa_bottle_on_ground.png'
    ];

    constructor(x){
        super();
        let randomIndex = Math.floor(Math.random() * this.IMAGES_BOTTLE.length);
        this.loadImage(this.IMAGES_BOTTLE[randomIndex])
        this.x = x;
        this.height = 60;
        this.width = 70;
    }






}