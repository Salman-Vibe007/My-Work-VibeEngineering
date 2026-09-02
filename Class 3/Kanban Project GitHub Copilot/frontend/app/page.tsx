'use client';

import { useState } from 'react';
import { Board } from '@/components';
import { initialBoard } from '@/app/data/initialBoard';
import { Board as BoardType } from '@/types';

export default function Home() {
  const [board, setBoard] = useState<BoardType>(initialBoard);

  return (
    <main className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-full">
        <h1 className="text-4xl font-bold text-brand-navy mb-8">Kanban Board</h1>
        <Board board={board} setBoard={setBoard} />
      </div>
    </main>
  );
}
