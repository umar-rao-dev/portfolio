import React from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, Send } from 'lucide-react';
import { FaGithub, FaLinkedin, FaInstagram } from 'react-icons/fa';
import { CONTACT_INFO } from '../../utils/constants';

export default function Contact() {
  return (
    <section id="contact" className="py-16 md:py-24 bg-black/5 dark:bg-white/5 relative">
      <div className="w-full max-w-[1920px] mx-auto px-6 md:px-12 lg:px-20">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center md:text-left"
        >
          <h2 className="text-3xl md:text-5xl font-display font-bold mb-4">Get In Touch</h2>
          <div className="w-20 h-1.5 bg-primary rounded-full mx-auto md:mx-0"></div>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12 max-w-5xl mx-auto">
          {/* Contact Info */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="space-y-8"
          >
            <h3 className="text-2xl font-bold mb-6">Let's talk about your project</h3>
            <p className="text-slate-600 dark:text-slate-400 text-lg">
              Feel free to reach out for collaborations, freelance projects, or just to say hello.
            </p>
            
            <div className="space-y-6 pt-4">
              <a href={`mailto:${CONTACT_INFO.email}`} className="flex items-center gap-4 text-lg hover:text-primary transition-colors group">
                <div className="w-12 h-12 rounded-full bg-white dark:bg-black/20 flex items-center justify-center group-hover:scale-110 transition-transform shadow-sm">
                  <Mail className="text-primary" size={20} />
                </div>
                {CONTACT_INFO.email}
              </a>
              <div className="flex items-center gap-4 text-lg">
                <div className="w-12 h-12 rounded-full bg-white dark:bg-black/20 flex items-center justify-center shadow-sm">
                  <Phone className="text-primary" size={20} />
                </div>
                {CONTACT_INFO.phone}
              </div>
            </div>

            <div className="flex gap-4 pt-8">
              <a href={CONTACT_INFO.socials.github} target="_blank" rel="noopener noreferrer" className="p-3 bg-white dark:bg-black/20 rounded-full hover:bg-primary hover:text-white transition-all shadow-sm">
                <FaGithub size={24} />
              </a>
              <a href={CONTACT_INFO.socials.linkedin} target="_blank" rel="noopener noreferrer" className="p-3 bg-white dark:bg-black/20 rounded-full hover:bg-primary hover:text-white transition-all shadow-sm">
                <FaLinkedin size={24} />
              </a>
              <a href={CONTACT_INFO.socials.instagram} target="_blank" rel="noopener noreferrer" className="p-3 bg-white dark:bg-black/20 rounded-full hover:bg-primary hover:text-white transition-all shadow-sm">
                <FaInstagram size={24} />
              </a>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
          >
            <form 
              name="contact" 
              method="POST" 
              data-netlify="true" 
              data-netlify-honeypot="bot-field"
              className="glass-card p-8 rounded-3xl space-y-6"
            >
              <input type="hidden" name="form-name" value="contact" />
              <p className="hidden">
                <label>Don’t fill this out if you're human: <input name="bot-field" /></label>
              </p>

              <div>
                <label htmlFor="name" className="block text-sm font-medium mb-2">Your Name</label>
                <input 
                  type="text" 
                  name="name" 
                  id="name" 
                  required
                  className="w-full px-4 py-3 rounded-xl bg-white/50 dark:bg-black/20 border border-black/10 dark:border-white/10 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                  placeholder="John Doe"
                />
              </div>
              
              <div>
                <label htmlFor="email" className="block text-sm font-medium mb-2">Your Email</label>
                <input 
                  type="email" 
                  name="email" 
                  id="email" 
                  required
                  className="w-full px-4 py-3 rounded-xl bg-white/50 dark:bg-black/20 border border-black/10 dark:border-white/10 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                  placeholder="john@example.com"
                />
              </div>
              
              <div>
                <label htmlFor="message" className="block text-sm font-medium mb-2">Message</label>
                <textarea 
                  name="message" 
                  id="message" 
                  rows="4" 
                  required
                  className="w-full px-4 py-3 rounded-xl bg-white/50 dark:bg-black/20 border border-black/10 dark:border-white/10 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all resize-none"
                  placeholder="How can I help you?"
                ></textarea>
              </div>

              <button 
                type="submit" 
                className="w-full py-4 bg-primary text-white rounded-xl font-medium flex items-center justify-center gap-2 hover:bg-primary-dark transition-colors active:scale-[0.98]"
              >
                Send Message
                <Send size={18} />
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
