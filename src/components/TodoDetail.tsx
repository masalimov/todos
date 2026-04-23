import { useLoaderData } from 'react-router';

import { type Todo } from '../interfaces';

export default function TodoDetail() {
   const todo = useLoaderData<Todo>();

   return (
      <section>
         {todo.done && <p className="mb-2 font-medium text-green-600">Выполнено</p>}
         <h1 className="mb-1 text-xl font-semibold">{todo.title}</h1>
         <p className="mb-4 text-sm text-gray-500">{todo.createdAt}</p>
         {todo.desc && <p className="mb-4 text-gray-700">{todo.desc}</p>}
         {todo.image && (
            <div className="mb-4">
               <img
                  src={todo.image}
                  alt="Иллюстрация"
                  className="h-auto max-w-full rounded-md shadow-sm"
               />
            </div>
         )}
      </section>
   );
}
