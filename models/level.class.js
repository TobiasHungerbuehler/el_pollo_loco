class Level {
    enemies;
    clouds;
    backgrounds;
    statusBar;
    pickableObjects;
    level_end_x = 2350;

    constructor(enemies, clouds, backgrounds, statusBar, pickableObjects){
        this.enemies = enemies;
        this.clouds = clouds;
        this.backgrounds = backgrounds;
        this.statusBar = statusBar;
        this.pickableObjects = pickableObjects;
    }
}
