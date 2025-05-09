'use client';

import * as Phaser from 'phaser';
import { useEffect, useRef, useState } from 'react'; // Added useState
// import { Direction } from '@/game/entities/Pacman'; // Unused import removed

// We'll create these scenes in the next steps
import BootScene from '@/game/scenes/BootScene';
import PreloadScene from '@/game/scenes/PreloadScene';
import GameScene from '@/game/scenes/GameScene';

const GameContainer = () => {
  const gameContainerRef = useRef<HTMLDivElement>(null);
  const gameInstanceRef = useRef<Phaser.Game | null>(null);
  const [_gameReady, setGameReady] = useState(false); // gameReady prefixed with _ as it's not read

  useEffect(() => {
    if (typeof window !== 'undefined' && gameContainerRef.current) {
      if (gameInstanceRef.current) {
        return; // Game instance already exists
      }

      const config: Phaser.Types.Core.GameConfig = {
        type: Phaser.AUTO,
        width: 560,
        height: 620,
        parent: gameContainerRef.current,
        physics: {
          default: 'arcade',
          arcade: { gravity: { x: 0, y: 0 }, debug: false },
        },
        scene: [BootScene, PreloadScene, GameScene], // GameScene will handle its own input
      };

      const game = new Phaser.Game(config);
      gameInstanceRef.current = game;
      // console.log('Phaser.Game instance created:', game);

      // Set gameReady state when the game is ready
      if (game.isBooted) {
        // console.log('Phaser game is booted.');
        setGameReady(true);
      } else {
        // console.warn('Phaser game is NOT booted immediately after creation.');
        game.events.once('ready', () => {
          // console.log('Phaser game "ready" event fired.');
          setGameReady(true);
        });
      }
    }

    return () => {
      if (gameInstanceRef.current) {
        // console.log('Destroying Phaser game instance.');
        gameInstanceRef.current.destroy(true);
        gameInstanceRef.current = null;
        setGameReady(false); // Reset game ready state
      }
    };
  }, []); // Empty dependency array

  return (
    <div className="relative flex flex-col items-center">
      {/* The div where the Phaser game canvas will be injected.
          touchAction: 'none' helps prevent default browser touch behaviors like scrolling on the canvas. */}
      <div ref={gameContainerRef} id="phaser-game-container" style={{ touchAction: 'none' }} />
    </div>
  );
};

export default GameContainer;
