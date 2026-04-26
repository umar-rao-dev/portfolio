import React, { useState, useEffect } from 'react';
import FloatingDock from './FloatingDock';

const Footer = () => {
  return (
    <footer className="py-12 border-t border-white/5 bg-black/20 backdrop-blur-md">
      <div className="container mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="text-xl font-bold tracking-tighter text-gradient">
          UMAR RAO
        </div>
        <p className="text-sm text-slate-500">
          &copy; {new Date().getFullYear()} Muhammad Umar Rao
        </p>
        <div className="flex items-center gap-6 text-slate-400">
        </div>
      </div>
    </footer>
  );
};

export default function Layout({ children }) {
  const [isDark, setIsDark] = useState(true);

  useEffect(() => {
    const root = window.document.documentElement;
    if (isDark) {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }, [isDark]);

  return (
    <div className="min-h-screen flex flex-col bg-transparent text-slate-900 dark:text-slate-100 transition-colors duration-300">
      <FloatingDock isDark={isDark} toggleTheme={() => setIsDark(!isDark)} />
      <main className="flex-grow">
        {children}
      </main>
      <Footer />
    </div>
  );
}
