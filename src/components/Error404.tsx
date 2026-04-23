// NotFoundPage.tsx
import React from 'react';
import { useNavigate } from 'react-router';

export const NotFoundPage = () => {
   const title = 'Страница не найдена';
   const description = 'К сожалению, запрашиваемая страница отсутствует или была удалена.';
   const showSearch = true;
   const navigate = useNavigate();

   const handleHome = () => navigate('/', { replace: true });
   const handleBack = () => navigate(-1);

   const handleSearch = (e: React.SubmitEvent<HTMLFormElement>) => {
      e.preventDefault();
      const form = e.currentTarget;
      const input = (form.elements.namedItem('q') as HTMLInputElement | null)?.value?.trim();
      if (!input) return;
      // Пример: перенаправление на страницу поиска /search?q=...
      void navigate(`/search?q=${encodeURIComponent(input)}`);
   };

   return (
      <main className="min-h-[70vh] flex items-center justify-center px-6 py-12 bg-gray-50">
         <div
            className="w-full max-w-3xl bg-white rounded-2xl shadow-lg p-10"
            role="alert"
            aria-labelledby="notfound-title"
         >
            <div className="flex flex-col md:flex-row items-center gap-8">
               <h1
                  className="text-6xl md:text-7xl font-extrabold text-gray-900 leading-none"
                  aria-hidden
               >
                  404
               </h1>

               <div className="max-w-xl text-center md:text-left">
                  <h2 id="notfound-title" className="text-xl font-semibold text-gray-900 mb-2">
                     {title}
                  </h2>
                  <p className="text-gray-500 mb-6">{description}</p>

                  <div className="flex flex-wrap justify-center md:justify-start gap-3 mb-4">
                     <button
                        onClick={() => {
                           void handleHome();
                        }}
                        className="inline-flex items-center px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-300"
                     >
                        На главную
                     </button>
                     <button
                        onClick={() => {
                           void handleBack();
                        }}
                        className="inline-flex items-center px-4 py-2 bg-white border border-gray-200 text-gray-900 rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-200"
                     >
                        Назад
                     </button>
                  </div>

                  {showSearch && (
                     <form
                        className="flex justify-center md:justify-start gap-2"
                        onSubmit={handleSearch}
                        aria-label="Поиск по сайту"
                     >
                        <input
                           name="q"
                           type="text"
                           placeholder="Поиск..."
                           aria-label="Поиск"
                           className="px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-200 w-60"
                        />
                        <button
                           type="submit"
                           className="px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-300"
                        >
                           Найти
                        </button>
                     </form>
                  )}
               </div>
            </div>
         </div>
      </main>
   );
};

export default NotFoundPage;
