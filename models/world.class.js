class World {
    
    canvas;
    ctx; // canvas variable um auf canvas zu zeichnen

    character = new Character(); //pepe

    enemies = [
        new Chicken(),
        new Chicken(),
        new Chicken()
    ];

    clouds = [
        new Cloud()
    ];

    backgrounds = [
        new BackgroundObject('../img/5_background/layers/air.png', 0),
        new BackgroundObject('../img/5_background/layers/3_third_layer/1.png', 0),
        new BackgroundObject('../img/5_background/layers/3_third_layer/1.png', 0),
        new BackgroundObject('../img/5_background/layers/2_second_layer/1.png', 0),
        new BackgroundObject('../img/5_background/layers/1_first_layer/1.png', 0)
    ];


    constructor(canvas){
        this.ctx = canvas.getContext('2d'); // canvas ind ctx gespeichert standard
        this.canvas = canvas; // hilfsvariable um canvas masse zu übergeben
    }

    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)//clear canvas
        this.addObjectToMap(this.backgrounds)// Backgrounds
        this.addToMap(this.character)// draw pepe
        this.addObjectToMap(this.enemies)// draw chicken
        this.addObjectToMap(this.clouds)// Clouds         

        
        // draw loop // standard Methode
        let self = this;
        requestAnimationFrame(function(){
            self.draw();
        });
    }


    addObjectToMap(objects){
        objects.forEach(ob => {
            this.addToMap(ob);
        });
    }


    addToMap(ob){ 
        this.ctx.drawImage(ob.img, ob.x, ob.y, ob.width, ob.height);
    }
}

//  world.draw();