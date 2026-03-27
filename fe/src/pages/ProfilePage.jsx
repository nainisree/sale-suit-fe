import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faUser, faIdCard, faLock, faFileAlt, faSave,
  faUpload, faKey, faBullhorn, faCheckCircle,
  faClock, faTimesCircle, faSignInAlt, faCamera
} from '@fortawesome/free-solid-svg-icons';

export default function ProfilePage() {
  const { user, setUser, showToast } = useApp();
  const navigate = useNavigate();
  const [tab, setTab] = useState('profile');
  const [form, setForm] = useState({
    full_name: user?.full_name || '', address: user?.address || '',
    city: user?.city || '', state: user?.state || '', pincode: user?.pincode || ''
  });
  const [pwForm, setPwForm] = useState({ old_password: '', new_password: '', new_password2: '' });

  if (!user) return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4 animate-fade-in">
      <button className="bg-gradient-to-r from-emerald-600 to-green-500 text-white font-semibold px-6 py-3 rounded-xl flex items-center gap-2 transition hover:-translate-y-0.5 shadow-lg" onClick={() => navigate('/login')}>
        <FontAwesomeIcon icon={faSignInAlt} /> Please Sign In
      </button>
    </div>
  );

  const roleLabels = { end_user: 'Customer', admin: 'Admin', internal: 'Internal', field_person: 'Field Person', mediator: 'Mediator', customer_care: 'Customer Care' };
  const inputClass = "w-full px-4 py-3 rounded-xl bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-sm outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 transition text-gray-800 dark:text-gray-200";

  const tabs = [
    { key: 'profile', label: 'Profile', icon: faUser },
    { key: 'kyc', label: 'KYC Docs', icon: faIdCard },
    { key: 'security', label: 'Security', icon: faLock },
    { key: 'my-listings', label: 'My Listings', icon: faFileAlt },
  ];

  const statusIcon = user.verification_status === 'verified' ? faCheckCircle
    : user.verification_status === 'pending' ? faClock : faTimesCircle;
  const statusColor = user.verification_status === 'verified' ? 'text-emerald-500'
    : user.verification_status === 'pending' ? 'text-amber-500' : 'text-red-400';

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-8 animate-fade-in">
      {/* Profile header */}
      <div className="flex items-center gap-5 mb-8">
        <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-emerald-400 to-green-600 flex items-center justify-center text-white text-3xl font-bold border-2 border-emerald-300/50 shadow-lg shadow-emerald-500/20">
          {user.full_name?.charAt(0)?.toUpperCase() || 'U'}
        </div>
        <div>
          <h2 className="text-2xl font-black text-gray-900 dark:text-white">{user.full_name}</h2>
          <p className="text-sm text-gray-400 mt-0.5">{user.phone_number}</p>
          <div className="flex items-center gap-3 mt-2">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800">
              {roleLabels[user.role] || user.role}
            </span>
            <span className={`inline-flex items-center gap-1.5 text-xs font-medium ${statusColor}`}>
              <FontAwesomeIcon icon={statusIcon} className="text-[10px]" />
              KYC: {user.verification_status || 'Not Submitted'}
            </span>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-gray-200 dark:border-gray-700 mb-6 overflow-x-auto">
        {tabs.map(t => (
          <button
            key={t.key}
            className={`px-4 py-3 text-sm font-semibold transition-all border-b-2 flex items-center gap-2 whitespace-nowrap ${
              tab === t.key ? 'border-emerald-500 text-emerald-600 dark:text-emerald-400' : 'border-transparent text-gray-400 hover:text-gray-600'
            }`}
            onClick={() => setTab(t.key)}
          >
            <FontAwesomeIcon icon={t.icon} className="text-xs" /> {t.label}
          </button>
        ))}
      </div>

      {/* Profile tab */}
      {tab === 'profile' && (
        <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-6 shadow-sm">
          <div className="flex flex-col gap-4">
            <div>
              <label className="text-xs font-semibold text-gray-500 dark:text-gray-400 mb-1.5 block">Full Name</label>
              <input className={inputClass} value={form.full_name} onChange={e => setForm({ ...form, full_name: e.target.value })} />
            </div>
            <div>
              <label className="text-xs font-semibold text-gray-500 dark:text-gray-400 mb-1.5 block">Address</label>
              <textarea className={`${inputClass} resize-y`} rows={2} value={form.address} onChange={e => setForm({ ...form, address: e.target.value })} />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-semibold text-gray-500 dark:text-gray-400 mb-1.5 block">City</label>
                <input className={inputClass} value={form.city} onChange={e => setForm({ ...form, city: e.target.value })} />
              </div>
              <div>
                <label className="text-xs font-semibold text-gray-500 dark:text-gray-400 mb-1.5 block">State</label>
                <input className={inputClass} value={form.state} onChange={e => setForm({ ...form, state: e.target.value })} />
              </div>
            </div>
            <div>
              <label className="text-xs font-semibold text-gray-500 dark:text-gray-400 mb-1.5 block">Pincode</label>
              <input className={inputClass} value={form.pincode} onChange={e => setForm({ ...form, pincode: e.target.value })} />
            </div>
            <button className="bg-gradient-to-r from-emerald-600 to-green-500 text-white font-semibold py-3 rounded-xl flex items-center justify-center gap-2 transition hover:shadow-lg" onClick={() => showToast('Profile updated!', 'success')}>
              <FontAwesomeIcon icon={faSave} /> Save Changes
            </button>
          </div>
        </div>
      )}

      {/* KYC tab */}
      {tab === 'kyc' && (
        <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-6 shadow-sm">
          <div className="bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800/50 rounded-xl p-4 text-amber-700 dark:text-amber-400 text-sm mb-6 flex items-start gap-3">
            <FontAwesomeIcon icon={faIdCard} className="mt-0.5" />
            <span>Upload clear photos/scans of your documents. All documents are reviewed by our admin team.</span>
          </div>
          <div className="flex flex-col gap-4">
            {[['pan_card', 'PAN Card', faIdCard], ['aadhar_card', 'Aadhar Card', faIdCard], ['food_license', 'Food License', faFileAlt], ['drug_license', 'Drug License', faFileAlt], ['profile_photo', 'Profile Photo', faCamera]].map(([key, label, icon]) => (
              <div key={key}>
                <label className="text-xs font-semibold text-gray-500 dark:text-gray-400 mb-1.5 flex items-center gap-1.5 block">
                  <FontAwesomeIcon icon={icon} className="text-emerald-500" /> {label}
                </label>
                <input className={inputClass} type="file" accept="image/*,.pdf" />
              </div>
            ))}
            <button className="bg-gradient-to-r from-emerald-600 to-green-500 text-white font-semibold py-3 rounded-xl flex items-center justify-center gap-2 transition hover:shadow-lg" onClick={() => showToast('KYC documents uploaded! Pending admin review.', 'success')}>
              <FontAwesomeIcon icon={faUpload} /> Upload Documents
            </button>
          </div>
        </div>
      )}

      {/* Security tab */}
      {tab === 'security' && (
        <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-6 shadow-sm">
          <div className="flex flex-col gap-4">
            <div>
              <label className="text-xs font-semibold text-gray-500 dark:text-gray-400 mb-1.5 block">Current Password</label>
              <input className={inputClass} type="password" value={pwForm.old_password} onChange={e => setPwForm({ ...pwForm, old_password: e.target.value })} />
            </div>
            <div>
              <label className="text-xs font-semibold text-gray-500 dark:text-gray-400 mb-1.5 block">New Password</label>
              <input className={inputClass} type="password" value={pwForm.new_password} onChange={e => setPwForm({ ...pwForm, new_password: e.target.value })} />
            </div>
            <div>
              <label className="text-xs font-semibold text-gray-500 dark:text-gray-400 mb-1.5 block">Confirm New Password</label>
              <input className={inputClass} type="password" value={pwForm.new_password2} onChange={e => setPwForm({ ...pwForm, new_password2: e.target.value })} />
            </div>
            <button className="bg-gradient-to-r from-emerald-600 to-green-500 text-white font-semibold py-3 rounded-xl flex items-center justify-center gap-2 transition hover:shadow-lg" onClick={() => showToast('Password changed successfully!', 'success')}>
              <FontAwesomeIcon icon={faKey} /> Change Password
            </button>
          </div>
        </div>
      )}

      {/* My Listings tab */}
      {tab === 'my-listings' && (
        <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-6 shadow-sm text-center py-16">
          <div className="w-16 h-16 rounded-2xl bg-gray-50 dark:bg-gray-800 flex items-center justify-center mx-auto mb-4">
            <FontAwesomeIcon icon={faFileAlt} className="text-2xl text-gray-300 dark:text-gray-600" />
          </div>
          <p className="text-gray-400 mb-4">You haven't posted any listings yet.</p>
          <button className="bg-gradient-to-r from-emerald-600 to-green-500 text-white font-semibold px-6 py-3 rounded-xl flex items-center gap-2 justify-center mx-auto transition hover:shadow-lg" onClick={() => navigate('/sell')}>
            <FontAwesomeIcon icon={faBullhorn} /> Post a Listing
          </button>
        </div>
      )}
    </div>
  );
}
