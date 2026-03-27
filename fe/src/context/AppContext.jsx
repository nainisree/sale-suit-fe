import React, { createContext, useContext, useState, useEffect } from 'react';
import { api } from '../utils/api';

const AppContext = createContext(null);

export const useApp = () => useContext(AppContext);

export function AppProvider({ children }) {
  const [user, setUser] = useState(null);
  const [theme, setTheme] = useState('light');
  const [toasts, setToasts] = useState([]);
  const [filter, setFilter] = useState({});
  const [selectedListing, setSelectedListing] = useState(null);

  useEffect(() => {
    document.documentElement.className = theme === 'light' ? 'light-theme' : '';
  }, [theme]);

  const toggleTheme = () => setTheme(t => t === 'light' ? 'dark' : 'light');

  const showToast = (msg, type = 'success') => {
    const id = Date.now();
    setToasts(prev => [...prev, { id, msg, type }]);
    setTimeout(() => setToasts(prev => prev.filter(t => t.id !== id)), 4000);
  };

  const handleLogout = async () => {
    try { await api('/auth/logout/', 'POST'); } catch (e) { }
    setUser(null);
    showToast('Logged out successfully.', 'success');
  };

  const handleLogin = (userData) => {
    setUser(userData);
  };

  const value = {
    user, setUser,
    theme, toggleTheme,
    toasts,
    filter, setFilter,
    selectedListing, setSelectedListing,
    showToast,
    handleLogout,
    handleLogin,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}
