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

    async function verifyOnBackend(reference, orderId, baseUrl) {
        payBtn.innerHTML = 'Finalizing Order...';

        try {
            const apiUrl = `${baseUrl}/verify-payment`;
            console.log(`Verifying payment via ${apiUrl}...`);

            const response = await fetch(apiUrl, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ reference })
            });

            if (!response.ok) {
                const errText = await response.text();
                throw new Error(`Server responded with ${response.status}: ${errText}`);
            }

            const result = await response.json();

            if (result.success) {
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
                const name = nameInput.value.trim();
                const address = addressInput.value.trim();

                const waMessage = `Hi Centuryboy's Hub!%0A%0A*ORDER PAID: ${orderId}*%0A%0A*Customer:* ${name}%0A*Address:* ${address}%0A%0A*Items:*%0A${itemsText}%0A%0A*Total:* ${totalText}%0A%0A*Paystack Ref:* ${reference}%0A%0APlease proceed with my delivery tracking. Thanks!`;

                trackWaBtn.href = `https://wa.me/233540639091?text=${waMessage}`;
                localStorage.removeItem('cb_cart');
            } else {
                throw new Error(result.message || 'Verification failed');
            }

        } catch (error) {
            console.error("Verification error:", error);
            alert("Payment successful but order verification failed. Please contact support with reference: " + reference);
            payBtn.innerHTML = 'Retry Verification';
            payBtn.disabled = false;
        }
    }

    function payWithPaystack(totalAmount, email, publicKey, baseUrl) {
        const handler = PaystackPop.setup({
            key: publicKey,
            email: email,
            amount: Math.round(totalAmount * 100),
            currency: 'GHS',
            ref: 'REF_' + Date.now() + '_' + Math.floor(Math.random() * 1000),
            callback: function (response) {
                const orderId = generateOrderId();
                verifyOnBackend(response.reference, orderId, baseUrl);
            },
            onClose: function () {
                payBtn.innerHTML = 'Secure Payment with Paystack';
                payBtn.disabled = false;
            },
            metadata: {
                custom_fields: [
                    { display_name: "Full Name", variable_name: "full_name", value: nameInput.value.trim() },
                    { display_name: "Mobile Number", variable_name: "mobile_number", value: phoneInput.value },
                    { display_name: "Delivery Address", variable_name: "delivery_address", value: addressInput.value.trim() }
                ]
            }
        });
        handler.openIframe();
    }

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

        payBtn.innerHTML = 'Connecting to Secure Server...';
        payBtn.disabled = true;

        try {
            // SELF-HEALING CONNECTION
            const possibleHosts = [
                window.location.host,   // Detects www.centuryboy.shop automatically
                'centuryboy.shop',      // Fallback naked domain
                'localhost:5000',
                '172.20.10.3:5000'
            ];

            let config = null;
            let finalBaseUrl = '';

            for (const host of possibleHosts) {
                try {
                    // Smart Protocol: Use HTTPS if on the live domain, otherwise use window protocol or fallback
                    const protocol = window.location.protocol === 'file:' ? 'http:' : window.location.protocol;
                    const baseUrl = host.includes('://') ? host : `${protocol}//${host}`;
                    console.log(`Searching for Secure Server at: ${baseUrl}/config...`);

                    const controller = new AbortController();
                    const timeoutId = setTimeout(() => controller.abort(), 2000);

                    const res = await fetch(`${baseUrl}/config`, { signal: controller.signal });
                    clearTimeout(timeoutId);

                    if (res.ok) {
                        config = await res.json();
                        finalBaseUrl = baseUrl;
                        console.log(`Connection established with backend at ${baseUrl}`);
                        break;
                    }
                } catch (e) {
                    console.warn(`Connection to ${host} failed. Trying next...`);
                }
            }

            if (!config) throw new Error("Could not find server at any address");

            payBtn.innerHTML = 'Opening Secure Shield...';
            payWithPaystack(totalAmount, email, config.publicKey, finalBaseUrl);

        } catch (error) {
            console.error("Connection Error:", error);
            alert("Could not connect to the server. Please ensure the server is running on your PC and your phone is on the same Wi-Fi.");
            payBtn.innerHTML = 'Retry Connection';
            payBtn.disabled = false;
        }
    });

    renderCheckout();
});
