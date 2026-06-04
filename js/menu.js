// ===== MENU JS =====

const allMenuData = {
  1: {
    name: 'Kantin 1',
    desc: 'Spesialis Ramen & Ayam Goreng',
    emoji: '🍜',
    items: [
      { id: 101, name: 'Ramen Rasa Kari', desc: 'Ramen kuah kari gurih dengan topping lengkap', price: 15000, emoji: '🍜', category: 'makanan', options: null },
      { id: 102, name: 'Muso', desc: 'Mie spesial dengan bumbu rahasia', price: 13000, emoji: '🍝', category: 'makanan', options: null },
      { id: 103, name: 'Mie Iblis Level 1', desc: 'Mie pedas level 1 - cocok untuk pemula', price: 14000, emoji: '🌶️', category: 'makanan', options: ['Level 1', 'Level 2', 'Level 3'] },
      { id: 104, name: 'Ayam Goreng Skak Saos Keju', desc: 'Ayam goreng crispy dengan saos keju spesial', price: 18000, emoji: '🍗', category: 'makanan', options: ['Saos Keju', 'Sambel', 'BBQ', 'Original'] },
      { id: 105, name: 'Es Teh Manis', desc: 'Teh manis dingin segar', price: 5000, emoji: '🧋', category: 'minuman', options: null },
      { id: 106, name: 'Es Jeruk', desc: 'Jeruk peras segar dengan es', price: 6000, emoji: '🍊', category: 'minuman', options: null },
    ]
  },
  2: {
    name: 'Kantin 2', desc: 'Menu Spesial Setiap Hari', emoji: '🍱',
    items: [
      { id: 201, name: 'Nasi Ayam Spesial', desc: 'Nasi putih dengan ayam bumbu spesial', price: 15000, emoji: '🍱', category: 'makanan', options: null },
      { id: 202, name: 'Nasi Telur Dadar', desc: 'Nasi dengan telur dadar gurih', price: 10000, emoji: '🍳', category: 'makanan', options: null },
      { id: 203, name: 'Mie Goreng', desc: 'Mie goreng dengan sayuran segar', price: 12000, emoji: '🍝', category: 'makanan', options: null },
      { id: 204, name: 'Es Teh', desc: 'Teh manis dingin', price: 4000, emoji: '🧋', category: 'minuman', options: null },
    ]
  },
  3: {
    name: 'Kantin 3', desc: 'Nasi & Lauk Pauk Lengkap', emoji: '🍚',
    items: [
      { id: 301, name: 'Nasi Campur', desc: 'Nasi dengan berbagai lauk pilihan', price: 13000, emoji: '🍚', category: 'makanan', options: null },
      { id: 302, name: 'Nasi Rendang', desc: 'Nasi dengan rendang daging sapi', price: 18000, emoji: '🥩', category: 'makanan', options: null },
      { id: 303, name: 'Sayur Asem', desc: 'Sayur asem segar dengan lauk', price: 10000, emoji: '🥣', category: 'makanan', options: null },
      { id: 304, name: 'Jus Alpukat', desc: 'Jus alpukat segar dengan susu', price: 8000, emoji: '🥑', category: 'minuman', options: null },
    ]
  },
  4: {
    name: 'Kantin 4', desc: 'Gorengan & Jajanan Favorit', emoji: '🧆',
    items: [
      { id: 401, name: 'Gorengan Mix', desc: 'Tempe, tahu, bakwan campur', price: 5000, emoji: '🧆', category: 'makanan', options: null },
      { id: 402, name: 'Cireng Bumbu', desc: 'Cireng dengan bumbu rujak pedas', price: 6000, emoji: '🫓', category: 'makanan', options: null },
      { id: 403, name: 'Batagor', desc: 'Batagor dengan saus kacang', price: 8000, emoji: '🥟', category: 'makanan', options: null },
      { id: 404, name: 'Es Campur', desc: 'Es campur segar dengan berbagai topping', price: 7000, emoji: '🍧', category: 'minuman', options: null },
    ]
  },
  5: {
    name: 'Kantin 5', desc: 'Minuman & Snack Segar', emoji: '🥤',
    items: [
      { id: 501, name: 'Bubble Tea', desc: 'Bubble tea dengan berbagai rasa', price: 12000, emoji: '🧋', category: 'minuman', options: ['Taro', 'Matcha', 'Coklat', 'Original'] },
      { id: 502, name: 'Smoothie Buah', desc: 'Smoothie buah segar tanpa gula tambahan', price: 10000, emoji: '🥤', category: 'minuman', options: null },
      { id: 503, name: 'Roti Bakar', desc: 'Roti bakar dengan berbagai topping', price: 8000, emoji: '🍞', category: 'makanan', options: ['Coklat', 'Keju', 'Strawberry'] },
      { id: 504, name: 'Pisang Goreng', desc: 'Pisang goreng crispy dengan madu', price: 6000, emoji: '🍌', category: 'makanan', options: null },
    ]
  },
  6: {
    name: 'Kantin 6',
    desc: 'Spesialis Ayam Goreng Kremes',
    emoji: '🍗',
    items: [
      { id: 601, name: 'Ayam Goreng Kremes', desc: 'Ayam goreng dengan kremes renyah khas', price: 18000, emoji: '🍗', category: 'makanan', options: null },
      { id: 602, name: 'Telur', desc: 'Telur goreng / ceplok / dadar', price: 5000, emoji: '🍳', category: 'makanan', options: ['Goreng', 'Ceplok', 'Dadar'] },
      { id: 603, name: 'Tempe', desc: 'Tempe goreng bumbu', price: 4000, emoji: '🟫', category: 'makanan', options: null },
      { id: 604, name: 'Tahu', desc: 'Tahu goreng bumbu', price: 4000, emoji: '🟨', category: 'makanan', options: null },
      { id: 605, name: 'Usus Basah', desc: 'Usus ayam basah bumbu kuning', price: 7000, emoji: '🍢', category: 'makanan', options: null },
      { id: 606, name: 'Usus Kering', desc: 'Usus ayam kering crispy', price: 7000, emoji: '🍢', category: 'makanan', options: null },
      { id: 607, name: 'Es Teh Manis', desc: 'Teh manis dingin', price: 4000, emoji: '🧋', category: 'minuman', options: null },
    ]
  },
  7: {
    name: 'Kantin 7', desc: 'Bakso & Mie Ayam Spesial', emoji: '🍝',
    items: [
      { id: 701, name: 'Bakso Biasa', desc: 'Bakso sapi dengan kuah kaldu', price: 12000, emoji: '🍲', category: 'makanan', options: null },
      { id: 702, name: 'Bakso Jumbo', desc: 'Bakso jumbo dengan isian daging', price: 16000, emoji: '🍲', category: 'makanan', options: null },
      { id: 703, name: 'Mie Ayam', desc: 'Mie ayam dengan topping lengkap', price: 13000, emoji: '🍝', category: 'makanan', options: null },
      { id: 704, name: 'Es Jeruk', desc: 'Jeruk peras segar', price: 5000, emoji: '🍊', category: 'minuman', options: null },
    ]
  },
  8: {
    name: 'Kantin 8', desc: 'Nasi Goreng Spesial', emoji: '🍳',
    items: [
      { id: 801, name: 'Nasi Goreng Spesial', desc: 'Nasi goreng dengan telur dan ayam', price: 15000, emoji: '🍳', category: 'makanan', options: null },
      { id: 802, name: 'Nasi Goreng Seafood', desc: 'Nasi goreng dengan udang dan cumi', price: 18000, emoji: '🦐', category: 'makanan', options: null },
      { id: 803, name: 'Mie Goreng Spesial', desc: 'Mie goreng dengan topping lengkap', price: 14000, emoji: '🍝', category: 'makanan', options: null },
      { id: 804, name: 'Teh Tarik', desc: 'Teh tarik hangat/dingin', price: 7000, emoji: '☕', category: 'minuman', options: ['Hangat', 'Dingin'] },
    ]
  },
  9: {
    name: 'Kantin 9', desc: 'Sate & Grill Lezat', emoji: '🍢',
    items: [
      { id: 901, name: 'Sate Ayam (10 tusuk)', desc: 'Sate ayam dengan bumbu kacang', price: 15000, emoji: '🍢', category: 'makanan', options: null },
      { id: 902, name: 'Sate Kambing (10 tusuk)', desc: 'Sate kambing dengan kecap', price: 20000, emoji: '🍢', category: 'makanan', options: null },
      { id: 903, name: 'Ayam Bakar', desc: 'Ayam bakar bumbu kecap', price: 18000, emoji: '🍗', category: 'makanan', options: null },
      { id: 904, name: 'Es Kelapa Muda', desc: 'Kelapa muda segar', price: 8000, emoji: '🥥', category: 'minuman', options: null },
    ]
  },
  10: {
    name: 'Kantin 10', desc: 'Pecel & Lalapan Sehat', emoji: '🥗',
    items: [
      { id: 1001, name: 'Pecel Komplit', desc: 'Pecel dengan sayuran segar dan bumbu kacang', price: 12000, emoji: '🥗', category: 'makanan', options: null },
      { id: 1002, name: 'Lalapan Ayam', desc: 'Lalapan dengan ayam goreng', price: 15000, emoji: '🥬', category: 'makanan', options: null },
      { id: 1003, name: 'Gado-gado', desc: 'Gado-gado dengan bumbu kacang spesial', price: 13000, emoji: '🥜', category: 'makanan', options: null },
      { id: 1004, name: 'Jus Tomat', desc: 'Jus tomat segar', price: 7000, emoji: '🍅', category: 'minuman', options: null },
    ]
  },
  11: {
    name: 'Kantin 11',
    desc: 'Soto & Kwetiau Spesial',
    emoji: '🍲',
    items: [
      { id: 1101, name: 'Soto Biasa', desc: 'Soto ayam kuah bening dengan nasi', price: 12000, emoji: '🍲', category: 'makanan', options: null },
      { id: 1102, name: 'Soto Jumbo', desc: 'Soto ayam porsi jumbo dengan topping extra', price: 17000, emoji: '🍲', category: 'makanan', options: null },
      { id: 1103, name: 'Kwetiau', desc: 'Kwetiau goreng/kuah dengan topping ayam', price: 14000, emoji: '🍜', category: 'makanan', options: ['Pedes', 'Original'] },
      { id: 1104, name: 'Mie Ayam', desc: 'Mie ayam dengan kuah kaldu spesial', price: 13000, emoji: '🍝', category: 'makanan', options: ['Pedes', 'Original'] },
      { id: 1105, name: 'Es Teh Manis', desc: 'Teh manis dingin', price: 4000, emoji: '🧋', category: 'minuman', options: null },
      { id: 1106, name: 'Es Jeruk', desc: 'Jeruk peras segar', price: 5000, emoji: '🍊', category: 'minuman', options: null },
    ]
  },
  12: {
    name: 'Kantin 12', desc: 'Es & Minuman Segar', emoji: '🧊',
    items: [
      { id: 1201, name: 'Es Krim Cone', desc: 'Es krim cone dengan berbagai rasa', price: 8000, emoji: '🍦', category: 'minuman', options: ['Vanilla', 'Coklat', 'Stroberi'] },
      { id: 1202, name: 'Es Doger', desc: 'Es doger dengan tape dan kelapa', price: 10000, emoji: '🍧', category: 'minuman', options: null },
      { id: 1203, name: 'Jus Mangga', desc: 'Jus mangga segar tanpa pengawet', price: 8000, emoji: '🥭', category: 'minuman', options: null },
      { id: 1204, name: 'Kue Cubit', desc: 'Kue cubit mini berbagai rasa', price: 5000, emoji: '🧁', category: 'makanan', options: ['Original', 'Coklat', 'Keju'] },
      { id: 1205, name: 'Martabak Mini', desc: 'Martabak mini manis', price: 7000, emoji: '🥞', category: 'makanan', options: null },
    ]
  }
};

