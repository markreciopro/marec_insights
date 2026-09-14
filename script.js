/* ==========================================================================
   MAREC INSIGHTS — INTERACTIVE ENGINES SCRIPT
   ========================================================================== */

/* MOBILE NAV TOGGLE */
(function () {
  'use strict';
  window.addEventListener('DOMContentLoaded', function () {
    const toggle = document.getElementById('navToggle');
    const tabs = document.getElementById('navTabs');
    if (!toggle || !tabs) return;

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
    function resume() {
      startTime = null;
      speed = 0;
      isPaused = false;
    }

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

/* TYPEWRITER EFFECT ENGINE */
(function () {
  'use strict';
  const PHRASES = [
    'Hospitality Workforce Intelligence',
    'Scenario-Based Consulting & Demand Simulations',
    'Luxury Resort Yield & Staffing Optimization',
    'Predictive Analytics & Executive Dashboarding'
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

  // Pause the typewriter while the tab is hidden to avoid runaway timers.
  document.addEventListener('visibilitychange', function () {
    if (document.hidden && timerId) {
      clearTimeout(timerId);
    }
  });

  setTimeout(tick, 900);
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

      // Silently drop obvious bot submissions (honeypot filled in).
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
        headers: {
          Accept: 'application/json'
        }
      })
        .then((response) => {
          if (response.ok) {
            form.reset();
            submitBtn.textContent = 'Inquiry sent ✓';
            submitBtn.style.backgroundColor = 'var(--lb-turquoise)';
            submitBtn.style.borderColor = 'var(--lb-turquoise)';
            submitBtn.style.color = '#FFFFFF';
            statusMsg.textContent = 'Thank you — your message has been delivered to MAREC Insights.';
            statusMsg.style.color = '#34D399';
          } else {
            return response.json().then((data) => {
              if (data && data.errors) {
                throw new Error(data.errors.map((error) => error.message).join(', '));
              }
              throw new Error('Form submission failed.');
            });
          }
        })
        .catch((error) => {
          console.error('Form submission error:', error);
          submitBtn.textContent = originalBtnText;
          submitBtn.disabled = false;
          statusMsg.textContent = 'Submission failed. Please email directly at mark.recio@marec.site.';
          statusMsg.style.color = '#E8803A';
        });
    });
  });
})();