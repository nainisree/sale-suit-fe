import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { api } from '../utils/api';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faLock, faClipboardCheck, faBullhorn, faCheckSquare,
  faCouch, faUniversity, faMapMarkerAlt, faCity,
  faMapPin, faRupeeSign, faTag, faList, faAlignLeft,
  faSignInAlt
} from '@fortawesome/free-solid-svg-icons';

export default function SellPage() {
  const { user, showToast } = useApp();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    title: '', description: '', category: 'tea_shop', listing_type: 'sell',
    price: '', address: '', city: '', state: '', pincode: '',
    furniture_included: false, loan_eligible: false,
  });
  const [loading, setLoading] = useState(false);

  if (!user) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4 animate-fade-in">
        <div className="w-20 h-20 rounded-3xl bg-gray-50 dark:bg-gray-800 flex items-center justify-center text-gray-400 border border-gray-200 dark:border-gray-700">
          <FontAwesomeIcon icon={faLock} className="text-3xl" />
        </div>
        <h2 className="text-xl font-bold text-gray-900 dark:text-white">Sign in to Post a Listing</h2>
        <button className="bg-gradient-to-r from-emerald-600 to-green-500 text-white font-semibold px-6 py-3 rounded-xl flex items-center gap-2 transition hover:-translate-y-0.5 shadow-lg" onClick={() => navigate('/login')}>
          <FontAwesomeIcon icon={faSignInAlt} /> Sign In / Register
        </button>
      </div>
    );
  }

  if (!user.is_verified) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4 px-6 animate-fade-in">
        <div className="w-20 h-20 rounded-3xl bg-amber-50 dark:bg-amber-950/30 flex items-center justify-center text-amber-500 border border-amber-200 dark:border-amber-800">
          <FontAwesomeIcon icon={faClipboardCheck} className="text-3xl" />
        </div>
        <h2 className="text-xl font-bold text-gray-900 dark:text-white text-center">KYC Verification Required</h2>
        <p className="text-gray-500 text-sm text-center max-w-md">You need to complete KYC verification before posting listings. Please upload your documents in Profile.</p>
        <button className="bg-gradient-to-r from-emerald-600 to-green-500 text-white font-semibold px-6 py-3 rounded-xl flex items-center gap-2 transition hover:-translate-y-0.5 shadow-lg" onClick={() => navigate('/profile')}>
          Go to Profile & Upload KYC
        </button>
      </div>
    );
  }

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const fd = new FormData();
      Object.entries(form).forEach(([k, v]) => fd.append(k, v));
      await api('/listings/create/', 'POST', fd, true);
      showToast('Listing submitted for admin approval!', 'success');
      navigate('/listings');
    } catch (e) {
      showToast(Object.values(e || {}).flat().join(' ') || 'Failed to post listing.', 'error');
    } finally { setLoading(false); }
  };

  const inputClass = "w-full px-4 py-3 rounded-xl bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-sm outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 transition text-gray-800 dark:text-gray-200 placeholder-gray-400";

  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 py-8 animate-fade-in">
      <h1 className="text-3xl font-black text-gray-900 dark:text-white mb-2 flex items-center gap-3">
        <FontAwesomeIcon icon={faBullhorn} className="text-emerald-500" />
        Post Your Business
      </h1>
      <p className="text-gray-500 dark:text-gray-400 mb-8">Fill in the details below. Your listing will be reviewed by our team before going live.</p>

      <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-6 md:p-8 shadow-sm">
        <div className="flex flex-col gap-5">
          {/* Category + Type */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-semibold text-gray-500 dark:text-gray-400 mb-1.5 flex items-center gap-1.5 block">
                <FontAwesomeIcon icon={faList} className="text-emerald-500" /> Category *
              </label>
              <select className={inputClass} value={form.category} onChange={e => setForm({ ...form, category: e.target.value })}>
                <option value="tea_shop">Tea Shop</option>
                <option value="medical">Medical</option>
                <option value="continental_cafe">Continental Cafe</option>
                <option value="restaurant">Restaurant</option>
                <option value="supermarket">Supermarket</option>
                <option value="furniture">Furniture</option>
                <option value="shop_equipments">Shop Equipments</option>
                <option value="interior_design">Interior Design</option>
                <option value="other">Other</option>
              </select>
            </div>
            <div>
              <label className="text-xs font-semibold text-gray-500 dark:text-gray-400 mb-1.5 flex items-center gap-1.5 block">
                <FontAwesomeIcon icon={faTag} className="text-emerald-500" /> Listing Type *
              </label>
              <select className={inputClass} value={form.listing_type} onChange={e => setForm({ ...form, listing_type: e.target.value })}>
                <option value="sell">I want to Sell</option>
                <option value="buy">I want to Buy</option>
              </select>
            </div>
          </div>

          {/* Title */}
          <div>
            <label className="text-xs font-semibold text-gray-500 dark:text-gray-400 mb-1.5 block">Business Title *</label>
            <input className={inputClass} placeholder="e.g. Well-established Tea Shop in Anna Nagar" value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} />
          </div>

          {/* Description */}
          <div>
            <label className="text-xs font-semibold text-gray-500 dark:text-gray-400 mb-1.5 flex items-center gap-1.5 block">
              <FontAwesomeIcon icon={faAlignLeft} className="text-emerald-500" /> Description *
            </label>
            <textarea className={`${inputClass} resize-y`} rows={4} placeholder="Describe the business, its history, customer base, included assets..." value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} />
          </div>

          {/* Price */}
          <div>
            <label className="text-xs font-semibold text-gray-500 dark:text-gray-400 mb-1.5 flex items-center gap-1.5 block">
              <FontAwesomeIcon icon={faRupeeSign} className="text-emerald-500" /> Asking Price (₹) *
            </label>
            <input className={inputClass} type="number" placeholder="350000" value={form.price} onChange={e => setForm({ ...form, price: e.target.value })} />
          </div>

          {/* Address */}
          <div>
            <label className="text-xs font-semibold text-gray-500 dark:text-gray-400 mb-1.5 flex items-center gap-1.5 block">
              <FontAwesomeIcon icon={faMapMarkerAlt} className="text-emerald-500" /> Address *
            </label>
            <input className={inputClass} placeholder="Full street address" value={form.address} onChange={e => setForm({ ...form, address: e.target.value })} />
          </div>

          {/* City + State */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-semibold text-gray-500 dark:text-gray-400 mb-1.5 flex items-center gap-1.5 block">
                <FontAwesomeIcon icon={faCity} className="text-emerald-500" /> City *
              </label>
              <input className={inputClass} placeholder="City" value={form.city} onChange={e => setForm({ ...form, city: e.target.value })} />
            </div>
            <div>
              <label className="text-xs font-semibold text-gray-500 dark:text-gray-400 mb-1.5 block">State *</label>
              <input className={inputClass} placeholder="State" value={form.state} onChange={e => setForm({ ...form, state: e.target.value })} />
            </div>
          </div>

          {/* Pincode */}
          <div>
            <label className="text-xs font-semibold text-gray-500 dark:text-gray-400 mb-1.5 flex items-center gap-1.5 block">
              <FontAwesomeIcon icon={faMapPin} className="text-emerald-500" /> Pincode *
            </label>
            <input className={inputClass} placeholder="600001" value={form.pincode} onChange={e => setForm({ ...form, pincode: e.target.value })} />
          </div>

          {/* Checkboxes */}
          <div className="flex gap-6">
            <label className="flex items-center gap-2.5 cursor-pointer text-sm text-gray-700 dark:text-gray-300 select-none">
              <input type="checkbox" className="w-4 h-4 rounded accent-emerald-500" checked={form.furniture_included} onChange={e => setForm({ ...form, furniture_included: e.target.checked })} />
              <FontAwesomeIcon icon={faCouch} className="text-amber-500 text-xs" /> Furniture Included
            </label>
            <label className="flex items-center gap-2.5 cursor-pointer text-sm text-gray-700 dark:text-gray-300 select-none">
              <input type="checkbox" className="w-4 h-4 rounded accent-emerald-500" checked={form.loan_eligible} onChange={e => setForm({ ...form, loan_eligible: e.target.checked })} />
              <FontAwesomeIcon icon={faUniversity} className="text-blue-500 text-xs" /> Loan Eligible
            </label>
          </div>

          {/* Submit */}
          <button
            className="w-full bg-gradient-to-r from-emerald-600 to-green-500 hover:from-emerald-700 hover:to-green-600 text-white font-bold py-4 rounded-xl transition-all shadow-lg shadow-emerald-500/20 disabled:opacity-50 flex items-center justify-center gap-2 text-base"
            onClick={handleSubmit}
            disabled={loading}
          >
            <FontAwesomeIcon icon={faBullhorn} />
            {loading ? 'Submitting...' : 'Submit Listing for Review'}
          </button>
        </div>
      </div>
    </div>
  );
}
