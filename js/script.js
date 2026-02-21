/**
 * Centuryboy's Hub — Core Logic (Take 2)
 */

const products = [
  // AIRPODS
  { id: 1, name: "AirPods Pro 3", price: 340, oldPrice: 500, category: "airpods", badge: "IOS 26 VERIFIED", img: "assets/airpods-pro-3.jpg", rating: 5.0, stars: 5, reviewCount: 128, soldCount: 450, stock: 12, specs: { driver: "Custom High-Excursion", battery: "6hrs (30hrs w/ Case)", chip: "H2 Apple Silicon", charging: "MagSafe / USB-C", sensors: "Skin-detect / Motion" } },
  { id: 2, name: "AirPods Pro 2", price: 190, oldPrice: 280, category: "airpods", badge: "BEST SELLER", img: "assets/airpods-pro-2-gen.jpg", rating: 4.8, stars: 5, reviewCount: 215, soldCount: 1200, stock: 5, specs: { driver: "Low-Distortion", battery: "6hrs (30hrs w/ Case)", chip: "H2 Chip", charging: "Lightning / MagSafe", transparency: "Adaptive" } },
  { id: 3, name: "AirPods Pro", price: 160, oldPrice: 200, category: "airpods", badge: "V.1 LIMITED", img: "assets/airpods-pro-v1.jpg", rating: 4.7, stars: 4, reviewCount: 89, soldCount: 800, stock: 3, specs: { driver: "High-Excursion", battery: "4.5hrs (24hrs w/ Case)", chip: "H1 Chip", charging: "Lightning", anc: "Active" } },
  { id: 4, name: "AirPods 3", price: 170, oldPrice: 230, category: "airpods", badge: "POPULAR", img: "assets/airpods-3-new.webp", rating: 4.8, stars: 5, reviewCount: 64, soldCount: 320, stock: 15, specs: { audio: "Spatial Audio", battery: "6hrs Total", design: "Contoured", water: "IPX4", charging: "MagSafe Inc." } },
  { id: 5, name: "AirPods 4", price: 260, oldPrice: 350, category: "airpods", badge: "BUDGET", img: "assets/airpods4.jpg", rating: 4.5, stars: 4, reviewCount: 156, soldCount: 2000, stock: 20, specs: { connection: "Instant Device Switch", battery: "5hrs Talk", chip: "H1", voice: "Always-on Siri", sensor: "Optical" } },
  { id: 6, name: "AirPods Max", price: 1800, category: "airpods", badge: "ELITE PRODUCTS", img: "assets/AirPods-Max-black.webp", rating: 5.0, stars: 5, reviewCount: 42, soldCount: 110, stock: 2, specs: { driver: "40mm Dynamic", battery: "20hrs ANC", chip: "Dual H2", charging: "L-Port", build: "Mesh/Alu" } },

  // CHARGERS & ACCESSORIES
  { id: 7, name: "20W USB-C Charger", price: 120, category: "chargers", badge: "ORIGINAL", img: "assets/usb-c-charger-20w.png", rating: 4.5, stars: 5, reviewCount: 310, soldCount: 5000, stock: 20, specs: { output: "20W Max", port: "USB-C", safety: "PD 3.0", design: "Folding", weight: "55g" } },
  { id: 9, name: "Charging Cable (C to L)", price: 4, category: "chargers", badge: "MFI CERTIFIED", img: "assets/charging-cable-c-to-l.png", rating: 4.4, stars: 4, reviewCount: 115, soldCount: 750, stock: 50, specs: { length: "1m", build: "Braided", certification: "MFi", speed: "480Mbps", power: "30W Max" } },
  { id: 10, name: "Type-C to Type-C Cable", price: 60, category: "chargers", badge: "ORIGINAL", img: "assets/type-c-to-type-c-cable.png", rating: 4.3, stars: 4, reviewCount: 310, soldCount: 5000, stock: 45, specs: { length: "1m", build: "TPE", power: "60W Max", speed: "USB 2.0", sync: "Yes" } },
  { id: 11, name: "MacBook Charger", price: 350, category: "chargers", badge: "PREMIUM", img: "assets/macbook-charger.png", rating: 4.7, stars: 5, reviewCount: 22, soldCount: 45, stock: 10, specs: { output: "96W PD", port: "USB-C", cables: "Not Inc.", weight: "180g", safety: "Over-Volt" } },
  { id: 13, name: "MagSafe Battery Pack", price: 170, category: "accessories", badge: "HOT", img: "assets/battery pack.jpg", rating: 4.9, stars: 5, reviewCount: 18, soldCount: 104, stock: 18, specs: { capacity: "5k mAh", snap: "Instant", charging: "Pass-thru", tech: "Lithium", thickness: "11mm" } },
  { id: 21, name: "Powerbank High-Cap", price: 300, category: "accessories", badge: "WIRELESS", img: "assets/wireless powerbank.webp", rating: 4.6, stars: 4, reviewCount: 115, soldCount: 750, stock: 25, specs: { capacity: "10k mAh", wireless: "7.5W", ports: "2 Output", display: "LED Digital", weight: "220g" } },

  // Original products from ID 14 onwards (retained)
  { id: 14, name: "PlayStation 4 Slim", price: 0, category: "playstation", badge: "CONTACT FOR PRICE", img: "assets/ps 4 slim.webp", rating: 4.5, stars: 4, reviewCount: 12, soldCount: 5, stock: 0, specs: { storage: "500GB/1TB", resolution: "1080p", controllers: "1 Blue", power: "165W", color: "Black" } },
  { id: 15, name: "PlayStation 4 Pro", price: 0, category: "playstation", badge: "CONTACT FOR PRICE", img: "assets/ps4 pro.webp", rating: 4.6, stars: 5, reviewCount: 8, soldCount: 3, stock: 0, specs: { storage: "1TB HDD", resolution: "4K native", hdr: "Supported", audio: "Optical Out", wifi: "5GHz" } },
  { id: 16, name: "PlayStation 5 Slim", price: 7500, category: "gaming", badge: "NEW ARRIVAL", img: "assets/ps5 slim.webp", rating: 5.0, stars: 5, reviewCount: 24, soldCount: 12, stock: 4, specs: { storage: "1TB SSD", resolution: "4K 120Hz", type: "Disc/Digital", build: "Compact", tech: "Ray Tracing" } },
  { id: 17, name: "PlayStation 5 Standard", price: 6500, category: "playstation", badge: "IN STOCK", img: "assets/standard.webp", rating: 4.9, stars: 5, reviewCount: 19, soldCount: 7, stock: 7, specs: { storage: "825GB SSD", resolution: "4K HDR", controllers: "1 Inc.", port: "HDMI 2.1", tech: "Tempest 3D" } },
  { id: 18, name: "PlayStation 5 Pro", price: 9000, category: "playstation", badge: "PREMIUM", img: "assets/ps5 pro.webp", rating: 5.0, stars: 5, reviewCount: 4, soldCount: 2, stock: 3, specs: { storage: "2TB SSD", resolution: "8K 60Hz", pssr: "AI Scaling", gpu: "Enhanced", build: "Pro Tower" } },
  { id: 19, name: "PS5 DualSense Controller", price: 1050, category: "controllers", badge: "ORIGINAL", img: "assets/ps5 control.webp", rating: 4.8, stars: 5, reviewCount: 56, soldCount: 210, stock: 12, specs: { haptics: "Adaptive Triggers", feedback: "Haptic", battery: "1560mAh", tech: "Bluetooth 5.1", weight: "280g" } },
  { id: 20, name: "PS4 DualShock 4", price: 160, category: "controllers", badge: "BEST SELLER", img: "assets/ps4 controller.webp", rating: 4.7, stars: 5, reviewCount: 92, soldCount: 450, stock: 15, specs: { touch: "2-Point Pad", light: "Integrated Bar", battery: "1000mAh", tech: "Bluetooth 2.1", weight: "210g" } },

  // VIDEOGRAPHY
  { id: 23, name: "AI Face Tracking Quadrapod", price: 280, category: "videography", badge: "PROMO", img: "assets/quadrapod.webp", rating: 4.5, stars: 4, reviewCount: 31, soldCount: 85, stock: 20, specs: { rotation: "360 Loop", tracking: "AI Vision", mount: "Tripod Opt", battery: "15hrs", payload: "3kg" } }
];

