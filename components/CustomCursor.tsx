'use client';

import { motion, useMotionValue, useSpring } from 'framer-motion';
import { useEffect, useState } from 'react';

export default function CustomCursor() {
  const [isHovered, setIsHovered] = useState(false);
  const [cursorText, setCursorText] = useState('');
  
  const cursorX = useMotionValue(0);
  const cursorY = useMotionValue(0);
  
  const springConfig = { damping: 25, stiffness: 700 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX - 16);
      cursorY.set(e.clientY - 16);
    };

    const handleMouseEnter = (e: Event) => {
      const target = e.target as HTMLElement;
      if (target.tagName === 'BUTTON' || target.tagName === 'A' || target.closest('button') || target.closest('a')) {
        setIsHovered(true);
        setCursorText('CLICK');
      } else if (target.tagName === 'IMG' || target.closest('.project-card')) {
        setIsHovered(true);
        setCursorText('VIEW');
      }
    };

    const handleMouseLeave = () => {
      setIsHovered(false);
      setCursorText('');
    };

    window.addEventListener('mousemove', moveCursor);
    
    // Add event listeners to interactive elements
    const interactiveElements = document.querySelectorAll('button, a, img, .project-card');
    interactiveElements.forEach(el => {
      el.addEventListener('mouseenter', handleMouseEnter);
      el.addEventListener('mouseleave', handleMouseLeave);
    });

    return () => {
      window.removeEventListener('mousemove', moveCursor);
      interactiveElements.forEach(el => {
        el.removeEventListener('mouseenter', handleMouseEnter);
        el.removeEventListener('mouseleave', handleMouseLeave);
      });
    };
  }, [cursorX, cursorY]);

  return (
    <>
      <motion.div
        className="fixed top-0 left-0 w-8 h-8 pointer-events-none z-50 mix-blend-difference"
        style={{
          x: cursorXSpring,
          y: cursorYSpring,
        }}
      >
        <motion.div
          animate={{
            scale: isHovered ? 2 : 1,
            backgroundColor: isHovered ? '#ef4444' : '#ffffff',
          }}
          className="w-full h-full rounded-full bg-white"
          transition={{ type: "spring", stiffness: 500, damping: 28 }}
        />
        
        {isHovered && cursorText && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 px-2 py-1 bg-white text-black text-xs font-light tracking-wider rounded"
          >
            {cursorText}
          </motion.div>
        )}
      </motion.div>
    </>
  );
}