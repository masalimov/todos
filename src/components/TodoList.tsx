import { useSubmit, useLoaderData, Link } from 'react-router';

import { type Todo } from '../interfaces';

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
         <h1 className="mb-4 text-2xl font-semibold">Дела</h1>

         <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
               <tbody className="divide-y divide-gray-100 bg-white">
                  {list.map((item: Todo) => (
                     <tr key={item.key} className="hover:bg-gray-50">
                        <td className="px-4 py-3">
                           <Link to={`/${item.key}`} className="text-gray-800 hover:underline">
                              {item.done ? (
                                 <del className="text-gray-500">{item.title}</del>
                              ) : (
                                 item.title
                              )}
                           </Link>
                        </td>

                        <td className="w-24 px-4 py-3">
                           <button
                              className={
                                 (item.done
                                    ? 'cursor-not-allowed bg-green-200 text-green-700 '
                                    : 'bg-green-600 text-white hover:bg-green-700 ') +
                                 'rounded-md px-3 py-1 focus:ring-2 focus:ring-green-300 focus:outline-none'
                              }
                              title="Выполнено"
                              disabled={item.done}
                              onClick={() => {
                                 void handleDoneClick(item.key);
                              }}
                           >
                              &#9745;
                           </button>
                        </td>

                        <td className="w-24 px-4 py-3">
                           <button
                              className="rounded-md bg-red-600 px-3 py-1 text-white hover:bg-red-700 focus:ring-2 focus:ring-red-300 focus:outline-none"
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
         </div>
      </section>
   );
}
