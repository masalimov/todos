import { createBrowserRouter } from 'react-router';

import App from './components/App';
import TodoList from './components/TodoList';
import TodoAdd from './components/TodoAdd';
import TodoDetail from './components/TodoDetail';
import NotFoundPage from './components/Error404';

import { getTodos, addTodo, getTodo, actTodo } from './api';

const router = createBrowserRouter([
   {
      path: '/',
      Component: App,
      children: [
         { index: true, Component: TodoList, loader: getTodos },
         { path: 'add', Component: TodoAdd, action: addTodo },
         {
            path: ':key',
            Component: TodoDetail,
            loader: getTodo,
            action: actTodo,
            errorElement: <NotFoundPage />,
         },
         // { path: '*', Component: NotFoundPage },
      ],
   },
]);

export default router;
