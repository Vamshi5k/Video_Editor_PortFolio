'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { Play, ExternalLink, ArrowUpRight, Film, Camera, Video, Scissors } from 'lucide-react';
import { useRef, useState } from 'react';

const projects = [
  {
    id: 1,
    title: "Shadows of Tomorrow",
    category: "Sci-Fi Short Film",
    year: "2024",
    description: "A dystopian narrative exploring human connection in digital isolation",
    thumbnail: "https://images.pexels.com/photos/274937/pexels-photo-274937.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop",
    color: "from-blue-500/20 via-cyan-500/20 to-blue-600/20",
    accent: "bg-blue-500",
    jpTitle: "明日の影",
    jpCategory: "SF短編映画"
  },
  {
    id: 2,
    title: "Urban Symphony",
    category: "Music Video",
    year: "2024",
    description: "Rhythmic storytelling through the lens of city life",
    thumbnail: "https://images.pexels.com/photos/2387793/pexels-photo-2387793.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop",
    color: "from-orange-500/20 via-red-500/20 to-pink-500/20",
    accent: "bg-orange-500",
    jpTitle: "都市交響曲",
    jpCategory: "ミュージックビデオ"
  },
  {
    id: 3,
    title: "Whispers in Silence",
    category: "Documentary",
    year: "2023",
    description: "An intimate portrayal of Japanese tea ceremony masters",
    thumbnail: "https://images.pexels.com/photos/1181248/pexels-photo-1181248.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop",
    color: "from-emerald-500/20 via-teal-500/20 to-green-500/20",
    accent: "bg-emerald-500",
    jpTitle: "静寂のささやき",
    jpCategory: "ドキュメンタリー"
  },
  {
    id: 4,
    title: "Neon Dreams",
    category: "Commercial",
    year: "2023",
    description: "High-energy brand campaign with cyberpunk aesthetics",
    thumbnail: "https://images.pexels.com/photos/2034851/pexels-photo-2034851.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop",
    color: "from-purple-500/20 via-violet-500/20 to-pink-500/20",
    accent: "bg-purple-500",
    jpTitle: "ネオンドリーム",
    jpCategory: "コマーシャル"
  },
  {
    id: 5,
    title: "Ethereal Landscapes",
    category: "Nature Documentary",
    year: "2023",
    description: "Capturing the untouched beauty of Japanese mountains",
    thumbnail: "https://images.pexels.com/photos/933054/pexels-photo-933054.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop",
    color: "from-slate-500/20 via-gray-500/20 to-zinc-500/20",
    accent: "bg-slate-500",
    jpTitle: "幽玄の風景",
    jpCategory: "自然ドキュメンタリー"
  },
  {
    id: 6,
    title: "Digital Metamorphosis",
    category: "Abstract Film",
    year: "2024",
    description: "Exploring transformation through algorithmic beauty",
    thumbnail: "https://images.pexels.com/photos/1194713/pexels-photo-1194713.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop",
    color: "from-indigo-500/20 via-blue-500/20 to-cyan-500/20",
    accent: "bg-indigo-500",
    jpTitle: "デジタル変容",
    jpCategory: "抽象映画"
  },
  {
    id: 7,
    title: "Temporal Echoes",
    category: "Experimental",
    year: "2024",
    description: "Time-lapse poetry of urban decay and renewal",
    thumbnail: "https://images.pexels.com/photos/2166711/pexels-photo-2166711.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop",
    color: "from-rose-500/20 via-pink-500/20 to-red-500/20",
    accent: "bg-rose-500",
    jpTitle: "時間のこだま",
    jpCategory: "実験的映像"
  },
  {
    id: 8,
    title: "Quantum Reflections",
    category: "Sci-Fi Series",
    year: "2023",
    description: "Reality bends in this mind-bending narrative",
    thumbnail: "https://images.pexels.com/photos/1169084/pexels-photo-1169084.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop",
    color: "from-yellow-500/20 via-amber-500/20 to-orange-500/20",
    accent: "bg-yellow-500",
    jpTitle: "量子反射",
    jpCategory: "SFシリーズ"
  },
  {
    id: 9,
    title: "Infinite Horizons",
    category: "Travel Documentary",
    year: "2024",
    description: "Journey through untold stories across continents",
    thumbnail: "https://images.pexels.com/photos/1624496/pexels-photo-1624496.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop",
    color: "from-teal-500/20 via-cyan-500/20 to-blue-500/20",
    accent: "bg-teal-500",
    jpTitle: "無限の地平線",
    jpCategory: "旅行ドキュメンタリー"
  }
];

const videoEditingTerms = [
  { term: "カット編集", en: "Cut Editing" },
  { term: "色調整", en: "Color Grading" },
  { term: "特殊効果", en: "Special Effects" },
  { term: "映像合成", en: "Compositing" },
  { term: "音響設計", en: "Sound Design" },
  { term: "ストーリーテリング", en: "Storytelling" }
];

