import React, { useState, useEffect } from 'react';
import { TRAVEL_STYLES } from '../constants';
import { DollarSign, Users, Calendar, Calculator } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const BudgetCalculator: React.FC = () => {
  const [days, setDays] = useState(3);
  const [travelers, setTravelers] = useState(2);
  const [styleId, setStyleId] = useState<'budget' | 'mid' | 'luxury'>('mid');
  const [totalCost, setTotalCost] = useState(0);
  const [chartData, setChartData] = useState<any[]>([]);

  useEffect(() => {
    const selectedStyle = TRAVEL_STYLES.find(s => s.id === styleId)!;
    
    let total = 0;
    const breakdown = [];

    for (const item of selectedStyle.costs) {
      // Average cost between low and high
      const avgCost = (item.costLow + item.costHigh) / 2;
      let itemTotal = 0;

      if (item.frequency === 'daily') {
        if (item.perPerson) {
          itemTotal = avgCost * days * travelers;
        } else {
          // Per group (like room or car), assume 1 unit per 2 people approx, or just 1 per group for simplicity in this brief
          // The prompt implies accommodation is per night (usually room based but often priced per person in hostels).
          // To be safe with the prompt's "Total Estimated" table, let's follow their logic:
          // The prompt table gives totals per person for a 3-day trip.
          // Let's reverse engineer slightly or just use the per-item logic for accuracy.
          // Briefing says: Accommodation per night. Let's assume 1 room per 2 people or 1 per person if 1 traveler.
          const rooms = Math.ceil(travelers / 2);
          itemTotal = item.perPerson ? (avgCost * days * travelers) : (avgCost * days * rooms);
        }
      } else {
        // One time cost
        itemTotal = item.perPerson ? (avgCost * travelers) : avgCost;
      }
      
      total += itemTotal;
      breakdown.push({
        name: item.category,
        cost: itemTotal
      });
    }

    setTotalCost(total);
    setChartData(breakdown);
  }, [days, travelers, styleId]);

  const formatCOP = (val: number) => {
    return new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP', maximumSignificantDigits: 3 }).format(val);
  };

  return (
    <div className="bg-white rounded-xl shadow-lg border border-coffee-200 p-6">
      <h2 className="text-2xl font-bold text-coffee-800 mb-6 flex items-center gap-2">
        <Calculator className="w-6 h-6" />
        Calculadora de Presupuesto
      </h2>

      <div className="grid md:grid-cols-3 gap-6 mb-8">
        {/* Controls */}
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-coffee-700 mb-1">
              <Calendar className="inline w-4 h-4 mr-1" /> Días de Viaje
            </label>
            <input
              type="range"
              min="2"
              max="15"
              value={days}
              onChange={(e) => setDays(Number(e.target.value))}
              className="w-full accent-coffee-600"
            />
            <div className="text-right font-bold text-coffee-600">{days} días</div>
          </div>

          <div>
            <label className="block text-sm font-medium text-coffee-700 mb-1">
              <Users className="inline w-4 h-4 mr-1" /> Viajeros
            </label>
            <input
              type="number"
              min="1"
              max="10"
              value={travelers}
              onChange={(e) => setTravelers(Math.max(1, Number(e.target.value)))}
              className="w-full p-2 border border-coffee-300 rounded-lg focus:ring-coffee-500 focus:border-coffee-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-coffee-700 mb-2">Estilo de Viaje</label>
            <div className="grid grid-cols-1 gap-2">
              {TRAVEL_STYLES.map((style) => (
                <button
                  key={style.id}
                  onClick={() => setStyleId(style.id)}
                  className={`px-4 py-2 rounded-lg text-sm text-left transition-colors border ${
                    styleId === style.id
                      ? 'bg-coffee-600 text-white border-coffee-600'
                      : 'bg-white text-coffee-700 border-coffee-200 hover:bg-coffee-50'
                  }`}
                >
                  <div className="font-bold">{style.label}</div>
                  <div className="text-xs opacity-80 truncate">{style.description}</div>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Results */}
        <div className="md:col-span-2 flex flex-col">
          <div className="bg-leaf-700 text-white p-6 rounded-xl mb-6 shadow-md text-center">
            <div className="text-sm opacity-90 mb-1">Costo Total Estimado</div>
            <div className="text-4xl font-bold">{formatCOP(totalCost)}</div>
            <div className="text-sm opacity-80 mt-2">
              ~ {formatCOP(totalCost / travelers)} por persona
            </div>
          </div>

          <div className="flex-1 min-h-[250px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData} layout="vertical" margin={{ top: 5, right: 30, left: 40, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" horizontal={false} />
                <XAxis type="number" hide />
                <YAxis type="category" dataKey="name" width={100} tick={{fill: '#4e342e', fontSize: 12}} />
                <Tooltip 
                  formatter={(value: number) => formatCOP(value)}
                  contentStyle={{ backgroundColor: '#fff', borderRadius: '8px', border: '1px solid #e0cec7' }}
                />
                <Bar dataKey="cost" fill="#8a5a44" radius={[0, 4, 4, 0]} barSize={30} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
      <p className="text-xs text-coffee-500 italic">
        * Estimaciones basadas en promedios del briefing. No incluye vuelos internacionales o costos variables no listados.
      </p>
    </div>
  );
};

export default BudgetCalculator;