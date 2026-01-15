import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function VideoModal() {
  const [isOpen, setIsOpen] = useState(false);

  // ID видео с YouTube (замени на реальный ID от FitInn, если есть)
  const videoId = "M7lc1UVf-VE"; 

  return (
    <>
      {/* КНОПКА PLAY (Фиксированная внизу справа) */}
      <button 
        onClick={() => setIsOpen(true)}
        className="fixed bottom-8 right-8 z-[60] group flex items-center gap-3 bg-white text-black px-6 py-3 rounded-full hover:bg-brand-yellow transition-colors shadow-2xl border border-gray-200"
      >
        <span className="w-2 h-2 bg-red-600 rounded-full animate-pulse"></span>
        <span className="text-xs font-bold uppercase tracking-widest">Play Showreel</span>
      </button>

      {/* МОДАЛЬНОЕ ОКНО */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[200] bg-black/90 backdrop-blur-md flex items-center justify-center p-4 md:p-10"
            onClick={() => setIsOpen(false)}
          >
            
            {/* Кнопка Закрыть */}
            <button className="absolute top-8 right-8 text-white text-xl font-mono uppercase hover:text-brand-yellow">
              [Close X]
            </button>

            {/* Контейнер видео */}
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="w-full max-w-5xl aspect-video bg-black shadow-[0_0_50px_rgba(255,213,0,0.2)]"
              onClick={(e) => e.stopPropagation()}
            >
              <iframe 
                width="100%" 
                height="100%" 
                src={`https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0`} 
                title="FitInn Video" 
                frameBorder="0" 
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                allowFullScreen
              ></iframe>
            </motion.div>

          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}