import * as PIXI from 'pixi.js';

export const TILE_SIZE = 20; // pixels

// Example tile types
export enum TileType {
  EMPTY = 0,
  WALL = 1,
}

// A simple static maze layout
// 0 = empty path, 1 = wall
export const defaultMazeLayout: TileType[][] = [
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 0, 1, 1, 0, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 0, 1, 1, 0, 1],
  [1, 0, 1, 1, 0, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 0, 1, 1, 0, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 0, 1, 1, 0, 1, 0, 1, 1, 1, 1, 1, 1, 0, 1, 0, 1, 1, 0, 1],
  [1, 0, 0, 0, 0, 1, 0, 0, 0, 1, 1, 0, 0, 0, 1, 0, 0, 0, 0, 1],
  [1, 1, 1, 1, 0, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 0, 1, 1, 1, 1],
  [1, 1, 1, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 1, 1, 1],
  [1, 1, 1, 1, 0, 1, 0, 1, 1, 0, 0, 1, 1, 0, 1, 0, 1, 1, 1, 1],
  [1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1], // Pac-Man starting row (example)
  [1, 1, 1, 1, 0, 1, 0, 1, 1, 1, 1, 1, 1, 0, 1, 0, 1, 1, 1, 1],
  [1, 1, 1, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 1, 1, 1],
  [1, 1, 1, 1, 0, 1, 0, 1, 1, 1, 1, 1, 1, 0, 1, 0, 1, 1, 1, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 0, 1, 1, 0, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 0, 1, 1, 0, 1],
  [1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1],
  [1, 1, 0, 1, 0, 1, 0, 1, 1, 1, 1, 1, 1, 0, 1, 0, 1, 0, 1, 1],
  [1, 0, 0, 0, 0, 1, 0, 0, 0, 1, 1, 0, 0, 0, 1, 0, 0, 0, 0, 1],
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
];

export class MazeManager {
  private layout: TileType[][];
  public readonly rows: number;
  public readonly cols: number;
  private wallGraphics: PIXI.Graphics;

  constructor(layout: TileType[][] = defaultMazeLayout) {
    this.layout = layout;
    this.rows = layout.length;
    this.cols = layout[0]?.length || 0;
    this.wallGraphics = new PIXI.Graphics();
  }

  public renderMaze(stage: PIXI.Container): void {
    this.wallGraphics.clear(); // Clear previous drawings
    this.wallGraphics.beginFill(0x0000FF); // Blue for walls

    for (let r = 0; r < this.rows; r++) {
      for (let c = 0; c < this.cols; c++) {
        if (this.layout[r][c] === TileType.WALL) {
          this.wallGraphics.drawRect(
            c * TILE_SIZE,
            r * TILE_SIZE,
            TILE_SIZE,
            TILE_SIZE
          );
        }
      }
    }
    this.wallGraphics.endFill();
    stage.addChild(this.wallGraphics);
  }

  public isWall(gridX: number, gridY: number): boolean {
    if (
      gridY < 0 ||
      gridY >= this.rows ||
      gridX < 0 ||
      gridX >= this.cols
    ) {
      return true; // Out of bounds is considered a wall
    }
    return this.layout[gridY][gridX] === TileType.WALL;
  }

  // Helper to convert pixel coordinates to grid coordinates
  public getGridCoordinates(pixelX: number, pixelY: number): { x: number; y: number } {
    return {
      x: Math.floor(pixelX / TILE_SIZE),
      y: Math.floor(pixelY / TILE_SIZE),
    };
  }
}
