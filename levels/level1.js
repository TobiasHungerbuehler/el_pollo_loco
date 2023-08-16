/**
 * Creates and returns an instance of the first level in the game.
 *
 * The function initializes the enemies, clouds, background objects, status bar, and pickable objects
 * (coins and bottles) that will appear in the first level of the game. It then returns an instance of the Level class,
 * which is populated with these elements.
 *
 * @function createLevel1
 * @param {StatusBar} statusBar - An instance of the StatusBar class that displays the player's current status.
 * @param {Character} character - An instance of the Character class representing the player's character.
 * @returns {Level} - An instance of the Level class representing the first level of the game.
 * 
 * @example
 * const level1 = createLevel1(statusBar, character);
 */

function createLevel1(statusBar, character){
    return new Level(
        [
            new Chicken(),
            new Chicken(),
            new Chicken(),
            new ChickenSmall(character, 800),
            new ChickenSmall(character, 1300),
            new ChickenSmall(character, 1800),
            new ChickenSmall(character, 1850),
            new ChickenSmall(character, 1900),
            new Endboss(statusBar)
        ],
        [ 
            new Cloud()
        ],
        [
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
        ],
        statusBar,
        [
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

        ]
    )
}