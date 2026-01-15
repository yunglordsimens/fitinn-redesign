import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { studios } from '../data/studios';

// --- НАСТРОЙКА ИКОНОК ---
const createCustomIcon = () => {
  return L.divIcon({
    className: "custom-marker",
    html: `<div style="
      background-color: #FFD500;
      width: 12px;
      height: 12px;
      border: 1px solid #000; 
      /* Сделали точку квадратной для строгости, или можно оставить круг */
      border-radius: 0%; 
    "></div>`,
    iconSize: [12, 12],
    iconAnchor: [6, 6],
    popupAnchor: [0, -10]
  });
};

const customIcon = createCustomIcon();

// --- КОМПОНЕНТ ОБНОВЛЕНИЯ КАРТЫ ---
function MapUpdater({ center }) {
  const map = useMap();
  useEffect(() => {
    map.setView(center, map.getZoom(), { animate: true, duration: 1.5 });
  }, [center, map]);
  return null;
}

// --- ОСНОВНОЙ КОМПОНЕНТ ---
export default function StudiosMap() {
  const [activeCountry, setActiveCountry] = useState('cz');
  const [activeStudio, setActiveStudio] = useState(null);
  
  const countries = [
    { code: 'cz', name: 'Česká Republika' },
    { code: 'at', name: 'Rakousko' },
    { code: 'sk', name: 'Slovensko' },
  ];

  const filteredStudios = studios.filter(s => s.country === activeCountry);
  
  const countryCenters = {
    cz: [50.0755, 14.4378],
    at: [48.2082, 16.3738],
    sk: [48.1486, 17.1077],
  };

  const mapCenter = countryCenters[activeCountry] || countryCenters['cz'];

  return (
    <section className="py-0 border-t border-brand-gray">
      {/* Убрали max-w-7xl, чтобы карта была на всю ширину (или оставь контейнер, но убери rounded) */}
      <div className="w-full"> 
        
        {/* ЗАГОЛОВОК СЕКЦИИ (В стиле списка выше) */}
        <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24 py-12">
            <h2 className="text-[10px] font-bold uppercase tracking-[0.3em] text-gray-500 mb-2 ml-1">
            /// Locations
            </h2>
            <h2 className="font-heading font-bold text-4xl md:text-5xl uppercase text-white tracking-tighter">
            Find Your <span className="text-brand-yellow">Space</span>
            </h2>
        </div>
        
        {/* КОНТЕЙНЕР КАРТЫ: ТЕПЕРЬ СТРОГИЙ ПРЯМОУГОЛЬНИК */}
        <div className="flex flex-col lg:flex-row h-[600px] w-full border-t border-brand-gray bg-brand-black">
          
          {/* ЛЕВАЯ ПАНЕЛЬ: СПИСОК */}
          <div className="w-full lg:w-1/3 bg-brand-black flex flex-col z-10 border-r border-brand-gray">
            
            {/* Селект страны */}
            <div className="p-6 border-b border-brand-gray">
              <label className="text-xs font-mono uppercase text-gray-500 mb-2 block tracking-widest">
                Select Region:
              </label>
              <div className="relative">
                <select 
                  value={activeCountry}
                  onChange={(e) => setActiveCountry(e.target.value)}
                  className="w-full bg-[#111] text-white font-heading font-bold uppercase text-2xl p-4 pr-10 appearance-none outline-none border border-gray-800 focus:border-brand-yellow transition-colors cursor-pointer rounded-none"
                >
                  {countries.map(c => (
                    <option key={c.code} value={c.code}>{c.name}</option>
                  ))}
                </select>
                <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-brand-yellow text-xs">▼</div>
              </div>
            </div>

            {/* Список студий */}
            <div className="overflow-y-auto flex-1 scrollbar-hide">
              {filteredStudios.map((studio) => (
                <div 
                  key={studio.id}
                  onClick={() => setActiveStudio(studio)}
                  className={`p-6 border-b border-gray-900 cursor-pointer transition-all hover:bg-white/5 group ${activeStudio?.id === studio.id ? 'bg-white/5 border-l-2 border-l-brand-yellow' : 'border-l-2 border-l-transparent'}`}
                >
                  <h3 className={`font-heading text-xl uppercase font-bold mb-1 group-hover:text-white transition-colors ${activeStudio?.id === studio.id ? 'text-brand-yellow' : 'text-gray-400'}`}>
                    {studio.name}
                  </h3>
                  <p className="text-xs font-mono text-gray-600 uppercase tracking-wider">
                    {studio.address}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* ПРАВАЯ ЧАСТЬ: КАРТА */}
          <div className="w-full lg:w-2/3 h-full relative bg-[#0a0a0a]">
            <MapContainer center={mapCenter} zoom={13} scrollWheelZoom={false} className="h-full w-full outline-none" style={{ background: '#050505' }}>
                <TileLayer
                  url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
                  attribution='&copy; CARTO'
                />
                <MapUpdater center={mapCenter} />
                {filteredStudios.map((studio) => (
                  <Marker 
                    key={studio.id} 
                    position={studio.coords}
                    icon={customIcon}
                    eventHandlers={{ click: () => setActiveStudio(studio) }}
                  >
                    <Popup className="custom-popup text-black rounded-none">
                      <strong className="uppercase font-bold block font-heading">{studio.name}</strong>
                    </Popup>
                  </Marker>
                ))}
            </MapContainer>
            
            {/* Сетка поверх карты для стиля */}
            <div className="absolute inset-0 pointer-events-none opacity-20 bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:50px_50px]"></div>
          </div>

        </div>
      </div>
    </section>
  );
}