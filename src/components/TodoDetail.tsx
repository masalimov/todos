import { useLoaderData } from 'react-router';

import { type Todo } from '../todos';

export default function TodoDetail() {
   const todo = useLoaderData<Todo>();

   return (
      <section>
         {todo.done && <p className="has-text-success">Выполнено</p>}
         <h1>{todo.title}</h1>
         <p>{todo.createdAt}</p>
         {todo.desc && <p>{todo.desc}</p>}
         {todo.image && (
            <p>
               <img src={todo.image} alt="Иллюстрация" />
            </p>
         )}
      </section>
   );
}
