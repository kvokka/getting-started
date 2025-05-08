import * as Phaser from 'phaser';

export enum PelletType {
  Regular = 'regular',
  Power = 'power',
}

export class Pellet extends Phaser.Physics.Arcade.Sprite {
  private pelletType: PelletType;
  private pointsValue: number;

  constructor(
    scene: Phaser.Scene,
    x: number,
    y: number,
    texture: string,
    type: PelletType = PelletType.Regular,
    points: number = 10
  ) {
    super(scene, x, y, texture);

    this.pelletType = type;
    this.pointsValue = points;

    // Add to scene and physics
    scene.add.existing(this);
    scene.physics.add.existing(this);

    // Set up physics properties if needed
    // For example, if pellets are static:
    if (this.body instanceof Phaser.Physics.Arcade.Body) {
      this.body.setImmovable(true);
      // Pellets don't need to check collisions with world bounds or other pellets
      this.body.onCollide = false;
      this.body.onOverlap = true; // We'll use overlap for collection
    }
  }

  public getType(): PelletType {
    return this.pelletType;
  }

  public getPoints(): number {
    return this.pointsValue;
  }

  // Method to handle collection
  public collect(): void {
    // Disable and hide the pellet
    this.disableBody(true, true);
    // Optionally, play a sound or emit an event
    // this.scene.sound.play('pellet_collect_sound');
    // this.scene.events.emit('pelletCollected', this.pointsValue);
  }

  // Static method for preloading assets if needed, though pellets might be simple graphics
  // For now, we assume the texture is preloaded elsewhere or is a basic shape.
  // static preload(scene: Phaser.Scene): void {
  //   // scene.load.image('pellet_texture_key', 'path/to/pellet_image.png');
  // }
}
