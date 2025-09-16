import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './globals.css';


import AppWithProvider from './AppWithProvider';

createRoot(document.getElementById('root') as HTMLElement).render(
  <StrictMode>
    <AppWithProvider />
  </StrictMode>,
);
