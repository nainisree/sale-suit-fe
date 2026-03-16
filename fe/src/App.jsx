import React, { useState, useEffect, createContext, useContext } from 'react';
import './index.css';

// ===== API CONFIG =====
const API = 'http://localhost:8000/api';

const api = async (endpoint, method = 'GET', body = null, isForm = false) => {
  const opts = {
    method,
    credentials: 'include',
    headers: isForm ? {} : { 'Content-Type': 'application/json' },
  };
  if (body) opts.body = isForm ? body : JSON.stringify(body);
  const res = await fetch(`${API}${endpoint}`, opts);
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw data;
  return data;
};

// ===== CONTEXT =====
const AppContext = createContext(null);
const useApp = () => useContext(AppContext);

// ===== TOAST =====
function Toast({ toasts }) {
  return (
    <div className="toast-container">
      {toasts.map(t => (
        <div key={t.id} className={`toast toast-${t.type}`}>{t.msg}</div>
      ))}
    </div>
  );
}

// ===== CATEGORY ICONS =====
const CATEGORY_ICONS = {
  tea_shop: '🍵', restaurant: '🍽️', medical_shop: '💊',
  food_truck: '🚚', cafe: '☕', supermarket: '🛒', other: '🏪',
};

// ========= NAVBAR =========
function Navbar({ page, setPage, user, theme, toggleTheme, onLogout }) {
  return (
    <nav className="navbar">
      <div className="navbar-brand" onClick={() => setPage('home')} style={{ cursor: 'pointer' }}>
        <div style={{ background: 'linear-gradient(135deg,#4ade80,#22c55e)', borderRadius: 10, width: 36, height: 36, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.2rem' }}>🏪</div>
        <div>
          <div className="brand-name">Sale Suit</div>
          <div className="brand-sub">by Samisuits</div>
        </div>
      </div>

      <div className="navbar-links">
        <button className={`nav-link ${page === 'home' ? 'active' : ''}`} onClick={() => setPage('home')}>Home</button>
        <button className={`nav-link ${page === 'listings' ? 'active' : ''}`} onClick={() => setPage('listings')}>Browse</button>
        <button className={`nav-link ${page === 'sell' ? 'active' : ''}`} onClick={() => setPage('sell')}>Sell</button>
        {user && <button className={`nav-link ${page === 'loans' ? 'active' : ''}`} onClick={() => setPage('loans')}>Credit</button>}
        <button className="nav-link" onClick={() => setPage('contact')}>Connect Us</button>
        <button className="nav-link" onClick={() => setPage('about')}>About</button>
        <button className={`nav-link ${page === 'docs' ? 'active' : ''}`} onClick={() => setPage('docs')}>📜 API Docs</button>
        {user?.role === 'admin' && <button className={`nav-link ${page === 'admin' ? 'active' : ''}`} onClick={() => setPage('admin')}>Admin</button>}
      </div>

      <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
        <button className="theme-toggle" onClick={toggleTheme}>{theme === 'dark' ? '☀️' : '🌙'}</button>
        {user ? (
          <div style={{ display: 'flex', gap: 8 }}>
            <button className="nav-link" onClick={() => setPage('profile')}>👤 {user.full_name?.split(' ')[0]}</button>
            <button className="nav-btn" style={{ background: '#1a271a', color: '#f87171', border: '1px solid #f87171' }} onClick={onLogout}>Logout</button>
          </div>
        ) : (
          <button className="nav-btn" onClick={() => setPage('login')}>Sign In</button>
        )}
      </div>
    </nav>
  );
}

// ========= LOGIN PAGE =========
function LoginPage({ setPage, onLogin, showToast }) {
  const [tab, setTab] = useState('login');
  const [role, setRole] = useState('end_user');
  const [form, setForm] = useState({ identifier: '', password: '', phone_number: '', full_name: '', email: '', password2: '' });
  const [loading, setLoading] = useState(loading => false);
  const [forgotMode, setForgotMode] = useState(false);
  const roles = [
    { key: 'end_user', label: 'Customer' }, { key: 'mediator', label: 'Mediator' },
    { key: 'field_person', label: 'Field Person' }, { key: 'customer_care', label: 'Customer Care' },
  ];

  const handleLogin = async () => {
    setLoading(true);
    try {
      const res = await api('/auth/login/', 'POST', { identifier: form.identifier, password: form.password, role });
      onLogin(res.user);
      showToast(`Welcome back, ${res.user.full_name}!`, 'success');
    } catch (e) {
      showToast(Object.values(e || {}).flat().join(' ') || 'Login failed.', 'error');
    } finally { setLoading(false); }
  };

  const handleRegister = async () => {
    setLoading(true);
    try {
      const res = await api('/auth/register/', 'POST', { phone_number: form.phone_number, full_name: form.full_name, email: form.email || undefined, password: form.password, password2: form.password2, role });
      showToast('Account created! Please complete KYC to start using Sale Suit.', 'success');
      setTab('login');
    } catch (e) {
      showToast(Object.values(e || {}).flat().join(' ') || 'Registration failed.', 'error');
    } finally { setLoading(false); }
  };

  const handleForgot = async () => {
    setLoading(true);
    try {
      const res = await api('/auth/forgot-password/', 'POST', { phone_number: form.identifier });
      showToast(res.message, 'success');
    } catch (e) { showToast('Phone number not found.', 'error'); }
    finally { setLoading(false); }
  };

  return (
    <div className="auth-page fade-in">
      <div className="auth-card">
        <div className="auth-logo">
          <h1>🏪 Sale Suit</h1>
          <p>by Samisuits — Business Marketplace</p>
        </div>

        {/* Role Tabs */}
        <div className="role-tabs">
          {roles.map(r => (
            <button key={r.key} className={`role-tab ${role === r.key ? 'active' : ''}`} onClick={() => setRole(r.key)}>{r.label}</button>
          ))}
        </div>

        {/* Auth Tabs */}
        <div className="tabs" style={{ marginBottom: 20 }}>
          <button className={`tab-btn ${tab === 'login' ? 'active' : ''}`} onClick={() => { setTab('login'); setForgotMode(false); }}>Sign In</button>
          <button className={`tab-btn ${tab === 'register' ? 'active' : ''}`} onClick={() => { setTab('register'); setForgotMode(false); }}>Create ID</button>
        </div>

        {forgotMode ? (
          <div className="auth-form">
            <div className="form-group">
              <label className="form-label">Phone Number</label>
              <input className="form-input" placeholder="Enter your phone number" value={form.identifier} onChange={e => setForm({ ...form, identifier: e.target.value })} />
            </div>
            <button className="btn btn-primary" style={{ width: '100%' }} onClick={handleForgot} disabled={loading}>
              {loading ? 'Sending...' : 'Send OTP'}
            </button>
            <div className="auth-footer"><a onClick={() => setForgotMode(false)}>← Back to Sign In</a></div>
          </div>

        ) : tab === 'login' ? (
          <div className="auth-form">
            <div className="form-group">
              <label className="form-label">Phone Number / Email</label>
              <input className="form-input" placeholder="Enter phone or email" value={form.identifier} onChange={e => setForm({ ...form, identifier: e.target.value })} />
            </div>
            <div className="form-group">
              <label className="form-label">Password</label>
              <input className="form-input" type="password" placeholder="Enter password" value={form.password} onChange={e => setForm({ ...form, password: e.target.value })}
                onKeyDown={e => e.key === 'Enter' && handleLogin()} />
            </div>
            <div className="auth-links">
              <a onClick={() => setForgotMode(true)}>Forgot Password?</a>
            </div>
            <button className="btn btn-primary" style={{ width: '100%' }} onClick={handleLogin} disabled={loading}>
              {loading ? 'Signing In...' : 'Sign In'}
            </button>
            <div className="auth-footer">Don't have an account? <a onClick={() => setTab('register')}>Create ID Now</a></div>
          </div>

        ) : (
          <div className="auth-form">
            <div className="form-group">
              <label className="form-label">Full Name *</label>
              <input className="form-input" placeholder="Your full name" value={form.full_name} onChange={e => setForm({ ...form, full_name: e.target.value })} />
            </div>
            <div className="form-group">
              <label className="form-label">Phone Number *</label>
              <input className="form-input" placeholder="+91 9876543210" value={form.phone_number} onChange={e => setForm({ ...form, phone_number: e.target.value })} />
            </div>
            <div className="form-group">
              <label className="form-label">Email (Optional)</label>
              <input className="form-input" type="email" placeholder="email@example.com" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} />
            </div>
            <div className="form-row">
              <div className="form-group">
                <label className="form-label">Password *</label>
                <input className="form-input" type="password" placeholder="Min 6 chars" value={form.password} onChange={e => setForm({ ...form, password: e.target.value })} />
              </div>
              <div className="form-group">
                <label className="form-label">Confirm Password *</label>
                <input className="form-input" type="password" placeholder="Repeat password" value={form.password2} onChange={e => setForm({ ...form, password2: e.target.value })} />
              </div>
            </div>
            <button className="btn btn-primary" style={{ width: '100%' }} onClick={handleRegister} disabled={loading}>
              {loading ? 'Creating...' : 'Create My Account'}
            </button>
            <div className="auth-footer">Already have an account? <a onClick={() => setTab('login')}>Sign In</a></div>
          </div>
        )}
      </div>
    </div>
  );
}

// ========= HOME PAGE =========
function HomePage({ setPage, setFilter, user }) {
  const categories = [
    { key: 'tea_shop', label: 'Tea Shop', icon: '🍵' },
    { key: 'restaurant', label: 'Restaurant', icon: '🍽️' },
    { key: 'medical_shop', label: 'Medical Shop', icon: '💊' },
    { key: 'food_truck', label: 'Food Truck', icon: '🚚' },
    { key: 'cafe', label: 'Cafe', icon: '☕' },
    { key: 'supermarket', label: 'Supermarket', icon: '🛒' },
  ];
  const mockAds = [
    { id: 1, title: '🏦 NBFC Loans for Business Buyers', sub: 'Get up to ₹50 Lakh instantly', color: '#166534' },
    { id: 2, title: '📋 Verified Listings Only', sub: 'All listings are KYC verified', color: '#164e63' },
    { id: 3, title: '🤝 Mediator Support', sub: 'Find certified mediators near you', color: '#312e81' },
  ];
  const [search, setSearch] = useState('');

  return (
    <div className="fade-in">
      {/* Hero */}
      <div className="hero">
        <h1>Buy & Sell <span>Businesses</span> with Confidence</h1>
        <p>India's most trusted marketplace for tea shops, restaurants, cafes, medical shops & more.</p>
        <div className="search-bar">
          <span>🔍</span>
          <input placeholder="Search by business type, city..." value={search} onChange={e => setSearch(e.target.value)} />
          <button className="btn btn-primary" onClick={() => { setFilter({ search }); setPage('listings'); }}>Search</button>
        </div>
        <div className="hero-actions">
          <button className="btn btn-primary" onClick={() => setPage('listings')}>🛍️ Browse Listings</button>
          <button className="btn btn-outline" onClick={() => setPage('sell')}>📢 Post Your Business</button>
        </div>
      </div>

      {/* Ads */}
      <div style={{ padding: '0 0 8px' }}>
        <div className="ads-strip">
          {mockAds.map(ad => (
            <div key={ad.id} className="ad-card" style={{ background: `linear-gradient(135deg, ${ad.color}44, #111a11)` }}>
              <div className="ad-badge">AD</div>
              <div>
                <div style={{ fontWeight: 800, fontSize: '0.95rem' }}>{ad.title}</div>
                <div style={{ color: 'var(--text-dim)', fontSize: '0.8rem', marginTop: 4 }}>{ad.sub}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Categories */}
      <div className="section">
        <div className="section-title">Browse by <span>Category</span></div>
        <div className="categories-grid">
          {categories.map(c => (
            <div key={c.key} className="category-card" onClick={() => { setFilter({ category: c.key }); setPage('listings'); }}>
              <div className="category-icon">{c.icon}</div>
              <div className="category-name">{c.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Why Sale Suit */}
      <div className="section" style={{ paddingTop: 0 }}>
        <div className="section-title">Why <span>Sale Suit</span>?</div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(220px,1fr))', gap: 16 }}>
          {[
            { icon: '✅', title: 'KYC Verified Users', desc: 'Every user verified with Aadhar, PAN & business licenses.' },
            { icon: '🏦', title: 'NBFC Loan Support', desc: 'Apply for business loans directly on our platform.' },
            { icon: '🗂️', title: 'Multiple Categories', desc: 'Tea shops, restaurants, cafes, medical stores & more.' },
            { icon: '🤝', title: 'Mediator Network', desc: 'Certified mediators to assist your deal closure.' },
          ].map(f => (
            <div key={f.title} className="card">
              <div style={{ fontSize: '2rem', marginBottom: 10 }}>{f.icon}</div>
              <div style={{ fontWeight: 800, marginBottom: 6 }}>{f.title}</div>
              <div style={{ color: 'var(--text-dim)', fontSize: '0.85rem' }}>{f.desc}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ========= LISTINGS PAGE =========
function ListingsPage({ filter, setFilter, setPage, setSelectedListing }) {
  const [listings, setListings] = useState([
    // Mock data for offline demo
    { id: 1, title: 'Established Tea Shop', category: 'tea_shop', listing_type: 'sell', price: '350000', city: 'Chennai', state: 'Tamil Nadu', furniture_included: true, loan_eligible: true, description: 'Running tea shop with 15 years of customer base.' },
    { id: 2, title: 'Modern Cafe Space', category: 'cafe', listing_type: 'sell', price: '1200000', city: 'Bangalore', state: 'Karnataka', furniture_included: true, loan_eligible: true, description: '800 sqft AC cafe in prime location.' },
    { id: 3, title: 'Medical Shop for Sale', category: 'medical_shop', listing_type: 'sell', price: '850000', city: 'Hyderabad', state: 'Telangana', furniture_included: false, loan_eligible: true, description: 'Drug license included, 10+ years established.' },
    { id: 4, title: 'Restaurant Business', category: 'restaurant', listing_type: 'sell', price: '2500000', city: 'Mumbai', state: 'Maharashtra', furniture_included: true, loan_eligible: false, description: '50-seat restaurant with full kitchen setup.' },
    { id: 5, title: 'Food Truck for Sale', category: 'food_truck', listing_type: 'sell', price: '450000', city: 'Pune', state: 'Maharashtra', furniture_included: true, loan_eligible: true, description: 'Custom built food truck with all permits.' },
    { id: 6, title: 'Supermarket Space', category: 'supermarket', listing_type: 'buy', price: '5000000', city: 'Delhi', state: 'Delhi', furniture_included: false, loan_eligible: true, description: 'Looking to buy a supermarket in North Delhi.' },
  ]);
  const [activeCategory, setActiveCategory] = useState(filter?.category || '');
  const [activeType, setActiveType] = useState(filter?.type || '');
  const [search, setSearch] = useState(filter?.search || '');

  const filtered = listings.filter(l => {
    if (activeCategory && l.category !== activeCategory) return false;
    if (activeType && l.listing_type !== activeType) return false;
    if (search && !l.title.toLowerCase().includes(search.toLowerCase()) && !l.city.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  const categories = ['', 'tea_shop', 'restaurant', 'medical_shop', 'food_truck', 'cafe', 'supermarket'];
  const catLabels = { '': 'All', tea_shop: 'Tea Shop', restaurant: 'Restaurant', medical_shop: 'Medical', food_truck: 'Food Truck', cafe: 'Cafe', supermarket: 'Supermarket' };

  return (
    <div className="section fade-in" style={{ maxWidth: '100%', padding: '32px 24px' }}>
      {/* Filters */}
      <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', marginBottom: 24, alignItems: 'center' }}>
        <div className="search-bar" style={{ margin: 0, flex: '1 1 300px' }}>
          <span>🔍</span>
          <input placeholder="Search listings, city..." value={search} onChange={e => setSearch(e.target.value)} />
        </div>
        <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
          <button className={`role-tab ${activeType === '' ? 'active' : ''}`} onClick={() => setActiveType('')}>All</button>
          <button className={`role-tab ${activeType === 'sell' ? 'active' : ''}`} onClick={() => setActiveType('sell')}>Sell</button>
          <button className={`role-tab ${activeType === 'buy' ? 'active' : ''}`} onClick={() => setActiveType('buy')}>Buy</button>
        </div>
      </div>

      <div style={{ display: 'flex', gap: 6, marginBottom: 24, flexWrap: 'wrap' }}>
        {categories.map(c => (
          <button key={c} className={`role-tab ${activeCategory === c ? 'active' : ''}`} onClick={() => setActiveCategory(c)}>{catLabels[c]}</button>
        ))}
      </div>

      <div style={{ marginBottom: 16, color: 'var(--text-dim)', fontSize: '0.85rem' }}>{filtered.length} listings found</div>

      <div className="listings-grid">
        {filtered.map(l => (
          <div key={l.id} className="listing-card" onClick={() => { setSelectedListing(l); setPage('listing-detail'); }}>
            <div className="listing-image">{CATEGORY_ICONS[l.category] || '🏪'}</div>
            <div className="listing-body">
              <span className={`listing-type-badge ${l.listing_type === 'sell' ? 'badge-sell' : 'badge-buy'}`}>
                {l.listing_type === 'sell' ? '🏷️ For Sale' : '🛒 Wanted'}
              </span>
              <div className="listing-title">{l.title}</div>
              <div className="listing-location">📍 {l.city}, {l.state}</div>
              <div className="listing-price">₹{Number(l.price).toLocaleString('en-IN')}</div>
              <div className="listing-meta">
                {l.furniture_included && <span className="meta-tag">🛋️ Furniture</span>}
                {l.loan_eligible && <span className="meta-tag">🏦 Loan Available</span>}
                <span className="meta-tag">{catLabels[l.category]}</span>
              </div>
            </div>
          </div>
        ))}
        {filtered.length === 0 && (
          <div style={{ gridColumn: '1/-1', textAlign: 'center', padding: '60px 0', color: 'var(--text-dim)' }}>
            <div style={{ fontSize: '3rem', marginBottom: 12 }}>🔎</div>
            <div>No listings found. Try different filters.</div>
          </div>
        )}
      </div>
    </div>
  );
}

// ========= LISTING DETAIL =========
function ListingDetailPage({ listing, setPage, user, showToast }) {
  if (!listing) return null;
  const catLabels = { tea_shop: 'Tea Shop', restaurant: 'Restaurant', medical_shop: 'Medical Shop', food_truck: 'Food Truck', cafe: 'Cafe', supermarket: 'Supermarket', other: 'Other' };

  return (
    <div style={{ maxWidth: 800, margin: '0 auto', padding: '32px 24px' }} className="fade-in">
      <button className="btn btn-outline btn-sm" onClick={() => setPage('listings')} style={{ marginBottom: 20 }}>← Back to Listings</button>
      <div className="listing-image" style={{ height: 260, borderRadius: 'var(--radius)', fontSize: '5rem', border: '1px solid var(--border)', marginBottom: 24 }}>
        {CATEGORY_ICONS[listing.category] || '🏪'}
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 12, marginBottom: 16 }}>
        <div>
          <span className={`listing-type-badge ${listing.listing_type === 'sell' ? 'badge-sell' : 'badge-buy'}`}>
            {listing.listing_type === 'sell' ? '🏷️ For Sale' : '🛒 Wanted'}
          </span>
          <h1 style={{ fontSize: '1.8rem', fontWeight: 900, marginTop: 6 }}>{listing.title}</h1>
          <div style={{ color: 'var(--text-dim)', marginTop: 4 }}>📍 {listing.city}, {listing.state}</div>
        </div>
        <div className="listing-price" style={{ fontSize: '2rem' }}>₹{Number(listing.price).toLocaleString('en-IN')}</div>
      </div>

      <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 20 }}>
        {listing.furniture_included && <span className="meta-tag">🛋️ Furniture Included</span>}
        {listing.loan_eligible && <span className="meta-tag">🏦 Loan Eligible</span>}
        <span className="meta-tag">📂 {catLabels[listing.category]}</span>
      </div>

      <div className="card" style={{ marginBottom: 16 }}>
        <div style={{ fontWeight: 700, marginBottom: 10 }}>About this Business</div>
        <p style={{ color: 'var(--text-dim)', lineHeight: 1.7 }}>{listing.description}</p>
      </div>

      <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
        <button className="btn btn-primary" onClick={() => { if (!user) { showToast('Please sign in to contact seller.', 'error'); setPage('login'); } else { showToast('Contact request sent!', 'success'); } }}>
          💬 Contact Seller
        </button>
        {listing.loan_eligible && (
          <button className="btn btn-outline" onClick={() => setPage('loans')}>🏦 Apply for Loan</button>
        )}
      </div>
    </div>
  );
}

// ========= SELL / CREATE LISTING =========
function SellPage({ user, setPage, showToast }) {
  const [form, setForm] = useState({ title: '', description: '', category: 'tea_shop', listing_type: 'sell', price: '', address: '', city: '', state: '', pincode: '', furniture_included: false, loan_eligible: false });
  const [loading, setLoading] = useState(false);

  if (!user) {
    return (
      <div className="flex-center" style={{ minHeight: '60vh', flexDirection: 'column', gap: 16 }}>
        <div style={{ fontSize: '3rem' }}>🔒</div>
        <div style={{ fontSize: '1.2rem', fontWeight: 700 }}>Sign in to Post a Listing</div>
        <button className="btn btn-primary" onClick={() => setPage('login')}>Sign In / Register</button>
      </div>
    );
  }

  if (!user.is_verified) {
    return (
      <div className="flex-center" style={{ minHeight: '60vh', flexDirection: 'column', gap: 16, padding: 24 }}>
        <div style={{ fontSize: '3rem' }}>📋</div>
        <div style={{ fontSize: '1.2rem', fontWeight: 700, textAlign: 'center' }}>KYC Verification Required</div>
        <div style={{ color: 'var(--text-dim)', textAlign: 'center', maxWidth: 400 }}>You need to complete KYC verification before posting listings. Please upload your documents in Profile.</div>
        <button className="btn btn-primary" onClick={() => setPage('profile')}>Go to Profile & Upload KYC</button>
      </div>
    );
  }

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const fd = new FormData();
      Object.entries(form).forEach(([k, v]) => fd.append(k, v));
      await api('/listings/create/', 'POST', fd, true);
      showToast('Listing submitted for admin approval!', 'success');
      setPage('listings');
    } catch (e) {
      showToast(Object.values(e || {}).flat().join(' ') || 'Failed to post listing.', 'error');
    } finally { setLoading(false); }
  };

  return (
    <div style={{ maxWidth: 700, margin: '0 auto', padding: '32px 24px' }} className="fade-in">
      <h1 style={{ fontSize: '1.8rem', fontWeight: 900, marginBottom: 6 }}>Post Your Business</h1>
      <p style={{ color: 'var(--text-dim)', marginBottom: 28 }}>Fill in the details below. Your listing will be reviewed by our team before going live.</p>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        <div className="form-row">
          <div className="form-group">
            <label className="form-label">Category *</label>
            <select className="form-input" value={form.category} onChange={e => setForm({ ...form, category: e.target.value })}>
              <option value="tea_shop">Tea Shop</option>
              <option value="restaurant">Restaurant</option>
              <option value="medical_shop">Medical Shop</option>
              <option value="food_truck">Food Truck</option>
              <option value="cafe">Cafe</option>
              <option value="supermarket">Supermarket</option>
              <option value="other">Other</option>
            </select>
          </div>
          <div className="form-group">
            <label className="form-label">Listing Type *</label>
            <select className="form-input" value={form.listing_type} onChange={e => setForm({ ...form, listing_type: e.target.value })}>
              <option value="sell">I want to Sell</option>
              <option value="buy">I want to Buy</option>
            </select>
          </div>
        </div>

        <div className="form-group">
          <label className="form-label">Business Title *</label>
          <input className="form-input" placeholder="e.g. Well-established Tea Shop in Anna Nagar" value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} />
        </div>

        <div className="form-group">
          <label className="form-label">Description *</label>
          <textarea className="form-input" rows={4} style={{ resize: 'vertical' }} placeholder="Describe the business, its history, customer base, included assets..." value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} />
        </div>

        <div className="form-group">
          <label className="form-label">Asking Price (₹) *</label>
          <input className="form-input" type="number" placeholder="350000" value={form.price} onChange={e => setForm({ ...form, price: e.target.value })} />
        </div>

        <div className="form-group">
          <label className="form-label">Address *</label>
          <input className="form-input" placeholder="Full street address" value={form.address} onChange={e => setForm({ ...form, address: e.target.value })} />
        </div>

        <div className="form-row">
          <div className="form-group">
            <label className="form-label">City *</label>
            <input className="form-input" placeholder="City" value={form.city} onChange={e => setForm({ ...form, city: e.target.value })} />
          </div>
          <div className="form-group">
            <label className="form-label">State *</label>
            <input className="form-input" placeholder="State" value={form.state} onChange={e => setForm({ ...form, state: e.target.value })} />
          </div>
        </div>

        <div className="form-group">
          <label className="form-label">Pincode *</label>
          <input className="form-input" placeholder="600001" value={form.pincode} onChange={e => setForm({ ...form, pincode: e.target.value })} />
        </div>

        <div style={{ display: 'flex', gap: 20 }}>
          <label style={{ display: 'flex', gap: 8, alignItems: 'center', cursor: 'pointer', fontSize: '0.9rem' }}>
            <input type="checkbox" checked={form.furniture_included} onChange={e => setForm({ ...form, furniture_included: e.target.checked })} />
            🛋️ Furniture Included
          </label>
          <label style={{ display: 'flex', gap: 8, alignItems: 'center', cursor: 'pointer', fontSize: '0.9rem' }}>
            <input type="checkbox" checked={form.loan_eligible} onChange={e => setForm({ ...form, loan_eligible: e.target.checked })} />
            🏦 Loan Eligible
          </label>
        </div>

        <button className="btn btn-primary" onClick={handleSubmit} disabled={loading}>
          {loading ? 'Submitting...' : '📢 Submit Listing for Review'}
        </button>
      </div>
    </div>
  );
}

// ========= LOANS PAGE =========
function LoansPage({ user, setPage, showToast }) {
  const [form, setForm] = useState({ loan_amount_requested: '', loan_purpose: '', annual_income: '', existing_loans: 0 });
  const [loading, setLoading] = useState(false);

  if (!user) return (
    <div className="flex-center" style={{ minHeight: '60vh', flexDirection: 'column', gap: 16 }}>
      <div style={{ fontSize: '3rem' }}>🏦</div>
      <div style={{ fontSize: '1.2rem', fontWeight: 700 }}>Sign in to Apply for Loans</div>
      <button className="btn btn-primary" onClick={() => setPage('login')}>Sign In</button>
    </div>
  );

  return (
    <div style={{ maxWidth: 600, margin: '0 auto', padding: '32px 24px' }} className="fade-in">
      <h1 style={{ fontSize: '1.8rem', fontWeight: 900, marginBottom: 6 }}>🏦 NBFC Loan Application</h1>
      <p style={{ color: 'var(--text-dim)', marginBottom: 28 }}>Apply for business purchase loans with our trusted NBFC partners. Competitive interest rates.</p>

      <div style={{ background: 'linear-gradient(135deg, rgba(74,222,128,0.1), rgba(22,163,74,0.05))', border: '1px solid var(--border)', borderRadius: 'var(--radius)', padding: 20, marginBottom: 24 }}>
        <div style={{ fontWeight: 800, marginBottom: 8 }}>💡 Loan Features</div>
        <ul style={{ color: 'var(--text-dim)', fontSize: '0.875rem', paddingLeft: 18, lineHeight: 2 }}>
          <li>Loan amount up to ₹50 Lakhs</li>
          <li>Competitive interest rates from NBFC partners</li>
          <li>Flexible tenure 12-84 months</li>
          <li>Quick processing for KYC verified users</li>
        </ul>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        <div className="form-group">
          <label className="form-label">Loan Amount Required (₹)</label>
          <input className="form-input" type="number" placeholder="500000" value={form.loan_amount_requested} onChange={e => setForm({ ...form, loan_amount_requested: e.target.value })} />
        </div>
        <div className="form-group">
          <label className="form-label">Purpose of Loan</label>
          <textarea className="form-input" rows={3} placeholder="Business purchase details..." value={form.loan_purpose} onChange={e => setForm({ ...form, loan_purpose: e.target.value })} />
        </div>
        <div className="form-row">
          <div className="form-group">
            <label className="form-label">Annual Income (₹)</label>
            <input className="form-input" type="number" value={form.annual_income} onChange={e => setForm({ ...form, annual_income: e.target.value })} />
          </div>
          <div className="form-group">
            <label className="form-label">Existing Loan EMIs (₹/month)</label>
            <input className="form-input" type="number" value={form.existing_loans} onChange={e => setForm({ ...form, existing_loans: e.target.value })} />
          </div>
        </div>
        <button className="btn btn-primary" disabled={loading} onClick={() => { showToast('Loan application submitted! Our team will contact you shortly.', 'success'); }}>
          {loading ? 'Submitting...' : '🏦 Submit Loan Application'}
        </button>
      </div>
    </div>
  );
}

// ========= PROFILE PAGE =========
function ProfilePage({ user, setUser, showToast, setPage }) {
  const [tab, setTab] = useState('profile');
  const [form, setForm] = useState({ full_name: user?.full_name || '', address: user?.address || '', city: user?.city || '', state: user?.state || '', pincode: user?.pincode || '' });
  const [pwForm, setPwForm] = useState({ old_password: '', new_password: '', new_password2: '' });

  if (!user) return (
    <div className="flex-center" style={{ minHeight: '60vh', flexDirection: 'column', gap: 16 }}>
      <div className="btn btn-primary" onClick={() => setPage('login')}>Please Sign In</div>
    </div>
  );

  const roleLabels = { end_user: 'Customer', admin: 'Admin', internal: 'Internal', field_person: 'Field Person', mediator: 'Mediator', customer_care: 'Customer Care' };

  return (
    <div className="profile-page fade-in">
      <div className="profile-header">
        <div className="profile-avatar">👤</div>
        <div className="profile-info">
          <h2>{user.full_name}</h2>
          <div style={{ color: 'var(--text-dim)', fontSize: '0.85rem' }}>{user.phone_number}</div>
          <span className="profile-role-badge">{roleLabels[user.role] || user.role}</span>
          <div className="kyc-status">
            <div className={`kyc-dot ${user.verification_status === 'verified' ? 'verified' : user.verification_status === 'pending' ? 'pending' : ''}`} />
            KYC: {user.verification_status || 'Not Submitted'}
          </div>
        </div>
      </div>

      <div className="tabs">
        {['profile', 'kyc', 'security', 'my-listings'].map(t => (
          <button key={t} className={`tab-btn ${tab === t ? 'active' : ''}`} onClick={() => setTab(t)}>
            {{ profile: '👤 Profile', kyc: '📋 KYC Docs', security: '🔒 Security', 'my-listings': '📝 My Listings' }[t]}
          </button>
        ))}
      </div>

      {tab === 'profile' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <div className="form-group">
            <label className="form-label">Full Name</label>
            <input className="form-input" value={form.full_name} onChange={e => setForm({ ...form, full_name: e.target.value })} />
          </div>
          <div className="form-group">
            <label className="form-label">Address</label>
            <textarea className="form-input" rows={2} value={form.address} onChange={e => setForm({ ...form, address: e.target.value })} />
          </div>
          <div className="form-row">
            <div className="form-group">
              <label className="form-label">City</label>
              <input className="form-input" value={form.city} onChange={e => setForm({ ...form, city: e.target.value })} />
            </div>
            <div className="form-group">
              <label className="form-label">State</label>
              <input className="form-input" value={form.state} onChange={e => setForm({ ...form, state: e.target.value })} />
            </div>
          </div>
          <div className="form-group">
            <label className="form-label">Pincode</label>
            <input className="form-input" value={form.pincode} onChange={e => setForm({ ...form, pincode: e.target.value })} />
          </div>
          <button className="btn btn-primary" onClick={() => showToast('Profile updated!', 'success')}>Save Changes</button>
        </div>
      )}

      {tab === 'kyc' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <div style={{ background: 'rgba(251,191,36,0.1)', border: '1px solid rgba(251,191,36,0.3)', borderRadius: 10, padding: 14, color: '#fbbf24', fontSize: '0.875rem' }}>
            ⚠️ Upload clear photos/scans of your documents. All documents are reviewed by our admin team.
          </div>
          {[['pan_card', '🪪 PAN Card'], ['aadhar_card', '🪪 Aadhar Card'], ['food_license', '🍽️ Food License'], ['drug_license', '💊 Drug License'], ['profile_photo', '📷 Profile Photo']].map(([key, label]) => (
            <div key={key} className="form-group">
              <label className="form-label">{label}</label>
              <input className="form-input" type="file" accept="image/*,.pdf" />
            </div>
          ))}
          <button className="btn btn-primary" onClick={() => showToast('KYC documents uploaded! Pending admin review.', 'success')}>📤 Upload Documents</button>
        </div>
      )}

      {tab === 'security' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <div className="form-group"><label className="form-label">Current Password</label><input className="form-input" type="password" value={pwForm.old_password} onChange={e => setPwForm({ ...pwForm, old_password: e.target.value })} /></div>
          <div className="form-group"><label className="form-label">New Password</label><input className="form-input" type="password" value={pwForm.new_password} onChange={e => setPwForm({ ...pwForm, new_password: e.target.value })} /></div>
          <div className="form-group"><label className="form-label">Confirm New Password</label><input className="form-input" type="password" value={pwForm.new_password2} onChange={e => setPwForm({ ...pwForm, new_password2: e.target.value })} /></div>
          <button className="btn btn-primary" onClick={() => showToast('Password changed successfully!', 'success')}>Change Password</button>
        </div>
      )}

      {tab === 'my-listings' && (
        <div>
          <div style={{ color: 'var(--text-dim)', textAlign: 'center', padding: '40px 0' }}>
            <div style={{ fontSize: '2.5rem', marginBottom: 12 }}>📝</div>
            <div>You haven't posted any listings yet.</div>
            <button className="btn btn-primary" style={{ marginTop: 16 }} onClick={() => setPage('sell')}>Post a Listing</button>
          </div>
        </div>
      )}
    </div>
  );
}

// ========= ADMIN PAGE =========
function AdminPage({ user, showToast }) {
  const mockUsers = [
    { id: 1, full_name: 'Rajesh Kumar', phone_number: '9876543210', role: 'end_user', verification_status: 'pending', role_label: 'Customer' },
    { id: 2, full_name: 'Priya Sharma', phone_number: '9123456789', role: 'mediator', verification_status: 'verified', role_label: 'Mediator' },
    { id: 3, full_name: 'Arun Medical', phone_number: '9988776655', role: 'end_user', verification_status: 'pending', role_label: 'Customer' },
  ];
  const mockListings = [
    { id: 1, title: 'Tea Shop, Chennai', owner: 'Rajesh Kumar', status: 'pending', price: '₹3.5L' },
    { id: 2, title: 'Cafe, Bangalore', owner: 'Priya Sharma', status: 'approved', price: '₹12L' },
  ];
  const [activeSection, setActiveSection] = useState('users');

  if (!user || user.role !== 'admin') {
    return <div className="flex-center" style={{ minHeight: '60vh', flexDirection: 'column', gap: 12 }}><div style={{ fontSize: '3rem' }}>🔒</div><div>Admin Access Only</div></div>;
  }

  return (
    <div className="admin-page fade-in">
      <h1 style={{ fontSize: '1.8rem', fontWeight: 900, marginBottom: 24 }}>⚙️ Admin Dashboard</h1>

      <div className="admin-stats">
        {[['👥', '3', 'Total Users'], ['📋', '2', 'Listings'], ['⏳', '2', 'Pending KYC'], ['💰', '1', 'Loan Applications']].map(([icon, num, label]) => (
          <div key={label} className="stat-card">
            <div style={{ fontSize: '1.5rem' }}>{icon}</div>
            <div className="stat-number">{num}</div>
            <div className="stat-label">{label}</div>
          </div>
        ))}
      </div>

      <div className="tabs" style={{ marginBottom: 24 }}>
        <button className={`tab-btn ${activeSection === 'users' ? 'active' : ''}`} onClick={() => setActiveSection('users')}>👥 Users & KYC</button>
        <button className={`tab-btn ${activeSection === 'listings' ? 'active' : ''}`} onClick={() => setActiveSection('listings')}>📋 Listings</button>
        <button className={`tab-btn ${activeSection === 'loans' ? 'active' : ''}`} onClick={() => setActiveSection('loans')}>🏦 Loans</button>
        <button className={`tab-btn ${activeSection === 'queries' ? 'active' : ''}`} onClick={() => setActiveSection('queries')}>💬 Queries</button>
      </div>

      {activeSection === 'users' && (
        <div className="card">
          <div style={{ overflowX: 'auto' }}>
            <table className="data-table">
              <thead>
                <tr><th>Name</th><th>Phone</th><th>Role</th><th>KYC Status</th><th>Actions</th></tr>
              </thead>
              <tbody>
                {mockUsers.map(u => (
                  <tr key={u.id}>
                    <td style={{ fontWeight: 600 }}>{u.full_name}</td>
                    <td>{u.phone_number}</td>
                    <td style={{ color: 'var(--text-muted)' }}>{u.role_label}</td>
                    <td><span className={`status-badge status-${u.verification_status}`}>{u.verification_status}</span></td>
                    <td>
                      <div style={{ display: 'flex', gap: 6 }}>
                        <button className="btn btn-primary btn-sm" onClick={() => showToast(`${u.full_name} approved!`, 'success')}>✅ Approve</button>
                        <button className="btn btn-danger btn-sm" onClick={() => showToast(`${u.full_name} rejected!`, 'error')}>❌ Reject</button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {activeSection === 'listings' && (
        <div className="card">
          <div style={{ overflowX: 'auto' }}>
            <table className="data-table">
              <thead><tr><th>Title</th><th>Owner</th><th>Price</th><th>Status</th><th>Actions</th></tr></thead>
              <tbody>
                {mockListings.map(l => (
                  <tr key={l.id}>
                    <td style={{ fontWeight: 600 }}>{l.title}</td>
                    <td>{l.owner}</td>
                    <td style={{ color: 'var(--primary)', fontWeight: 700 }}>{l.price}</td>
                    <td><span className={`status-badge status-${l.status}`}>{l.status}</span></td>
                    <td>
                      <div style={{ display: 'flex', gap: 6 }}>
                        <button className="btn btn-primary btn-sm" onClick={() => showToast('Listing approved!', 'success')}>✅ Approve</button>
                        <button className="btn btn-danger btn-sm" onClick={() => showToast('Listing rejected!', 'error')}>❌ Reject</button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {activeSection === 'loans' && (
        <div className="card" style={{ textAlign: 'center', padding: '40px', color: 'var(--text-dim)' }}>
          <div style={{ fontSize: '3rem', marginBottom: 12 }}>🏦</div>
          <div>No loan applications yet.</div>
        </div>
      )}

      {activeSection === 'queries' && (
        <div className="card" style={{ textAlign: 'center', padding: '40px', color: 'var(--text-dim)' }}>
          <div style={{ fontSize: '3rem', marginBottom: 12 }}>💬</div>
          <div>No pending queries.</div>
        </div>
      )}
    </div>
  );
}

// ========= CONTACT PAGE =========
function ContactPage({ user, showToast }) {
  const [form, setForm] = useState({ name: user?.full_name || '', phone: user?.phone_number || '', email: user?.email || '', message: '', query_type: 'contact' });

  return (
    <div style={{ maxWidth: 600, margin: '0 auto', padding: '40px 24px' }} className="fade-in">
      <h1 style={{ fontSize: '1.8rem', fontWeight: 900, marginBottom: 6 }}>📞 Connect With Us</h1>
      <p style={{ color: 'var(--text-dim)', marginBottom: 28 }}>Have questions or feedback? Our team is here to help.</p>

      <div style={{ display: 'flex', gap: 8, marginBottom: 20 }}>
        <button className={`role-tab ${form.query_type === 'contact' ? 'active' : ''}`} onClick={() => setForm({ ...form, query_type: 'contact' })}>📞 Connect Us</button>
        <button className={`role-tab ${form.query_type === 'tell_us' ? 'active' : ''}`} onClick={() => setForm({ ...form, query_type: 'tell_us' })}>💬 Tell Us</button>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        <div className="form-row">
          <div className="form-group">
            <label className="form-label">Your Name *</label>
            <input className="form-input" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} />
          </div>
          <div className="form-group">
            <label className="form-label">Phone Number</label>
            <input className="form-input" value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })} />
          </div>
        </div>
        <div className="form-group">
          <label className="form-label">Email</label>
          <input className="form-input" type="email" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} />
        </div>
        <div className="form-group">
          <label className="form-label">Your Message *</label>
          <textarea className="form-input" rows={5} placeholder="Tell us what's on your mind..." value={form.message} onChange={e => setForm({ ...form, message: e.target.value })} />
        </div>
        <button className="btn btn-primary" onClick={() => showToast('Message sent! We\'ll get back to you within 24 hours.', 'success')}>📤 Send Message</button>
      </div>

      <div style={{ marginTop: 40, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
        {[['📧', 'Email', 'support@samisuits.com'], ['📱', 'WhatsApp', '+91 98765 43210'], ['🏢', 'Head Office', 'Chennai, Tamil Nadu'], ['⏰', 'Working Hours', 'Mon-Sat, 9AM-6PM']].map(([icon, label, value]) => (
          <div key={label} className="card" style={{ padding: 16 }}>
            <div style={{ fontSize: '1.5rem', marginBottom: 6 }}>{icon}</div>
            <div style={{ fontWeight: 700, fontSize: '0.85rem', marginBottom: 4, color: 'var(--text-muted)' }}>{label}</div>
            <div style={{ fontSize: '0.85rem', color: 'var(--text-dim)' }}>{value}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ========= ABOUT PAGE =========
function AboutPage() {
  return (
    <div style={{ maxWidth: 800, margin: '0 auto', padding: '40px 24px' }} className="fade-in">
      <div style={{ textAlign: 'center', marginBottom: 40 }}>
        <div style={{ fontSize: '4rem', marginBottom: 12 }}>🏪</div>
        <h1 style={{ fontSize: '2.5rem', fontWeight: 900 }}>About <span className="text-primary">Sale Suit</span></h1>
        <p style={{ color: 'var(--text-dim)', fontSize: '1.05rem', marginTop: 10 }}>India's most trusted business marketplace, by Samisuits</p>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
        {[
          { title: 'Our Mission', content: 'Sale Suit connects business buyers and sellers across India with trust, transparency, and technology. We specialize in helping entrepreneurs find the right business opportunities.' },
          { title: 'KYC Verification', content: 'Every user on our platform goes through a rigorous verification process including PAN Card, Aadhar Card, Food License, and Drug License verification. This ensures a safe marketplace for everyone.' },
          { title: 'NBFC Loan Support', content: 'We partner with leading NBFCs to provide financing options for business buyers. Our loan support helps entrepreneurs acquire businesses even with limited capital.' },
          { title: 'Our Categories', content: 'We support Tea Shops, Restaurants, Cafes, Medical Shops, Food Trucks, Supermarkets and more. If it\'s a business, it belongs on Sale Suit.' },
        ].map(item => (
          <div key={item.title} className="card">
            <div style={{ fontWeight: 800, fontSize: '1.1rem', marginBottom: 10, color: 'var(--primary)' }}>{item.title}</div>
            <p style={{ color: 'var(--text-dim)', lineHeight: 1.8 }}>{item.content}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

// ========= DOCS PAGE =========
function DocsPage() {
  return (
    <div style={{ height: 'calc(100vh - 100px)', padding: '20px' }} className="fade-in">
      <iframe 
        src="/api_explorer.html" 
        style={{ width: '100%', height: '100%', border: 'none', borderRadius: '12px', background: 'var(--card)' }}
        title="API Documentation"
      ></iframe>
    </div>
  );
}

// ========= MAIN APP =========
export default function App() {
  const [page, setPage] = useState('home');
  const [user, setUser] = useState(null);
  const [theme, setTheme] = useState('light');
  const [toasts, setToasts] = useState([]);
  const [filter, setFilter] = useState({});
  const [selectedListing, setSelectedListing] = useState(null);

  useEffect(() => {
    document.documentElement.className = theme === 'light' ? 'light-theme' : '';
  }, [theme]);

  const toggleTheme = () => setTheme(t => t === 'dark' ? 'light' : 'dark');

  const showToast = (msg, type = 'success') => {
    const id = Date.now();
    setToasts(prev => [...prev, { id, msg, type }]);
    setTimeout(() => setToasts(prev => prev.filter(t => t.id !== id)), 4000);
  };

  const handleLogout = async () => {
    try { await api('/auth/logout/', 'POST'); } catch (e) { }
    setUser(null);
    setPage('home');
    showToast('Logged out successfully.', 'success');
  };

  const handleLogin = (userData) => {
    setUser(userData);
    setPage('home');
  };

  return (
    <div className="app-shell">
      <Navbar page={page} setPage={setPage} user={user} theme={theme} toggleTheme={toggleTheme} onLogout={handleLogout} />
      <main className="main-content">
        {page === 'home' && <HomePage setPage={setPage} setFilter={setFilter} user={user} />}
        {page === 'login' && <LoginPage setPage={setPage} onLogin={handleLogin} showToast={showToast} />}
        {page === 'listings' && <ListingsPage filter={filter} setFilter={setFilter} setPage={setPage} setSelectedListing={setSelectedListing} />}
        {page === 'listing-detail' && <ListingDetailPage listing={selectedListing} setPage={setPage} user={user} showToast={showToast} />}
        {page === 'sell' && <SellPage user={user} setPage={setPage} showToast={showToast} />}
        {page === 'loans' && <LoansPage user={user} setPage={setPage} showToast={showToast} />}
        {page === 'profile' && <ProfilePage user={user} setUser={setUser} showToast={showToast} setPage={setPage} />}
        {page === 'admin' && <AdminPage user={user} showToast={showToast} />}
        {page === 'contact' && <ContactPage user={user} showToast={showToast} />}
        {page === 'about' && <AboutPage />}
        {page === 'docs' && <DocsPage />}
      </main>

      {/* Footer */}
      <footer style={{ borderTop: '1px solid var(--border)', padding: '24px', textAlign: 'center', color: 'var(--text-dim)', fontSize: '0.85rem' }}>
        <div style={{ fontWeight: 700, color: 'var(--primary)', marginBottom: 6 }}>🏪 Sale Suit by Samisuits</div>
        <div>India's Trusted Business Marketplace · © 2024 Samisuits · All Rights Reserved</div>
      </footer>

      <Toast toasts={toasts} />
    </div>
  );
}