export default function ProjectsShowcase() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const backgroundRotate = useTransform(scrollYProgress, [0, 1], [0, 180]);
  const [hoveredProject, setHoveredProject] = useState<number | null>(null);
  const [activeFilter, setActiveFilter] = useState("all");

  const filters = [
    { id: "all", label: "All Projects", jp: "全て" },
    { id: "film", label: "Films", jp: "映画" },
    { id: "commercial", label: "Commercials", jp: "コマーシャル" },
    { id: "documentary", label: "Documentaries", jp: "ドキュメンタリー" },
    { id: "music", label: "Music Videos", jp: "ミュージックビデオ" }
  ];

  return (
    <section id="projects" className="relative py-20 lg:py-32 bg-black overflow-hidden">
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
                x: Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1920),
                y: Math.random() * (typeof window !== 'undefined' ? window.innerHeight : 1080),
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

      {/* Section header */}
      <div className="container mx-auto px-4 sm:px-8 mb-16 lg:mb-24 relative z-10">
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            className="relative inline-block mb-8"
          >
            <h2 className="text-4xl sm:text-6xl lg:text-7xl font-thin tracking-[0.3em] text-red-400 mb-4 relative z-10">
              PROJECTS
            </h2>
            <div className="text-xl text-red-700 font-light tracking-[0.1em]">
              作品ポートフォリオ - Project Portfolio
            </div>
            
            {/* Glitch effect overlay */}
            <motion.div
              animate={{
                opacity: [0, 0.3, 0],
                x: [0, 2, -2, 0],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                repeatDelay: 5,
              }}
              className="absolute inset-0 text-4xl sm:text-6xl lg:text-7xl font-thin tracking-[0.3em] text-red-500/30"
            >
              PROJECTS
            </motion.div>
          </motion.div>
          
          <motion.div
            initial={{ width: 0 }}
            whileInView={{ width: "12rem" }}
            transition={{ duration: 1.5, delay: 0.5 }}
            className="h-px bg-gradient-to-r from-transparent via-red-500 to-transparent mx-auto mb-8"
          />
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.8 }}
            className="text-base sm:text-lg text-red-300 font-light tracking-[0.15em] max-w-2xl mx-auto"
          >
            A curated collection of visual narratives spanning multiple mediums
          </motion.p>

          {/* Video editing terms carousel */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1 }}
            className="flex justify-center items-center space-x-8 mt-12 overflow-hidden"
          >
            {videoEditingTerms.map((term, index) => (
              <motion.div
                key={term.term}
                initial={{ y: 20, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.6, delay: 1.2 + index * 0.1 }}
                className="text-center"
              >
                <div className="text-xl text-red-500 font-light">{term.term}</div>
                <div className="text-xs text-red-700 mt-1">{term.en}</div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>

      {/* Filter buttons */}
      <motion.div
        initial={{ y: 30, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.5 }}
        className="container mx-auto px-4 sm:px-8 mb-12 flex justify-center flex-wrap gap-4 relative z-10"
      >
        {filters.map((filter) => (
          <motion.button
            key={filter.id}
            onClick={() => setActiveFilter(filter.id)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={`px-6 py-3 text-sm font-light tracking-[0.1em] transition-all duration-300 ${
              activeFilter === filter.id
                ? 'bg-red-500 text-white'
                : 'bg-red-900/20 text-red-300 hover:bg-red-900/40'
            }`}
          >
            {filter.label}
            <span className="block text-xs text-red-700 mt-1">{filter.jp}</span>
          </motion.button>
        ))}
      </motion.div>

      {/* Projects grid */}
      <div ref={containerRef} className="container mx-auto px-4 sm:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 lg:gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ y: 100, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ 
                duration: 0.8, 
                delay: index * 0.1,
                ease: "easeOut"
              }}
              viewport={{ once: true }}
              onMouseEnter={() => setHoveredProject(project.id)}
              onMouseLeave={() => setHoveredProject(null)}
              className="group cursor-pointer"
            >
              {/* Card container */}
              <motion.div
                whileHover={{ y: -8 }}
                transition={{ duration: 0.4 }}
                className="relative overflow-hidden bg-red-900/10 backdrop-blur-sm border border-red-900/30 hover:border-red-500/50 transition-all duration-500"
                style={{
                  borderRadius: "0px 20px 0px 20px"
                }}
              >
                {/* Image container */}
                <div className="relative aspect-[4/3] overflow-hidden">
                  <motion.img
                    src={project.thumbnail}
                    alt={project.title}
                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 0.8 }}
                  />
                  
                  {/* Gradient overlay */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${project.color} opacity-40 group-hover:opacity-60 transition-opacity duration-500`} />
                  
                  {/* Film strip effect */}
                  <div className="absolute left-0 top-0 bottom-0 w-3 border-r border-red-500/20">
                    {Array.from({ length: 12 }).map((_, i) => (
                      <div key={i} className="h-6 border-b border-red-500/20" />
                    ))}
                  </div>
                  <div className="absolute right-0 top-0 bottom-0 w-3 border-l border-red-500/20">
                    {Array.from({ length: 12 }).map((_, i) => (
                      <div key={i} className="h-6 border-b border-red-500/20" />
                    ))}
                  </div>
                  
                  {/* Animated border on hover */}
                  <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{
                      scale: hoveredProject === project.id ? 1 : 0.8,
                      opacity: hoveredProject === project.id ? 1 : 0,
                    }}
                    className="absolute inset-2 border-2 border-red-500/30 pointer-events-none"
                    style={{ borderRadius: "0px 16px 0px 16px" }}
                  />
                  
                  {/* Play button */}
                  <motion.div
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{
                      opacity: hoveredProject === project.id ? 1 : 0,
                      scale: hoveredProject === project.id ? 1 : 0.5,
                    }}
                    className="absolute inset-0 flex items-center justify-center"
                  >
                    <motion.div
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      className="relative"
                    >
                      <div className="w-16 h-16 rounded-full bg-red-500/20 backdrop-blur-md flex items-center justify-center border border-red-500/30">
                        <Play size={24} className="text-red-400 ml-0.5" fill="currentColor" />
                      </div>
                      {/* Pulsing ring */}
                      <motion.div
                        animate={{
                          scale: [1, 1.3, 1],
                          opacity: [0.3, 0, 0.3],
                        }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                        }}
                        className="absolute inset-0 w-16 h-16 rounded-full border border-red-500/30"
                      />
                    </motion.div>
                  </motion.div>

                  {/* Category badge */}
                  <div className="absolute top-4 left-4">
                    <motion.div
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 + 0.5 }}
                      className={`px-3 py-1 ${project.accent} bg-opacity-90 backdrop-blur-sm text-white text-xs font-medium tracking-wider rounded-none`}
                    >
                      {project.year}
                    </motion.div>
                  </div>

                  {/* External link icon */}
                  <motion.div
                    whileHover={{ scale: 1.2, rotate: 90 }}
                    className="absolute top-4 right-4 w-8 h-8 bg-red-900/30 backdrop-blur-sm rounded-full flex items-center justify-center border border-red-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  >
                    <ArrowUpRight size={16} className="text-red-400" />
                  </motion.div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <motion.h3
                        className="text-xl lg:text-2xl font-light tracking-[0.05em] text-red-200 group-hover:text-white transition-colors duration-300 mb-2"
                        style={{ lineHeight: "1.2" }}
                      >
                        {project.title}
                      </motion.h3>
                      <div className="text-sm text-red-700 font-light mb-1">
                        {project.jpTitle}
                      </div>
                    </div>
                  </div>
                  
                  <p className="text-sm text-red-600 font-medium tracking-[0.1em] mb-3 uppercase">
                    {project.category} • {project.jpCategory}
                  </p>
                  
                  <p className="text-sm text-red-400 font-light leading-relaxed">
                    {project.description}
                  </p>

                  {/* Progress bar */}
                  <div className="mt-4 h-px bg-red-900/50 overflow-hidden">
                    <motion.div
                      initial={{ width: "0%" }}
                      animate={{
                        width: hoveredProject === project.id ? "100%" : "0%"
                      }}
                      transition={{ duration: 0.5 }}
                      className={`h-full ${project.accent}`}
                    />
                  </div>
                </div>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Floating background Japanese characters */}
      <motion.div
        animate={{ 
          rotate: [0, 360],
          scale: [1, 1.1, 1]
        }}
        transition={{ 
          duration: 60, 
          repeat: Infinity, 
          ease: "linear" 
        }}
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-[20rem] lg:text-[30rem] font-thin text-red-900/5 select-none pointer-events-none z-0"
      >
        作品
      </motion.div>

      {/* Section footer */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1 }}
        className="container mx-auto px-4 sm:px-8 mt-20 text-center relative z-10"
      >
        <motion.div
          initial={{ width: 0 }}
          whileInView={{ width: "8rem" }}
          transition={{ duration: 1.5 }}
          className="h-px bg-gradient-to-r from-transparent via-red-500 to-transparent mx-auto mb-8"
        />
        <p className="text-red-400 font-light tracking-[0.1em]">
          READY TO CREATE SOMETHING EXTRAORDINARY?{" "}
          <span className="text-red-700">特別なものを作る準備はできていますか？</span>
        </p>
      </motion.div>
    </section>
  );
}