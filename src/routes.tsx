import { createBrowserRouter } from 'react-router';

import App from './App';
import TodoList from './TodoList';
import TodoAdd from './TodoAdd';

import { getTodos, addTodo } from './api';

const router = createBrowserRouter([
   {
      path: '/',
      Component: App,
      children: [
         { index: true, Component: TodoList, loader: getTodos },
         { path: 'add', Component: TodoAdd, action: addTodo },
      ],
   },
]);

export default router;
