class Cloud extends MovableObject {
    //img\5_background\layers\4_clouds\1.png


    constructor() {
        super().loadImage('../img/5_background/layers/4_clouds/1.png');
        this.x = (Math.random() * 500); // Zufällige Position  
        this.y = 0;
        this.height = 300;
        this.width = 600;
        this.animate()
    }

    animate(){
        setInterval(() => {
            this.x -= 0.15;
        }, 1000 / 60) 
    }



}