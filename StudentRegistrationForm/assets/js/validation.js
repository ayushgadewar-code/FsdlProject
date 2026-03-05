// validation.js
(function () {
  const form = document.getElementById('registrationForm');
  const usernameEl = document.getElementById('username');
  const emailEl = document.getElementById('email');
  const phoneEl = document.getElementById('phone');
  const passwordEl = document.getElementById('password');
  const confirmEl = document.getElementById('confirmPassword');
  const message = document.getElementById('formMessage');

  const errUsername = document.getElementById('err-username');
  const errEmail = document.getElementById('err-email');
  const errPhone = document.getElementById('err-phone');
  const errPassword = document.getElementById('err-password');
  const errConfirm = document.getElementById('err-confirm');

  const meterBar = document.getElementById('meterBar');
  if (!form) return;

  const phoneDigitsPattern = /^\d+$/;
  const phoneExactPattern = /^\d{10}$/;
  const pwdPattern = /^(?=.{7,})(?=.*[A-Z])(?=.*\d)(?=.*[&$#@]).*$/;
  const emailPatternStrict = /^[A-Za-z]+@[A-Za-z]{3}\.[A-Za-z]{2,3}$/;

  function showError(el, msg) { if (!el) return; el.textContent = msg || ''; }
  function setInputError(inputEl) { if (!inputEl) return; inputEl.classList.add('error'); }
  function clearInputError(inputEl) { if (!inputEl) return; inputEl.classList.remove('error'); }
  function clearAllErrors() {
    [errUsername, errEmail, errPhone, errPassword, errConfirm].forEach(e => { if (e) e.textContent = ''; });
    [usernameEl, emailEl, phoneEl, passwordEl, confirmEl].forEach(i => { if (i) i.classList.remove('error'); });
    if (message) { message.textContent = ''; message.style.color = ''; }
  }

  function updateMeter(pwd) {
    if (!meterBar) return;
    if (!pwd) { meterBar.style.width = '0%'; meterBar.style.background = 'linear-gradient(90deg,#ff4d4d,#ffb86b)'; return; }
    let score = 0;
    if (pwd.length >= 7) score += 30;
    if (/[A-Z]/.test(pwd)) score += 25;
    if (/\d/.test(pwd)) score += 20;
    if (/[&$#@]/.test(pwd)) score += 25;
    score = Math.min(score, 100);
    meterBar.style.width = score + '%';
    if (score < 40) meterBar.style.background = 'linear-gradient(90deg,#ff4d4d,#ffb86b)';
    else if (score < 75) meterBar.style.background = 'linear-gradient(90deg,#ffd86b,#6af39a)';
    else meterBar.style.background = 'linear-gradient(90deg,#6af39a,#00d4ff)';
  }

  if (passwordEl) {
    passwordEl.addEventListener('input', function () { updateMeter(passwordEl.value); });
  }

  form.addEventListener('submit', function (ev) {
    ev.preventDefault();
    clearAllErrors();

    const username = usernameEl ? usernameEl.value.trim() : '';
    const email = emailEl ? emailEl.value.trim() : '';
    const phone = phoneEl ? phoneEl.value.trim() : '';
    const password = passwordEl ? passwordEl.value : '';
    const confirm = confirmEl ? confirmEl.value : '';

    let valid = true;
    let firstInvalidField = null;

    if (!username) { showError(errUsername, 'Username cannot be empty.'); setInputError(usernameEl); valid = false; firstInvalidField = firstInvalidField || usernameEl; }
    else clearInputError(usernameEl);

    if (!email) { showError(errEmail, 'Email cannot be empty.'); setInputError(emailEl); valid = false; firstInvalidField = firstInvalidField || emailEl; }
    else if (!emailPatternStrict.test(email)) { showError(errEmail, 'Email must be like: abc@xyz.ab (letters before @, exactly 3 letters between @ and ., 2–3 letters after .)'); setInputError(emailEl); valid = false; firstInvalidField = firstInvalidField || emailEl; }
    else clearInputError(emailEl);

    if (!phone) { showError(errPhone, 'Phone cannot be empty.'); setInputError(phoneEl); valid = false; firstInvalidField = firstInvalidField || phoneEl; }
    else if (!phoneDigitsPattern.test(phone)) { showError(errPhone, 'Phone must contain only numeric digits (0-9).'); setInputError(phoneEl); valid = false; firstInvalidField = firstInvalidField || phoneEl; }
    else if (!phoneExactPattern.test(phone)) { showError(errPhone, 'Phone number must be exactly 10 digits.'); setInputError(phoneEl); valid = false; firstInvalidField = firstInvalidField || phoneEl; }
    else clearInputError(phoneEl);

    if (!password) { showError(errPassword, 'Password cannot be empty.'); setInputError(passwordEl); valid = false; firstInvalidField = firstInvalidField || passwordEl; }
    else if (!pwdPattern.test(password)) { showError(errPassword, 'Password must be at least 7 chars, include 1 uppercase, 1 digit and 1 special (& $ # @).'); setInputError(passwordEl); valid = false; firstInvalidField = firstInvalidField || passwordEl; }
    else clearInputError(passwordEl);

    if (!confirm) { showError(errConfirm, 'Confirm Password cannot be empty.'); setInputError(confirmEl); valid = false; firstInvalidField = firstInvalidField || confirmEl; }
    else if (password !== confirm) { showError(errConfirm, 'Passwords do not match.'); setInputError(confirmEl); setInputError(passwordEl); valid = false; firstInvalidField = firstInvalidField || confirmEl; }
    else clearInputError(confirmEl);

    if (!valid && firstInvalidField) { try { firstInvalidField.focus(); } catch (e) {} return; }

    if (message) { message.style.color = 'var(--success)'; message.innerHTML = 'Registration successful! <strong>Client-side validated.</strong>'; }

    const heading = document.getElementById('mainTitle') || document.getElementById('mainHeading');
    if (heading) heading.innerHTML = `Welcome, ${escapeHtml(username)}!`;
  });

  function escapeHtml(s) {
    if (!s) return s;
    return s.replace(/[&<>"']/g, function (m) { return ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'})[m]; });
  }
})();