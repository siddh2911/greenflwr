import React, { useState, useEffect } from 'react';
import { Plant, PlantVariant } from '../types';
import { ArrowLeft, ArrowRight, Droplets, Sun, Wind, Thermometer, CheckCircle2, TrendingUp, Info, Sparkles, Box, Camera, Wifi, Maximize, Minimize, RefreshCw, Battery, Leaf } from 'lucide-react';
import { ValueChart } from '../components/ValueChart';

interface PlantDetailProps {
  plant: Plant;
  isOwned: boolean;
  onBuy: () => void;
  onBack: () => void;
  onViewPackaging?: () => void;
}

export const PlantDetail: React.FC<PlantDetailProps> = ({ plant, isOwned, onBuy, onBack, onViewPackaging }) => {
  const [selectedVariantId, setSelectedVariantId] = useState<string | null>(null);
  
  // Live Feed Simulation State
  const [isConnecting, setIsConnecting] = useState(true);
  const [zoomLevel, setZoomLevel] = useState(1);
  const [activeCam, setActiveCam] = useState(1);
  const [telemetry, setTelemetry] = useState({ temp: 24.2, humidity: 65, light: 850 });

  // Initialize with the first variant
  useEffect(() => {
    if (plant.variants && plant.variants.length > 0) {
      setSelectedVariantId(plant.variants[0].id);
    }
    
    // Simulate connection delay
    const timer = setTimeout(() => setIsConnecting(false), 1200);

    // Simulate telemetry fluctuations
    const interval = setInterval(() => {
      setTelemetry(prev => ({
        temp: +(prev.temp + (Math.random() * 0.2 - 0.1)).toFixed(1),
        humidity: Math.min(100, Math.max(0, Math.floor(prev.humidity + (Math.random() * 2 - 1)))),
        light: Math.floor(prev.light + (Math.random() * 10 - 5))
      }));
    }, 2000);

    return () => {
      clearTimeout(timer);
      clearInterval(interval);
    };
  }, [plant]);

  const activeSpecimen: PlantVariant | null = plant.variants?.find(v => v.id === selectedVariantId) || null;
  const displayImage = activeSpecimen ? activeSpecimen.image : plant.image;
  const displayPrice = activeSpecimen ? activeSpecimen.currentValue : plant.currentValue;

  // Logic to determine if we show the real YouTube feed
  // Plant ID 1 is the Bird of Paradise. We show video on Main Cam (1).
  const showRealVideoFeed = plant.id === '1' && activeCam === 1;

  return (
    <div className="min-h-screen bg-stone-50/50 pb-20">
      {/* Top Navigation */}
      <div className="max-w-7xl mx-auto px-4 py-6 flex items-center gap-4">
        <button 
          onClick={onBack}
          className="p-2 rounded-full bg-white border border-stone-200 text-stone-600 hover:bg-stone-50 transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        <span className="text-sm font-medium text-stone-500">Back to Collection</span>
      </div>

      <div className="max-w-7xl mx-auto px-4 lg:px-8 grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* LEFT COLUMN: LIVE FEED (Cols 8) */}
        <div className="lg:col-span-8 space-y-6">
          
          {/* Live Feed Container */}
          <div className="bg-stone-900 rounded-[2rem] overflow-hidden shadow-2xl relative group ring-4 ring-stone-200">
            
            {/* Header Bar */}
            <div className="absolute top-0 left-0 right-0 h-14 bg-gradient-to-b from-black/80 to-transparent z-20 flex items-center justify-between px-6">
               <div className="flex items-center gap-3">
                 <div className="flex items-center gap-1.5 bg-red-500/20 border border-red-500/50 px-2 py-1 rounded text-red-500 text-[10px] font-bold uppercase tracking-wider animate-pulse">
                   <div className="w-1.5 h-1.5 bg-red-500 rounded-full"></div>
                   Live Feed
                 </div>
                 <span className="text-white/60 text-xs font-mono tracking-wider">CAM-04 • BAY-12</span>
               </div>
               <div className="flex items-center gap-4 text-white/80">
                  <div className="flex items-center gap-1.5 text-[10px] font-mono">
                    <Wifi size={12} className="text-emerald-400" /> Signal Strong
                  </div>
                  <div className="flex items-center gap-1.5 text-[10px] font-mono">
                    <Battery size={12} className="text-emerald-400" /> 100%
                  </div>
               </div>
            </div>

            {/* Main Viewport */}
            <div className="relative aspect-[4/3] bg-black overflow-hidden">
               {isConnecting ? (
                 <div className="absolute inset-0 flex flex-col items-center justify-center text-emerald-500/80 font-mono space-y-4">
                    <RefreshCw className="w-8 h-8 animate-spin" />
                    <span className="text-sm animate-pulse">ESTABLISHING SECURE CONNECTION...</span>
                 </div>
               ) : (
                 <>
                   {showRealVideoFeed ? (
                     <div className="w-full h-full transition-transform duration-700 ease-out" style={{ transform: `scale(${zoomLevel})` }}>
                       <iframe 
                         width="100%" 
                         height="100%" 
                         src="https://www.youtube.com/embed/JRowIMASL7k?autoplay=1&mute=1&controls=0&playsinline=1&rel=0" 
                         title="Live Nursery Feed" 
                         allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                         referrerPolicy="strict-origin-when-cross-origin"
                         className="w-full h-full object-cover pointer-events-none"
                       ></iframe>
                     </div>
                   ) : (
                     /* The Image (Simulated Video) */
                     <img 
                       src={displayImage} 
                       alt="Live Feed"
                       className="w-full h-full object-cover transition-transform duration-700 ease-out"
                       style={{ transform: `scale(${zoomLevel})` }}
                     />
                   )}
                   
                   {/* Scanlines Overlay */}
                   <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/black-scales.png')] opacity-20 pointer-events-none mix-blend-overlay"></div>
                   <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                 </>
               )}
            </div>

            {/* Telemetry Overlay (HUD) */}
            {!isConnecting && (
              <div className="absolute top-20 right-6 flex flex-col gap-2 z-20">
                 <div className="bg-black/40 backdrop-blur-md border border-white/10 p-3 rounded-xl w-32">
                    <div className="flex items-center gap-2 text-emerald-400 mb-1">
                       <Thermometer size={14} />
                       <span className="text-[10px] uppercase font-bold text-white/60">Temp</span>
                    </div>
                    <span className="text-xl font-mono text-white font-medium">{telemetry.temp}°C</span>
                 </div>
                 <div className="bg-black/40 backdrop-blur-md border border-white/10 p-3 rounded-xl w-32">
                    <div className="flex items-center gap-2 text-blue-400 mb-1">
                       <Droplets size={14} />
                       <span className="text-[10px] uppercase font-bold text-white/60">Humidity</span>
                    </div>
                    <span className="text-xl font-mono text-white font-medium">{telemetry.humidity}%</span>
                 </div>
                 <div className="bg-black/40 backdrop-blur-md border border-white/10 p-3 rounded-xl w-32">
                    <div className="flex items-center gap-2 text-yellow-400 mb-1">
                       <Sun size={14} />
                       <span className="text-[10px] uppercase font-bold text-white/60">Light</span>
                    </div>
                    <span className="text-xl font-mono text-white font-medium">{telemetry.light} lx</span>
                 </div>
              </div>
            )}

            {/* Camera Controls Bar */}
            <div className="bg-stone-800 p-4 flex items-center justify-between border-t border-white/10">
               <div className="flex gap-2">
                  <button 
                    onClick={() => setActiveCam(1)}
                    className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${activeCam === 1 ? 'bg-emerald-600 text-white' : 'bg-stone-700 text-stone-400 hover:bg-stone-600'}`}
                  >
                    Main Cam
                  </button>
                  <button 
                    onClick={() => setActiveCam(2)}
                    className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${activeCam === 2 ? 'bg-emerald-600 text-white' : 'bg-stone-700 text-stone-400 hover:bg-stone-600'}`}
                  >
                    Top View
                  </button>
               </div>

               <div className="flex gap-2 items-center">
                  <button 
                    onClick={() => setZoomLevel(Math.max(1, zoomLevel - 0.5))}
                    className="p-2 bg-stone-700 text-white rounded-lg hover:bg-stone-600 disabled:opacity-50"
                    disabled={zoomLevel <= 1}
                  >
                    <Minimize size={16} />
                  </button>
                  <span className="text-stone-400 text-xs font-mono w-12 text-center">{(zoomLevel * 100).toFixed(0)}%</span>
                  <button 
                    onClick={() => setZoomLevel(Math.min(3, zoomLevel + 0.5))}
                    className="p-2 bg-stone-700 text-white rounded-lg hover:bg-stone-600"
                  >
                    <Maximize size={16} />
                  </button>
                  <button className="ml-2 p-2 bg-stone-700 text-emerald-400 rounded-lg hover:bg-stone-600 border border-emerald-500/30">
                     <Camera size={16} />
                  </button>
               </div>
            </div>
          </div>
          
          {/* Live Inventory Selector */}
          {plant.variants && plant.variants.length > 0 && (
            <div className="bg-white rounded-[2rem] p-6 border border-stone-100 shadow-sm">
               <div className="flex items-center justify-between mb-4">
                 <h3 className="font-bold text-[#1c3a30] flex items-center gap-2">
                   <Sparkles className="w-4 h-4 text-emerald-500" />
                   Available Specimens in Greenhouse
                 </h3>
                 <span className="text-xs font-medium text-emerald-600 bg-emerald-50 px-2 py-1 rounded-full animate-pulse">Live Updates</span>
               </div>
               
               <div className="flex gap-4 overflow-x-auto pb-4 no-scrollbar snap-x">
                 {plant.variants.map((variant) => (
                   <button
                     key={variant.id}
                     onClick={() => setSelectedVariantId(variant.id)}
                     className={`flex-shrink-0 w-44 p-3 rounded-2xl border-2 transition-all snap-center text-left relative overflow-hidden ${
                       selectedVariantId === variant.id 
                         ? 'border-emerald-500 bg-emerald-50 ring-1 ring-emerald-200' 
                         : 'border-stone-100 bg-stone-50 hover:border-emerald-200'
                     }`}
                   >
                     {/* Match Badge */}
                     {variant.matches > 90 && (
                        <div className="absolute top-0 right-0 bg-emerald-500 text-white text-[8px] font-bold px-1.5 py-0.5 rounded-bl-lg z-10">
                          {variant.matches}% Match
                        </div>
                     )}
                     
                     <div className="flex gap-3 items-center mb-2">
                        <div className="w-10 h-10 rounded-lg overflow-hidden bg-stone-200">
                           <img src={variant.image} className="w-full h-full object-cover" />
                        </div>
                        <div>
                           <p className="text-[10px] text-stone-400 font-bold uppercase">{variant.sku}</p>
                           <p className="text-sm font-bold text-[#1c3a30]">₹{variant.currentValue}</p>
                        </div>
                     </div>
                     <div className="flex gap-1 flex-wrap">
                        {variant.traits.map(t => (
                           <span key={t} className="text-[9px] bg-white border border-stone-200 px-1.5 py-0.5 rounded text-stone-500">{t}</span>
                        ))}
                     </div>
                   </button>
                 ))}
               </div>
            </div>
          )}

          {/* Environmental Conditions Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <ConditionCard icon={<Droplets />} label="Water" value={plant.waterFrequency} color="blue" />
            <ConditionCard icon={<Sun />} label="Light" value={plant.sunlightNeeds} color="yellow" />
            <ConditionCard icon={<Leaf />} label="Oxygen" value="High Output" color="green" />
            <ConditionCard icon={<Wind />} label="Humidity" value={plant.humidityLevel} color="teal" />
          </div>
        </div>

        {/* RIGHT COLUMN: DATA & ACTION (Cols 4) */}
        <div className="lg:col-span-4 space-y-6">
          
          {/* Action Box */}
          <div className="bg-white rounded-3xl p-6 border border-stone-100 shadow-xl sticky top-24 z-30">
             <div className="mb-6">
                <p className="text-xs font-bold text-stone-400 uppercase tracking-wide mb-1">Adoption Price</p>
                <div className="flex items-end gap-2">
                   <h2 className="text-4xl font-extrabold text-[#1c3a30]">₹{displayPrice}</h2>
                   {activeSpecimen && <span className="text-sm font-medium text-emerald-600 mb-1 bg-emerald-50 px-2 rounded">SKU: {activeSpecimen.sku}</span>}
                </div>
                <p className="text-xs text-stone-400 mt-2 flex items-center gap-1">
                   <TrendingUp size={12} className="text-emerald-500"/> 
                   Projected value: <span className="text-stone-700 font-bold">₹{plant.expectedValue30Days}</span> in 30 days
                </p>
             </div>

             {isOwned ? (
               <div className="text-center py-4 bg-emerald-50 rounded-2xl border border-emerald-100">
                 <p className="text-emerald-700 font-bold text-lg flex items-center justify-center gap-2">
                   <CheckCircle2 className="w-5 h-5" />
                   In Your Garden
                 </p>
               </div>
             ) : (
               <div className="space-y-4">
                 <button 
                   onClick={onBuy}
                   className="w-full bg-[#1c3a30] text-white py-4 rounded-xl font-bold text-lg hover:bg-emerald-700 hover:shadow-lg hover:shadow-emerald-900/20 transition-all duration-300 active:scale-95 flex items-center justify-center gap-2 group"
                 >
                   Claim This Specimen
                   <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                 </button>
                 
                 <div className="grid grid-cols-2 gap-3 text-[10px] font-bold text-stone-500">
                    <div className="flex items-center gap-1 bg-stone-50 p-2 rounded-lg">
                       <Box size={12} /> Safe-Travel Box
                    </div>
                    <div className="flex items-center gap-1 bg-stone-50 p-2 rounded-lg">
                       <Shield size={12} /> 14-Day Guarantee
                    </div>
                 </div>

                 {/* Packaging Link */}
                 <div onClick={onViewPackaging} className="pt-2 text-center">
                    <span className="text-xs text-stone-400 cursor-pointer hover:text-emerald-600 hover:underline transition-colors flex items-center justify-center gap-1">
                       How do we ship live plants? <Info size={12} />
                    </span>
                 </div>
               </div>
             )}
          </div>

          {/* Growth Analysis / Value Chart */}
          <div className="bg-white rounded-3xl p-6 border border-stone-100 shadow-sm relative overflow-hidden">
            <div className="flex justify-between items-start mb-4">
               <div>
                 <h3 className="text-sm font-bold text-stone-900">Value Growth</h3>
                 <p className="text-xs text-stone-400">Past performance</p>
               </div>
               <div className="bg-emerald-50 px-2 py-1 rounded text-xs font-bold text-emerald-700">
                 +{(plant.currentValue - plant.purchasePrice) / plant.purchasePrice * 100}%
               </div>
            </div>
            <div className="h-32 -mx-2">
              <ValueChart data={plant.valueHistory} color="#059669" height={130} />
            </div>
          </div>

          {/* Plant Bio */}
          <div className="bg-white rounded-3xl p-6 border border-stone-100 shadow-sm">
             <h3 className="text-lg font-bold text-stone-900 mb-3 flex items-center gap-2">
               <Info className="w-5 h-5 text-stone-400" />
               Details
             </h3>
             <p className="text-stone-600 leading-relaxed text-sm mb-4">
               {plant.description}
             </p>
             <div className="flex justify-between text-sm pt-4 border-t border-stone-100">
               <span className="text-stone-500">Days since planting</span>
               <span className="font-medium text-stone-900">
                  {Math.floor((new Date().getTime() - new Date(plant.plantedDate).getTime()) / (1000 * 3600 * 24))} Days
               </span>
             </div>
          </div>

        </div>
      </div>
    </div>
  );
};

const ConditionCard = ({ icon, label, value, color }: { icon: any, label: string, value: string, color: string }) => {
  const colorClasses: Record<string, string> = {
    blue: 'bg-blue-50 text-blue-600',
    yellow: 'bg-yellow-50 text-yellow-600',
    orange: 'bg-orange-50 text-orange-600',
    teal: 'bg-teal-50 text-teal-600',
    green: 'bg-green-50 text-green-600',
  };

  return (
    <div className="bg-white p-4 rounded-2xl border border-stone-100 shadow-sm flex flex-col items-start gap-3">
      <div className={`p-2.5 rounded-xl ${colorClasses[color]}`}>
        {React.cloneElement(icon, { size: 20 })}
      </div>
      <div>
        <p className="text-xs text-stone-400 font-semibold uppercase">{label}</p>
        <p className="text-sm font-medium text-stone-900 line-clamp-2 leading-tight mt-1">{value}</p>
      </div>
    </div>
  );
};

// Icon helper
const Shield = ({size}: {size:number}) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
);