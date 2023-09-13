class World {
    //gameOn = true;
    canvas;
    ctx; 
    audioManager = new AudioManager(this);
    character = new Character(this.audioManager); 
    statusBar = new StatusBar();
    level;
    camera_x = 0;
    keyboard;
    throwableObjects = [];
    coinscore = 0;
    bottlescore = 20;
    pickedBottleIndices = [];
    pickedCoinIndices = [];
    bottlePick_sound = new Audio('audio/bottlePick.mp3');
    coinPick_sound = new Audio('audio/coinPick.mp3');


    constructor(canvas, keyboard){
        this.ctx = canvas.getContext('2d'); // canvas ind ctx gespeichert standard
        this.canvas = canvas; // hilfsvariable um canvas masse zu übergeben
        this.keyboard = keyboard;
        this.level = createLevel1(this.statusBar, this.character, this.audioManager);
        this.pickableObjects = this.level.pickableObjects;
        this.draw();
        this.setWorldId();
        this.run();
    }


    run(){
        let worldRun = setInterval(() => {
            this.checkCollision();
            this.checkThrowableObjects();
            this.hitCheck();
            this.checkPickableObject();
        }, 200);
    
        intervals.push(worldRun); // Fügt die Intervall-ID zum intervals Array hinzu
    }

    // weiterspielen test //////////////////////////////////////////////////////////////////////////////////
    // resumeIntervals() {
    //     this.run();
    //     this.draw();
    //     this.character.animate();
    //     console.log('resume')
    // }


    checkPickableObject(){
        this.level.pickableObjects.forEach((object, index) => {
            if(this.character.isColliding(object)) {
                if (object instanceof Coin && this.character.y <= 0) {
                    if (!this.pickedCoinIndices.includes(index)){
                        this.coinPicked(object, index);  
                        this.audioManager.playAudio(this.coinPick_sound);
                    }
                }
                if (object instanceof Bottle) {
                    if (!this.pickedBottleIndices.includes(index)){
                        this.bottlePicked(object, index);
                        this.audioManager.playAudio(this.bottlePick_sound);
                    }
                }
            }
        })
    }
    

    coinPicked(object, index){
        this.pickedCoinIndices.push(index);
        object.picked(object);
        this.coinscore += 1;
        if(this.coinscore >= 5){
            this.coinscore = 5
        }
        this.statusBar.setCoinsPercentage(this.coinscore)
    }
    
     
    bottlePicked(object, index) {
        this.pickedBottleIndices.push(index);
        object.picked(object);
        this.bottlescore += 1;
        let imgIndex = this.bottlescore;
        if(imgIndex >= 5){
            imgIndex = 5;
        }
        this.statusBar.setBottlesPercentage(imgIndex)
    }
    

    checkThrowableObjects(){
        if(this.keyboard.D && this.bottlescore > 0){
            let bottle = new ThrowableObject(this.character.x + 50, this.character.y + 100, this.character, this, this.statusBar, this.audioManager);
            this.throwableObjects.push(bottle);
        }
    }

    // character collisions
    checkCollision(){
        this.level.enemies.forEach((enemy) => {
            if(this.character.isColliding(enemy) && !enemy.isDead && gameOn){
                if(this.character.y >= 65 && this.character.y < 150) { // when jumping on head
                    enemy.die();
                } else {
                    this.character.hit();
                    this.statusBar.setHealthPercentage(this.character.energy)
                }
            }
        })
    }
    

    hitCheck(){
        this.level.enemies.forEach((enemy) => {
            this.throwableObjects.forEach((bottle) => {
                if (bottle.isColliding(enemy)) {
                    if (enemy instanceof Chicken) {
                        enemy.die();
                    }
                    if (enemy instanceof Endboss) {
                        enemy.getHurt();
                    }
                    bottle.bottleSplash();
                }
            } );
        });
    }

    
    
    draw() {

        if (gameOn || !gameOn) { // Überprüfen Sie, ob das Spiel läuft
            
            this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)//clear canvas
    
            this.ctx.translate(this.camera_x, 0); // der context ctx verschiebt sich 100 nach links
    
            //elemente werden gezeichnet
            this.addObjectToMap(this.level.backgrounds);// Backgrounds
            this.addObjectToMap(this.level.enemies);// draw chicken
            this.addObjectToMap(this.level.clouds);// Clouds    
            this.addToMap(this.character);// draw pepe
            this.addObjectToMap(this.throwableObjects);// draw bottles
            this.addObjectToMap(this.pickableObjects);// draw bottles
    
        
            this.ctx.translate(-this.camera_x, 0); 
            // ------ Space for fixed Object ------   
            this.statusBar.drawBars(this.ctx);
    
            this.ctx.translate(this.camera_x, 0);
            
            this.ctx.translate(-this.camera_x, 0); // der context ctx verschiebt sich wieder nach rechts  
    
            // draw loop // standard Methode
            let self = this;
            requestAnimationFrame(function(){
                self.draw();
            });
            
        } 

        

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
        //ob.drawFrame(this.ctx); // Frame um die bildobjekte

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

