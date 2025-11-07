import React from 'react';
import { clsx } from 'clsx';
import { KanbanColumn as KanbanColumnType, KanbanTask } from './KanbanBoard.types';
import { KanbanCard } from './KanbanCard';
import { Button } from '@/components/primitives/Button';
import { isApproachingLimit, hasReachedLimit } from '@/utils/column.utils';

interface KanbanColumnProps {
  column: KanbanColumnType;
  tasks: KanbanTask[];
  isOverColumn: boolean;
  draggedTaskId: string | null;
  onTaskCreate: (columnId: string) => void;
  onTaskEdit: (task: KanbanTask) => void;
  onTaskDelete: (taskId: string) => void;
  onDragStart: (taskId: string, data?: any) => void;
  onDragOver: (columnId: string, index: number) => void;
  onDragEnd: (taskId: string) => void;
}

export const KanbanColumn: React.FC<KanbanColumnProps> = ({
  column,
  tasks,
  isOverColumn,
  draggedTaskId,
  onTaskCreate,
  onTaskEdit,
  onTaskDelete,
  onDragStart,
  onDragOver,
  onDragEnd,
}) => {
  const handleColumnDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    onDragOver(column.id, tasks.length);
  };

  const handleTaskDragStart = (taskId: string) => {
    onDragStart(taskId, { task: tasks.find(t => t.id === taskId) });
  };

  const handleTaskDragOver = (e: React.DragEvent, index: number) => {
    e.preventDefault();
    onDragOver(column.id, index);
  };

  const handleTaskDragEnd = (taskId: string) => {
    onDragEnd(taskId);
  };

  const isLimitApproaching = isApproachingLimit(column);
  const isLimitReached = hasReachedLimit(column);

  return (
    <div
      className="flex-shrink-0 w-80 kanban-column smooth-transition"
      onDragOver={handleColumnDragOver}
    >
      <div className="p-4 border-b border-neutral-200">
        <div className="flex items-center justify-between mb-2">
          <h3 className="font-semibold text-neutral-900">{column.title}</h3>
          <span className="text-sm text-neutral-500 bg-neutral-200 px-2 py-1 rounded">
            {tasks.length}
            {column.maxTasks && ` / ${column.maxTasks}`}
          </span>
        </div>
        
        {column.maxTasks && (
          <div className="w-full bg-neutral-200 rounded-full h-2">
            <div
              className={clsx(
                'h-2 rounded-full transition-all',
                isLimitReached && 'bg-error-500',
                isLimitApproaching && !isLimitReached && 'bg-warning-500',
                !isLimitApproaching && !isLimitReached && 'bg-success-500'
              )}
              style={{
                width: `${Math.min((tasks.length / column.maxTasks) * 100, 100)}%`,
              }}
            />
          </div>
        )}
      </div>

      <div
        className={clsx(
          'p-4 space-y-3 min-h-96 max-h-[70vh] overflow-y-auto custom-scrollbar transition-colors',
          isOverColumn && 'bg-primary-50'
        )}
      >
        {tasks.map((task, index) => (
          <div
            key={task.id}
            draggable
            onDragStart={() => handleTaskDragStart(task.id)}
            onDragOver={(e) => handleTaskDragOver(e, index)}
            onDragEnd={() => handleTaskDragEnd(task.id)}
            className={clsx(
              'transition-all',
              draggedTaskId === task.id && 'opacity-50'
            )}
          >
            <KanbanCard
              task={task}
              isDragging={draggedTaskId === task.id}
              onEdit={onTaskEdit}
              onDelete={onTaskDelete}
            />
          </div>
        ))}
        
        {tasks.length === 0 && (
          <div 
            className="text-center py-8 text-neutral-500 border-2 border-dashed border-neutral-300 rounded-lg"
            onDragOver={(e) => handleTaskDragOver(e, 0)}
          >
            <p className="text-sm">No tasks yet</p>
            <p className="text-xs mt-1">Drag tasks here or create a new one</p>
          </div>
        )}
      </div>

      <div className="p-4 border-t border-neutral-200">
        <Button
          variant="ghost"
          size="sm"
          className="w-full"
          onClick={() => onTaskCreate(column.id)}
          disabled={isLimitReached}
        >
          + Add Task
        </Button>
      </div>
    </div>
  );
};