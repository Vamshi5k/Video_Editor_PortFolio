'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { Award, Users, Clock, Star, Play, Film, Scissors, Palette } from 'lucide-react';
import { useRef, useState } from 'react';

const timeline = [
  { year: "2021", event: "Started as Junior Video Editor at Creative Studio Tokyo", icon: Clock },
  { year: "2022", event: "First award at Tokyo Independent Film Festival", icon: Award },
  { year: "2023", event: "Led team of 5 editors on major commercial project", icon: Users },
  { year: "2024", event: "Senior Video Editor specializing in cinematic storytelling", icon: Star }
];

const skills = [
  { name: "Adobe Premiere Pro", level: 95, jp: "プレミアプロ" },
  { name: "DaVinci Resolve", level: 90, jp: "ダヴィンチリゾルブ" },
  { name: "After Effects", level: 85, jp: "アフターエフェクト" },
  { name: "Color Grading", level: 88, jp: "カラーグレーディング" },
  { name: "Motion Graphics", level: 80, jp: "モーショングラフィックス" },
  { name: "Sound Design", level: 75, jp: "サウンドデザイン" }
];

const videoTerms = [
  { term: "カット編集", en: "Cut Editing", desc: "Precision cutting for seamless transitions" },
  { term: "色調整", en: "Color Grading", desc: "Creating visual tone and atmosphere" },
  { term: "特殊効果", en: "Special Effects", desc: "Enhancing reality with visual magic" },
  { term: "映像合成", en: "Compositing", desc: "Blending multiple visual elements" },
  { term: "音響設計", en: "Sound Design", desc: "Crafting the auditory experience" },
  { term: "ストーリーテリング", en: "Storytelling", desc: "Weaving narratives through visuals" }
];

