// ===== SHARED UI HELPERS — Finally Found You =====
// Used across catalog.html, req.html, and every page's header.

/* ---------- Toast ---------- */
function ffyToast(message) {
  let el = document.getElementById('ffyToast');
  if (!el) {
    el = document.createElement('div');
    el.id = 'ffyToast';
    el.className = 'ui-toast';
    document.body.appendChild(el);
  }
  el.textContent = message;
  el.classList.add('show');
  clearTimeout(el._t);
  el._t = setTimeout(() => el.classList.remove('show'), 2400);
}

/* ---------- Header icons (cart / account) ---------- */
function initHeaderIcons() {
  const cartBtn = document.getElementById('cartBtn');
  const accountBtn = document.getElementById('accountBtn');
  if (cartBtn) {
    cartBtn.addEventListener('click', () => ffyToast('🛒 Keranjang belanja segera hadir!'));
  }
  if (accountBtn) {
    accountBtn.addEventListener('click', () => ffyToast('👤 Fitur akun sedang dalam pengembangan.'));
  }
}

/* ---------- Wishlist (in-memory for this session) ---------- */
const ffyWishlist = new Set();

function toggleWishlist(id, btn) {
  if (ffyWishlist.has(id)) {
    ffyWishlist.delete(id);
    btn.classList.remove('active');
    btn.textContent = '♡';
    ffyToast('Dihapus dari wishlist');
  } else {
    ffyWishlist.add(id);
    btn.classList.add('active');
    btn.textContent = '❤';
    ffyToast('Ditambahkan ke wishlist ✨');
  }
}

/* ---------- Star rating markup ---------- */
function starsHTML(rating) {
  const full = Math.floor(rating);
  const half = rating - full >= 0.5;
  let out = '★'.repeat(full);
  if (half) out += '⯨';
  out += '☆'.repeat(5 - full - (half ? 1 : 0));
  return out;
}

/* ---------- Product visual: real photo ---------- */
function productVisualHTML(p) {
  return `<img src="${p.image}" alt="${p.name}" loading="lazy">`;
}

/* ---------- Product card markup (shared by catalog + recommendation grids) ---------- */
function productCardHTML(p) {
  const rating = p.rating != null ? p.rating : 4.5;
  const reviews = p.reviews != null ? p.reviews : 0;
  return `
    <div class="product-card">
      <div class="product-media">
        <span class="category-tag tag-${p.category}">${p.category}</span>
        <button class="wishlist-btn" onclick="toggleWishlist(${p.id}, this)" aria-label="Simpan ke wishlist">♡</button>
        <div class="product-visual">${productVisualHTML(p)}</div>
      </div>
      <div class="product-info">
        <h3>${p.name}</h3>
        <p>${p.desc}</p>
        <div class="rating-row">
          <span class="stars">${starsHTML(rating)}</span>
          <span class="rating-count">${rating.toFixed(1)} (${reviews})</span>
        </div>
        <span class="price">Rp ${p.price.toLocaleString('id-ID')}</span>
        <a href="${p.link}" target="_blank" class="btn-buy">🛍️ Lihat Detail</a>
      </div>
    </div>`;
}

document.addEventListener('DOMContentLoaded', initHeaderIcons);