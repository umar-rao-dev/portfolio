import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Code, 
  Plus, 
  Trash2, 
  Save, 
  Eye, 
  Settings,
  User,
  Briefcase,
  Mail,
  Copy,
  Check,
  Palette,
  Type
} from 'lucide-react';
import { usePortfolio } from '../context/PortfolioContext';
import LucideIcon from './ui/LucideIcon';

const TABS = [
  { id: 'hero', label: 'Hero & Text', icon: Type },
  { id: 'about', label: 'About Me', icon: User },
  { id: 'skills', label: 'My Skills', icon: Code },
  { id: 'projects', label: 'Projects', icon: Briefcase },
  { id: 'theme', label: 'Theme Colors', icon: Palette },
  { id: 'export', label: 'Sync to Code', icon: Save },
];

export default function AdminPortal() {
  const { data, updateData } = usePortfolio();
  const [activeTab, setActiveTab] = useState('hero');
  const [copied, setCopied] = useState(false);

  // --- Handlers ---
  const handleChange = (field, value) => {
    updateData({ [field]: value });
  };

  const handleArrayChange = (field, index, value) => {
    const newArr = [...data[field]];
    newArr[index] = value;
    updateData({ [field]: newArr });
  };

  const handleObjectChange = (field, subField, value) => {
    updateData({ 
      [field]: { ...data[field], [subField]: value } 
    });
  };

  // --- Export Logic ---
  const generateConstantsCode = () => {
    let code = `import { Code, Database, Globe, Layout, Smartphone, Server } from "lucide-react";\n\n`;
    
    Object.keys(data).forEach(key => {
        if (key === 'SKILLS') {
             // Handle skills icons separately
             const skillsStr = JSON.stringify(data[key], (k, v) => {
                 if (k === 'icon') return 'ICON_PLACEHOLDER';
                 return v;
             }, 2);
             let finalSkills = skillsStr;
             data[key].forEach(s => {
                const iconName = s.icon.name || 'Code';
                finalSkills = finalSkills.replace('"ICON_PLACEHOLDER"', iconName);
             });
             code += `export const ${key} = ${finalSkills};\n\n`;
        } else {
             code += `export const ${key} = ${JSON.stringify(data[key], null, 2)};\n\n`;
        }
    });
    
    return code;
  };

  return (
    <div className="min-h-screen bg-[#020617] text-white font-sans selection:bg-primary/30">
      <div className="flex h-screen overflow-hidden">
        
        {/* Sidebar */}
        <div className="w-72 bg-slate-900/50 border-r border-white/5 flex flex-col p-8">
          <div className="flex items-center gap-4 mb-12 px-2">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center shadow-lg shadow-primary/20">
                <Settings size={28} className="text-white animate-spin-slow" />
            </div>
            <div>
                <h1 className="text-xl font-black tracking-tight">PORTAL</h1>
                <p className="text-[10px] text-slate-500 font-bold tracking-[0.2em] uppercase">Control Center</p>
            </div>
          </div>
          
          <nav className="flex flex-col gap-2">
            {TABS.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-4 px-5 py-4 rounded-2xl transition-all relative group ${isActive ? 'bg-primary/10 text-primary' : 'text-slate-400 hover:bg-white/5 hover:text-white'}`}
                >
                  {isActive && <motion.div layoutId="active-tab" className="absolute inset-0 bg-primary/10 rounded-2xl border border-primary/20" />}
                  <Icon size={20} className="relative z-10" />
                  <span className="font-bold text-sm relative z-10">{tab.label}</span>
                </button>
              );
            })}
          </nav>
          
          <div className="mt-auto pt-8 border-t border-white/5">
             <a href="/" className="flex items-center justify-center gap-3 bg-white/5 hover:bg-white/10 text-white rounded-2xl py-4 transition-all border border-white/10 font-bold text-sm">
                <Eye size={18} />
                View Website
             </a>
          </div>
        </div>

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto p-12 custom-scrollbar bg-[radial-gradient(circle_at_top_right,rgba(6,182,212,0.05),transparent)]">
          <AnimatePresence mode="wait">
            {activeTab === 'hero' && (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="max-w-4xl">
                <h2 className="text-4xl font-black mb-10 tracking-tight">Hero & Landing</h2>
                
                <div className="grid gap-8">
                  <div className="bg-slate-900/40 p-8 rounded-[2.5rem] border border-white/5 space-y-6">
                    <h3 className="text-lg font-bold text-primary">Rotating Titles</h3>
                    <p className="text-sm text-slate-500 mb-4">These appear in the hero section below your name.</p>
                    {data.TITLES?.map((title, i) => (
                      <div key={i} className="flex gap-4">
                        <input
                          value={title}
                          onChange={(e) => handleArrayChange('TITLES', i, e.target.value)}
                          className="flex-1 bg-black/20 border border-white/10 rounded-xl p-4 outline-none focus:border-primary transition-all font-mono text-sm"
                        />
                      </div>
                    ))}
                  </div>

                  <div className="bg-slate-900/40 p-8 rounded-[2.5rem] border border-white/5 space-y-6">
                    <h3 className="text-lg font-bold text-secondary">Hero Subtitle</h3>
                    <textarea
                      value={data.HERO_SUBTITLE || ""}
                      onChange={(e) => handleChange('HERO_SUBTITLE', e.target.value)}
                      className="w-full h-32 bg-black/20 border border-white/10 rounded-2xl p-6 outline-none focus:border-secondary transition-all text-lg leading-relaxed"
                    />
                  </div>
                </div>
              </motion.div>
            )}

            {activeTab === 'about' && (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="max-w-4xl">
                <h2 className="text-4xl font-black mb-10 tracking-tight">About Story</h2>
                <div className="space-y-6">
                  {data.ABOUT_TEXT.map((text, i) => (
                    <div key={i} className="bg-slate-900/40 p-8 rounded-[2.5rem] border border-white/5">
                      <label className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-4 block">Paragraph {i + 1}</label>
                      <textarea
                        value={text}
                        onChange={(e) => handleArrayChange('ABOUT_TEXT', i, e.target.value)}
                        className="w-full h-40 bg-transparent border-none outline-none text-slate-300 leading-relaxed text-lg resize-none"
                      />
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {activeTab === 'skills' && (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}>
                <div className="flex justify-between items-center mb-12">
                  <h2 className="text-4xl font-black tracking-tight">Skills & Icons</h2>
                  <button onClick={() => updateData({ SKILLS: [...data.SKILLS, { name: 'New Skill', description: 'Briefly describe...', icon: 'Code' }] })} className="bg-primary px-8 py-4 rounded-2xl font-black text-sm flex items-center gap-3 hover:scale-105 transition-all shadow-xl shadow-primary/20">
                    <Plus size={20} /> ADD SKILL
                  </button>
                </div>
                <div className="grid lg:grid-cols-2 gap-8">
                  {data.SKILLS.map((skill, i) => (
                    <div key={i} className="bg-slate-900/40 border border-white/5 rounded-[2.5rem] p-8 relative group">
                      <button onClick={() => updateData({ SKILLS: data.SKILLS.filter((_, idx) => idx !== i) })} className="absolute top-6 right-6 p-2 text-slate-500 hover:text-red-500 transition-colors opacity-0 group-hover:opacity-100">
                        <Trash2 size={18} />
                      </button>
                      <div className="space-y-6">
                        <div className="flex gap-4 items-center">
                           <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary border border-primary/20">
                              <LucideIcon name={skill.icon} size={24} />
                           </div>
                           <input
                            value={skill.name}
                            onChange={(e) => handleArrayChange('SKILLS', i, { ...skill, name: e.target.value })}
                            className="bg-transparent text-xl font-bold outline-none border-b border-transparent focus:border-primary w-full"
                           />
                        </div>
                        <div>
                           <label className="text-[10px] font-bold text-slate-500 uppercase tracking-[0.2em] mb-2 block">Icon Name (Lucide)</label>
                           <input
                            value={typeof skill.icon === 'string' ? skill.icon : (skill.icon.name || 'Code')}
                            onChange={(e) => handleArrayChange('SKILLS', i, { ...skill, icon: e.target.value })}
                            className="w-full bg-black/20 rounded-xl p-3 text-xs font-mono border border-white/10 outline-none focus:border-primary"
                           />
                        </div>
                        <textarea
                          value={skill.description}
                          onChange={(e) => handleArrayChange('SKILLS', i, { ...skill, description: e.target.value })}
                          className="w-full bg-transparent text-slate-400 outline-none resize-none h-20 text-sm leading-relaxed"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {activeTab === 'projects' && (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}>
                <div className="flex justify-between items-center mb-12">
                  <h2 className="text-4xl font-black tracking-tight">Project Stack</h2>
                  <button onClick={() => updateData({ PROJECTS: [...data.PROJECTS, { title: 'New App', description: 'Briefly describe your work...', tech: ['React'], liveUrl: '#', codeUrl: '#' }] })} className="bg-primary px-8 py-4 rounded-2xl font-black text-sm flex items-center gap-3 hover:scale-105 transition-all shadow-xl shadow-primary/20">
                    <Plus size={20} /> ADD NEW
                  </button>
                </div>
                <div className="grid gap-8">
                  {data.PROJECTS.map((project, i) => (
                    <div key={i} className="bg-slate-900/40 border border-white/5 rounded-[3rem] p-10 relative group hover:border-primary/20 transition-all">
                       <button onClick={() => updateData({ PROJECTS: data.PROJECTS.filter((_, idx) => idx !== i) })} className="absolute top-8 right-8 p-3 bg-red-500/10 text-red-500 rounded-xl hover:bg-red-500 hover:text-white transition-all opacity-0 group-hover:opacity-100">
                        <Trash2 size={20} />
                      </button>
                      <div className="grid lg:grid-cols-2 gap-12">
                        <div className="space-y-8">
                          <div>
                            <label className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-4 block">Project Title</label>
                            <input
                              value={project.title}
                              onChange={(e) => {
                                const newP = [...data.PROJECTS];
                                newP[i] = { ...project, title: e.target.value };
                                updateData({ PROJECTS: newP });
                              }}
                              className="bg-transparent text-3xl font-black w-full outline-none border-b border-white/10 focus:border-primary pb-2"
                            />
                          </div>
                          <div>
                            <label className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-4 block">Tech Stack</label>
                            <input
                              value={project.tech.join(', ')}
                              onChange={(e) => {
                                const newP = [...data.PROJECTS];
                                newP[i] = { ...project, tech: e.target.value.split(',').map(t => t.trim()) };
                                updateData({ PROJECTS: newP });
                              }}
                              className="bg-transparent text-primary font-bold w-full outline-none"
                            />
                          </div>
                        </div>
                        <div className="space-y-6">
                           <div>
                            <label className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-4 block">Description</label>
                            <textarea
                              value={project.description}
                              onChange={(e) => {
                                const newP = [...data.PROJECTS];
                                newP[i] = { ...project, description: e.target.value };
                                updateData({ PROJECTS: newP });
                              }}
                              className="bg-transparent text-slate-400 w-full outline-none h-32 leading-relaxed resize-none"
                            />
                          </div>
                          <div className="flex gap-4">
                             <input value={project.liveUrl} placeholder="Live Link" onChange={(e) => {
                                const newP = [...data.PROJECTS];
                                newP[i] = { ...project, liveUrl: e.target.value };
                                updateData({ PROJECTS: newP });
                             }} className="flex-1 bg-black/20 rounded-xl p-3 text-xs border border-white/10" />
                             <input value={project.codeUrl} placeholder="GitHub Link" onChange={(e) => {
                                const newP = [...data.PROJECTS];
                                newP[i] = { ...project, codeUrl: e.target.value };
                                updateData({ PROJECTS: newP });
                             }} className="flex-1 bg-black/20 rounded-xl p-3 text-xs border border-white/10" />
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {activeTab === 'theme' && (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="max-w-2xl">
                 <h2 className="text-4xl font-black mb-10 tracking-tight">Design System</h2>
                 <div className="bg-slate-900/40 p-10 rounded-[3rem] border border-white/5 space-y-10">
                    <div className="flex items-center justify-between">
                       <div>
                          <h4 className="font-bold text-lg">Primary Color</h4>
                          <p className="text-sm text-slate-500">Buttons, gradients, and accents</p>
                       </div>
                       <input 
                        type="color" 
                        value={data.THEME?.primary || '#06b6d4'} 
                        onChange={(e) => handleObjectChange('THEME', 'primary', e.target.value)}
                        className="w-16 h-16 rounded-2xl cursor-pointer bg-transparent border-none"
                       />
                    </div>
                    <div className="flex items-center justify-between">
                       <div>
                          <h4 className="font-bold text-lg">Secondary Color</h4>
                          <p className="text-sm text-slate-500">Glows and contrast elements</p>
                       </div>
                       <input 
                        type="color" 
                        value={data.THEME?.secondary || '#8b5cf6'} 
                        onChange={(e) => handleObjectChange('THEME', 'secondary', e.target.value)}
                        className="w-16 h-16 rounded-2xl cursor-pointer bg-transparent border-none"
                       />
                    </div>
                 </div>
              </motion.div>
            )}

            {activeTab === 'export' && (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="h-full flex flex-col max-w-5xl">
                <div className="flex justify-between items-center mb-10">
                  <div>
                    <h2 className="text-4xl font-black tracking-tight">Sync to Production</h2>
                    <p className="text-slate-500 mt-2 font-medium">To make your local changes permanent in the code, copy the block below.</p>
                  </div>
                  <button 
                    onClick={() => {
                        navigator.clipboard.writeText(generateConstantsCode());
                        setCopied(true);
                        setTimeout(() => setCopied(false), 2000);
                    }}
                    className={`flex items-center gap-3 px-10 py-5 rounded-2xl font-black transition-all ${copied ? 'bg-green-500 shadow-lg shadow-green-500/20' : 'bg-primary hover:scale-105 shadow-xl shadow-primary/20'}`}
                  >
                    {copied ? <Check size={22} /> : <Copy size={22} />}
                    {copied ? 'COPIED!' : 'COPY CONSTANTS.JS'}
                  </button>
                </div>
                <div className="flex-1 bg-black/60 rounded-[3rem] border border-white/5 p-10 relative overflow-hidden">
                   <pre className="text-xs font-mono text-cyan-500/80 h-[400px] overflow-y-auto custom-scrollbar leading-relaxed">
                     {generateConstantsCode()}
                   </pre>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
