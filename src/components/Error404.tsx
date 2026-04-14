// NotFoundPage.tsx
import React from 'react';
import { useNavigate } from 'react-router';

export const NotFoundPage = () => {
   const title = 'Страница не найдена';
   const description = 'К сожалению, запрашиваемая страница отсутствует или была удалена.';
   const showSearch = true;
   const navigate = useNavigate();

   const styles = {
      code: {
         fontSize: 72,
         fontWeight: 700,
         margin: 0,
         color: '#111827',
      },
      search: {
         marginTop: 16,
         display: 'flex',
         gap: 8,
         justifyContent: 'center',
      },
   };

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
      <section className="container is-max-tablet">
         <div className="box" role="alert" aria-labelledby="notfound-title">
            <div
               style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 24,
                  justifyContent: 'center',
                  flexWrap: 'wrap',
               }}
            >
               <h1 style={styles.code} aria-hidden>
                  404
               </h1>
               <div style={{ maxWidth: 420 }}>
                  <h2 id="notfound-title" className="title is-4">
                     {title}
                  </h2>
                  <p>{description}</p>
                  <div className="block has-text-centered">
                     <button
                        className="button is-primary"
                        onClick={() => {
                           void handleHome();
                        }}
                     >
                        На главную
                     </button>
                     <button
                        className="button is-primary is-light"
                        onClick={() => {
                           void handleBack();
                        }}
                     >
                        Назад
                     </button>
                  </div>

                  {showSearch && (
                     <form
                        style={styles.search}
                        onSubmit={handleSearch}
                        aria-label="Поиск по сайту"
                     >
                        <input
                           name="q"
                           placeholder="Поиск..."
                           aria-label="Поиск"
                           className="input is-info"
                        />
                        <button type="submit" className="button is-info">
                           Найти
                        </button>
                     </form>
                  )}
               </div>
            </div>
         </div>
      </section>
   );
};

export default NotFoundPage;
