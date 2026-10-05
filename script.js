/* ==========================================================================
   MAREC INSIGHTS — INTERACTIVE ENGINES SCRIPT (A+ POLISHED)
   ========================================================================== */

/* MOBILE NAV TOGGLE */
(function () {
  'use strict';
  window.addEventListener('DOMContentLoaded', function () {
    const toggle = document.getElementById('navToggle');
    const tabs = document.getElementById('navTabs');
    if (!toggle || !tabs) return;

    document.addEventListener('click', function (e) {
      if (tabs.classList.contains('open') && !tabs.contains(e.target) && !toggle.contains(e.target)) closeMenu();
    });

    function closeMenu() {
      tabs.classList.remove('open');
      toggle.setAttribute('aria-expanded', 'false');
    }

    toggle.addEventListener('click', function () {
      const isOpen = tabs.classList.toggle('open');
      toggle.setAttribute('aria-expanded', String(isOpen));
    });

    tabs.querySelectorAll('.nav-link').forEach((link) => {
      link.addEventListener('click', closeMenu);
    });

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') closeMenu();
    });
  });
})();

/* PDF INLINE READER MODAL ENGINE */
(function () {
  'use strict';
  window.addEventListener('DOMContentLoaded', function () {
    const modal = document.getElementById('pdfModal');
    const frame = document.getElementById('pdfModalFrame');
    const closeBtn = document.getElementById('closePdfModal');
    const triggers = document.querySelectorAll('.pdf-preview-trigger');

    if (!modal || !frame) return;

    function openModal(url, title) {
      const heading = document.getElementById('pdfModalTitle');
      if (heading && title) heading.textContent = title;
      frame.src = url;
      modal.classList.add('active');
      modal.setAttribute('aria-hidden', 'false');
    }

    function closeModal() {
      modal.classList.remove('active');
      modal.setAttribute('aria-hidden', 'true');
      setTimeout(() => { frame.src = ''; }, 300);
    }

    triggers.forEach((btn) => {
      btn.addEventListener('click', () => {
        const pdfUrl = btn.getAttribute('data-pdf-url');
        if (pdfUrl) openModal(pdfUrl, btn.getAttribute('data-pdf-title'));
      });
    });

    if (closeBtn) closeBtn.addEventListener('click', closeModal);
    modal.addEventListener('click', (e) => {
      if (e.target === modal) closeModal();
    });
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && modal.classList.contains('active')) closeModal();
    });
  });
})();

/* HORIZONTAL ENDLESS INSIGHT STREAM ENGINE */
(function () {
  'use strict';
  window.addEventListener('DOMContentLoaded', function () {
    const track = document.querySelector('.marec-shiftboard-track');
    const list = document.getElementById('projectLoopList');
    if (!track || !list) return;

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const originalCards = Array.from(list.children);
    originalCards.forEach((card) => {
      const clone = card.cloneNode(true);
      clone.setAttribute('aria-hidden', 'true');
      clone.querySelectorAll('[id]').forEach((el) => el.removeAttribute('id'));
      clone.querySelectorAll('a').forEach((el) => el.setAttribute('tabindex', '-1'));
      list.appendChild(clone);
    });

    let currentX = 0;
    const targetSpeed = 0.65;
    let speed = 0;
    let isPaused = false;
    const rampMs = 1400;
    let startTime = null;
    let rafId = null;

    function renderLoop(ts) {
      if (startTime === null) startTime = ts;
      if (!isPaused) {
        const elapsed = ts - startTime;
        const rampProgress = Math.min(elapsed / rampMs, 1);
        const eased = 1 - Math.pow(1 - rampProgress, 3);
        speed = targetSpeed * eased;

        currentX -= speed;
        const resetThreshold = list.scrollWidth / 2;

        if (resetThreshold > 0 && Math.abs(currentX) >= resetThreshold) {
          currentX += resetThreshold;
        }
        list.style.transform = `translateX(${currentX}px)`;
      }
      rafId = requestAnimationFrame(renderLoop);
    }

    function pause() { isPaused = true; }
    function resume() { startTime = null; speed = 0; isPaused = false; }

    document.addEventListener('visibilitychange', function () {
      if (document.hidden) pause(); else resume();
    });

    track.addEventListener('mouseenter', pause);
    track.addEventListener('mouseleave', resume);
    track.addEventListener('touchstart', pause, { passive: true });
    track.addEventListener('touchend', resume, { passive: true });
    list.addEventListener('focusin', pause);
    list.addEventListener('focusout', resume);

    rafId = requestAnimationFrame(renderLoop);
  });
})();