let cart = [];
try {
  const savedCart = localStorage.getItem('cb_cart');
  if (savedCart) cart = JSON.parse(savedCart);
} catch (e) {
  console.error("Error parsing cart data from localStorage:", e);
  cart = [];
}

// ── Theme System ──────────────────────────────────────────────
(function initTheme() {
  const saved = localStorage.getItem('cb_theme') || 'dark';
  if (saved === 'light') {
    document.documentElement.setAttribute('data-theme', 'light');
  }
})();

window.toggleTheme = () => {
  const html = document.documentElement;
  const icon = document.getElementById('theme-icon');
  const isLight = html.getAttribute('data-theme') === 'light';

  if (isLight) {
    html.removeAttribute('data-theme');
    localStorage.setItem('cb_theme', 'dark');
    if (icon) { icon.className = 'fas fa-sun'; }
    document.getElementById('theme-toggle')?.setAttribute('title', 'Switch to Light Mode');
  } else {
    html.setAttribute('data-theme', 'light');
    localStorage.setItem('cb_theme', 'light');
    if (icon) { icon.className = 'fas fa-moon'; }
    document.getElementById('theme-toggle')?.setAttribute('title', 'Switch to Dark Mode');
  }
};

document.addEventListener('DOMContentLoaded', () => {
  // Sync icon with current saved theme
  const saved = localStorage.getItem('cb_theme') || 'dark';
  const icon = document.getElementById('theme-icon');
  const btn = document.getElementById('theme-toggle');
  if (icon) icon.className = saved === 'light' ? 'fas fa-moon' : 'fas fa-sun';
  if (btn) btn.setAttribute('title', saved === 'light' ? 'Switch to Dark Mode' : 'Switch to Light Mode');
  if (btn) btn.addEventListener('click', window.toggleTheme);

  renderProducts('all');
  initEventListeners();
  updateCartUI();
  renderRecentlyViewed();

  const searchInput = document.getElementById('product-search');
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      const query = e.target.value.toLowerCase();
      renderProducts(activeCategory, query);
    });
  }
});


