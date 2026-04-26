import React, { Suspense } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Hero3D from '../3d/Hero3D';
import { ArrowRight, Download } from 'lucide-react';
import { TITLES as DEFAULT_TITLES, HERO_SUBTITLE } from '../../utils/constants';

const RotatingTitle = () => {
  const TITLES = DEFAULT_TITLES;
  const [index, setIndex] = React.useState(0);

  React.useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % TITLES.length);
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="h-10 md:h-12 overflow-hidden block">
      <AnimatePresence mode="wait">
        <motion.div
          key={TITLES[index]}
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -20, opacity: 0 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
          className="text-primary font-bold tracking-[0.2em] uppercase text-xl md:text-3xl"
        >
          {TITLES[index]}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default function Hero() {
  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      <Suspense fallback={<div className="absolute inset-0 bg-transparent" />}>
        <Hero3D />
      </Suspense>

      <div className="w-full max-w-[1920px] mx-auto px-6 md:px-12 lg:px-20 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-center lg:text-left max-w-4xl lg:mx-0 mx-auto"
          >
            <div className="mb-10">
              <RotatingTitle />
            </div>

            <h1 className="text-7xl sm:text-8xl md:text-[11rem] font-gragio italic font-bold mb-10 text-slate-900 dark:text-white leading-[0.8] text-center lg:text-left tracking-[-0.05em]">
              Muhammad <span className="text-gradient block mt-4 not-italic font-display">Umar Rao</span>
            </h1>
            <p className="max-w-2xl mx-auto lg:mx-0 text-xl md:text-3xl text-slate-600 dark:text-slate-400 mb-14 leading-relaxed text-center lg:text-left font-medium opacity-90 tracking-tight">
              {HERO_SUBTITLE}
            </p>

            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-8">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-10 py-5 bg-primary text-white rounded-2xl font-bold text-lg shadow-2xl shadow-primary/30 flex items-center gap-3 transition-all hover:bg-primary-dark"
              >
                View Projects <ArrowRight size={22} />
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-10 py-5 bg-white/5 border border-white/10 dark:text-white text-slate-900 rounded-2xl font-bold text-lg backdrop-blur-xl flex items-center gap-3 transition-all hover:bg-white/10"
              >
                Contact Me
              </motion.button>
            </div>
          </motion.div>

          <div className="hidden lg:block relative h-[500px]">
            {/* The 3D element is already in the background, but we can add a secondary subtle effect here if needed */}
          </div>
        </div>
      </div>

      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce">
        <div className="w-8 h-12 rounded-full border-2 border-slate-400 flex justify-center p-2">
          <div className="w-1 h-3 bg-primary rounded-full animate-pulse"></div>
        </div>
      </div>
    </section>
  );
}