/* TYPEWRITER EFFECT ENGINE (Governance & Execution Positioning) */
(function () {
  'use strict';
  const PHRASES = [
    'Las Vegas Resort Workforce Intelligence',
    'AI Governance & Algorithmic Validation',
    'Labor Economics & Union Dynamics Strategy',
    'Change Management & Operational Execution'
  ];

  const el = document.getElementById('typewriter');
  if (!el) return;

  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    el.textContent = PHRASES[0];
    return;
  }

  let phraseIndex = 0;
  let charIndex = 0;
  let deleting = false;
  let timerId = null;

  function tick() {
    const phrase = PHRASES[phraseIndex];
    if (!deleting) {
      el.textContent = phrase.slice(0, charIndex + 1);
      charIndex++;
      if (charIndex === phrase.length) {
        deleting = true;
        timerId = setTimeout(tick, 2000);
        return;
      }
      timerId = setTimeout(tick, 60);
    } else {
      el.textContent = phrase.slice(0, charIndex - 1);
      charIndex--;
      if (charIndex === 0) {
        deleting = false;
        phraseIndex = (phraseIndex + 1) % PHRASES.length;
        timerId = setTimeout(tick, 380);
        return;
      }
      timerId = setTimeout(tick, 28);
    }
  }

  document.addEventListener('visibilitychange', function () {
    clearTimeout(timerId);
    if (!document.hidden) timerId = setTimeout(tick, 300);
  });

  timerId = setTimeout(tick, 900);
})();

/* SCROLL REVEAL DRIVER */
(function () {
  'use strict';
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    document.querySelectorAll('.reveal, .reveal-step').forEach((el) => el.classList.add('visible'));
    return;
  }

  function revealOnScroll() {
    const vh = window.innerHeight;
    document.querySelectorAll('.reveal:not(.visible)').forEach((el) => {
      if (el.getBoundingClientRect().top < vh - 40) el.classList.add('visible');
    });
    document.querySelectorAll('.reveal-step:not(.visible)').forEach((el) => {
      if (el.getBoundingClientRect().top < vh * 0.9) el.classList.add('visible');
    });
  }

  let queued = false;
  function onScroll() {
    if (queued) return;
    queued = true;
    requestAnimationFrame(function () {
      queued = false;
      revealOnScroll();
    });
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', onScroll, { passive: true });
  window.addEventListener('DOMContentLoaded', revealOnScroll);
  setTimeout(revealOnScroll, 100);
})();

/* FORMSPREE AJAX SUBMISSION ENGINE */
(function () {
  'use strict';
  window.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('inquiryForm');
    if (!form) return;

    const submitBtn = document.getElementById('submitBtn');
    const statusMsg = document.getElementById('formStatusMsg');
    const honeypot = document.getElementById('company');

    form.addEventListener('submit', function (e) {
      e.preventDefault();

      if (honeypot && honeypot.value) {
        form.reset();
        return;
      }

      if (!form.checkValidity()) {
        form.reportValidity();
        return;
      }

      const formData = new FormData(form);
      const originalBtnText = submitBtn.textContent;
      submitBtn.textContent = 'Sending inquiry…';
      submitBtn.disabled = true;

      fetch(form.action, {
        method: 'POST',
        body: formData,
        headers: { Accept: 'application/json' }
      })
        .then((response) => {
          if (response.ok) {
            form.reset();
            submitBtn.textContent = 'Inquiry sent ✓';
            submitBtn.style.backgroundColor = 'var(--lb-turquoise-glow)';
            statusMsg.textContent = 'Thank you — your message has been delivered to MAREC Insights.';
            statusMsg.style.color = '#34D399';
            setTimeout(function () {
              submitBtn.textContent = originalBtnText;
              submitBtn.disabled = false;
              submitBtn.style.backgroundColor = '';
            }, 6000);
          } else {
            return response.json().then((data) => {
              throw new Error(data?.errors?.map((err) => err.message).join(', ') || 'Submission failed.');
            });
          }
        })
        .catch((error) => {
          console.error('Submission error:', error);
          submitBtn.textContent = originalBtnText;
          submitBtn.disabled = false;
          statusMsg.textContent = 'Submission failed. Email directly at mark.recio@marec.site.';
          statusMsg.style.color = '#E8803A';
        });
    });
  });
})();

/* MANUSCRIPT INQUIRY SHORTCUT ($49.99) */
(function () {
  'use strict';
  window.addEventListener('DOMContentLoaded', function () {
    const trigger = document.querySelector('[data-inquire="manuscript"]');
    const select = document.getElementById('exploring');
    const message = document.getElementById('message');
    if (!trigger || !select) return;

    trigger.addEventListener('click', function () {
      const option = Array.from(select.options).find((o) => o.text.indexOf('Manuscript') === 0);
      if (option) select.value = option.value;
      if (message && !message.value.trim()) {
        message.value = 'I have a question about the Hospitality Analytics Manuscript ($49.99).';
      }
    });
  });
})();

/* ACTIVE SECTION HIGHLIGHT IN NAV */
(function () {
  'use strict';
  window.addEventListener('DOMContentLoaded', function () {
    if (!('IntersectionObserver' in window)) return;
    const links = document.querySelectorAll('.nav-link');
    const byId = new Map();
    links.forEach((l) => byId.set(l.getAttribute('href').slice(1), l));
    const io = new IntersectionObserver((entries) => {
      entries.forEach((en) => {
        if (!en.isIntersecting) return;
        links.forEach((l) => l.removeAttribute('aria-current'));
        const active = byId.get(en.target.id);
        if (active) active.setAttribute('aria-current', 'true');
      });
    }, { rootMargin: '-35% 0px -55% 0px' });
    byId.forEach((l, id) => {
      const section = document.getElementById(id);
      if (section) io.observe(section);
    });
  });
})();


/* FOOTER YEAR */
(function () {
  'use strict';
  window.addEventListener('DOMContentLoaded', function () {
    const y = document.getElementById('year');
    if (y) y.textContent = new Date().getFullYear();
  });
})();