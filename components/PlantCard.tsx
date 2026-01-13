import React from 'react';
import { Plant, GrowthStage } from '../types';
import { ShoppingBag, Sprout, Leaf, TreeDeciduous, Star, TrendingUp } from 'lucide-react';

interface PlantCardProps {
  plant: Plant;
  onClick: () => void;
  showExpected?: boolean;
}

export const PlantCard: React.FC<PlantCardProps> = ({ plant, onClick, showExpected = true }) => {
  const getStageIcon = (stage: GrowthStage) => {
    switch (stage) {
      case GrowthStage.Seedling: return <Sprout className="w-3 h-3" />;
      case GrowthStage.Growing: return <Leaf className="w-3 h-3" />;
      case GrowthStage.Mature: return <TreeDeciduous className="w-3 h-3" />;
    }
  };

  return (
    <div
      onClick={onClick}
      className="group relative bg-white rounded-[2rem] p-3 hover:shadow-xl hover:shadow-stone-200 transition-all duration-300 cursor-pointer flex flex-col h-full border border-stone-100"
    >

      <div className="relative aspect-[4/5] overflow-hidden rounded-[1.5rem] mb-4 bg-stone-100">
        <img
          src={plant.image}
          alt={plant.name}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />


        <div className="absolute top-3 left-3 flex gap-2">
          {plant.growthPercentage > 80 && (
            <span className="bg-emerald-500 text-white text-[10px] font-bold px-2 py-1 rounded-full uppercase tracking-wider shadow-sm flex items-center gap-1">
              <Star className="w-3 h-3 fill-current" /> Bestseller
            </span>
          )}
          {plant.stage === GrowthStage.Seedling && (
            <span className="bg-white/90 backdrop-blur text-stone-600 text-[10px] font-bold px-2 py-1 rounded-full uppercase tracking-wider shadow-sm">
              New Arrival
            </span>
          )}
        </div>


        <div className="absolute bottom-4 left-4 right-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300 opacity-0 group-hover:opacity-100">
          <button className="w-full bg-white/95 backdrop-blur text-[#1c3a30] font-bold py-3 rounded-xl shadow-lg hover:bg-[#1c3a30] hover:text-white transition-colors flex items-center justify-center gap-2">
            <ShoppingBag className="w-4 h-4" />
            View Options
          </button>
        </div>
      </div>


      <div className="px-2 pb-2 flex-1 flex flex-col">
        <div className="flex justify-between items-start mb-1">
          <h3 className="text-lg font-bold text-stone-900 leading-tight group-hover:text-emerald-700 transition-colors">{plant.name}</h3>
          <p className="text-lg font-extrabold text-[#1c3a30]">₹{plant.currentValue}</p>
        </div>

        <p className="text-xs text-stone-500 font-medium mb-3">{plant.scientificName}</p>


        {showExpected && (
          <div className="mt-auto pt-3 border-t border-stone-100 flex items-center gap-2 text-xs font-medium text-emerald-700 bg-emerald-50/50 p-2 rounded-lg">
            <TrendingUp className="w-3 h-3" />
            <span>Est. value ₹{plant.expectedValue30Days} in 30 days</span>
          </div>
        )}
      </div>
    </div>
  );
};