let activeCategory = 'all'; // Initialize activeCategory
let pendingWhatsAppUrl = ''; // Store URL for celebration redirect


function renderProducts(category = 'all', query = '') {
  activeCategory = category;
  const container = document.getElementById('product-container');
  if (!container) return;

  let filtered = products;

  // Apply category filter first
  if (category !== 'all') {
    filtered = filtered.filter(p => p.category === category);
  }

  // Apply search query filter
  if (query) {
    filtered = filtered.filter(p =>
      p.name.toLowerCase().includes(query) ||
      p.badge.toLowerCase().includes(query) ||
      p.category.toLowerCase().includes(query)
    );
  }

  container.innerHTML = '';

  if (filtered.length === 0) {
    container.innerHTML = `
      <div class="col-span-full py-20 text-center text-gray-500 animate-fade-in">
        <i class="fas fa-search text-4xl mb-4 opacity-20"></i>
        <p>No products found matching your search</p>
      </div>`;
    return;
  }

  filtered.forEach(p => {
    const card = document.createElement('div');
    card.className = "card-lift matte-card p-4 rounded-3xl relative animate-fade-in group product-xray-card";
    card.draggable = true;
    card.setAttribute('ondragstart', `window.handleDragStart(event, ${p.id})`);

    const starsHtml = Array(5).fill(0).map((_, i) =>
      `<i class="fas fa-star ${i < p.stars ? 'text-accent-cyan' : 'text-white/10'}"></i>`
    ).join('');

    card.innerHTML = `
      <div class="absolute top-4 left-4 z-10 flex flex-col gap-1">
        <span class="px-3 py-1 bg-black/60 backdrop-blur-md rounded-full text-[8px] font-bold border border-glass-border tracking-widest uppercase text-white/90">
          ${p.badge}
        </span>
        ${p.oldPrice ? `<span class="sale-badge mt-1">SALE</span>` : ''}
      </div>
      <!-- 🟢 100% Authentic Shield -->
      <div class="absolute bottom-4 left-4 z-10">
        <span class="flex items-center gap-1 px-2 py-1 bg-green-500/20 border border-green-500/40 rounded-full text-[7px] font-bold text-green-400 uppercase tracking-widest backdrop-blur-sm">
          <i class="fas fa-shield-halved text-[8px]"></i> 100% Authentic
        </span>
      </div>
      <div class="absolute top-4 right-4 z-10 flex flex-col gap-2">
        <button onclick="toggleWishlist(event, ${p.id})" class="w-8 h-8 rounded-full glass-card border-glass-border flex items-center justify-center hover:bg-white/10 transition-colors">
          <i class="${wishlist.includes(p.id) ? 'fas text-accent-cyan' : 'far text-white/40'} fa-heart text-[10px]"></i>
        </button>
      </div>
      
      <div class="aspect-square rounded-2xl bg-black/20 p-6 mb-4 flex items-center justify-center relative overflow-hidden group-hover:bg-black/30 transition-all">
        <img src="${p.img}" alt="${p.name}" loading="lazy" class="w-full h-full object-contain group-hover:scale-110 transition-transform duration-500">
      </div>

      <div class="mb-3">
        <h3 class="font-header text-[15px] font-bold truncate">${p.name}</h3>
        <div class="flex items-center gap-1 mt-1">
          <div class="flex items-center">
            ${starsHtml}
          </div>
          <span class="text-[9px] text-gray-400 font-mono tracking-widest ml-1">${p.rating} (${p.reviewCount})</span>
        </div>
      </div>

      <div class="flex flex-col mt-auto gap-3">
        <div class="flex flex-col">
          ${p.oldPrice ? `
            <span class="price-old">GHS ${p.oldPrice.toLocaleString()}</span>
            <span class="price-new">GHS ${p.price.toLocaleString()}</span>
          ` : `
            <span class="price-new">GHS ${p.price.toLocaleString()}</span>
          `}
          <!-- 💳 MoMo icons below price -->
          <div class="flex items-center gap-2 mt-2 flex-wrap">
            <span class="text-[9px] font-bold px-2 py-0.5 rounded-full border" style="color: #FFCC00; border-color: rgba(255,204,0,0.3); background: rgba(255,204,0,0.08);">MTN MoMo</span>
            <span class="text-[9px] font-bold px-2 py-0.5 rounded-full border" style="color: #E60000; border-color: rgba(230,0,0,0.3); background: rgba(230,0,0,0.08);">Telecel</span>
            <span class="text-[9px] font-bold px-2 py-0.5 rounded-full border" style="color: #5599CC; border-color: rgba(85,153,204,0.3); background: rgba(85,153,204,0.08);">AirtelTigo</span>
          </div>
        </div>
        
        <div class="flex flex-col gap-1 my-1 opacity-80">
          <span class="text-[9px] font-bold text-green-400 tracking-widest uppercase"><i class="fas fa-truck-fast mr-1"></i> Delivery in 1-3 Days</span>
          ${p.soldCount > 100 ? `<span class="text-[9px] font-bold text-accent-cyan tracking-widest uppercase"><i class="fas fa-fire mr-1"></i> Best Seller in Accra</span>` : ''}
          ${p.stock < 10 && p.stock > 0 ? `<span class="text-[9px] font-bold text-red-400 tracking-widest uppercase"><i class="fas fa-bolt mr-1"></i> Only ${p.stock} left</span>` : ''}
        </div>

        <button onclick="addToCart(event, ${p.id})" style="min-height:60px; font-size:15px; font-weight:800; letter-spacing:0.05em;" class="w-full holographic-btn shadow-[0_0_20px_rgba(37,99,255,0.5)] active:scale-95 ${p.stock === 0 ? 'opacity-50 cursor-not-allowed' : ''}" ${p.stock === 0 ? 'disabled' : ''}>
          <i class="fas fa-cart-plus mr-2"></i> ADD TO CART
        </button>
      </div>
      
      <button onclick="openSpecsModal(${p.id})" class="w-full mt-3 py-3 rounded-xl border border-glass-border text-[10px] font-bold uppercase tracking-[0.2em] text-gray-400 hover:text-white hover:bg-white/5 transition-all">
        VIEW SPECS
      </button>
    `;
    container.appendChild(card);
  });
}

