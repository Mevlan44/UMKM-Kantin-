// ===== PROFILE JS =====

let isEditing = false;
let originalData = {};

function loadProfile() {
  const user = JSON.parse(localStorage.getItem('kantinku_user') || '{}');

  const name = user.name || 'Nama Pengguna';
  const email = user.email || 'user@smktelkom.sch.id';
  const role = user.role || 'Siswa';
  const kelas = user.kelas || '';
  const jabatan = user.jabatan || '';

  document.getElementById('displayName').textContent = name;
  document.getElementById('displayRole').textContent = role;
  document.getElementById('displayKelas').textContent = kelas || jabatan || '';

  document.getElementById('fieldName').value = name;
  document.getElementById('fieldEmail').value = email;
  document.getElementById('fieldRole').value = role;
  document.getElementById('fieldKelas').value = kelas;
  document.getElementById('fieldJabatan').value = jabatan;

  // Show/hide kelas vs jabatan
  if (role === 'Siswa') {
    document.getElementById('fieldKelasWrap').style.display = 'block';
    document.getElementById('fieldJabatanWrap').style.display = 'none';
  } else {
    document.getElementById('fieldKelasWrap').style.display = 'none';
    document.getElementById('fieldJabatanWrap').style.display = 'block';
  }

  // Update avatar
  const avatarImg = document.getElementById('avatarImg');
  avatarImg.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=cc0000&color=fff&size=100`;

  // Load stats
  const history = JSON.parse(localStorage.getItem('kantinku_history') || '[]');
  const confirmed = history.filter(h => h.status === 'confirmed').length;
  const pending = history.filter(h => h.status === 'pending').length;
  document.getElementById('statTotal').textContent = history.length || 12;
  document.getElementById('statConfirmed').textContent = confirmed || 10;
  document.getElementById('statPending').textContent = pending || 2;

  originalData = { name, email, role, kelas, jabatan };
}

function toggleEdit() {
  isEditing = !isEditing;

  const fields = ['fieldName', 'fieldKelas', 'fieldJabatan'];
  fields.forEach(id => {
    const el = document.getElementById(id);
    if (el) el.disabled = !isEditing;
  });

  document.getElementById('profileActions').style.display = isEditing ? 'flex' : 'none';
  document.getElementById('avatarEditBtn').style.display = isEditing ? 'flex' : 'none';

  const btn = document.getElementById('editToggleBtn');
  btn.innerHTML = isEditing
    ? '<i class="fas fa-times"></i>'
    : '<i class="fas fa-edit"></i>';
}

function cancelEdit() {
  isEditing = false;
  loadProfile();
  document.getElementById('profileActions').style.display = 'none';
  document.getElementById('avatarEditBtn').style.display = 'none';
  document.getElementById('editToggleBtn').innerHTML = '<i class="fas fa-edit"></i>';

  const fields = ['fieldName', 'fieldKelas', 'fieldJabatan'];
  fields.forEach(id => {
    const el = document.getElementById(id);
    if (el) el.disabled = true;
  });
}

function saveProfile() {
  const user = JSON.parse(localStorage.getItem('kantinku_user') || '{}');
  user.name = document.getElementById('fieldName').value;
  user.kelas = document.getElementById('fieldKelas').value;
  user.jabatan = document.getElementById('fieldJabatan').value;

  localStorage.setItem('kantinku_user', JSON.stringify(user));
  loadProfile();

  isEditing = false;
  document.getElementById('profileActions').style.display = 'none';
  document.getElementById('avatarEditBtn').style.display = 'none';
  document.getElementById('editToggleBtn').innerHTML = '<i class="fas fa-edit"></i>';

  const fields = ['fieldName', 'fieldKelas', 'fieldJabatan'];
  fields.forEach(id => {
    const el = document.getElementById(id);
    if (el) el.disabled = true;
  });

  showToast('Profil berhasil disimpan!', 'success');
}

function changeAvatar(event) {
  const file = event.target.files[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = (e) => {
    document.getElementById('avatarImg').src = e.target.result;
    showToast('Foto profil diperbarui', 'success');
  };
  reader.readAsDataURL(file);
}

function handleLogout() {
  if (confirm('Yakin ingin keluar?')) {
    localStorage.removeItem('kantinku_user');
    window.location.href = 'index.html';
  }
}

function showToast(msg, type = 'info') {
  const existing = document.querySelector('.toast');
  if (existing) existing.remove();
  const toast = document.createElement('div');
  toast.className = `toast toast-${type}`;
  toast.innerHTML = `<i class="fas fa-${type === 'success' ? 'check-circle' : 'info-circle'}"></i><span>${msg}</span>`;
  if (!document.querySelector('#toast-style')) {
    const s = document.createElement('style');
    s.id = 'toast-style';
    s.textContent = `.toast{position:fixed;bottom:100px;left:50%;transform:translateX(-50%) translateY(40px);background:#1a1a1a;color:#fff;padding:10px 18px;border-radius:10px;font-size:13px;font-family:Inter,sans-serif;display:flex;align-items:center;gap:8px;z-index:9999;box-shadow:0 4px 16px rgba(0,0,0,.2);transition:transform .3s ease;white-space:nowrap}.toast.show{transform:translateX(-50%) translateY(0)}.toast-success i{color:#22c55e}`;
    document.head.appendChild(s);
  }
  document.body.appendChild(toast);
  requestAnimationFrame(() => toast.classList.add('show'));
  setTimeout(() => { toast.classList.remove('show'); setTimeout(() => toast.remove(), 300); }, 2000);
}

loadProfile();