let cart = [];
let currentKantinId = 1;
let currentCategory = 'semua';
let selectedItem = null;
let modalQty = 1;
let selectedOption = null;

function init() {
  const id = parseInt(localStorage.getItem('selectedKantin') || '1');
  currentKantinId = id;
  const kantin = allMenuData[id];

  document.title = `${kantin.name} - KantinKu`;
  document.getElementById('kantinTitle').textContent = kantin.name;
  document.getElementById('kantinName').textContent = kantin.name;
  document.getElementById('kantinDesc').textContent = kantin.desc;
  document.getElementById('kantinAvatar').innerHTML = `<span style="font-size:28px;">${kantin.emoji}</span>`;

  // Load cart from storage
  const savedCart = localStorage.getItem(`cart_${id}`);
  if (savedCart) cart = JSON.parse(savedCart);

  renderMenu(kantin.items);
  updateCartUI();
}

function renderMenu(items) {
  const grid = document.getElementById('menuGrid');
  const filtered = currentCategory === 'semua' ? items : items.filter(i => i.category === currentCategory);
  grid.innerHTML = '';

  if (filtered.length === 0) {
    grid.innerHTML = `<div class="empty-state"><i class="fas fa-utensils"></i><p>Tidak ada menu di kategori ini</p></div>`;
    return;
  }

  filtered.forEach(item => {
    const card = document.createElement('div');
    card.className = 'menu-item-card';
    card.onclick = () => openModal(item);

    const tags = item.options ? `<div class="menu-item-tags"><span class="menu-tag">${item.options.length} pilihan</span></div>` : '';
    const spicyTag = item.name.toLowerCase().includes('pedes') || item.name.toLowerCase().includes('iblis')
      ? `<span class="menu-tag spicy">🌶️ Pedas</span>` : '';

    card.innerHTML = `
      <div class="menu-item-img">${item.emoji}</div>
      <div class="menu-item-info">
        <h4>${item.name}</h4>
        <p>${item.desc}</p>
        <div class="menu-item-price">Rp ${item.price.toLocaleString('id-ID')}</div>
        <div class="menu-item-tags">${spicyTag}${tags}</div>
      </div>
      <button class="menu-add-btn" onclick="event.stopPropagation(); openModal(${JSON.stringify(item).replace(/"/g, '&quot;')})">
        <i class="fas fa-plus"></i>
      </button>
    `;
    grid.appendChild(card);
  });
}

