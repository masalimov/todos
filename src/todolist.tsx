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
  setDone: (key: number) => void;
}

function TodoList({ todos, setDone }: TodoProps) {
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
                    setDone(item.key);
                  }}
                >
                  &#9745;
                </button>
              </td>
              <td>
                <button className="button is-danger" title="Удалить">
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
