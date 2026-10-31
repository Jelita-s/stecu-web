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
function initHeaderIcons() {
  const accountBtn = document.getElementById('accountBtn');
  if (accountBtn) {
    accountBtn.addEventListener('click', () => ffyToast('👤 Fitur akun sedang dalam pengembangan.'));
  }
  updateWishlistBadge();
  if (typeof updateCartBadge === 'function') updateCartBadge();
}

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
        <div class="buy-row">
          <a href="${p.link}" target="_blank" class="btn-buy">🛍️ Lihat Detail</a>
          <button class="btn-cart-icon" onclick="addToCart(${p.id}, this)" aria-label="Tambah ke keranjang" title="Tambah ke keranjang">🛒</button>
        </div>
      </div>
    </div>`;
}

/* =====================================================================
   TAMBAHAN: LOGIN & DAFTAR AKUN — Finally Found You
   Tempel blok ini di PALING BAWAH ui.js. Kode di atasnya tidak diubah.
   Data akun disimpan di localStorage (simulasi, bukan server).
   ===================================================================== */
;(function () {
  'use strict';

  const USERS_KEY = 'ffy_users';
  const SESSION_KEY = 'ffy_session';
  const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // wajib memakai @ dan domain

  /* ---------- Penyimpanan ---------- */
  function readJSON(storage, key, fallback) {
    try {
      const raw = storage.getItem(key);
      return raw ? JSON.parse(raw) : fallback;
    } catch (e) { return fallback; }
  }

  function getUsers() { return readJSON(localStorage, USERS_KEY, []); }

  function authError(code, message) {
    const err = new Error(message);
    err.code = code;
    return err;
  }

  /* ---------- Hash kata sandi ---------- */
  function hashPassword(password) {
    const data = new TextEncoder().encode('ffy::' + password);
    if (window.crypto && window.crypto.subtle) {
      return window.crypto.subtle.digest('SHA-256', data).then(buf =>
        Array.from(new Uint8Array(buf)).map(b => b.toString(16).padStart(2, '0')).join('')
      );
    }
    return Promise.resolve('b64:' + btoa(unescape(encodeURIComponent(password))));
  }

  /* ---------- API akun ---------- */
  function registerUser(name, email, password) {
    email = email.trim().toLowerCase();
    const users = getUsers();
    if (users.some(u => u.email === email)) {
      return Promise.reject(authError('EXISTS', 'Akun sudah ada. Silakan masuk.'));
    }
    return hashPassword(password).then(hash => {
      users.push({ name: name.trim(), email: email, hash: hash, createdAt: Date.now() });
      try {
        localStorage.setItem(USERS_KEY, JSON.stringify(users));
      } catch (e) {
        throw authError('STORAGE', 'Data tidak bisa disimpan. Periksa pengaturan browser kamu.');
      }
      return { name: name.trim(), email: email };
    });
  }

  function loginUser(email, password, remember) {
    email = email.trim().toLowerCase();
    const user = getUsers().find(u => u.email === email);
    if (!user) {
      return Promise.reject(authError('NO_ACCOUNT', 'Akun belum terdaftar. Silakan daftar dulu.'));
    }
    return hashPassword(password).then(hash => {
      if (hash !== user.hash) throw authError('WRONG_PASSWORD', 'Kata sandi salah.');
      const session = { name: user.name, email: user.email, at: Date.now() };
      sessionStorage.removeItem(SESSION_KEY);
      localStorage.removeItem(SESSION_KEY);
      (remember ? localStorage : sessionStorage).setItem(SESSION_KEY, JSON.stringify(session));
      return session;
    });
  }

  function currentUser() {
    return readJSON(sessionStorage, SESSION_KEY, null) || readJSON(localStorage, SESSION_KEY, null);
  }

  function logoutUser() {
    sessionStorage.removeItem(SESSION_KEY);
    localStorage.removeItem(SESSION_KEY);
  }

  // Panggil FFYAuth.requireLogin() di halaman yang wajib login
  function requireLogin() {
    if (!currentUser()) {
      const back = encodeURIComponent(location.pathname.split('/').pop() || 'index.html');
      location.replace('login.html?next=' + back);
    }
  }

  window.FFYAuth = {
    register: registerUser,
    login: loginUser,
    logout: logoutUser,
    currentUser: currentUser,
    requireLogin: requireLogin
  };

  /* ---------- Tombol akun di header ----------
     Memakai listener fase-capture di document, jadi lebih dulu dari listener
     lama di initHeaderIcons (toast "Fitur akun sedang dalam pengembangan")
     dan kode lama tidak perlu diubah. */
  document.addEventListener('click', function (e) {
    const btn = e.target.closest && e.target.closest('#accountBtn');
    if (!btn) return;
    e.stopPropagation(); // hentikan listener lama di tombol ini

    const user = currentUser();
    if (!user) {
      if (!document.getElementById('form-login')) location.href = 'login.html';
      return; // sudah di halaman login
    }
    if (confirm('Halo, ' + user.name + '!\nKeluar dari akun ini?')) {
      logoutUser();
      if (typeof ffyToast === 'function') ffyToast('Kamu sudah keluar dari akun');
      setTimeout(() => location.reload(), 600);
    }
  }, true);

  function markAccountButton() {
    const btn = document.getElementById('accountBtn');
    const user = currentUser();
    if (!btn || !user) return;
    btn.classList.add('is-logged-in');
    btn.textContent = user.name.trim().charAt(0).toUpperCase();
    btn.title = 'Masuk sebagai ' + user.name + ' (klik untuk keluar)';
    btn.setAttribute('aria-label', 'Akun ' + user.name + '. Klik untuk keluar');
  }

  /* ---------- Form login.html (hanya jalan jika form-nya ada) ---------- */
  function initLoginPage() {
    const formLogin = document.getElementById('form-login');
    const formRegister = document.getElementById('form-register');
    if (!formLogin || !formRegister) return;

    const tabLogin = document.getElementById('tab-login');
    const tabRegister = document.getElementById('tab-register');
    const title = document.getElementById('auth-title');
    const sub = document.getElementById('auth-sub');
    const alertBox = document.getElementById('authAlert');
    const EMAIL_MSG = 'Email harus memakai @, contoh: nama@email.com';

    function getNextPage() {
      const next = new URLSearchParams(location.search).get('next') || 'index.html';
      return /^[\w\-]+\.html$/.test(next) ? next : 'index.html';
    }

    if (currentUser()) { location.replace(getNextPage()); return; }

    function showAlert(message, type) {
      alertBox.textContent = message;
      alertBox.className = 'auth-alert' + (type === 'success' ? ' success' : '');
      alertBox.hidden = false;
    }
    function clearAlert() { alertBox.hidden = true; alertBox.textContent = ''; }

    function setFieldError(inputId, message) {
      const input = document.getElementById(inputId);
      const out = document.querySelector('.field-error[data-for="' + inputId + '"]');
      if (input) input.classList.toggle('invalid', !!message);
      if (out) out.textContent = message || '';
    }
    function clearErrors(form) {
      form.querySelectorAll('input').forEach(i => setFieldError(i.id, ''));
    }

    function showTab(which) {
      const isLogin = which === 'login';
      tabLogin.classList.toggle('active', isLogin);
      tabRegister.classList.toggle('active', !isLogin);
      tabLogin.setAttribute('aria-selected', String(isLogin));
      tabRegister.setAttribute('aria-selected', String(!isLogin));
      formLogin.hidden = !isLogin;
      formRegister.hidden = isLogin;
      title.textContent = isLogin ? 'Selamat datang kembali' : 'Buat akun baru';
      sub.textContent = isLogin
        ? 'Masuk untuk menyimpan wishlist dan rekomendasi skincare-mu.'
        : 'Daftar gratis untuk menyimpan produk favorit dan hasil rekomendasimu.';
      clearAlert();
      clearErrors(formLogin);
      clearErrors(formRegister);
    }

    tabLogin.addEventListener('click', () => showTab('login'));
    tabRegister.addEventListener('click', () => showTab('register'));
    if (location.hash === '#daftar') showTab('register');

    document.querySelectorAll('.pw-toggle').forEach(btn => {
      btn.addEventListener('click', () => {
        const input = document.getElementById(btn.getAttribute('data-target'));
        const hidden = input.type === 'password';
        input.type = hidden ? 'text' : 'password';
        btn.textContent = hidden ? 'Sembunyi' : 'Lihat';
        btn.setAttribute('aria-label', hidden ? 'Sembunyikan kata sandi' : 'Tampilkan kata sandi');
      });
    });

    /* Masuk */
    formLogin.addEventListener('submit', function (e) {
      e.preventDefault();
      clearAlert();
      clearErrors(formLogin);

      const email = document.getElementById('login-email').value.trim();
      const password = document.getElementById('login-password').value;
      const remember = document.getElementById('login-remember').checked;
      let ok = true;

      if (!EMAIL_RE.test(email)) { setFieldError('login-email', EMAIL_MSG); ok = false; }
      if (!password) { setFieldError('login-password', 'Kata sandi wajib diisi.'); ok = false; }
      if (!ok) return;

      loginUser(email, password, remember)
        .then(user => {
          showAlert('Berhasil masuk. Halo, ' + user.name + '!', 'success');
          setTimeout(() => { location.href = getNextPage(); }, 700);
        })
        .catch(err => {
          if (err.code === 'WRONG_PASSWORD') {
            setFieldError('login-password', 'Kata sandi salah.');
            showAlert('Kata sandi salah. Coba lagi.');
            document.getElementById('login-password').select();
          } else if (err.code === 'NO_ACCOUNT') {
            setFieldError('login-email', 'Akun belum terdaftar.');
            showAlert('Akun belum terdaftar. Klik tab Daftar untuk membuat akun baru.');
          } else {
            showAlert(err.message);
          }
        });
    });

    /* Daftar */
    formRegister.addEventListener('submit', function (e) {
      e.preventDefault();
      clearAlert();
      clearErrors(formRegister);

      const name = document.getElementById('reg-name').value.trim();
      const email = document.getElementById('reg-email').value.trim();
      const password = document.getElementById('reg-password').value;
      const confirmPw = document.getElementById('reg-confirm').value;
      let ok = true;

      if (name.length < 2) { setFieldError('reg-name', 'Nama minimal 2 karakter.'); ok = false; }
      if (!EMAIL_RE.test(email)) { setFieldError('reg-email', EMAIL_MSG); ok = false; }
      if (password.length < 6) { setFieldError('reg-password', 'Kata sandi minimal 6 karakter.'); ok = false; }
      if (confirmPw !== password) { setFieldError('reg-confirm', 'Kata sandi tidak sama.'); ok = false; }
      if (!ok) return;

      registerUser(name, email, password)
        .then(() => {
          formRegister.reset();
          showTab('login');
          document.getElementById('login-email').value = email;
          showAlert('Akun berhasil dibuat. Silakan masuk.', 'success');
          document.getElementById('login-password').focus();
        })
        .catch(err => {
          if (err.code === 'EXISTS') {
            showTab('login');
            document.getElementById('login-email').value = email;
            showAlert('Akun sudah ada. Silakan masuk dengan email ini.');
            document.getElementById('login-password').focus();
          } else {
            showAlert(err.message);
          }
        });
    });
  }

  document.addEventListener('DOMContentLoaded', function () {
    markAccountButton();
    initLoginPage();
  });
})();
document.addEventListener('DOMContentLoaded', initHeaderIcons)