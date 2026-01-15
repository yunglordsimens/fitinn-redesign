import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function FreePassModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [isSent, setIsSent] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Имитация отправки
    setIsSent(true);
    setTimeout(() => {
      setIsOpen(false);
      setIsSent(false); // Сброс для следующего раза
    }, 2000);
  };

  return (
    <>
      {/* КНОПКА-ТРИГГЕР */}
      <button 
        onClick={() => setIsOpen(true)}
        className="bg-brand-yellow text-black font-bold uppercase px-8 py-4 hover:bg-white transition-colors tracking-widest"
      >
        Získat Free Pass
      </button>

      {/* МОДАЛКА */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[200] bg-brand-black/90 backdrop-blur-md flex items-center justify-center p-4"
            onClick={() => setIsOpen(false)}
          >
            <motion.div 
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="bg-[#111] border border-gray-800 p-8 md:p-12 max-w-lg w-full relative"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Крестик */}
              <button 
                onClick={() => setIsOpen(false)}
                className="absolute top-4 right-4 text-gray-500 hover:text-brand-yellow text-xl"
              >
                ✕
              </button>

              {!isSent ? (
                <>
                  <h2 className="font-heading text-3xl uppercase text-white mb-2">První vstup zdarma</h2>
                  <p className="text-gray-400 text-sm mb-8">Vyzkoušej FitInn na jeden den. Žádné závazky.</p>
                  
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label className="block text-[10px] uppercase text-brand-yellow tracking-widest mb-2">Jméno</label>
                        <input required type="text" className="w-full bg-transparent border-b border-gray-700 py-2 text-white focus:outline-none focus:border-white transition-colors" />
                    </div>
                    <div>
                        <label className="block text-[10px] uppercase text-brand-yellow tracking-widest mb-2">Email</label>
                        <input required type="email" className="w-full bg-transparent border-b border-gray-700 py-2 text-white focus:outline-none focus:border-white transition-colors" />
                    </div>
                    <div>
                        <label className="block text-[10px] uppercase text-brand-yellow tracking-widest mb-2">Telefon</label>
                        <input required type="tel" className="w-full bg-transparent border-b border-gray-700 py-2 text-white focus:outline-none focus:border-white transition-colors" />
                    </div>

                    <button type="submit" className="w-full bg-white text-black font-bold uppercase py-4 hover:bg-brand-yellow transition-colors mt-4">
                        Odeslat
                    </button>
                  </form>
                </>
              ) : (
                <div className="text-center py-10">
                  <div className="text-5xl mb-4">✅</div>
                  <h3 className="font-heading text-2xl text-white uppercase">Odesláno!</h3>
                  <p className="text-gray-500 mt-2">Voucher ti přijde na email.</p>
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}