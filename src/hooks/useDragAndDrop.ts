import { useState, useCallback } from 'react';

export const useDragAndDrop = () => {
  const [draggedItem, setDraggedItem] = useState<{
    id: string;
    type: 'task';
    data?: any;
  } | null>(null);

  const [dropTarget, setDropTarget] = useState<{
    columnId: string;
    index: number;
  } | null>(null);

  const handleDragStart = useCallback((id: string, data?: any) => {
    setDraggedItem({
      id,
      type: 'task',
      data
    });
  }, []);

  const handleDragOver = useCallback((columnId: string, index: number = 0) => {
    setDropTarget({
      columnId,
      index
    });
  }, []);

  const handleDragEnd = useCallback(() => {
    const result = {
      draggedItem,
      dropTarget
    };
    
    setDraggedItem(null);
    setDropTarget(null);
    
    return result;
  }, [draggedItem, dropTarget]);

  return {
    draggedItem,
    dropTarget,
    handleDragStart,
    handleDragOver,
    handleDragEnd,
  };
};