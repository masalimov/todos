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
      <main className="flex min-h-[70vh] items-center justify-center bg-gray-50 px-6 py-12">
         <div
            className="w-full max-w-3xl rounded-2xl bg-white p-10 shadow-lg"
            role="alert"
            aria-labelledby="notfound-title"
         >
            <div className="flex flex-col items-center gap-8 md:flex-row">
               <h1
                  className="text-6xl leading-none font-extrabold text-gray-900 md:text-7xl"
                  aria-hidden
               >
                  404
               </h1>

               <div className="max-w-xl text-center md:text-left">
                  <h2 id="notfound-title" className="mb-2 text-xl font-semibold text-gray-900">
                     {title}
                  </h2>
                  <p className="mb-6 text-gray-500">{description}</p>

                  <div className="mb-4 flex flex-wrap justify-center gap-3 md:justify-start">
                     <button
                        onClick={() => {
                           void handleHome();
                        }}
                        className="inline-flex items-center rounded-lg bg-gray-900 px-4 py-2 text-white hover:bg-gray-800 focus:ring-2 focus:ring-gray-300 focus:outline-none"
                     >
                        На главную
                     </button>
                     <button
                        onClick={() => {
                           void handleBack();
                        }}
                        className="inline-flex items-center rounded-lg border border-gray-200 bg-white px-4 py-2 text-gray-900 hover:bg-gray-50 focus:ring-2 focus:ring-gray-200 focus:outline-none"
                     >
                        Назад
                     </button>
                  </div>

                  {showSearch && (
                     <form
                        className="flex justify-center gap-2 md:justify-start"
                        onSubmit={handleSearch}
                        aria-label="Поиск по сайту"
                     >
                        <input
                           name="q"
                           type="text"
                           placeholder="Поиск..."
                           aria-label="Поиск"
                           className="w-60 rounded-lg border border-gray-200 px-4 py-2 focus:ring-2 focus:ring-gray-200 focus:outline-none"
                        />
                        <button
                           type="submit"
                           className="rounded-lg bg-gray-900 px-4 py-2 text-white hover:bg-gray-800 focus:ring-2 focus:ring-gray-300 focus:outline-none"
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
