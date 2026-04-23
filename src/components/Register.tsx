import { useState } from 'react';
import { useFetcher } from 'react-router';

export default function Register() {
   const [email, setEmail] = useState('');
   const [password, setPassword] = useState('');
   const [passwordConfirm, setPasswordConfirm] = useState('');
   const [errorEmail, setErrorEmail] = useState('');
   const [errorPassword, setErrorPassword] = useState('');
   const [errorPasswordConfirm, setErrorPasswordConfirm] = useState('');

   const fetcher = useFetcher();

   const handleFormSubmit = (evt: React.SubmitEvent) => {
      evt.preventDefault();
      if (validate())
         void fetcher.submit({ email, password }, { action: '/register', method: 'POST' });
   };

   const handleFormReset = () => {
      setEmail('');
      setPassword('');
      setPasswordConfirm('');
   };

   const resetErrorMessages = () => {
      setErrorEmail('');
      setErrorPassword('');
      setErrorPasswordConfirm('');
   };

   const validate = () => {
      resetErrorMessages();

      if (!email) {
         setErrorEmail('Адрес электронной почты не указан!');
         return false;
      }
      if (!password) {
         setErrorPassword('Пароль не указан!');
         return false;
      }
      if (!passwordConfirm) {
         setErrorPasswordConfirm('Повтор пароля не указан!');
         return false;
      }
      if (password !== passwordConfirm) {
         setErrorPassword('Введённые пароли не совпадают!');
         setErrorPasswordConfirm('Введённые пароли не совпадают!');
         return false;
      }
      return true;
   };

   if (fetcher.data) {
      resetErrorMessages();
      if (fetcher.data === 'auth/email-already-in-use') {
         setErrorEmail('Посетитель с таким адресом электронной почты уже зарегистрирован');
      } else if (fetcher.data === 'auth/weak-password') {
         setErrorPassword('Слишком простой пароль');
         setErrorPasswordConfirm('Слишком простой пароль');
      }
      fetcher.reset();
      // fetcher.data = undefined;
   }

   return (
      <section>
         <h1>Регистрация</h1>
         <form onSubmit={handleFormSubmit} onReset={handleFormReset}>
            {/* Поле email */}
            <div className="block text-sm font-medium mb-2">
               <label className="label">Адрес электронной почты</label>
               <div className="control">
                  <input
                     type="email"
                     value={email}
                     className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                     onChange={(e) => setEmail(e.target.value)}
                  />
               </div>
               {errorEmail && <p className="mt-2 text-sm text-red-600">{errorEmail}</p>}
            </div>
            {/* Поле password */}
            <div>
               <label className="block text-sm font-medium mb-2">Пароль</label>
               <div>
                  <input
                     type="password"
                     value={password}
                     className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                     onChange={(e) => setPassword(e.target.value)}
                  />
               </div>
               {errorPassword && <p className="mt-2 text-sm text-red-600">{errorPassword}</p>}
            </div>

            {/* Поле password confirm */}
            <div>
               <label className="block text-sm font-medium mb-2">Повторите пароль</label>
               <div>
                  <input
                     type="password"
                     value={passwordConfirm}
                     className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                     onChange={(e) => setPasswordConfirm(e.target.value)}
                  />
               </div>
               {errorPasswordConfirm && (
                  <p className="mt-2 text-sm text-red-600">{errorPasswordConfirm}</p>
               )}
            </div>

            {/* Кнопки */}
            <div className="flex justify-end space-x-3">
               <div>
                  <input
                     type="reset"
                     className="px-4 py-2 rounded-md bg-yellow-200 hover:bg-yellow-300 text-yellow-900 focus:outline-none"
                     value="Сброс"
                  />
               </div>
               <div>
                  <input
                     type="submit"
                     className="px-4 py-2 rounded-md bg-indigo-600 hover:bg-indigo-700 text-white focus:outline-none"
                     value="Зарегистрироваться"
                  />
               </div>
            </div>
         </form>
      </section>
   );
}
