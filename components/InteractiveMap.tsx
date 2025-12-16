import React, { useEffect, useRef, useState } from 'react';
import L from 'leaflet';
import { POINTS_OF_INTEREST, TRAVEL_TIMES } from '../constants';
import { PointOfInterest } from '../types';
import { PlusCircle, Clock, MapPin, X, Navigation } from 'lucide-react';

interface InteractiveMapProps {
  onAddToItinerary: (poi: PointOfInterest) => void;
  myItinerary: string[];
}

const InteractiveMap: React.FC<InteractiveMapProps> = ({ onAddToItinerary, myItinerary }) => {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const [selectedPOI, setSelectedPOI] = useState<PointOfInterest | null>(null);
  const [showTravelTimes, setShowTravelTimes] = useState(false);

  useEffect(() => {
    if (!mapContainerRef.current) return;
    if (mapInstanceRef.current) return; // Prevent double init

    // Center approx between Armenia and Pereira
    const map = L.map(mapContainerRef.current).setView([4.7, -75.6], 9);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    mapInstanceRef.current = map;

    // Define icons
    const getIcon = (category: string) => {
      let color = '#6d4c41'; // coffee default
      if (category === 'city') color = '#2563eb';
      if (category === 'nature') color = '#16a34a';
      if (category === 'town') color = '#d97706';
      if (category === 'park') color = '#9333ea';

      return L.divIcon({
        className: 'custom-icon',
        html: `<div style="background-color: ${color}; width: 14px; height: 14px; border-radius: 50%; border: 2px solid white; box-shadow: 0 2px 4px rgba(0,0,0,0.3);"></div>`,
        iconSize: [14, 14],
        iconAnchor: [7, 7]
      });
    };

    POINTS_OF_INTEREST.forEach(poi => {
      const marker = L.marker([poi.lat, poi.lng], { icon: getIcon(poi.category) })
        .addTo(map)
        .on('click', () => {
          setSelectedPOI(poi);
          map.flyTo([poi.lat, poi.lng], 13, { duration: 1.5 });
        });
        
        // Add a simple tooltip on hover
        marker.bindTooltip(poi.name, { direction: 'top', offset: [0, -10] });
    });

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, []);

  const getCategoryLabel = (cat: string) => {
    const labels: Record<string, string> = {
      city: 'Ciudad Principal',
      town: 'Pueblo',
      nature: 'Naturaleza',
      farm: 'Finca Cafetera',
      park: 'Parque Temático'
    };
    return labels[cat] || cat;
  };

  const getCategoryColor = (cat: string) => {
     const colors: Record<string, string> = {
      city: 'bg-blue-600',
      town: 'bg-amber-600',
      nature: 'bg-green-600',
      farm: 'bg-coffee-700',
      park: 'bg-purple-600'
    };
    return colors[cat] || 'bg-gray-600';
  }

  return (
    <div className="relative h-full w-full bg-coffee-50 flex flex-col md:flex-row">
      {/* Map Container */}
      <div ref={mapContainerRef} className="flex-1 h-full z-0 outline-none" style={{ minHeight: '400px' }} />

      {/* Floating Controls Layer */}
      <div className="absolute top-4 right-4 z-[500] flex flex-col gap-2">
         <button 
           onClick={() => setShowTravelTimes(!showTravelTimes)}
           className="bg-white p-3 rounded-full shadow-lg hover:bg-coffee-50 text-coffee-800 transition-all border border-coffee-200"
           title="Tiempos de Viaje"
         >
           <Clock size={24} />
         </button>
      </div>

      {/* Legend / Key - visible on large screens */}
      <div className="absolute bottom-6 left-6 z-[500] bg-white/90 backdrop-blur p-4 rounded-lg shadow-lg border border-coffee-200 hidden md:block">
        <h4 className="font-bold text-coffee-900 text-sm mb-2">Leyenda</h4>
        <div className="space-y-1">
          <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-full bg-blue-600 border border-white shadow-sm"></div><span className="text-xs">Ciudad</span></div>
          <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-full bg-amber-600 border border-white shadow-sm"></div><span className="text-xs">Pueblo</span></div>
          <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-full bg-green-600 border border-white shadow-sm"></div><span className="text-xs">Naturaleza</span></div>
          <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-full bg-coffee-700 border border-white shadow-sm"></div><span className="text-xs">Finca</span></div>
          <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-full bg-purple-600 border border-white shadow-sm"></div><span className="text-xs">Parque</span></div>
        </div>
      </div>

      {/* Travel Times Panel */}
      {showTravelTimes && (
        <div className="absolute top-16 right-4 z-[500] w-72 bg-white rounded-xl shadow-2xl border border-coffee-200 overflow-hidden animate-fadeIn">
          <div className="bg-coffee-100 p-3 flex justify-between items-center border-b border-coffee-200">
            <h3 className="font-bold text-coffee-800 flex items-center gap-2">
              <Navigation size={16} /> Tiempos Estimados
            </h3>
            <button onClick={() => setShowTravelTimes(false)} className="text-coffee-600 hover:text-coffee-900"><X size={18} /></button>
          </div>
          <div className="p-0 max-h-64 overflow-y-auto">
            <table className="w-full text-sm text-left">
              <thead className="bg-coffee-50 text-xs text-coffee-600 uppercase">
                <tr>
                  <th className="px-3 py-2">Ruta</th>
                  <th className="px-3 py-2 text-right">Tiempo</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-coffee-100">
                {TRAVEL_TIMES.map((route, idx) => (
                  <tr key={idx} className="hover:bg-coffee-50">
                    <td className="px-3 py-2 text-coffee-800">{route.from} ➝ {route.to}</td>
                    <td className="px-3 py-2 text-right font-medium text-coffee-600">{route.time}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="bg-coffee-50 p-2 text-[10px] text-center text-coffee-500 border-t border-coffee-100">
            * En auto particular. Puede variar por tráfico o clima.
          </div>
        </div>
      )}

      {/* Selected POI Details Card */}
      {selectedPOI && (
        <div className="absolute bottom-0 left-0 right-0 md:left-auto md:right-auto md:bottom-8 md:top-auto md:w-80 md:translate-x-1/2 md:mx-auto lg:mx-0 lg:left-8 z-[600] m-4 md:m-0">
          <div className="bg-white rounded-xl shadow-2xl border border-coffee-200 overflow-hidden animate-slideUp">
             <div className={`${getCategoryColor(selectedPOI.category)} h-2 w-full`}></div>
             <div className="p-5">
               <div className="flex justify-between items-start mb-2">
                 <div>
                   <span className={`text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full ${getCategoryColor(selectedPOI.category)} bg-opacity-10 text-coffee-800 border border-coffee-100`}>
                     {getCategoryLabel(selectedPOI.category)}
                   </span>
                   <h2 className="text-xl font-bold text-coffee-900 mt-1">{selectedPOI.name}</h2>
                 </div>
                 <button onClick={() => setSelectedPOI(null)} className="text-gray-400 hover:text-gray-600">
                   <X size={20} />
                 </button>
               </div>
               
               <p className="text-sm text-coffee-600 mb-4 leading-relaxed">
                 {selectedPOI.description}
               </p>

               {selectedPOI.contact && (
                 <div className="flex items-center gap-2 text-xs text-coffee-500 mb-4 bg-coffee-50 p-2 rounded-lg">
                   <MapPin size={12} />
                   <span>{selectedPOI.contact}</span>
                 </div>
               )}

               <button 
                 onClick={() => {
                   onAddToItinerary(selectedPOI);
                   // Visual feedback could be added here
                 }}
                 disabled={myItinerary.includes(selectedPOI.name)}
                 className={`w-full py-2.5 rounded-lg font-bold flex items-center justify-center gap-2 transition-colors ${
                   myItinerary.includes(selectedPOI.name)
                     ? 'bg-green-100 text-green-700 cursor-default'
                     : 'bg-coffee-600 hover:bg-coffee-700 text-white'
                 }`}
               >
                 {myItinerary.includes(selectedPOI.name) ? (
                   <>¡Agregado!</>
                 ) : (
                   <>
                     <PlusCircle size={18} /> Agregar a mi Ruta
                   </>
                 )}
               </button>
             </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default InteractiveMap;