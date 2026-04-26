import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, useScroll, useTransform, useSpring } from 'framer-motion';
import { Home, User, Code, Briefcase, Mail, Moon, Sun, Monitor } from 'lucide-react';

const navLinks = [
  { name: 'Home', href: '#home', icon: Home },
  { name: 'About', href: '#about', icon: User },
  { name: 'Skills', href: '#skills', icon: Code },
  { name: 'Projects', href: '#projects', icon: Briefcase },
  { name: 'Contact', href: '#contact', icon: Mail },
];

const NavItem = ({ link, isDark }) => {
  const [isHovered, setIsHovered] = useState(false);
  const Icon = link.icon;

  return (
    <div 
      className="relative flex flex-col items-center justify-center group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <AnimatePresence>
        {isHovered && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.8 }}
            animate={{ opacity: 1, y: -45, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.8 }}
            className="absolute px-3 py-1.5 bg-black/80 dark:bg-white/10 backdrop-blur-md text-white dark:text-white text-xs font-bold rounded-lg border border-white/10 whitespace-nowrap z-[100]"
          >
            {link.name}
            <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-black/80 dark:bg-white/10 rotate-45 border-r border-b border-white/10"></div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.a
        href={link.href}
        whileHover={{ scale: 1.2, y: -5 }}
        whileTap={{ scale: 0.9 }}
        className="w-12 h-12 flex items-center justify-center rounded-2xl bg-white/5 dark:bg-white/5 border border-white/10 hover:border-primary/50 hover:bg-primary/10 transition-colors shadow-lg"
      >
        <Icon size={22} className="group-hover:text-primary transition-colors" />
      </motion.a>
    </div>
  );
};

export default function FloatingDock({ isDark, toggleTheme }) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="fixed top-6 left-1/2 -translate-x-1/2 z-[100] w-fit px-4 py-3 rounded-[2.5rem] bg-white/5 dark:bg-black/20 backdrop-blur-2xl border border-white/10 shadow-2xl flex items-center gap-4">
      <div className="flex items-center gap-4">
        {navLinks.map((link) => (
          <NavItem key={link.name} link={link} isDark={isDark} />
        ))}
      </div>
      
      <div className="w-px h-8 bg-white/10 mx-2"></div>
      
      <motion.button
        onClick={toggleTheme}
        whileHover={{ scale: 1.2 }}
        whileTap={{ scale: 0.9 }}
        className="w-12 h-12 flex items-center justify-center rounded-2xl bg-white/5 dark:bg-white/5 border border-white/10 hover:bg-primary/10 transition-colors shadow-lg"
      >
        {isDark ? <Sun size={22} className="text-primary" /> : <Moon size={22} />}
      </motion.button>
    </div>
  );
}
