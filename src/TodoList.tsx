import { useSubmit, useLoaderData, Link } from 'react-router';

import { type Todo } from './todos';

export default function TodoList() {
   const list = useLoaderData<Todo[]>();
   const submit = useSubmit();

   const handleDoneClick = async (key: number) => {
      await submit(null, { action: `/${key}`, method: 'PATCH' });
   };

   const handleDelClick = async (key: number) => {
      await submit(null, { action: `/${key}`, method: 'DELETE' });
   };

   return (
      <section>
         <h1>Дела</h1>
         <table className="table is-hoverable is-fullwidth">
            <tbody>
               {list.map((item: Todo) => (
                  <tr key={item.key}>
                     <td>
                        <Link to={`/${item.key}`}>
                           {item.done && <del>{item.title}</del>}
                           {!item.done && item.title}
                        </Link>
                     </td>
                     <td>
                        <button
                           className="button is-success"
                           title="Выполнено"
                           disabled={item.done}
                           onClick={() => {
                              void handleDoneClick(item.key);
                           }}
                        >
                           &#9745;
                        </button>
                     </td>
                     <td>
                        <button
                           className="button is-danger"
                           title="Удалить"
                           onClick={() => {
                              void handleDelClick(item.key);
                           }}
                        >
                           &#9746;
                        </button>
                     </td>
                  </tr>
               ))}
            </tbody>
         </table>
      </section>
   );
}
