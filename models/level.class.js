class Level {
    enemies;
    clouds;
    backgrounds;
    statusBar;
    level_end_x = 2350;

    constructor(enemies, clouds, backgrounds, statusBar){
        this.enemies = enemies;
        this.clouds = clouds;
        this.backgrounds = backgrounds;
        this.statusBar = statusBar;
    }
}
