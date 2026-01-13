import React, { useState } from 'react';
import { ArrowRight, ShoppingBag, Star, TrendingUp, Truck, RotateCcw, ShieldCheck, Tag, Video, Play, Eye } from 'lucide-react';
import { MOCK_PLANTS } from '../constants';
import { PlantCard } from '../components/PlantCard';

interface HomeProps {
   onExplore: () => void;
   onViewPlant: (plantId: string) => void;
}

export const Home: React.FC<HomeProps> = ({ onExplore, onViewPlant }) => {
   const newArrivals = MOCK_PLANTS.slice(0, 4);
   const bestSellers = MOCK_PLANTS.slice(2, 6);
   const [isVideoPlaying, setIsVideoPlaying] = useState(false);

   return (
      <div className="flex flex-col gap-16 pt-4 pb-20">


         <section className="px-4 max-w-7xl mx-auto w-full">
            <div className="bg-[#1c3a30] rounded-[2.5rem] overflow-hidden grid md:grid-cols-12 min-h-[600px] shadow-2xl relative">


               <div className="md:col-span-12 lg:col-span-5 p-8 md:p-12 lg:p-16 flex flex-col justify-center relative z-20">
                  <div className="flex items-center gap-2 mb-6">
                     <span className="bg-red-500 text-white px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest animate-pulse flex items-center gap-1">
                        <span className="w-1.5 h-1.5 bg-white rounded-full"></span> Live
                     </span>
                     <span className="text-emerald-300 font-mono text-xs tracking-wider">HARVEST ZONE C • 24 VIEWERS</span>
                  </div>

                  <h1 className="text-5xl lg:text-6xl font-extrabold text-white leading-[1.1] mb-6 font-display">
                     Shop the <br />
                     <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-200">Live Drop.</span>
                  </h1>

                  <p className="text-emerald-100/70 mb-8 text-lg leading-relaxed">
                     Join our greenhouse livestream. See the exact plants you're buying in real-time. No filters, just foliage.
                  </p>

                  <div className="flex flex-col gap-4">
                     <div className="bg-white/10 backdrop-blur-md border border-white/10 p-4 rounded-xl flex items-center gap-4 hover:bg-white/20 transition-colors cursor-pointer group" onClick={() => onViewPlant('2')}>
                        <img src="https://images.unsplash.com/photo-1525498128493-380d1990a112?q=80&w=150&auto=format&fit=crop" className="w-16 h-16 rounded-lg object-cover" />
                        <div className="flex-1">
                           <p className="text-emerald-200 text-xs font-bold uppercase">On Screen Now</p>
                           <p className="text-white font-bold text-lg">Monstera Albo</p>
                           <p className="text-emerald-400 font-mono">₹ 3,400</p>
                        </div>
                        <button className="bg-white text-[#1c3a30] w-10 h-10 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                           <ShoppingBag size={18} />
                        </button>
                     </div>

                     <div className="flex gap-4 mt-2">
                        <button onClick={onExplore} className="flex-1 bg-emerald-500 text-white py-4 rounded-full font-bold hover:bg-emerald-400 transition-all shadow-lg shadow-emerald-900/20">
                           View All Drops
                        </button>
                        <button onClick={() => setIsVideoPlaying(!isVideoPlaying)} className="w-16 h-14 border border-white/20 rounded-full flex items-center justify-center hover:bg-white/10 text-white transition-all">
                           {isVideoPlaying ? <Eye size={24} /> : <Play size={24} fill="currentColor" />}
                        </button>
                     </div>
                  </div>
               </div>


               <div className="md:col-span-12 lg:col-span-7 relative h-[400px] lg:h-auto bg-black">
                  <img
                     src="https://images.unsplash.com/photo-1545241047-6083a3684587?q=80&w=1200&auto=format&fit=crop"
                     alt="Live Greenhouse Feed"
                     className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${isVideoPlaying ? 'opacity-80' : 'opacity-60'}`}
                  />
                  <div className="absolute inset-0 bg-gradient-to-l from-transparent via-[#1c3a30]/50 to-[#1c3a30]"></div>


                  <div className="absolute top-6 right-6 flex flex-col gap-2 items-end">
                     <div className="bg-black/60 backdrop-blur text-white px-3 py-1 rounded text-xs font-mono border border-white/10">
                        CAM 01
                     </div>
                     <div className="bg-black/60 backdrop-blur text-white px-3 py-1 rounded text-xs font-mono border border-white/10">
                        HD 1080P
                     </div>
                  </div>


                  <div className="absolute bottom-8 right-8 left-8 flex justify-end">
                     <div className="bg-black/40 backdrop-blur-md rounded-xl p-4 w-64 border border-white/10 hidden sm:block">
                        <p className="text-[10px] text-white/50 font-bold uppercase mb-2">Live Chat</p>
                        <div className="space-y-2 text-xs">
                           <p><span className="text-emerald-400 font-bold">Sarah:</span> That variegation is intense! 😍</p>
                           <p><span className="text-blue-400 font-bold">Mike:</span> Can you rotate it?</p>
                           <p><span className="text-purple-400 font-bold">greenflwr:</span> Sure Mike! Turning now.</p>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
         </section>


         <section className="bg-white border-y border-stone-100">
            <div className="max-w-7xl mx-auto px-4 py-10 grid grid-cols-2 lg:grid-cols-4 gap-8">
               <TrustItem icon={<Video />} title="Live Video Shopping" desc="See exactly what you get" />
               <TrustItem icon={<Truck />} title="Free Shipping" desc="On orders over ₹499" />
               <TrustItem icon={<ShieldCheck />} title="Safe Arrival" desc="Guaranteed damage-free" />
               <TrustItem icon={<RotateCcw />} title="Easy Returns" desc="7-day replacement policy" />
            </div>
         </section>


         <section className="max-w-7xl mx-auto px-4">
            <div className="flex justify-between items-end mb-10">
               <div>
                  <h2 className="text-3xl font-extrabold text-[#1c3a30] tracking-tight">Fresh from Greenhouse</h2>
                  <p className="text-stone-500 mt-2 font-medium">Dropped 2 hours ago. Limited stock.</p>
               </div>
               <button onClick={onExplore} className="text-emerald-700 font-bold hover:underline flex items-center gap-1">Shop All <ArrowRight size={16} /></button>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-10">
               {newArrivals.map(plant => (
                  <PlantCard
                     key={plant.id}
                     plant={plant}
                     onClick={() => onViewPlant(plant.id)}
                  />
               ))}
            </div>
         </section>


         <section className="bg-stone-50 py-20">
            <div className="max-w-7xl mx-auto px-4">
               <div className="text-center mb-12">
                  <h2 className="text-3xl font-extrabold text-[#1c3a30]">Find Your Perfect Plant</h2>
                  <p className="text-stone-500 mt-2">Browse by category to find a match for your space</p>
               </div>

               <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                  <CategoryPill title="All Plants" icon="🌱" onClick={onExplore} active />
                  <CategoryPill title="Pet Safe" icon="🐾" onClick={onExplore} />
                  <CategoryPill title="Low Light" icon="🌑" onClick={onExplore} />
                  <CategoryPill title="Large Plants" icon="🌳" onClick={onExplore} />
                  <CategoryPill title="Designer Pots" icon="🏺" onClick={onExplore} />
                  <CategoryPill title="Gift Sets" icon="🎁" onClick={onExplore} />
               </div>
            </div>
         </section>


         <section className="max-w-7xl mx-auto px-4">
            <div className="flex justify-between items-end mb-10">
               <div>
                  <h2 className="text-3xl font-extrabold text-[#1c3a30]">Community Favorites</h2>
                  <p className="text-stone-500 mt-2 font-medium">Top rated plants by 10,000+ parents</p>
               </div>
               <button onClick={onExplore} className="text-emerald-700 font-bold hover:underline flex items-center gap-1">Shop All <ArrowRight size={16} /></button>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-10">
               {bestSellers.map(plant => (
                  <PlantCard
                     key={plant.id}
                     plant={plant}
                     onClick={() => onViewPlant(plant.id)}
                  />
               ))}
            </div>
         </section>


         <section className="px-4 max-w-7xl mx-auto mb-12">
            <div className="bg-[#1c3a30] rounded-[2rem] p-8 md:p-16 flex flex-col md:flex-row items-center justify-between gap-12 text-white relative overflow-hidden shadow-2xl">
               <div className="relative z-10 max-w-xl">
                  <h2 className="text-4xl font-extrabold mb-4 font-display">Join the Green Club</h2>
                  <p className="text-emerald-100/80 mb-8 text-lg">Get 15% off your first order, access to secret drops, and free plant care guides directly to your inbox.</p>
                  <div className="flex gap-2 max-w-md">
                     <input type="email" placeholder="Enter your email" className="bg-white/10 border border-emerald-500/30 rounded-xl px-4 py-4 w-full backdrop-blur-sm placeholder:text-emerald-200/50 focus:outline-none focus:border-emerald-400 text-white" />
                     <button className="bg-emerald-500 text-white px-8 py-4 rounded-xl font-bold hover:bg-emerald-400 whitespace-nowrap shadow-lg">Subscribe</button>
                  </div>
               </div>

               <div className="absolute right-0 top-0 bottom-0 w-1/2 bg-gradient-to-l from-emerald-900 via-emerald-800/20 to-transparent pointer-events-none"></div>
               <TrendingUp size={200} className="text-white/5 absolute -right-8 -bottom-8 rotate-12" />
            </div>
         </section>

      </div>
   );
};

const TrustItem = ({ icon, title, desc }: { icon: React.ReactNode, title: string, desc: string }) => (
   <div className="flex flex-col items-center text-center gap-3 p-4 rounded-xl hover:bg-stone-50 transition-colors">
      <div className="text-emerald-600 mb-2 scale-125 bg-emerald-100/50 p-3 rounded-full">{icon}</div>
      <div>
         <h3 className="font-bold text-[#1c3a30] text-lg">{title}</h3>
         <p className="text-sm text-stone-500 font-medium">{desc}</p>
      </div>
   </div>
);

const CategoryPill = ({ title, icon, onClick, active }: { title: string, icon: string, onClick: () => void, active?: boolean }) => (
   <button
      onClick={onClick}
      className={`border rounded-2xl p-6 flex flex-col items-center gap-3 transition-all group ${active ? 'bg-[#1c3a30] border-[#1c3a30] shadow-lg scale-105' : 'bg-white border-stone-200 hover:border-emerald-500 hover:shadow-md'}`}
   >
      <span className={`text-3xl group-hover:scale-110 transition-transform ${active ? 'contrast-125' : ''}`}>{icon}</span>
      <span className={`font-bold text-sm ${active ? 'text-white' : 'text-stone-700'}`}>{title}</span>
   </button>
);