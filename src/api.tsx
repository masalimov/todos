import { redirect, type ActionFunctionArgs } from 'react-router';

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

export async function getTodo({ params }: { params: Promise<{ key: number }> }) {
   const key = (await params).key;
   const todo = todos.find((current) => current.key === key);
   return todo;
}
