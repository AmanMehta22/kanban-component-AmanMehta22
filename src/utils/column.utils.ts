import { KanbanColumn } from '@/components/KanbanBoard/KanbanBoard.types';

/**
 * Reorders tasks within a column
 */
export const reorderTasks = (
  tasks: string[],
  startIndex: number,
  endIndex: number
): string[] => {
  const result = Array.from(tasks);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);
  return result;
};

/**
 * Moves task between columns
 */
export const moveTaskBetweenColumns = (
  sourceColumn: string[],
  destColumn: string[],
  sourceIndex: number,
  destIndex: number
): { source: string[]; destination: string[] } => {
  const sourceClone = Array.from(sourceColumn);
  const destClone = Array.from(destColumn);
  const [removed] = sourceClone.splice(sourceIndex, 1);
  destClone.splice(destIndex, 0, removed);
  return {
    source: sourceClone,
    destination: destClone,
  };
};

/**
 * Checks if column is approaching WIP limit
 */
export const isApproachingLimit = (column: KanbanColumn): boolean => {
  if (!column.maxTasks) return false;
  return column.taskIds.length >= column.maxTasks * 0.8;
};

/**
 * Checks if column has reached WIP limit
 */
export const hasReachedLimit = (column: KanbanColumn): boolean => {
  if (!column.maxTasks) return false;
  return column.taskIds.length >= column.maxTasks;
};