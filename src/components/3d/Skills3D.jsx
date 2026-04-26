import React from 'react';
import { motion } from 'framer-motion';
import { SKILLS } from '../../utils/constants';

export default function SkillsCSS3D() {
  const radius = typeof window !== 'undefined' && window.innerWidth < 768 ? 150 : 250;
  
  return (
    <div className="h-[400px] md:h-[600px] w-full flex items-center justify-center perspective-[1000px] overflow-hidden">
      <motion.div
        className="relative w-full h-full flex items-center justify-center preserve-3d"
        animate={{
          rotateY: [0, 360],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: "linear"
        }}
      >
        {SKILLS.map((skill, index) => {
          const total = SKILLS.length;
          const phi = Math.acos(-1 + (2 * index) / total);
          const theta = Math.sqrt(total * Math.PI) * phi;
          
          const x = radius * Math.cos(theta) * Math.sin(phi);
          const y = radius * Math.sin(theta) * Math.sin(phi);
          const z = radius * Math.cos(phi);

          return (
            <motion.div
              key={index}
              className="absolute p-4 glass-card rounded-2xl border border-primary/20 flex flex-col items-center gap-2 backface-hidden"
              style={{
                x, y, z,
                position: 'absolute'
              }}
              whileHover={{ scale: 1.2, borderColor: '#10B981', zIndex: 50 }}
            >
              <div className="text-primary">
                {React.createElement(skill.icon, { size: 24 })}
              </div>
              <span className="text-sm font-bold whitespace-nowrap">{skill.name}</span>
            </motion.div>
          );
        })}
      </motion.div>
    </div>
  );
}
