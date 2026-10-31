(function () {
  'use strict';

  const USERS_KEY = 'ffy_users';
  const SESSION_KEY = 'ffy_session';
  const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  function readJSON(storage, key, fallback) {
    try {
      const raw = storage.getItem(key);
      return raw ? JSON.parse(raw) : fallback;
    } catch (error) {
      return fallback;
    }
  }

  function getUsers() {
    return readJSON(localStorage, USERS_KEY, []);
  }

  function saveUsers(users) {
    localStorage.setItem(USERS_KEY, JSON.stringify(users));
  }

  function isValidEmail(email) {
    return typeof email === 'string' && EMAIL_RE.test(email.trim());
  }

  function hashPassword(password) {
    const data = new TextEncoder().encode('ffy::' + password);
    if (window.crypto && window.crypto.subtle) {
      return window.crypto.subtle.digest('SHA-256', data).then((buf) =>
        Array.from(new Uint8Array(buf)).map((b) => b.toString(16).padStart(2, '0')).join('')
      );
    }

    return Promise.resolve('plain:' + btoa(unescape(encodeURIComponent(password))));
  }

  function registerUser(name, email, password) {
    const cleanName = String(name || '').trim();
    const cleanEmail = String(email || '').trim().toLowerCase();

    if (!cleanName || cleanName.length < 2) {
      return Promise.reject({ code: 'INVALID_NAME', message: 'Nama minimal 2 karakter.' });
    }

    if (!isValidEmail(cleanEmail)) {
      return Promise.reject({ code: 'INVALID_EMAIL', message: 'Email harus memakai @, contoh: nama@email.com' });
    }

    if (!password || String(password).length < 6) {
      return Promise.reject({ code: 'INVALID_PASSWORD', message: 'Kata sandi minimal 6 karakter.' });
    }

    const users = getUsers();
    if (users.some((user) => user.email === cleanEmail)) {
      return Promise.reject({ code: 'EXISTS', message: 'Akun sudah ada. Silakan masuk.' });
    }

    return hashPassword(password).then((hash) => {
      const updatedUsers = [
        ...users,
        {
          name: cleanName,
          email: cleanEmail,
          hash: hash,
          createdAt: Date.now()
        }
      ];
      saveUsers(updatedUsers);
      return { name: cleanName, email: cleanEmail };
    });
  }

  function loginUser(email, password, remember = false) {
    const cleanEmail = String(email || '').trim().toLowerCase();

    if (!isValidEmail(cleanEmail)) {
      return Promise.reject({ code: 'INVALID_EMAIL', message: 'Email harus memakai @, contoh: nama@email.com' });
    }

    const user = getUsers().find((item) => item.email === cleanEmail);
    if (!user) {
      return Promise.reject({ code: 'NO_ACCOUNT', message: 'Akun belum terdaftar. Silakan buat akun dulu.' });
    }

    return hashPassword(password).then((hash) => {
      if (hash !== user.hash) {
        return Promise.reject({ code: 'WRONG_PASSWORD', message: 'Kata sandi salah.' });
      }

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

  window.FFYAuth = {
    isValidEmail,
    registerUser,
    loginUser,
    currentUser,
    logoutUser
  };
})();
