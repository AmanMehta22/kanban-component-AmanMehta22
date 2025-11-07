import { format, isAfter } from 'date-fns';

/**
 * Checks if a task is overdue
 */
export const isOverdue = (dueDate: Date): boolean => {
  return isAfter(new Date(), dueDate);
};

/**
 * Gets initials from a name
 */
export const getInitials = (name: string): string => {
  return name
    .split(' ')
    .map(part => part[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);
};

/**
 * Calculates priority color classes
 */
export const getPriorityColor = (priority: string): string => {
  const colors = {
    low: 'border-l-blue-500 bg-blue-50 text-blue-700',
    medium: 'border-l-yellow-500 bg-yellow-50 text-yellow-700',
    high: 'border-l-orange-500 bg-orange-50 text-orange-700',
    urgent: 'border-l-red-500 bg-red-50 text-red-700',
  };
  return colors[priority as keyof typeof colors] || colors.medium;
};

/**
 * Formats date for display
 */
export const formatDate = (date: Date): string => {
  return format(date, 'MMM dd, yyyy');
};

/**
 * Creates a new task with default values
 */
export const createNewTask = (columnId: string) => {
  return {
    title: '',
    description: '',
    status: columnId,
    priority: 'medium' as const,
    tags: [],
    createdAt: new Date(),
  };
};

/**
 * Validates task data
 */
export const validateTask = (task: any): string | null => {
  if (!task.title?.trim()) {
    return 'Title is required';
  }
  if (task.dueDate && isAfter(new Date(), task.dueDate)) {
    return 'Due date cannot be in the past';
  }
  return null;
};