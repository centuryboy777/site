(function () {
  'use strict';

  const ANIMATE_CLASS = 'visible';
  const STAGGER_MS = 80;

  function initAnimations() {
    const productsGrid = document.querySelector('.products-grid');
    if (!productsGrid) return;

    const observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (!entry.isIntersecting) return;
          const el = entry.target;
          if (el.classList.contains('products-grid')) {
            const cards = el.querySelectorAll('.product-card[data-animate]');
            cards.forEach(function (card) {
              const delay = parseInt(card.dataset.delay || 0, 10) * STAGGER_MS;
              setTimeout(function () {
                card.classList.add(ANIMATE_CLASS);
              }, delay);
            });
          }
        });
      },
      { threshold: 0.15, rootMargin: '0px 0px -40px 0px' }
    );

    observer.observe(productsGrid);
  }
  function addBuyButtonsForAirpods() {
    const cards = document.querySelectorAll('.product-card');
    if (!cards || !cards.length) return;

    cards.forEach(function (card) {
      // avoid adding multiple buttons
      if (card.querySelector('.product-buy')) return;

      const nameEl = card.querySelector('.product-name');
      if (!nameEl) return;
      const name = nameEl.textContent || '';
      if (!/airpods/i.test(name)) return;

      const priceEl = card.querySelector('.product-price');

      const a = document.createElement('a');
      a.className = 'btn btn-primary product-buy';
      a.textContent = 'BUY NOW';
      // Pre-fill a WhatsApp message with product name (adjust number as needed)
      const phone = '233540639091';
      const msg = encodeURIComponent('Hi, I want to buy: ' + name);
      a.href = `https://wa.me/${phone}?text=${msg}`;
      a.target = '_blank';
      a.rel = 'noopener';

      if (priceEl && priceEl.parentNode) {
        priceEl.insertAdjacentElement('afterend', a);
      } else {
        card.appendChild(a);
      }
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function () {
      initAnimations();
      addBuyButtonsForAirpods();
    });
  } else {
    initAnimations();
    addBuyButtonsForAirpods();
  }
})();
