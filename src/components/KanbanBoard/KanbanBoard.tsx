import React, { useState } from 'react';
import useKanbanBoard from '@/hooks/useKanbanBoard';
import Column from './KanbanColumn';
import TaskModal from './TaskModal';
import type { KanbanTask } from './KanbanBoard.types';

export default function KanbanBoard() {
  const { columns, tasks, onTaskMove, onTaskCreate, onTaskUpdate, onTaskDelete } = useKanbanBoard();
  const [modalOpen, setModalOpen] = useState(false);
  const [activeTask, setActiveTask] = useState<KanbanTask | undefined>(undefined);

  const handleTaskClick = (id: string) => {
    setActiveTask(tasks[id]);
    setModalOpen(true);
  };

  const handleAdd = (colId: string) => {
    const id = 'task-' + Math.random().toString(36).slice(2,9);
    const newTask: KanbanTask = {
      id, title: 'New task', status: colId, createdAt: new Date().toISOString()
    };
    onTaskCreate?.(colId, newTask);
  };

  const handleDropToColumn = (taskId: string, toColumnId: string) => {
    const from = tasks[taskId].status;
    onTaskMove?.(taskId, from, toColumnId, 0);
  };

  return (
    <div className="overflow-x-auto">
      <div className="flex gap-4 px-3 py-2" style={{ minWidth: '1000px' }}>
        {columns.map(col => (
          <Column key={col.id} column={col} tasks={col.taskIds.map(id => tasks[id]).filter(Boolean)} onAdd={() => handleAdd(col.id)} onTaskClick={handleTaskClick} onDrop={(taskId) => handleDropToColumn(taskId, col.id)} />
        ))}
      </div>
      <TaskModal open={modalOpen} task={activeTask} onClose={() => setModalOpen(false)} onSave={(t) => onTaskUpdate?.(t.id, t)} onDelete={(id) => onTaskDelete?.(id)} />
    </div>
  );
}
