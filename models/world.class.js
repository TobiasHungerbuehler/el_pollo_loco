class World {
    canvas;
    ctx; // standard klasse mit methoden und eigenschaften
    character = new Character(); //pepe
    camera_x = 0;
    level = level1;
    keyboard;
    statusBar = new StatusBar();
    throwableObjects = [];

    constructor(canvas, keyboard){
        this.ctx = canvas.getContext('2d'); // canvas ind ctx gespeichert standard
        this.canvas = canvas; // hilfsvariable um canvas masse zu übergeben
        this.keyboard = keyboard;
        this.draw();
        this.setWorldId();
        this.run();
    }


    run(){
        setInterval(() =>{
            this.checkCollision();
            this.checkThrowableObjects();
            this.hitCheck();
            this.jumpOnEnemy();
        }, 200)

    }

    checkThrowableObjects(){
        if(this.keyboard.D){
            let bottle = new ThrowableObject(this.character.x + 50, this.character.y + 100 );
            this.throwableObjects.push(bottle);
        }
    }

    checkCollision(){
        this.level.enemies.forEach((enemy) => {
            if(this.character.isColliding(enemy)) {
                this.character.hit();
                this.statusBar.setHealthPercentage(this.character.energy)
            };
        })
    }

    hitCheck(){
        this.level.enemies.forEach((enemy) => {
            this.throwableObjects.forEach((bottle) => {
 
                if (bottle.isColliding(enemy)) {
                    console.log('getroffen')
                    enemy.die();
                    // Hier können Sie Code hinzufügen, um zu handhaben, was passiert, 
                    // wenn eine Flasche einen Feind trifft.
                }
            } );
        });
    }

    jumpOnEnemy() {
        this.level.enemies.forEach((enemy) => {
            if (this.character.isColliding(enemy)) {
                // Prüfen, ob der Charakter von oben auf den Feind gesprungen ist
                // Diese Überprüfung könnte angepasst werden, je nachdem wie genau Sie festlegen,
                // wann ein Sprung auf einen Feind als solcher gilt.
                // Ändern Sie diese Bedingung, um die Sensitivität zu verringern
                if (this.character.y + (this.character.width / 2) <= enemy.y + (enemy.width / 2) &&
                    this.character.y + this.character.height <= 400)   {
                    console.log("gesprungen", this.character.y + this.character.height);
                    enemy.die();
                    // Fügen Sie hier den Code hinzu, der ausgeführt werden soll, wenn der Charakter auf den Feind springt
                } else {
                    this.character.hit();
                    this.statusBar.setHealthPercentage(this.character.energy);
                }
            }
        });
    }
    


    
    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)//clear canvas

        this.ctx.translate(this.camera_x, 0); // der context ctx verschiebt sich 100 nach links

        //elemente werden gezeichnet
        this.addObjectToMap(this.level.backgrounds);// Backgrounds
        this.addObjectToMap(this.level.enemies);// draw chicken
        this.addObjectToMap(this.level.clouds);// Clouds    
        this.addToMap(this.character);// draw pepe
        this.addObjectToMap(this.throwableObjects);// draw bottles
        
        
        this.ctx.translate(-this.camera_x, 0); 
        // ------ Space for fixed Object ------ 
        this.addToMap(this.statusBar)
        this.ctx.translate(this.camera_x, 0);
        
        this.ctx.translate(-this.camera_x, 0); // der context ctx verschiebt sich wieder nach rechts  

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
        //bild drehen wenn otherDirection = true
        if(ob.otherDirection){ 
            this.flipImage(ob);
        }
        
        ob.draw(this.ctx);
        ob.drawFrame(this.ctx); // Frame um die bildobjekte

        //bild wieder zurück drehen
        if(ob.otherDirection){
            this.flipImageBack(ob);
        }
        
    }

    flipImage(ob){
        this.ctx.save(); // Speicher die eigenschaften ctx
        this.ctx.translate(ob.width, 0); // spiegelverkehrt einfügen
        this.ctx.scale(-1, 1); // um die breite des elemnts verschieben
        ob.x = ob.x * -1;
    }

    flipImageBack(ob){
        ob.x = ob.x * -1;
        this.ctx.restore();
    }


    setWorldId() {
        this.character.world = this;// übergibt die komplette instanz von World um im character zuzugreifen
        // zugriff = world.character.world
    }
}

