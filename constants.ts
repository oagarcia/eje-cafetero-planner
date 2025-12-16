import { LocationInfo, TravelStyle, Itinerary, PointOfInterest, TravelTime } from './types';

export const BRIEFING_CONTEXT = `
Eres un experto guía turístico del Eje Cafetero en Colombia. 
CONTEXTO DEL VIAJE: El usuario viaja en SU PROPIO AUTOMÓVIL partiendo desde BOGOTÁ.
Ruta Principal: Bogotá -> Soacha -> Melgar/Girardot -> Ibagué -> Alto de La Línea -> Calarcá -> Armenia/Pereira.
Alternativa a Manizales: Bogotá -> Honda -> Mariquita -> Alto de Letras -> Manizales (Más curvas, menos tráfico pesado).

Datos Clave para Conductor:
- Tiempo estimado: 7 a 9 horas por trayecto (depende del tráfico en La Línea).
- Peajes (Ida y Vuelta): ~230.000 COP aprox.
- Gasolina (Ida y Vuelta + rodamiento): ~350.000 - 500.000 COP (depende del vehículo).
- Pico y Placa: Verificar restricciones en ciudades principales (Pereira/Armenia/Manizales) y regionales.

Resumen Destino: Patrimonio de la Humanidad UNESCO. Departamentos: Caldas, Risaralda, Quindío.
Clima: Templado (eterna primavera).
Bases:
- Pereira: Moderna, hoteles campestres en Cerritos.
- Armenia: Estratégica para parques y Salento.
- Manizales: Montaña, cultura, cerca al Nevado.
Imperdibles: Salento, Valle del Cocora, Filandia, Termales Santa Rosa.
`;

export const LOCATIONS: LocationInfo[] = [
  {
    name: 'Pereira (Risaralda)',
    description: 'Capital comercial. Acceso por variante La Romelia-El Pollo si vienes de Manizales o directo por Autopista del Café.',
    activities: ['Termales Santa Rosa', 'Bioparque Ukumarí', 'Santuario Otún Quimbaya'],
    climate: 'Día: 26°C / Noche: 17°C',
    image: 'https://picsum.photos/id/10/800/600'
  },
  {
    name: 'Armenia (Quindío)',
    description: 'Punto de llegada directo bajando La Línea. Ideal para visitar el Parque del Café y Salento.',
    activities: ['Salento', 'Filandia', 'Parque del Café', 'Jardín Botánico'],
    climate: 'Día: 26°C / Noche: 17°C',
    image: 'https://picsum.photos/id/11/800/600'
  },
  {
    name: 'Manizales (Caldas)',
    description: 'Ciudad de puertas abiertas. Si tomas la ruta de Letras, llegarás directo aquí.',
    activities: ['Nevado del Ruiz', 'Hacienda Venecia', 'Catedral Basílica'],
    climate: 'Día: 19°C / Noche: 12°C',
    image: 'https://picsum.photos/id/12/800/600'
  }
];

export const TRAVEL_STYLES: TravelStyle[] = [
  {
    id: 'budget',
    label: 'Económico',
    description: 'Auto pequeño/económico, hostales con parqueadero, comidas típicas.',
    costs: [
      { category: 'Alojamiento', costLow: 60000, costHigh: 100000, perPerson: false, frequency: 'daily' },
      { category: 'Alimentación', costLow: 45000, costHigh: 65000, perPerson: true, frequency: 'daily' },
      { category: 'Entradas/Actividades', costLow: 30000, costHigh: 50000, perPerson: true, frequency: 'daily' },
      { category: 'Gasolina Local/Parqueo', costLow: 15000, costHigh: 25000, perPerson: false, frequency: 'daily' },
      { category: 'Ruta Bogotá (Gas+Peajes)', costLow: 450000, costHigh: 550000, perPerson: false, frequency: 'once' }
    ]
  },
  {
    id: 'mid',
    label: 'Gama Media',
    description: 'Camioneta/Sedán, hoteles boutique, buenos restaurantes.',
    costs: [
      { category: 'Alojamiento', costLow: 180000, costHigh: 350000, perPerson: false, frequency: 'daily' },
      { category: 'Alimentación', costLow: 80000, costHigh: 110000, perPerson: true, frequency: 'daily' },
      { category: 'Entradas/Tours', costLow: 70000, costHigh: 120000, perPerson: true, frequency: 'daily' },
      { category: 'Gasolina Local/Parqueo', costLow: 30000, costHigh: 50000, perPerson: false, frequency: 'daily' },
      { category: 'Ruta Bogotá (Gas+Peajes)', costLow: 550000, costHigh: 700000, perPerson: false, frequency: 'once' }
    ]
  },
  {
    id: 'luxury',
    label: 'Premium',
    description: 'SUV de lujo, hoteles campestres 5 estrellas, experiencias privadas.',
    costs: [
      { category: 'Alojamiento', costLow: 450000, costHigh: 950000, perPerson: false, frequency: 'daily' },
      { category: 'Alimentación', costLow: 150000, costHigh: 280000, perPerson: true, frequency: 'daily' },
      { category: 'Exp. Exclusivas', costLow: 150000, costHigh: 350000, perPerson: true, frequency: 'daily' },
      { category: 'Gasolina Local/Valet', costLow: 50000, costHigh: 100000, perPerson: false, frequency: 'daily' },
      { category: 'Ruta Bogotá (Gas+Peajes)', costLow: 700000, costHigh: 900000, perPerson: false, frequency: 'once' }
    ]
  }
];

