'use client'; // Add this directive to make it a Client Component

import dynamic from 'next/dynamic';
import React, { useState, useEffect } from 'react'; // Import useState and useEffect
import { defaultMazeLayout, TILE_SIZE } from '@/lib/maze/MazeManager'; // Import maze layout and tile size

// Dynamically import GameCanvas with SSR turned off
const GameCanvas = dynamic(() => import('@/components/GameCanvas'), {
  ssr: false,
  loading: () => <p>Loading Game Canvas...</p>, // Optional loading state
});

const PacmanPage: React.FC = () => {
  // console.log('[PacmanPage] Component rendering.');
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  // Calculate canvas dimensions based on the maze
  const mazeHeight = defaultMazeLayout.length * TILE_SIZE;
  const mazeWidth = (defaultMazeLayout[0]?.length || 0) * TILE_SIZE;

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24 bg-gray-900 text-white">
      <h1 className="text-5xl font-bold mb-10 text-yellow-400">Pac-Man</h1>
      <div className="border-4 border-blue-500 rounded-lg shadow-2xl overflow-hidden">
        {/* Ensure GameCanvas is only rendered after client-side mount */}
        {isClient && <GameCanvas width={mazeWidth} height={mazeHeight} />}
      </div>
      <p className="mt-6 text-sm text-gray-400">
        The game canvas should be visible above. (Dimensions: {mazeWidth}x{mazeHeight})
      </p>
    </main>
  );
};

export default PacmanPage;
