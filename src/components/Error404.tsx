// NotFoundPage.tsx
import React from 'react';
import { useNavigate } from 'react-router';

export const NotFoundPage = () => {
   const title = 'Страница не найдена';
   const description = 'К сожалению, запрашиваемая страница отсутствует или была удалена.';
   const showSearch = true;
   const navigate = useNavigate();

   const styles = {
      container: {
         minHeight: '70vh',
         display: 'flex',
         alignItems: 'center',
         justifyContent: 'center',
         padding: '24px',
         boxSizing: 'border-box' as const,
         textAlign: 'center' as const,
         color: '#222',
         fontFamily: 'Inter, Roboto, system-ui, sans-serif',
      },
      card: {
         maxWidth: 760,
         width: '100%',
         padding: '32px',
         borderRadius: 12,
         boxShadow: '0 6px 30px rgba(16,24,40,0.08)',
         background: 'linear-gradient(180deg,#fff,#fbfbff)',
      },
      code: {
         fontSize: 72,
         fontWeight: 700,
         margin: 0,
         color: '#111827',
      },
      title: {
         margin: '8px 0 12px',
         fontSize: 20,
         fontWeight: 600,
      },
      desc: {
         margin: '0 0 20px',
         color: '#4b5563',
      },
      actions: {
         display: 'flex',
         gap: 12,
         justifyContent: 'center',
         flexWrap: 'wrap' as const,
      },
      btnPrimary: {
         background: '#111827',
         color: '#fff',
         border: 'none',
         padding: '10px 16px',
         borderRadius: 8,
         cursor: 'pointer',
      },
      btnGhost: {
         background: 'transparent',
         color: '#111827',
         border: '1px solid rgba(17,24,39,0.08)',
         padding: '10px 16px',
         borderRadius: 8,
         cursor: 'pointer',
      },
      search: {
         marginTop: 16,
         display: 'flex',
         gap: 8,
         justifyContent: 'center',
      },
      input: {
         padding: '10px 12px',
         borderRadius: 8,
         border: '1px solid #e5e7eb',
         minWidth: 260,
      },
   };

   const handleHome = () => navigate('/', { replace: true });
   const handleBack = () => navigate(-1);

   const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      const form = e.currentTarget;
      const input = (form.elements.namedItem('q') as HTMLInputElement | null)?.value?.trim();
      if (!input) return;
      // Пример: перенаправление на страницу поиска /search?q=...
      void navigate(`/search?q=${encodeURIComponent(input)}`);
   };

   return (
      <section style={styles.container}>
         <div style={styles.card} role="alert" aria-labelledby="notfound-title">
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
                  <h2 id="notfound-title" style={styles.title}>
                     {title}
                  </h2>
                  <p style={styles.desc}>{description}</p>
                  <div style={styles.actions}>
                     <button
                        style={styles.btnPrimary}
                        onClick={() => {
                           void handleHome();
                        }}
                     >
                        На главную
                     </button>
                     <button
                        style={styles.btnGhost}
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
                           style={styles.input}
                        />
                        <button type="submit" style={styles.btnPrimary}>
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
