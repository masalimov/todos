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
      <section className="section">
         <div className="container is-max-tablet">
            <div className="box has-text-centered" role="alert" aria-labelledby="notfound-title">
               <div className="columns is-vcentered is-variable is-6 is-multiline">
                  <div className="column is-narrow is-centered">
                     <h1 className="title is-size-1 has-text-weight-bold" aria-hidden>
                        404
                     </h1>
                  </div>

                  <div className="column">
                     <h2 id="notfound-title" className="title is-4">
                        {title}
                     </h2>
                     <p className="content has-text-grey">{description}</p>

                     <div className="buttons is-centered">
                        <button
                           className="button is-dark"
                           onClick={() => {
                              void handleHome();
                           }}
                        >
                           На главную
                        </button>
                        <button
                           className="button is-light"
                           onClick={() => {
                              void handleBack();
                           }}
                        >
                           Назад
                        </button>
                     </div>

                     {showSearch && (
                        <form
                           className="field has-addons is-justify-content-center"
                           onSubmit={handleSearch}
                           aria-label="Поиск по сайту"
                        >
                           <div className="control">
                              <input
                                 className="input"
                                 name="q"
                                 type="text"
                                 placeholder="Поиск..."
                                 aria-label="Поиск"
                              />
                           </div>
                           <div className="control">
                              <button type="submit" className="button is-dark">
                                 Найти
                              </button>
                           </div>
                        </form>
                     )}
                  </div>
               </div>
            </div>
         </div>
      </section>
   );
};

export default NotFoundPage;