function initEventListeners() {
  document.querySelectorAll('.tab-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.tab-btn').forEach(b => {
        b.classList.remove('tab-active', 'text-cyan');
        b.classList.add('text-gray-500');
      });
      btn.classList.add('tab-active', 'text-cyan');
      btn.classList.remove('text-gray-500');
      renderProducts(btn.dataset.category);
    });
  });

  const cartTrigger = document.getElementById('cart-trigger');
  const cartClose = document.getElementById('cart-close');
  const cartOverlay = document.getElementById('cart-overlay');
  const cartPanel = document.getElementById('cart-panel');

  const toggleCart = (show) => {
    if (!cartOverlay || !cartPanel) return;
    if (show) {
      cartOverlay.classList.remove('hidden');
      setTimeout(() => {
        cartOverlay.classList.add('opacity-100');
        cartPanel.classList.remove('translate-x-full');
      }, 50);
    } else {
      cartOverlay.classList.remove('opacity-100');
      cartPanel.classList.add('translate-x-full');
      setTimeout(() => {
        cartOverlay.classList.add('hidden');
      }, 300);
    }
  };

  if (cartTrigger) cartTrigger.addEventListener('click', () => toggleCart(true));
  if (cartClose) cartClose.addEventListener('click', () => toggleCart(false));
  if (cartOverlay) cartOverlay.addEventListener('click', () => toggleCart(false));

  const checkoutBtn = document.getElementById('checkout-btn');
  if (checkoutBtn) checkoutBtn.addEventListener('click', () => openCheckoutModal('whatsapp'));

  const paystackBtn = document.getElementById('paystack-btn');
  if (paystackBtn) paystackBtn.addEventListener('click', () => openCheckoutModal('paystack'));

  // Global reference for cart toggling
  window.toggleCart = toggleCart;
}

// Toast Notification System
window.showToast = (message, type = 'info') => {
  const container = document.getElementById('toast-container');
  if (!container) return;

  const toast = document.createElement('div');
  toast.className = `toast toast-${type}`;

  const icon = type === 'success' ? 'fa-check-circle' : 'fa-info-circle';
  toast.innerHTML = `<i class="fas ${icon}"></i><span>${message}</span>`;

  container.appendChild(toast);

  // Auto remove after 3 seconds
  setTimeout(() => {
    toast.classList.add('removing');
    setTimeout(() => toast.remove(), 300);
  }, 3000);
};

window.clearCart = () => {
  if (cart.length === 0) {
    showToast("Cart is already empty", "info");
    return;
  }
  cart = [];
  localStorage.setItem('cb_cart', JSON.stringify(cart));
  updateCartUI();
  showToast("Cart cleared successfully", "success");
};

