import * as PIXI from 'pixi.js';
import { PacMan } from './entities/PacMan'; // Import PacMan
import { MazeManager, TILE_SIZE } from './maze/MazeManager'; // Import MazeManager and TILE_SIZE

// Define an enum for directions for better type safety and readability
export enum Direction {
  None,
  Up,
  Down,
  Left,
  Right,
}

interface GameManagerOptions {
  parentElement: HTMLElement;
  resolution?: number;
  width: number;
  height: number;
}

export class GameManager {
  public app: PIXI.Application;
  private assetsLoaded: boolean = false;
  private pacmanTexture: PIXI.Texture | null = null;
  public pacman: PacMan | null = null;
  private intendedDirection: Direction = Direction.None;
  public mazeManager: MazeManager | null = null; // Public for potential debugging or extensions
  // Store canvas dimensions for boundary checks
  private gameWidth: number;
  private gameHeight: number;


  constructor(options: GameManagerOptions) {
    this.app = new PIXI.Application();
    this.gameWidth = options.width;
    this.gameHeight = options.height;
    // Initialize the Pixi Application asynchronously
    this.init(options);
  }

  private async init(options: GameManagerOptions): Promise<void> {
    await this.app.init({
      width: options.width,
      height: options.height,
      resolution: options.resolution || window.devicePixelRatio || 1,
      autoDensity: true,
      backgroundColor: 0x1099bb, // Light blue background for now
    });

    if (options.parentElement) {
      options.parentElement.appendChild(this.app.canvas as unknown as Node); // Changed .view to .canvas
      // console.log('PixiJS Application Initialized and canvas appended to parent.');
    } else {
      console.error('parentElement not provided to GameManager init. Canvas will not be visible.');
    }

    // Start loading assets
    await this.loadAssets();

    // Start the game loop only after assets are loaded
    if (this.assetsLoaded && this.pacmanTexture) {
      // Instantiate MazeManager
      this.mazeManager = new MazeManager(); // Using default layout
      this.mazeManager.renderMaze(this.app.stage);
      // console.log('MazeManager created and maze rendered.');

      // Position Pac-Man in an empty spot (e.g., row 1, col 1, or a defined start position)
      // For now, let's try to find the first empty tile, or default to center if none.
      let startX = this.gameWidth / 2;
      let startY = this.gameHeight / 2;

      if (this.mazeManager) {
        for (let r = 0; r < this.mazeManager.rows; r++) {
          for (let c = 0; c < this.mazeManager.cols; c++) {
            if (!this.mazeManager.isWall(c, r)) {
              startX = c * TILE_SIZE + TILE_SIZE / 2;
              startY = r * TILE_SIZE + TILE_SIZE / 2;
              // console.log(`Found starting empty tile for PacMan at grid (${c},${r}), pixel (${startX},${startY})`);
              r = this.mazeManager.rows; // break outer loop
              break; // break inner loop
            }
          }
        }
      }


      this.pacman = new PacMan(this.pacmanTexture, startX, startY, 2); // Speed 2

      // Scale the sprite
      const desiredWidth = TILE_SIZE * 0.9; // Make PacMan fit snugly within a tile
      if (this.pacman.sprite.texture.width > 0) { // Ensure texture width is available
        const scale = desiredWidth / this.pacman.sprite.texture.width;
        this.pacman.sprite.scale.set(scale);
        // console.log(`Pacman sprite scaled to: ${scale} (Original width: ${this.pacman.sprite.texture.width}, New width approx: ${desiredWidth})`);
      } else {
        console.warn('Pacman sprite texture width is 0, cannot calculate scale. Using default scale.');
      }

      this.app.stage.addChild(this.pacman.sprite);
      // console.log('Pacman entity created and sprite added to stage.');

      this.setupInputHandlers();
      this.app.ticker.add(this.update.bind(this));
      // console.log('Game loop started.');
    } else {
      console.error('Failed to initialize game: Assets not loaded or Pacman texture missing.');
    }
  }

  private setupInputHandlers(): void {
    window.addEventListener('keydown', this.handleKeyDown.bind(this));
    // Potentially add keyup later if needed for stopping movement precisely
    // console.log('Input handlers set up.');
  }

