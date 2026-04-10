import { redirect, type ActionFunctionArgs, type Params } from 'react-router';

import todos, { type Todo } from './todos';

export function getTodos() {
   return todos;
}

export async function addTodo({ request }: ActionFunctionArgs) {
   const fd = await request.formData();
   const date = new Date();
   const newTodo: Todo = {
      title: fd.get('title') as string,
      desc: fd.get('desc') as string,
      image: fd.get('image') as string,
      done: false,
      createdAt: date.toLocaleString(),
      key: date.getTime(),
   };

   todos.push(newTodo);
   return redirect('/');
}

export function getTodo({ params }: { params: Params<'key'> }) {
   const key = params.key ? +params.key : 0;
   const todo = todos.find((current) => current.key === key);
   return todo;
}
