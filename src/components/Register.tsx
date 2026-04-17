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
            <div className="field">
               <label className="label">Адрес электронной почты</label>
               <div className="control">
                  <input
                     type="email"
                     value={email}
                     className="input"
                     onChange={(e) => setEmail(e.target.value)}
                  />
               </div>
               {errorEmail && <p className="help is-danger">{errorEmail}</p>}
            </div>
            {/* Поле password */}
            <div className="field">
               <label className="label">Пароль</label>
               <div className="control">
                  <input
                     type="password"
                     value={password}
                     className="input"
                     onChange={(e) => setPassword(e.target.value)}
                  />
               </div>
               {errorPassword && <p className="help is-danger">{errorPassword}</p>}
            </div>
            {/* Поле password confirm */}
            <div className="field">
               <label className="label">Повторите пароль</label>
               <div className="control">
                  <input
                     type="password"
                     value={passwordConfirm}
                     className="input"
                     onChange={(e) => setPasswordConfirm(e.target.value)}
                  />
               </div>
               {errorPasswordConfirm && <p className="help is-danger">{errorPasswordConfirm}</p>}
            </div>
            {/* Кнопки */}
            <div className="field is-grouped is-grouped-right">
               <div className="control">
                  <input type="reset" className="button is-varning is-light" value="Сброс" />
               </div>
               <div className="control">
                  <input type="submit" className="button is-primary" value="Зарегистрироваться" />
               </div>
            </div>
         </form>
      </section>
   );
}
