import React, { useState, useEffect } from 'react';
import { MOCK_PLANTS } from '../constants';
import { PlantCard } from '../components/PlantCard';
import { GrowthStage, ProductCategory } from '../types';
import { Filter, Search } from 'lucide-react';

interface MarketplaceProps {
  onViewPlant: (plantId: string) => void;
  initialCategory?: ProductCategory;
}

export const Marketplace: React.FC<MarketplaceProps> = ({ onViewPlant, initialCategory }) => {
  const [filterStage, setFilterStage] = useState<GrowthStage | 'All'>('All');
  const [filterCategory, setFilterCategory] = useState<ProductCategory | 'All'>('All');

  // Update category when prop changes (from nav click)
  useEffect(() => {
    if (initialCategory) {
      setFilterCategory(initialCategory);
    }
  }, [initialCategory]);

  const filteredPlants = MOCK_PLANTS.filter(p => {
    const matchStage = filterStage === 'All' || p.stage === filterStage;
    const matchCategory = filterCategory === 'All' || p.category === filterCategory;
    return matchStage && matchCategory;
  });

  const categories: ProductCategory[] = ['Plants', 'Seeds', 'Pots', 'Care', 'Gifting'];

  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      {/* Header */}
      <div className="flex flex-col gap-8 mb-12">
        <div>
          <h1 className="text-4xl font-bold text-stone-900 mb-2 drop-shadow-sm">
            {filterCategory === 'All' ? 'Shop All' : `Shop ${filterCategory}`}
          </h1>
          <p className="text-stone-500 font-medium">Find the perfect addition to your green portfolio.</p>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
           {/* Category Tabs - Glassy */}
           <div className="flex items-center gap-2 overflow-x-auto pb-2 md:pb-0 no-scrollbar w-full md:w-auto p-1">
              <button
                onClick={() => setFilterCategory('All')}
                className={`px-5 py-2.5 rounded-full text-sm font-bold transition-all whitespace-nowrap shadow-sm ${
                  filterCategory === 'All' 
                    ? 'bg-emerald-600 text-white shadow-emerald-200' 
                    : 'bg-white/60 backdrop-blur-md text-stone-600 hover:bg-white border border-stone-200/50'
                }`}
              >
                All
              </button>
              {categories.map(cat => (
                <button
                  key={cat}
                  onClick={() => setFilterCategory(cat)}
                  className={`px-5 py-2.5 rounded-full text-sm font-bold transition-all whitespace-nowrap shadow-sm ${
                    filterCategory === cat 
                      ? 'bg-emerald-600 text-white shadow-emerald-200' 
                      : 'bg-white/60 backdrop-blur-md text-stone-600 hover:bg-white border border-stone-200/50'
                  }`}
                >
                  {cat}
                </button>
              ))}
           </div>

           {/* Filter by Stage - Glassy Dropdown */}
           <div className="flex items-center gap-2 bg-white/60 backdrop-blur-md border border-stone-200/50 rounded-full p-1 pl-4 shadow-sm hover:bg-white transition-colors">
              <Filter className="w-4 h-4 text-stone-400" />
              <span className="text-xs font-bold text-stone-500 mr-2 uppercase tracking-wide hidden sm:inline">Growth Stage</span>
              <div className="h-4 w-px bg-stone-300 mx-1 hidden sm:block"></div>
              <select 
                value={filterStage}
                onChange={(e) => setFilterStage(e.target.value as any)}
                className="bg-transparent text-sm font-bold text-stone-700 focus:outline-none cursor-pointer pr-4 py-2"
              >
                <option value="All">Any Stage</option>
                {Object.values(GrowthStage).map(s => <option key={s} value={s}>{s}</option>)}
              </select>
           </div>
        </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {filteredPlants.map((plant) => (
          <PlantCard 
            key={plant.id} 
            plant={plant} 
            onClick={() => onViewPlant(plant.id)} 
            // Only show expected value for growing assets
            showExpected={plant.category === 'Plants' || plant.category === 'Seeds'}
          />
        ))}
      </div>

      {filteredPlants.length === 0 && (
        <div className="text-center py-24 bg-white/40 backdrop-blur-lg rounded-[2rem] border-2 border-dashed border-stone-200">
          <Search className="w-12 h-12 text-stone-300 mx-auto mb-4" />
          <p className="text-stone-500 text-lg font-bold">No items found.</p>
          <p className="text-stone-400">Try adjusting your filters or category.</p>
          <button onClick={() => {setFilterCategory('All'); setFilterStage('All');}} className="mt-4 text-emerald-600 font-bold hover:underline">Clear all filters</button>
        </div>
      )}
    </div>
  );
};
