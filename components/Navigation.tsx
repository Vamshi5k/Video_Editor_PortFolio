'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import { Menu, X, Play, Film, User, Mail, Home } from 'lucide-react';

const navItems = [
  { id: 'home', label: 'Home', icon: Home },
  { id: 'projects', label: 'Projects', icon: Film },
  { id: 'about', label: 'About', icon: User },
  { id: 'contact', label: 'Contact', icon: Mail }
];

const japaneseNavItems = [
  { id: 'home', label: 'ホーム', en: 'Home' },
  { id: 'projects', label: 'プロジェクト', en: 'Projects' },
  { id: 'about', label: '約', en: 'About' },
  { id: 'contact', label: '接触', en: 'Contact' }
];

export default function Navigation() {
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);
  const [activeItem, setActiveItem] = useState('home');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 50;
      setScrolled(isScrolled);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleItemClick = (itemId: string) => {
    setActiveItem(itemId);
    setIsMenuOpen(false);
  };

  return (
    <>
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1, delay: 0.5 }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled 
            ? 'bg-black/90 backdrop-blur-md py-3 shadow-lg shadow-red-900/10' 
            : 'bg-transparent py-6'
        }`}
      >
        <div className="container mx-auto px-6 flex justify-between items-center">
          {/* Logo */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center gap-3 cursor-pointer group"
          >
            <motion.div
              animate={{ 
                rotate: [0, 10, -10, 0],
                scale: [1, 1.1, 1]
              }}
              transition={{ duration: 1.5, repeat: Infinity, repeatDelay: 5 }}
              className="text-2xl font-thin text-red-500"
            >
              編
            </motion.div>
            <div className="flex flex-col">
              <span className="text-lg font-light tracking-[0.3em] text-white">SR</span>
              <span className="text-xs text-red-500 font-light tracking-[0.2em] opacity-0 group-hover:opacity-100 transition-opacity">
                スルジャン
              </span>
            </div>
          </motion.div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => {
              const japaneseItem = japaneseNavItems.find(i => i.id === item.id);
              return (
                <motion.a
                  key={item.id}
                  href={`#${item.id}`}
                  className="relative py-2 text-sm font-light tracking-[0.1em] cursor-pointer group"
                  onMouseEnter={() => setHoveredItem(item.id)}
                  onMouseLeave={() => setHoveredItem(null)}
                  onClick={() => handleItemClick(item.id)}
                  whileHover={{ y: -2 }}
                  transition={{ duration: 0.2 }}
                >
                  <span className={`transition-colors duration-300 ${
                    activeItem === item.id ? 'text-red-500' : 'text-neutral-300 group-hover:text-white'
                  }`}>
                    {item.label}
                  </span>
                  
                  {japaneseItem && (
                    <span className="block text-xs text-red-700 mt-1 transition-opacity duration-300 opacity-0 group-hover:opacity-100">
                      {japaneseItem.label}
                    </span>
                  )}
                  
                  {(hoveredItem === item.id || activeItem === item.id) && (
                    <motion.div
                      layoutId="navbar-indicator"
                      className="absolute -bottom-1 left-0 right-0 h-0.5 bg-red-500"
                      initial={{ scaleX: 0 }}
                      animate={{ scaleX: 1 }}
                      transition={{ duration: 0.3 }}
                    />
                  )}
                </motion.a>
              );
            })}
            
       
          </div>

          {/* Mobile menu button */}
          <motion.button
            whileTap={{ scale: 0.9 }}
            className="md:hidden text-red-500 z-60"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </motion.button>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 bg-black/80 backdrop-blur-sm z-40 md:hidden"
              onClick={() => setIsMenuOpen(false)}
            />
            
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 h-full w-80 bg-black/95 border-l border-red-900/30 shadow-2xl shadow-red-900/10 z-50 md:hidden overflow-y-auto"
            >
              <div className="p-8 flex flex-col h-full">
                {/* Logo in menu */}
                <div className="flex items-center gap-3 mb-12 mt-4">
                  <div className="text-2xl font-thin text-red-500">編</div>
                  <div className="flex flex-col">
                    <span className="text-lg font-light tracking-[0.3em] text-white">SRUJAN</span>
                    <span className="text-xs text-red-500 font-light tracking-[0.2em]">ラチェルラ</span>
                  </div>
                </div>

                {/* Mobile navigation items */}
                <div className="flex flex-col space-y-8">
                  {navItems.map((item) => {
                    const IconComponent = item.icon;
                    const japaneseItem = japaneseNavItems.find(i => i.id === item.id);
                    
                    return (
                      <motion.a
                        key={item.id}
                        href={`#${item.id}`}
                        className={`flex items-center gap-4 py-3 text-lg font-light tracking-[0.1em] cursor-pointer border-b border-red-900/30 transition-all duration-300 ${
                          activeItem === item.id ? 'text-red-500' : 'text-neutral-300 hover:text-white'
                        }`}
                        onClick={() => handleItemClick(item.id)}
                        whileHover={{ x: 10 }}
                        transition={{ duration: 0.2 }}
                      >
                        <IconComponent size={20} className="text-red-700" />
                        <div className="flex flex-col">
                          <span>{item.label}</span>
                          {japaneseItem && (
                            <span className="text-xs text-red-700 mt-1">
                              {japaneseItem.label}
                            </span>
                          )}
                        </div>
                      </motion.a>
                    );
                  })}
                </div>

            

                {/* Decorative elements */}
                <div className="mt-auto pt-12 text-center">
                  <div className="text-red-900 text-sm tracking-[0.2em]">
                    映像編集者
                  </div>
                  <div className="text-red-700 text-xs mt-2">
                    VIDEO EDITOR
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Decorative floating elements */}
      <div className="fixed top-4 left-4 z-30 pointer-events-none md:block hidden">
        <motion.div
          animate={{ 
            opacity: [0.3, 0.7, 0.3],
            y: [0, -5, 0]
          }}
          transition={{ duration: 4, repeat: Infinity }}
          className="text-red-900 text-sm tracking-[0.3em]"
        >
          編集
        </motion.div>
      </div>
      
      <div className="fixed top-4 right-4 z-30 pointer-events-none md:block hidden">
        <motion.div
          animate={{ 
            opacity: [0.3, 0.7, 0.3],
            y: [0, 5, 0]
          }}
          transition={{ duration: 4, repeat: Infinity, delay: 1 }}
          className="text-red-900 text-sm tracking-[0.3em]"
        >
          嵐
        </motion.div>
      </div>
    </>
  );
}