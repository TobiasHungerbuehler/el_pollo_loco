/**
 * Represents a level in the game, including enemies, clouds, backgrounds, status bar, and pickable objects.
 */
class Level {
    enemies;
    clouds;
    backgrounds;
    statusBar;
    pickableObjects;
    level_end_x = 2350;


    /**
     * Creates a new Level instance with the specified elements.
     * @param {DrawableObject[]} enemies - An array of enemy objects.
     * @param {DrawableObject[]} clouds - An array of cloud objects.
     * @param {DrawableObject[]} backgrounds - An array of background objects.
     * @param {StatusBar} statusBar - The status bar object.
     * @param {DrawableObject[]} pickableObjects - An array of pickable objects.
     */
    constructor(enemies, clouds, backgrounds, statusBar, pickableObjects){
        this.enemies = enemies;
        this.clouds = clouds;
        this.backgrounds = backgrounds;
        this.statusBar = statusBar;
        this.pickableObjects = pickableObjects;
    }
}