export const ITINERARIES: Itinerary[] = [
  {
    duration: 3,
    title: 'Escapada Express (Puente)',
    description: 'Ideal para salir madrugado de Bogotá y aprovechar al máximo.',
    days: [
      { day: 1, title: 'Ruta Bogotá - Eje', activities: ['Salida 4:00 AM de Bogotá', 'Desayuno en Ibagué', 'Cruce Túnel de La Línea', 'Llegada a Salento (Check-in)', 'Atardecer en Calle Real'] },
      { day: 2, title: 'Valle del Cocora', activities: ['Manejar hasta Cocora', 'Caminata Palmas de Cera', 'Almuerzo Trucha', 'Visita rápida a Filandia'] },
      { day: 3, title: 'Termales y Regreso', activities: ['Manejar a Termales Santa Rosa', 'Baño matutino relajante', 'Almuerzo en carretera', 'Retorno a Bogotá (subiendo La Línea)'] }
    ]
  },
  {
    duration: 5,
    title: 'Vuelta Completa en Carro',
    description: 'Recorrido circular conociendo los 3 departamentos.',
    days: [
      { day: 1, title: 'La Ruta del Café', activities: ['Bogotá -> Armenia (7-8h)', 'Instalación en Finca Hotel cerca al Parque del Café', 'Descanso piscina'] },
      { day: 2, title: 'Diversión y Cultura', activities: ['Parque del Café (Todo el día)', 'Noche en Montenegro o Armenia'] },
      { day: 3, title: 'Pueblos con Encanto', activities: ['Ruta: Armenia -> Salento', 'Valle del Cocora', 'Tarde en Filandia', 'Noche en Pereira/Santa Rosa'] },
      { day: 4, title: 'Naturaleza y Relax', activities: ['Bioparque Ukumarí o Otún Quimbaya', 'Termales de Santa Rosa en la noche'] },
      { day: 5, title: 'Regreso por Letras', activities: ['Subida a Manizales', 'Desayuno mirando el Nevado', 'Regreso a Bogotá por Alto de Letras (Paisajes únicos)'] }
    ]
  }
];

export const POINTS_OF_INTEREST: PointOfInterest[] = [
  { id: '1', name: 'Pereira', category: 'city', lat: 4.8133, lng: -75.6961, description: 'Capital de Risaralda. Tráfico moderado. Waze recomendado.', contact: 'Info vial #767' },
  { id: '2', name: 'Armenia', category: 'city', lat: 4.5350, lng: -75.6757, description: 'Capital del Quindío. Vías excelentes hacia los parques.', contact: 'Info vial #767' },
  { id: '3', name: 'Manizales', category: 'city', lat: 5.0689, lng: -75.5174, description: 'Ciudad de lomas empinadas. Cuidado con el embrague.', contact: 'Info vial #767' },
  { id: '4', name: 'Salento', category: 'town', lat: 4.6374, lng: -75.5703, description: 'Ojo: Parqueo difícil los fines de semana. Llegar temprano.', contact: 'Parqueaderos públicos disp.' },
  { id: '5', name: 'Valle del Cocora', category: 'nature', lat: 4.6385, lng: -75.4870, description: 'Vía estrecha desde Salento. Hay parqueaderos en la entrada.', contact: 'Parqueo: ~10k' },
  { id: '6', name: 'Filandia', category: 'town', lat: 4.6783, lng: -75.6614, description: 'Vía en buen estado. Más fácil de parquear que Salento.', contact: 'Mirador a las afueras' },
  { id: '7', name: 'Termales Santa Rosa', category: 'nature', lat: 4.8433, lng: -75.5562, description: 'Acceso pavimentado pero vía de montaña.', contact: 'Parking gratis huéspedes' },
  { id: '8', name: 'Parque del Café', category: 'park', lat: 4.5413, lng: -75.7709, description: 'Amplio parqueadero. Llegar a las 9am para aprovechar.', contact: 'Parking: ~5k' },
  { id: '9', name: 'Alto de La Línea', category: 'nature', lat: 4.5, lng: -75.5, description: 'Punto crítico de la ruta Bogotá-Eje. Túnel principal y descenso peligroso.', contact: 'Invías #767' },
  { id: '10', name: 'Finca El Ocaso', category: 'farm', lat: 4.6250, lng: -75.5800, description: 'Vía destapada en el último tramo (transitable auto bajo suave).', contact: 'fincaelocaso.com' },
  { id: '11', name: 'Hacienda Venecia', category: 'farm', lat: 5.0300, lng: -75.5500, description: 'Cerca a Manizales. Alojamiento y café.', contact: 'haciendavenecia.com' },
  { id: '12', name: 'Bioparque Ukumarí', category: 'park', lat: 4.8000, lng: -75.7500, description: 'Cerca al aeropuerto Matecaña/Entrada Pereira.', contact: 'ukumari.org' },
  { id: '13', name: 'Nevado del Ruiz', category: 'nature', lat: 4.8953, lng: -75.3224, description: 'Acceso por Brisas. Vehículos altos recomendados para ciertas zonas.', contact: 'Parques Nacionales' }
];

export const TRAVEL_TIMES: TravelTime[] = [
  { from: 'Bogotá', to: 'Armenia', time: '7h - 8h' },
  { from: 'Bogotá', to: 'Pereira', time: '8h' },
  { from: 'Bogotá', to: 'Manizales (Letras)', time: '8.5h' },
  { from: 'Ibagué', to: 'Armenia', time: '2h - 3h' },
  { from: 'Pereira', to: 'Armenia', time: '1h' },
  { from: 'Pereira', to: 'Salento', time: '1h' },
  { from: 'Armenia', to: 'Parque del Café', time: '30m' },
  { from: 'Salento', to: 'Valle del Cocora', time: '25m' }
];