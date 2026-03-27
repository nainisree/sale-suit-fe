import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { CATEGORY_ICONS, CAT_LABELS } from '../utils/api';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faSearch, faTag, faShoppingCart, faMapMarkerAlt,
  faCouch, faUniversity, faFilter
} from '@fortawesome/free-solid-svg-icons';

export default function ListingsPage() {
  const { filter, setFilter, setSelectedListing } = useApp();
  const navigate = useNavigate();

  const [listings] = useState([
    { id: 1, title: 'Established Tea Shop', category: 'tea_shop', listing_type: 'sell', price: '350000', city: 'Chennai', state: 'Tamil Nadu', furniture_included: true, loan_eligible: true, description: 'Running tea shop with 15 years of customer base.' },
    { id: 2, title: 'Modern Cafe Space', category: 'cafe', listing_type: 'sell', price: '1200000', city: 'Bangalore', state: 'Karnataka', furniture_included: true, loan_eligible: true, description: '800 sqft AC cafe in prime location.' },
    { id: 3, title: 'Medical Shop for Sale', category: 'medical_shop', listing_type: 'sell', price: '850000', city: 'Hyderabad', state: 'Telangana', furniture_included: false, loan_eligible: true, description: 'Drug license included, 10+ years established.' },
    { id: 4, title: 'Restaurant Business', category: 'restaurant', listing_type: 'sell', price: '2500000', city: 'Mumbai', state: 'Maharashtra', furniture_included: true, loan_eligible: false, description: '50-seat restaurant with full kitchen setup.' },
    { id: 5, title: 'Food Truck for Sale', category: 'food_truck', listing_type: 'sell', price: '450000', city: 'Pune', state: 'Maharashtra', furniture_included: true, loan_eligible: true, description: 'Custom built food truck with all permits.' },
    { id: 6, title: 'Supermarket Space', category: 'supermarket', listing_type: 'buy', price: '5000000', city: 'Delhi', state: 'Delhi', furniture_included: false, loan_eligible: true, description: 'Looking to buy a supermarket in North Delhi.' },
  ]);

  const [activeCategory, setActiveCategory] = useState(filter?.category || '');
  const [activeType, setActiveType] = useState(filter?.type || '');
  const [search, setSearch] = useState(filter?.search || '');

  const filtered = listings.filter(l => {
    if (activeCategory && l.category !== activeCategory) return false;
    if (activeType && l.listing_type !== activeType) return false;
    if (search && !l.title.toLowerCase().includes(search.toLowerCase()) && !l.city.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  const categories = ['', 'tea_shop', 'medical', 'continental_cafe', 'restaurant', 'supermarket', 'furniture', 'shop_equipments', 'interior_design'];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 animate-fade-in">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl md:text-4xl font-black text-gray-900 dark:text-white mb-2">
          <FontAwesomeIcon icon={faSearch} className="text-emerald-500 mr-3" />
          Browse Businesses
        </h1>
        <p className="text-gray-500 dark:text-gray-400">Find your next business opportunity</p>
      </div>

      {/* Search + Type filter */}
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <div className="flex items-center flex-1 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl px-4 py-2.5 shadow-sm focus-within:border-emerald-500 focus-within:ring-2 focus-within:ring-emerald-500/20 transition group">
          <FontAwesomeIcon icon={faSearch} className="text-gray-400 group-focus-within:text-emerald-500 transition mr-3" />
          <input
            className="flex-1 bg-transparent border-none outline-none text-gray-800 dark:text-gray-200 text-sm placeholder-gray-400"
            placeholder="Search listings, city..."
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
        </div>
        <div className="flex gap-2">
          {[['', 'All'], ['sell', 'For Sale'], ['buy', 'Wanted']].map(([val, label]) => (
            <button
              key={val}
              className={`px-4 py-2.5 rounded-xl text-sm font-semibold transition-all border ${
                activeType === val
                  ? 'border-emerald-500 bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400 shadow-sm'
                  : 'border-gray-200 dark:border-gray-700 text-gray-500 dark:text-gray-400 hover:border-emerald-300'
              }`}
              onClick={() => setActiveType(val)}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      {/* Category filter */}
      <div className="flex gap-2 flex-wrap mb-6">
        <FontAwesomeIcon icon={faFilter} className="text-gray-400 self-center mr-1" />
        {categories.map(c => (
          <button
            key={c}
            className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-all border ${
              activeCategory === c
                ? 'border-emerald-500 bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400 shadow-sm'
                : 'border-gray-200 dark:border-gray-700 text-gray-500 dark:text-gray-400 hover:border-emerald-300 hover:text-emerald-500'
            }`}
            onClick={() => setActiveCategory(c)}
          >
            {CAT_LABELS[c] || c}
          </button>
        ))}
      </div>

      {/* Count */}
      <p className="text-sm text-gray-400 mb-6">{filtered.length} listings found</p>

      {/* Listings grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {filtered.map(l => (
          <div
            key={l.id}
            className="group bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-2xl overflow-hidden cursor-pointer transition-all duration-300 hover:border-emerald-300 dark:hover:border-emerald-700 hover:-translate-y-1 hover:shadow-xl"
            onClick={() => { setSelectedListing(l); navigate(`/listing/${l.id}`); }}
          >
            {/* Image area */}
            <div className="h-44 bg-gradient-to-br from-gray-100 to-gray-50 dark:from-gray-800 dark:to-gray-850 flex items-center justify-center text-5xl border-b border-gray-100 dark:border-gray-800 group-hover:from-emerald-50 dark:group-hover:from-emerald-950/20 transition-all duration-300">
              {CATEGORY_ICONS[l.category] || '🏪'}
            </div>

            {/* Body */}
            <div className="p-5">
              <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-bold uppercase tracking-wide mb-3 ${
                l.listing_type === 'sell'
                  ? 'bg-red-50 dark:bg-red-950/30 text-red-500 border border-red-200 dark:border-red-800'
                  : 'bg-emerald-50 dark:bg-emerald-950/30 text-emerald-600 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800'
              }`}>
                <FontAwesomeIcon icon={l.listing_type === 'sell' ? faTag : faShoppingCart} className="text-[9px]" />
                {l.listing_type === 'sell' ? 'For Sale' : 'Wanted'}
              </span>

              <h3 className="text-base font-bold text-gray-900 dark:text-white mb-1.5 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">{l.title}</h3>

              <p className="text-sm text-gray-400 mb-3 flex items-center gap-1.5">
                <FontAwesomeIcon icon={faMapMarkerAlt} className="text-[10px]" />
                {l.city}, {l.state}
              </p>

              <p className="text-xl font-black bg-gradient-to-r from-emerald-600 to-green-500 bg-clip-text text-transparent mb-3">
                ₹{Number(l.price).toLocaleString('en-IN')}
              </p>

              <div className="flex gap-2 flex-wrap">
                {l.furniture_included && (
                  <span className="text-[11px] px-2.5 py-1 rounded-lg bg-gray-50 dark:bg-gray-800 text-gray-500 dark:text-gray-400 border border-gray-100 dark:border-gray-700 flex items-center gap-1">
                    <FontAwesomeIcon icon={faCouch} className="text-[9px]" /> Furniture
                  </span>
                )}
                {l.loan_eligible && (
                  <span className="text-[11px] px-2.5 py-1 rounded-lg bg-gray-50 dark:bg-gray-800 text-gray-500 dark:text-gray-400 border border-gray-100 dark:border-gray-700 flex items-center gap-1">
                    <FontAwesomeIcon icon={faUniversity} className="text-[9px]" /> Loan
                  </span>
                )}
                <span className="text-[11px] px-2.5 py-1 rounded-lg bg-gray-50 dark:bg-gray-800 text-gray-500 dark:text-gray-400 border border-gray-100 dark:border-gray-700">
                  {CAT_LABELS[l.category] || l.category}
                </span>
              </div>
            </div>
          </div>
        ))}

        {filtered.length === 0 && (
          <div className="col-span-full text-center py-20 text-gray-400">
            <div className="text-5xl mb-4">🔎</div>
            <div className="text-lg font-medium">No listings found</div>
            <p className="text-sm mt-1">Try adjusting your filters</p>
          </div>
        )}
      </div>
    </div>
  );
}
