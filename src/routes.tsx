import { createBrowserRouter } from 'react-router';

import App from './components/App';
import TodoList from './components/TodoList';
import TodoAdd from './components/TodoAdd';
import TodoDetail from './components/TodoDetail';
import NotFoundPage from './components/Error404';
import Register from './components/Register';
import Login from './components/Login';

import { getTodos, addTodo, getTodo, actTodo } from './api';
import { register, login, logout } from './auth';

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
         { path: 'register', Component: Register, action: register },
         { path: 'login', Component: Login, action: login },
         { path: 'logout', loader: logout },
      ],
   },
]);

export default router;
