import { useState } from 'react';
import { useFetcher } from 'react-router';

export default function Login() {
   const [email, setEmail] = useState('');
   const [password, setPassword] = useState('');
   const fetcher = useFetcher();

   const handleFormSubmit = (evt: React.SubmitEvent) => {
      evt.preventDefault();
      void fetcher.submit({ email, password }, { action: '/login', method: 'POST' });
   };

   const handleFormReset = () => {
      setEmail('');
      setPassword('');
   };

   return (
      <section>
         <h1 className="text-2xl font-semibold mb-6">Вход</h1>

         <form onSubmit={handleFormSubmit} onReset={handleFormReset} className="max-w-md">
            {/* Поле email */}
            <div className="mb-4">
               <label className="block text-sm font-medium text-gray-700 mb-1">
                  Адрес электронной почты
               </label>
               <div>
                  <input
                     type="email"
                     value={email}
                     className="w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                     onChange={(e) => setEmail(e.target.value)}
                  />
               </div>
            </div>

            {/* Поле password */}
            <div className="mb-6">
               <label className="block text-sm font-medium text-gray-700 mb-1">Пароль</label>
               <div>
                  <input
                     type="password"
                     value={password}
                     className="w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                     onChange={(e) => setPassword(e.target.value)}
                  />
               </div>
            </div>

            {/* Кнопки */}
            <div className="flex justify-end space-x-3">
               <div>
                  <input
                     type="reset"
                     className="px-4 py-2 rounded-md bg-yellow-100 text-yellow-800 hover:bg-yellow-200 focus:outline-none focus:ring-2 focus:ring-yellow-300"
                     value="Сброс"
                  />
               </div>
               <div>
                  <input
                     type="submit"
                     className="px-4 py-2 rounded-md bg-indigo-600 text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-400"
                     value="Войти"
                  />
               </div>
            </div>
         </form>
      </section>
   );
}
