import React from 'react';
import { Shovel, Gift, Newspaper, Tag, Box, Layers, Droplets, Shield, Recycle } from 'lucide-react';

export const GardenServices = () => (
  <div className="max-w-7xl mx-auto px-6 py-16">
    <div className="text-center mb-16">
      <h1 className="text-4xl font-bold text-stone-900 mb-4">Professional Garden Services</h1>
      <p className="text-xl text-stone-500 max-w-2xl mx-auto font-medium">
        Let our expert botanists design, install, and maintain your green spaces.
      </p>
    </div>

    <div className="grid md:grid-cols-3 gap-8">
      {[
        { title: "Landscape Design", desc: "Custom designs for balconies, terraces, and gardens.", price: "From ₹5000" },
        { title: "Monthly Maintenance", desc: "Weekly visits for pruning, fertilizing, and pest control.", price: "₹2000 / mo" },
        { title: "Plant Doctor Visits", desc: "One-time consultation for sick plants.", price: "₹500 / visit" }
      ].map((service, idx) => (
        <div key={idx} className="glass-card p-8 rounded-[2rem] hover:shadow-xl transition-all group">
          <div className="w-14 h-14 bg-emerald-100 rounded-2xl flex items-center justify-center mb-6 text-emerald-600 group-hover:scale-110 transition-transform">
            <Shovel className="w-7 h-7" />
          </div>
          <h3 className="text-xl font-bold text-stone-800 mb-2">{service.title}</h3>
          <p className="text-stone-500 mb-6 text-sm leading-relaxed">{service.desc}</p>
          <p className="text-emerald-700 font-bold text-lg">{service.price}</p>
          <button className="mt-6 w-full py-3 rounded-xl border border-stone-200 text-stone-700 font-bold hover:bg-stone-50 hover:border-stone-300 transition-all">Book Now</button>
        </div>
      ))}
    </div>
  </div>
);

export const Blog = () => (
  <div className="max-w-7xl mx-auto px-6 py-16">
    <h1 className="text-4xl font-bold text-stone-900 mb-12">GrowValue Journal</h1>
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
      {[1, 2, 3].map((i) => (
        <div key={i} className="group cursor-pointer">
          <div className="aspect-video bg-stone-200 rounded-3xl mb-4 overflow-hidden shadow-md">
             <img src={`https://images.unsplash.com/photo-${i === 1 ? '1463936575229-46994167ead3' : i === 2 ? '1501004318641-b39ecd4f1851' : '1523348837708-15d4a09cfac2'}?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80`} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"/>
          </div>
          <div className="flex items-center gap-2 text-xs font-bold text-emerald-600 uppercase mb-2 bg-emerald-50 w-max px-2 py-1 rounded">
            <Newspaper className="w-3 h-3" />
            <span>Care Tips</span>
          </div>
          <h3 className="text-xl font-bold text-stone-900 mb-2 group-hover:text-emerald-700 transition-colors">
            {i === 1 ? 'How to increase your plant\'s value' : i === 2 ? 'The best low-light indoor plants' : 'Propagating Monstera for profit'}
          </h3>
          <p className="text-stone-500 text-sm line-clamp-2">
            Discover the secrets of botany and investment combined. Learn how simple care routines can maximize the growth and resale value of your green assets.
          </p>
        </div>
      ))}
    </div>
  </div>
);

export const Offers = () => (
  <div className="max-w-7xl mx-auto px-6 py-16">
    <h1 className="text-4xl font-bold text-stone-900 mb-8">Special Offers</h1>
    <div className="bg-gradient-to-r from-emerald-500 to-teal-600 rounded-[2.5rem] p-1 shadow-2xl shadow-emerald-200">
       <div className="bg-white/10 backdrop-blur-md rounded-[2.3rem] p-8 md:p-12 text-white relative overflow-hidden border border-white/20">
         <div className="relative z-10 max-w-lg">
            <div className="inline-block bg-white/20 backdrop-blur-lg border border-white/30 px-3 py-1 rounded-full text-xs font-bold mb-4 uppercase tracking-wider shadow-sm">Limited Time</div>
            <h2 className="text-3xl md:text-5xl font-extrabold mb-4 drop-shadow-md">Summer Starter Pack</h2>
            <p className="text-emerald-50 text-lg mb-8 font-medium">Get 3 seedlings, organic soil mix, and a set of ceramic pots at 40% off.</p>
            <button className="bg-white text-emerald-900 px-8 py-3 rounded-full font-bold hover:bg-emerald-50 transition-colors shadow-lg">Shop Bundle</button>
         </div>
         <Tag className="absolute right-[-20px] bottom-[-20px] w-64 h-64 text-white/10 rotate-12" />
       </div>
    </div>
  </div>
);

export const CorporateGifts = () => (
  <div className="max-w-7xl mx-auto px-6 py-16">
    <div className="flex flex-col md:flex-row items-center gap-12">
      <div className="flex-1">
        <h1 className="text-4xl md:text-5xl font-bold text-stone-900 mb-6">Green Gifts for Modern Teams</h1>
        <p className="text-xl text-stone-500 mb-8 font-medium">
          Sustainable, living gifts that grow with your relationships. Custom branding available for bulk orders.
        </p>
        <ul className="space-y-4 mb-8">
          {['Custom Pot Branding', 'Bulk Discounts', 'Desk-friendly Plants', 'Care Cards Included'].map(item => (
             <li key={item} className="flex items-center gap-3 text-stone-700 font-bold">
               <div className="w-8 h-8 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600"><Gift className="w-4 h-4"/></div>
               {item}
             </li>
          ))}
        </ul>
        <button className="bg-stone-900 text-white px-8 py-4 rounded-full font-bold shadow-xl hover:bg-stone-800 transition-colors">Request Catalogue</button>
      </div>
      <div className="flex-1">
        <img src="https://images.unsplash.com/photo-1497215728101-856f4ea42174?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80" className="rounded-[3rem] shadow-2xl border-4 border-white" alt="Office plants" />
      </div>
    </div>
  </div>
);

