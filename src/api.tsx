import { redirect, type ActionFunctionArgs, type Params } from 'react-router';
import { getDatabase, ref, push, set, query, get, remove } from 'firebase/database';
import firebaseApp from './firebase';
import { getUserId } from './auth';

import { type Todo } from './interfaces';

const database = getDatabase(firebaseApp);

export async function getTodos(): Todo[] {
   const currentUserId = getUserId();
   if (!currentUserId) return redirect('/login');

   const r = ref(database, `users/${currentUserId}/todos`);
   const q = query(r);
   const s = await get(q);
   const res: Todo[] = [];
   s.forEach((doc) => {
      const __todo: Todo = doc.val() as Todo;
      __todo.key = doc.key;
      res.push(__todo);
   });
   return res;
}

export async function addTodo({ request }: ActionFunctionArgs): Promise<Response> {
   const currentUserId = getUserId();
   if (!currentUserId) return redirect('/login');

   const fd = await request.formData();
   const date = new Date();
   const newTodo: Todo = {
      title: fd.get('title') as string,
      desc: fd.get('desc') as string,
      image: fd.get('image') as string,
      done: false,
      createdAt: date.toLocaleString(),
      // key: date.getTime(),
   };

   // todos.push(newTodo);
   const db = ref(database, `users/${currentUserId}/todos`);
   const r = await push(db);
   await set(r, newTodo);
   return redirect('/');
}

export async function getTodo({ params }: { params: Params<'key'> }): Todo | undefined {
   const currentUserId = getUserId();
   if (!currentUserId) return redirect('/login');

   const r = ref(database, `users/${currentUserId}/todos/${params.key}`);
   const q = query(r);
   const s = await get(q);
   if (!s.exists()) throw new Error();
   return s.val() as Todo;
}

export function actTodo({ params, request }: ActionFunctionArgs): Response {
   const currentUserId = getUserId();
   if (!currentUserId) return redirect('/login');

   if (request.method === 'PATCH') {
      const r = ref(database, `users/${currentUserId}/todos/${params.key}/done`);
      void set(r, true);
   }
   if (todoIndex && request.method === 'DELETE') {
      const r = ref(database, `users/${currentUserId}/todos/${params.key}`);
      void remove(r);
   }
   return redirect('/');
}
