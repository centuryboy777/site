document.addEventListener('DOMContentLoaded', () => {

    const cart = JSON.parse(localStorage.getItem('cb_cart')) || [];
    const container = document.getElementById('order-items');
    const headerTotalEl = document.getElementById('header-total');
    const footerTotalEl = document.getElementById('footer-total');
    const payBtn = document.getElementById('pay-btn');
    const emailInput = document.getElementById('email');
    const nameInput = document.getElementById('full-name');
    const addressInput = document.getElementById('address');
    const phoneInput = document.getElementById('phone');
    const successOverlay = document.getElementById('success-overlay');
    const orderIdEl = document.getElementById('order-id');
    const trackWaBtn = document.getElementById('track-wa-btn');

    // Render Logic
    function renderCheckout() {
        if (cart.length === 0) {
            container.innerHTML = '<div class="empty-state"><p>Your cart is empty.</p><a href="index.html" style="color:var(--accent); text-decoration:none; font-weight:600;">Browse Products</a></div>';
            updateTotals(0);
            payBtn.disabled = true;
            payBtn.style.opacity = '0.5';
            return;
        }

        let total = 0;
        container.innerHTML = cart.map(item => {
            const itemTotal = item.price * item.qty;
            total += itemTotal;
            return `
                <div class="product-card">
                    <div class="product-info">
                        <h3 class="product-name">${escapeHtml(item.name)}</h3>
                        <div class="product-meta">Qty: ${item.qty}</div>
                    </div>
                    <div class="product-price">GHS ${itemTotal.toLocaleString()}</div>
                </div>
            `;
        }).join('');

        updateTotals(total);
    }

    function updateTotals(amount) {
        const formatted = `GHS ${amount.toLocaleString()}`;
        headerTotalEl.textContent = formatted;
        footerTotalEl.textContent = formatted;
    }

    function escapeHtml(str) {
        const div = document.createElement('div');
        div.textContent = str;
        return div.innerHTML;
    }

    function generateOrderId() {
        return 'CB' + Math.floor(100000 + Math.random() * 900000);
    }

    // Input Validation
    phoneInput.addEventListener('input', (e) => {
        e.target.value = e.target.value.replace(/[^0-9]/g, '');
    });

    // Handle Pay Button
    payBtn.addEventListener('click', async () => {
        if (cart.length === 0) return;

        const name = nameInput.value.trim();
        const address = addressInput.value.trim();
        const email = emailInput.value.trim();
        const phone = phoneInput.value.trim();
        const totalAmountStr = headerTotalEl.textContent.replace('GHS ', '').replace(',', '');
        const totalAmount = parseFloat(totalAmountStr);

        // Validation
        if (!name) { alert('Please enter your full name.'); nameInput.focus(); return; }
        if (!email || !email.includes('@')) { alert('Please enter a valid email address.'); emailInput.focus(); return; }
        if (phone.length < 9) { alert('Please enter a valid 10-digit mobile number.'); phoneInput.focus(); return; }
        if (!address) { alert('Please enter your delivery address.'); addressInput.focus(); return; }

        payBtn.innerHTML = 'Generating Order...';
        payBtn.disabled = true;

        try {
            const orderId = generateOrderId();

            // Render Success UI
            const summaryContainer = document.getElementById('order-summary-items');
            const summaryTotalEl = document.getElementById('summary-total');

            summaryContainer.innerHTML = cart.map(item => `
                <div class="summary-item">
                    <span class="summary-item-name">${item.name} x${item.qty}</span>
                    <span class="summary-item-price">GHS ${(item.price * item.qty).toLocaleString()}</span>
                </div>
            `).join('');

            summaryTotalEl.textContent = headerTotalEl.textContent;
            orderIdEl.textContent = '#' + orderId;
            successOverlay.classList.remove('hidden');

            // Build WhatsApp Message
            const itemsText = cart.map(i => `• ${i.name} (${i.qty})`).join('%0A');
            const totalText = headerTotalEl.textContent;

            const waMessage = `Hi Centuryboy's Hub!%0A%0A*NEW ORDER: ${orderId}*%0A%0A*Customer:* ${name}%0A*Phone:* ${phone}%0A*Address:* ${address}%0A%0A*Items:*%0A${itemsText}%0A%0A*Total:* ${totalText}%0A%0APlease process my order. Thanks!`;

            trackWaBtn.href = `https://wa.me/233540639091?text=${waMessage}`;

            // Optional: Automatically open WhatsApp
            window.open(trackWaBtn.href, '_blank');

            localStorage.removeItem('cb_cart');

            payBtn.innerHTML = 'Order Sent!';

        } catch (error) {
            console.error("Order error:", error);
            alert("Something went wrong. Please try again or contact support.");
            payBtn.innerHTML = 'Complete Order via WhatsApp';
            payBtn.disabled = false;
        }
    });

    renderCheckout();
});
