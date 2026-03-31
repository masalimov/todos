interface Todo {
   title: string;
   desc: string;
   image: string;
   done: boolean;
   createdAt: string;
   key: number;
}

interface TodoProps {
   todos: Todo[];
   setItemDone: (key: number) => void;
   delItem: (key: number) => void;
}

function TodoList({ todos, setItemDone, delItem }: TodoProps) {
   return (
      <section>
         <h1>Дела</h1>
         <table className="table is-hoverable is-fullwidth">
            <tbody>
               {todos.map((item: Todo) => (
                  <tr key={item.key}>
                     <td>
                        {item.done && <del>{item.title}</del>}
                        {!item.done && item.title}
                     </td>
                     <td>
                        <button
                           className="button is-success"
                           title="Выполнено"
                           disabled={item.done}
                           onClick={() => {
                              setItemDone(item.key);
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
                              delItem(item.key);
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

export default TodoList;
