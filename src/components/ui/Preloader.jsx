import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Preloader() {
  return (
    <motion.div
      initial={{ y: 0 }}
      exit={{ 
        y: "-100%",
        rotateX: -10,
        scale: 1.1,
        transition: { 
          duration: 1.2, 
          ease: [0.76, 0, 0.24, 1],
          delay: 0.5 
        } 
      }}
      className="fixed inset-0 z-[1000] flex items-center justify-center bg-slate-950 preserve-3d"
    >
      {/* Peeling Effect Shadow */}
      <motion.div 
        initial={{ opacity: 0 }}
        exit={{ opacity: 0.3 }}
        className="absolute inset-0 bg-black pointer-events-none"
      />
      
      <div className="flex flex-col items-center relative z-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center"
        >
          <h1 className="text-6xl md:text-8xl font-display font-bold tracking-tighter text-white mb-2">
            UMAR <span className="text-primary">RAO</span>
          </h1>
          <div className="h-1 w-24 bg-primary mx-auto rounded-full" />
        </motion.div>
      </div>

      {/* Peel corner effect */}
      <motion.div
        initial={{ x: "100%", y: "100%" }}
        exit={{ x: "-100%", y: "-100%" }}
        transition={{ duration: 1.5, ease: "easeInOut" }}
        className="absolute bottom-0 right-0 w-full h-full bg-gradient-to-tl from-white/10 to-transparent pointer-events-none"
      />
    </motion.div>
  );
}
