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
         <h1 className="mb-6 text-2xl font-semibold">Вход</h1>

         <form onSubmit={handleFormSubmit} onReset={handleFormReset} className="max-w-md">
            {/* Поле email */}
            <div className="mb-4">
               <label className="mb-1 block text-sm font-medium text-gray-700">
                  Адрес электронной почты
               </label>
               <div>
                  <input
                     type="email"
                     value={email}
                     className="w-full rounded-md border px-3 py-2 shadow-sm focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                     onChange={(e) => setEmail(e.target.value)}
                  />
               </div>
            </div>

            {/* Поле password */}
            <div className="mb-6">
               <label className="mb-1 block text-sm font-medium text-gray-700">Пароль</label>
               <div>
                  <input
                     type="password"
                     value={password}
                     className="w-full rounded-md border px-3 py-2 shadow-sm focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                     onChange={(e) => setPassword(e.target.value)}
                  />
               </div>
            </div>

            {/* Кнопки */}
            <div className="flex justify-end space-x-3">
               <div>
                  <input
                     type="reset"
                     className="rounded-md bg-yellow-100 px-4 py-2 text-yellow-800 hover:bg-yellow-200 focus:ring-2 focus:ring-yellow-300 focus:outline-none"
                     value="Сброс"
                  />
               </div>
               <div>
                  <input
                     type="submit"
                     className="rounded-md bg-indigo-600 px-4 py-2 text-white hover:bg-indigo-700 focus:ring-2 focus:ring-indigo-400 focus:outline-none"
                     value="Войти"
                  />
               </div>
            </div>
         </form>
      </section>
   );
}
