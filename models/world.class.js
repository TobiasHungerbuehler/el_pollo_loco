/**
 * Represents the game world that contains game elements.
 */
class World {
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
    bottlescore = 0;
    pickedBottleIndices = [];
    pickedCoinIndices = [];
    bottlePick_sound = new Audio('audio/bottlePick.mp3');
    coinPick_sound = new Audio('audio/coinPick.mp3');
    characterPosition_old = 0;
    characterJumpDown = false;


    /**
     * Creates an instance of the World class.
     * @param {HTMLCanvasElement} canvas - The HTML canvas element.
     * @param {Keyboard} keyboard - The keyboard input handler.
     */
    constructor(canvas, keyboard){
        this.ctx = canvas.getContext('2d'); 
        this.canvas = canvas; 
        this.keyboard = keyboard;
        this.level = createLevel1(this.statusBar, this.character, this.audioManager);
        this.pickableObjects = this.level.pickableObjects;
        this.draw();
        this.setWorldId();
        this.run();
    }


    /**
     * Runs the game loop to handle game logic.
     */
    run(){
        let worldRun = setInterval(() => {
            this.checkCharacterPosition_Y();
            this.checkCollision();
            this.checkThrowableObjects();
            this.hitCheck();
            this.checkPickableObject();
        }, 200);
        intervals.push(worldRun); // Fügt die Intervall-ID zum intervals Array hinzu
    }


    /**
     * Checks if the character is in a falling state.
     */
    checkCharacterPosition_Y() {
        if(this.character.y > this.characterPosition_old){
            this.characterJumpDown = true;
        }else {
            this.characterJumpDown = false;
        }
        this.characterPosition_old =  this.character.y;
    }

    
    /**
     * Checks if the character picks up an object.
     */
    checkPickableObject(){
        this.level.pickableObjects.forEach((object, index) => {
            if(this.character.isColliding(object)) {
                if (object instanceof Coin && this.character.y <= 0) {
                    if (!this.pickedCoinIndices.includes(index)){
                        this.coinPicked(object, index);  
                        this.audioManager.playAudio(this.coinPick_sound);
                    }
                }
                if (object instanceof Bottle && this.character.y >= 145 && this.bottlescore <= 4) {
                    if (!this.pickedBottleIndices.includes(index)){
                        this.bottlePicked(object, index);
                        this.audioManager.playAudio(this.bottlePick_sound);
                    }
                }
            }
        })
    }
    

    /**
     * Handles the logic when a coin is picked up.
     * @param {Coin} object - The picked coin object.
     * @param {number} index - The index of the picked coin.
     */
    coinPicked(object, index){
        this.pickedCoinIndices.push(index);
        object.picked(object);
        this.coinscore += 1;
        if(this.coinscore >= 5){
            this.coinscore = 5
        }
        this.statusBar.setCoinsPercentage(this.coinscore)
    }

    
    /**
     * Handles the logic when a bottle is picked up.
     * @param {Bottle} object - The picked bottle object.
     * @param {number} index - The index of the picked bottle.
     */
    bottlePicked(object, index) {
        this.pickedBottleIndices.push(index);
        object.picked(object);
        this.bottlescore += 1;
        let imgIndex = this.bottlescore;
        this.statusBar.setBottlesPercentage(imgIndex)
    }
    

    /**
     * Checks for throwable objects and adds them to the game world.
     */
    checkThrowableObjects(){
        if(this.keyboard.D && this.bottlescore > 0){
            let bottle = new ThrowableObject(this.character.x + 50, this.character.y + 100, this.character, this, this.statusBar, this.audioManager, this.ctx);
            this.throwableObjects.push(bottle);
        }
    }


    /**
     * Checks for collisions between the character and game elements.
     */
    checkCollision(){
        this.level.enemies.forEach((enemy) => {
            if(this.character.isColliding(enemy) && !enemy.isDead && gameOn){
                if(this.characterJumpDown && (enemy instanceof Chicken || enemy instanceof ChickenSmall)) { // when jumping on head
                    enemy.die();
                } else {
                    this.character.hit();
                    this.statusBar.setHealthPercentage(this.character.energy)
                }
            }
        })
    }
    

    /**
     * Checks for collisions between throwable objects and enemies.
     */
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


    /**
     * Draws game elements on the canvas.
     */
    draw() {
        if (gameOn || !gameOn) { // Überprüfen Sie, ob das Spiel läuft
            this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)//clear canvas
            this.ctx.translate(this.camera_x, 0); // der context ctx verschiebt sich 100 nach links
            this.allImagesToMapp();
            this.cameraMoving(); 
            this.drawLoop();
        } 
    }
    

    /**
     * Transforms all game images on the canvas.
     */
    allImagesToMapp(){
        this.addObjectToMap(this.level.backgrounds);
        this.addObjectToMap(this.level.enemies);
        this.addObjectToMap(this.level.clouds);  
        this.addToMap(this.character);
        this.addObjectToMap(this.throwableObjects);
        this.addObjectToMap(this.pickableObjects);
    }


    /**
     * Handles camera movement.
     */
    cameraMoving(){
        this.ctx.translate(-this.camera_x, 0); 
        this.statusBar.drawBars(this.ctx);
        this.ctx.translate(this.camera_x, 0);
        this.ctx.translate(-this.camera_x, 0);  
    }


    /**
     * Starts the game loop for drawing game elements.
     */
    drawLoop(){
        let self = this;
        requestAnimationFrame(function(){
            self.draw();
        });
    }


    /**
     * Adds an array of objects to the game map.
     * This method iterates through each object in the provided array and adds it
     * to the map using the addToMap method.
     *
     * @param {object[]} objects - An array of objects to be added to the map.
     */
    addObjectToMap(objects){
        objects.forEach(ob => {
            this.addToMap(ob);
        });
    }


    /**
     * Adds an array of objects to the game map.
     * @param {object[]} objects - The array of game objects to add.
     */
    addToMap(ob){ 
        if(ob.otherDirection){ 
            this.flipImage(ob);
        }
        ob.draw(this.ctx);
        if(ob.otherDirection){
            this.flipImageBack(ob);
        }
    }


    /**
     * Flips an image horizontally for rendering.
     * @param {object} ob - The game object with the image to flip.
     */
    flipImage(ob){
        this.ctx.save(); // Speicher die eigenschaften ctx
        this.ctx.translate(ob.width, 0); // spiegelverkehrt einfügen
        this.ctx.scale(-1, 1); // um die breite des elemnts verschieben
        ob.x = ob.x * -1;
    }


    /**
     * Restores the flipped image to its original state.
     * @param {object} ob - The game object with the flipped image.
     */
    flipImageBack(ob){
        ob.x = ob.x * -1;
        this.ctx.restore();
    }


    /**
     * Sets the reference to the world in the character instance.
     */
    setWorldId() {
        this.character.world = this;// übergibt die komplette instanz von World um im character zuzugreifen

    }
}

