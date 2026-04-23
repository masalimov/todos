import { useLoaderData } from 'react-router';

import { type Todo } from '../interfaces';

export default function TodoDetail() {
   const todo = useLoaderData<Todo>();

   return (
      <section>
         {todo.done && <p className="text-green-600 font-medium mb-2">Выполнено</p>}
         <h1 className="text-xl font-semibold mb-1">{todo.title}</h1>
         <p className="text-sm text-gray-500 mb-4">{todo.createdAt}</p>
         {todo.desc && <p className="text-gray-700 mb-4">{todo.desc}</p>}
         {todo.image && (
            <div className="mb-4">
               <img
                  src={todo.image}
                  alt="Иллюстрация"
                  className="max-w-full h-auto rounded-md shadow-sm"
               />
            </div>
         )}
      </section>

      // <section>
      //          {todo.done && <p className="has-text-success">Выполнено</p>}
      //          <h1>{todo.title}</h1>
      //          <p>{todo.createdAt}</p>
      //          {todo.desc && <p>{todo.desc}</p>}
      //          {todo.image && (
      //             <p>
      //                <img src={todo.image} alt="Иллюстрация" />
      //             </p>
      //          )}
      //       </section>
   );
}