  private handleKeyDown(event: KeyboardEvent): void {
    switch (event.key) {
      case 'ArrowUp':
        this.intendedDirection = Direction.Up;
        break;
      case 'ArrowDown':
        this.intendedDirection = Direction.Down;
        break;
      case 'ArrowLeft':
        this.intendedDirection = Direction.Left;
        break;
      case 'ArrowRight':
        this.intendedDirection = Direction.Right;
        break;
    }
  }


  private async loadAssets(): Promise<void> {
    // console.log('Starting asset loading...');
    const assetPath = '/assets/pacman_icon.svg'; // Updated to use the new SVG icon
    try {
      // console.log(`Attempting to load asset: ${assetPath} as 'pacman' asset...`);
      PIXI.Assets.add({ alias: 'pacman', src: assetPath });
      const textures = await PIXI.Assets.load(['pacman']);
      // console.log(`[GameManager] PIXI.Assets.load result (for ${assetPath}):`, textures);

      if (textures && textures.pacman && textures.pacman instanceof PIXI.Texture) {
        this.pacmanTexture = textures.pacman;
        this.assetsLoaded = true;
        // console.log(`Asset (${assetPath}) loaded successfully as texture, and assetsLoaded set to true.`);
      } else {
        console.error(`Asset (${assetPath}) not found, not a texture, or invalid. Result:`, textures, `assetsLoaded remains false.`);
        this.assetsLoaded = false;
      }
    } catch (error) {
      console.error(`Error during PIXI.Assets.load or PIXI.Assets.add (for ${assetPath}):`, error);
      this.assetsLoaded = false;
    }
  }