window.openTrackingModal = () => {
  document.getElementById('tracking-modal').classList.remove('hidden');
  document.getElementById('tracking-result').classList.add('hidden');
};

window.closeTrackingModal = () => {
  document.getElementById('tracking-modal').classList.add('hidden');
};

window.trackOrder = () => {
  const orderId = document.getElementById('order-id-input').value.trim().toUpperCase();
  if (!orderId) return showToast("Please enter an Order ID", "info");

  const result = document.getElementById('tracking-result');
  result.classList.remove('hidden');

  // Simulating status
  const statuses = [
    { label: 'Processing', icon: 'fa-cog fa-spin', color: 'text-gray-400' },
    { label: 'Packed', icon: 'fa-box', color: 'text-blue-400' },
    { label: 'Out for Delivery', icon: 'fa-truck', color: 'text-cyan-400' },
    { label: 'Delivered', icon: 'fa-check-circle', color: 'text-green-400' }
  ];

  // Deterministic pseudo-random status based on ID
  const charSum = orderId.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
  const status = statuses[charSum % statuses.length];

  result.innerHTML = `
        <div class="flex items-center gap-4">
            <div class="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center ${status.color}">
                <i class="fas ${status.icon}"></i>
            </div>
            <div>
                <p class="text-[10px] text-gray-400 uppercase tracking-widest">Order ${orderId}</p>
                <h4 class="font-bold text-sm ${status.color}">${status.label}</h4>
            </div>
        </div>
        <div class="mt-4 w-full bg-white/5 h-1 rounded-full overflow-hidden">
            <div class="h-full bg-violet" style="width: ${(statuses.indexOf(status) + 1) * 25}%"></div>
        </div>
    `;
};


// FEATURE 4: Wishlist
let wishlist = JSON.parse(localStorage.getItem('cb_wishlist')) || [];
let recentlyViewed = JSON.parse(localStorage.getItem('cb_recent')) || [];

const sampleReviews = [
  { name: "Kojo B.", text: "Exceeded my expectations. The sound quality is insane.", stars: 5 },
  { name: "Ama R.", text: "Legit products and very fast delivery to Kumasi.", stars: 5 },
  { name: "David T.", text: "Hub service is top tier. 10/10 will buy again.", stars: 4 },
  { name: "Sarah L.", text: "Obsidian design is fire. Product is 100% authentic.", stars: 5 },
  { name: "Ibrahim M.", text: "Best tech shop in Accra. Competitive prices.", stars: 5 }
];

window.toggleWishlist = (e, id) => {
  e.stopPropagation();
  const index = wishlist.indexOf(id);
  if (index === -1) {
    wishlist.push(id);
    showToast("Added to Wishlist", "info");
  } else {
    wishlist.splice(index, 1);
    showToast("Removed from Wishlist", "info");
  }
  localStorage.setItem('cb_wishlist', JSON.stringify(wishlist));
  renderProducts(activeCategory); // Refresh to update hearts
};

// FEATURE 6: Technical Specs Modal
window.openSpecsModal = (productId) => {
  const product = products.find(p => p.id === productId);
  if (!product) return;

  // Track Recently Viewed
  addToRecentlyViewed(productId);

  document.getElementById('specs-title').innerText = product.name;
  document.getElementById('specs-img').src = product.img;
  document.getElementById('specs-img').style.opacity = '0.3';
  document.getElementById('specs-price').innerText = `GHS ${product.price.toLocaleString()}`;

  // Open modal immediately to show scan
  document.getElementById('specs-modal').classList.remove('hidden');
  document.getElementById('specs-modal').classList.add('flex');

  const container = document.getElementById('specs-visual-container');
  const scanStatus = document.getElementById('scan-status');
  const list = document.getElementById('specs-list');

  // Show Loading State
  list.innerHTML = `
    <div class="flex flex-col items-center justify-center h-full py-12 space-y-4">
      <div class="w-8 h-8 border-2 border-accent-cyan/20 border-t-accent-cyan rounded-full animate-spin"></div>
      <p class="font-mono text-[9px] uppercase tracking-[0.3em] text-gray-500">Decrypting Schematic...</p>
    </div>
  `;

  // Trigger Scanning UI
  container.classList.add('scanning-active');
  scanStatus.classList.remove('hidden');

  // Simulated Hardware ID flicker
  const randomId = 'HW-' + Math.random().toString(36).substr(2, 9).toUpperCase();
  scanStatus.querySelector('.scan-text-flicker').innerText = `IDENTIFYING: ${randomId}`;

  // Delayed Data Reveal
  setTimeout(() => {
    container.classList.remove('scanning-active');
    scanStatus.classList.add('hidden');
    document.getElementById('specs-img').style.opacity = '1';

    list.innerHTML = Object.entries(product.specs).map(([key, value]) => `
    <div class="flex justify-between items-center border-b border-white/5 py-2 group">
      <span class="text-[10px] uppercase font-mono text-gray-500 group-hover:text-accent-cyan transition-colors">${key}</span>
      <span class="text-xs font-bold text-white/90">${value}</span>
    </div>
  `).join('');

    // Render Reviews Sample
    const reviewsContainer = document.getElementById('product-reviews-sample');
    if (reviewsContainer) {
      const shuffled = [...sampleReviews].sort(() => 0.5 - Math.random());
      const selected = shuffled.slice(0, 2);

      reviewsContainer.innerHTML = selected.map(rev => `
      <div class="bg-white/5 border border-glass-border p-3 rounded-xl">
        <div class="flex items-center gap-1 mb-1">
          ${Array(5).fill(0).map((_, i) => `<i class="fas fa-star text-[7px] ${i < rev.stars ? 'text-accent-cyan' : 'text-white/10'}"></i>`).join('')}
        </div>
        <p class="text-[10px] text-gray-400 italic mb-1 truncate">"${rev.text}"</p>
        <p class="text-[8px] font-bold text-accent-cyan uppercase tracking-widest">— ${rev.name}</p>
      </div>
    `).join('');
    }
  }, 1500);
};

