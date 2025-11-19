// Inicializar tema antes de renderizar React
(function setInitialTheme() {
  try {
    const stored = localStorage.getItem('theme');
    const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    const theme = stored || (prefersDark ? 'dark' : 'light');
    if (theme === 'dark') document.documentElement.classList.add('dark');
    else document.documentElement.classList.remove('dark');
  } catch (e) {}
})();

import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import './styles/tailwind.css'; // <-- importa tu CSS con las variables y @tailwind

const root = createRoot(document.getElementById('root'));
root.render(<App />);