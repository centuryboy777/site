/**
 * Centuryboy's Hub — Core Logic (Take 2)
 */

const products = [
  // AIRPODS
  { id: 1, name: "AirPods Pro 3", oldPrice: 500, price: 340, category: "airpods", badge: "🔥 HOT SALES", img: "assets/airpods-pro-3.jpg" },
  { id: 2, name: "AirPods Pro 2", oldPrice: 280, price: 190, category: "airpods", badge: "🔥 HOT SALES", img: "assets/photo_2026-02-02_23-25-49.jpg" },
  { id: 3, name: "AirPods 3", oldPrice: 230, price: 170, category: "airpods", badge: "IOS 26 VERIFIED", img: "assets/airpods3.jpg" },
  { id: 4, name: "AirPods Pro", oldPrice: 200, price: 160, category: "airpods", badge: "IOS 26 VERIFIED", img: "https://images.unsplash.com/photo-1572569511254-d8f925fe2cbb?w=400&fit=crop&q=80" },
  { id: 5, name: "AirPods 4", oldPrice: 350, price: 260, category: "airpods", badge: "IOS 26 VERIFIED", img: "assets/airpods4.jpg" },
  { id: 6, name: "AirPods Max", price: 1800, category: "airpods", badge: "IOS 26 VERIFIED", img: "assets/max.webp" },

  // CHARGERS 
  { id: 7, name: "Type-C to Lightning Full Charger", price: 90, category: "chargers", badge: "ORIGINAL", img: "assets/iphone charger.jpg" },
  { id: 8, name: "Type-C to Type-C Full Charger", price: 150, category: "chargers", badge: "ORIGINAL", img: "assets/type c to type c.jpg" },
  { id: 9, name: "Type-C to Lightning Cable", price: 40, category: "chargers", badge: "ORIGINAL", img: "assets/lighning cable.webp" },
  { id: 10, name: "Type-C to Type-C Cable", price: 60, category: "chargers", badge: "ORIGINAL", img: "assets/type cabel.jpg" },
  { id: 11, name: "MacBook Charger", price: 350, category: "chargers", badge: "PREMIUM", img: "assets/mac charger.webp" },
  { id: 12, name: "Powerbank 10,000mAh", price: 300, category: "accessories", badge: "WIRELESS", img: "assets/wireless powerbank.webp" },
  { id: 13, name: "MagSafe Battery Pack", price: 170, category: "accessories", badge: "HOT", img: "assets/battery pack.jpg" },

  // PLAYSTATIONS
  { id: 14, name: "PlayStation 4 Slim", price: 0, category: "playstation", badge: "CONTACT FOR PRICE", img: "assets/ps 4 slim.webp" },
  { id: 15, name: "PlayStation 4 Pro", price: 0, category: "playstation", badge: "CONTACT FOR PRICE", img: "assets/ps4 pro.webp" },
  { id: 16, name: "PlayStation 5 Slim", price: 7000, category: "playstation", badge: "IN STOCK", img: "assets/ps5 slim.webp" },
  { id: 17, name: "PlayStation 5 Standard", price: 6500, category: "playstation", badge: "IN STOCK", img: "assets/standard.webp" },
  { id: 18, name: "PlayStation 5 Pro", price: 9000, category: "playstation", badge: "PREMIUM", img: "assets/ps5 pro.webp" },

  // CONTROLLERS
  { id: 19, name: "PS5 DualShock Controller", price: 1050, category: "accessories", badge: "IOS 26 VERIFIED", img: "assets/ps5 control.webp" },
  { id: 20, name: "PS4 DualShock Controller", price: 160, category: "accessories", badge: "IOS 26 VERIFIED", img: "assets/ps4 controller.webp" },

  // VIDEOGRAPHY
  { id: 21, name: "AI Face Tracking Quadrapod", price: 280, category: "accessories", badge: "PROMO", img: "assets/quadrapod.webp" }
];

let cart = JSON.parse(localStorage.getItem('cb_cart')) || [];

document.addEventListener('DOMContentLoaded', () => {
  renderProducts('all');
  initEventListeners();
  updateCartUI();
});

