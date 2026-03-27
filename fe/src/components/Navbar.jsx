import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faHome, faShoppingBag, faBullhorn, faCreditCard, faPhone,
  faInfoCircle, faLightbulb, faUserShield, faSun, faMoon,
  faUser, faSignOutAlt, faSignInAlt, faBars
} from '@fortawesome/free-solid-svg-icons';
import { faWhatsapp } from '@fortawesome/free-brands-svg-icons';

export default function Navbar({ setDrawerOpen }) {
  const { user, theme, toggleTheme, handleLogout } = useApp();
  const navigate = useNavigate();
  const location = useLocation();
  const [showSuggest, setShowSuggest] = useState(false);
  const [suggestForm, setSuggestForm] = useState({ name: '', mobile: '' });

  const isActive = (path) => location.pathname === path;

  const handleSuggest = () => {
    const msg = `Hi, I am ${suggestForm.name} (${suggestForm.mobile}). I want to suggest something for Sale Suit!`;
    const url = `https://wa.me/917799548157?text=${encodeURIComponent(msg)}`;
    window.open(url, '_blank');
    setShowSuggest(false);
  };

  const navLinks = [
    { path: '/', label: 'Home', icon: faHome },
    { path: '/listings', label: 'Buy', icon: faShoppingBag },
    { path: '/sell', label: 'Sell', icon: faBullhorn },
    ...(user ? [{ path: '/loans', label: 'Credit', icon: faCreditCard }] : []),
    { path: '/contact', label: 'Connect Us', icon: faPhone },
    { path: '/about', label: 'About', icon: faInfoCircle },
    ...(user?.role === 'admin' ? [{ path: '/admin', label: 'Admin', icon: faUserShield }] : []),
  ];

  return (
    <nav className="sticky top-0 z-50 bg-white/80 dark:bg-gray-950/80 backdrop-blur-xl border-b border-gray-200/60 dark:border-gray-800/60 px-4 lg:px-8 h-16 flex items-center justify-between shadow-sm">
      {/* Mobile menu */}
      <button
        className="lg:hidden text-gray-700 dark:text-gray-300 hover:text-emerald-600 transition p-2"
        onClick={() => setDrawerOpen(true)}
      >
        <FontAwesomeIcon icon={faBars} className="text-xl" />
      </button>

      {/* Brand */}
      <div
        className="flex items-center gap-3 cursor-pointer group"
        onClick={() => navigate('/')}
      >
        <img src="/logo.png" alt="Sale Suit Logo" className="w-9 h-9 rounded-lg object-cover ring-2 ring-emerald-500/30 group-hover:ring-emerald-500/60 transition-all" />
        <div>
          <div className="text-lg font-black bg-gradient-to-r from-emerald-600 to-green-500 bg-clip-text text-transparent leading-tight">sale suit</div>
          <div className="text-[10px] text-gray-400 uppercase tracking-[2px] font-medium">by samisuitscompany</div>
        </div>
      </div>

      {/* Desktop Nav Links */}
      <div className="hidden lg:flex items-center gap-1">
        {navLinks.map(link => (
          <button
            key={link.path}
            className={`px-3.5 py-2 rounded-lg text-sm font-medium transition-all duration-200 flex items-center gap-2 ${isActive(link.path)
                ? 'bg-emerald-50 dark:bg-emerald-950/50 text-emerald-600 dark:text-emerald-400 shadow-sm'
                : 'text-gray-600 dark:text-gray-400 hover:text-emerald-600 dark:hover:text-emerald-400 hover:bg-gray-50 dark:hover:bg-gray-800/50'
              }`}
            onClick={() => navigate(link.path)}
          >
            <FontAwesomeIcon icon={link.icon} className="text-xs" />
            {link.label}
          </button>
        ))}

        {/* Suggest Us */}
        <div className="relative">
          <button
            className="px-3.5 py-2 rounded-lg text-sm font-medium text-amber-600 hover:bg-amber-50 dark:hover:bg-amber-950/30 transition-all flex items-center gap-2"
            onClick={() => setShowSuggest(!showSuggest)}
          >
            <FontAwesomeIcon icon={faLightbulb} />
            Suggest Us
          </button>
          {showSuggest && (
            <div className="absolute top-full right-0 mt-2 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-2xl p-5 z-50 w-72 shadow-2xl animate-fade-in">
              <div className="font-bold text-emerald-600 mb-3 flex items-center gap-2">
                <FontAwesomeIcon icon={faWhatsapp} className="text-green-500" />
                Suggest Us (WhatsApp)
              </div>
              <input
                className="w-full px-4 py-2.5 rounded-xl bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-sm mb-2 outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 transition text-gray-800 dark:text-gray-200"
                placeholder="Your Name"
                value={suggestForm.name}
                onChange={e => setSuggestForm({ ...suggestForm, name: e.target.value })}
              />
              <input
                className="w-full px-4 py-2.5 rounded-xl bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-sm mb-3 outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 transition text-gray-800 dark:text-gray-200"
                placeholder="Mobile Number"
                value={suggestForm.mobile}
                onChange={e => setSuggestForm({ ...suggestForm, mobile: e.target.value })}
              />
              <button
                className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-2.5 rounded-xl transition-colors text-sm"
                onClick={handleSuggest}
              >
                <FontAwesomeIcon icon={faWhatsapp} className="mr-2" />
                Send via WhatsApp
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Right side actions */}
      <div className="flex items-center gap-3">
        <button
          className="w-9 h-9 rounded-full border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 flex items-center justify-center text-gray-600 dark:text-gray-400 hover:border-emerald-500 hover:text-emerald-500 transition-all shadow-sm"
          onClick={toggleTheme}
        >
          <FontAwesomeIcon icon={theme === 'dark' ? faSun : faMoon} className="text-sm" />
        </button>

        {user ? (
          <div className="flex items-center gap-2">
            <button
              className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 transition"
              onClick={() => navigate('/profile')}
            >
              <div className="w-7 h-7 rounded-full bg-gradient-to-br from-emerald-400 to-green-600 flex items-center justify-center text-white text-xs font-bold">
                {user.full_name?.charAt(0)?.toUpperCase() || 'U'}
              </div>
              <span className="hidden sm:inline">{user.full_name?.split(' ')[0]}</span>
            </button>
            <button
              className="px-3 py-2 rounded-lg text-sm font-medium text-red-500 hover:bg-red-50 dark:hover:bg-red-950/30 transition flex items-center gap-1.5"
              onClick={() => { handleLogout(); navigate('/'); }}
            >
              <FontAwesomeIcon icon={faSignOutAlt} className="text-xs" />
              <span className="hidden sm:inline">Logout</span>
            </button>
          </div>
        ) : (
          <button
            className="bg-gradient-to-r from-emerald-600 to-green-500 hover:from-emerald-700 hover:to-green-600 text-white font-semibold px-5 py-2 rounded-full text-sm transition-all shadow-lg shadow-emerald-500/20 hover:shadow-emerald-500/30 hover:-translate-y-0.5 flex items-center gap-2"
            onClick={() => navigate('/login')}
          >
            <FontAwesomeIcon icon={faSignInAlt} className="text-xs" />
            Sign In
          </button>
        )}
      </div>
    </nav>
  );
}
