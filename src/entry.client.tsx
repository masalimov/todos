import { StrictMode } from 'react';
import { hydrateRoot } from 'react-dom/client';
import { HydratedRouter } from 'react-router/dom';
import 'bulma/css/bulma.css';

hydrateRoot(
   document,
   <StrictMode>
      <HydratedRouter />
   </StrictMode>,
);
