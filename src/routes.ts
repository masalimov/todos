import { createBrowserRouter } from 'react-router';

import App from './App';
import TodoList from './todolist';
import TodoAdd from './todoadd';

const router = createBrowserRouter([
   {
      path: '/',
      Component: App,
      children: [
         { index: true, Component: TodoList },
         { path: 'add', Component: TodoAdd },
      ],
   },
]);

export default router;
