/*
import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
*/
import todos from "./todos";
import TodoList from "./todolist";

function App() {
   return (
      <>
         <div className="container">
            <nav className="navbar is-light">
               <div className="navbar-brand">
                  <span className="navbar-item is-uppercase">Todos</span>
               </div>
            </nav>
            <main className="content px-6 py-6">
               <TodoList todos={todos} />
            </main>
         </div>
      </>
   );
}

export default App;