export default function AboutSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], ["100px", "-100px"]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
  const [hoveredTerm, setHoveredTerm] = useState<number | null>(null);

  return (
    <section id="about" className="relative py-32 bg-black overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0">
        <motion.div
          animate={{
            background: [
              "radial-gradient(circle at 20% 50%, rgba(239, 68, 68, 0.1) 0%, transparent 50%)",
              "radial-gradient(circle at 80% 20%, rgba(239, 68, 68, 0.15) 0%, transparent 50%)",
              "radial-gradient(circle at 40% 80%, rgba(239, 68, 68, 0.2) 0%, transparent 50%)",
              "radial-gradient(circle at 20% 50%, rgba(239, 68, 68, 0.1) 0%, transparent 50%)",
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
        
        {/* Floating Japanese characters */}
        <div className="absolute inset-0 pointer-events-none">
          {Array.from({ length: 15 }).map((_, i) => (
            <motion.div
              key={i}
              initial={{ 
                opacity: 0,
                x: Math.random() * window.innerWidth,
                y: Math.random() * window.innerHeight,
                rotate: Math.random() * 360
              }}
              animate={{ 
                opacity: [0, 0.5, 0],
                y: [null, -100],
                x: [null, Math.random() * 60 - 30],
                rotate: [null, Math.random() * 180]
              }}
              transition={{
                duration: 5 + Math.random() * 3,
                delay: Math.random() * 2,
                repeat: Infinity,
                ease: "easeOut"
              }}
              className="absolute text-red-900/20 text-3xl"
            >
              {i % 6 === 0 ? '映' : i % 6 === 1 ? '画' : i % 6 === 2 ? '編' : i % 6 === 3 ? '集' : i % 6 === 4 ? '切' : '取'}
            </motion.div>
          ))}
        </div>
      </div>

      <div ref={containerRef} className="container mx-auto px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          
          {/* Left side - Portrait and intro */}
          <motion.div
            initial={{ x: -100, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
            className="relative"
          >
            {/* Section title with Japanese text */}
            <motion.div
              initial={{ y: 30, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="mb-16"
            >
              <h2 className="text-4xl md:text-5xl font-thin tracking-[0.2em] text-red-400 mb-4">
                ABOUT
              </h2>
              <div className="text-2xl text-red-700 font-light tracking-[0.1em]">
                約 - スルジャン・ラチェルラ
              </div>
              <motion.div
                initial={{ width: 0 }}
                whileInView={{ width: "40%" }}
                transition={{ duration: 1, delay: 0.4 }}
                className="h-px bg-gradient-to-r from-red-500 to-transparent mt-4"
              />
            </motion.div>

            {/* Portrait container */}
            <div className="relative mb-12">
              <motion.div
                style={{ y }}
                className="relative w-full max-w-md mx-auto"
              >
                {/* Portrait image with film strip effect */}
                <div className="aspect-[3/4] bg-gradient-to-br from-red-900/20 to-black overflow-hidden relative group">
                  <img
                    src="https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=600&h=800&fit=crop"
                    alt="Srujan Racherla"
                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
                  />
                  
                  {/* Film strip perforations */}
                  <div className="absolute left-0 top-0 bottom-0 w-4 border-r border-red-500/20">
                    {Array.from({ length: 16 }).map((_, i) => (
                      <div key={i} className="h-6 border-b border-red-500/20" />
                    ))}
                  </div>
                  <div className="absolute right-0 top-0 bottom-0 w-4 border-l border-red-500/20">
                    {Array.from({ length: 16 }).map((_, i) => (
                      <div key={i} className="h-6 border-b border-red-500/20" />
                    ))}
                  </div>
                  
                  {/* Play button overlay */}
                  <motion.button
                    whileHover={{ scale: 1.1, backgroundColor: "rgba(239, 68, 68, 0.2)" }}
                    className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  >
                    <div className="w-16 h-16 bg-red-500/10 rounded-full flex items-center justify-center backdrop-blur-sm">
                      <Play size={32} className="text-red-400 ml-1" />
                    </div>
                  </motion.button>
                </div>

                {/* Japanese calligraphy */}
                <motion.div
                  animate={{ rotate: [0, 5, -5, 0] }}
                  transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute -top-8 -right-8 text-6xl font-thin text-red-500/30"
                >
                  映
                </motion.div>
                
                <motion.div
                  animate={{ rotate: [0, -5, 5, 0] }}
                  transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                  className="absolute -bottom-8 -left-8 text-6xl font-thin text-red-500/30"
                >
                  画
                </motion.div>
              </motion.div>
            </div>

            {/* About text */}
            <div className="space-y-6">
              <motion.p
                initial={{ y: 20, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.6 }}
                className="text-lg font-light leading-relaxed text-red-200"
              >
                Four years ago, I discovered the art of visual storytelling in the neon-lit streets of Tokyo. 
                What began as curiosity evolved into a passion for crafting cinematic experiences that bridge 
                the gap between reality and emotion.
              </motion.p>

              <motion.p
                initial={{ y: 20, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.8 }}
                className="text-base font-light leading-relaxed text-red-300"
              >
                My approach combines technical precision with artistic intuition, drawing inspiration from 
                Japanese aesthetics of simplicity and depth. Every cut, every transition, every moment of 
                silence serves the greater narrative.
              </motion.p>
              
              {/* Signature */}
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 1, delay: 1 }}
                className="pt-6"
              >
                <div className="text-red-500 font-light text-sm tracking-[0.3em]">SRUJAN RACHERLA</div>
                <div className="text-red-700 text-xs mt-1">シニアビデオエディター</div>
              </motion.div>
            </div>
          </motion.div>

          {/* Right side - Timeline, skills, and video terms */}
          <div className="space-y-16">
            
            {/* Experience Timeline */}
            <motion.div
              initial={{ x: 100, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              transition={{ duration: 1 }}
              viewport={{ once: true }}
            >
              <h3 className="text-2xl font-light tracking-[0.15em] text-red-400 mb-2">
                JOURNEY
              </h3>
              <div className="text-red-700 text-sm mb-8">軌跡 - My Path</div>
              
              <div className="relative">
                {/* Timeline line */}
                <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-gradient-to-b from-red-500 via-red-500/50 to-transparent" />
                
                {timeline.map((item, index) => (
                  <motion.div
                    key={item.year}
                    initial={{ x: 50, opacity: 0 }}
                    whileInView={{ x: 0, opacity: 1 }}
                    transition={{ duration: 0.8, delay: index * 0.2 }}
                    viewport={{ once: true }}
                    className="relative flex items-start mb-8 group"
                  >
                    {/* Timeline dot */}
                    <div className="relative z-10 w-8 h-8 bg-black border-2 border-red-500 rounded-full flex items-center justify-center mr-6 group-hover:bg-red-500 transition-colors">
                      <item.icon size={14} className="text-red-500 group-hover:text-black transition-colors" />
                    </div>
                    
                    {/* Content */}
                    <div className="flex-1">
                      <div className="text-sm font-light tracking-[0.1em] text-red-500 mb-2">
                        {item.year}
                      </div>
                      <div className="text-base font-light text-red-200 leading-relaxed">
                        {item.event}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Skills */}
            <motion.div
              initial={{ y: 50, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ duration: 1, delay: 0.3 }}
              viewport={{ once: true }}
            >
              <h3 className="text-2xl font-light tracking-[0.15em] text-red-400 mb-2">
                EXPERTISE
              </h3>
              <div className="text-red-700 text-sm mb-8">専門技能 - My Tools</div>
              
              <div className="space-y-6">
                {skills.map((skill, index) => (
                  <motion.div
                    key={skill.name}
                    initial={{ x: -30, opacity: 0 }}
                    whileInView={{ x: 0, opacity: 1 }}
                    transition={{ duration: 0.8, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="group"
                  >
                    <div className="flex justify-between items-center mb-2">
                      <div>
                        <span className="text-sm font-light tracking-[0.1em] text-red-300">
                          {skill.name}
                        </span>
                        <span className="block text-xs text-red-700 mt-1">
                          {skill.jp}
                        </span>
                      </div>
                      <span className="text-xs text-red-700">
                        {skill.level}%
                      </span>
                    </div>
                    
                    <div className="h-1 bg-red-900/30 overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${skill.level}%` }}
                        transition={{ duration: 1.5, delay: index * 0.1 + 0.5 }}
                        viewport={{ once: true }}
                        className="h-full bg-gradient-to-r from-red-500 to-red-400 relative"
                      >
                        <motion.div
                          animate={{ 
                            opacity: [0.5, 1, 0.5],
                          }}
                          transition={{ 
                            duration: 1.5, 
                            repeat: Infinity,
                            ease: "easeInOut"
                          }}
                          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                        />
                      </motion.div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
            
            {/* Video Editing Terms */}
            <motion.div
              initial={{ y: 50, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ duration: 1, delay: 0.6 }}
              viewport={{ once: true }}
              className="pt-8 border-t border-red-900/30"
            >
              <h3 className="text-2xl font-light tracking-[0.15em] text-red-400 mb-2">
                CRAFT
              </h3>
              <div className="text-red-700 text-sm mb-8">編集技術 - My Artistry</div>
              
              <div className="grid grid-cols-2 gap-4">
                {videoTerms.map((term, index) => (
                  <motion.div
                    key={term.term}
                    initial={{ scale: 0.9, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="p-4 bg-red-900/10 border border-red-900/20 group cursor-pointer"
                    onMouseEnter={() => setHoveredTerm(index)}
                    onMouseLeave={() => setHoveredTerm(null)}
                  >
                    <div className="text-lg text-red-400 font-light mb-1">{term.term}</div>
                    <div className="text-sm text-red-700 mb-2">{term.en}</div>
                    <div className="text-xs text-red-600 leading-relaxed">{term.desc}</div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Background Japanese text */}
      <motion.div
        style={{ y, opacity }}
        className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden"
      >
        <div className="text-[20rem] font-thin text-red-900/5 select-none">
          編集者
        </div>
      </motion.div>
    </section>
  );
}