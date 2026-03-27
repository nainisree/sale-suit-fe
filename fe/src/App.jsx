import React, { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AppProvider } from './context/AppContext';
import { useApp } from './context/AppContext';

// Components
import Navbar from './components/Navbar';
import MobileDrawer from './components/MobileDrawer';
import Footer from './components/Footer';
import Toast from './components/Toast';

// Pages
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import ListingsPage from './pages/ListingsPage';
import ListingDetailPage from './pages/ListingDetailPage';
import SellPage from './pages/SellPage';
import LoansPage from './pages/LoansPage';
import ProfilePage from './pages/ProfilePage';
import AdminPage from './pages/AdminPage';
import ContactPage from './pages/ContactPage';
import AboutPage from './pages/AboutPage';

function AppLayout() {
  const { toasts } = useApp();
  const [drawerOpen, setDrawerOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-950 text-gray-900 dark:text-gray-100">
      <Navbar setDrawerOpen={setDrawerOpen} />
      <MobileDrawer isOpen={drawerOpen} onClose={() => setDrawerOpen(false)} />
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/listings" element={<ListingsPage />} />
          <Route path="/listing/:id" element={<ListingDetailPage />} />
          <Route path="/sell" element={<SellPage />} />
          <Route path="/loans" element={<LoansPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/admin" element={<AdminPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/about" element={<AboutPage />} />
        </Routes>
      </main>
      <Footer />
      <Toast toasts={toasts} />
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AppProvider>
        <AppLayout />
      </AppProvider>
    </BrowserRouter>
  );
}
