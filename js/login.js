 /* login-modal.js — inlinado para la demo */
    (function () {
      'use strict';
 
      const overlay    = document.getElementById('loginModal');
      const form       = document.getElementById('loginForm');
      const emailInput = document.getElementById('loginEmail');
      const passInput  = document.getElementById('loginPassword');
      const submitBtn  = document.getElementById('loginSubmit');
      const togglePw   = document.getElementById('togglePw');
      const eyeIcon    = document.getElementById('eyeIcon');
      const fieldEmail = document.getElementById('fieldEmail');
      const fieldPass  = document.getElementById('fieldPass');
 
      document.querySelectorAll('[data-modal-open="loginModal"]').forEach((el) => {
        el.addEventListener('click', (e) => { e.preventDefault(); openModal(); });
      });
 
      document.getElementById('modalClose').addEventListener('click', closeModal);
      overlay.addEventListener('click', (e) => { if (e.target === overlay) closeModal(); });
      document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && overlay.classList.contains('is-open')) closeModal();
      });
 
      function openModal() {
        overlay.classList.add('is-open');
        document.body.style.overflow = 'hidden';
        setTimeout(() => emailInput.focus(), 300);
      }
 
      function closeModal() {
        overlay.classList.remove('is-open');
        document.body.style.overflow = '';
        resetForm();
      }
 
      const EYE_OPEN   = `<path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/>`;
      const EYE_CLOSED = `<path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94"/><path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19"/><line x1="1" y1="1" x2="23" y2="23"/>`;
 
      function resetForm() {
        form.reset();
        setError(fieldEmail, false);
        setError(fieldPass, false);
        passInput.type = 'password';
        eyeIcon.innerHTML = EYE_OPEN;
        submitBtn.classList.remove('loading');
        submitBtn.disabled = false;
      }
 
      togglePw.addEventListener('click', () => {
        const hidden = passInput.type === 'password';
        passInput.type    = hidden ? 'text' : 'password';
        eyeIcon.innerHTML = hidden ? EYE_CLOSED : EYE_OPEN;
        togglePw.setAttribute('aria-pressed', hidden ? 'true' : 'false');
      });
 
      const isValidEmail = (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim());
 
      function setError(field, hasError) {
        field.classList.toggle('has-error', hasError);
      }
 
      emailInput.addEventListener('input', () => setError(fieldEmail, false));
      passInput.addEventListener('input',  () => setError(fieldPass,  false));
 
      form.addEventListener('submit', async (e) => {
        e.preventDefault();
        setError(fieldEmail, false);
        setError(fieldPass, false);
 
        let ok = true;
        if (!isValidEmail(emailInput.value)) { setError(fieldEmail, true); ok = false; }
        if (!passInput.value.trim())          { setError(fieldPass,  true); ok = false; }
        if (!ok) return;
 
        submitBtn.classList.add('loading');
        submitBtn.disabled = true;
 
        try {
          /* Simulación — reemplaza con tu fetch('/api/login', ...) */
          await new Promise((r) => setTimeout(r, 1600));
          closeModal();
          alert('✅ Sesión iniciada (demo)');
        } catch (err) {
          setError(fieldEmail, true);
          document.getElementById('emailErr').textContent = err.message || 'Credenciales incorrectas.';
        } finally {
          submitBtn.classList.remove('loading');
          submitBtn.disabled = false;
        }
      });
    })();