import React, { useState } from 'react';
import { type Todo } from './todolist';

interface TodoAddProps {
   addItem: (deed: Todo) => void;
}

export default function TodoAdd({ addItem }: TodoAddProps) {
   const [title, setTitle] = useState('');
   const [desc, setDesc] = useState('');
   const [image, setImage] = useState('');

   const handleFormSubmit = (evt: React.SubmitEvent<HTMLFormElement>) => {
      // Prevent the browser from reloading the page
      evt.preventDefault();
      const date = new Date();
      const newDeed: Todo = {
         title,
         desc,
         image,
         done: false,
         createdAt: date.toLocaleString(),
         key: date.getTime(),
      };
      addItem(newDeed);
      evt.target?.reset();
   };

   const handleFormReset = () => {
      setTitle('');
      setDesc('');
      setImage('');
   };

   const handleImageChange = (evt: React.ChangeEvent) => {
      const file = (evt.target as HTMLInputElement).files?.[0];
      if (file) {
         const fileReader = new FileReader();
         fileReader.onload = () => {
            setImage(fileReader.result as string);
            console.log(fileReader.result);
         };
         fileReader.readAsDataURL(file);
      }
   };

   return (
      <section>
         <h1>Создание нового дела</h1>
         <form onSubmit={handleFormSubmit} onReset={handleFormReset}>
            <div className="field">
               <label className="label">Заголовок</label>
               <div className="control">
                  <input
                     className="input"
                     value={title}
                     onChange={(e) => setTitle(e.target.value)}
                  />
               </div>
            </div>
            <div className="field">
               <label className="label">Примечание</label>
               <div className="control">
                  <textarea
                     className="textarea"
                     value={desc}
                     onChange={(e) => setDesc(e.target.value)}
                  />
               </div>
            </div>
            <div className="field">
               <div className="file">
                  <label className="file-label">
                     <input
                        className="file-input"
                        type="file"
                        accept="image/*"
                        onChange={handleImageChange}
                     />
                     <span className="file-cta">
                        <span className="file-label">Графическая иллюстрация...</span>
                     </span>
                  </label>
               </div>
            </div>
            <div className="field is-grouped is-grouped-right">
               <div className="control">
                  <input type="reset" className="button is-warning is-light" value="Очистить" />
               </div>
               <div className="control">
                  <input type="submit" className="button is-primary" value="Создать дело" />
               </div>
            </div>
         </form>
      </section>
   );
}
