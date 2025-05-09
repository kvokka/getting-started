import * as PIXI from 'pixi.js';
import { Direction } from '../GameManager'; // Import Direction enum

export class PacMan {
  public sprite: PIXI.Sprite;
  public x: number;
  public y: number;
  public speed: number;
  public directionVector: { x: number; y: number }; // Renamed for clarity
  public currentDirection: Direction; // Added to store enum direction

  constructor(texture: PIXI.Texture, initialX: number, initialY: number, speed: number) {
    this.sprite = new PIXI.Sprite(texture);
    this.sprite.anchor.set(0.5); // Center the sprite's origin

    this.x = initialX;
    this.y = initialY;
    this.sprite.x = this.x;
    this.sprite.y = this.y;

    this.speed = speed;
    this.directionVector = { x: 0, y: 0 }; // Initially stationary
    this.currentDirection = Direction.None; // Start with no specific direction
  }

  public update(/* delta: number */): void { // delta is not used currently
    // Movement logic is now primarily handled in GameManager due to collision checks
    // This update might be used for animation or other internal PacMan logic in the future.

    // For now, ensure sprite position matches PacMan's logical position

    // Update sprite position
    this.sprite.x = this.x;
    this.sprite.y = this.y;
  }

  public setDirection(newDirection: Direction): void {
    if (newDirection === this.currentDirection && newDirection !== Direction.None) {
    }

    this.currentDirection = newDirection;

    switch (newDirection) {
      case Direction.Up:
        this.directionVector.x = 0;
        this.directionVector.y = -1;
        this.sprite.angle = -90;
        break;
      case Direction.Down:
        this.directionVector.x = 0;
        this.directionVector.y = 1;
        this.sprite.angle = 90;
        break;
      case Direction.Left:
        this.directionVector.x = -1;
        this.directionVector.y = 0;
        this.sprite.angle = 180;
        break;
      case Direction.Right:
        this.directionVector.x = 1;
        this.directionVector.y = 0;
        this.sprite.angle = 0;
        break;
      case Direction.None:
        // Stop movement. GameManager will also need to respect this.
        this.directionVector.x = 0;
        this.directionVector.y = 0;
        // Keep current angle or reset to a default, e.g., right
        break;
    }
  }
}
