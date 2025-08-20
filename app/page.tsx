'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Navigation from '../components/Navigation';
import HeroSection from '../components/HeroSection';
import ProjectsShowcase from '../components/ProjectShowcase';
import AboutSection from '../components/AboutSection';
import ContactSection from '../components/ContactSection';
import CustomCursor from '../components/CustomCursor';
import JapanesePreloader from '../components/JapanesePreloader';


export default function Home() {
  const [showPreloader, setShowPreloader] = useState(true);
  const [isLoaded, setIsLoaded] = useState(false);

  const handlePreloaderComplete = () => {
    setShowPreloader(false);
    setIsLoaded(true);
  };

  return (
    <div className="relative min-h-screen bg-neutral-950 text-neutral-100 overflow-x-hidden">
      <CustomCursor />
      
      <AnimatePresence mode="wait">
        {showPreloader && (
          <JapanesePreloader 
            key="preloader" 
            onComplete={handlePreloaderComplete} 
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {!showPreloader && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="relative z-10"
          >
            <Navigation />
            <HeroSection />
            <ProjectsShowcase />
            <AboutSection />
            <ContactSection />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Film grain overlay */}
      <div className="fixed inset-0 pointer-events-none z-50 opacity-20">
        <div className="w-full h-full bg-film-grain opacity-30 mix-blend-multiply"></div>
      </div>
    </div>
  );
}