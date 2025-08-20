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
    <section ref={containerRef} id="home" className="relative h-screen flex items-center justify-center overflow-hidden bg-black">
      {/* Animated red background elements */}
      <motion.div
        style={{ y, opacity }}
        className="absolute inset-0 z-0"
      >
        {/* Flowing red ink effect */}
        <motion.div
          animate={{
            background: [
              "radial-gradient(circle at 20% 50%, rgba(239, 68, 68, 0.15) 0%, transparent 50%)",
              "radial-gradient(circle at 80% 20%, rgba(239, 68, 68, 0.2) 0%, transparent 50%)",
              "radial-gradient(circle at 40% 80%, rgba(239, 68, 68, 0.25) 0%, transparent 50%)",
              "radial-gradient(circle at 20% 50%, rgba(239, 68, 68, 0.15) 0%, transparent 50%)",
            ]
          }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
          className="absolute inset-0"
        />
        
        {/* Grid pattern */}
        <div className="absolute inset-0 opacity-20">
          <div className="grid grid-cols-12 grid-rows-8 h-full w-full">
            {Array.from({ length: 96 }).map((_, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0 }}
                animate={{ opacity: [0, 0.3, 0] }}
                transition={{
                  duration: 2,
                  delay: i * 0.02,
                  repeat: Infinity,
                  repeatType: "loop"
                }}
                className="border border-red-900/30"
              />
            ))}
          </div>
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
          className="text-[25rem] font-thin text-red-900/10 select-none"
        >
          編
        </motion.div>
      </motion.div>

      {/* Floating Japanese characters */}
      <div className="absolute inset-0 pointer-events-none z-5">
        {Array.from({ length: 15 }).map((_, i) => (
          <motion.div
            key={i}
            initial={{ 
              opacity: 0,
              x: Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1920),
              y: Math.random() * (typeof window !== 'undefined' ? window.innerHeight : 1080),
              rotate: Math.random() * 360
            }}
            animate={{ 
              opacity: [0, 0.7, 0],
              y: [null, -150],
              x: [null, Math.random() * 60 - 30],
              rotate: [null, Math.random() * 180]
            }}
            transition={{
              duration: 4 + Math.random() * 3,
              delay: Math.random() * 2,
              repeat: Infinity,
              ease: "easeOut"
            }}
            className="absolute text-red-800/30 text-4xl"
          >
            {i % 5 === 0 ? '映' : i % 5 === 1 ? '画' : i % 5 === 2 ? '編' : i % 5 === 3 ? '集' : '者'}
          </motion.div>
        ))}
      </div>

      {/* Main content */}
      <motion.div
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1.5, delay: 1 }}
        className="relative z-20 text-center max-w-4xl mx-auto px-8"
      >
        <motion.div
          className="mb-12"
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1, delay: 1.2 }}
        >
          <motion.h1
            className="text-6xl md:text-8xl font-thin tracking-[0.2em] mb-4 text-white"
          >
            SRUJAN
            <br />
            <span className="text-4xl md:text-6xl text-red-400">RACHERLA</span>
          </motion.h1>
          
          {/* Japanese name */}
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1, delay: 1.5 }}
            className="mt-8"
          >
            <div className="text-3xl md:text-5xl font-light text-red-500 mb-2">
              スルジャン・ラチェルラ
            </div>
  
          </motion.div>
        </motion.div>

        <motion.p
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1, delay: 1.5 }}
          className="text-lg md:text-xl font-light tracking-[0.3em] text-red-300 mb-12"
        >
          CINEMATIC VIDEO EDITOR
          <br />
          <span className="text-sm text-red-700">4 YEARS OF STORYTELLING</span>
        </motion.p>

        {/* Japanese title */}
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1, delay: 1.7 }}
          className="mb-12"
        >
          <div className="text-2xl font-light text-red-500 mb-2">
            映像編集者
          </div>
          <div className="text-sm text-red-700 font-light tracking-widest">
            VIDEO EDITOR
          </div>
        </motion.div>

        {/* CTA Button */}
        <motion.button
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8, delay: 1.8 }}
          whileHover={{ 
            scale: 1.05,
            boxShadow: "0 0 30px rgba(239, 68, 68, 0.5)" 
          }}
          whileTap={{ scale: 0.95 }}
          className="group relative inline-flex items-center gap-4 px-8 py-4 bg-transparent border border-red-800 text-red-100 font-light tracking-[0.2em] transition-all duration-300 hover:border-red-500 hover:text-white"
        >
          <Play size={20} className="group-hover:text-red-300 transition-colors" />
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
        <ArrowDown size={24} className="text-red-500" />
      </motion.div>

      {/* Corner decorations */}
      <div className="absolute top-8 left-8 text-red-800 font-thin text-sm tracking-[0.2em] z-20">
        ビデオ編集
      </div>
      <div className="absolute top-8 right-8 text-red-800 font-thin text-sm tracking-[0.2em] z-20">
        クリエイター
      </div>
      <div className="absolute bottom-8 left-8 text-red-800 font-thin text-sm tracking-[0.2em] z-20">
        ストーリーテラー
      </div>
      <div className="absolute bottom-8 right-8 text-red-800 font-thin text-sm z-20">
        スルジャン
      </div>
    </section>
  );
}