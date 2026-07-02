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

/* ---------- Category -> product illustration (inline SVG) ---------- */
const CATEGORY_TINT = {
  serum:       '#7c3aed',
  moisturizer: '#db2777',
  cleanser:    '#059669',
  toner:       '#2563eb',
  sunscreen:   '#d97706',
  mask:        '#e11d48',
  body:        '#16a34a',
  lip:         '#e11d48'
};

function productIcon(category) {
  const c = CATEGORY_TINT[category] || '#7c3aed';
  switch (category) {
    case 'serum':
      return `<svg viewBox="0 0 100 130" fill="none"><path d="M38 8h24v18l10 10v78a8 8 0 0 1-8 8H36a8 8 0 0 1-8-8V36l10-10V8z" fill="${c}" opacity=".18"/><rect x="38" y="8" width="24" height="16" rx="2" fill="${c}"/><path d="M32 40h36v78a6 6 0 0 1-6 6H38a6 6 0 0 1-6-6V40z" fill="#fff" stroke="${c}" stroke-width="3"/><path d="M32 92h36v20a6 6 0 0 1-6 6H38a6 6 0 0 1-6-6V92z" fill="${c}" opacity=".85"/><circle cx="50" cy="16" r="3.2" fill="#fff"/></svg>`;
    case 'moisturizer':
      return `<svg viewBox="0 0 120 120" fill="none"><rect x="18" y="34" width="84" height="72" rx="14" fill="#fff" stroke="${c}" stroke-width="3.5"/><rect x="18" y="34" width="84" height="22" rx="10" fill="${c}" opacity=".85"/><rect x="30" y="14" width="60" height="24" rx="8" fill="${c}"/><circle cx="60" cy="78" r="16" fill="${c}" opacity=".16"/><circle cx="60" cy="78" r="7" fill="${c}"/></svg>`;
    case 'cleanser':
      return `<svg viewBox="0 0 100 140" fill="none"><rect x="24" y="46" width="52" height="82" rx="12" fill="#fff" stroke="${c}" stroke-width="3.5"/><rect x="24" y="46" width="52" height="26" fill="${c}" opacity=".85"/><rect x="38" y="18" width="24" height="30" rx="6" fill="${c}"/><path d="M62 22h14a6 6 0 0 1 6 6v6a6 6 0 0 1-6 6H62V22z" fill="${c}" opacity=".7"/><rect x="38" y="6" width="10" height="14" rx="3" fill="${c}"/></svg>`;
    case 'toner':
      return `<svg viewBox="0 0 100 140" fill="none"><rect x="26" y="40" width="48" height="88" rx="10" fill="#fff" stroke="${c}" stroke-width="3.5"/><rect x="26" y="40" width="48" height="20" fill="${c}" opacity=".85"/><rect x="40" y="18" width="20" height="24" rx="5" fill="${c}"/><rect x="44" y="6" width="12" height="14" rx="3" fill="${c}" opacity=".7"/></svg>`;
    case 'sunscreen':
      return `<svg viewBox="0 0 100 140" fill="none"><path d="M30 46h40l6 74a8 8 0 0 1-8 8H32a8 8 0 0 1-8-8l6-74z" fill="#fff" stroke="${c}" stroke-width="3.5"/><path d="M30 46h40l2 24H28l2-24z" fill="${c}" opacity=".85"/><rect x="36" y="14" width="28" height="34" rx="8" fill="${c}"/><circle cx="50" cy="100" r="14" fill="${c}" opacity=".15"/><path d="M50 90v20M40 100h20M43 93l14 14M57 93l-14 14" stroke="${c}" stroke-width="2.5" stroke-linecap="round"/></svg>`;
    case 'mask':
      return `<svg viewBox="0 0 120 100" fill="none"><rect x="10" y="14" width="100" height="72" rx="16" fill="#fff" stroke="${c}" stroke-width="3.5"/><path d="M10 30h100" stroke="${c}" stroke-width="3"/><circle cx="60" cy="58" r="18" fill="${c}" opacity=".18"/><path d="M52 58a8 8 0 0 1 16 0" stroke="${c}" stroke-width="3" fill="none" stroke-linecap="round"/></svg>`;
    case 'body':
      return `<svg viewBox="0 0 100 140" fill="none"><rect x="20" y="42" width="60" height="86" rx="14" fill="#fff" stroke="${c}" stroke-width="3.5"/><rect x="20" y="42" width="60" height="24" fill="${c}" opacity=".85"/><rect x="34" y="16" width="32" height="28" rx="7" fill="${c}"/><path d="M66 20h12a6 6 0 0 1 6 6v4a6 6 0 0 1-6 6H66V20z" fill="${c}" opacity=".7"/></svg>`;
    case 'lip':
      return `<svg viewBox="0 0 70 140" fill="none"><rect x="18" y="52" width="34" height="76" rx="10" fill="#fff" stroke="${c}" stroke-width="3.5"/><rect x="18" y="52" width="34" height="20" fill="${c}" opacity=".85"/><path d="M22 20c0-8 6-14 13-14s13 6 13 14v34H22V20z" fill="${c}"/></svg>`;
    default:
      return `<svg viewBox="0 0 100 100" fill="none"><circle cx="50" cy="50" r="34" fill="${c}" opacity=".2"/></svg>`;
  }
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
        <div class="product-visual">${productIcon(p.category)}</div>
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
