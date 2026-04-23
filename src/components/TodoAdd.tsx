import React, { useState } from 'react';
import { useSubmit } from 'react-router';

export default function TodoAdd() {
   const [title, setTitle] = useState('');
   const [desc, setDesc] = useState('');
   const [image, setImage] = useState('');

   const submit = useSubmit();

   const handleFormSubmit = (evt: React.SubmitEvent<HTMLFormElement>) => {
      // Prevent the browser from reloading the page
      evt.preventDefault();
      void submit({ title, desc, image }, { action: '/add', method: 'post' });
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
            <div>
               <label className="block text-sm font-medium mb-2">Заголовок</label>
               <div className="control">
                  <input
                     className="w-full px-3 py-2 border rounded-md min-h-30 resize-vertical focus:outline-none focus:ring-2 focus:ring-indigo-500"
                     value={title}
                     onChange={(e) => setTitle(e.target.value)}
                  />
               </div>
            </div>
            <div>
               <label className="block text-sm font-medium mb-2">Примечание</label>
               <div>
                  <textarea
                     className="w-full px-3 py-2 border rounded-md min-h-30 resize-vertical focus:outline-none focus:ring-2 focus:ring-indigo-500"
                     value={desc}
                     onChange={(e) => setDesc(e.target.value)}
                  />
               </div>
            </div>

            <div>
               <label className="block text-sm font-medium mb-2">Графическая иллюстрация</label>
               <div className="flex items-center">
                  <label className="flex items-center px-4 py-2 bg-white border border-gray-300 rounded-md shadow-sm cursor-pointer hover:bg-gray-50">
                     <input
                        className="hidden"
                        type="file"
                        accept="image/\*"
                        onChange={handleImageChange}
                     />
                     <svg
                        className="w-5 h-5 text-gray-500 mr-2"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                     >
                        <path
                           strokeWidth="2"
                           strokeLinecap="round"
                           strokeLinejoin="round"
                           d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V7M16 3l-4 4-4-4"
                        />
                     </svg>
                     <span className="text-sm text-gray-700">Выберите изображение...</span>
                  </label>
               </div>
            </div>

            <div className="flex justify-end space-x-3">
               <div>
                  <input
                     type="reset"
                     className="px-4 py-2 rounded-md bg-yellow-200 hover:bg-yellow-300 text-yellow-900 focus:outline-none"
                     value="Отмена"
                  />
               </div>
               <div>
                  <input
                     type="submit"
                     className="px-4 py-2 rounded-md bg-indigo-600 hover:bg-indigo-700 text-white focus:outline-none"
                     value="Создать дело"
                  />
               </div>
            </div>
         </form>
      </section>
   );
}