function filterCategory(cat, btn) {
  currentCategory = cat;
  document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  renderMenu(allMenuData[currentKantinId].items);
}

// MODAL
function openModal(item) {
  selectedItem = item;
  modalQty = 1;
  selectedOption = item.options ? item.options[0] : null;

  document.getElementById('modalName').textContent = item.name;
  document.getElementById('modalDesc').textContent = item.desc;
  document.getElementById('modalPrice').textContent = `Rp ${item.price.toLocaleString('id-ID')}`;
  document.getElementById('modalImg').innerHTML = `<span style="font-size:72px;">${item.emoji}</span>`;
  document.getElementById('modalQty').textContent = modalQty;

  const optionsEl = document.getElementById('modalOptions');
  if (item.options && item.options.length > 0) {
    optionsEl.innerHTML = `
      <p>Pilih Varian:</p>
      <div class="option-chips">
        ${item.options.map((opt, i) => `
          <button class="option-chip ${i === 0 ? 'selected' : ''}" onclick="selectOption(this, '${opt}')">${opt}</button>
        `).join('')}
      </div>
    `;
  } else {
    optionsEl.innerHTML = '';
  }

  document.getElementById('itemModal').classList.add('open');
  document.getElementById('modalOverlay').classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeModal() {
  document.getElementById('itemModal').classList.remove('open');
  document.getElementById('modalOverlay').classList.remove('active');
  document.body.style.overflow = '';
}

function selectOption(btn, opt) {
  document.querySelectorAll('.option-chip').forEach(b => b.classList.remove('selected'));
  btn.classList.add('selected');
  selectedOption = opt;
}

function changeQty(delta) {
  modalQty = Math.max(1, modalQty + delta);
  document.getElementById('modalQty').textContent = modalQty;
}

function addToCartFromModal() {
  if (!selectedItem) return;

  const cartItem = {
    ...selectedItem,
    qty: modalQty,
    option: selectedOption,
    cartId: `${selectedItem.id}_${selectedOption || 'default'}`
  };

  const existing = cart.find(c => c.cartId === cartItem.cartId);
  if (existing) {
    existing.qty += modalQty;
  } else {
    cart.push(cartItem);
  }

  saveCart();
  updateCartUI();
  closeModal();
  showToast(`${selectedItem.name} ditambahkan ke keranjang`, 'success');
}

// CART
function toggleCart() {
  const drawer = document.getElementById('cartDrawer');
  const overlay = document.getElementById('cartOverlay');
  drawer.classList.toggle('open');
  overlay.classList.toggle('active');
}

function updateCartUI() {
  const total = cart.reduce((s, i) => s + i.price * i.qty, 0);
  const count = cart.reduce((s, i) => s + i.qty, 0);

  document.getElementById('cartBadge').textContent = count;
  document.getElementById('cartCount').textContent = `${count} item`;
  document.getElementById('cartTotal').textContent = `Rp ${total.toLocaleString('id-ID')}`;
  document.getElementById('cartTotalDrawer').textContent = `Rp ${total.toLocaleString('id-ID')}`;

  const cartBar = document.getElementById('cartBar');
  cartBar.style.display = count > 0 ? 'flex' : 'none';

  renderCartItems();
}

function renderCartItems() {
  const container = document.getElementById('cartItems');
  const footer = document.getElementById('cartFooter');

  if (cart.length === 0) {
    container.innerHTML = `<div class="cart-empty"><i class="fas fa-shopping-cart"></i><p>Keranjang masih kosong</p></div>`;
    footer.style.display = 'none';
    return;
  }

  footer.style.display = 'block';
  container.innerHTML = cart.map(item => `
    <div class="cart-item-row">
      <div class="cart-item-icon">${item.emoji}</div>
      <div class="cart-item-info">
        <p>${item.name}${item.option ? ` (${item.option})` : ''}</p>
        <span>Rp ${(item.price * item.qty).toLocaleString('id-ID')}</span>
      </div>
      <div class="cart-item-qty">
        <button onclick="updateQty('${item.cartId}', -1)"><i class="fas fa-minus"></i></button>
        <span>${item.qty}</span>
        <button onclick="updateQty('${item.cartId}', 1)"><i class="fas fa-plus"></i></button>
      </div>
    </div>
  `).join('');
}

function updateQty(cartId, delta) {
  const item = cart.find(c => c.cartId === cartId);
  if (!item) return;
  item.qty += delta;
  if (item.qty <= 0) cart = cart.filter(c => c.cartId !== cartId);
  saveCart();
  updateCartUI();
}

function saveCart() {
  localStorage.setItem(`cart_${currentKantinId}`, JSON.stringify(cart));
  localStorage.setItem('activeCart', JSON.stringify({ kantinId: currentKantinId, items: cart }));
}

function goToPayment() {
  if (cart.length === 0) return;
  window.location.href = 'payment.html';
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

init();
