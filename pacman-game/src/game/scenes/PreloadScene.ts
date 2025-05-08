import * as Phaser from 'phaser';

export default class PreloadScene extends Phaser.Scene {
  constructor() {
    super('PreloadScene');
  }

  preload() {
    console.log('PreloadScene: preload() called');
    // Example: this.load.image('pacman', 'assets/images/pacman.png');
    // Example: this.load.spritesheet('ghost', 'assets/images/ghost.png', { frameWidth: 32, frameHeight: 32 });
    // Example: this.load.tilemapTiledJSON('maze-map', 'assets/tilemaps/maze.json');

    // Placeholder for asset loading
    // Example: this.load.image('pacman', 'assets/images/pacman.png');
    // Example: this.load.spritesheet('ghost', 'assets/images/ghost.png', { frameWidth: 32, frameHeight: 32 });
    // Example: this.load.tilemapTiledJSON('maze-map', 'assets/tilemaps/maze.json');

    // For Pacman (using SVG)
    this.load.svg('pacman_texture', 'assets/pacman-icon.svg', { width: 20, height: 20 }); // Updated size to fit maze tile

    // For Pellet (simple small circle)
    const pelletGraphics = this.make.graphics({ fillStyle: { color: 0xffffff } }); // White pellet
    pelletGraphics.fillCircle(2.5, 2.5, 2.5); // Pellet will be 5x5
    pelletGraphics.generateTexture('pellet_texture', 5, 5);
    pelletGraphics.destroy();

    // For demonstration, let's create a dummy load event.
    this.load.image('dummy', 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7');
    console.log('PreloadScene: dummy image loading initiated.');

    this.load.on('complete', () => {
      console.log('PreloadScene: Asset loading complete (from "complete" event).');
      // Typically you might hide a loading bar here
    });
  }

  create() {
    console.log('PreloadScene: create() called.');
    // You can display a loading bar here using assets loaded in BootScene or generated graphics
    // For example:
    // const progressBar = this.add.graphics();
    // const progressBox = this.add.graphics();
    // progressBox.fillStyle(0x222222, 0.8);
    // progressBox.fillRect(240, 270, 320, 50);
    //
    // this.load.on('progress', (value: number) => {
    //   progressBar.clear();
    //   progressBar.fillStyle(0xffffff, 1);
    //   progressBar.fillRect(250, 280, 300 * value, 30);
    // });

    // Start the next scene once all assets are loaded and create() is called
    this.scene.start('GameScene');
    console.log('PreloadScene: this.scene.start("GameScene") executed');
  }
}
