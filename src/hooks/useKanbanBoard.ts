import { useCallback, useState } from 'react';
import type { KanbanColumn, KanbanTask } from '@/components/KanbanBoard/KanbanBoard.types';

const sampleColumns: KanbanColumn[] = [
  { id: 'todo', title: 'To Do', color: '#6b7280', taskIds: ['task-1','task-2'], maxTasks: 10 },
  { id: 'in-progress', title: 'In Progress', color: '#3b82f6', taskIds: ['task-3'], maxTasks: 5 },
  { id: 'review', title: 'Review', color: '#f59e0b', taskIds: [], maxTasks: 3 },
  { id: 'done', title: 'Done', color: '#10b981', taskIds: ['task-4','task-5'] },
];

const sampleTasks: Record<string, KanbanTask> = {
  'task-1': { id: 'task-1', title: 'Implement drag and drop', description: 'Add D&D functionality', status: 'todo', priority: 'high', assignee: 'John Doe', tags: ['frontend'], createdAt: new Date().toISOString(), dueDate: undefined },
  'task-2': { id: 'task-2', title: 'Design task modal', description: 'Create modal', status: 'todo', priority: 'medium', assignee: 'Jane Smith', tags: ['design'], createdAt: new Date().toISOString() },
  'task-3': { id: 'task-3', title: 'Setup TypeScript', status: 'in-progress', priority: 'urgent', assignee: 'John Doe', tags: ['setup'], createdAt: new Date().toISOString() },
  'task-4': { id: 'task-4', title: 'Create project structure', description: 'Initial files', status: 'done', priority: 'low', assignee: 'Jane Smith', tags: ['setup'], createdAt: new Date().toISOString() },
  'task-5': { id: 'task-5', title: 'Install dependencies', status: 'done', priority: 'low', assignee: 'John Doe', tags: ['setup'], createdAt: new Date().toISOString() },
};

export default function useKanbanBoard() {
  const [columns, setColumns] = useState<KanbanColumn[]>(sampleColumns);
  const [tasks, setTasks] = useState<Record<string, KanbanTask>>(sampleTasks);

  const onTaskMove = useCallback((taskId: string, fromColumnId: string, toColumnId: string, newIndex: number) => {
    setColumns(prev => {
      const from = prev.find(c => c.id === fromColumnId);
      const to = prev.find(c => c.id === toColumnId);
      if (!from || !to) return prev;
      const fromTaskIds = Array.from(from.taskIds);
      const toTaskIds = Array.from(to.taskIds);
      const idx = fromTaskIds.indexOf(taskId);
      if (idx !== -1) fromTaskIds.splice(idx,1);
      toTaskIds.splice(newIndex,0,taskId);
      return prev.map(c => {
        if (c.id===from.id) return { ...c, taskIds: fromTaskIds };
        if (c.id===to.id) return { ...c, taskIds: toTaskIds };
        return c;
      });
    });
    setTasks(prev => {
      const t = { ...prev };
      if (t[taskId]) t[taskId] = { ...t[taskId], status: toColumnId };
      return t;
    });
  }, []);

  const onTaskCreate = useCallback((columnId: string, task: KanbanTask) => {
    setTasks(prev => ({ ...prev, [task.id]: task }));
    setColumns(prev => prev.map(c => c.id===columnId ? { ...c, taskIds: [...c.taskIds, task.id] } : c));
  }, []);

  const onTaskUpdate = useCallback((taskId: string, updates: Partial<KanbanTask>) => {
    setTasks(prev => ({ ...prev, [taskId]: { ...prev[taskId], ...updates } }));
  }, []);

  const onTaskDelete = useCallback((taskId: string) => {
    setTasks(prev => {
      const copy = { ...prev };
      delete copy[taskId];
      return copy;
    });
    setColumns(prev => prev.map(c => ({ ...c, taskIds: c.taskIds.filter(id => id !== taskId) })));
  }, []);

  return { columns, tasks, onTaskMove, onTaskCreate, onTaskUpdate, onTaskDelete };
}
