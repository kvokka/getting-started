import * as Phaser from 'phaser';
import Pacman, { Direction } from '../entities/Pacman'; // Import Direction
import { Pellet } from '../entities/Pellet';

const TILE_SIZE = 20; // Size of each tile in pixels
const MAZE_WIDTH_TILES = 28; // Width of the maze in tiles
const MAZE_HEIGHT_TILES = 31; // Height of the maze in tiles

// 1 = wall, 0 = path (P and S will also be 0 for now for simplicity)
// This is a simplified representation. A full classic maze is more complex.
const classicMazeLayout = [
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 1],
  [1, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 1], // S replaced with 0
  [1, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 0, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 0, 1],
  [1, 0, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 0, 1],
  [1, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 1],
  [1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1],
  [1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1],
  [1, 1, 1, 1, 1, 1, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 1, 1, 1, 1, 1, 1],
  [1, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 0, 0, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 1],
  [1, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 0, 0, 0, 0, 0, 0, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 1],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], // Tunnel
  [1, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 0, 0, 0, 0, 0, 0, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 1],
  [1, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 1],
  [1, 1, 1, 1, 1, 1, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 1, 1, 1, 1, 1, 1],
  [1, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 1],
  [1, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 1],
  [1, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 1],
  [1, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 1], // S replaced with 0
  [1, 1, 1, 0, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 0, 1, 1, 1],
  [1, 1, 1, 0, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 0, 1, 1, 1],
  [1, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 1],
  [1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1],
  [1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
];


export default class GameScene extends Phaser.Scene {
  private walls: Phaser.Physics.Arcade.StaticGroup | undefined;
  private pellets: Phaser.Physics.Arcade.Group | undefined; // Group for pellets
  private player: Pacman | undefined;
  private cursors: Phaser.Types.Input.Keyboard.CursorKeys | undefined;
  private score: number = 0;
  private scoreText: Phaser.GameObjects.Text | undefined; // To display score

  constructor() {
    super('GameScene');
  }

  create() {
    console.log('GameScene: create() called');

    this.walls = this.physics.add.staticGroup();
    this.pellets = this.physics.add.group({ classType: Pellet });

    this.createMazeAndPellets(); // Renamed and updated method

    // Center the camera on the maze
    const mazePixelWidth = MAZE_WIDTH_TILES * TILE_SIZE;
    const mazePixelHeight = MAZE_HEIGHT_TILES * TILE_SIZE;
    this.cameras.main.setBounds(0, 0, mazePixelWidth, mazePixelHeight);

    // Find a starting position for Pacman
    let startX = -1, startY = -1;
    const preferredStartY = 23;
    const preferredStartX = 13;

    if (classicMazeLayout[preferredStartY] && classicMazeLayout[preferredStartY][preferredStartX] === 0) {
      startX = preferredStartX * TILE_SIZE + TILE_SIZE / 2;
      startY = preferredStartY * TILE_SIZE + TILE_SIZE / 2;
    } else {
      for (let y = 0; y < classicMazeLayout.length; y++) {
        const xPos = classicMazeLayout[y].indexOf(0);
        if (xPos !== -1) {
          startX = xPos * TILE_SIZE + TILE_SIZE / 2;
          startY = y * TILE_SIZE + TILE_SIZE / 2;
          break;
        }
      }
    }

    if (startX !== -1 && startY !== -1) {
      this.player = new Pacman(this, startX, startY);
      this.player.setInitialDirection(Direction.RIGHT); // Start Pac-Man facing right

      if (this.walls) {
        this.physics.add.collider(this.player, this.walls);
      }
      if (this.pellets && this.player) {
        this.physics.add.overlap(this.player, this.pellets, this.handleCollectPellet, undefined, this);
      }
    } else {
      console.error("GameScene: Could not find a valid starting position for Pacman!");
    }

    // Initialize score display (simple text for now, will move to UIScene later)
    this.scoreText = this.add.text(10, 10, 'Score: 0', {
      fontSize: '16px',
      color: '#fff',
      // backgroundColor: '#000' // Optional background for visibility
    });
    this.scoreText.setScrollFactor(0); // Keep score text fixed on screen

    // Initialize keyboard controls
    if (this.input.keyboard) {
      this.cursors = this.input.keyboard.createCursorKeys();
    } else {
      console.error("GameScene: Keyboard input not available!");
    }
  }

