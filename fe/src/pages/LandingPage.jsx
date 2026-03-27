import React, { useState } from 'react';

// ========= LANDING PAGE (Tailwind Redesign) =========
export default function LandingPage({ setPage, setFilter, user }) {
  const [showMedicalModal, setShowMedicalModal] = useState(false);
  const [search, setSearch] = useState('');

  const categories = [
    { key: 'tea_shop', label: 'Tea Shop', icon: '🍵', color: '#10b981', hoverClass: 'hover:border-emerald-500 hover:shadow-emerald-500/10' },
    { key: 'medical', label: 'Medical', icon: '💊', color: '#3b82f6', hoverClass: 'hover:border-blue-500 hover:shadow-blue-500/10' },
    { key: 'continental_cafe', label: 'Continental Cafe', icon: '☕', color: '#f59e0b', hoverClass: 'hover:border-amber-500 hover:shadow-amber-500/10' },
    { key: 'restaurant', label: 'Restaurant', icon: '🍽️', color: '#ef4444', hoverClass: 'hover:border-red-500 hover:shadow-red-500/10' },
    { key: 'supermarket', label: 'Supermarkets', icon: '🛒', color: '#8b5cf6', hoverClass: 'hover:border-violet-500 hover:shadow-violet-500/10' },
    { key: 'furniture', label: 'Furniture', icon: '🪑', color: '#f97316', hoverClass: 'hover:border-orange-500 hover:shadow-orange-500/10' },
    { key: 'shop_equipments', label: 'Equipments', icon: '🛠️', color: '#64748b', hoverClass: 'hover:border-slate-500 hover:shadow-slate-500/10' },
    { key: 'interior_design', label: 'Interior', icon: '🎨', color: '#ec4899', hoverClass: 'hover:border-pink-500 hover:shadow-pink-500/10' },
  ];

  const mockAds = [
    { id: 1, title: '🏦 NBFC Loans', sub: 'Up to ₹50 Lakh instantly' },
    { id: 2, title: '📋 Verified Listings', sub: '100% KYC verified' },
    { id: 3, title: '🤝 Mediator Support', sub: 'Certified experts near you' },
    { id: 4, title: '⚡ Fast Closure', sub: 'Close deals in 7 days' },
  ];

  return (
    <div className="animate-fade-in pb-10">
      {/* Inline styles for the custom ticker animation to keep everything self-contained */}
      <style>{`
        @keyframes scrollTicker { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }
        .animate-ticker { animation: scrollTicker 30s linear infinite; }
      `}</style>

      {/* --- HERO SECTION --- */}
      <div className="relative pt-24 pb-20 px-5 text-center overflow-hidden bg-transparent">
        {/* Background Blobs */}
        <div className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-green-500 rounded-full mix-blend-multiply filter blur-[80px] opacity-20 pointer-events-none"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-72 h-72 bg-blue-500 rounded-full mix-blend-multiply filter blur-[80px] opacity-20 pointer-events-none"></div>
        
        <div className="relative z-10 max-w-4xl mx-auto flex flex-col items-center">
          {/* Pill Badge */}
          <div className="bg-green-100 text-green-700 border border-green-200 px-4 py-2 rounded-full text-sm font-bold mb-6">
            ✨ India's #1 Business Marketplace
          </div>
          
          <h1 className="text-4xl md:text-6xl font-black leading-tight mb-5 text-gray-900">
            The Smart Way to <br/>
            <span className="bg-clip-text text-transparent bg-gradient-to-br from-green-600 to-green-400">
              Buy & Sell Businesses
            </span>
          </h1>
          
          <p className="text-lg text-gray-600 mb-10 max-w-2xl">
            Join thousands of entrepreneurs discovering tea shops, cafes, medical stores, and more across India.
          </p>
          
          {/* Glass Search Bar */}
          <div className="flex items-center bg-white/80 backdrop-blur-md border border-gray-200 p-2 pl-5 rounded-full w-full max-w-2xl shadow-[0_20px_40px_rgba(0,0,0,0.05)] transition-all duration-300 hover:shadow-[0_25px_50px_rgba(22,163,74,0.1)] focus-within:border-green-500 focus-within:-translate-y-1 mb-10">
            <span className="text-xl">🔍</span>
            <input 
              className="flex-1 bg-transparent border-none outline-none text-gray-800 text-base ml-3 placeholder-gray-400 w-full"
              placeholder="Search by business type, city, or state..." 
              value={search} 
              onChange={e => setSearch(e.target.value)} 
              onKeyDown={e => e.key === 'Enter' && (setFilter({ search }), setPage('listings'))}
            />
            <button 
              className="bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-6 rounded-full transition-colors"
              onClick={() => { setFilter({ search }); setPage('listings'); }}
            >
              Search
            </button>
          </div>

          {/* Stats */}
          <div className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-8 text-gray-600">
            <div className="flex flex-col"><strong className="text-2xl text-gray-900">10k+</strong> <span className="text-sm">Active Listings</span></div>
            <div className="hidden md:block w-px h-10 bg-gray-200"></div>
            <div className="flex flex-col"><strong className="text-2xl text-gray-900">₹500Cr+</strong> <span className="text-sm">Deals Closed</span></div>
            <div className="hidden md:block w-px h-10 bg-gray-200"></div>
            <div className="flex flex-col"><strong className="text-2xl text-gray-900">100%</strong> <span className="text-sm">Verified Users</span></div>
          </div>
        </div>
      </div>

      {/* --- TRUST TICKER --- */}
      <div className="w-full overflow-hidden bg-white border-y border-gray-200 py-4">
        <div className="flex w-[calc(300px*12)] animate-ticker">
          {[...mockAds, ...mockAds, ...mockAds].map((ad, i) => (
            <div key={`${ad.id}-${i}`} className="flex items-center gap-3 w-[300px] shrink-0 text-sm">
              <span className="text-2xl">{ad.title.split(' ')[0]}</span>
              <div>
                <strong className="text-gray-900 block">{ad.title.substring(ad.title.indexOf(' ') + 1)}</strong>
                <span className="text-gray-500">{ad.sub}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* --- CATEGORIES SECTION --- */}
      <div className="py-20 px-6 max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-extrabold mb-2 text-gray-900">
            Explore by <span className="bg-clip-text text-transparent bg-gradient-to-r from-green-600 to-green-400">Category</span>
          </h2>
          <p className="text-gray-500">Find the perfect industry for your next venture</p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
          {categories.map(c => (
            <div 
              key={c.key} 
              className={`group bg-white border border-gray-100 rounded-2xl p-6 flex items-center gap-4 cursor-pointer transition-all duration-300 hover:-translate-y-1 hover:shadow-xl ${c.hoverClass}`}
              onClick={() => {
                if (c.key === 'medical') setShowMedicalModal(true);
                else { setFilter({ category: c.key }); setPage('listings'); }
              }}
            >
              <div 
                className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl" 
                style={{ backgroundColor: `${c.color}15`, color: c.color }}
              >
                {c.icon}
              </div>
              <h3 className="text-lg font-bold text-gray-800 flex-1 m-0">{c.label}</h3>
              <span className="opacity-0 -translate-x-2 transition-all duration-300 font-bold group-hover:opacity-100 group-hover:translate-x-0" style={{ color: c.color }}>→</span>
            </div>
          ))}
        </div>
      </div>

      {/* --- MEDICAL MODAL --- */}
      {showMedicalModal && (
        <div className="fixed inset-0 z-[1000] flex items-center justify-center px-4">
          {/* Backdrop */}
          <div className="absolute inset-0 bg-gray-900/40 backdrop-blur-sm" onClick={() => setShowMedicalModal(false)}></div>
          
          {/* Modal Content */}
          <div className="relative bg-white rounded-3xl p-8 max-w-sm w-full shadow-2xl text-center z-10 border border-gray-100">
            <div className="w-16 h-16 rounded-2xl flex items-center justify-center text-3xl mx-auto mb-4 bg-blue-50 text-blue-500">
              💊
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Select Medical Type</h2>
            <p className="text-gray-500 text-sm mb-6">Choose the specific medical business category you are looking for.</p>
            
            <div className="flex flex-col gap-3 mb-6">
              <button 
                className="w-full py-3 px-4 rounded-xl border-2 border-gray-100 hover:border-blue-500 hover:bg-blue-50 text-gray-700 font-semibold transition-colors flex items-center justify-center gap-2"
                onClick={() => { setFilter({ category: 'medical', sub_category: 'retailer' }); setPage('listings'); }}
              >
                <span>🛒</span> Retail Pharmacy
              </button>
              <button 
                className="w-full py-3 px-4 rounded-xl border-2 border-gray-100 hover:border-blue-500 hover:bg-blue-50 text-gray-700 font-semibold transition-colors flex items-center justify-center gap-2"
                onClick={() => { setFilter({ category: 'medical', sub_category: 'distributor' }); setPage('listings'); }}
              >
                <span>🏢</span> Wholesale Distributor
              </button>
            </div>
            <button className="text-gray-400 hover:text-gray-600 font-medium" onClick={() => setShowMedicalModal(false)}>
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* --- WHY US SECTION --- */}
      <div className="py-20 px-6 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-extrabold mb-2 text-gray-900">
              Why Choose <span className="bg-clip-text text-transparent bg-gradient-to-r from-green-600 to-green-400">Sale Suit</span>?
            </h2>
            <p className="text-gray-500">We make business transitions seamless and secure</p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: '🛡️', title: 'KYC Verified Users', desc: 'Every user is rigorously verified with Aadhar, PAN & valid business licenses.' },
              { icon: '🏦', title: 'NBFC Loan Support', desc: 'Need capital? Apply for business purchase loans directly through our platform.' },
              { icon: '🤝', title: 'Mediator Network', desc: 'Get access to certified mediators to assist with negotiations and deal closures.' },
              { icon: '⚡', title: 'End-to-End Support', desc: 'From listing discovery to final paperwork, our customer care team is here.' },
            ].map(f => (
              <div key={f.title} className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow hover:-translate-y-1 duration-300">
                <div className="text-4xl mb-5">{f.icon}</div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{f.title}</h3>
                <p className="text-gray-500 leading-relaxed text-sm">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* --- CTA SECTION --- */}
      {!user && (
        <div className="py-20 px-6">
          <div className="bg-gradient-to-br from-gray-900 to-green-900 rounded-[2.5rem] p-10 md:p-16 max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between relative overflow-hidden text-white shadow-2xl">
            <div className="relative z-10 max-w-lg text-center md:text-left">
              <h2 className="text-3xl md:text-4xl font-black mb-4">Ready to start your journey?</h2>
              <p className="text-green-100 mb-8 text-lg">Join thousands of business owners and buyers on India's most secure platform today.</p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
                <button 
                  className="bg-green-500 hover:bg-green-400 text-gray-900 font-bold py-4 px-8 rounded-full transition-colors shadow-[0_0_20px_rgba(34,197,94,0.4)]"
                  onClick={() => setPage('login')}
                >
                  Create Free Account
                </button>
                <button 
                  className="bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/20 text-white font-semibold py-4 px-8 rounded-full transition-colors"
                  onClick={() => setPage('listings')}
                >
                  Browse Listings
                </button>
              </div>
            </div>
            {/* Background Decoration */}
            <div className="hidden md:block text-[12rem] absolute right-4 bottom-[-40px] opacity-20 filter drop-shadow-[0_0_20px_rgba(255,255,255,0.2)] select-none">
              🚀
            </div>
          </div>
        </div>
      )}
    </div>
  );
}