import * as Phaser from 'phaser';

export default class BootScene extends Phaser.Scene {
  constructor() {
    super('BootScene');
  }

  preload() {
    console.log('BootScene: preload() called');
    // Load any assets needed for the PreloadScene's loading bar, if any
    // For example: this.load.image('loading-bar-bg', 'assets/images/loading-bar-bg.png');
  }

  create() {
    console.log('BootScene: create() called');
    this.scene.start('PreloadScene');
    console.log('BootScene: this.scene.start("PreloadScene") executed');
  }
}
