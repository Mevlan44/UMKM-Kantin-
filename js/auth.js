// ===== AUTH JS =====

function handleLogin(e) {
  e.preventDefault();
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;

  if (!email.includes('@')) {
    showToast('Masukkan email yang valid', 'error');
    return;
  }

  // Simulate login - save user data
  const userData = {
    name: email.split('@')[0].replace('.', ' ').replace(/\b\w/g, c => c.toUpperCase()),
    email: email,
    role: 'Siswa',
    kelas: 'XII RPL 1'
  };
  localStorage.setItem('kantinku_user', JSON.stringify(userData));

  showToast('Login berhasil! Selamat datang 👋', 'success');
  setTimeout(() => window.location.href = 'home.html', 1000);
}

function handleRegister(e) {
  e.preventDefault();
  const name = document.getElementById('reg-name').value;
  const email = document.getElementById('reg-email').value;
  const role = document.getElementById('reg-role').value;
  const password = document.getElementById('reg-password').value;
  const confirm = document.getElementById('reg-confirm').value;

  if (!role) {
    showToast('Pilih role terlebih dahulu', 'error');
    return;
  }

  if (password.length < 8) {
    showToast('Password minimal 8 karakter', 'error');
    return;
  }

  if (password !== confirm) {
    showToast('Password tidak cocok', 'error');
    return;
  }

  const kelas = role === 'siswa' ? document.getElementById('reg-kelas').value : '';
  const jabatan = role !== 'siswa' ? document.getElementById('reg-jabatan').value : '';

  const userData = {
    name,
    email,
    role: role.charAt(0).toUpperCase() + role.slice(1),
    kelas,
    jabatan
  };
  localStorage.setItem('kantinku_user', JSON.stringify(userData));

  showToast('Akun berhasil dibuat!', 'success');
  setTimeout(() => window.location.href = 'index.html', 1000);
}

function toggleRoleField() {
  const role = document.getElementById('reg-role').value;
  const kelasField = document.getElementById('field-kelas');
  const jabatanField = document.getElementById('field-jabatan');

  if (role === 'siswa') {
    kelasField.style.display = 'block';
    jabatanField.style.display = 'none';
  } else if (role === 'guru' || role === 'karyawan') {
    kelasField.style.display = 'none';
    jabatanField.style.display = 'block';
  } else {
    kelasField.style.display = 'block';
    jabatanField.style.display = 'none';
  }
}

function togglePassword() {
  const input = document.getElementById('password');
  const icon = document.getElementById('eyeIcon');
  if (input.type === 'password') {
    input.type = 'text';
    icon.className = 'fas fa-eye-slash';
  } else {
    input.type = 'password';
    icon.className = 'fas fa-eye';
  }
}

function togglePasswordReg() {
  const input = document.getElementById('reg-password');
  const icon = document.getElementById('eyeIconReg');
  if (input.type === 'password') {
    input.type = 'text';
    icon.className = 'fas fa-eye-slash';
  } else {
    input.type = 'password';
    icon.className = 'fas fa-eye';
  }
}

// ===== TOAST NOTIFICATION =====
function showToast(message, type = 'info') {
  const existing = document.querySelector('.toast');
  if (existing) existing.remove();

  const toast = document.createElement('div');
  toast.className = `toast toast-${type}`;
  toast.innerHTML = `
    <i class="fas fa-${type === 'success' ? 'check-circle' : type === 'error' ? 'exclamation-circle' : 'info-circle'}"></i>
    <span>${message}</span>
  `;

  const style = document.createElement('style');
  style.textContent = `
    .toast {
      position: fixed;
      bottom: 24px;
      left: 50%;
      transform: translateX(-50%) translateY(80px);
      background: #1a1a1a;
      color: white;
      padding: 12px 20px;
      border-radius: 12px;
      font-size: 14px;
      font-family: Inter, sans-serif;
      display: flex;
      align-items: center;
      gap: 8px;
      z-index: 9999;
      box-shadow: 0 8px 24px rgba(0,0,0,0.2);
      transition: transform 0.3s ease;
      white-space: nowrap;
    }
    .toast.show { transform: translateX(-50%) translateY(0); }
    .toast-success i { color: #22c55e; }
    .toast-error i { color: #ef4444; }
    .toast-info i { color: #3b82f6; }
  `;

  if (!document.querySelector('#toast-style')) {
    style.id = 'toast-style';
    document.head.appendChild(style);
  }

  document.body.appendChild(toast);
  requestAnimationFrame(() => toast.classList.add('show'));
  setTimeout(() => {
    toast.classList.remove('show');
    setTimeout(() => toast.remove(), 300);
  }, 2800);
}
