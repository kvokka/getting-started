import * as Phaser from 'phaser';

const PACMAN_SPEED = 100; // Pixels per second
const PACMAN_DISPLAY_SIZE = 20; // Updated to fit maze tile (20x20)
const TURN_THRESHOLD = 4; // Pixels of tolerance for turning at intersections

export enum Direction {
  NONE,
  LEFT,
  RIGHT,
  UP,
  DOWN,
}

export default class Pacman extends Phaser.Physics.Arcade.Sprite {
  private currentDirection: Direction = Direction.NONE;
  private intendedDirection: Direction = Direction.NONE;

  constructor(scene: Phaser.Scene, x: number, y: number) {
    super(scene, x, y, 'pacman_texture');

    scene.add.existing(this);
    scene.physics.add.existing(this);

    this.setDisplaySize(PACMAN_DISPLAY_SIZE, PACMAN_DISPLAY_SIZE);
    // this.setCollideWorldBounds(true); // Remove this to allow wrapping

    const bodySize = PACMAN_DISPLAY_SIZE * 0.95;
    this.setBodySize(bodySize, bodySize);

    if (this.body instanceof Phaser.Physics.Arcade.Body) {
      const offsetX = (this.width - this.body.width) / 2;
      const offsetY = (this.height - this.body.height) / 2;
      this.body.setOffset(offsetX, offsetY);
    }
  }

  setIntentLeft() {
    this.intendedDirection = Direction.LEFT;
  }

  setIntentRight() {
    this.intendedDirection = Direction.RIGHT;
  }

  setIntentUp() {
    this.intendedDirection = Direction.UP;
  }

  setIntentDown() {
    this.intendedDirection = Direction.DOWN;
  }

  public updateMovement(mazeLayout: number[][], TILE_SIZE: number) {
    const currentTileX = Math.floor(this.x / TILE_SIZE);
    const currentTileY = Math.floor(this.y / TILE_SIZE);
    const tileCenterX = currentTileX * TILE_SIZE + TILE_SIZE / 2;
    const tileCenterY = currentTileY * TILE_SIZE + TILE_SIZE / 2;

    const atTileCenter = Phaser.Math.Distance.Between(this.x, this.y, tileCenterX, tileCenterY) < TURN_THRESHOLD;

    if (this.intendedDirection !== Direction.NONE && this.intendedDirection !== this.currentDirection && atTileCenter) {
      let nextTileX = currentTileX;
      let nextTileY = currentTileY;

      switch (this.intendedDirection) {
        case Direction.LEFT: nextTileX--; break;
        case Direction.RIGHT: nextTileX++; break;
        case Direction.UP: nextTileY--; break;
        case Direction.DOWN: nextTileY++; break;
      }

      if (
        mazeLayout[nextTileY] !== undefined &&
        mazeLayout[nextTileY][nextTileX] !== undefined &&
        mazeLayout[nextTileY][nextTileX] === 0 // 0 means path
      ) {
        this.x = tileCenterX;
        this.y = tileCenterY;
        this.currentDirection = this.intendedDirection;
      }
    }

    switch (this.currentDirection) {
      case Direction.LEFT:
        this.setVelocityX(-PACMAN_SPEED); this.setVelocityY(0); this.setAngle(180);
        break;
      case Direction.RIGHT:
        this.setVelocityX(PACMAN_SPEED); this.setVelocityY(0); this.setAngle(0);
        break;
      case Direction.UP:
        this.setVelocityY(-PACMAN_SPEED); this.setVelocityX(0); this.setAngle(-90);
        break;
      case Direction.DOWN:
        this.setVelocityY(PACMAN_SPEED); this.setVelocityX(0); this.setAngle(90);
        break;
      case Direction.NONE:
        this.setVelocity(0, 0);
        break;
    }

    // Stop if blocked by a wall in the current direction of movement
    if (this.body && this.body.blocked.none === false) {
      if ((this.currentDirection === Direction.LEFT && this.body.blocked.left) ||
        (this.currentDirection === Direction.RIGHT && this.body.blocked.right) ||
        (this.currentDirection === Direction.UP && this.body.blocked.up) ||
        (this.currentDirection === Direction.DOWN && this.body.blocked.down)) {
        this.stopMovement(false); // Pass false to not reset currentDirection
        // Snap to grid to prevent getting stuck in wall edges
        this.x = Math.round(this.x / (TILE_SIZE / 2)) * (TILE_SIZE / 2);
        this.y = Math.round(this.y / (TILE_SIZE / 2)) * (TILE_SIZE / 2);
      }
    }

    // Implement world wrapping (tunnel effect)
    // Game width is MAZE_WIDTH_TILES * TILE_SIZE = 28 * 20 = 560
    // Game height is MAZE_HEIGHT_TILES * TILE_SIZE = 31 * 20 = 620
    // These values should ideally come from the scene or game config if possible
    // For now, assuming these are the world bounds set for the camera.
    this.scene.physics.world.wrap(this, this.width / 2); // Wrap based on sprite center
    // Note: Phaser's default wrap might not be exactly what's needed for Pac-Man tunnels
    // which are typically at specific y-coordinates and wrap horizontally only.
    // A more precise implementation would check if Pac-Man is in a tunnel row.
    // For now, this provides general wrapping.

    // If Pac-Man is outside the defined maze layout due to wrapping,
    // it might be better to manually position it.
    // Example for horizontal wrapping (classic tunnel):
    // if (this.x < 0 - this.width / 2) {
    //   this.x = gameWidth + this.width / 2;
    // } else if (this.x > gameWidth + this.width / 2) {
    //   this.x = 0 - this.width / 2;
    // }
  }

  public stopMovement(resetDirection: boolean = true) {
    this.setVelocity(0, 0);
    if (resetDirection) {
      // this.currentDirection = Direction.NONE; // Keep facing direction unless explicitly reset
    }
  }

  public getCurrentDirection(): Direction {
    return this.currentDirection;
  }

  public setInitialDirection(direction: Direction) {
    this.currentDirection = direction;
    this.intendedDirection = direction;
    // Apply initial angle
    switch (direction) {
      case Direction.LEFT: this.setAngle(180); break;
      case Direction.RIGHT: this.setAngle(0); break;
      case Direction.UP: this.setAngle(-90); break;
      case Direction.DOWN: this.setAngle(90); break;
    }
  }
}
