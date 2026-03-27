import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCog, faUsers, faClipboardList, faUniversity,
  faComments, faCheckCircle, faTimesCircle, faLock,
  faHourglassHalf
} from '@fortawesome/free-solid-svg-icons';

export default function AdminPage() {
  const { user, showToast } = useApp();
  const [activeSection, setActiveSection] = useState('users');

  const mockUsers = [
    { id: 1, full_name: 'Rajesh Kumar', phone_number: '9876543210', role: 'end_user', verification_status: 'pending', role_label: 'Customer' },
    { id: 2, full_name: 'Priya Sharma', phone_number: '9123456789', role: 'mediator', verification_status: 'verified', role_label: 'Mediator' },
    { id: 3, full_name: 'Arun Medical', phone_number: '9988776655', role: 'end_user', verification_status: 'pending', role_label: 'Customer' },
  ];

  const mockListings = [
    { id: 1, title: 'Tea Shop, Chennai', owner: 'Rajesh Kumar', status: 'pending', price: '₹3.5L' },
    { id: 2, title: 'Cafe, Bangalore', owner: 'Priya Sharma', status: 'approved', price: '₹12L' },
  ];

  if (!user || user.role !== 'admin') {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4 animate-fade-in">
        <div className="w-20 h-20 rounded-3xl bg-red-50 dark:bg-red-950/30 flex items-center justify-center text-red-400 border border-red-200 dark:border-red-800">
          <FontAwesomeIcon icon={faLock} className="text-3xl" />
        </div>
        <h2 className="text-xl font-bold text-gray-900 dark:text-white">Admin Access Only</h2>
      </div>
    );
  }

  const tabSections = [
    { key: 'users', label: 'Users & KYC', icon: faUsers },
    { key: 'listings', label: 'Listings', icon: faClipboardList },
    { key: 'loans', label: 'Loans', icon: faUniversity },
    { key: 'queries', label: 'Queries', icon: faComments },
  ];

  const stats = [
    { icon: faUsers, num: '3', label: 'Total Users', color: 'text-blue-500', bg: 'bg-blue-50 dark:bg-blue-950/30' },
    { icon: faClipboardList, num: '2', label: 'Listings', color: 'text-emerald-500', bg: 'bg-emerald-50 dark:bg-emerald-950/30' },
    { icon: faHourglassHalf, num: '2', label: 'Pending KYC', color: 'text-amber-500', bg: 'bg-amber-50 dark:bg-amber-950/30' },
    { icon: faUniversity, num: '1', label: 'Loan Apps', color: 'text-violet-500', bg: 'bg-violet-50 dark:bg-violet-950/30' },
  ];

  const statusBadge = (status) => {
    const map = {
      pending: 'bg-amber-50 dark:bg-amber-950/30 text-amber-600 border-amber-200 dark:border-amber-800',
      verified: 'bg-emerald-50 dark:bg-emerald-950/30 text-emerald-600 border-emerald-200 dark:border-emerald-800',
      approved: 'bg-emerald-50 dark:bg-emerald-950/30 text-emerald-600 border-emerald-200 dark:border-emerald-800',
      rejected: 'bg-red-50 dark:bg-red-950/30 text-red-500 border-red-200 dark:border-red-800',
    };
    return map[status] || map.pending;
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 animate-fade-in">
      <h1 className="text-3xl font-black text-gray-900 dark:text-white mb-6 flex items-center gap-3">
        <FontAwesomeIcon icon={faCog} className="text-emerald-500" />
        Admin Dashboard
      </h1>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        {stats.map(s => (
          <div key={s.label} className="bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-2xl p-5 text-center shadow-sm hover:shadow-md transition">
            <div className={`w-12 h-12 rounded-xl ${s.bg} flex items-center justify-center ${s.color} mx-auto mb-3`}>
              <FontAwesomeIcon icon={s.icon} />
            </div>
            <div className="text-2xl font-black text-gray-900 dark:text-white">{s.num}</div>
            <div className="text-xs text-gray-400 mt-1">{s.label}</div>
          </div>
        ))}
      </div>

      {/* Tabs */}
      <div className="flex border-b border-gray-200 dark:border-gray-700 mb-6 overflow-x-auto">
        {tabSections.map(t => (
          <button
            key={t.key}
            className={`px-4 py-3 text-sm font-semibold transition-all border-b-2 flex items-center gap-2 whitespace-nowrap ${
              activeSection === t.key ? 'border-emerald-500 text-emerald-600 dark:text-emerald-400' : 'border-transparent text-gray-400 hover:text-gray-600'
            }`}
            onClick={() => setActiveSection(t.key)}
          >
            <FontAwesomeIcon icon={t.icon} className="text-xs" /> {t.label}
          </button>
        ))}
      </div>

      {/* Users */}
      {activeSection === 'users' && (
        <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl overflow-hidden shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-100 dark:border-gray-800">
                  <th className="text-left px-5 py-3 text-xs font-bold text-gray-400 uppercase tracking-wider">Name</th>
                  <th className="text-left px-5 py-3 text-xs font-bold text-gray-400 uppercase tracking-wider">Phone</th>
                  <th className="text-left px-5 py-3 text-xs font-bold text-gray-400 uppercase tracking-wider">Role</th>
                  <th className="text-left px-5 py-3 text-xs font-bold text-gray-400 uppercase tracking-wider">KYC</th>
                  <th className="text-left px-5 py-3 text-xs font-bold text-gray-400 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody>
                {mockUsers.map(u => (
                  <tr key={u.id} className="border-b border-gray-50 dark:border-gray-800/50 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition">
                    <td className="px-5 py-4 text-sm font-semibold text-gray-900 dark:text-white">{u.full_name}</td>
                    <td className="px-5 py-4 text-sm text-gray-500">{u.phone_number}</td>
                    <td className="px-5 py-4 text-sm text-gray-400">{u.role_label}</td>
                    <td className="px-5 py-4">
                      <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-[11px] font-bold border capitalize ${statusBadge(u.verification_status)}`}>
                        {u.verification_status}
                      </span>
                    </td>
                    <td className="px-5 py-4">
                      <div className="flex gap-2">
                        <button className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-emerald-50 dark:bg-emerald-950/30 text-emerald-600 border border-emerald-200 dark:border-emerald-800 hover:bg-emerald-100 dark:hover:bg-emerald-900/40 transition flex items-center gap-1" onClick={() => showToast(`${u.full_name} approved!`, 'success')}>
                          <FontAwesomeIcon icon={faCheckCircle} /> Approve
                        </button>
                        <button className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-red-50 dark:bg-red-950/30 text-red-500 border border-red-200 dark:border-red-800 hover:bg-red-100 dark:hover:bg-red-900/40 transition flex items-center gap-1" onClick={() => showToast(`${u.full_name} rejected!`, 'error')}>
                          <FontAwesomeIcon icon={faTimesCircle} /> Reject
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Listings */}
      {activeSection === 'listings' && (
        <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl overflow-hidden shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-100 dark:border-gray-800">
                  <th className="text-left px-5 py-3 text-xs font-bold text-gray-400 uppercase tracking-wider">Title</th>
                  <th className="text-left px-5 py-3 text-xs font-bold text-gray-400 uppercase tracking-wider">Owner</th>
                  <th className="text-left px-5 py-3 text-xs font-bold text-gray-400 uppercase tracking-wider">Price</th>
                  <th className="text-left px-5 py-3 text-xs font-bold text-gray-400 uppercase tracking-wider">Status</th>
                  <th className="text-left px-5 py-3 text-xs font-bold text-gray-400 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody>
                {mockListings.map(l => (
                  <tr key={l.id} className="border-b border-gray-50 dark:border-gray-800/50 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition">
                    <td className="px-5 py-4 text-sm font-semibold text-gray-900 dark:text-white">{l.title}</td>
                    <td className="px-5 py-4 text-sm text-gray-500">{l.owner}</td>
                    <td className="px-5 py-4 text-sm font-bold text-emerald-600">{l.price}</td>
                    <td className="px-5 py-4">
                      <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-[11px] font-bold border capitalize ${statusBadge(l.status)}`}>
                        {l.status}
                      </span>
                    </td>
                    <td className="px-5 py-4">
                      <div className="flex gap-2">
                        <button className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-emerald-50 dark:bg-emerald-950/30 text-emerald-600 border border-emerald-200 dark:border-emerald-800 hover:bg-emerald-100 dark:hover:bg-emerald-900/40 transition flex items-center gap-1" onClick={() => showToast('Listing approved!', 'success')}>
                          <FontAwesomeIcon icon={faCheckCircle} /> Approve
                        </button>
                        <button className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-red-50 dark:bg-red-950/30 text-red-500 border border-red-200 dark:border-red-800 hover:bg-red-100 dark:hover:bg-red-900/40 transition flex items-center gap-1" onClick={() => showToast('Listing rejected!', 'error')}>
                          <FontAwesomeIcon icon={faTimesCircle} /> Reject
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Loans */}
      {activeSection === 'loans' && (
        <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-12 text-center shadow-sm">
          <FontAwesomeIcon icon={faUniversity} className="text-4xl text-gray-200 dark:text-gray-700 mb-4" />
          <p className="text-gray-400">No loan applications yet.</p>
        </div>
      )}

      {/* Queries */}
      {activeSection === 'queries' && (
        <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-12 text-center shadow-sm">
          <FontAwesomeIcon icon={faComments} className="text-4xl text-gray-200 dark:text-gray-700 mb-4" />
          <p className="text-gray-400">No pending queries.</p>
        </div>
      )}
    </div>
  );
}
