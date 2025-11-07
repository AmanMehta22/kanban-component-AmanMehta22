import React from 'react';
import KanbanBoard from '@/components/KanbanBoard/KanbanBoard';

export default function Home() {
  return (
    <div className="min-h-screen p-6">
      <h1 className="text-2xl font-semibold mb-4">Kanban Board - Demo</h1>
      <KanbanBoard />
    </div>
  );
}
