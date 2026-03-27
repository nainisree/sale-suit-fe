import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle, faExclamationTriangle } from '@fortawesome/free-solid-svg-icons';

export default function Toast({ toasts }) {
  return (
    <div className="fixed bottom-6 right-6 z-[9999] flex flex-col gap-3">
      {toasts.map(t => (
        <div
          key={t.id}
          className={`flex items-center gap-3 px-5 py-3.5 rounded-xl text-sm font-semibold shadow-2xl animate-fade-in max-w-xs backdrop-blur-md ${
            t.type === 'success'
              ? 'bg-emerald-900/90 border-l-4 border-emerald-400 text-emerald-50'
              : 'bg-red-900/90 border-l-4 border-red-400 text-red-50'
          }`}
        >
          <FontAwesomeIcon
            icon={t.type === 'success' ? faCheckCircle : faExclamationTriangle}
            className={t.type === 'success' ? 'text-emerald-400' : 'text-red-400'}
          />
          {t.msg}
        </div>
      ))}
    </div>
  );
}
