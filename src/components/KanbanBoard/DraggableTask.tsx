import React from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { KanbanTask } from './KanbanBoard.types';
import { KanbanCard } from './KanbanCard';

interface DraggableTaskProps {
  task: KanbanTask;
  onEdit: (task: KanbanTask) => void;
}

export const DraggableTask: React.FC<DraggableTaskProps> = ({
  task,
  onEdit,
}) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: task.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className={isDragging ? 'opacity-50' : ''}
    >
      <KanbanCard
        task={task}
        isDragging={isDragging}
        onEdit={onEdit}
      />
    </div>
  );
};