class Cloud extends MovableObject {
    //img\5_background\layers\4_clouds\1.png


    constructor() {
        super().loadImage('../img/5_background/layers/4_clouds/1.png');
        this.x = 0;//(Math.random() * 500); // Zufällige Position  
        this.y = 0;
        this.height = 300;
        this.width = 600;
        
    }



}