'use client';

import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { Mail, Phone, MapPin, Send, MessageCircle, Video, Film, Camera } from 'lucide-react';
import { useRef, useState } from 'react';

export default function ContactSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    project: '',
    message: ''
  });

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [activeField, setActiveField] = useState<string | null>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], ["50px", "-50px"]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
    // Handle form submission
    console.log('Form submitted:', formData);
    
    // Reset form after 3 seconds
    setTimeout(() => {
      setIsSubmitted(false);
      setFormData({
        name: '',
        email: '',
        project: '',
        message: ''
      });
    }, 3000);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const projectTypes = [
    { value: "commercial", label: "Commercial", jp: "コマーシャル" },
    { value: "music-video", label: "Music Video", jp: "ミュージックビデオ" },
    { value: "documentary", label: "Documentary", jp: "ドキュメンタリー" },
    { value: "short-film", label: "Short Film", jp: "ショートフィルム" },
    { value: "wedding", label: "Wedding", jp: "結婚式" },
    { value: "other", label: "Other", jp: "その他" }
  ];

  return (
    <section id="contact" className="relative py-32 bg-black overflow-hidden">
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
          {Array.from({ length: 12 }).map((_, i) => (
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
              {i % 6 === 0 ? '話' : i % 6 === 1 ? '連' : i % 6 === 2 ? '絡' : i % 6 === 3 ? '映' : i % 6 === 4 ? '画' : '編'}
            </motion.div>
          ))}
        </div>
      </div>

      <div ref={containerRef} className="container mx-auto px-8 relative z-10">
        {/* Section header */}
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <h2 className="text-5xl md:text-7xl font-thin tracking-[0.2em] text-red-400 mb-4">
            CONTACT
          </h2>
          <div className="text-2xl text-red-700 font-light tracking-[0.1em] mb-6">
            連絡 - Get In Touch
          </div>
          <motion.div
            initial={{ width: 0 }}
            whileInView={{ width: "20%" }}
            transition={{ duration: 1, delay: 0.5 }}
            className="h-px bg-gradient-to-r from-transparent via-red-500 to-transparent mx-auto mb-8"
          />
          <p className="text-lg text-red-300 font-light tracking-[0.15em]">
            あなたのビジョンを形にしましょう - Let's bring your vision to life
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
          
          {/* Contact Info */}
          <motion.div
            initial={{ x: -100, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
            className="space-y-12"
          >
            <div>
              <h3 className="text-2xl font-light tracking-[0.15em] text-red-400 mb-4">
                LET'S CREATE TOGETHER
              </h3>
              <div className="text-red-700 text-sm mb-8">協力して作りましょう - Collaborative Creation</div>
              <p className="text-base font-light leading-relaxed text-red-200 mb-8">
                Whether you're looking to create a compelling narrative, enhance your brand's visual identity, 
                or bring an artistic vision to life, I'm here to collaborate and craft something extraordinary.
              </p>
            </div>

            {/* Contact details */}
            <div className="space-y-6">
              {[
                { icon: Mail, label: 'Email', value: 'srujan@editor.com', jp: 'メール' },
                { icon: Phone, label: 'Phone', value: '+81 90-1234-5678', jp: '電話' },
                { icon: MapPin, label: 'Location', value: 'Tokyo, Japan', jp: '場所' },
                { icon: Film, label: 'Projects', value: '25+ Completed', jp: 'プロジェクト' }
              ].map((item, index) => (
                <motion.div
                  key={item.label}
                  initial={{ x: -20, opacity: 0 }}
                  whileInView={{ x: 0, opacity: 1 }}
                  transition={{ duration: 0.8, delay: index * 0.2 }}
                  viewport={{ once: true }}
                  className="flex items-center group cursor-pointer p-4 bg-red-900/10 border border-red-900/20 hover:border-red-500 transition-all duration-500"
                >
                  <div className="w-12 h-12 bg-red-900/20 rounded-full flex items-center justify-center mr-4 group-hover:bg-red-500/20 transition-colors duration-300">
                    <item.icon size={18} className="text-red-500 group-hover:text-red-300 transition-colors duration-300" />
                  </div>
                  <div>
                    <div className="text-xs font-light tracking-[0.1em] text-red-700 uppercase">
                      {item.label} • {item.jp}
                    </div>
                    <div className="text-base font-light text-red-300 group-hover:text-red-100 transition-colors duration-300">
                      {item.value}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Japanese calligraphy */}
            <motion.div
              style={{ y }}
              className="relative mt-12"
            >
              <div className="text-8xl font-thin text-red-500/10 select-none text-center">
                映像編集者
              </div>
              <div className="text-sm text-red-700 text-center mt-2">Video Editor</div>
            </motion.div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ x: 100, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
            className="relative"
          >
            {/* Success message */}
            <AnimatePresence>
              {isSubmitted && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  className="absolute inset-0 bg-black/90 backdrop-blur-sm flex items-center justify-center z-10"
                >
                  <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    className="text-center p-8"
                  >
                    <motion.div
                      animate={{ scale: [1, 1.1, 1] }}
                      transition={{ duration: 0.5 }}
                      className="text-6xl text-red-500 mb-4"
                    >
                      ✓
                    </motion.div>
                    <h3 className="text-2xl font-light text-red-400 mb-2">Message Sent!</h3>
                    <p className="text-red-300">Thank you for your inquiry. I'll respond within 24 hours.</p>
                    <p className="text-red-700 text-sm mt-2">ありがとうございます - Thank you</p>
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>

            <form onSubmit={handleSubmit} className="space-y-8 bg-black/30 backdrop-blur-sm p-8 border border-red-900/30">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  whileInView={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.8, delay: 0.1 }}
                  viewport={{ once: true }}
                  className="relative"
                >
                  <label htmlFor="name" className="block text-xs font-light tracking-[0.1em] text-red-700 uppercase mb-3">
                    Your Name • お名前
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    onFocus={() => setActiveField('name')}
                    onBlur={() => setActiveField(null)}
                    className="w-full bg-transparent border-b border-red-800 py-3 text-red-100 font-light focus:border-red-500 focus:outline-none transition-colors duration-300 placeholder-red-800"
                    placeholder="Enter your name"
                    required
                  />
                  {activeField === 'name' && (
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: '100%' }}
                      className="h-0.5 bg-gradient-to-r from-red-500 to-red-400 mt-1"
                    />
                  )}
                </motion.div>

                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  whileInView={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                  viewport={{ once: true }}
                  className="relative"
                >
                  <label htmlFor="email" className="block text-xs font-light tracking-[0.1em] text-red-700 uppercase mb-3">
                    Email • メールアドレス
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    onFocus={() => setActiveField('email')}
                    onBlur={() => setActiveField(null)}
                    className="w-full bg-transparent border-b border-red-800 py-3 text-red-100 font-light focus:border-red-500 focus:outline-none transition-colors duration-300 placeholder-red-800"
                    placeholder="your@email.com"
                    required
                  />
                  {activeField === 'email' && (
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: '100%' }}
                      className="h-0.5 bg-gradient-to-r from-red-500 to-red-400 mt-1"
                    />
                  )}
                </motion.div>
              </div>

              <motion.div
                initial={{ y: 20, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                viewport={{ once: true }}
                className="relative"
              >
                <label htmlFor="project" className="block text-xs font-light tracking-[0.1em] text-red-700 uppercase mb-3">
                  Project Type • プロジェクトタイプ
                </label>
                <div className="relative">
                  <select
                    id="project"
                    name="project"
                    value={formData.project}
                    onChange={handleInputChange}
                    onFocus={() => setActiveField('project')}
                    onBlur={() => setActiveField(null)}
                    className="w-full bg-black/30 border-b border-red-800 py-3 text-red-100 font-light focus:border-red-500 focus:outline-none transition-colors duration-300 appearance-none"
                    required
                  >
                    <option value="" className="bg-black">Select project type</option>
                    {projectTypes.map((type) => (
                      <option key={type.value} value={type.value} className="bg-black">
                        {type.label} • {type.jp}
                      </option>
                    ))}
                  </select>
                  <div className="absolute right-0 top-0 bottom-0 flex items-center px-3 text-red-700 pointer-events-none">
                    ▼
                  </div>
                </div>
                {activeField === 'project' && (
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: '100%' }}
                    className="h-0.5 bg-gradient-to-r from-red-500 to-red-400 mt-1"
                  />
                )}
              </motion.div>

              <motion.div
                initial={{ y: 20, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                viewport={{ once: true }}
                className="relative"
              >
                <label htmlFor="message" className="block text-xs font-light tracking-[0.1em] text-red-700 uppercase mb-3">
                  Project Details • プロジェクト詳細
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={5}
                  value={formData.message}
                  onChange={handleInputChange}
                  onFocus={() => setActiveField('message')}
                  onBlur={() => setActiveField(null)}
                  className="w-full bg-black/30 border border-red-800 p-4 text-red-100 font-light focus:border-red-500 focus:outline-none transition-colors duration-300 resize-none placeholder-red-800"
                  placeholder="Tell me about your vision, timeline, and expectations..."
                  required
                />
                {activeField === 'message' && (
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: '100%' }}
                    className="h-0.5 bg-gradient-to-r from-red-500 to-red-400 mt-1"
                  />
                )}
              </motion.div>

              <motion.button
                type="submit"
                initial={{ y: 20, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.5 }}
                viewport={{ once: true }}
                whileHover={{ 
                  scale: 1.02,
                  boxShadow: "0 0 30px rgba(239, 68, 68, 0.5)" 
                }}
                whileTap={{ scale: 0.98 }}
                className="group relative w-full inline-flex items-center justify-center gap-4 px-12 py-4 bg-red-900/20 border border-red-800 text-red-100 font-light tracking-[0.2em] transition-all duration-300 hover:border-red-500 hover:bg-red-900/30"
              >
                <Send size={18} className="group-hover:text-red-300 transition-colors" />
                SEND MESSAGE • メッセージを送信
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-red-500/10 to-red-400/10"
                  initial={{ scaleX: 0 }}
                  whileHover={{ scaleX: 1 }}
                  transition={{ duration: 0.3 }}
                />
              </motion.button>
            </form>
          </motion.div>
        </div>
      </div>

      {/* Background Japanese text */}
      <motion.div
        style={{ y, opacity }}
        className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden"
      >
        <div className="text-[25rem] font-thin text-red-900/5 select-none">
          連絡
        </div>
      </motion.div>
    </section>
  );
}