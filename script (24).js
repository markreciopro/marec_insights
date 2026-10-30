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

/* HORIZONTAL ENDLESS INSIGHT STREAM ENGINE (runs only if #projectLoopList exists) */
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

/* LEAD SOURCE CAPTURE (shows which channel produced each inquiry) */
(function () {
  'use strict';
  window.addEventListener('DOMContentLoaded', function () {
    const field = document.getElementById('leadSource');
    if (!field) return;
    const parts = [];
    try {
      const q = new URLSearchParams(window.location.search);
      ['utm_source', 'utm_medium', 'utm_campaign'].forEach(function (k) {
        if (q.get(k)) parts.push(k + '=' + q.get(k).slice(0, 60));
      });
      if (document.referrer) {
        const host = new URL(document.referrer).hostname;
        if (host && host !== window.location.hostname) parts.push('referrer=' + host);
      }
    } catch (err) { /* keep default value */ }
    if (parts.length) field.value = parts.join(' | ');
  });
})();

/* PARROT MASCOT: eyes follow the pointer, click or tap for a chirp and a message */
(function () {
  'use strict';
  window.addEventListener('DOMContentLoaded', function () {
    const stage = document.getElementById('parrotStage');
    const svg = document.getElementById('parrot');
    if (!stage || !svg) return;

    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    /* 1. Eyes follow the pointer (measured from the real eye, so it survives any resize) */
    const pupil = svg.querySelector('.parrot-pupil');
    const socket = svg.querySelector('.parrot-socket');
    if (pupil && socket && !reduce) {
      let raf = null;
      document.addEventListener('pointermove', function (e) {
        if (raf) return;
        raf = requestAnimationFrame(function () {
          raf = null;
          const r = socket.getBoundingClientRect();
          const dx = e.clientX - (r.left + r.width / 2);
          const dy = e.clientY - (r.top + r.height / 2);
          const dist = Math.hypot(dx, dy) || 1;
          const k = Math.min(dist / 200, 1) * 4;
          pupil.style.transform = 'translate(' + ((dx / dist) * k).toFixed(2) + 'px,' + ((dy / dist) * k).toFixed(2) + 'px)';
        });
      }, { passive: true });
    }

    /* 2. Speech bubble: a greeting after the chart draws in, then a new line on every click */
    const bubble = document.getElementById('parrotBubble');
    const hit = document.getElementById('parrotHit');
    const LINES = [
      'Forecast demand first.',
      'Then match staffing to it.',
      'Revenue and labor on one dashboard.',
      'Control labor cost without cutting service.',
      'Want to talk it through? Book a call.'
    ];
    let lineIndex = 0;
    let hideTimer = null;

    function say(text, ms) {
      if (!bubble) return;
      bubble.textContent = text;
      bubble.classList.add('show');
      clearTimeout(hideTimer);
      hideTimer = setTimeout(function () { bubble.classList.remove('show'); }, ms || 3200);
    }

    function chirp() {
      stage.classList.remove('is-chirping');
      void stage.offsetWidth;
      stage.classList.add('is-chirping');
      setTimeout(function () { stage.classList.remove('is-chirping'); }, 700);
      say(LINES[lineIndex], 3200);
      lineIndex = (lineIndex + 1) % LINES.length;
    }

    if (hit) hit.addEventListener('click', chirp);

    setTimeout(function () { say('Revenue up, labor down. That is the goal.', 3800); }, reduce ? 600 : 3000);
  });
})();