export const Packaging = () => (
  <div className="pt-8 pb-24">
    {/* Hero */}
    <div className="max-w-7xl mx-auto px-6 mb-20 text-center">
      <div className="inline-flex items-center gap-2 bg-emerald-100 text-emerald-800 px-4 py-1.5 rounded-full font-bold text-xs uppercase tracking-wider mb-6">
        <Shield size={14} />
        Safe-Travel™ Technology
      </div>
      <h1 className="text-4xl md:text-6xl font-extrabold text-[#1c3a30] mb-6">Engineered for Life.</h1>
      <p className="text-xl text-stone-500 max-w-3xl mx-auto">
        We didn't just design a box. We designed a life-support system. 
        Your plant travels in a climate-controlled, shock-absorbing, 100% recyclable pod.
      </p>
    </div>

    {/* The Exploded View Concept */}
    <div className="max-w-5xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center mb-24">
       <div className="relative">
          {/* Abstract representation of the box layers */}
          <div className="space-y-4">
             {/* Top Box */}
             <div className="bg-[#e5e0d8] border-2 border-[#d6d3d1] rounded-3xl h-32 w-full transform -skew-x-2 translate-x-4 shadow-xl flex items-center justify-center text-stone-400 font-bold text-2xl">
               Outer Armor
             </div>
             {/* Middle Sleeve */}
             <div className="bg-emerald-50 border-2 border-emerald-100 rounded-2xl h-48 w-[90%] mx-auto transform -skew-x-2 shadow-inner flex items-center justify-center relative overflow-hidden">
                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
                <span className="text-emerald-300 font-bold text-xl">Foliage Cocoon</span>
             </div>
             {/* Bottom Base */}
             <div className="bg-[#44403c] rounded-3xl h-24 w-full transform -skew-x-2 -translate-x-4 shadow-2xl flex items-center justify-center text-white font-bold text-2xl">
               Pot Lock™ Base
             </div>
          </div>
       </div>

       <div className="space-y-8">
          <div className="flex gap-4">
             <div className="w-12 h-12 bg-stone-900 text-white rounded-xl flex items-center justify-center flex-shrink-0">
               <Box size={24} />
             </div>
             <div>
               <h3 className="text-xl font-bold text-[#1c3a30] mb-2">1. The Outer Armor</h3>
               <p className="text-stone-500 text-sm leading-relaxed">
                 Double-walled, corrugated cardboard with a hexagonal structure. Can withstand 50kg of crush pressure. Ventilated to prevent heat buildup.
               </p>
             </div>
          </div>

          <div className="flex gap-4">
             <div className="w-12 h-12 bg-emerald-500 text-white rounded-xl flex items-center justify-center flex-shrink-0">
               <Layers size={24} />
             </div>
             <div>
               <h3 className="text-xl font-bold text-[#1c3a30] mb-2">2. The Pot Lock™ System</h3>
               <p className="text-stone-500 text-sm leading-relaxed">
                 A clever internal cardboard anchor locks the nursery pot to the bottom of the box. Even if the box is upside down, the plant stays put.
               </p>
             </div>
          </div>

          <div className="flex gap-4">
             <div className="w-12 h-12 bg-blue-500 text-white rounded-xl flex items-center justify-center flex-shrink-0">
               <Droplets size={24} />
             </div>
             <div>
               <h3 className="text-xl font-bold text-[#1c3a30] mb-2">3. The Hydro-Disc</h3>
               <p className="text-stone-500 text-sm leading-relaxed">
                 A biodegradable coir disc sits atop the soil, secured by a natural rubber band. Keeps moisture in and soil from spilling, ensuring 96 hours of hydration.
               </p>
             </div>
          </div>
       </div>
    </div>

    {/* Efficiency Section */}
    <div className="bg-[#1c3a30] text-white py-16">
      <div className="max-w-7xl mx-auto px-6 text-center">
         <h2 className="text-3xl font-bold mb-12">Efficiency by Design</h2>
         <div className="grid md:grid-cols-3 gap-8">
            <div className="glass-card-dark p-8 rounded-3xl">
               <Recycle className="w-10 h-10 text-emerald-400 mx-auto mb-4" />
               <h3 className="font-bold text-xl mb-2">Zero Plastic</h3>
               <p className="text-stone-300 text-sm">No bubble wrap. No peanuts. Just clever paper engineering.</p>
            </div>
            <div className="glass-card-dark p-8 rounded-3xl">
               <Box className="w-10 h-10 text-emerald-400 mx-auto mb-4" />
               <h3 className="font-bold text-xl mb-2">Flat-Pack Storage</h3>
               <p className="text-stone-300 text-sm">Boxes store flat in our warehouse, reducing storage footprint by 80%.</p>
            </div>
            <div className="glass-card-dark p-8 rounded-3xl">
               <Shield className="w-10 h-10 text-emerald-400 mx-auto mb-4" />
               <h3 className="font-bold text-xl mb-2">&lt;0.5% Damage Rate</h3>
               <p className="text-stone-300 text-sm">Industry standard is 5-10%. Our box is statistically safer.</p>
            </div>
         </div>
      </div>
    </div>
  </div>
);