// Inicializar tema antes de renderizar React
(function setInitialTheme() {
  try {
    const stored = localStorage.getItem('theme');
    const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    const theme = stored || (prefersDark ? 'dark' : 'light');
    if (theme === 'dark') document.documentElement.classList.add('dark');
    else document.documentElement.classList.remove('dark');
  } catch (e) { }
})();

import React, { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './Styles/tailwind.css'; // <-- IMPORTA TU CSS CENTRAL AQUÍ
import App from './App.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>
);
