import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faSearch, faShoppingBag, faBullhorn, faShieldAlt,
  faUniversity, faStore, faHandshake, faBolt,
  faRocket, faArrowRight, faMedkit, faTimes
} from '@fortawesome/free-solid-svg-icons';

export default function HomePage() {
  const { setFilter, user } = useApp();
  const navigate = useNavigate();
  const [showMedicalModal, setShowMedicalModal] = useState(false);
  const [search, setSearch] = useState('');

  const categories = [
    { key: 'tea_shop', label: 'Tea Shop', icon: '🍵', color: '#10b981', bg: 'bg-emerald-50 dark:bg-emerald-950/20' },
    { key: 'medical', label: 'Medical', icon: '💊', color: '#3b82f6', bg: 'bg-blue-50 dark:bg-blue-950/20' },
    { key: 'continental_cafe', label: 'Continental Cafe', icon: '☕', color: '#f59e0b', bg: 'bg-amber-50 dark:bg-amber-950/20' },
    { key: 'restaurant', label: 'Restaurant', icon: '🍽️', color: '#ef4444', bg: 'bg-red-50 dark:bg-red-950/20' },
    { key: 'supermarket', label: 'Supermarkets', icon: '🛒', color: '#8b5cf6', bg: 'bg-violet-50 dark:bg-violet-950/20' },
    { key: 'furniture', label: 'Furniture', icon: '🪑', color: '#f97316', bg: 'bg-orange-50 dark:bg-orange-950/20' },
    { key: 'shop_equipments', label: 'Equipments', icon: '🛠️', color: '#64748b', bg: 'bg-slate-50 dark:bg-slate-950/20' },
    { key: 'interior_design', label: 'Interior', icon: '🎨', color: '#ec4899', bg: 'bg-pink-50 dark:bg-pink-950/20' },
  ];

  const mockAds = [
    { id: 1, title: 'NBFC Loans', icon: faUniversity, sub: 'Up to ₹50 Lakh instantly' },
    { id: 2, title: 'Verified Listings', icon: faShieldAlt, sub: '100% KYC verified' },
    { id: 3, title: 'Mediator Support', icon: faHandshake, sub: 'Certified experts near you' },
    { id: 4, title: 'Fast Closure', icon: faBolt, sub: 'Close deals in 7 days' },
  ];

  return (
    <div className="animate-fade-in">
      {/* ===== HERO SECTION ===== */}
      <div className="relative pt-20 pb-16 md:pt-28 md:pb-24 px-5 text-center overflow-hidden">
        {/* Background gradient blobs */}
        <div className="absolute top-[-15%] left-[-10%] w-[500px] h-[500px] bg-emerald-400 rounded-full mix-blend-multiply filter blur-[120px] opacity-15 pointer-events-none"></div>
        <div className="absolute bottom-[-15%] right-[-10%] w-[400px] h-[400px] bg-blue-400 rounded-full mix-blend-multiply filter blur-[120px] opacity-15 pointer-events-none"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-green-300 rounded-full filter blur-[100px] opacity-10 pointer-events-none"></div>

        <div className="relative z-10 max-w-4xl mx-auto flex flex-col items-center">
          {/* Badge */}
          <div className="bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800 px-5 py-2 rounded-full text-sm font-bold mb-6 animate-bounce-slow shadow-sm">
            ✨ India's #1 Business Marketplace
          </div>

          <h1 className="text-4xl md:text-6xl lg:text-7xl font-black leading-tight mb-6 text-gray-900 dark:text-white">
            The Smart Way to <br/>
            <span className="bg-clip-text text-transparent bg-gradient-to-br from-emerald-600 via-green-500 to-teal-400">
              Buy & Sell Businesses
            </span>
          </h1>

          <p className="text-lg md:text-xl text-gray-500 dark:text-gray-400 mb-10 max-w-2xl leading-relaxed">
            Join thousands of entrepreneurs discovering tea shops, cafes, medical stores, and more across India.
          </p>

          {/* Search Bar */}
          <div className="flex items-center bg-white/90 dark:bg-gray-900/90 backdrop-blur-xl border border-gray-200 dark:border-gray-700 p-2 pl-5 rounded-full w-full max-w-2xl shadow-[0_20px_60px_rgba(0,0,0,0.06)] dark:shadow-[0_20px_60px_rgba(0,0,0,0.3)] transition-all duration-300 hover:shadow-[0_25px_60px_rgba(16,185,129,0.12)] focus-within:border-emerald-500 focus-within:-translate-y-0.5 mb-10 group">
            <FontAwesomeIcon icon={faSearch} className="text-gray-400 group-focus-within:text-emerald-500 transition" />
            <input
              className="flex-1 bg-transparent border-none outline-none text-gray-800 dark:text-gray-200 text-base ml-3 placeholder-gray-400 w-full"
              placeholder="Search by business type, city, or state..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              onKeyDown={e => { if (e.key === 'Enter') { setFilter({ search }); navigate('/listings'); } }}
            />
            <button
              className="bg-gradient-to-r from-emerald-600 to-green-500 hover:from-emerald-700 hover:to-green-600 text-white font-semibold py-3 px-7 rounded-full transition-all shadow-md hover:shadow-lg flex items-center gap-2 text-sm"
              onClick={() => { setFilter({ search }); navigate('/listings'); }}
            >
              <FontAwesomeIcon icon={faSearch} className="text-xs" />
              Search
            </button>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 mb-12">
            <button
              className="bg-gradient-to-r from-emerald-600 to-green-500 hover:from-emerald-700 hover:to-green-600 text-white font-bold px-8 py-4 rounded-2xl transition-all shadow-xl shadow-emerald-500/20 hover:shadow-emerald-500/30 hover:-translate-y-1 flex items-center gap-3 text-base"
              onClick={() => navigate('/listings')}
            >
              <FontAwesomeIcon icon={faShoppingBag} />
              Browse Businesses
            </button>
            <button
              className="bg-white dark:bg-gray-900 border-2 border-emerald-500 text-emerald-600 dark:text-emerald-400 font-bold px-8 py-4 rounded-2xl transition-all hover:bg-emerald-50 dark:hover:bg-emerald-950/30 hover:-translate-y-1 flex items-center gap-3 text-base shadow-lg"
              onClick={() => navigate('/sell')}
            >
              <FontAwesomeIcon icon={faBullhorn} />
              Post Business
            </button>
          </div>

          {/* Stats */}
          <div className="flex flex-col md:flex-row items-center justify-center gap-6 md:gap-10 text-gray-600 dark:text-gray-400">
            <div className="flex flex-col items-center">
              <strong className="text-3xl font-black text-gray-900 dark:text-white">10k+</strong>
              <span className="text-sm text-gray-500 dark:text-gray-400">Active Listings</span>
            </div>
            <div className="hidden md:block w-px h-12 bg-gray-200 dark:bg-gray-700"></div>
            <div className="flex flex-col items-center">
              <strong className="text-3xl font-black text-gray-900 dark:text-white">₹500Cr+</strong>
              <span className="text-sm text-gray-500 dark:text-gray-400">Deals Closed</span>
            </div>
            <div className="hidden md:block w-px h-12 bg-gray-200 dark:bg-gray-700"></div>
            <div className="flex flex-col items-center">
              <strong className="text-3xl font-black text-gray-900 dark:text-white">100%</strong>
              <span className="text-sm text-gray-500 dark:text-gray-400">Verified Users</span>
            </div>
          </div>
        </div>
      </div>

      {/* ===== TRUST TICKER ===== */}
      <div className="w-full overflow-hidden bg-white dark:bg-gray-950 border-y border-gray-100 dark:border-gray-800 py-4">
        <style>{`@keyframes scrollTicker{0%{transform:translateX(0)}100%{transform:translateX(-50%)}}.animate-ticker{animation:scrollTicker 25s linear infinite}`}</style>
        <div className="flex w-[calc(300px*8)] animate-ticker">
          {[...mockAds, ...mockAds].map((ad, i) => (
            <div key={`${ad.id}-${i}`} className="flex items-center gap-3 w-[300px] shrink-0 text-sm px-4">
              <div className="w-10 h-10 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 flex items-center justify-center text-emerald-600 dark:text-emerald-400">
                <FontAwesomeIcon icon={ad.icon} />
              </div>
              <div>
                <strong className="text-gray-900 dark:text-gray-100 block text-sm">{ad.title}</strong>
                <span className="text-gray-500 dark:text-gray-400 text-xs">{ad.sub}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ===== CATEGORIES ===== */}
      <div className="py-16 md:py-20 px-6 max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-black mb-3 text-gray-900 dark:text-white">
            Explore by <span className="bg-clip-text text-transparent bg-gradient-to-r from-emerald-600 to-green-400">Category</span>
          </h2>
          <p className="text-gray-500 dark:text-gray-400">Find the perfect industry for your next venture</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {categories.map(c => (
            <div
              key={c.key}
              className="group bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-2xl p-5 flex items-center gap-4 cursor-pointer transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:border-emerald-300 dark:hover:border-emerald-700"
              onClick={() => {
                if (c.key === 'medical') setShowMedicalModal(true);
                else { setFilter({ category: c.key }); navigate('/listings'); }
              }}
            >
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-2xl ${c.bg} shrink-0`}>
                {c.icon}
              </div>
              <h3 className="text-base font-bold text-gray-800 dark:text-gray-200 flex-1">{c.label}</h3>
              <FontAwesomeIcon
                icon={faArrowRight}
                className="text-xs text-gray-300 dark:text-gray-600 opacity-0 -translate-x-2 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-0 group-hover:text-emerald-500"
              />
            </div>
          ))}
        </div>
      </div>

      {/* ===== MEDICAL MODAL ===== */}
      {showMedicalModal && (
        <div className="fixed inset-0 z-[1000] flex items-center justify-center px-4">
          <div className="absolute inset-0 bg-gray-900/40 backdrop-blur-sm" onClick={() => setShowMedicalModal(false)}></div>
          <div className="relative bg-white dark:bg-gray-900 rounded-3xl p-8 max-w-sm w-full shadow-2xl text-center z-10 border border-gray-100 dark:border-gray-800 animate-fade-in">
            <button className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition" onClick={() => setShowMedicalModal(false)}>
              <FontAwesomeIcon icon={faTimes} />
            </button>
            <div className="w-16 h-16 rounded-2xl flex items-center justify-center text-3xl mx-auto mb-4 bg-blue-50 dark:bg-blue-950/30 text-blue-500">
              <FontAwesomeIcon icon={faMedkit} />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Select Medical Type</h2>
            <p className="text-gray-500 dark:text-gray-400 text-sm mb-6">Choose the specific medical business category.</p>
            <div className="flex flex-col gap-3">
              <button
                className="w-full py-3.5 px-4 rounded-xl border-2 border-gray-100 dark:border-gray-700 hover:border-blue-500 hover:bg-blue-50 dark:hover:bg-blue-950/30 text-gray-700 dark:text-gray-200 font-semibold transition-colors flex items-center justify-center gap-2"
                onClick={() => { setFilter({ category: 'medical', sub_category: 'retailer' }); navigate('/listings'); }}
              >
                <FontAwesomeIcon icon={faStore} className="text-blue-500" /> Retail Pharmacy
              </button>
              <button
                className="w-full py-3.5 px-4 rounded-xl border-2 border-gray-100 dark:border-gray-700 hover:border-blue-500 hover:bg-blue-50 dark:hover:bg-blue-950/30 text-gray-700 dark:text-gray-200 font-semibold transition-colors flex items-center justify-center gap-2"
                onClick={() => { setFilter({ category: 'medical', sub_category: 'distributor' }); navigate('/listings'); }}
              >
                <FontAwesomeIcon icon={faUniversity} className="text-blue-500" /> Wholesale Distributor
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ===== WHY US ===== */}
      <div className="py-16 md:py-20 px-6 bg-gray-50 dark:bg-gray-950/50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-black mb-3 text-gray-900 dark:text-white">
              Why Choose <span className="bg-clip-text text-transparent bg-gradient-to-r from-emerald-600 to-green-400">Sale Suit</span>?
            </h2>
            <p className="text-gray-500 dark:text-gray-400">We make business transitions seamless and secure</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: faShieldAlt, title: 'KYC Verified Users', desc: 'Every user is rigorously verified with Aadhar, PAN & valid business licenses.', color: 'text-emerald-500', bg: 'bg-emerald-50 dark:bg-emerald-950/30' },
              { icon: faUniversity, title: 'NBFC Loan Support', desc: 'Need capital? Apply for business purchase loans directly through our platform.', color: 'text-blue-500', bg: 'bg-blue-50 dark:bg-blue-950/30' },
              { icon: faHandshake, title: 'Mediator Network', desc: 'Get access to certified mediators to assist with negotiations and deal closures.', color: 'text-violet-500', bg: 'bg-violet-50 dark:bg-violet-950/30' },
              { icon: faBolt, title: 'End-to-End Support', desc: 'From listing discovery to final paperwork, our customer care team is here.', color: 'text-amber-500', bg: 'bg-amber-50 dark:bg-amber-950/30' },
            ].map(f => (
              <div key={f.title} className="bg-white dark:bg-gray-900 p-7 rounded-3xl border border-gray-100 dark:border-gray-800 shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1 group">
                <div className={`w-14 h-14 rounded-2xl ${f.bg} flex items-center justify-center mb-5 ${f.color} group-hover:scale-110 transition-transform`}>
                  <FontAwesomeIcon icon={f.icon} className="text-lg" />
                </div>
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-3">{f.title}</h3>
                <p className="text-gray-500 dark:text-gray-400 leading-relaxed text-sm">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ===== CTA SECTION ===== */}
      {!user && (
        <div className="py-16 md:py-20 px-6">
          <div className="bg-gradient-to-br from-gray-900 via-emerald-950 to-gray-900 rounded-[2rem] md:rounded-[2.5rem] p-10 md:p-16 max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between relative overflow-hidden text-white shadow-2xl">
            <div className="absolute top-0 left-0 right-0 bottom-0 bg-[radial-gradient(circle_at_30%_50%,_rgba(16,185,129,0.15),_transparent_50%)]"></div>
            <div className="relative z-10 max-w-lg text-center md:text-left">
              <h2 className="text-3xl md:text-4xl font-black mb-4">Ready to start your journey?</h2>
              <p className="text-emerald-100/70 mb-8 text-lg leading-relaxed">Join thousands of business owners and buyers on India's most secure platform today.</p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
                <button
                  className="bg-emerald-500 hover:bg-emerald-400 text-gray-900 font-bold py-4 px-8 rounded-full transition-all shadow-[0_0_30px_rgba(16,185,129,0.3)] hover:shadow-[0_0_40px_rgba(16,185,129,0.5)] hover:-translate-y-0.5 flex items-center gap-2 justify-center"
                  onClick={() => navigate('/login')}
                >
                  <FontAwesomeIcon icon={faRocket} />
                  Create Free Account
                </button>
                <button
                  className="bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/20 text-white font-semibold py-4 px-8 rounded-full transition-all hover:-translate-y-0.5 flex items-center gap-2 justify-center"
                  onClick={() => navigate('/listings')}
                >
                  <FontAwesomeIcon icon={faShoppingBag} />
                  Browse Listings
                </button>
              </div>
            </div>
            {/* Decoration */}
            <div className="hidden md:block text-[10rem] absolute right-0 bottom-[-30px] opacity-10 select-none">
              🚀
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
