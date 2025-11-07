import React from 'react';
import type { KanbanTask } from './KanbanBoard.types';
import { isOverdue, getInitials, formatDate, getPriorityColor } from '@/utils/task.utils';

interface Props {
  task: KanbanTask;
  onClick?: () => void;
  draggable?: boolean;
}

const KanbanCard: React.FC<Props> = ({ task, onClick, draggable = true }) => {
  return (
    <div
      role="button"
      tabIndex={0}
      aria-label={`${task.title}. Priority: ${task.priority}`}
      draggable={draggable}
      className={`bg-white border border-neutral-200 rounded-lg p-3 shadow-sm hover:shadow-md transition-shadow cursor-grab active:cursor-grabbing ${getPriorityColor(task.priority)}`}
      onClick={onClick}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onClick?.();
        }
      }}
    >
      <div className="flex items-start justify-between mb-2">
        <h4 className="font-medium text-sm text-neutral-900 line-clamp-2">{task.title}</h4>
        {task.priority && (
          <span className="text-xs px-2 py-0.5 rounded capitalize bg-neutral-100">{task.priority}</span>
        )}
      </div>
      {task.description && <p className="text-xs text-neutral-600 mb-2 line-clamp-2">{task.description}</p>}
      <div className="flex items-center justify-between">
        <div className="flex gap-1">
          {task.tags?.slice(0,3).map(t => <span key={t} className="text-xs bg-neutral-100 px-2 py-0.5 rounded">{t}</span>)}
        </div>
        {task.assignee && (
          <div className="w-6 h-6 bg-primary-500 rounded-full text-white text-xs flex items-center justify-center">
            {getInitials(task.assignee)}
          </div>
        )}
      </div>
      {task.dueDate && (
        <div className={`text-xs mt-2 ${isOverdue(task.dueDate) ? 'text-red-600' : 'text-neutral-500'}`}>
          Due: {formatDate(task.dueDate)}
        </div>
      )}
    </div>
  );
};

export default React.memo(KanbanCard);
