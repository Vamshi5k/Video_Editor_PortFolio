'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';

const cookingTexts = [
  { kanji: '編', romaji: 'HEN', meaning: 'EDITING' },
  { kanji: '集', romaji: 'SHUU', meaning: 'COMPILING' },
  { kanji: '嵐', romaji: 'ARASHI', meaning: 'STORM' }
];

const cookingSteps = [
  'クリエイティブソースを調合中...',
  'ビジュアルスパイスを添加中...',
  'マスタリングフレイバーを仕込み中...',
  '完成間近...'
];

export default function EditorCookingPreloader({ onComplete }: { onComplete: () => void }) {
  const [currentStep, setCurrentStep] = useState(0);
  const [currentText, setCurrentText] = useState(0);
  const [progress, setProgress] = useState(0);
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    const textInterval = setInterval(() => {
      setCurrentText((prev) => (prev + 1) % cookingTexts.length);
    }, 1200);

    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          setIsComplete(true);
          setTimeout(() => {
            onComplete();
          }, 1500);
          return 100;
        }
        return prev + 1.5;
      });
    }, 60);

    const stepInterval = setInterval(() => {
      setCurrentStep((prev) => {
        if (prev < cookingSteps.length - 1) {
          return prev + 1;
        }
        return prev;
      });
    }, 1800);

    return () => {
      clearInterval(textInterval);
      clearInterval(progressInterval);
      clearInterval(stepInterval);
    };
  }, [onComplete]);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1.5, ease: "easeInOut" }}
      className="fixed inset-0 z-50 bg-black flex items-center justify-center overflow-hidden"
    >
      {/* Animated background with grid */}
      <div className="absolute inset-0 opacity-20">
        <div className="grid grid-cols-12 grid-rows-8 h-full w-full">
          {Array.from({ length: 96 }).map((_, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 0.4, 0] }}
              transition={{
                duration: 3,
                delay: i * 0.03,
                repeat: Infinity,
                repeatType: "loop"
              }}
              className="border border-red-900/30"
            />
          ))}
        </div>
      </div>

      {/* Pulsing red background effect */}
      <div className="absolute inset-0 overflow-hidden">
        {Array.from({ length: 8 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute bottom-0 w-64 h-64 bg-gradient-to-t from-red-900/10 to-red-800/5 rounded-full blur-xl"
            initial={{ 
              x: `${Math.random() * 100}%`, 
              y: 100,
              scale: 0.5,
              opacity: 0
            }}
            animate={{ 
              y: -100,
              scale: [0.5, 1.2, 0.8],
              opacity: [0, 0.7, 0]
            }}
            transition={{
              duration: 4 + Math.random() * 3,
              repeat: Infinity,
              delay: Math.random() * 2,
              ease: "easeOut"
            }}
          />
        ))}
      </div>

      {/* Main content container */}
      <div className="relative z-10 text-center">
        
        {/* Large Japanese characters with red effect */}
        <div className="relative mb-16">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentText}
              initial={{ 
                opacity: 0, 
                scale: 0.8,
                filter: "blur(10px)"
              }}
              animate={{ 
                opacity: 1, 
                scale: 1,
                filter: "blur(0px)"
              }}
              exit={{ 
                opacity: 0, 
                scale: 1.1,
                filter: "blur(8px)"
              }}
              transition={{ 
                duration: 0.8, 
                ease: "easeInOut"
              }}
              className="relative"
            >
              {/* Main kanji with red gradient */}
              <div className="text-[12rem] md:text-[16rem] font-thin bg-gradient-to-b from-red-300 to-red-700 bg-clip-text text-transparent leading-none select-none">
                {cookingTexts[currentText].kanji}
              </div>
              
              {/* Red glow effect */}
              <motion.div
                animate={{ 
                  opacity: [0.3, 0.7, 0.3],
                  scale: [1, 1.08, 1],
                  y: [0, -5, 0]
                }}
                transition={{ 
                  duration: 2, 
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                className="absolute inset-0 text-[12rem] md:text-[16rem] font-thin bg-gradient-to-b from-red-500/40 to-red-800/30 bg-clip-text text-transparent leading-none select-none blur-md"
              >
                {cookingTexts[currentText].kanji}
              </motion.div>
            </motion.div>
          </AnimatePresence>

          {/* Romaji and meaning */}
          <motion.div
            key={`${currentText}-text`}
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 text-center"
          >
            <div className="text-lg font-light tracking-[0.3em] text-red-400 mb-1">
              {cookingTexts[currentText].romaji}
            </div>
            <div className="text-sm font-light tracking-[0.2em] text-red-700">
              {cookingTexts[currentText].meaning}
            </div>
          </motion.div>
        </div>

        {/* Cooking process text */}
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="mb-12"
        >
          <AnimatePresence mode="wait">
            <motion.p
              key={currentStep}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.5 }}
              className="text-base font-light tracking-[0.15em] text-red-300"
            >
              {cookingSteps[currentStep]}
            </motion.p>
          </AnimatePresence>
        </motion.div>

        {/* Red progress bar */}
        <div className="relative w-80 mx-auto mb-4">
          {/* Background bar */}
          <div className="h-1 bg-red-900/50 w-full rounded-full overflow-hidden">
            {/* Progress fill with red gradient */}
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="h-full bg-gradient-to-r from-red-400 via-red-600 to-red-800 relative rounded-full"
            >
              {/* Red animation at the end */}
              <motion.div
                animate={{ 
                  opacity: [0.7, 1, 0.7],
                  scale: [1, 1.2, 1]
                }}
                transition={{ 
                  duration: 0.8, 
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                className="absolute -right-2 -top-1 w-4 h-4 bg-red-500 rounded-full shadow-lg shadow-red-600/50"
              />
              <motion.div
                animate={{ 
                  opacity: [0.5, 0.8, 0.5],
                  scale: [0.8, 1.1, 0.8],
                  y: [0, -2, 0]
                }}
                transition={{ 
                  duration: 0.6, 
                  repeat: Infinity,
                  delay: 0.2,
                  ease: "easeInOut"
                }}
                className="absolute -right-3 -top-2 w-2 h-2 bg-red-300 rounded-full"
              />
            </motion.div>
          </div>
          
          {/* Progress percentage */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            className="absolute -bottom-8 right-0 text-xs font-light tracking-[0.1em] text-red-600"
          >
            {Math.round(progress)}%
          </motion.div>
        </div>

        {/* Main title text */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.8 }}
          className="mt-12"
        >
          <div className="text-2xl font-light tracking-[0.2em] text-red-400 mb-2">
            編集者が嵐を調理中
          </div>
          <div className="text-sm font-light tracking-[0.15em] text-red-600">
            EDITOR IS COOKING STORM
          </div>
        </motion.div>

        {/* Completion message */}
        <AnimatePresence>
          {isComplete && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 1.2, y: -20 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="absolute -bottom-24 left-1/2 transform -translate-x-1/2"
            >
              <div className="text-2xl font-light tracking-[0.2em] text-red-400 mb-2">
                完成!
              </div>
              <div className="text-sm font-light tracking-[0.15em] text-red-600">
                MASTERPIECE READY
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Floating particles */}
      <div className="absolute inset-0 pointer-events-none">
        {Array.from({ length: 25 }).map((_, i) => (
          <motion.div
            key={i}
            initial={{ 
              opacity: 0,
              x: Math.random() * window.innerWidth,
              y: Math.random() * window.innerHeight,
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
            className="absolute text-red-500 text-xl"
          >
            {i % 3 === 0 ? '❚' : i % 3 === 1 ? '◆' : '●'}
          </motion.div>
        ))}
      </div>

      {/* Scanline effect */}
      <motion.div
        animate={{ y: ["-100vh", "100vh"] }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "linear",
          repeatDelay: 3
        }}
        className="absolute left-0 w-full h-px bg-gradient-to-r from-transparent via-red-500/20 to-transparent"
      />

      {/* Corner decorations */}
      <div className="absolute top-8 left-8 text-red-800 font-thin text-sm tracking-[0.2em]">
        エディター
      </div>
      <div className="absolute top-8 right-8 text-red-800 font-thin text-sm tracking-[0.2em]">
        クリエイター
      </div>
      <div className="absolute bottom-8 left-8 text-red-800 font-thin text-sm tracking-[0.2em]">
        ビデオ編集
      </div>
      <div className="absolute bottom-8 right-8 text-red-800 font-thin text-sm">
        嵐の調理
      </div>
    </motion.div>
  );
}