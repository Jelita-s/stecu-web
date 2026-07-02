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

/* ---------- Header icons (cart / wishlist / account) ---------- */


/* ---------- Wishlist (persisted in localStorage, shared across pages) ---------- */
const FFY_WISHLIST_KEY = 'ffy_wishlist';

function loadWishlist() {
  try {
    const raw = localStorage.getItem(FFY_WISHLIST_KEY);
    const ids = raw ? JSON.parse(raw) : [];
    return new Set(Array.isArray(ids) ? ids : []);
  } catch (e) {
    return new Set();
  }
}

function saveWishlist() {
  try {
    localStorage.setItem(FFY_WISHLIST_KEY, JSON.stringify([...ffyWishlist]));
  } catch (e) { /* localStorage unavailable — fail silently */ }
}

const ffyWishlist = loadWishlist();

function isWishlisted(id) {
  return ffyWishlist.has(id);
}

function updateWishlistBadge() {
  const badge = document.getElementById('wishlistBadge');
  if (badge) badge.textContent = ffyWishlist.size;
}

function toggleWishlist(id, btn) {
  if (ffyWishlist.has(id)) {
    ffyWishlist.delete(id);
    if (btn) {
      btn.classList.remove('active');
      btn.textContent = '♡';
      btn.setAttribute('aria-pressed', 'false');
    }
    ffyToast('Dihapus dari wishlist');
  } else {
    ffyWishlist.add(id);
    if (btn) {
      btn.classList.add('active');
      btn.textContent = '❤';
      btn.setAttribute('aria-pressed', 'true');
    }
    ffyToast('Ditambahkan ke wishlist ✨');
  }
  saveWishlist();
  updateWishlistBadge();

  // Kalau lagi di halaman wishlist.html, list-nya langsung update
  if (typeof renderWishlistPage === 'function') renderWishlistPage();
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
  const wished = isWishlisted(p.id);
  return `
    <div class="product-card">
      <div class="product-media">
        <span class="category-tag tag-${p.category}">${p.category}</span>
        <button class="wishlist-btn${wished ? ' active' : ''}" onclick="toggleWishlist(${p.id}, this)" aria-label="Simpan ke wishlist" aria-pressed="${wished}">${wished ? '❤' : '♡'}</button>
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

document.addEventListener('DOMContentLoaded', initHeaderIcons)