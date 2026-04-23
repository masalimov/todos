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
            <nav className="bg-white border-b">
               <div className="flex items-center justify-between py-3">
                  <div className="flex items-center space-x-4">
                     <NavLink
                        to="/"
                        className={({ isActive }) =>
                           'text-sm uppercase font-medium' +
                           (isActive ? ' text-indigo-600' : ' text-gray-700')
                        }
                     >
                        {user ? user.email : 'Todos'}
                     </NavLink>

                     {/* Burger for mobile */}
                     <button
                        className={
                           showMenu
                              ? 'md:hidden inline-flex items-center justify-center p-2 rounded transition-transform transform rotate-90'
                              : 'md:hidden inline-flex items-center justify-center p-2 rounded'
                        }
                        onClick={handleBurgerClick}
                        aria-label="Toggle menu"
                     >
                        <span className="block w-5 h-0.5 bg-gray-700 mb-1"></span>
                        <span className="block w-5 h-0.5 bg-gray-700 mb-1"></span>
                        <span className="block w-5 h-0.5 bg-gray-700"></span>
                     </button>
                  </div>

                  <div className="hidden md:flex items-center space-x-4">
                     {user && (
                        <NavLink
                           to="/add"
                           className={({ isActive }) =>
                              'px-3 py-1 rounded text-sm' +
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
                              'px-3 py-1 rounded text-sm' +
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
                              'px-3 py-1 rounded text-sm' +
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
                           className="px-3 py-1 rounded text-sm text-gray-700 hover:bg-gray-100"
                        >
                           Выйти
                        </NavLink>
                     )}
                  </div>
               </div>

               {/* Mobile menu */}
               <div
                  className={showMenu ? 'md:hidden block px-4 pb-4' : 'md:hidden hidden'}
                  onClick={handleBurgerClick}
               >
                  <div className="flex flex-col space-y-2">
                     {user && (
                        <NavLink
                           to="/add"
                           className={({ isActive }) =>
                              'block px-3 py-2 rounded text-sm' +
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
                              'block px-3 py-2 rounded text-sm' +
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
                              'block px-3 py-2 rounded text-sm' +
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
                           className="block px-3 py-2 rounded text-sm text-gray-700 hover:bg-gray-100"
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
