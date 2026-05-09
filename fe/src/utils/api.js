// ===== API CONFIG =====
const API = 'https://sale-suit-be.onrender.com';

export const api = async (endpoint, method = 'GET', body = null, isForm = false) => {
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

// ===== CATEGORY ICONS =====
export const CATEGORY_ICONS = {
  tea_shop: '🍵', restaurant: '🍽️', medical: '💊',
  continental_cafe: '☕', supermarket: '🛒', furniture: '🪑',
  shop_equipments: '🛠️', interior_design: '🎨', other: '🏪',
};

export const CAT_LABELS = {
  '': 'All',
  tea_shop: 'Tea Shop',
  medical: 'Medical',
  continental_cafe: 'Continental Cafe',
  restaurant: 'Restaurant',
  supermarket: 'Supermarkets',
  furniture: 'Furniture',
  shop_equipments: 'Shop Equipments',
  interior_design: 'Interior Design',
  other: 'Other',
};
