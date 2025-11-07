import React from 'react';
import KanbanCard from './KanbanCard';
import type { KanbanColumn as ColType, KanbanTask } from './KanbanBoard.types';

interface Props {
  column: ColType;
  tasks: KanbanTask[];
  onAdd?: () => void;
  onTaskClick?: (taskId: string) => void;
  onDrop?: (taskId: string, index: number) => void;
}

const Column: React.FC<Props> = ({ column, tasks, onAdd, onTaskClick, onDrop }) => {
  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    const taskId = e.dataTransfer.getData('text/taskId');
    if (taskId && onDrop) onDrop(taskId, tasks.length);
  };

  return (
    <section role="region" aria-label={`${column.title} column. ${column.taskIds.length} tasks.`} className="w-80 flex-shrink-0">
      <div className="sticky top-0 bg-white p-3 border border-b-neutral-200 rounded-t-lg">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-sm font-semibold">{column.title}</h3>
            <div className="text-xs text-neutral-500">{column.taskIds.length} tasks</div>
          </div>
        </div>
      </div>
      <div className="p-3 space-y-3" onDragOver={(e) => e.preventDefault()} onDrop={handleDrop}>
        {tasks.length === 0 && <div className="text-xs text-neutral-500 p-3">No tasks. Click + to add.</div>}
        {tasks.map(task => (
          <div key={task.id} draggable onDragStart={(e) => e.dataTransfer.setData('text/taskId', task.id)}>
            <KanbanCard task={task} onClick={() => onTaskClick?.(task.id)} />
          </div>
        ))}
      </div>
      <div className="p-3">
        <button onClick={onAdd} className="text-sm w-full bg-neutral-50 border border-neutral-200 py-2 rounded">+ Add Task</button>
      </div>
    </section>
  );
};

export default Column;
