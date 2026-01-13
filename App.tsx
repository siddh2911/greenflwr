import React, { useState } from 'react';
import { Home as HomeIcon, ShoppingBag, Sprout, User, Menu, X, Search, Gift, Newspaper, Tag, Shovel, Phone, Leaf, Box } from 'lucide-react';
import { Home } from './pages/Home';
import { Marketplace } from './pages/Marketplace';
import { PlantDetail } from './pages/PlantDetail';
import { MyGarden } from './pages/MyGarden';
import { GardenServices, Blog, Offers, CorporateGifts, Packaging } from './pages/ExtraPages';
import { Plant, ProductCategory } from './types';
import { MOCK_PLANTS } from './constants';

type ViewState = 'home' | 'marketplace' | 'detail' | 'garden' | 'services' | 'blog' | 'offers' | 'corporate' | 'packaging';

export default function App() {
  const [currentView, setCurrentView] = useState<ViewState>('home');
  const [selectedPlantId, setSelectedPlantId] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<ProductCategory | undefined>(undefined);
  const [myPlants, setMyPlants] = useState<string[]>(['1']);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);


  const navigateTo = (view: ViewState, category?: ProductCategory) => {
    setCurrentView(view);
    if (category) {
      setSelectedCategory(category);
    } else {
      setSelectedCategory(undefined);
    }
    setIsMobileMenuOpen(false);
    window.scrollTo(0, 0);
  };

  const handleViewPlant = (plantId: string) => {
    setSelectedPlantId(plantId);
    navigateTo('detail');
  };

  const handleBuyPlant = (plantId: string) => {
    if (!myPlants.includes(plantId)) {
      setMyPlants([...myPlants, plantId]);
    }
    navigateTo('garden');
  };

  const handleSellPlant = (plantId: string) => {
    setMyPlants(myPlants.filter(id => id !== plantId));
    navigateTo('garden');
  };

  const renderContent = () => {
    switch (currentView) {
      case 'home':
        return <Home onExplore={() => navigateTo('marketplace')} onViewPlant={handleViewPlant} />;
      case 'marketplace':
        return <Marketplace onViewPlant={handleViewPlant} initialCategory={selectedCategory} />;
      case 'detail':
        const plant = MOCK_PLANTS.find(p => p.id === selectedPlantId);
        if (!plant) return <Marketplace onViewPlant={handleViewPlant} />;
        return (
          <PlantDetail
            plant={plant}
            isOwned={myPlants.includes(plant.id)}
            onBuy={() => handleBuyPlant(plant.id)}
            onBack={() => navigateTo('marketplace', plant.category)}
            onViewPackaging={() => navigateTo('packaging')}
          />
        );
      case 'garden':
        const ownedPlants = MOCK_PLANTS.filter(p => myPlants.includes(p.id));
        return (
          <MyGarden
            plants={ownedPlants}
            onViewPlant={handleViewPlant}
            onSell={handleSellPlant}
          />
        );
      case 'services': return <GardenServices />;
      case 'blog': return <Blog />;
      case 'offers': return <Offers />;
      case 'corporate': return <CorporateGifts />;
      case 'packaging': return <Packaging />;
      default:
        return <Home onExplore={() => navigateTo('marketplace')} onViewPlant={handleViewPlant} />;
    }
  };

  return (
    <div className="min-h-screen text-stone-800 font-sans">


      <div className="fixed top-0 left-0 right-0 z-50">


        <div className="bg-[#1c3a30]/95 backdrop-blur-md text-emerald-50 text-xs py-2 px-4 transition-colors border-b border-white/5">
          <div className="max-w-7xl mx-auto flex justify-between items-center">
            <div className="hidden md:flex items-center gap-4 font-medium tracking-wide">
              <span className="flex items-center gap-1.5"><Tag size={12} className="text-emerald-400" /> Free Delivery on orders over ₹499</span>
              <span className="w-1 h-1 bg-emerald-500 rounded-full"></span>
              <span className="flex items-center gap-1.5"><Box size={12} className="text-emerald-400" /> Safe-Travel Packaging Guarantee</span>
              <span className="w-1 h-1 bg-emerald-500 rounded-full"></span>
              <button onClick={() => navigateTo('marketplace')} className="underline decoration-emerald-400 hover:text-emerald-300 font-bold">Shop Collection</button>
            </div>
            <div className="md:hidden font-medium text-emerald-100">
              🌿 Join greenflwr & Get 10% Off First Order
            </div>
            <div className="flex gap-6 w-full md:w-auto justify-between md:justify-end text-emerald-200/80">
              <button onClick={() => navigateTo('offers')} className="hover:text-emerald-100 transition-colors flex items-center gap-1 font-medium">Offers</button>
              <button onClick={() => navigateTo('corporate')} className="hover:text-emerald-100 transition-colors flex items-center gap-1 font-medium">For Business</button>
              <button onClick={() => navigateTo('blog')} className="hover:text-emerald-100 transition-colors flex items-center gap-1 font-medium">Journal</button>
            </div>
          </div>
        </div>


        <div className="border-b border-white/40 bg-white/60 backdrop-blur-xl shadow-sm transition-all duration-300">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-8">

            <div
              className="flex items-center cursor-pointer group flex-shrink-0 gap-2"
              onClick={() => navigateTo('home')}
            >
              <div className="relative">
                <div className="absolute inset-0 bg-emerald-500 blur-lg opacity-20 rounded-full group-hover:opacity-40 transition-opacity"></div>
                <Leaf className="w-8 h-8 text-emerald-700 relative z-10 transform group-hover:rotate-12 transition-transform duration-500" strokeWidth={2.5} />
              </div>
              <span className="text-3xl font-extrabold tracking-tighter text-[#1c3a30]">
                greenflwr<span className="text-emerald-500">.</span>
              </span>
            </div>


            <div className="hidden md:flex flex-1 max-w-md bg-white/40 backdrop-blur-lg rounded-full px-5 py-2.5 border border-stone-200/50 focus-within:ring-2 focus-within:ring-emerald-500/20 focus-within:border-emerald-500/50 transition-all shadow-inner group">
              <Search className="w-5 h-5 text-stone-400 mr-3 group-focus-within:text-emerald-600 transition-colors" />
              <input
                type="text"
                placeholder="Find your perfect plant match..."
                className="bg-transparent border-none outline-none w-full text-sm text-stone-700 placeholder:text-stone-400 font-medium"
              />
            </div>


            <div className="hidden md:flex items-center gap-4">
              <button onClick={() => navigateTo('garden')} className="flex items-center gap-2.5 text-[#1c3a30] hover:text-emerald-700 transition-all px-4 py-2 rounded-full hover:bg-white/50 border border-transparent hover:border-emerald-100">
                <User className="w-5 h-5" />
                <span className="text-sm font-bold">My Garden</span>
              </button>
              <button onClick={() => navigateTo('marketplace')} className="flex items-center justify-center w-10 h-10 rounded-full bg-[#1c3a30] text-white hover:bg-emerald-800 transition-colors shadow-lg shadow-emerald-900/20 relative">
                <ShoppingBag className="w-5 h-5" />
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-emerald-400 rounded-full border-2 border-white flex items-center justify-center text-[8px] font-bold text-[#1c3a30]">2</span>
              </button>
            </div>


            <button
              className="md:hidden p-2 text-stone-600"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>


        <div className="hidden md:block border-b border-white/20 bg-white/30 backdrop-blur-md">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-center gap-10 py-3 text-sm font-bold tracking-wide text-stone-600 overflow-x-auto no-scrollbar">
              <NavCat active={currentView === 'marketplace' && selectedCategory === 'Plants'} onClick={() => navigateTo('marketplace', 'Plants')}>Live Plants</NavCat>
              <NavCat active={currentView === 'marketplace' && selectedCategory === 'Seeds'} onClick={() => navigateTo('marketplace', 'Seeds')}>Rare Seeds</NavCat>
              <NavCat active={currentView === 'marketplace' && selectedCategory === 'Pots'} onClick={() => navigateTo('marketplace', 'Pots')}>Designer Pots</NavCat>
              <NavCat active={currentView === 'marketplace' && selectedCategory === 'Care'} onClick={() => navigateTo('marketplace', 'Care')}>Plant Care</NavCat>
              <NavCat active={currentView === 'marketplace' && selectedCategory === 'Gifting'} onClick={() => navigateTo('marketplace', 'Gifting')}>Gifting</NavCat>
              <div className="w-1 h-1 bg-stone-300 rounded-full self-center"></div>
              <NavCat active={currentView === 'services'} onClick={() => navigateTo('services')}>Services</NavCat>
            </div>
          </div>
        </div>


        {isMobileMenuOpen && (
          <div className="md:hidden bg-white/95 backdrop-blur-xl border-b border-stone-100 absolute top-[104px] left-0 right-0 h-[calc(100vh-104px)] overflow-y-auto p-4 space-y-4 shadow-xl z-50">
            <div className="space-y-2">
              <p className="text-xs font-bold text-stone-400 uppercase tracking-wider">Shop</p>
              <MobileLink onClick={() => navigateTo('marketplace', 'Plants')}>Plants</MobileLink>
              <MobileLink onClick={() => navigateTo('marketplace', 'Seeds')}>Seeds</MobileLink>
              <MobileLink onClick={() => navigateTo('marketplace', 'Pots')}>Pots & Planters</MobileLink>
              <MobileLink onClick={() => navigateTo('marketplace', 'Care')}>Plant Care</MobileLink>
              <MobileLink onClick={() => navigateTo('marketplace', 'Gifting')}>Gifting</MobileLink>
            </div>
            <hr className="border-stone-100" />
            <div className="space-y-2">
              <p className="text-xs font-bold text-stone-400 uppercase tracking-wider">Discover</p>
              <MobileLink onClick={() => navigateTo('services')}>Garden Services</MobileLink>
              <MobileLink onClick={() => navigateTo('blog')}>Blog</MobileLink>
              <MobileLink onClick={() => navigateTo('offers')}>Offers</MobileLink>
              <MobileLink onClick={() => navigateTo('corporate')}>Corporate Gifts</MobileLink>
            </div>
            <hr className="border-stone-100" />
            <button onClick={() => navigateTo('garden')} className="w-full bg-[#1c3a30] text-emerald-50 py-3 rounded-xl font-bold flex items-center justify-center gap-2">
              <User size={18} /> My Garden Dashboard
            </button>
          </div>
        )}
      </div>


      <main className="pt-[148px] md:pt-[150px] min-h-screen">
        {renderContent()}
      </main>


      <footer className="bg-white/60 backdrop-blur-lg border-t border-white/40 py-16 mt-20 relative z-10">
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-4 gap-12">
          <div className="space-y-6">
            <div className="flex items-center gap-2">
              <Leaf className="w-6 h-6 text-emerald-700" />
              <span className="font-extrabold text-2xl text-[#1c3a30]">greenflwr.</span>
            </div>
            <p className="text-stone-500 text-sm font-medium leading-relaxed">
              We believe in the power of nature to heal, inspire, and grow wealth. greenflwr connects you to real botanical assets that appreciate in value and beauty.
            </p>
            <div className="flex gap-4">

              <div className="w-8 h-8 rounded-full bg-stone-200/50 hover:bg-emerald-100 transition-colors cursor-pointer"></div>
              <div className="w-8 h-8 rounded-full bg-stone-200/50 hover:bg-emerald-100 transition-colors cursor-pointer"></div>
              <div className="w-8 h-8 rounded-full bg-stone-200/50 hover:bg-emerald-100 transition-colors cursor-pointer"></div>
            </div>
          </div>
          <div>
            <h4 className="font-bold mb-6 text-[#1c3a30]">Collections</h4>
            <ul className="space-y-3 text-sm text-stone-500 font-medium">
              <li onClick={() => navigateTo('marketplace', 'Plants')} className="cursor-pointer hover:text-emerald-700 transition-colors">Rare Foliage</li>
              <li onClick={() => navigateTo('marketplace', 'Seeds')} className="cursor-pointer hover:text-emerald-700 transition-colors">Heirloom Seeds</li>
              <li onClick={() => navigateTo('marketplace', 'Pots')} className="cursor-pointer hover:text-emerald-700 transition-colors">Artisan Pots</li>
              <li onClick={() => navigateTo('marketplace', 'Gifting')} className="cursor-pointer hover:text-emerald-700 transition-colors">Gift Sets</li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-6 text-[#1c3a30]">Company</h4>
            <ul className="space-y-3 text-sm text-stone-500 font-medium">
              <li onClick={() => navigateTo('blog')} className="cursor-pointer hover:text-emerald-700 transition-colors">Our Journal</li>
              <li onClick={() => navigateTo('corporate')} className="cursor-pointer hover:text-emerald-700 transition-colors">Corporate Gifting</li>
              <li>Sustainability Pledge</li>
              <li>Careers</li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-6 text-[#1c3a30]">Support</h4>
            <ul className="space-y-3 text-sm text-stone-500 font-medium">
              <li onClick={() => navigateTo('packaging')} className="cursor-pointer hover:text-emerald-700 transition-colors">Safe-Travel Packaging</li>
              <li onClick={() => navigateTo('services')} className="cursor-pointer hover:text-emerald-700 transition-colors">Garden Services</li>
              <li>Plant Doctor</li>
              <li>Shipping & Returns</li>
              <li>FAQ</li>
            </ul>
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-6 mt-16 pt-8 border-t border-stone-200/50 text-center md:text-left flex flex-col md:flex-row justify-between items-center text-xs text-stone-400 font-medium">
          <p>© 2024 greenflwr Inc. All rights reserved.</p>
          <p>Carbon Neutral Shipping • 100% Organic Guarantee</p>
        </div>
      </footer>
    </div>
  );
}

const NavCat = ({ children, active, onClick }: { children?: React.ReactNode, active?: boolean, onClick: () => void }) => (
  <button
    onClick={onClick}
    className={`hover:text-emerald-700 transition-all whitespace-nowrap px-4 py-1.5 rounded-full ${active ? 'bg-emerald-100/50 text-emerald-800 font-bold shadow-sm' : ''}`}
  >
    {children}
  </button>
);

const MobileLink = ({ children, onClick }: { children?: React.ReactNode, onClick: () => void }) => (
  <button
    onClick={onClick}
    className="block w-full text-left py-2 text-stone-700 font-medium hover:bg-stone-50 rounded-lg px-2"
  >
    {children}
  </button>
);