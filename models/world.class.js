class World {
    canvas;
    ctx; // standard klasse mit methoden und eigenschaften
    character = new Character(); //pepe
    camera_x = 0;
    level = level1;
    keyboard;

    constructor(canvas, keyboard){
        this.ctx = canvas.getContext('2d'); // canvas ind ctx gespeichert standard
        this.canvas = canvas; // hilfsvariable um canvas masse zu übergeben
        this.keyboard = keyboard;
        this.draw();
        this.setWorldId();
    }

    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)//clear canvas

        this.ctx.translate(this.camera_x, 0); // der context ctx verschiebt sich 100 nach links

        //elemente werden gezeichnet
        this.addObjectToMap(this.level.backgrounds)// Backgrounds
        this.addToMap(this.character)// draw pepe
        this.addObjectToMap(this.level.enemies)// draw chicken
        this.addObjectToMap(this.level.clouds)// Clouds    

        this.ctx.translate(-this.camera_x, 0); // der context ctx verschiebt sich wieder nach rechts  

        // draw loop // standard Methode
        let self = this;
        requestAnimationFrame(function(){
            self.draw();
        });
    }
1

    addObjectToMap(objects){
        objects.forEach(ob => {
            this.addToMap(ob);
        });
    }


    addToMap(ob){ 
        //bild drehen wenn otherDirection = true
        if(ob.otherDirection){
            this.ctx.save(); // Speicher die eigenschaften ctx
            this.ctx.translate(ob.width, 0); // spiegelverkehrt einfügen
            this.ctx.scale(-1, 1); // um die breite des elemnts verschieben
            ob.x = ob.x * -1;
        }
        
        this.ctx.drawImage(ob.img, ob.x, ob.y, ob.width, ob.height);

        //bild wieder zurück drehen
        if(ob.otherDirection){
            this.ctx.restore();
            ob.x = ob.x * -1;
        }
        
    }

    setWorldId() {
        this.character.world = this;// übergibt die komplette instanz von World um im character zuzugreifen
        // zugriff = world.character.world
    }
}

//  world.draw();