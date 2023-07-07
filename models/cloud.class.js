class Cloud extends MovableObject {
    y = 0;
    height = 300;
    width = 600;

    constructor() {
        super().loadImage('../img/5_background/layers/4_clouds/1.png');
        this.x = (Math.random() * 500); // Zufällige Position  
        this.animate()
    }
s
    animate(){
        this.moveLeft()
    }





}