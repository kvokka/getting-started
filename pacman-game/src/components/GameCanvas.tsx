'use client'; // This component will only run on the client

import React, { useEffect, useRef } from 'react';
// import * as PIXI from 'pixi.js'; // GameManager will handle PixiJS imports
import { GameManager } from '../lib/GameManager';

interface GameCanvasProps {
  width?: number;
  height?: number;
}

const GameCanvas: React.FC<GameCanvasProps> = ({ width = 800, height = 600 }) => {
  const canvasRef = useRef<HTMLDivElement>(null);
  const gameManagerRef = useRef<GameManager | null>(null);

  useEffect(() => {
    const currentCanvasElement = canvasRef.current; // Capture current value of the ref

    if (typeof window === 'undefined' || !currentCanvasElement) {
      // console.log('[GameCanvas] GameManager setup skipped: not in browser environment or canvas ref not available.');
      return;
    }

    // Prevent re-initialization if GameManager already exists
    if (gameManagerRef.current) {
      // console.log('GameManager already initialized.');
      return;
    }

    // console.log('Initializing GameManager...');
    try {
      // Ensure the currentCanvasElement (our div) is empty before appending new canvas
      if (currentCanvasElement) {
        while (currentCanvasElement.firstChild) {
          currentCanvasElement.removeChild(currentCanvasElement.firstChild);
        }
      }

      gameManagerRef.current = new GameManager({
        parentElement: currentCanvasElement, // Use the captured value
        width: width,
        height: height,
        resolution: window.devicePixelRatio || 1,
      });
      // console.log('GameManager initialized.');

    } catch (error) {
      console.error('Failed to create GameManager:', error);
    }

    // Cleanup function when the component unmounts
    return () => {
      if (gameManagerRef.current) {
        // console.log('Destroying GameManager...');
        gameManagerRef.current.destroy();
        gameManagerRef.current = null;
        // console.log('GameManager destroyed.');
      }
      // The GameManager's destroy method should handle removing its canvas from the parentElement.
      // Use the captured currentCanvasElement in the cleanup
      if (currentCanvasElement) {
        while (currentCanvasElement.firstChild) {
          currentCanvasElement.removeChild(currentCanvasElement.firstChild);
        }
      }
    };
  }, [width, height, gameManagerRef]); // canvasRef itself is stable, gameManagerRef is used

  return <div ref={canvasRef} style={{ width: `${width}px`, height: `${height}px`, border: '1px solid #ccc' }} />;
};

export default GameCanvas;
