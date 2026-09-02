import { Board } from '@/types';

export const initialBoard: Board = {
  columns: [
    {
      id: 'col-1',
      title: 'To Do',
      cards: [
        { id: '1', title: 'Design dashboard layout', details: 'Create wireframes for the main dashboard interface' },
        { id: '2', title: 'Set up database schema', details: 'Define tables and relationships' },
        { id: '3', title: 'API authentication', details: 'Implement JWT token support' },
      ],
    },
    {
      id: 'col-2',
      title: 'In Progress',
      cards: [
        { id: '4', title: 'Build components library', details: 'React UI components with TailwindCSS' },
        { id: '5', title: 'Write documentation', details: 'API docs and setup guide' },
      ],
    },
    {
      id: 'col-3',
      title: 'In Review',
      cards: [
        { id: '6', title: 'Code review cycle', details: 'Review pull requests for quality' },
      ],
    },
    {
      id: 'col-4',
      title: 'Testing',
      cards: [
        { id: '7', title: 'Unit tests for API', details: 'Achieve 80%+ coverage' },
      ],
    },
    {
      id: 'col-5',
      title: 'Done',
      cards: [
        { id: '8', title: 'Project setup', details: 'Initialize repo and CI/CD' },
      ],
    },
  ],
};
