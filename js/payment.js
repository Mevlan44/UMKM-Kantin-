// ===== PAYMENT JS =====

let currentStep = 1;
let selectedMethod = null;
let uploadedFile = null;

function init() {
  const cartData = JSON.parse(localStorage.getItem('activeCart') || '{"items":[]}');
  const items = cartData.items || [];

  if (items.length === 0) {
    document.getElementById('orderSummary').innerHTML = `<p style="color:#a0a0a0;font-size:13px;">Tidak ada item di keranjang</p>`;
    document.getElementById('subtotal').textContent = 'Rp 0';
    document.getElementById('totalFinal').textContent = 'Rp 0';
    return;
  }

  const subtotal = items.reduce((s, i) => s + i.price * i.qty, 0);

  const summaryEl = document.getElementById('orderSummary');
  summaryEl.innerHTML = items.map(item => `
    <div class="order-item-row">
      <div class="order-item-icon">${item.emoji}</div>
      <div class="order-item-info">
        <p>${item.name}${item.option ? ` (${item.option})` : ''}</p>
        <span>${item.qty}x · Rp ${item.price.toLocaleString('id-ID')}</span>
      </div>
      <div class="order-item-price">Rp ${(item.price * item.qty).toLocaleString('id-ID')}</div>
    </div>
  `).join('');

  document.getElementById('subtotal').textContent = `Rp ${subtotal.toLocaleString('id-ID')}`;
  document.getElementById('totalFinal').textContent = `Rp ${subtotal.toLocaleString('id-ID')}`;
  document.getElementById('totalDisplay').textContent = `Rp ${subtotal.toLocaleString('id-ID')}`;
}

function goStep(step) {
  if (step === 3 && !selectedMethod) {
    showToast('Pilih metode pembayaran terlebih dahulu', 'error');
    return;
  }

  // Update step indicator
  for (let i = 1; i <= 3; i++) {
    const stepEl = document.getElementById(`step${i}`);
    stepEl.classList.remove('active', 'done');
    if (i < step) stepEl.classList.add('done');
    else if (i === step) stepEl.classList.add('active');
  }

  // Update step lines
  const lines = document.querySelectorAll('.step-line');
  lines.forEach((line, idx) => {
    line.classList.toggle('done', idx < step - 1);
  });

  // Show/hide content
  for (let i = 1; i <= 3; i++) {
    document.getElementById(`stepContent${i}`).style.display = i === step ? 'block' : 'none';
  }

  currentStep = step;

  if (step === 3 && selectedMethod) {
    document.getElementById('selectedMethodDisplay').textContent = selectedMethod;
  }

  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function selectMethod(el, method) {
  document.querySelectorAll('.method-item').forEach(m => m.classList.remove('selected'));
  el.classList.add('selected');
  selectedMethod = method;
  document.getElementById('btnNextStep2').disabled = false;

  // Show QRIS box
  const qrisBox = document.getElementById('qrisBox');
  qrisBox.style.display = method === 'QRIS' ? 'block' : 'none';
}

function previewUpload(event) {
  const file = event.target.files[0];
  if (!file) return;

  if (file.size > 5 * 1024 * 1024) {
    showToast('Ukuran file maksimal 5MB', 'error');
    return;
  }

  uploadedFile = file;
  const reader = new FileReader();
  reader.onload = (e) => {
    const preview = document.getElementById('previewImg');
    const placeholder = document.getElementById('uploadPlaceholder');
    preview.src = e.target.result;
    preview.style.display = 'block';
    placeholder.style.display = 'none';

    document.getElementById('uploadInfo').style.display = 'flex';
    document.getElementById('uploadFileName').textContent = file.name;
    document.getElementById('btnSubmit').disabled = false;
  };
  reader.readAsDataURL(file);
}

function removeUpload() {
  uploadedFile = null;
  document.getElementById('previewImg').style.display = 'none';
  document.getElementById('uploadPlaceholder').style.display = 'flex';
  document.getElementById('uploadInfo').style.display = 'none';
  document.getElementById('fileInput').value = '';
  document.getElementById('btnSubmit').disabled = true;
}

function submitOrder() {
  if (!uploadedFile) {
    showToast('Upload bukti pembayaran terlebih dahulu', 'error');
    return;
  }

  const cartData = JSON.parse(localStorage.getItem('activeCart') || '{"items":[]}');
  const subtotal = (cartData.items || []).reduce((s, i) => s + i.price * i.qty, 0);

  // Save to history
  const history = JSON.parse(localStorage.getItem('kantinku_history') || '[]');
  const newOrder = {
    id: Date.now(),
    kantinId: cartData.kantinId,
    kantinName: `Kantin ${cartData.kantinId}`,
    items: cartData.items,
    total: subtotal,
    method: selectedMethod,
    note: document.getElementById('orderNote').value,
    status: 'pending',
    date: new Date().toLocaleString('id-ID'),
    proof: 'uploaded'
  };
  history.unshift(newOrder);
  localStorage.setItem('kantinku_history', JSON.stringify(history));

  // Clear cart
  localStorage.removeItem('activeCart');
  localStorage.removeItem(`cart_${cartData.kantinId}`);

  // Show success
  document.getElementById('successOverlay').classList.add('active');
  document.getElementById('successModal').style.display = 'block';
}

// Drag & drop support
const uploadArea = document.getElementById('uploadArea');
uploadArea.addEventListener('dragover', (e) => {
  e.preventDefault();
  uploadArea.style.borderColor = 'var(--red)';
  uploadArea.style.background = 'var(--red-bg)';
});
uploadArea.addEventListener('dragleave', () => {
  uploadArea.style.borderColor = '';
  uploadArea.style.background = '';
});
uploadArea.addEventListener('drop', (e) => {
  e.preventDefault();
  uploadArea.style.borderColor = '';
  uploadArea.style.background = '';
  const file = e.dataTransfer.files[0];
  if (file && file.type.startsWith('image/')) {
    const dt = new DataTransfer();
    dt.items.add(file);
    document.getElementById('fileInput').files = dt.files;
    previewUpload({ target: { files: [file] } });
  }
});

function showToast(msg, type = 'info') {
  const existing = document.querySelector('.toast');
  if (existing) existing.remove();
  const toast = document.createElement('div');
  toast.className = `toast toast-${type}`;
  toast.innerHTML = `<i class="fas fa-${type === 'success' ? 'check-circle' : type === 'error' ? 'exclamation-circle' : 'info-circle'}"></i><span>${msg}</span>`;
  if (!document.querySelector('#toast-style')) {
    const s = document.createElement('style');
    s.id = 'toast-style';
    s.textContent = `.toast{position:fixed;bottom:24px;left:50%;transform:translateX(-50%) translateY(40px);background:#1a1a1a;color:#fff;padding:10px 18px;border-radius:10px;font-size:13px;font-family:Inter,sans-serif;display:flex;align-items:center;gap:8px;z-index:9999;box-shadow:0 4px 16px rgba(0,0,0,.2);transition:transform .3s ease;white-space:nowrap}.toast.show{transform:translateX(-50%) translateY(0)}.toast-success i{color:#22c55e}.toast-error i{color:#ef4444}`;
    document.head.appendChild(s);
  }
  document.body.appendChild(toast);
  requestAnimationFrame(() => toast.classList.add('show'));
  setTimeout(() => { toast.classList.remove('show'); setTimeout(() => toast.remove(), 300); }, 2500);
}

init();