function renderProducts(filter) {
  const container = document.getElementById('product-container');
  if (!container) return;

  container.innerHTML = '';
  const filtered = filter === 'all' ? products : products.filter(p => p.category === filter);

  filtered.forEach(product => {
    const card = document.createElement('div');
    card.className = 'glass-card rounded-2xl overflow-hidden flex flex-col group animate-fade-in';
    const priceDisplay = product.oldPrice
      ? `<span class="price-old">GHS ${product.oldPrice.toLocaleString()}</span> <span class="price-new">GHS ${product.price.toLocaleString()}</span>`
      : product.price > 0 ? `<span class="text-cyan font-bold text-sm">GHS ${product.price.toLocaleString()}</span>` : `<span class="text-cyan font-bold text-sm">Contact for Price</span>`;

    const saleBadge = product.oldPrice ? `<span class="sale-badge">SALE</span>` : '';

    card.innerHTML = `
            <div class="relative h-48 overflow-hidden bg-black/20">
                <img src="${product.img}" alt="${product.name}" class="w-full h-full object-contain p-4 transition-transform duration-500 group-hover:scale-110">
                <span class="absolute top-2 left-2 bg-black/60 backdrop-blur-md text-[8px] font-bold px-2 py-1 rounded border border-glass-border text-cyan">${product.badge}</span>
                ${saleBadge}
            </div>
            <div class="p-4 flex flex-col flex-1">
                <h3 class="font-header text-sm font-medium mb-1 line-clamp-1">${product.name}</h3>
                <div class="mb-4">${priceDisplay}</div>
                <button onclick="addToCart(event, ${product.id})" class="mt-auto w-full py-2.5 rounded-lg border border-glass-border text-[10px] font-bold hover:bg-white hover:text-black transition-all uppercase">
                    ADD TO CART
                </button>
            </div>`;
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
    if (show) {
      cartOverlay.classList.remove('hidden');
      setTimeout(() => {
        cartOverlay.classList.add('opacity-100');
        cartPanel.classList.remove('translate-x-full');
      }, 10);
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

window.clearCart = () => {
  if (cart.length === 0) return;
  cart = [];
  localStorage.setItem('cb_cart', JSON.stringify(cart));
  updateCartUI();
};

window.openCheckoutModal = (mode) => {
  if (cart.length === 0) return alert("Your cart is empty!");
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
  const location = document.getElementById('checkout-location').value.trim();

  if (!name) return alert("Please enter your full name.");
  if (!email || !email.includes('@')) return alert("Please enter a valid email address.");
  if (!location) return alert("Please enter your delivery location.");

  const totalAmount = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  if (mode === 'paystack') {
    const handler = PaystackPop.setup({
      key: 'pk_live_2efe7da796c478510aa668864c0c4bbfc9cc1d1e',
      email: email,
      amount: totalAmount * 100,
      currency: 'GHS',
      ref: 'CBH_' + Math.floor((Math.random() * 1000000000) + 1),
      metadata: {
        custom_fields: [
          { display_name: "Customer Name", variable_name: "customer_name", value: name },
          { display_name: "Delivery Location", variable_name: "delivery_location", value: location }
        ]
      },
      callback: function (response) {
        alert('Payment successful! Reference: ' + response.reference);
        finalizeOrder();
      },
      onClose: function () {
        alert('Transaction cancelled.');
      }
    });
    handler.openIframe();
  } else {
    // WhatsApp Mode
    let message = `🚀 *New Order from Centuryboy's Hub*\n\n`;
    message += `👤 *Customer:* ${name}\n`;
    message += `📧 *Email:* ${email}\n`;
    message += `📍 *Location:* ${location}\n\n`;
    message += `🛍️ *Order Items:*\n`;

    cart.forEach(item => {
      message += `• ${item.name} (x${item.quantity}) - GHS ${(item.price * item.quantity).toLocaleString()}\n`;
    });

    message += `\n💰 *Total Amount: GHS ${totalAmount.toLocaleString()}*\n\n`;
    message += "_Please confirm my order!_";

    const encodedMsg = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/233540639091?text=${encodedMsg}`;
    window.open(whatsappUrl, '_blank');
    finalizeOrder();
  }
};

function finalizeOrder() {
  cart = [];
  localStorage.setItem('cb_cart', JSON.stringify(cart));
  updateCartUI();
  closeCheckoutModal();
}

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

  // Visual feedback
  const btn = e.currentTarget || e.target;
  if (btn && btn.tagName === 'BUTTON') {
    const originalText = btn.innerText;
    btn.innerText = "ADDED!";
    btn.classList.add('bg-cyan', 'text-black');
    btn.disabled = true;
    setTimeout(() => {
      btn.innerText = originalText;
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

  if (!cartItems || !cartCount || !cartTotal) return;

  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  cartCount.innerText = totalItems;

  if (cart.length === 0) {
    if (emptyMsg) emptyMsg.classList.remove('hidden');
    cartItems.innerHTML = '';
    cartTotal.innerText = "GHS 0.00";
    return;
  }

  if (emptyMsg) emptyMsg.classList.add('hidden');
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

  cartTotal.innerText = `GHS ${total.toLocaleString()}.00`;
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
