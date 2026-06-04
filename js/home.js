// ===== HOME JS =====

const kantinData = [
  { id: 1, name: 'Kantin 1', desc: 'Ramen & Ayam Goreng', emoji: '🍜', color: '#fff0f0', rating: 4.8, items: 8 },
  { id: 2, name: 'Kantin 2', desc: 'Menu Spesial Hari Ini', emoji: '🍱', color: '#f0f9ff', rating: 4.5, items: 10 },
  { id: 3, name: 'Kantin 3', desc: 'Nasi & Lauk Pauk', emoji: '🍚', color: '#f0fdf4', rating: 4.6, items: 12 },
  { id: 4, name: 'Kantin 4', desc: 'Gorengan & Jajanan', emoji: '🧆', color: '#fffbeb', rating: 4.3, items: 15 },
  { id: 5, name: 'Kantin 5', desc: 'Minuman & Snack', emoji: '🥤', color: '#fdf4ff', rating: 4.7, items: 9 },
  { id: 6, name: 'Kantin 6', desc: 'Ayam Goreng Kremes', emoji: '🍗', color: '#fff7ed', rating: 4.9, items: 7 },
  { id: 7, name: 'Kantin 7', desc: 'Bakso & Mie Ayam', emoji: '🍝', color: '#f0f9ff', rating: 4.4, items: 6 },
  { id: 8, name: 'Kantin 8', desc: 'Nasi Goreng Spesial', emoji: '🍳', color: '#fdf4ff', rating: 4.6, items: 8 },
  { id: 9, name: 'Kantin 9', desc: 'Sate & Grill', emoji: '🍢', color: '#fff0f0', rating: 4.5, items: 10 },
  { id: 10, name: 'Kantin 10', desc: 'Pecel & Lalapan', emoji: '🥗', color: '#f0fdf4', rating: 4.3, items: 11 },
  { id: 11, name: 'Kantin 11', desc: 'Soto & Kwetiau', emoji: '🍲', color: '#fffbeb', rating: 4.8, items: 6 },
  { id: 12, name: 'Kantin 12', desc: 'Es & Minuman Segar', emoji: '🧊', color: '#f0f9ff', rating: 4.7, items: 14 },
];

function renderKantin(data) {
  const grid = document.getElementById('kantinGrid');
  grid.innerHTML = '';

  if (data.length === 0) {
    grid.innerHTML = `<div style="grid-column:1/-1;text-align:center;padding:40px;color:#a0a0a0;">
      <i class="fas fa-search" style="font-size:40px;margin-bottom:12px;display:block;"></i>
      <p>Kantin tidak ditemukan</p>
    </div>`;
    return;
  }

  data.forEach(k => {
    const card = document.createElement('div');
    card.className = 'kantin-card';
    card.onclick = () => goToKantin(k.id);
    card.innerHTML = `
      <div class="kantin-card-body">
        <div class="kantin-card-top">
          <h4>${k.name}</h4>
          <span class="kantin-open-badge">Buka</span>
        </div>
        <div class="kantin-card-meta">
          <span>${k.items} menu</span>
          <span class="rating"><i class="fas fa-star"></i> ${k.rating}</span>
        </div>
      </div>
    `;
    grid.appendChild(card);
  });
}

function filterKantin() {
  const q = document.getElementById('searchInput').value.toLowerCase();
  const filtered = kantinData.filter(k =>
    k.name.toLowerCase().includes(q) || k.desc.toLowerCase().includes(q)
  );
  renderKantin(filtered);
}

function goToKantin(id) {
  localStorage.setItem('selectedKantin', id);
  window.location.href = 'menu.html';
}

// NOTIFICATION
document.getElementById('notifBtn').addEventListener('click', () => {
  document.getElementById('notifPanel').classList.add('open');
  document.getElementById('notifOverlay').classList.add('active');
});

function closeNotif() {
  document.getElementById('notifPanel').classList.remove('open');
  document.getElementById('notifOverlay').classList.remove('active');
}

// LOAD USER
function loadUser() {
  const user = JSON.parse(localStorage.getItem('kantinku_user') || '{}');
  if (user.name) {
    document.getElementById('userName').textContent = user.name.split(' ')[0];
    const avatar = document.querySelector('.nav-avatar img');
    if (avatar) {
      avatar.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(user.name)}&background=cc0000&color=fff&size=36`;
    }
  }
}

// INIT
loadUser();
renderKantin(kantinData);
