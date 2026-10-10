/**
 * LUMORA DENTAL — INTERACTIVE SUITE & MOTION ENGINE
 * Luxury UX Interactions, Booking Modal, Form Validation, and Smooth Animations
 */

(function () {
  'use strict';

  // 1. Reveal Fail-Safe & Hero Visibility Guarantee
  function ensureVisibility() {
    // Force show any elements hidden by Webflow template inline styles
    const hiddenElements = document.querySelectorAll(
      '[data-w-id][style*="opacity:0"], [data-w-id][style*="opacity: 0"], .hero-text-split, .home-hero_para, .button-container'
    );
    hiddenElements.forEach(function (el) {
      el.style.opacity = '1';
      el.style.filter = 'none';
      el.style.visibility = 'visible';
      if (el.style.transform && el.style.transform.includes('translate3d(0, 25%')) {
        el.style.transform = 'none';
      }
    });
  }

  // Run immediately and after DOM is ready
  ensureVisibility();
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', ensureVisibility);
  } else {
    ensureVisibility();
  }
  window.addEventListener('load', ensureVisibility);

  // 2. Sticky Navbar Glassmorphism on Scroll
  function initNavbarScroll() {
    const navbar = document.querySelector('.navbar_wrap');
    if (!navbar) return;

    window.addEventListener(
      'scroll',
      function () {
        if (window.scrollY > 30) {
          navbar.classList.add('is-scrolled');
        } else {
          navbar.classList.remove('is-scrolled');
        }
      },
      { passive: true }
    );
  }

  // 3. Luxury Appointment Booking Modal System
  function initBookingModal() {
    // Check if modal already exists
    let modalOverlay = document.getElementById('lumoraBookingModal');
    if (!modalOverlay) {
      modalOverlay = document.createElement('div');
      modalOverlay.id = 'lumoraBookingModal';
      modalOverlay.className = 'lumora-modal-overlay';
      modalOverlay.setAttribute('role', 'dialog');
      modalOverlay.setAttribute('aria-modal', 'true');
      modalOverlay.setAttribute('aria-labelledby', 'lumoraModalTitle');

      modalOverlay.innerHTML = `
        <div class="lumora-modal">
          <button type="button" class="lumora-modal-close" aria-label="Close booking modal">&times;</button>
          <div class="lumora-modal-header">
            <div class="section_tag" style="margin-bottom:12px;">
              <span>Private Consultation</span>
            </div>
            <h2 id="lumoraModalTitle" class="lumora-modal-title">Reserve Your Visit</h2>
            <p class="lumora-modal-sub">Experience bespoke, gentle dentistry in our serene sanctuary.</p>
          </div>
          <form id="lumoraModalForm" novalidate>
            <div class="lumora-form-row">
              <div class="lumora-form-group">
                <label class="lumora-form-label" for="bookName">Full Name *</label>
                <input type="text" id="bookName" class="lumora-form-input" placeholder="e.g. Eleanor Vance" required />
              </div>
              <div class="lumora-form-group">
                <label class="lumora-form-label" for="bookPhone">Phone Number *</label>
                <input type="tel" id="bookPhone" class="lumora-form-input" placeholder="0114 317 7002" required />
              </div>
            </div>
            <div class="lumora-form-group">
              <label class="lumora-form-label" for="bookEmail">Email Address *</label>
              <input type="email" id="bookEmail" class="lumora-form-input" placeholder="eleanor@example.com" required />
            </div>
            <div class="lumora-form-row">
              <div class="lumora-form-group">
                <label class="lumora-form-label" for="bookService">Select Treatment</label>
                <select id="bookService" class="lumora-form-select">
                  <option value="Cosmetic Smile Consultation">Cosmetic Smile Consultation & Veneers</option>
                  <option value="Comprehensive Examination & Hygiene">Comprehensive Examination & Hygiene</option>
                  <option value="Invisalign & Clear Aligners">Invisalign & Clear Aligners</option>
                  <option value="Dental Implants & Restorative">Dental Implants & Restorative Care</option>
                  <option value="Urgent / Emergency Care">Urgent / Emergency Care</option>
                </select>
              </div>
              <div class="lumora-form-group">
                <label class="lumora-form-label" for="bookTime">Preferred Timing</label>
                <select id="bookTime" class="lumora-form-select">
                  <option value="Morning (08:30 - 12:00)">Morning (08:30 - 12:00)</option>
                  <option value="Afternoon (12:00 - 15:30)">Afternoon (12:00 - 15:30)</option>
                  <option value="Late Afternoon (15:30 - 17:30)">Late Afternoon (15:30 - 17:30)</option>
                </select>
              </div>
            </div>
            <div class="lumora-form-group">
              <label class="lumora-form-label" for="bookNotes">Notes or Special Requirements (Optional)</label>
              <textarea id="bookNotes" rows="2" class="lumora-form-textarea" placeholder="Tell us about your dental goals or comfort preferences..."></textarea>
            </div>
            <button type="submit" class="lumora-btn-submit">Request Appointment Confirmation</button>
            <a href="https://cal.com/shreyasrajsony11-ukmj10/dental-clinic-test-call" target="_blank" rel="noopener noreferrer" class="lumora-modal-cal-link">
              Or schedule directly on Cal.com Calendar &rarr;
            </a>
          </form>
        </div>
      `;
      document.body.appendChild(modalOverlay);
    }

    // Toast element
    let toast = document.getElementById('lumoraToast');
    if (!toast) {
      toast = document.createElement('div');
      toast.id = 'lumoraToast';
      toast.className = 'lumora-toast';
      toast.innerHTML = `
        <div class="lumora-toast-icon">&#10003;</div>
        <div>
          <strong style="display:block;margin-bottom:2px;">Reservation Request Sent</strong>
          <span style="font-size:12px;opacity:0.9;">Our concierge will contact you within 15 minutes.</span>
        </div>
      `;
      document.body.appendChild(toast);
    }

    function showToast() {
      toast.classList.add('is-show');
      setTimeout(function () {
        toast.classList.remove('is-show');
      }, 5000);
    }

    function openModal() {
      modalOverlay.classList.add('is-active');
      document.body.style.overflow = 'hidden';
      const nameInput = document.getElementById('bookName');
      if (nameInput) nameInput.focus();
    }

    function closeModal() {
      modalOverlay.classList.remove('is-active');
      document.body.style.overflow = '';
    }

    // Modal Close Triggers
    modalOverlay.querySelector('.lumora-modal-close').addEventListener('click', closeModal);
    modalOverlay.addEventListener('click', function (e) {
      if (e.target === modalOverlay) closeModal();
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && modalOverlay.classList.contains('is-active')) {
        closeModal();
      }
    });

    // Form Submit
    const form = document.getElementById('lumoraModalForm');
    if (form) {
      form.addEventListener('submit', function (e) {
        e.preventDefault();
        const name = document.getElementById('bookName').value.trim();
        const phone = document.getElementById('bookPhone').value.trim();
        const email = document.getElementById('bookEmail').value.trim();

        if (!name || !phone || !email) {
          alert('Please provide your name, phone number, and email address.');
          return;
        }

        // Success state
        closeModal();
        showToast();
        form.reset();
      });
    }

    // Attach to Booking Buttons across the site
    // We preserve Cal.com links for users who right-click or want direct Cal.com,
    // while providing instant modal booking on click!
    document.querySelectorAll('a[href*="cal.com"], .lead-open-modal').forEach(function (btn) {
      btn.addEventListener('click', function (e) {
        // If meta/ctrl key is pressed, let them open cal.com in new tab
        if (e.metaKey || e.ctrlKey) return;
        e.preventDefault();
        openModal();
      });
    });

    window.openLumoraModal = openModal;
  }

  // 4. Quick Lead Form in Hero
  window.lumoraLead = function (event) {
    event.preventDefault();
    const form = event.target;
    const name = form.querySelector('input[name="name"]');
    const phone = form.querySelector('input[name="phone"]');

    if (!name.value.trim() || !phone.value.trim()) {
      alert('Please enter your name and phone number.');
      return false;
    }

    const card = form.closest('.lead-form_card');
    if (card) {
      const success = card.querySelector('.lead-form_success');
      form.style.display = 'none';
      if (success) {
        success.style.display = 'block';
      }
    }
    return false;
  };

  // 5. Initialize on load
  function init() {
    initNavbarScroll();
    initBookingModal();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