window.closeSpecsModal = () => {
  document.getElementById('specs-modal').classList.add('hidden');
  document.getElementById('specs-modal').classList.remove('flex');
};



// FEATURE 8: Order Success Celebration
window.triggerCelebration = () => {
  const receiptItems = document.getElementById('receipt-items');
  const receiptTotal = document.getElementById('receipt-total');
  const authId = document.getElementById('receipt-auth-id');

  // Generate Auth ID
  const randomId = 'CBH-' + Math.random().toString(36).substr(2, 6).toUpperCase();
  authId.innerText = randomId;

  // Populate Receipt
  receiptItems.innerHTML = cart.map(item => `
        <div class="receipt-item-row">
            <span class="text-white font-medium">${item.name} <span class="text-gray-500 text-[10px]">x${item.quantity}</span></span>
            <span class="text-white font-mono">GHS ${(item.price * item.quantity).toLocaleString()}</span>
        </div>
    `).join('');

  const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const hasAirPods = cart.some(i => i.category === 'airpods');
  const hasCharger = cart.some(i => i.category === 'chargers');
  const discount = (hasAirPods && hasCharger) ? 50 : 0;
  const finalTotal = Math.max(0, total - discount);

  receiptTotal.innerText = `GHS ${finalTotal.toLocaleString()}.00`;

  // Show Modal
  document.getElementById('success-modal').classList.add('flex');
  document.getElementById('success-modal').classList.remove('hidden');

  // Run Confetti
  startConfetti();

  // Clear Cart early so it's fresh after celebration
  const finalCart = [...cart];
  cart = [];
  localStorage.removeItem('cb_cart');
  updateCartUI();
};

function startConfetti() {
  const canvas = document.getElementById('confetti-canvas');
  const ctx = canvas.getContext('2d');
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  let particles = [];
  const colors = ['#2563ff', '#4f46e5', '#ffffff', '#10b981'];

  for (let i = 0; i < 150; i++) {
    particles.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height - canvas.height,
      size: Math.random() * 8 + 2,
      color: colors[Math.floor(Math.random() * colors.length)],
      speed: Math.random() * 5 + 2,
      angle: Math.random() * 6.28
    });
  }

  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach(p => {
      p.y += p.speed;
      p.x += Math.sin(p.angle) * 2;
      ctx.fillStyle = p.color;
      ctx.fillRect(p.x, p.y, p.size, p.size);
      if (p.y > canvas.height) p.y = -10;
    });
    if (document.getElementById('success-modal').classList.contains('flex')) {
      requestAnimationFrame(animate);
    }
  }
  animate();
}

window.continueToWhatsApp = () => {
  if (pendingWhatsAppUrl) {
    window.open(pendingWhatsAppUrl, '_blank');
    closeSuccessModal();
  }
};

window.closeSuccessModal = () => {
  document.getElementById('success-modal').classList.add('hidden');
  document.getElementById('success-modal').classList.remove('flex');
};

// Feature 5 (Removed)

window.handleNewsletter = (e) => {
  e.preventDefault();
  const email = document.getElementById('newsletter-email').value;
  if (email) {
    showToast("Welcome to the Hub! Check your inbox soon.", "success");
    e.target.reset();
  }
};

window.openCheckoutModal = (mode) => {
  if (cart.length === 0) return; // Prevent opening if empty
  document.getElementById('checkout-mode').value = mode;
  document.getElementById('checkout-modal').classList.remove('hidden');
};

window.closeCheckoutModal = () => {
  document.getElementById('checkout-modal').classList.add('hidden');
};

