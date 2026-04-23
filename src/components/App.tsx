import { Outlet, NavLink } from 'react-router';
import { useState, useEffect } from 'react';
import { type User } from 'firebase/auth';

import { setStateChangeHandler } from '../auth';

function App() {
   const [showMenu, setShowMenu] = useState(false);
   const [user, setUser] = useState<User | null>(null);

   const authStateChanged = (__user: User) => setUser(__user);

   useEffect(() => {
      const unsubscribe = setStateChangeHandler({ func: authStateChanged });
      return () => {
         unsubscribe();
      };
   }, []);

   const handleBurgerClick = (evt: React.MouseEvent) => {
      evt.preventDefault();
      setShowMenu(!showMenu);
   };

   return (
      <>
         <div className="container mx-auto px-4">
            <nav className="border-b bg-white">
               <div className="flex items-center justify-between py-3">
                  <div className="flex items-center space-x-4">
                     <NavLink
                        to="/"
                        className={({ isActive }) =>
                           'text-sm font-medium uppercase' +
                           (isActive ? ' text-indigo-600' : ' text-gray-700')
                        }
                     >
                        {user ? user.email : 'Todos'}
                     </NavLink>

                     {/* Burger for mobile */}
                     <button
                        className={
                           showMenu
                              ? 'inline-flex rotate-90 transform items-center justify-center rounded p-2 transition-transform md:hidden'
                              : 'inline-flex items-center justify-center rounded p-2 md:hidden'
                        }
                        onClick={handleBurgerClick}
                        aria-label="Toggle menu"
                     >
                        <span className="mb-1 block h-0.5 w-5 bg-gray-700"></span>
                        <span className="mb-1 block h-0.5 w-5 bg-gray-700"></span>
                        <span className="block h-0.5 w-5 bg-gray-700"></span>
                     </button>
                  </div>

                  <div className="hidden items-center space-x-4 md:flex">
                     {user && (
                        <NavLink
                           to="/add"
                           className={({ isActive }) =>
                              'rounded px-3 py-1 text-sm' +
                              (isActive
                                 ? ' bg-indigo-50 text-indigo-600'
                                 : ' text-gray-700 hover:bg-gray-100')
                           }
                        >
                           Создать дело
                        </NavLink>
                     )}

                     {!user && (
                        <NavLink
                           to="/login"
                           className={({ isActive }) =>
                              'rounded px-3 py-1 text-sm' +
                              (isActive
                                 ? ' bg-indigo-50 text-indigo-600'
                                 : ' text-gray-700 hover:bg-gray-100')
                           }
                        >
                           Войти
                        </NavLink>
                     )}

                     {!user && (
                        <NavLink
                           to="/register"
                           className={({ isActive }) =>
                              'rounded px-3 py-1 text-sm' +
                              (isActive
                                 ? ' bg-indigo-50 text-indigo-600'
                                 : ' text-gray-700 hover:bg-gray-100')
                           }
                        >
                           Зарегистрироваться
                        </NavLink>
                     )}

                     {user && (
                        <NavLink
                           to="/logout"
                           className="rounded px-3 py-1 text-sm text-gray-700 hover:bg-gray-100"
                        >
                           Выйти
                        </NavLink>
                     )}
                  </div>
               </div>

               {/* Mobile menu */}
               <div
                  className={showMenu ? 'block px-4 pb-4 md:hidden' : 'hidden md:hidden'}
                  onClick={handleBurgerClick}
               >
                  <div className="flex flex-col space-y-2">
                     {user && (
                        <NavLink
                           to="/add"
                           className={({ isActive }) =>
                              'block rounded px-3 py-2 text-sm' +
                              (isActive
                                 ? ' bg-indigo-50 text-indigo-600'
                                 : ' text-gray-700 hover:bg-gray-100')
                           }
                        >
                           Создать дело
                        </NavLink>
                     )}

                     {!user && (
                        <NavLink
                           to="/login"
                           className={({ isActive }) =>
                              'block rounded px-3 py-2 text-sm' +
                              (isActive
                                 ? ' bg-indigo-50 text-indigo-600'
                                 : ' text-gray-700 hover:bg-gray-100')
                           }
                        >
                           Войти
                        </NavLink>
                     )}

                     {!user && (
                        <NavLink
                           to="/register"
                           className={({ isActive }) =>
                              'block rounded px-3 py-2 text-sm' +
                              (isActive
                                 ? ' bg-indigo-50 text-indigo-600'
                                 : ' text-gray-700 hover:bg-gray-100')
                           }
                        >
                           Зарегистрироваться
                        </NavLink>
                     )}

                     {user && (
                        <NavLink
                           to="/logout"
                           className="block rounded px-3 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        >
                           Выйти
                        </NavLink>
                     )}
                  </div>
               </div>
            </nav>

            <main className="content px-6 py-6">
               <Outlet />
            </main>
         </div>
      </>
   );
}

export default App;
