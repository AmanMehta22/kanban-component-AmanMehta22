import React, { useState } from 'react';
import type { KanbanTask } from './KanbanBoard.types';

interface Props {
  open: boolean;
  task?: KanbanTask;
  onClose: () => void;
  onSave: (task: KanbanTask) => void;
  onDelete?: (taskId: string) => void;
}

const TaskModal: React.FC<Props> = ({ open, task, onClose, onSave, onDelete }) => {
  const [title, setTitle] = useState(task?.title || '');
  const [description, setDescription] = useState(task?.description || '');

  React.useEffect(() => {
    setTitle(task?.title || '');
    setDescription(task?.description || '');
  }, [task]);

  if (!open) return null;
  return (
    <div role="dialog" aria-modal="true" className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/30" onClick={onClose}></div>
      <div className="bg-white rounded-lg p-6 z-10 w-full max-w-md shadow-modal">
        <h2 className="text-lg font-semibold mb-3">Edit Task</h2>
        <label className="text-xs">Title</label>
        <input value={title} onChange={e=>setTitle(e.target.value)} className="w-full border p-2 rounded mb-3" />
        <label className="text-xs">Description</label>
        <textarea value={description} onChange={e=>setDescription(e.target.value)} className="w-full border p-2 rounded mb-3" />
        <div className="flex gap-2 justify-end">
          {task && <button onClick={() => { onDelete?.(task.id); onClose(); }} className="px-3 py-2 bg-red-50 border rounded">Delete</button>}
          <button onClick={onClose} className="px-3 py-2 border rounded">Cancel</button>
          <button onClick={() => { onSave?.({ ...(task as KanbanTask), title, description }); onClose(); }} className="px-3 py-2 bg-primary-500 text-white rounded">Save</button>
        </div>
      </div>
    </div>
  );
};

export default TaskModal;
