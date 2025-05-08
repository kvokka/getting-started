'use client';

import * as Phaser from 'phaser';
import { useEffect, useRef } from 'react';

// We'll create these scenes in the next steps
import BootScene from '@/game/scenes/BootScene';
import PreloadScene from '@/game/scenes/PreloadScene';
import GameScene from '@/game/scenes/GameScene';

const GameContainer = () => {
  const gameContainerRef = useRef<HTMLDivElement>(null);
  const gameInstanceRef = useRef<Phaser.Game | null>(null);

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

  return <div ref={gameContainerRef} id="phaser-game-container" />;
};

export default GameContainer;
