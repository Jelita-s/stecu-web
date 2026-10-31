// ===== KERANJANG BELANJA — Finally Found You =====
// Disimpan di localStorage (kunci: ffy_cart), dipakai bersama di semua halaman.
// Bentuk item: { id, name, price, image, link, qty }
// Muat file ini SEBELUM js/ui.js. addToCart() butuh js/data.js (PRODUCTS) dan ffyToast() dari js/ui.js.

const FFY_CART_KEY = 'ffy_cart';
const FFY_CART_MAX_QTY = 99;

function loadCart() {
  try {
    const raw = localStorage.getItem(FFY_CART_KEY);
    const items = raw ? JSON.parse(raw) : [];
    if (!Array.isArray(items)) return [];
    return items
      .filter(i => i && Number.isFinite(Number(i.id)) && Number.isFinite(Number(i.price)))
      .map(i => ({
        id: Number(i.id),
        name: String(i.name || ''),
        price: Number(i.price),
        image: i.image || '',
        link: i.link || '',
        qty: Math.min(FFY_CART_MAX_QTY, Math.max(1, parseInt(i.qty, 10) || 1))
      }));
  } catch (e) {
    return [];
  }
}

function saveCart(items) {
  try {
    localStorage.setItem(FFY_CART_KEY, JSON.stringify(items));
  } catch (e) { /* localStorage tidak tersedia — abaikan */ }
  updateCartBadge();
}

function cartCount() {
  return loadCart().reduce((sum, i) => sum + i.qty, 0);
}

function updateCartBadge() {
  const badge = document.getElementById('cartBadge');
  if (badge) badge.textContent = cartCount();
}

function addToCart(id, btn) {
  const product = (typeof PRODUCTS !== 'undefined') ? PRODUCTS.find(p => p.id === id) : null;
  if (!product) return;

  const items = loadCart();
  const existing = items.find(i => i.id === id);

  if (existing) {
    if (existing.qty >= FFY_CART_MAX_QTY) {
      if (typeof ffyToast === 'function') ffyToast('Jumlah maksimal per produk ' + FFY_CART_MAX_QTY);
      return;
    }
    existing.qty += 1;
  } else {
    items.push({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      link: product.link,
      qty: 1
    });
  }

  saveCart(items);
  if (typeof ffyToast === 'function') ffyToast('Ditambahkan ke keranjang 🛍️');

  if (btn) {
    btn.classList.add('added');
    btn.textContent = '✓';
    setTimeout(() => {
      btn.classList.remove('added');
      btn.textContent = '🛒';
    }, 1200);
  }
}

// Badge ikut berubah kalau keranjang diubah di tab lain
window.addEventListener('storage', e => {
  if (e.key === FFY_CART_KEY) updateCartBadge();
});
document.addEventListener('DOMContentLoaded', updateCartBadge);