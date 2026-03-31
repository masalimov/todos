import { useState } from 'react';
import initialTodos from './todos';
import TodoList from './todolist';

function App() {
   const [todos, setTodos] = useState(initialTodos);

   const setDone = (key: number) => {
      const newTodos = [...todos];
      const deed = newTodos.find((current) => current.key === key);
      if (deed) {
         deed.done = true;
      }
      setTodos(newTodos);
   };

   const del = (key: number) => {
      const newTodos = todos.filter((current) => current.key !== key);
      setTodos(newTodos);
   };

   return (
      <>
         <div className="container">
            <nav className="navbar is-light">
               <div className="navbar-brand">
                  <span className="navbar-item is-uppercase">Todos</span>
               </div>
            </nav>
            <main className="content px-6 py-6">
               <TodoList todos={todos} setItemDone={setDone} delItem={del} />
            </main>
         </div>
      </>
   );
}

export default App;