  private createMazeAndPellets() {
    if (!this.walls || !this.pellets) return;

    const graphics = this.add.graphics();
    graphics.fillStyle(0x0000ff, 1); // Blue walls

    for (let y = 0; y < classicMazeLayout.length; y++) {
      for (let x = 0; x < classicMazeLayout[y].length; x++) {
        const tileType = classicMazeLayout[y][x];
        const worldX = x * TILE_SIZE + TILE_SIZE / 2;
        const worldY = y * TILE_SIZE + TILE_SIZE / 2;

        if (tileType === 1) { // Wall
          const wall = this.walls.create(worldX, worldY, undefined)
            .setSize(TILE_SIZE, TILE_SIZE)
            .setDisplaySize(TILE_SIZE, TILE_SIZE)
            .setVisible(false);
          // Draw wall for debugging
          const body = wall.body as Phaser.Physics.Arcade.StaticBody;
          graphics.fillRect(body.x, body.y, body.width, body.height);

        } else if (tileType === 0) { // Path - place a pellet
          // Avoid placing pellet at Pacman's typical starting cell for now
          // Or at ghost house exit, etc. For now, simple placement.
          // A more robust solution would mark special cells in the layout.
          if (!(y === 23 && x === 13)) { // Don't place pellet at Pacman's start
            const pellet = this.pellets.get(worldX, worldY, 'pellet_texture') as Pellet;
            if (pellet) {
              pellet.setActive(true).setVisible(true);
              // The Pellet class constructor already adds to physics.
              // Ensure its body is enabled if it was recycled.
              pellet.enableBody(true, worldX, worldY, true, true);
            }
          }
        }
        // Later, handle P for power pellet, S for super pellet (or other special tiles)
      }
    }
  }

  private handleCollectPellet(
    // Parameters broadened to satisfy TS based on inferred types from Phaser's overlap
    object1: Phaser.Types.Physics.Arcade.GameObjectWithBody | Phaser.Tilemaps.Tile | Phaser.Physics.Arcade.Body | Phaser.Physics.Arcade.StaticBody,
    object2: Phaser.Types.Physics.Arcade.GameObjectWithBody | Phaser.Tilemaps.Tile | Phaser.Physics.Arcade.Body | Phaser.Physics.Arcade.StaticBody
  ) {
    // For this specific overlap (this.player vs this.pellets),
    // object1 will be Pacman, and object2 will be a Pellet.
    // Both are instances of Phaser.Physics.Arcade.Sprite, which is a GameObjectWithBody.
    const player = object1 as Pacman;
    const pellet = object2 as Pellet;

    // It's good practice to ensure the types are what we expect,
    // especially if this callback were used for more generic overlaps.
    if (!(player instanceof Pacman) || !(pellet instanceof Pellet)) {
      // This case should ideally not be reached with the current setup.
      console.warn('handleCollectPellet called with unexpected object types.');
      return;
    }

    if (pellet.active) { // Check if pellet is active before collecting
      this.score += pellet.getPoints();
      if (this.scoreText) {
        this.scoreText.setText('Score: ' + this.score);
      }
      pellet.collect(); // This will disable and hide it
      console.log(`Pellet collected! Score: ${this.score}`);

      // Optional: Check for level completion
      // if (this.pellets && this.pellets.countActive(true) === 0) {
      //   console.log('Level Complete!');
      //   // this.scene.restart(); // Or go to next level
      // }
    }
  }

  update(_time: number, _delta: number) {
    if (!this.player || !this.cursors) {
      return;
    }

    // Handle input to set intended direction
    if (this.cursors.left.isDown) {
      this.player.setIntentLeft();
    } else if (this.cursors.right.isDown) {
      this.player.setIntentRight();
    } else if (this.cursors.up.isDown) {
      this.player.setIntentUp();
    } else if (this.cursors.down.isDown) {
      this.player.setIntentDown();
    }

    // Update Pacman's movement based on current and intended directions
    this.player.updateMovement(classicMazeLayout, TILE_SIZE);
  }
}
