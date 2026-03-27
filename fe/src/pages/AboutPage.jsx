import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStore, faShieldAlt, faUniversity, faHandshake, faTags, faBullseye } from '@fortawesome/free-solid-svg-icons';

export default function AboutPage() {
  const sections = [
    { icon: faBullseye, title: 'Our Mission', content: 'Sale Suit connects business buyers and sellers across India with trust, transparency, and technology. We specialize in helping entrepreneurs find the right business opportunities.', color: 'text-emerald-500', bg: 'bg-emerald-50 dark:bg-emerald-950/30' },
    { icon: faShieldAlt, title: 'KYC Verification', content: 'Every user on our platform goes through a rigorous verification process including PAN Card, Aadhar Card, Food License, and Drug License verification.', color: 'text-blue-500', bg: 'bg-blue-50 dark:bg-blue-950/30' },
    { icon: faUniversity, title: 'NBFC Loan Support', content: 'We partner with leading NBFCs to provide financing options for business buyers. Our loan support helps entrepreneurs acquire businesses even with limited capital.', color: 'text-violet-500', bg: 'bg-violet-50 dark:bg-violet-950/30' },
    { icon: faTags, title: 'Our Categories', content: "We support Tea Shops, Restaurants, Continental Cafes, Medical, Supermarkets and more. If it's a business, it belongs on Sale Suit.", color: 'text-amber-500', bg: 'bg-amber-50 dark:bg-amber-950/30' },
  ];

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-12 animate-fade-in">
      <div className="text-center mb-14">
        <div className="w-20 h-20 rounded-3xl bg-emerald-50 dark:bg-emerald-950/30 flex items-center justify-center mx-auto mb-5">
          <FontAwesomeIcon icon={faStore} className="text-3xl text-emerald-500" />
        </div>
        <h1 className="text-4xl md:text-5xl font-black text-gray-900 dark:text-white mb-3">
          About <span className="bg-clip-text text-transparent bg-gradient-to-r from-emerald-600 to-green-400">Sale Suit</span>
        </h1>
        <p className="text-gray-500 dark:text-gray-400 text-lg">India's trusted business marketplace, by samisuitscompany</p>
      </div>

      <div className="flex flex-col gap-6">
        {sections.map(s => (
          <div key={s.title} className="bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-2xl p-7 shadow-sm hover:shadow-md transition-all hover:-translate-y-0.5 group">
            <div className="flex items-start gap-4">
              <div className={`w-12 h-12 rounded-xl ${s.bg} flex items-center justify-center ${s.color} shrink-0 group-hover:scale-110 transition-transform`}>
                <FontAwesomeIcon icon={s.icon} className="text-lg" />
              </div>
              <div>
                <h2 className="text-lg font-bold text-emerald-600 dark:text-emerald-400 mb-2">{s.title}</h2>
                <p className="text-gray-500 dark:text-gray-400 leading-relaxed text-sm">{s.content}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
