import { redirect, type ActionFunctionArgs, type Params } from 'react-router';

import todos, { type Todo } from './todos';

export function getTodos(): Todo[] {
   return todos;
}

export async function addTodo({ request }: ActionFunctionArgs): Promise<Response> {
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

export function getTodo({ params }: { params: Params<'key'> }): Todo | undefined {
   const key = params.key ? +params.key : 0;
   const todo = todos.find((current) => current.key === key);
   return todo;
}

export function actTodo({ params, request }: ActionFunctionArgs): Response {
   const key = params.key ? +params.key : 0;
   const todoIndex = todos.findIndex((current) => current.key === key);

   if (todoIndex && request.method === 'PATCH') {
      todos[todoIndex].done = true;
   }
   if (todoIndex && request.method === 'DELETE') {
      todos.splice(todoIndex, 1);
   }
   return redirect('/');
}