  private update(ticker: PIXI.Ticker): void {
    const delta = ticker.deltaTime; // Use PIXI.Ticker's delta for frame-rate independent movement

    if (this.pacman && this.mazeManager) {
      let targetX = this.pacman.x;
      let targetY = this.pacman.y;
      // const currentDirection = this.intendedDirection; // This was unused, collision check uses pacman's actual direction

      const speed = this.pacman.speed * delta; // Calculate potential movement

      // Attempt to update PacMan's direction based on input
      // This is important so PacMan tries to turn even if currently blocked
      if (this.intendedDirection !== Direction.None) {
        // Check if PacMan can move in the intended direction before committing to it
        // This is part of the logic to allow turning into open paths
        // The more comprehensive turning logic is at the end of the update function.
        // For now, we directly set it, and collision will prevent movement if blocked.
        this.pacman.setDirection(this.intendedDirection);
      }


      switch (this.pacman.currentDirection) { // Use pacman's current direction for movement logic
        case Direction.Up:
          targetY -= speed;
          this.pacman.sprite.angle = -90;
          break;
        case Direction.Down:
          targetY += speed;
          this.pacman.sprite.angle = 90;
          break;
        case Direction.Left:
          targetX -= speed;
          this.pacman.sprite.angle = 180;
          break;
        case Direction.Right:
          targetX += speed;
          this.pacman.sprite.angle = 0;
          break;
      }

      // Collision detection logic
      const pacmanRadius = (this.pacman.sprite.width / 2); // Approximate radius

      // Check collision for the four corners of PacMan's bounding box for more accuracy
      // Top-left, top-right, bottom-left, bottom-right
      const collisionPoints = [
        { x: targetX - pacmanRadius, y: targetY - pacmanRadius }, // Top-left
        { x: targetX + pacmanRadius - 1, y: targetY - pacmanRadius }, // Top-right (-1 to stay within tile)
        { x: targetX - pacmanRadius, y: targetY + pacmanRadius - 1 }, // Bottom-left
        { x: targetX + pacmanRadius - 1, y: targetY + pacmanRadius - 1 }, // Bottom-right
      ];

      let canMove = true;
      if (this.pacman.currentDirection !== Direction.None) { // Only check collision if PacMan is trying to move
        for (const point of collisionPoints) {
          const gridCoords = this.mazeManager.getGridCoordinates(point.x, point.y);
          if (this.mazeManager.isWall(gridCoords.x, gridCoords.y)) {
            canMove = false;
            // Collision log removed
            break;
          }
        }
      }


      if (canMove) {
        this.pacman.x = targetX;
        this.pacman.y = targetY;
      } else {
        // If collision, try to "snap" to the edge of the tile to allow sliding along walls
        // This is a simplified version. More robust sliding needs more complex logic.
        const currentGridX = Math.floor(this.pacman.x / TILE_SIZE);
        const currentGridY = Math.floor(this.pacman.y / TILE_SIZE);

        if (this.pacman.currentDirection === Direction.Left || this.pacman.currentDirection === Direction.Right) {
          // If moving horizontally and hit a wall, align Y
          this.pacman.y = currentGridY * TILE_SIZE + TILE_SIZE / 2;
        } else if (this.pacman.currentDirection === Direction.Up || this.pacman.currentDirection === Direction.Down) {
          // If moving vertically and hit a wall, align X
          this.pacman.x = currentGridX * TILE_SIZE + TILE_SIZE / 2;
        }
        // Movement blocked log removed
      }

      // Update PacMan's internal state (like animation if any)
      // Pacman's own update might handle animation or other logic - removed commented out call

      // Boundary collision (still useful for outer edges of the game area if maze doesn't cover it)
      const halfWidth = this.pacman.sprite.width / 2;
      const halfHeight = this.pacman.sprite.height / 2;

      this.pacman.x = Math.max(halfWidth, Math.min(this.pacman.x, this.gameWidth - halfWidth));
      this.pacman.y = Math.max(halfHeight, Math.min(this.pacman.y, this.gameHeight - halfHeight));

      // Update sprite position after all checks
      this.pacman.sprite.x = this.pacman.x;
      this.pacman.sprite.y = this.pacman.y;

      // More forgiving turning logic:
      // If PacMan intends to turn and is near the center of a tile, allow the turn if the new path is clear.
      if (this.intendedDirection !== Direction.None && this.intendedDirection !== this.pacman.currentDirection) {
        const pacmanGridX = Math.floor(this.pacman.x / TILE_SIZE);
        const pacmanGridY = Math.floor(this.pacman.y / TILE_SIZE);

        const offsetX = this.pacman.x - (pacmanGridX * TILE_SIZE + TILE_SIZE / 2);
        const offsetY = this.pacman.y - (pacmanGridY * TILE_SIZE + TILE_SIZE / 2);

        // Define a tolerance for being "near the center" of a tile for turning.
        // This could be a percentage of TILE_SIZE or a fixed pixel value.
        // Example: PacMan must be within 30% of the tile's center to turn.
        const turnTolerance = TILE_SIZE * 0.3;

        if (Math.abs(offsetX) < turnTolerance && Math.abs(offsetY) < turnTolerance) {
          // PacMan is close enough to the center of the tile. Check if the intended path is clear.
          let checkGridX = pacmanGridX;
          let checkGridY = pacmanGridY;

          switch (this.intendedDirection) {
            case Direction.Up: checkGridY--; break;
            case Direction.Down: checkGridY++; break;
            case Direction.Left: checkGridX--; break;
            case Direction.Right: checkGridX++; break;
          }

          if (!this.mazeManager.isWall(checkGridX, checkGridY)) {
            // Path is clear, snap PacMan to center of current tile and change direction
            this.pacman.x = pacmanGridX * TILE_SIZE + TILE_SIZE / 2;
            this.pacman.y = pacmanGridY * TILE_SIZE + TILE_SIZE / 2;
            this.pacman.setDirection(this.intendedDirection);
            // Pacman turn log removed
          }
        }
      }
    }
    // console.log(`Update called. Delta time (ms): ${ticker.deltaMS.toFixed(2)}, Delta (frames): ${ticker.deltaTime.toFixed(2)}`); // Kept for dev debugging if needed
  }

  public destroy(): void {
    // console.log('[GameManager] destroy() called. Current this.app value:', this.app);
    window.removeEventListener('keydown', this.handleKeyDown.bind(this));

    if (this.app && typeof this.app.destroy === 'function') {
      // console.log('[GameManager] destroy(): this.app and this.app.destroy are valid.');
      // Further check if the application was likely initialized by checking for the renderer
      if (this.app.renderer) {
        try {
          this.app.destroy(true, { children: true, texture: true });
          // console.log('[GameManager] PixiJS Application Destroyed successfully.');
        } catch (e) {
          console.error('[GameManager] Error during this.app.destroy():', e);
        }
      } else {
        console.warn('[GameManager] destroy(): this.app.renderer is not available. Skipping app.destroy() to prevent errors on potentially uninitialized/destroyed app.');
      }
    } else {
      console.warn('[GameManager] destroy(): this.app is undefined, null, or app.destroy is not a function. Skipping app.destroy(). Value of this.app:', this.app);
    }
  }
}
