import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { CATEGORY_ICONS, CAT_LABELS } from '../utils/api';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faArrowLeft, faMapMarkerAlt, faTag, faShoppingCart,
  faCouch, faUniversity, faComments, faFolder
} from '@fortawesome/free-solid-svg-icons';

export default function ListingDetailPage() {
  const { selectedListing: listing, user, showToast } = useApp();
  const navigate = useNavigate();

  if (!listing) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4 text-gray-400">
        <div className="text-5xl">📋</div>
        <p>No listing selected</p>
        <button className="text-emerald-600 font-semibold hover:underline" onClick={() => navigate('/listings')}>Browse Listings</button>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-8 animate-fade-in">
      <button
        className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium text-gray-600 dark:text-gray-400 bg-gray-50 dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 border border-gray-200 dark:border-gray-700 transition mb-6"
        onClick={() => navigate('/listings')}
      >
        <FontAwesomeIcon icon={faArrowLeft} className="text-xs" />
        Back to Listings
      </button>

      {/* Hero image */}
      <div className="h-64 md:h-80 bg-gradient-to-br from-gray-100 to-gray-50 dark:from-gray-800 dark:to-gray-900 rounded-2xl flex items-center justify-center text-7xl border border-gray-200 dark:border-gray-700 mb-8 shadow-inner">
        {CATEGORY_ICONS[listing.category] || '🏪'}
      </div>

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-6">
        <div>
          <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide mb-3 ${
            listing.listing_type === 'sell'
              ? 'bg-red-50 dark:bg-red-950/30 text-red-500 border border-red-200 dark:border-red-800'
              : 'bg-emerald-50 dark:bg-emerald-950/30 text-emerald-600 border border-emerald-200 dark:border-emerald-800'
          }`}>
            <FontAwesomeIcon icon={listing.listing_type === 'sell' ? faTag : faShoppingCart} className="text-[10px]" />
            {listing.listing_type === 'sell' ? 'For Sale' : 'Wanted'}
          </span>
          <h1 className="text-2xl md:text-3xl font-black text-gray-900 dark:text-white">{listing.title}</h1>
          <p className="text-gray-400 mt-2 flex items-center gap-1.5 text-sm">
            <FontAwesomeIcon icon={faMapMarkerAlt} className="text-xs text-emerald-500" />
            {listing.city}, {listing.state}
          </p>
        </div>
        <div className="text-3xl md:text-4xl font-black bg-gradient-to-r from-emerald-600 to-green-500 bg-clip-text text-transparent shrink-0">
          ₹{Number(listing.price).toLocaleString('en-IN')}
        </div>
      </div>

      {/* Tags */}
      <div className="flex gap-2 flex-wrap mb-6">
        {listing.furniture_included && (
          <span className="text-xs px-3 py-1.5 rounded-lg bg-gray-50 dark:bg-gray-800 text-gray-600 dark:text-gray-400 border border-gray-200 dark:border-gray-700 flex items-center gap-1.5 font-medium">
            <FontAwesomeIcon icon={faCouch} className="text-amber-500 text-[10px]" /> Furniture Included
          </span>
        )}
        {listing.loan_eligible && (
          <span className="text-xs px-3 py-1.5 rounded-lg bg-gray-50 dark:bg-gray-800 text-gray-600 dark:text-gray-400 border border-gray-200 dark:border-gray-700 flex items-center gap-1.5 font-medium">
            <FontAwesomeIcon icon={faUniversity} className="text-blue-500 text-[10px]" /> Loan Eligible
          </span>
        )}
        <span className="text-xs px-3 py-1.5 rounded-lg bg-gray-50 dark:bg-gray-800 text-gray-600 dark:text-gray-400 border border-gray-200 dark:border-gray-700 flex items-center gap-1.5 font-medium">
          <FontAwesomeIcon icon={faFolder} className="text-violet-500 text-[10px]" /> {CAT_LABELS[listing.category] || listing.category}
        </span>
      </div>

      {/* Description */}
      <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-6 mb-6">
        <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-3">About this Business</h2>
        <p className="text-gray-500 dark:text-gray-400 leading-relaxed">{listing.description}</p>
      </div>

      {/* Actions */}
      <div className="flex gap-4 flex-wrap">
        <button
          className="bg-gradient-to-r from-emerald-600 to-green-500 hover:from-emerald-700 hover:to-green-600 text-white font-bold py-3.5 px-8 rounded-xl transition-all shadow-lg shadow-emerald-500/20 hover:shadow-emerald-500/30 hover:-translate-y-0.5 flex items-center gap-2"
          onClick={() => {
            if (!user) { showToast('Please sign in to contact seller.', 'error'); navigate('/login'); }
            else { showToast('Contact request sent!', 'success'); }
          }}
        >
          <FontAwesomeIcon icon={faComments} />
          Contact Seller
        </button>
        {listing.loan_eligible && (
          <button
            className="bg-white dark:bg-gray-900 border-2 border-blue-500 text-blue-600 dark:text-blue-400 font-bold py-3.5 px-8 rounded-xl transition-all hover:bg-blue-50 dark:hover:bg-blue-950/30 hover:-translate-y-0.5 flex items-center gap-2"
            onClick={() => navigate('/loans')}
          >
            <FontAwesomeIcon icon={faUniversity} />
            Apply for Loan
          </button>
        )}
      </div>
    </div>
  );
}
