import React from 'react';
import { motion } from 'framer-motion';
import { SKILLS } from '../../utils/constants';
import LucideIcon from '../ui/LucideIcon';

const CurvedLogoLoop = () => {
  return (
    <div className="relative mt-20 py-20 overflow-hidden">
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-[120%] h-[500px] border-t border-primary/20 rounded-[100%] opacity-50 blur-sm" />
      </div>
      
      <div className="flex w-max animate-marquee gap-16 px-12 relative">
        {[...SKILLS, ...SKILLS, ...SKILLS].map((skill, index) => {
          // Calculate vertical offset for curve
          const offset = Math.sin((index / 3) * Math.PI) * 40;
          
          return (
            <motion.div 
              key={index} 
              style={{ y: offset }}
              className="flex flex-col items-center gap-4 group"
            >
              <div className="w-20 h-20 rounded-3xl bg-white/5 border border-white/10 flex items-center justify-center text-primary group-hover:scale-125 group-hover:bg-primary group-hover:text-white transition-all duration-500 shadow-2xl group-hover:shadow-primary/40">
                <LucideIcon name={skill.icon} size={32} />
              </div>
              <span className="text-sm font-bold tracking-widest text-slate-500 group-hover:text-white transition-colors uppercase">
                {skill.name}
              </span>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

export default function Skills() {
  return (
    <section id="skills" className="py-24 md:py-40 relative overflow-hidden">
      <div className="w-full max-w-[1920px] mx-auto px-6 md:px-12 lg:px-20">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center lg:text-left"
        >
          <h2 className="text-5xl md:text-8xl font-chunk font-black mb-4 tracking-tighter italic"> <span className="text-gradient">SKILLS</span></h2>
          <div className="w-24 h-2 bg-primary rounded-full mx-auto lg:mx-0"></div>
        </motion.div>

        {/* Curved Logo Loop */}
        <CurvedLogoLoop />
      </div>
    </section>
  );
}
