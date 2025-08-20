'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { Play, ArrowDown } from 'lucide-react';
import { useRef } from 'react';

export default function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [1, 0.8, 0.3]);

  return (
    <section ref={containerRef} id="home" className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* Video background */}
      <motion.div
        style={{ y, opacity }}
        className="absolute inset-0 z-0"
      >
        <div className="w-full h-full bg-gradient-to-br from-neutral-900 via-neutral-950 to-black">
          {/* Simulated video background with animated gradient */}
          <motion.div
            animate={{
              background: [
                "linear-gradient(45deg, #0f0f0f, #1a1a1a, #0f0f0f)",
                "linear-gradient(45deg, #1a1a1a, #0f0f0f, #1a1a1a)",
                "linear-gradient(45deg, #0f0f0f, #1a1a1a, #0f0f0f)"
              ]
            }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
            className="w-full h-full"
          />
        </div>
        {/* Film grain overlay */}
        <div className="absolute inset-0 bg-film-grain opacity-40 mix-blend-multiply" />
      </motion.div>

      {/* Japanese calligraphy background */}
      <motion.div
        style={{ y: useTransform(scrollYProgress, [0, 1], ["0%", "30%"]) }}
        className="absolute inset-0 flex items-center justify-center z-10"
      >
        <motion.div
          animate={{ rotate: [0, 5, -5, 0] }}
          transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
          className="text-[25rem] font-thin text-neutral-800/20 select-none"
        >
          映像
        </motion.div>
      </motion.div>

      {/* Main content */}
      <motion.div
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1.5, delay: 1 }}
        className="relative z-20 text-center max-w-4xl mx-auto px-8"
      >
        <motion.h1
          className="text-6xl md:text-8xl font-thin tracking-[0.2em] mb-8"
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1, delay: 1.2 }}
        >
          SRUJAN
          <br />
          <span className="text-4xl md:text-6xl text-neutral-400">RACHERLA</span>
        </motion.h1>

        <motion.p
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1, delay: 1.5 }}
          className="text-lg md:text-xl font-light tracking-[0.3em] text-neutral-300 mb-12"
        >
          CINEMATIC VIDEO EDITOR
          <br />
          <span className="text-sm text-neutral-500">4 YEARS OF STORYTELLING</span>
        </motion.p>

        {/* CTA Button */}
        <motion.button
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8, delay: 1.8 }}
          whileHover={{ 
            scale: 1.05,
            boxShadow: "0 0 30px rgba(239, 68, 68, 0.3)" 
          }}
          whileTap={{ scale: 0.95 }}
          className="group relative inline-flex items-center gap-4 px-8 py-4 bg-transparent border border-neutral-600 text-neutral-100 font-light tracking-[0.2em] transition-all duration-300 hover:border-red-500"
        >
          <Play size={20} className="group-hover:text-red-500 transition-colors" />
          WATCH REEL
          <motion.div
            className="absolute inset-0 bg-red-500/10"
            initial={{ scale: 0 }}
            whileHover={{ scale: 1 }}
            transition={{ duration: 0.3 }}
          />
        </motion.button>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1, delay: 2.5, repeat: Infinity, repeatType: "reverse" }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20"
      >
        <ArrowDown size={24} className="text-neutral-400" />
      </motion.div>
    </section>
  );
}