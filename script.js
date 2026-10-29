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

/* TYPEWRITER EFFECT ENGINE (Analytics & Consulting Positioning) */
(function () {
  'use strict';
  const PHRASES = [
    'Hospitality Analytics for Hotels, Resorts & Casinos',
    'Revenue Management Analytics',
    'Workforce, Labor & HR Analytics',
    'Banquet, Event & Convention Analytics',
    'Data Analytics & Executive Dashboards',
    'Business Analytics & Profit Strategy',
    'AI Governance & Validation',
    'Management Consulting & Operational Execution'
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

/* APP GUIDE DOWNLOAD TRACKER */
(function () {
  'use strict';
  window.addEventListener('DOMContentLoaded', function () {
    const downloadBtn = document.querySelector('a[href*="docs/app.pdf"]');
    if (!downloadBtn) return;

    downloadBtn.addEventListener('click', function () {
      console.log('User initiated download for MAREC Studio App & Procedure Guide PDF.');
    });
  });
})();

/* LEAD SOURCE CAPTURE */
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

/* PARROT MASCOT */
(function () {
  'use strict';
  window.addEventListener('DOMContentLoaded', function () {
    const svg = document.getElementById('parrot');
    if (!svg) return;
    const pupil = svg.querySelector('.parrot-pupil');
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (pupil && !reduce) {
      let raf = null;
      document.addEventListener('pointermove', function (e) {
        if (raf) return;
        raf = requestAnimationFrame(function () {
          raf = null;
          const r = svg.getBoundingClientRect();
          const cx = r.left + r.width * (550 / 840);
          const cy = r.top + r.height * (190 / 780);
          const dx = e.clientX - cx;
          const dy = e.clientY - cy;
          const dist = Math.hypot(dx, dy) || 1;
          const k = Math.min(dist / 200, 1) * 3.5;
          pupil.style.transform = 'translate(' + ((dx / dist) * k).toFixed(2) + 'px,' + ((dy / dist) * k).toFixed(2) + 'px)';
        });
      }, { passive: true });
    }

    svg.addEventListener('click', function () {
      if (reduce) return;
      svg.classList.remove('chirp');
      void svg.getBoundingClientRect();
      svg.classList.add('chirp');
      setTimeout(function () { svg.classList.remove('chirp'); }, 650);
    });
  });
})();
