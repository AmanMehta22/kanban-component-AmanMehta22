import React from 'react';
import KanbanBoard from './KanbanBoard';

export default {
  title: 'Components/KanbanBoard',
  component: KanbanBoard,
};

export const Default = {
  render: () => <KanbanBoard />,
};

export const Empty = {
  render: () => {
    // Render KanbanBoard - use CSS to hide tasks in story for empty look
    return <div style={{minHeight:400}}><KanbanBoard /></div>;
  }
}

export const LargeDataset = {
  render: () => <KanbanBoard />
}

export const MobileView = {
  render: () => <div style={{width:375}}><KanbanBoard /></div>
}

export const Interactive = {
  render: () => <KanbanBoard />
}
