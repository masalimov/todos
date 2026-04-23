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
         <h1 className="text-2xl font-semibold mb-4">Дела</h1>

         <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
               <tbody className="bg-white divide-y divide-gray-100">
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

                        <td className="px-4 py-3 w-24">
                           <button
                              className={
                                 (item.done
                                    ? 'bg-green-200 text-green-700 cursor-not-allowed '
                                    : 'bg-green-600 hover:bg-green-700 text-white ') +
                                 'px-3 py-1 rounded-md focus:outline-none focus:ring-2 focus:ring-green-300'
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

                        <td className="px-4 py-3 w-24">
                           <button
                              className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded-md focus:outline-none focus:ring-2 focus:ring-red-300"
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
      // <section>
      //    <h1>Дела</h1>
      //    <table className="table is-hoverable is-fullwidth">
      //       <tbody>
      //          {list.map((item: Todo) => (
      //             <tr key={item.key}>
      //                <td>
      //                   <Link to={`/${item.key}`}>
      //                      {item.done && <del>{item.title}</del>}
      //                      {!item.done && item.title}
      //                   </Link>
      //                </td>
      //                <td>
      //                   <button
      //                      className="button is-success"
      //                      title="Выполнено"
      //                      disabled={item.done}
      //                      onClick={() => {
      //                         void handleDoneClick(item.key);
      //                      }}
      //                   >
      //                      &#9745;
      //                   </button>
      //                </td>
      //                <td>
      //                   <button
      //                      className="button is-danger"
      //                      title="Удалить"
      //                      onClick={() => {
      //                         void handleDelClick(item.key);
      //                      }}
      //                   >
      //                      &#9746;
      //                   </button>
      //                </td>
      //             </tr>
      //          ))}
      //       </tbody>
      //    </table>
      // </section>
   );
}
