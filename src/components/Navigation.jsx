import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const links = [
  { title: "Domů", href: "/" },          // Home
  { title: "Ceník", href: "/cenik" },    // New page
  { title: "Studia", href: "/#studios" }, // Studios
  { title: "Kontakt", href: "/kontakt" } // New page
];

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);

  // Block scroll when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isOpen]);

  return (
    <>
      {/* TOP BAR */}
      <nav className="fixed top-0 left-0 w-full p-6 md:p-8 flex justify-between items-start z-[100] mix-blend-difference text-white">
        
        {/* Logo */}
        <div className="text-2xl font-heading font-bold tracking-tighter uppercase relative z-[100]">
            <a href="/" className="text-2xl font-heading font-bold tracking-tighter uppercase relative z-[100] hover:text-brand-yellow transition-colors">
             FitInn <span className="text-xs align-top opacity-50">®</span>
            </a>
        </div>

        {/* MENU BUTTON (HAMBURGER) */}
        <button 
          onClick={() => setIsOpen(!isOpen)}
          className="group flex flex-col items-end gap-1.5 cursor-pointer relative z-[100] p-2"
        >
          <span className={`h-[2px] bg-white transition-all duration-300 ${isOpen ? "w-6 rotate-45 translate-y-2" : "w-8"}`}></span>
          <span className={`h-[2px] bg-white transition-all duration-300 ${isOpen ? "opacity-0" : "w-6 group-hover:w-8"}`}></span>
          <span className={`h-[2px] bg-white transition-all duration-300 ${isOpen ? "w-6 -rotate-45 -translate-y-2" : "w-4 group-hover:w-8"}`}></span>
          <span className="sr-only">Menu</span>
        </button>
      </nav>

      {/* FULLSCREEN OVERLAY */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: "-100%" }}
            animate={{ opacity: 1, y: "0%" }}
            exit={{ opacity: 0, y: "-100%" }}
            transition={{ duration: 0.5, ease: [0.76, 0, 0.24, 1] }} // Smooth Bezier curve
            className="fixed inset-0 bg-brand-black z-[90] flex flex-col justify-center items-center"
          >
            {/* BACKGROUND YEAR NUMBER */}
            <div className="absolute bottom-[-5%] right-[-5%] text-[20vw] font-heading font-bold text-white/5 pointer-events-none select-none leading-none">
              2026
            </div>

            {/* LINKS LIST */}
            <div className="flex flex-col gap-6 md:gap-8 text-center relative z-10">
              {links.map((link, index) => (
                <motion.a
                  key={link.title}
                  href={link.href}
                  onClick={() => setIsOpen(false)} // Close on click
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 * index, duration: 0.5 }}
                  className="font-heading font-bold text-5xl md:text-7xl lg:text-8xl uppercase text-transparent text-stroke hover:text-brand-yellow transition-colors duration-300 tracking-tighter"
                  style={{ WebkitTextStroke: "1px rgba(255,255,255,0.8)" }} // Outline text
                >
                  {link.title}
                </motion.a>
              ))}
            </div>

            {/* BOTTOM INFO */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="absolute bottom-8 left-0 w-full text-center"
            >
              <p className="text-xs font-mono uppercase text-gray-500 tracking-widest">
                Prague • Brno • Vienna • Bratislava
              </p>
            </motion.div>

          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}