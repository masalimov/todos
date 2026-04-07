import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import 'bulma/css/bulma.css';
// import App from './App.tsx';
import { RouterProvider } from 'react-router';
import router from './routes.tsx';

createRoot(document.getElementById('root')!).render(
   <StrictMode>
      {/* <App /> */}
      <RouterProvider router={router} />
   </StrictMode>,
);
