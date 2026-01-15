import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const items = [
  { 
    id: "01", 
    title: "Equipment", 
    subtitle: "Gym80 & Precor Series", 
    image: "https://images.unsplash.com/photo-1689877020200-403d8542d95d?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" 
  },
  { 
    id: "02", 
    title: "Ladies Zone", 
    subtitle: "Private Area Access", 
    image: "https://images.unsplash.com/photo-1722925541142-5db2668ca492?q=80&w=987&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" 
  },
  { 
    id: "03", 
    title: "Functional", 
    subtitle: "Crossfit & Mobility", 
    image: "https://images.unsplash.com/photo-1534258936925-c58bed479fcb?q=80&w=2831&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" 
  },
  { 
    id: "04", 
    title: "Coaching", 
    subtitle: "Professional Support", 
    image: "https://plus.unsplash.com/premium_photo-1674062861948-be1469661851?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDE1fHx8ZW58MHx8fHx8" 
  }
];

export default function BenefitsList() {
  const [hoveredIndex, setHoveredIndex] = useState(0);

  return (
    <div className="w-full max-w-7xl mx-auto px-6 md:px-12 lg:px-24 flex flex-col md:flex-row gap-12 items-start md:items-center">
      
      <div className="w-full md:w-1/2 flex flex-col">
        <h2 className="text-[10px] font-bold uppercase tracking-[0.3em] text-gray-500 mb-8 ml-1">
          /// What We Offer
        </h2>
        
        {items.map((item, index) => (
          <div key={item.id} className="flex flex-col w-full">
            <div 
              onMouseEnter={() => setHoveredIndex(index)}
              className="group py-8 border-b border-gray-800 cursor-pointer flex items-baseline justify-between transition-colors hover:border-brand-yellow"
            >
              <div className="flex items-baseline gap-6">
                <span className="text-xs font-mono text-gray-600 group-hover:text-brand-yellow transition-colors">
                  /{item.id}
                </span>
                <h3 className="text-3xl md:text-5xl font-heading font-bold uppercase text-gray-400 group-hover:text-white transition-colors">
                  {item.title}
                </h3>
              </div>
              {/* Стрелка (только на ПК) */}
              <span className="hidden md:block opacity-0 group-hover:opacity-100 text-brand-yellow transition-opacity text-xl">
                →
              </span>
            </div>

            <div className="md:hidden w-full h-[250px] mt-4 mb-4 overflow-hidden relative">
               <img src={item.image} className="absolute inset-0 w-full h-full object-cover opacity-90" />
               <div className="absolute bottom-2 left-2 bg-brand-yellow px-2 py-1">
                 <p className="text-black text-[10px] font-bold uppercase">{item.subtitle}</p>
               </div>
            </div>
          </div>
        ))}
      </div>

      <div className="hidden md:block w-1/2 h-[600px] relative overflow-hidden bg-brand-black sticky top-20 border border-white/5">
        <AnimatePresence mode='wait'>
          <motion.img
            key={items[hoveredIndex].image}
            src={items[hoveredIndex].image}
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="absolute inset-0 w-full h-full object-cover opacity-80"
          />
        </AnimatePresence>
        
        <div className="absolute bottom-6 left-6 z-10">
            <div className="bg-brand-yellow px-3 py-1 inline-block mb-2">
                <p className="text-black text-xs font-bold uppercase tracking-widest">
                    {items[hoveredIndex].subtitle}
                </p>
            </div>
        </div>
        
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent pointer-events-none"></div>
      </div>

    </div>
  );
}