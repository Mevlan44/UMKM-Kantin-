// ===== SETTINGS JS =====

function switchTab(tab, btn) {
  document.querySelectorAll('.stab').forEach(b => b.classList.remove('active'));
  if (btn) {
    btn.classList.add('active');
  } else {
    document.querySelectorAll('.stab').forEach(b => {
      if (b.getAttribute('onclick') && b.getAttribute('onclick').includes(`'${tab}'`)) {
        b.classList.add('active');
      }
    });
  }

  document.querySelectorAll('.tab-content').forEach(t => t.style.display = 'none');
  document.getElementById(`tab-${tab}`).style.display = 'block';

  // update active bottom nav
  document.querySelectorAll('.bottom-nav-item').forEach(a => a.classList.remove('active'));
  if (tab === 'riwayat') document.getElementById('navRiwayat')?.classList.add('active');
  if (tab === 'pengaturan') document.getElementById('navPengaturan')?.classList.add('active');
}

function initTabFromURL() {
  const params = new URLSearchParams(window.location.search);
  const tab = params.get('tab') || 'riwayat';
  switchTab(tab, null);
}

function filterHistory(status, btn) {
  document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');

  const cards = document.querySelectorAll('.history-card[data-status]');
  cards.forEach(card => {
    if (status === 'semua' || card.dataset.status === status) {
      card.style.display = 'block';
    } else {
      card.style.display = 'none';
    }
  });
}

function viewDetail(id) {
  const details = {
    '1': {
      kantin: 'Kantin 1',
      date: '20 Apr 2026, 08:30',
      items: 'Ramen Rasa Kari x1, Ayam Goreng Skak Saos Keju x1',
      method: 'Transfer BCA',
      total: 'Rp 25.000',
      status: 'Dikonfirmasi',
      note: '-'
    },
    '2': {
      kantin: 'Kantin 6',
      date: '22 Apr 2026, 09:15',
      items: 'Ayam Goreng Kremes x2, Tempe x1',
      method: 'GoPay',
      total: 'Rp 18.000',
      status: 'Menunggu Konfirmasi',
      note: 'Tidak pakai sambel'
    },
    '3': {
      kantin: 'Kantin 11',
      date: '18 Apr 2026, 11:00',
      items: 'Soto Jumbo x1',
      method: 'QRIS',
      total: 'Rp 15.000',
      status: 'Ditolak',
      note: '-'
    }
  };

  const d = details[id];
  if (!d) return;

  const statusBadge = {
    'Dikonfirmasi': '<span class="badge-confirmed">Dikonfirmasi</span>',
    'Menunggu Konfirmasi': '<span class="badge-pending">Menunggu Konfirmasi</span>',
    'Ditolak': '<span class="badge-rejected">Ditolak</span>'
  }[d.status] || d.status;

  document.getElementById('detailBody').innerHTML = `
    <div class="detail-row"><span>Kantin</span><span>${d.kantin}</span></div>
    <div class="detail-row"><span>Tanggal</span><span>${d.date}</span></div>
    <div class="detail-row"><span>Item</span><span>${d.items}</span></div>
    <div class="detail-row"><span>Metode Bayar</span><span>${d.method}</span></div>
    <div class="detail-row"><span>Total</span><span style="color:var(--red);font-weight:700;">${d.total}</span></div>
    <div class="detail-row"><span>Catatan</span><span>${d.note}</span></div>
    <div class="detail-row"><span>Status</span><span>${statusBadge}</span></div>
    <div style="margin-top:16px;">
      <p style="font-size:12px;color:#a0a0a0;margin-bottom:8px;">Bukti Pembayaran:</p>
      <div style="background:var(--gray-100);border-radius:8px;padding:24px;text-align:center;color:#a0a0a0;">
        <i class="fas fa-image" style="font-size:32px;margin-bottom:8px;display:block;"></i>
        <p style="font-size:12px;">Bukti pembayaran tersimpan</p>
      </div>
    </div>
  `;

  document.getElementById('detailModal').classList.add('open');
  document.getElementById('detailOverlay').classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeDetail() {
  document.getElementById('detailModal').classList.remove('open');
  document.getElementById('detailOverlay').classList.remove('active');
  document.body.style.overflow = '';
}

function handleLogout() {
  if (confirm('Yakin ingin keluar?')) {
    localStorage.removeItem('kantinku_user');
    window.location.href = 'index.html';
  }
}

// Load user email in settings
function loadSettings() {
  const user = JSON.parse(localStorage.getItem('kantinku_user') || '{}');
  if (user.email) {
    const el = document.getElementById('settingsEmail');
    if (el) el.textContent = user.email;
  }

  // Load history from localStorage
  const history = JSON.parse(localStorage.getItem('kantinku_history') || '[]');
  if (history.length > 0) {
    const list = document.getElementById('historyList');
    // Prepend dynamic history items
    history.forEach(order => {
      const statusMap = { pending: 'pending', confirmed: 'confirmed', rejected: 'rejected' };
      const badgeMap = {
        pending: '<span class="badge-pending">Menunggu</span>',
        confirmed: '<span class="badge-confirmed">Dikonfirmasi</span>',
        rejected: '<span class="badge-rejected">Ditolak</span>'
      };

      const card = document.createElement('div');
      card.className = 'history-card';
      card.dataset.status = statusMap[order.status] || 'pending';
      card.innerHTML = `
        <div class="history-card-header">
          <div class="history-kantin">
            <div class="hk-icon"><i class="fas fa-store"></i></div>
            <div>
              <strong>${order.kantinName}</strong>
              <span>${order.date}</span>
            </div>
          </div>
          ${badgeMap[order.status] || badgeMap.pending}
        </div>
        <div class="history-items">
          ${(order.items || []).map(i => `<p>• ${i.name}${i.option ? ` (${i.option})` : ''} x${i.qty}</p>`).join('')}
        </div>
        <div class="history-footer">
          <span class="history-total">Rp ${order.total.toLocaleString('id-ID')}</span>
          <button class="btn-outline-sm">Detail</button>
        </div>
      `;
      list.prepend(card);
    });
  }
}

loadSettings();
initTabFromURL();
