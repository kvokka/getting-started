'use client';

import * as Phaser from 'phaser';
import { useEffect, useRef, useState } from 'react'; // Added useState
import { Direction } from '@/game/entities/Pacman'; // Import Direction

// We'll create these scenes in the next steps
import BootScene from '@/game/scenes/BootScene';
import PreloadScene from '@/game/scenes/PreloadScene';
import GameScene from '@/game/scenes/GameScene';

const GameContainer = () => {
  const gameContainerRef = useRef<HTMLDivElement>(null);
  const gameInstanceRef = useRef<Phaser.Game | null>(null);
  const [gameReady, setGameReady] = useState(false); // State to track if game is ready for interaction

  const handleDirectionPress = (direction: Direction) => {
    console.log(`handleDirectionPress called with direction: ${Direction[direction]}`);
    if (gameInstanceRef.current && gameReady) {
      console.log('Game instance and gameReady are true.');
      const gameScene = gameInstanceRef.current.scene.getScene('GameScene') as GameScene;
      if (gameScene && gameScene.scene.isActive()) {
        console.log('GameScene is active, calling setPlayerIntent.');
        gameScene.setPlayerIntent(direction);
      } else {
        console.warn('GameScene not active or not found when trying to set player intent. GameScene:', gameScene, 'Is Active:', gameScene?.scene.isActive());
      }
    } else {
      console.warn('handleDirectionPress: Game instance or gameReady is false.', 'Instance:', gameInstanceRef.current, 'Ready:', gameReady);
    }
  };


  useEffect(() => {
    if (typeof window !== 'undefined' && gameContainerRef.current) {
      if (gameInstanceRef.current) {
        // If a game instance already exists, don't create a new one
        return;
      }

      const config: Phaser.Types.Core.GameConfig = {
        type: Phaser.AUTO, // Automatically detect WebGL or Canvas
        width: 560, // MAZE_WIDTH_TILES (28) * TILE_SIZE (20)
        height: 620, // MAZE_HEIGHT_TILES (31) * TILE_SIZE (20)
        parent: gameContainerRef.current, // Mount the game in this div
        physics: {
          default: 'arcade',
          arcade: {
            gravity: { x: 0, y: 0 },
            debug: false, // Disable physics debug graphics
          },
        },
        scene: [BootScene, PreloadScene, GameScene],
      };

      gameInstanceRef.current = new Phaser.Game(config);
      console.log('Phaser.Game instance created:', gameInstanceRef.current);
      if (gameInstanceRef.current.isBooted) {
        console.log('Phaser game is booted.');
      } else {
        console.warn('Phaser game is NOT booted immediately after creation.');
        gameInstanceRef.current.events.once('ready', () => {
          console.log('Phaser game "ready" event fired.');
          setGameReady(true); // Set game as ready
        });
      }
    }

    return () => {
      // Cleanup when component unmounts
      if (gameInstanceRef.current) {
        gameInstanceRef.current.destroy(true);
        gameInstanceRef.current = null;
      }
    };
  }, []); // Empty dependency array ensures this runs once on mount and cleanup on unmount

  return (
    <div className="relative flex flex-col items-center">
      <div ref={gameContainerRef} id="phaser-game-container" />
      {gameReady && (
        <div className="mt-4 grid grid-cols-3 gap-2 w-48 select-none">
          <div></div> {/* Empty cell for layout */}
          <button
            onTouchStart={(e) => { e.preventDefault(); console.log('UP onTouchStart'); handleDirectionPress(Direction.UP); }}
            onMouseDown={() => { console.log('UP onMouseDown'); handleDirectionPress(Direction.UP); }}
            className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-3 px-4 rounded active:bg-gray-800"
            style={{ WebkitTapHighlightColor: 'transparent' }}
          >
            ↑
          </button>
          <div></div> {/* Empty cell for layout */}

          <button
            onTouchStart={(e) => { e.preventDefault(); console.log('LEFT onTouchStart'); handleDirectionPress(Direction.LEFT); }}
            onMouseDown={() => { console.log('LEFT onMouseDown'); handleDirectionPress(Direction.LEFT); }}
            className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-3 px-4 rounded active:bg-gray-800"
            style={{ WebkitTapHighlightColor: 'transparent' }}
          >
            ←
          </button>
          <div></div> {/* Center button or empty cell */}
          <button
            onTouchStart={(e) => { e.preventDefault(); console.log('RIGHT onTouchStart'); handleDirectionPress(Direction.RIGHT); }}
            onMouseDown={() => { console.log('RIGHT onMouseDown'); handleDirectionPress(Direction.RIGHT); }}
            className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-3 px-4 rounded active:bg-gray-800"
            style={{ WebkitTapHighlightColor: 'transparent' }}
          >
            →
          </button>

          <div></div> {/* Empty cell for layout */}
          <button
            onTouchStart={(e) => { e.preventDefault(); console.log('DOWN onTouchStart'); handleDirectionPress(Direction.DOWN); }}
            onMouseDown={() => { console.log('DOWN onMouseDown'); handleDirectionPress(Direction.DOWN); }}
            className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-3 px-4 rounded active:bg-gray-800"
            style={{ WebkitTapHighlightColor: 'transparent' }}
          >
            ↓
          </button>
          <div></div> {/* Empty cell for layout */}
        </div>
      )}
    </div>
  );
};

export default GameContainer;
