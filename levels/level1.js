/**
 * Creates enemies for the first level.
 * @param {Character} character - The main character of the game.
 * @param {AudioManager} audioManager - The audio manager instance.
 * @returns {Array} - An array of enemy objects.
 */
function createEnemies(statusBar, character, audioManager) {
    return [
        new Chicken(audioManager),
        new Chicken(audioManager),
        new Chicken(audioManager),
        new ChickenSmall(character, 800, audioManager),
        new ChickenSmall(character, 1300, audioManager),
        new ChickenSmall(character, 1800, audioManager),
        new ChickenSmall(character, 1850, audioManager),
        new ChickenSmall(character, 1900, audioManager),
        new Endboss(statusBar, audioManager)
    ];
}


/**
 * Creates cloud objects for the first level.
 * @returns {Array} - An array of cloud objects.
 */
function createClouds() {
    return [new Cloud()];
}


/**
 * Creates background objects for the first level.
 * @returns {Array} - An array of background objects.
 */
function createBackgroundObjects() {
    return  [
        new BackgroundObject('img/5_background/layers/air.png', -719),
        new BackgroundObject('img/5_background/layers/3_third_layer/2.png', -719),
        new BackgroundObject('img/5_background/layers/2_second_layer/2.png', -719),
        new BackgroundObject('img/5_background/layers/1_first_layer/2.png', -719),
        new BackgroundObject('img/5_background/layers/air.png', 0),
        new BackgroundObject('img/5_background/layers/3_third_layer/1.png', 0),
        new BackgroundObject('img/5_background/layers/2_second_layer/1.png', 0),
        new BackgroundObject('img/5_background/layers/1_first_layer/1.png', 0),
        new BackgroundObject('img/5_background/layers/air.png', 719),
        new BackgroundObject('img/5_background/layers/3_third_layer/2.png', 719),
        new BackgroundObject('img/5_background/layers/2_second_layer/2.png', 719),
        new BackgroundObject('img/5_background/layers/1_first_layer/2.png', 719),
        new BackgroundObject('img/5_background/layers/air.png', 719*2),
        new BackgroundObject('img/5_background/layers/3_third_layer/1.png', 719*2),
        new BackgroundObject('img/5_background/layers/2_second_layer/1.png', 719*2),
        new BackgroundObject('img/5_background/layers/1_first_layer/1.png', 719*2),
        new BackgroundObject('img/5_background/layers/air.png', 719*3),
        new BackgroundObject('img/5_background/layers/3_third_layer/2.png', 719*3),
        new BackgroundObject('img/5_background/layers/2_second_layer/2.png', 719*3),
        new BackgroundObject('img/5_background/layers/1_first_layer/2.png', 719*3)
    ]
}


/**
 * Creates pickable objects (coins and bottles) for the first level.
 * @returns {Array} - An array of pickable objects.
 */
function createPickableObjects() {
    return [
        new Coin(450,100),
        new Coin(520, 70),
        new Coin(590,100),
        new Coin(1450,100),
        new Coin(1520, 70),
        new Coin(1590,100),
        new Bottle(300),
        new Bottle(520),
        new Bottle(780),
        new Bottle(900),
        new Bottle(1200),
        new Bottle(1800),
        new Bottle(1920),
        new Bottle(2030)
    ];
}


/**
 * Creates and returns an instance of the first level in the game.
 * @param {StatusBar} statusBar - An instance of the StatusBar class.
 * @param {Character} character - The main character of the game.
 * @param {AudioManager} audioManager - The audio manager instance.
 * @returns {Level} - An instance of the Level class.
 */
function createLevel1(statusBar, character, audioManager){
    return new Level(
        createEnemies(statusBar, character, audioManager),
        createClouds(),
        createBackgroundObjects(),
        statusBar,
        createPickableObjects()
    );
}