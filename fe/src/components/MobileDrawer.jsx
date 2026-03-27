import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faHome, faShoppingBag, faBullhorn, faInfoCircle, faPhone,
  faUser, faLock, faSignOutAlt, faSignInAlt, faLightbulb,
  faSun, faMoon, faTimes
} from '@fortawesome/free-solid-svg-icons';
import { faWhatsapp, faFacebook, faInstagram, faTwitter, faYoutube } from '@fortawesome/free-brands-svg-icons';

export default function MobileDrawer({ isOpen, onClose }) {
  const { user, theme, toggleTheme, handleLogout } = useApp();
  const navigate = useNavigate();
  const [showSuggest, setShowSuggest] = useState(false);
  const [suggestForm, setSuggestForm] = useState({ name: '', mobile: '' });

  const handleSuggest = () => {
    const msg = `Hi, I am ${suggestForm.name} (${suggestForm.mobile}). I want to suggest something for Sale Suit!`;
    window.open(`https://wa.me/919876543210?text=${encodeURIComponent(msg)}`, '_blank');
    setShowSuggest(false);
  };

  const go = (path) => { navigate(path); onClose(); };

  const navItems = [
    { path: '/', label: 'Home', icon: faHome },
    { path: '/listings', label: 'Browse Business', icon: faShoppingBag },
    { path: '/sell', label: 'Post Business', icon: faBullhorn },
    { path: '/about', label: 'About Us', icon: faInfoCircle },
    { path: '/contact', label: 'Connect Us', icon: faPhone },
  ];

  return (
    <>
      {/* Overlay */}
      <div
        className={`fixed inset-0 bg-black/50 backdrop-blur-sm z-[999] transition-opacity duration-300 ${isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
        onClick={onClose}
      />

      {/* Drawer */}
      <div className={`fixed top-0 right-0 bottom-0 w-72 bg-white dark:bg-gray-950 border-l border-gray-200 dark:border-gray-800 z-[1000] flex flex-col p-5 transition-transform duration-300 ease-out shadow-2xl ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <img src="/logo.png" alt="Logo" className="w-8 h-8 rounded-lg" />
          <button className="text-gray-500 hover:text-gray-800 dark:hover:text-gray-200 transition p-2" onClick={onClose}>
            <FontAwesomeIcon icon={faTimes} className="text-xl" />
          </button>
        </div>

        {/* User card */}
        {user && (
          <div className="flex items-center gap-3 mb-6 p-3 rounded-2xl bg-gray-50 dark:bg-gray-900 border border-gray-100 dark:border-gray-800">
            <div className="w-11 h-11 rounded-full bg-gradient-to-br from-emerald-400 to-green-600 flex items-center justify-center text-white font-bold">
              {user.full_name?.charAt(0)?.toUpperCase() || 'U'}
            </div>
            <div>
              <div className="font-bold text-gray-800 dark:text-gray-200 text-sm">{user.full_name?.split(' ')[0]}</div>
              <div className="text-xs text-gray-400 capitalize">{user.role?.replace('_', ' ')}</div>
            </div>
          </div>
        )}

        {/* Nav links */}
        <div className="flex flex-col gap-1 flex-1 overflow-y-auto">
          {navItems.map(item => (
            <button
              key={item.path}
              className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-emerald-50 dark:hover:bg-emerald-950/30 hover:text-emerald-600 dark:hover:text-emerald-400 transition-all text-left"
              onClick={() => go(item.path)}
            >
              <FontAwesomeIcon icon={item.icon} className="text-xs w-4" />
              {item.label}
            </button>
          ))}

          <hr className="border-gray-200 dark:border-gray-800 my-3" />

          {user ? (
            <>
              <button className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 transition text-left" onClick={() => go('/profile')}>
                <FontAwesomeIcon icon={faUser} className="text-xs w-4" /> My Profile
              </button>
              <button className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 transition text-left" onClick={() => go('/profile')}>
                <FontAwesomeIcon icon={faLock} className="text-xs w-4" /> Change Password
              </button>
              <button className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-red-500 hover:bg-red-50 dark:hover:bg-red-950/30 transition text-left" onClick={() => { handleLogout(); go('/'); }}>
                <FontAwesomeIcon icon={faSignOutAlt} className="text-xs w-4" /> Logout
              </button>
            </>
          ) : (
            <button
              className="w-full bg-gradient-to-r from-emerald-600 to-green-500 text-white font-semibold py-3 rounded-xl transition text-sm flex items-center justify-center gap-2"
              onClick={() => go('/login')}
            >
              <FontAwesomeIcon icon={faSignInAlt} /> Sign In
            </button>
          )}

          <hr className="border-gray-200 dark:border-gray-800 my-3" />

          <button className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-amber-600 hover:bg-amber-50 dark:hover:bg-amber-950/30 transition text-left" onClick={() => setShowSuggest(true)}>
            <FontAwesomeIcon icon={faLightbulb} className="text-xs w-4" /> Suggest Us
          </button>

          {showSuggest && (
            <div className="bg-gray-50 dark:bg-gray-900 rounded-xl p-4 mt-1 border border-gray-200 dark:border-gray-800">
              <input className="w-full px-3 py-2 rounded-lg bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-sm mb-2 outline-none focus:border-emerald-500 transition text-gray-800 dark:text-gray-200" placeholder="Your Name" value={suggestForm.name} onChange={e => setSuggestForm({ ...suggestForm, name: e.target.value })} />
              <input className="w-full px-3 py-2 rounded-lg bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-sm mb-2 outline-none focus:border-emerald-500 transition text-gray-800 dark:text-gray-200" placeholder="Mobile Number" value={suggestForm.mobile} onChange={e => setSuggestForm({ ...suggestForm, mobile: e.target.value })} />
              <button className="w-full bg-green-600 text-white text-sm font-semibold py-2 rounded-lg transition" onClick={handleSuggest}>
                <FontAwesomeIcon icon={faWhatsapp} className="mr-2" />Send via WhatsApp
              </button>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="mt-auto pt-4 text-center">
          <button className="w-9 h-9 rounded-full border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 mb-4 mx-auto flex items-center justify-center text-gray-500 hover:text-emerald-500 hover:border-emerald-500 transition" onClick={toggleTheme}>
            <FontAwesomeIcon icon={theme === 'dark' ? faSun : faMoon} className="text-sm" />
          </button>
          <div className="flex gap-5 justify-center text-gray-400">
            <FontAwesomeIcon icon={faFacebook} className="hover:text-blue-600 cursor-pointer transition" />
            <FontAwesomeIcon icon={faInstagram} className="hover:text-pink-500 cursor-pointer transition" />
            <FontAwesomeIcon icon={faTwitter} className="hover:text-sky-500 cursor-pointer transition" />
            <FontAwesomeIcon icon={faYoutube} className="hover:text-red-500 cursor-pointer transition" />
          </div>
        </div>
      </div>
    </>
  );
}
