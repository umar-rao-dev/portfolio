import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ExternalLink } from 'lucide-react';
import { FaGithub } from 'react-icons/fa';
import { PROJECTS } from '../../utils/constants';

const ProjectCard = ({ project, index, progress, range, targetScale }) => {
  const container = React.useRef(null);
  const scale = useTransform(progress, range, [1, targetScale]);

  return (
    <div ref={container} className="h-screen flex items-center justify-center sticky top-0">
      <motion.div
        style={{ scale, top: `calc(-5% + ${index * 25}px)` }}
        className="glass-card relative h-[500px] w-full max-w-[1000px] rounded-[3rem] overflow-hidden flex flex-col md:flex-row border border-white/10 shadow-2xl origin-top"
      >
        <div className="md:w-1/2 h-full bg-gradient-to-br from-primary/30 to-secondary/30 relative overflow-hidden flex items-center justify-center">
          <div className="w-48 h-48 rounded-[3rem] bg-white/10 rotate-12 blur-xl animate-pulse"></div>
          <div className="absolute inset-0 flex items-center justify-center">
            <h4 className="text-8xl font-black opacity-10 select-none uppercase">{project.title.split(' ')[0]}</h4>
          </div>
        </div>

        <div className="md:w-1/2 p-12 flex flex-col h-full bg-slate-900/40 backdrop-blur-3xl">
          <h3 className="text-4xl font-bold mb-6 text-white">{project.title}</h3>
          <p className="text-slate-400 mb-8 flex-grow leading-relaxed text-lg">{project.description}</p>

          <div className="flex flex-wrap gap-3 mb-10">
            {project.tech.map((tag, i) => (
              <span key={i} className="px-4 py-2 text-xs font-bold rounded-full border border-primary/30 text-primary bg-primary/10 tracking-widest uppercase">
                {tag}
              </span>
            ))}
          </div>

          <div className="flex gap-6 mt-auto">
            <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-8 py-3 rounded-full bg-primary text-white font-bold hover:scale-105 transition-transform shadow-lg shadow-primary/25">
              LIVE DEMO <ExternalLink size={20} />
            </a>
            <a href={project.codeUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-8 py-3 rounded-full bg-white/5 border border-white/10 text-white font-bold hover:bg-white/10 transition-colors">
              CODE <FaGithub size={20} />
            </a>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default function Projects() {
  const container = React.useRef(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ['start start', 'end end']
  });

  return (
    <section ref={container} id="projects" className="relative pb-[20vh] mt-guutery-lg">
      <div className="w-full max-w-[1920px] mx-auto px-6 md:px-12 lg:px-20 mb-guutery">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <h2 className="text-5xl md:text-8xl font-display font-bold mb-4 tracking-tighter">PROJECTS <span className="text-gradient"></span></h2>
          <div className="w-24 h-2 bg-primary rounded-full mx-auto"></div>
        </motion.div>
      </div>

      <div className="relative">
        {PROJECTS.map((project, index) => {
          const targetScale = 1 - ((PROJECTS.length - index) * 0.05);
          return (
            <ProjectCard
              key={index}
              index={index}
              project={project}
              progress={scrollYProgress}
              range={[index * 0.25, 1]}
              targetScale={targetScale}
            />
          );
        })}
      </div>
    </section>
  );
}
