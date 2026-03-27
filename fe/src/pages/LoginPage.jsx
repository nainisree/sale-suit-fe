import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { api } from '../utils/api';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faSignInAlt, faUserPlus, faEye, faEyeSlash, faPhone,
  faEnvelope, faLock, faUser, faArrowLeft, faPaperPlane
} from '@fortawesome/free-solid-svg-icons';

export default function LoginPage() {
  const { handleLogin, showToast } = useApp();
  const navigate = useNavigate();
  const [tab, setTab] = useState('login');
  const [role, setRole] = useState('end_user');
  const [form, setForm] = useState({ identifier: '', password: '', phone_number: '', full_name: '', email: '', password2: '' });
  const [loading, setLoading] = useState(false);
  const [forgotMode, setForgotMode] = useState(false);
  const [showPw, setShowPw] = useState(false);

  const roles = [
    { key: 'end_user', label: 'Customer' },
    { key: 'mediator', label: 'Mediator' },
    { key: 'field_person', label: 'Field Person' },
    { key: 'customer_care', label: 'Customer Care' },
  ];

  const doLogin = async () => {
    setLoading(true);
    try {
      const res = await api('/auth/login/', 'POST', { identifier: form.identifier, password: form.password, role });
      handleLogin(res.user);
      showToast(`Welcome back, ${res.user.full_name}!`, 'success');
      navigate('/');
    } catch (e) {
      showToast(Object.values(e || {}).flat().join(' ') || 'Login failed.', 'error');
    } finally { setLoading(false); }
  };

  const doRegister = async () => {
    setLoading(true);
    try {
      await api('/auth/register/', 'POST', { phone_number: form.phone_number, full_name: form.full_name, email: form.email || undefined, password: form.password, password2: form.password2, role });
      showToast('Account created! Please complete KYC to start using Sale Suit.', 'success');
      setTab('login');
    } catch (e) {
      showToast(Object.values(e || {}).flat().join(' ') || 'Registration failed.', 'error');
    } finally { setLoading(false); }
  };

  const doForgot = async () => {
    setLoading(true);
    try {
      const res = await api('/auth/forgot-password/', 'POST', { phone_number: form.identifier });
      showToast(res.message, 'success');
    } catch (e) { showToast('Phone number not found.', 'error'); }
    finally { setLoading(false); }
  };

  const inputClass = "w-full px-4 py-3 rounded-xl bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-sm outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 transition text-gray-800 dark:text-gray-200 placeholder-gray-400";

  return (
    <div className="min-h-screen flex items-center justify-center p-6 relative overflow-hidden animate-fade-in">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-emerald-50 via-white to-green-50 dark:from-gray-950 dark:via-gray-900 dark:to-emerald-950/20"></div>
      <div className="absolute top-[-20%] right-[-10%] w-[500px] h-[500px] bg-emerald-300 rounded-full filter blur-[150px] opacity-20 pointer-events-none"></div>
      <div className="absolute bottom-[-20%] left-[-10%] w-[400px] h-[400px] bg-green-300 rounded-full filter blur-[150px] opacity-15 pointer-events-none"></div>

      <div className="relative z-10 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-3xl p-8 md:p-10 w-full max-w-md shadow-2xl shadow-gray-200/50 dark:shadow-black/30">
        {/* Logo */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-black bg-gradient-to-r from-emerald-600 to-green-500 bg-clip-text text-transparent">Sale Suit</h1>
          <p className="text-gray-400 text-sm mt-1">by Samisuits — Business Marketplace</p>
        </div>

        {/* Role tabs */}
        <div className="flex gap-2 flex-wrap mb-5">
          {roles.map(r => (
            <button
              key={r.key}
              className={`px-3 py-1.5 rounded-full text-xs font-semibold border transition-all ${role === r.key
                  ? 'border-emerald-500 text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/40 shadow-sm'
                  : 'border-gray-200 dark:border-gray-700 text-gray-500 dark:text-gray-400 hover:border-emerald-300 hover:text-emerald-500'
                }`}
              onClick={() => setRole(r.key)}
            >
              {r.label}
            </button>
          ))}
        </div>

        {/* Auth tabs */}
        <div className="flex border-b border-gray-200 dark:border-gray-700 mb-6">
          <button
            className={`flex-1 pb-3 text-sm font-semibold transition-all border-b-2 ${tab === 'login' ? 'border-emerald-500 text-emerald-600 dark:text-emerald-400' : 'border-transparent text-gray-400 hover:text-gray-600'
              }`}
            onClick={() => { setTab('login'); setForgotMode(false); }}
          >
            <FontAwesomeIcon icon={faSignInAlt} className="mr-2" />Sign In
          </button>
          <button
            className={`flex-1 pb-3 text-sm font-semibold transition-all border-b-2 ${tab === 'register' ? 'border-emerald-500 text-emerald-600 dark:text-emerald-400' : 'border-transparent text-gray-400 hover:text-gray-600'
              }`}
            onClick={() => { setTab('register'); setForgotMode(false); }}
          >
            <FontAwesomeIcon icon={faUserPlus} className="mr-2" />Create ID
          </button>
        </div>

        {forgotMode ? (
          <div className="flex flex-col gap-4">
            <div>
              <label className="text-xs font-semibold text-gray-500 dark:text-gray-400 mb-1.5 block">Phone Number</label>
              <div className="relative">
                <FontAwesomeIcon icon={faPhone} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-xs" />
                <input className={`${inputClass} pl-10`} placeholder="Enter your phone number" value={form.identifier} onChange={e => setForm({ ...form, identifier: e.target.value })} />
              </div>
            </div>
            <button className="w-full bg-gradient-to-r from-emerald-600 to-green-500 text-white font-semibold py-3 rounded-xl transition-all hover:shadow-lg disabled:opacity-50 flex items-center justify-center gap-2" onClick={doForgot} disabled={loading}>
              <FontAwesomeIcon icon={faPaperPlane} />
              {loading ? 'Sending...' : 'Send OTP'}
            </button>
            <button className="text-sm text-emerald-600 dark:text-emerald-400 hover:underline flex items-center gap-1.5 justify-center" onClick={() => setForgotMode(false)}>
              <FontAwesomeIcon icon={faArrowLeft} className="text-xs" /> Back to Sign In
            </button>
          </div>
        ) : tab === 'login' ? (
          <div className="flex flex-col gap-4">
            <div>
              <label className="text-xs font-semibold text-gray-500 dark:text-gray-400 mb-1.5 block">Phone Number / Email</label>
              <div className="relative">
                <FontAwesomeIcon icon={faEnvelope} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-xs" />
                <input className={`${inputClass} pl-10`} placeholder="Enter phone or email" value={form.identifier} onChange={e => setForm({ ...form, identifier: e.target.value })} />
              </div>
            </div>
            <div>
              <label className="text-xs font-semibold text-gray-500 dark:text-gray-400 mb-1.5 block">Password</label>
              <div className="relative">
                <FontAwesomeIcon icon={faLock} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-xs" />
                <input className={`${inputClass} pl-10 pr-10`} type={showPw ? 'text' : 'password'} placeholder="Enter password" value={form.password} onChange={e => setForm({ ...form, password: e.target.value })} onKeyDown={e => e.key === 'Enter' && doLogin()} />
                <button className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition" onClick={() => setShowPw(!showPw)}>
                  <FontAwesomeIcon icon={showPw ? faEyeSlash : faEye} className="text-xs" />
                </button>
              </div>
            </div>
            <div className="flex justify-end">
              <button className="text-xs text-emerald-600 dark:text-emerald-400 hover:underline font-medium" onClick={() => setForgotMode(true)}>Forgot Password?</button>
            </div>
            <button className="w-full bg-gradient-to-r from-emerald-600 to-green-500 hover:from-emerald-700 hover:to-green-600 text-white font-semibold py-3.5 rounded-xl transition-all shadow-lg shadow-emerald-500/20 hover:shadow-emerald-500/30 disabled:opacity-50 flex items-center justify-center gap-2" onClick={doLogin} disabled={loading}>
              <FontAwesomeIcon icon={faSignInAlt} />
              {loading ? 'Signing In...' : 'Sign In'}
            </button>
            <div className="text-center text-sm text-gray-400 mt-2">
              Don't have an account?{' '}
              <button className="text-emerald-600 dark:text-emerald-400 font-semibold hover:underline" onClick={() => setTab('register')}>Create ID Now</button>
            </div>
          </div>
        ) : (
          <div className="flex flex-col gap-4">
            <div>
              <label className="text-xs font-semibold text-gray-500 dark:text-gray-400 mb-1.5 block">Full Name *</label>
              <div className="relative">
                <FontAwesomeIcon icon={faUser} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-xs" />
                <input className={`${inputClass} pl-10`} placeholder="Your full name" value={form.full_name} onChange={e => setForm({ ...form, full_name: e.target.value })} />
              </div>
            </div>
            <div>
              <label className="text-xs font-semibold text-gray-500 dark:text-gray-400 mb-1.5 block">Phone Number *</label>
              <div className="relative">
                <FontAwesomeIcon icon={faPhone} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-xs" />
                <input className={`${inputClass} pl-10`} placeholder="Enter phone number" value={form.phone_number} onChange={e => setForm({ ...form, phone_number: e.target.value })} />
              </div>
            </div>
            <div>
              <label className="text-xs font-semibold text-gray-500 dark:text-gray-400 mb-1.5 block">Email (Optional)</label>
              <div className="relative">
                <FontAwesomeIcon icon={faEnvelope} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-xs" />
                <input className={`${inputClass} pl-10`} type="email" placeholder="email@example.com" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-xs font-semibold text-gray-500 dark:text-gray-400 mb-1.5 block">Password *</label>
                <input className={inputClass} type="password" placeholder="Min 6 chars" value={form.password} onChange={e => setForm({ ...form, password: e.target.value })} />
              </div>
              <div>
                <label className="text-xs font-semibold text-gray-500 dark:text-gray-400 mb-1.5 block">Confirm *</label>
                <input className={inputClass} type="password" placeholder="Repeat" value={form.password2} onChange={e => setForm({ ...form, password2: e.target.value })} />
              </div>
            </div>
            <button className="w-full bg-gradient-to-r from-emerald-600 to-green-500 hover:from-emerald-700 hover:to-green-600 text-white font-semibold py-3.5 rounded-xl transition-all shadow-lg shadow-emerald-500/20 disabled:opacity-50 flex items-center justify-center gap-2" onClick={doRegister} disabled={loading}>
              <FontAwesomeIcon icon={faUserPlus} />
              {loading ? 'Creating...' : 'Create My Account'}
            </button>
            <div className="text-center text-sm text-gray-400 mt-2">
              Already have an account?{' '}
              <button className="text-emerald-600 dark:text-emerald-400 font-semibold hover:underline" onClick={() => setTab('login')}>Sign In</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
