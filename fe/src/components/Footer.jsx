import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import { faTwitter, faFacebook, faInstagram, faWhatsapp } from '@fortawesome/free-brands-svg-icons';

export default function Footer() {
  const navigate = useNavigate();

  return (
    <footer className="border-t border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-950/50">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-12 mb-10">
          {/* Brand */}
          <div className="md:col-span-1">
            <div className="text-xl font-black bg-gradient-to-r from-emerald-600 to-green-500 bg-clip-text text-transparent mb-2">sale suit</div>
            <div className="text-xs text-gray-400 uppercase tracking-[2px] mb-4">by samisuitscompany</div>
            <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">India's most trusted marketplace for buying and selling businesses.</p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-sm font-bold text-gray-900 dark:text-gray-200 mb-4 uppercase tracking-wider">Quick Links</h3>
            <div className="flex flex-col gap-2.5">
              {[['/', 'Home'], ['/listings', 'Browse'], ['/sell', 'Sell'], ['/loans', 'Credit']].map(([path, label]) => (
                <button key={path} className="text-sm text-gray-500 dark:text-gray-400 hover:text-emerald-600 dark:hover:text-emerald-400 transition text-left" onClick={() => navigate(path)}>{label}</button>
              ))}
            </div>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-sm font-bold text-gray-900 dark:text-gray-200 mb-4 uppercase tracking-wider">Company</h3>
            <div className="flex flex-col gap-2.5">
              {[['/about', 'About Us'], ['/contact', 'Contact']].map(([path, label]) => (
                <button key={path} className="text-sm text-gray-500 dark:text-gray-400 hover:text-emerald-600 dark:hover:text-emerald-400 transition text-left" onClick={() => navigate(path)}>{label}</button>
              ))}
            </div>
          </div>

          {/* Social */}
          <div>
            <h3 className="text-sm font-bold text-gray-900 dark:text-gray-200 mb-4 uppercase tracking-wider">Follow Us</h3>
            <div className="flex gap-3">
              {[
                { icon: faTwitter, color: 'hover:text-sky-500 hover:bg-sky-50 dark:hover:bg-sky-950/30' },
                { icon: faFacebook, color: 'hover:text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-950/30' },
                { icon: faInstagram, color: 'hover:text-pink-500 hover:bg-pink-50 dark:hover:bg-pink-950/30' },
                { icon: faWhatsapp, color: 'hover:text-green-500 hover:bg-green-50 dark:hover:bg-green-950/30' },
              ].map((s, i) => (
                <a key={i} href="#" className={`w-10 h-10 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 flex items-center justify-center text-gray-400 transition-all ${s.color}`}>
                  <FontAwesomeIcon icon={s.icon} />
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="border-t border-gray-200 dark:border-gray-800 pt-6 text-center">
          <div className="text-xs text-gray-400">
            © 2024 samisuitscompany · Made with <FontAwesomeIcon icon={faHeart} className="text-red-400 mx-1" /> in India · All Rights Reserved
          </div>
        </div>
      </div>
    </footer>
  );
}
