import React from 'react';
import { Plant } from '../types';
import { PlantCard } from '../components/PlantCard';
import { Sprout, TrendingUp, Package, DollarSign, Wind, Leaf } from 'lucide-react';

interface MyGardenProps {
  plants: Plant[];
  onViewPlant: (id: string) => void;
  onSell: (id: string) => void;
}

export const MyGarden: React.FC<MyGardenProps> = ({ plants, onViewPlant, onSell }) => {
  // Calculate total portfolio stats
  const totalValue = plants.reduce((acc, p) => acc + p.currentValue, 0);
  const totalInvested = plants.reduce((acc, p) => acc + p.purchasePrice, 0);
  const totalGain = totalValue - totalInvested;
  const gainPercent = totalInvested > 0 ? (totalGain / totalInvested) * 100 : 0;
  
  // Fake CO2 calculation
  const totalCo2 = plants.length * 1.5; // kg

  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      <div className="flex items-center gap-3 mb-8">
        <div className="p-3 bg-emerald-100 rounded-2xl">
           <Leaf className="w-8 h-8 text-emerald-600" />
        </div>
        <h1 className="text-4xl font-bold text-stone-900 drop-shadow-sm">My Rooted Garden</h1>
      </div>

      {/* Portfolio Summary - Glass Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
        <div className="md:col-span-2 bg-gradient-to-br from-emerald-700 to-[#1c3a30] text-white rounded-[2rem] p-8 shadow-xl shadow-emerald-200/50 relative overflow-hidden">
           <div className="absolute top-0 right-0 w-48 h-48 bg-emerald-400/20 rounded-full blur-3xl translate-x-10 -translate-y-10"></div>
           <div className="relative z-10">
             <div className="flex items-center gap-3 mb-6 opacity-90">
               <div className="p-2 bg-white/20 rounded-xl backdrop-blur-sm border border-white/20">
                 <DollarSign className="w-5 h-5" />
               </div>
               <span className="font-medium tracking-wide">Total Asset Value</span>
             </div>
             <p className="text-5xl font-bold mb-3">₹{totalValue}</p>
             <div className="flex items-center gap-2">
               <p className="text-emerald-100 text-sm font-medium bg-white/10 inline-block px-3 py-1 rounded-full border border-white/10">
                 Across {plants.length} plant{plants.length !== 1 ? 's' : ''}
               </p>
               <p className="text-emerald-300 text-sm font-bold">
                 +₹{totalGain} (+{gainPercent.toFixed(1)}%)
               </p>
             </div>
           </div>
        </div>

        {/* Environmental Impact Card (NEW) */}
        <div className="glass-card bg-gradient-to-br from-blue-50 to-white text-stone-900 rounded-[2rem] p-6 shadow-lg relative overflow-hidden">
           <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-blue-100 rounded-full blur-2xl"></div>
           <div className="flex items-center gap-3 mb-4 relative z-10">
             <div className="p-2 bg-blue-100 text-blue-600 rounded-xl shadow-inner">
               <Wind className="w-5 h-5" />
             </div>
             <span className="font-bold text-stone-500">Air Purified</span>
           </div>
           <p className="text-3xl font-bold mb-2 relative z-10">{totalCo2} kg</p>
           <p className="text-stone-400 text-sm font-medium relative z-10">
             CO2 offset this year
           </p>
           <div className="mt-4 w-full bg-blue-100 h-1.5 rounded-full overflow-hidden">
             <div className="bg-blue-500 h-full w-[45%]"></div>
           </div>
           <p className="text-[10px] text-blue-400 mt-2 font-bold uppercase tracking-wide">Level: Fresh Air</p>
        </div>

        <div className="glass-card text-stone-900 rounded-[2rem] p-6 shadow-lg">
           <div className="flex items-center gap-3 mb-4">
             <div className="p-2 bg-yellow-100 text-yellow-600 rounded-xl shadow-inner">
               <Sprout className="w-5 h-5" />
             </div>
             <span className="font-bold text-stone-500">Next Maturity</span>
           </div>
           <p className="text-3xl font-bold mb-2">12 Days</p>
           <p className="text-stone-400 text-sm font-medium">
             Until Bird of Paradise flowers
           </p>
        </div>
      </div>

      {/* Plant List */}
      <h2 className="text-2xl font-bold text-stone-800 mb-6 pl-2 border-l-4 border-emerald-500">Your Living Collection</h2>
      
      {plants.length === 0 ? (
        <div className="glass-card rounded-3xl p-12 text-center border-2 border-dashed border-stone-300/50">
           <Sprout className="w-16 h-16 text-stone-300 mx-auto mb-4" />
           <h3 className="text-xl font-bold text-stone-500 mb-2">Your garden is empty</h3>
           <p className="text-stone-400">Start by exploring the marketplace to adopt your first plant.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {plants.map(plant => (
            <div key={plant.id} className="relative group">
              <PlantCard plant={plant} onClick={() => onViewPlant(plant.id)} showExpected={false} />
              
              {/* Quick Actions for Owned Plants - Glass Buttons */}
              <div className="absolute top-4 right-4 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-20">
                 <button 
                    onClick={(e) => { e.stopPropagation(); onSell(plant.id); }}
                    className="bg-white/90 backdrop-blur text-red-500 text-xs font-bold px-3 py-2 rounded-xl shadow-lg border border-red-100 hover:bg-red-50 flex items-center gap-1 transition-transform hover:scale-105"
                 >
                   <DollarSign className="w-3 h-3" /> Sell Back
                 </button>
                 <button 
                    onClick={(e) => { e.stopPropagation(); alert(`Delivery scheduled for ${plant.name}`); }}
                    className="bg-white/90 backdrop-blur text-stone-700 text-xs font-bold px-3 py-2 rounded-xl shadow-lg border border-stone-200 hover:bg-stone-50 flex items-center gap-1 transition-transform hover:scale-105"
                 >
                   <Package className="w-3 h-3" /> Deliver
                 </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};