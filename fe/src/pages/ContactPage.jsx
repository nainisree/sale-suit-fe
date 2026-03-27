import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPhone, faComments, faEnvelope, faPaperPlane, faUser, faBuilding, faClock } from '@fortawesome/free-solid-svg-icons';
import { faWhatsapp } from '@fortawesome/free-brands-svg-icons';

export default function ContactPage() {
  const { user, showToast } = useApp();
  const [form, setForm] = useState({ name: user?.full_name || '', phone: user?.phone_number || '', email: user?.email || '', message: '', query_type: 'contact' });
  const ic = "w-full px-4 py-3 rounded-xl bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-sm outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 transition text-gray-800 dark:text-gray-200 placeholder-gray-400";

  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 py-8 animate-fade-in">
      <h1 className="text-3xl font-black text-gray-900 dark:text-white mb-2 flex items-center gap-3">
        <FontAwesomeIcon icon={faPhone} className="text-emerald-500" /> Connect With Us
      </h1>
      <p className="text-gray-500 dark:text-gray-400 mb-8">Have questions or feedback? Our team is here to help.</p>

      <div className="flex gap-3 mb-6">
        {[{ key: 'contact', label: 'Connect Us', icon: faPhone }, { key: 'tell_us', label: 'Tell Us', icon: faComments }].map(t => (
          <button key={t.key} className={`px-4 py-2.5 rounded-xl text-sm font-semibold border flex items-center gap-2 transition-all ${form.query_type === t.key ? 'border-emerald-500 bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 shadow-sm' : 'border-gray-200 dark:border-gray-700 text-gray-500 hover:border-emerald-300'}`} onClick={() => setForm({ ...form, query_type: t.key })}>
            <FontAwesomeIcon icon={t.icon} className="text-xs" /> {t.label}
          </button>
        ))}
      </div>

      <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-6 md:p-8 shadow-sm mb-10">
        <div className="flex flex-col gap-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div><label className="text-xs font-semibold text-gray-500 mb-1.5 flex items-center gap-1.5 block"><FontAwesomeIcon icon={faUser} className="text-emerald-500" /> Your Name *</label><input className={ic} value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} /></div>
            <div><label className="text-xs font-semibold text-gray-500 mb-1.5 flex items-center gap-1.5 block"><FontAwesomeIcon icon={faPhone} className="text-emerald-500" /> Phone</label><input className={ic} value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })} /></div>
          </div>
          <div><label className="text-xs font-semibold text-gray-500 mb-1.5 flex items-center gap-1.5 block"><FontAwesomeIcon icon={faEnvelope} className="text-emerald-500" /> Email</label><input className={ic} type="email" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} /></div>
          <div><label className="text-xs font-semibold text-gray-500 mb-1.5 flex items-center gap-1.5 block"><FontAwesomeIcon icon={faComments} className="text-emerald-500" /> Message *</label><textarea className={`${ic} resize-y`} rows={5} placeholder="Tell us what's on your mind..." value={form.message} onChange={e => setForm({ ...form, message: e.target.value })} /></div>
          <button className="w-full bg-gradient-to-r from-emerald-600 to-green-500 hover:from-emerald-700 hover:to-green-600 text-white font-bold py-3.5 rounded-xl transition-all shadow-lg shadow-emerald-500/20 flex items-center justify-center gap-2" onClick={() => showToast("Message sent! We'll get back to you within 24 hours.", 'success')}><FontAwesomeIcon icon={faPaperPlane} /> Send Message</button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {[{ icon: faEnvelope, label: 'Email', value: 'support@salesuits.com', color: 'text-blue-500', bg: 'bg-blue-50 dark:bg-blue-950/30' }, { icon: faWhatsapp, label: 'WhatsApp', value: '+91 98765 43210', color: 'text-green-500', bg: 'bg-green-50 dark:bg-green-950/30' }, { icon: faBuilding, label: 'Head Office', value: 'Hyderabad', color: 'text-violet-500', bg: 'bg-violet-50 dark:bg-violet-950/30' }, { icon: faClock, label: 'Working Hours', value: 'Mon-Sat, 9AM-6PM', color: 'text-amber-500', bg: 'bg-amber-50 dark:bg-amber-950/30' }].map(c => (
          <div key={c.label} className="bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-2xl p-5 flex items-start gap-4 shadow-sm hover:shadow-md transition">
            <div className={`w-11 h-11 rounded-xl ${c.bg} flex items-center justify-center ${c.color} shrink-0`}><FontAwesomeIcon icon={c.icon} /></div>
            <div><div className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-0.5">{c.label}</div><div className="text-sm font-medium text-gray-700 dark:text-gray-300">{c.value}</div></div>
          </div>
        ))}
      </div>
    </div>
  );
}