window.processCheckout = () => {
  const mode = document.getElementById('checkout-mode').value;
  const name = document.getElementById('checkout-name').value.trim();
  const email = document.getElementById('checkout-email').value.trim();

  if (!name) return showToast("Please enter your full name.", "error");
  if (!email || !email.includes('@')) return showToast("Please enter a valid email address.", "error");

  const totalAmount = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const hasAirPods = cart.some(i => i.category === 'airpods');
  const hasCharger = cart.some(i => i.category === 'chargers');
  const discount = (hasAirPods && hasCharger) ? 50 : 0;
  const finalTotalAmount = Math.max(0, totalAmount - discount);

  if (mode === 'paystack') {
    const handler = PaystackPop.setup({
      key: 'pk_live_2efe7da796c478510aa668864c0c4bbfc9cc1d1e',
      email: email,
      amount: finalTotalAmount * 100,
      currency: 'GHS',
      ref: 'CBH_' + Math.floor((Math.random() * 1000000000) + 1),
      metadata: {
        custom_fields: [
          { display_name: "Customer Name", variable_name: "customer_name", value: name }
        ]
      },
      callback: function (response) {
        showToast('Payment successful!', 'success');
        finalizeOrder();
      },
      onClose: function () {
        showToast('Transaction cancelled', 'info');
      }
    });
    handler.openIframe();
    closeCheckoutModal();
  } else {
    // WhatsApp Mode
    const message = `*NEW VIP ORDER - CENTURYBOY'S HUB*%0A%0A` +
      `*Customer:* ${name}%0A` +
      `*Email:* ${email}%0A%0A` +
      `*Items Requested:*%0A${cart.map(i => `- ${i.name} (x${i.quantity})`).join('%0A')}%0A%0A` +
      (discount > 0 ? `*Combo Discount:* -GHS ${discount}%0A` : '') +
      `*Total: GHS ${finalTotalAmount.toLocaleString()}*%0A%0A` +
      `Please confirm my order.`;

    pendingWhatsAppUrl = `https://wa.me/233540639091?text=${message}`;
    triggerCelebration();
    closeCheckoutModal();
  }
};

window.finalizeOrder = () => {
  triggerCelebration();
};

window.addToCart = (e, id) => {
  const product = products.find(p => p.id === id);
  if (!product) return;

  if (product.price === 0) {
    window.open(`https://wa.me/233540639091?text=Hi Centuryboy! I'm interested in the ${product.name}.`, '_blank');
    return;
  }

  const existing = cart.find(item => item.id === id);
  if (existing) {
    existing.quantity += 1;
  } else {
    cart.push({ ...product, quantity: 1 });
  }

  localStorage.setItem('cb_cart', JSON.stringify(cart));
  updateCartUI();

  // Feature: Auto-open cart
  if (window.toggleCart) window.toggleCart(true);

  // Visual feedback
  const btn = e.currentTarget || e.target;
  if (btn && btn.tagName === 'BUTTON') {
    const originalText = btn.innerHTML; // Changed from innerText to innerHTML to preserve icon
    btn.innerHTML = "<i class='fas fa-check'></i>"; // Changed to icon
    btn.classList.add('bg-cyan', 'text-black');
    btn.disabled = true;
    setTimeout(() => {
      btn.innerHTML = originalText;
      btn.classList.remove('bg-cyan', 'text-black');
      btn.disabled = false;
    }, 800);
  }
};

