(function () {
  'use strict';

  const EMAIL_MSG = 'Email harus memakai @, contoh: nama@email.com';

  function showAlert(alertEl, message, type) {
    if (!alertEl) return;
    alertEl.textContent = message;
    alertEl.className = 'auth-alert' + (type === 'success' ? ' success' : '');
    alertEl.hidden = false;
  }

  function clearAlert(alertEl) {
    if (!alertEl) return;
    alertEl.textContent = '';
    alertEl.hidden = true;
    alertEl.className = 'auth-alert';
  }

  function setFieldError(inputId, message) {
    const input = document.getElementById(inputId);
    const errorText = document.querySelector('.field-error[data-for="' + inputId + '"]');

    if (input) {
      input.classList.toggle('invalid', Boolean(message));
    }

    if (errorText) {
      errorText.textContent = message || '';
    }
  }

  function clearErrors(form) {
    if (!form) return;
    form.querySelectorAll('input').forEach((input) => setFieldError(input.id, ''));
  }

  function showTab({ tabLogin, tabRegister, formLogin, formRegister, titleEl, subEl }) {
    const isLogin = !formRegister.hidden;
    tabLogin.classList.toggle('active', isLogin);
    tabRegister.classList.toggle('active', !isLogin);
    tabLogin.setAttribute('aria-selected', String(isLogin));
    tabRegister.setAttribute('aria-selected', String(!isLogin));

    formLogin.hidden = !isLogin;
    formRegister.hidden = isLogin;

    if (titleEl) {
      titleEl.textContent = isLogin ? 'Selamat datang kembali' : 'Buat akun baru';
    }

    if (subEl) {
      subEl.textContent = isLogin
        ? 'Masuk untuk menyimpan wishlist dan rekomendasi skincare-mu.'
        : 'Daftar gratis untuk menyimpan produk favorit dan hasil rekomendasimu.';
    }
  }

  document.addEventListener('DOMContentLoaded', function () {
    const formLogin = document.getElementById('form-login');
    const formRegister = document.getElementById('form-register');
    const tabLogin = document.getElementById('tab-login');
    const tabRegister = document.getElementById('tab-register');
    const titleEl = document.getElementById('auth-title');
    const subEl = document.getElementById('auth-sub');
    const alertBox = document.getElementById('authAlert');

    if (!formLogin || !formRegister || !tabLogin || !tabRegister) {
      return;
    }

    function switchToLogin() {
      showTab({
        tabLogin,
        tabRegister,
        formLogin,
        formRegister,
        titleEl,
        subEl
      });
    }

    function switchToRegister() {
      const isLogin = false;
      tabLogin.classList.toggle('active', isLogin);
      tabRegister.classList.toggle('active', !isLogin);
      tabLogin.setAttribute('aria-selected', String(isLogin));
      tabRegister.setAttribute('aria-selected', String(!isLogin));
      formLogin.hidden = true;
      formRegister.hidden = false;

      if (titleEl) titleEl.textContent = 'Buat akun baru';
      if (subEl) subEl.textContent = 'Daftar gratis untuk menyimpan produk favorit dan hasil rekomendasimu.';
    }

    tabLogin.addEventListener('click', () => {
      clearAlert(alertBox);
      clearErrors(formLogin);
      clearErrors(formRegister);
      switchToLogin();
    });

    tabRegister.addEventListener('click', () => {
      clearAlert(alertBox);
      clearErrors(formLogin);
      clearErrors(formRegister);
      switchToRegister();
    });

    document.querySelectorAll('.pw-toggle').forEach((button) => {
      button.addEventListener('click', () => {
        const targetId = button.getAttribute('data-target');
        const targetInput = document.getElementById(targetId);
        if (!targetInput) return;

        const isPassword = targetInput.type === 'password';
        targetInput.type = isPassword ? 'text' : 'password';
        button.textContent = isPassword ? 'Sembunyi' : 'Lihat';
        button.setAttribute('aria-label', isPassword ? 'Sembunyikan kata sandi' : 'Tampilkan kata sandi');
      });
    });

    formLogin.addEventListener('submit', function (event) {
      event.preventDefault();
      clearAlert(alertBox);
      clearErrors(formLogin);

      const email = document.getElementById('login-email').value.trim();
      const password = document.getElementById('login-password').value;
      const remember = document.getElementById('login-remember')?.checked || false;

      let ok = true;

      if (!FFYAuth.isValidEmail(email)) {
        setFieldError('login-email', EMAIL_MSG);
        ok = false;
      }

      if (!password) {
        setFieldError('login-password', 'Kata sandi wajib diisi.');
        ok = false;
      }

      if (!ok) return;

      FFYAuth.loginUser(email, password, remember)
        .then((user) => {
          showAlert(alertBox, 'Berhasil masuk. Halo, ' + user.name + '!', 'success');
          setTimeout(() => {
            window.location.href = 'index.html';
          }, 700);
        })
        .catch((error) => {
          if (error.code === 'NO_ACCOUNT') {
            setFieldError('login-email', 'Akun belum terdaftar.');
            showAlert(alertBox, 'Akun belum terdaftar. Silakan buat akun dulu.', 'error');
            const regEmail = document.getElementById('reg-email');
            if (regEmail) regEmail.value = email;
            switchToRegister();
            document.getElementById('reg-name')?.focus();
            return;
          }

          if (error.code === 'WRONG_PASSWORD') {
            setFieldError('login-password', 'Kata sandi salah.');
            showAlert(alertBox, 'Kata sandi salah. Coba lagi.');
            document.getElementById('login-password')?.select();
            return;
          }

          showAlert(alertBox, error.message || 'Login gagal.');
        });
    });

    formRegister.addEventListener('submit', function (event) {
      event.preventDefault();
      clearAlert(alertBox);
      clearErrors(formRegister);

      const name = document.getElementById('reg-name').value.trim();
      const email = document.getElementById('reg-email').value.trim();
      const password = document.getElementById('reg-password').value;
      const confirmPassword = document.getElementById('reg-confirm').value;

      let ok = true;

      if (name.length < 2) {
        setFieldError('reg-name', 'Nama minimal 2 karakter.');
        ok = false;
      }

      if (!FFYAuth.isValidEmail(email)) {
        setFieldError('reg-email', EMAIL_MSG);
        ok = false;
      }

      if (password.length < 6) {
        setFieldError('reg-password', 'Kata sandi minimal 6 karakter.');
        ok = false;
      }

      if (confirmPassword !== password) {
        setFieldError('reg-confirm', 'Kata sandi tidak sama.');
        ok = false;
      }

      if (!ok) return;

      FFYAuth.registerUser(name, email, password)
        .then(() => {
          formRegister.reset();
          document.getElementById('login-email').value = email;
          switchToLogin();
          showAlert(alertBox, 'Akun berhasil dibuat. Silakan masuk.', 'success');
          document.getElementById('login-password').focus();
        })
        .catch((error) => {
          if (error.code === 'EXISTS') {
            document.getElementById('login-email').value = email;
            switchToLogin();
            showAlert(alertBox, 'Akun sudah ada. Silakan masuk dengan email ini.');
            document.getElementById('login-password').focus();
            return;
          }

          showAlert(alertBox, error.message || 'Pendaftaran gagal.');
        });
    });
  });
})();
