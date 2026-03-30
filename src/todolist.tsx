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
}

function TodoList({ todos }: TodoProps) {
   return (
      <section>
         <h1>Дела</h1>
         <table>
            <tbody>
               {todos.map((item: Todo) => (
                  <tr key={item.key}>
                     <td>
                        {item.done && <del>{item.title}</del>}
                        {!item.done && item.title}
                     </td>
                     <td>
                        <button title="Выполнено" disabled={item.done}>
                           &#9745;
                        </button>
                     </td>
                     <td>
                        <button title="Удалить">&#9746;</button>
                     </td>
                  </tr>
               ))}
            </tbody>
         </table>
      </section>
   );
}

export default TodoList;