function updateCartUI() {
  const cartItems = document.getElementById('cart-items');
  const cartCount = document.getElementById('cart-count');
  const cartTotal = document.getElementById('cart-total');
  const emptyMsg = document.getElementById('empty-cart-msg');
  const homeEmptyMsg = document.getElementById('home-empty-cart');
  const paystackBtn = document.getElementById('paystack-btn');
  const checkoutBtn = document.getElementById('checkout-btn');

  if (!cartItems || !cartCount || !cartTotal) return;

  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  cartCount.innerText = totalItems;

  const trigger = document.getElementById('cart-trigger');
  if (trigger) {
    if (totalItems > 0) {
      trigger.classList.add('cart-glow');
      trigger.classList.add('border-accent-cyan');
    } else {
      trigger.classList.remove('cart-glow');
      trigger.classList.remove('border-accent-cyan');
    }
  }

  if (cart.length === 0) {
    if (emptyMsg) {
      emptyMsg.classList.remove('hidden');
      emptyMsg.classList.add('flex');
    }
    if (homeEmptyMsg) {
      homeEmptyMsg.classList.remove('hidden');
      homeEmptyMsg.classList.add('flex');
    }
    cartItems.innerHTML = '';
    cartTotal.innerText = "GHS 0.00";

    if (paystackBtn) paystackBtn.classList.add('btn-disabled');
    if (checkoutBtn) checkoutBtn.classList.add('btn-disabled');
    return;
  }

  if (emptyMsg) {
    emptyMsg.classList.add('hidden');
    emptyMsg.classList.remove('flex');
  }
  if (homeEmptyMsg) {
    homeEmptyMsg.classList.add('hidden');
    homeEmptyMsg.classList.remove('flex');
  }

  if (paystackBtn) paystackBtn.classList.remove('btn-disabled');
  if (checkoutBtn) checkoutBtn.classList.remove('btn-disabled');

  cartItems.innerHTML = '';
  let total = 0;

  cart.forEach(item => {
    total += item.price * item.quantity;
    const itemEl = document.createElement('div');
    itemEl.className = 'cart-item-row flex gap-4 items-center animate-fade-in';
    itemEl.innerHTML = `
            <div class="w-16 h-16 rounded-xl overflow-hidden border border-glass-border bg-black/20">
                <img src="${item.img}" class="w-full h-full object-contain p-1">
            </div>
            <div class="flex-1">
                <h4 class="text-sm font-medium line-clamp-1">${item.name}</h4>
                <p class="text-xs text-gray-400">GHS ${item.price.toLocaleString()} x ${item.quantity}</p>
            </div>
            <div class="flex items-center gap-2">
                <button onclick="changeQty(${item.id}, -1)" class="w-6 h-6 rounded bg-glass-border flex items-center justify-center text-xs hover:bg-white/10">-</button>
                <span class="text-sm w-4 text-center">${item.quantity}</span>
                <button onclick="changeQty(${item.id}, 1)" class="w-6 h-6 rounded bg-glass-border flex items-center justify-center text-xs hover:bg-white/10">+</button>
            </div>`;
    cartItems.appendChild(itemEl);
  });

  let discount = 0;
  const hasAirPods = cart.some(i => i.category === 'airpods');
  const hasCharger = cart.some(i => i.category === 'chargers');
  if (hasAirPods && hasCharger) discount = 50;

  const finalTotal = Math.max(0, total - discount);
  cartTotal.innerHTML = `
    <div class="flex flex-col items-end">
      ${discount > 0 ? `<span class="text-[10px] text-green-400 font-bold uppercase tracking-widest mb-1 animate-pulse">Combo Discount Applied: -GHS ${discount}</span>` : ''}
      <span class="text-lg">GHS ${finalTotal.toLocaleString()}.00</span>
    </div>
  `;

  // Update sticky checkout bar
  const stickyCheckout = document.getElementById('sticky-checkout');
  const stickyTotal = document.getElementById('sticky-checkout-total');

  if (stickyCheckout && stickyTotal) {
    if (totalItems > 0) {
      stickyTotal.innerText = finalTotal.toLocaleString() + '.00';
      stickyCheckout.classList.add('visible');
    } else {
      stickyCheckout.classList.remove('visible');
    }
  }
}

window.changeQty = (id, delta) => {
  const item = cart.find(i => i.id === id);
  if (!item) return;
  item.quantity += delta;
  if (item.quantity <= 0) {
    cart = cart.filter(i => i.id !== id);
  }
  localStorage.setItem('cb_cart', JSON.stringify(cart));
  updateCartUI();
};

function handleCheckout() {
  // This function is now deprecated in favor of openCheckoutModal('whatsapp')
  openCheckoutModal('whatsapp');
}

function addToRecentlyViewed(id) {
  recentlyViewed = recentlyViewed.filter(recentId => recentId !== id);
  recentlyViewed.unshift(id);
  recentlyViewed = recentlyViewed.slice(0, 5); // Keep last 5
  localStorage.setItem('cb_recent', JSON.stringify(recentlyViewed));
  renderRecentlyViewed();
}

function renderRecentlyViewed() {
  const container = document.getElementById('recently-viewed-container');
  const section = document.getElementById('recently-viewed-section');

  if (!container || !recentlyViewed.length) {
    if (section) section.classList.add('hidden');
    return;
  }

  section.classList.remove('hidden');
  container.innerHTML = '';

  recentlyViewed.forEach(id => {
    const p = products.find(prod => prod.id === id);
    if (!p) return;

    const card = document.createElement('div');
    card.className = "bg-white/5 border border-glass-border p-3 rounded-2xl hover:border-accent-cyan/30 transition-all cursor-pointer group animate-fade-in";
    card.onclick = () => openSpecsModal(p.id);

    card.innerHTML = `
      <div class="aspect-square bg-black/20 rounded-xl mb-3 flex items-center justify-center p-2">
        <img src="${p.img}" class="w-full h-full object-contain group-hover:scale-110 transition-transform">
      </div>
      <h5 class="text-[9px] font-bold truncate mb-1 uppercase tracking-tighter">${p.name}</h5>
      <p class="text-[10px] text-accent-cyan font-bold">GHS ${p.price.toLocaleString()}</p>
    `;
    container.appendChild(card);
  });
}
