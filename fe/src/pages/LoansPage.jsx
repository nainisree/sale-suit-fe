import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faUniversity, faLightbulb, faRupeeSign, faAlignLeft,
  faMoneyBillWave, faCreditCard, faSignInAlt,
  faCheckCircle, faClock, faPercentage, faUserCheck
} from '@fortawesome/free-solid-svg-icons';

export default function LoansPage() {
  const { user, showToast } = useApp();
  const navigate = useNavigate();
  const [form, setForm] = useState({ loan_amount_requested: '', loan_purpose: '', annual_income: '', existing_loans: 0 });
  const [loading, setLoading] = useState(false);

  if (!user) return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4 animate-fade-in">
      <div className="w-20 h-20 rounded-3xl bg-blue-50 dark:bg-blue-950/30 flex items-center justify-center text-blue-500 border border-blue-200 dark:border-blue-800">
        <FontAwesomeIcon icon={faUniversity} className="text-3xl" />
      </div>
      <h2 className="text-xl font-bold text-gray-900 dark:text-white">Sign in to Apply for Loans</h2>
      <button className="bg-gradient-to-r from-emerald-600 to-green-500 text-white font-semibold px-6 py-3 rounded-xl flex items-center gap-2 transition hover:-translate-y-0.5 shadow-lg" onClick={() => navigate('/login')}>
        <FontAwesomeIcon icon={faSignInAlt} /> Sign In
      </button>
    </div>
  );

  const inputClass = "w-full px-4 py-3 rounded-xl bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition text-gray-800 dark:text-gray-200 placeholder-gray-400";

  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 py-8 animate-fade-in">
      <h1 className="text-3xl font-black text-gray-900 dark:text-white mb-2 flex items-center gap-3">
        <FontAwesomeIcon icon={faUniversity} className="text-blue-500" />
        NBFC Loan Application
      </h1>
      <p className="text-gray-500 dark:text-gray-400 mb-8">Apply for business purchase loans with our trusted NBFC partners. Competitive interest rates.</p>

      {/* Features banner */}
      <div className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-950/20 dark:to-indigo-950/20 border border-blue-200 dark:border-blue-800/50 rounded-2xl p-6 mb-8">
        <div className="font-bold text-blue-700 dark:text-blue-400 mb-4 flex items-center gap-2">
          <FontAwesomeIcon icon={faLightbulb} className="text-amber-500" />
          Loan Features
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {[
            { icon: faRupeeSign, text: 'Loan amount up to ₹50 Lakhs', color: 'text-emerald-500' },
            { icon: faPercentage, text: 'Competitive interest rates', color: 'text-blue-500' },
            { icon: faClock, text: 'Flexible tenure 12-84 months', color: 'text-violet-500' },
            { icon: faUserCheck, text: 'Quick for KYC verified users', color: 'text-amber-500' },
          ].map(f => (
            <div key={f.text} className="flex items-center gap-3 text-sm text-gray-600 dark:text-gray-400">
              <div className={`w-8 h-8 rounded-lg bg-white dark:bg-gray-800 flex items-center justify-center ${f.color} shrink-0 shadow-sm`}>
                <FontAwesomeIcon icon={f.icon} className="text-xs" />
              </div>
              {f.text}
            </div>
          ))}
        </div>
      </div>

      {/* Form */}
      <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-6 md:p-8 shadow-sm">
        <div className="flex flex-col gap-5">
          <div>
            <label className="text-xs font-semibold text-gray-500 dark:text-gray-400 mb-1.5 flex items-center gap-1.5 block">
              <FontAwesomeIcon icon={faRupeeSign} className="text-blue-500" /> Loan Amount Required (₹)
            </label>
            <input className={inputClass} type="number" placeholder="500000" value={form.loan_amount_requested} onChange={e => setForm({ ...form, loan_amount_requested: e.target.value })} />
          </div>

          <div>
            <label className="text-xs font-semibold text-gray-500 dark:text-gray-400 mb-1.5 flex items-center gap-1.5 block">
              <FontAwesomeIcon icon={faAlignLeft} className="text-blue-500" /> Purpose of Loan
            </label>
            <textarea className={`${inputClass} resize-y`} rows={3} placeholder="Business purchase details..." value={form.loan_purpose} onChange={e => setForm({ ...form, loan_purpose: e.target.value })} />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-semibold text-gray-500 dark:text-gray-400 mb-1.5 flex items-center gap-1.5 block">
                <FontAwesomeIcon icon={faMoneyBillWave} className="text-blue-500" /> Annual Income (₹)
              </label>
              <input className={inputClass} type="number" value={form.annual_income} onChange={e => setForm({ ...form, annual_income: e.target.value })} />
            </div>
            <div>
              <label className="text-xs font-semibold text-gray-500 dark:text-gray-400 mb-1.5 flex items-center gap-1.5 block">
                <FontAwesomeIcon icon={faCreditCard} className="text-blue-500" /> Existing EMIs (₹/month)
              </label>
              <input className={inputClass} type="number" value={form.existing_loans} onChange={e => setForm({ ...form, existing_loans: e.target.value })} />
            </div>
          </div>

          <button
            className="w-full bg-gradient-to-r from-blue-600 to-indigo-500 hover:from-blue-700 hover:to-indigo-600 text-white font-bold py-4 rounded-xl transition-all shadow-lg shadow-blue-500/20 disabled:opacity-50 flex items-center justify-center gap-2 text-base"
            disabled={loading}
            onClick={() => showToast('Loan application submitted! Our team will contact you shortly.', 'success')}
          >
            <FontAwesomeIcon icon={faUniversity} />
            {loading ? 'Submitting...' : 'Submit Loan Application'}
          </button>
        </div>
      </div>
    </div>
  );
}
