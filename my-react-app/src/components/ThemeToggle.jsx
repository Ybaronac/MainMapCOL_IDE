import React, { useEffect, useState } from 'react';
import { Sun, Moon } from 'lucide-react';


const ThemeToggle = () => {
  const [theme, setTheme] = useState(() => {
    try {
      return localStorage.getItem('theme') || (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
    } catch {
      return 'light';
    }
  });

  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'dark') root.classList.add('dark');
    else root.classList.remove('dark');
    try { localStorage.setItem('theme', theme); } catch { }
  }, [theme]);

  const toggle = () => setTheme(prev => (prev === 'dark' ? 'light' : 'dark'));

  return (
    <button
      type="button"
      onClick={toggle}
      aria-pressed={theme === 'dark'}
      aria-label="Toggle color theme"
      title={theme === 'dark' ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro'}
      className="inline-flex items-center justify-center w-10 h-10 rounded-full border transition-colors duration-150
                 bg-black text-white dark:bg-white dark:text-[#e5e5e5]
                 border-gray-200 dark:border-[#1d1e1e] shadow-sm "
    >
      {theme === 'dark' ? <Sun /> : <Moon />}
    </button>
  );
};

export default ThemeToggle;
