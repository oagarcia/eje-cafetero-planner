import React, { useState } from 'react';
import { ViewState, PointOfInterest } from './types';
import { LOCATIONS, ITINERARIES } from './constants';
import BudgetCalculator from './components/BudgetCalculator';
import AIChat from './components/AIChat';
import InteractiveMap from './components/InteractiveMap';
import { Map as MapIcon, MapPin, Coffee, DollarSign, Calendar, MessageSquare, Menu, X, ArrowRight, Sun, CloudRain, CheckCircle } from 'lucide-react';

function App() {
  const [view, setView] = useState<ViewState>('home');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [myItinerary, setMyItinerary] = useState<string[]>([]);
  const [notification, setNotification] = useState<string | null>(null);

  const NavItem = ({ target, icon: Icon, label }: { target: ViewState; icon: any; label: string }) => (
    <button
      onClick={() => {
        setView(target);
        setMobileMenuOpen(false);
      }}
      className={`flex items-center gap-2 px-4 py-2 rounded-full transition-all duration-300 ${
        view === target
          ? 'bg-coffee-600 text-white shadow-md transform scale-105'
          : 'text-coffee-800 hover:bg-coffee-100'
      }`}
    >
      <Icon size={18} />
      <span className="font-medium">{label}</span>
    </button>
  );

  const addToItinerary = (poi: PointOfInterest) => {
    if (!myItinerary.includes(poi.name)) {
      setMyItinerary([...myItinerary, poi.name]);
      showNotification(`Agregaste ${poi.name} a tu ruta`);
    }
  };

  const removeFromItinerary = (name: string) => {
    setMyItinerary(myItinerary.filter(item => item !== name));
  };

  const showNotification = (msg: string) => {
    setNotification(msg);
    setTimeout(() => setNotification(null), 3000);
  };

  return (
    <div className="h-full flex flex-col bg-coffee-50 relative">
      {/* Notification Toast */}
      {notification && (
        <div className="absolute top-20 right-4 z-[1000] bg-coffee-800 text-white px-4 py-3 rounded-lg shadow-xl flex items-center gap-2 animate-fadeIn">
          <CheckCircle size={20} className="text-leaf-500" />
          <span>{notification}</span>
        </div>
      )}

      {/* Header */}
      <header className="bg-white/90 backdrop-blur-md border-b border-coffee-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2 text-coffee-800" onClick={() => setView('home')}>
            <div className="w-8 h-8 bg-coffee-600 rounded-lg flex items-center justify-center text-white">
              <Coffee size={20} />
            </div>
            <span className="text-xl font-bold tracking-tight cursor-pointer">EjePlanner</span>
          </div>

          {/* Desktop Nav */}
          <nav className="hidden md:flex gap-1">
            <NavItem target="home" icon={MapPin} label="Inicio" />
            <NavItem target="map" icon={MapIcon} label="Mapa" />
            <NavItem target="itinerary" icon={Calendar} label="Rutas" />
            <NavItem target="budget" icon={DollarSign} label="Presupuesto" />
            <NavItem target="chat" icon={MessageSquare} label="Asistente IA" />
          </nav>

          {/* Mobile Menu Toggle */}
          <button className="md:hidden text-coffee-800" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Nav */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-white border-b border-coffee-200 absolute w-full left-0 top-16 shadow-xl p-4 flex flex-col gap-2 z-40">
            <NavItem target="home" icon={MapPin} label="Inicio" />
            <NavItem target="map" icon={MapIcon} label="Mapa" />
            <NavItem target="itinerary" icon={Calendar} label="Rutas" />
            <NavItem target="budget" icon={DollarSign} label="Presupuesto" />
            <NavItem target="chat" icon={MessageSquare} label="Asistente IA" />
          </div>
        )}
      </header>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto no-scrollbar scroll-smooth relative">
        {view === 'map' ? (
           // Map view takes full height without padding constraints of other views
           <InteractiveMap onAddToItinerary={addToItinerary} myItinerary={myItinerary} />
        ) : (
        <div className="max-w-7xl mx-auto p-4 md:p-8">
          
          {view === 'home' && (
            <div className="space-y-12 animate-fadeIn">
              {/* Hero */}
              <div className="relative rounded-3xl overflow-hidden shadow-2xl h-[400px] md:h-[500px]">
                <img 
                  src="https://picsum.photos/seed/coffeevalley/1600/900" 
                  alt="Valle del Cocora" 
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30 flex flex-col justify-end p-8 md:p-12">
                  <span className="text-leaf-500 font-bold uppercase tracking-wider mb-2">Colombia</span>
                  <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">Descubre el Paisaje Cultural Cafetero</h1>
                  <p className="text-gray-200 max-w-xl mb-6 text-lg">
                    Planifica tu viaje al corazón de Colombia. Paisajes Patrimonio de la Humanidad, el mejor café del mundo y pueblos llenos de encanto.
                  </p>
                  <div className="flex flex-wrap gap-4">
                    <button 
                        onClick={() => setView('itinerary')}
                        className="bg-leaf-600 hover:bg-leaf-700 text-white px-6 py-3 rounded-full font-bold transition-all flex items-center gap-2"
                    >
                        Ver Rutas <ArrowRight size={20} />
                    </button>
                    <button 
                        onClick={() => setView('map')}
                        className="bg-white/10 hover:bg-white/20 backdrop-blur border border-white/50 text-white px-6 py-3 rounded-full font-bold transition-all flex items-center gap-2"
                    >
                        Abrir Mapa Interactivo <MapIcon size={20} />
                    </button>
                  </div>
                </div>
              </div>

              {/* My Custom Itinerary Preview */}
              {myItinerary.length > 0 && (
                <div className="bg-white rounded-2xl shadow-lg border border-coffee-200 p-6 animate-slideUp">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-xl font-bold text-coffee-800 flex items-center gap-2">
                      <MapPin className="text-coffee-600" /> Mi Ruta Personalizada
                    </h3>
                    <span className="bg-coffee-100 text-coffee-800 text-xs px-2 py-1 rounded-full">{myItinerary.length} lugares</span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {myItinerary.map((place, idx) => (
                      <div key={idx} className="bg-coffee-50 border border-coffee-200 rounded-lg px-3 py-2 flex items-center gap-2 text-sm text-coffee-800">
                        <span>{place}</span>
                        <button onClick={() => removeFromItinerary(place)} className="text-coffee-400 hover:text-red-500">
                          <X size={14} />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Bases Section */}
              <section>
                <div className="flex items-center gap-3 mb-6">
                  <div className="h-10 w-1 bg-coffee-500 rounded-full"></div>
                  <h2 className="text-3xl font-bold text-coffee-900">¿Dónde Alojarse?</h2>
                </div>
                <div className="grid md:grid-cols-3 gap-6">
                  {LOCATIONS.map((loc, idx) => (
                    <div key={idx} className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-shadow group border border-coffee-100">
                      <div className="h-48 overflow-hidden">
                        <img src={loc.image} alt={loc.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                      </div>
                      <div className="p-6">
                        <div className="flex justify-between items-start mb-2">
                          <h3 className="text-xl font-bold text-coffee-800">{loc.name}</h3>
                          <div className="flex items-center text-xs text-orange-600 bg-orange-50 px-2 py-1 rounded-full">
                            <Sun size={12} className="mr-1" />
                            {loc.climate.split('/')[0].replace('Día: ', '')}
                          </div>
                        </div>
                        <p className="text-coffee-600 mb-4 text-sm leading-relaxed">{loc.description}</p>
                        <div className="space-y-1">
                          <p className="text-xs font-bold uppercase text-coffee-400">Cerca de:</p>
                          <ul className="text-sm text-coffee-700 space-y-1">
                            {loc.activities.map((act, i) => (
                              <li key={i} className="flex items-center gap-2">
                                <div className="w-1.5 h-1.5 rounded-full bg-leaf-500"></div>
                                {act}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </section>

              {/* Highlights */}
              <section className="bg-coffee-800 rounded-3xl p-8 md:p-12 text-white relative overflow-hidden">
                <div className="relative z-10 grid md:grid-cols-2 gap-12 items-center">
                  <div>
                    <h2 className="text-3xl font-bold mb-6">Experiencias Imperdibles</h2>
                    <div className="space-y-6">
                      <div className="flex gap-4">
                        <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center flex-shrink-0">
                          <Coffee className="text-coffee-200" />
                        </div>
                        <div>
                          <h4 className="font-bold text-xl mb-1">Cultura Cafetera</h4>
                          <p className="text-coffee-100">Visita fincas tradicionales como El Ocaso o Venecia. Aprende el proceso desde la semilla hasta la taza.</p>
                        </div>
                      </div>
                      <div className="flex gap-4">
                        <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center flex-shrink-0">
                          <MapPin className="text-coffee-200" />
                        </div>
                        <div>
                          <h4 className="font-bold text-xl mb-1">Valle del Cocora</h4>
                          <p className="text-coffee-100">Camina entre las palmas de cera más altas del mundo en un paisaje de niebla surrealista.</p>
                        </div>
                      </div>
                      <div className="flex gap-4">
                        <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center flex-shrink-0">
                          <CloudRain className="text-coffee-200" />
                        </div>
                        <div>
                          <h4 className="font-bold text-xl mb-1">Termales</h4>
                          <p className="text-coffee-100">Relájate en las aguas termales de Santa Rosa de Cabal bajo cascadas naturales.</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <img src="https://picsum.photos/seed/coffee/400/500" className="rounded-2xl transform translate-y-8" alt="Coffee" />
                    <img src="https://picsum.photos/seed/palms/400/500" className="rounded-2xl transform -translate-y-8" alt="Palms" />
                  </div>
                </div>
              </section>
            </div>
          )}

          {view === 'itinerary' && (
            <div className="space-y-8 animate-fadeIn">
              <div className="text-center max-w-2xl mx-auto mb-12">
                <h2 className="text-3xl font-bold text-coffee-900 mb-4">Itinerarios Sugeridos</h2>
                <p className="text-coffee-600">
                  Ya sea que tengas un fin de semana largo o una semana completa, hemos diseñado las mejores rutas para optimizar tu tiempo.
                </p>
              </div>
              
              {/* My Custom Itinerary Section in Itinerary View */}
              <div className="bg-white rounded-2xl shadow-xl border border-leaf-500/30 overflow-hidden mb-12 relative">
                <div className="absolute top-0 left-0 w-2 h-full bg-leaf-500"></div>
                <div className="p-6">
                   <h3 className="text-2xl font-bold text-coffee-800 mb-4">Tu Ruta Personalizada</h3>
                   {myItinerary.length === 0 ? (
                     <div className="text-center py-8 bg-coffee-50 rounded-xl border border-dashed border-coffee-300">
                       <MapIcon className="mx-auto text-coffee-400 mb-2" size={32} />
                       <p className="text-coffee-500">Aún no has agregado destinos.</p>
                       <button onClick={() => setView('map')} className="mt-2 text-leaf-600 font-bold hover:underline">Ir al Mapa</button>
                     </div>
                   ) : (
                     <div className="grid md:grid-cols-2 gap-4">
                       {myItinerary.map((place, idx) => (
                         <div key={idx} className="flex justify-between items-center bg-coffee-50 p-4 rounded-xl border border-coffee-100">
                           <span className="font-medium text-coffee-800">{place}</span>
                           <button onClick={() => removeFromItinerary(place)} className="text-coffee-400 hover:text-red-600"><X size={18} /></button>
                         </div>
                       ))}
                     </div>
                   )}
                </div>
              </div>

              <div className="grid lg:grid-cols-2 gap-8">
                {ITINERARIES.map((itinerary, idx) => (
                  <div key={idx} className="bg-white rounded-2xl shadow-xl border border-coffee-200 overflow-hidden flex flex-col">
                    <div className="bg-coffee-100 p-6 border-b border-coffee-200">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="text-2xl font-bold text-coffee-800">{itinerary.title}</h3>
                          <p className="text-coffee-600 mt-1">{itinerary.description}</p>
                        </div>
                        <span className="bg-coffee-800 text-white px-3 py-1 rounded-full text-sm font-bold whitespace-nowrap">
                          {itinerary.duration} Días
                        </span>
                      </div>
                    </div>
                    <div className="p-6 flex-1 bg-coffee-50/50">
                      <div className="relative border-l-2 border-coffee-300 ml-3 space-y-8 pb-4">
                        {itinerary.days.map((day, dIdx) => (
                          <div key={dIdx} className="relative pl-8">
                            <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-coffee-500 border-4 border-white shadow-sm"></div>
                            <h4 className="font-bold text-lg text-coffee-800 mb-2">Día {day.day}: {day.title}</h4>
                            <ul className="space-y-2">
                              {day.activities.map((act, aIdx) => (
                                <li key={aIdx} className="flex items-start gap-2 text-coffee-700 bg-white p-2 rounded-lg shadow-sm border border-coffee-100">
                                  <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-leaf-500 flex-shrink-0"></div>
                                  <span className="text-sm">{act}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {view === 'budget' && (
            <div className="animate-fadeIn max-w-4xl mx-auto">
              <div className="mb-8 text-center">
                <h2 className="text-3xl font-bold text-coffee-900 mb-3">Planifica tus Gastos</h2>
                <p className="text-coffee-600">Calcula un estimado basado en tu estilo de viaje. Los precios están en Pesos Colombianos (COP).</p>
              </div>
              <BudgetCalculator />
            </div>
          )}

          {view === 'chat' && (
            <div className="h-[calc(100vh-8rem)] animate-fadeIn max-w-4xl mx-auto">
               <div className="h-full flex flex-col">
                  <div className="mb-4 text-center">
                    <h2 className="text-2xl font-bold text-coffee-900">¿Tienes dudas específicas?</h2>
                    <p className="text-coffee-600 text-sm">Pregunta a nuestra IA experta en el Eje Cafetero.</p>
                  </div>
                  <div className="flex-1 min-h-0">
                    <AIChat />
                  </div>
               </div>
            </div>
          )}

        </div>
        )}
      </main>
    </div>
  );
}

export default App;