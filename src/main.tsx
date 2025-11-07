import React from 'react'
import ReactDOM from 'react-dom/client'
import './styles/globals.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <div className="p-8">
      <h1 className="text-2xl font-bold text-neutral-900 mb-4">Kanban Component Development</h1>
      <p className="text-neutral-600">Run Storybook to see the component: npm run storybook</p>
    </div>
  </React.StrictMode>,
)