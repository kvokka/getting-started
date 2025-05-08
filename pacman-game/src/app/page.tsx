'use client';

import dynamic from 'next/dynamic';

// Dynamically import the GameContainer component with SSR turned off
const GameContainerWithNoSSR = dynamic(
  () => import('@/components/GameContainer'),
  { ssr: false }
);

export default function HomePage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24 bg-gray-800">
      <h1 className="text-4xl font-bold text-yellow-400 mb-8">Pac-Man Game</h1>
      <div className="border-4 border-blue-500 shadow-lg">
        <GameContainerWithNoSSR />
      </div>
    </main>
  );
}
