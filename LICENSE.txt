/* ============================================================
   MAREC INSIGHTS V3.0 — script.js
   Typewriter + Scroll Reveal
   ============================================================ */

/* 1. TYPEWRITER */
(function () {
  var PHRASES = [
    'Strategic Data Architect',
    'Workforce Intelligence Partner',
    'Power BI  ·  Python  ·  R  ·  SQL',
    'HR Analytics Consultant',
    'Mission‑Focused Analytics'
  ];

  var el = document.getElementById('typewriter');
  if (!el) return;

  var pi = 0, ci = 0, deleting = false;

  function tick() {
    var phrase = PHRASES[pi];
    if (!deleting) {
      el.textContent = phrase.slice(0, ci + 1);
      ci++;
      if (ci === phrase.length) {
        deleting = true;
        setTimeout(tick, 2200);
        return;
      }
      setTimeout(tick, 62);
    } else {
      el.textContent = phrase.slice(0, ci - 1);
      ci--;
      if (ci === 0) {
        deleting = false;
        pi = (pi + 1) % PHRASES.length;
        setTimeout(tick, 380);
        return;
      }
      setTimeout(tick, 28);
    }
  }
  setTimeout(tick, 900);
})();

/* 2. SCROLL REVEAL */
(function () {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    document.querySelectorAll('.reveal, .reveal-step').forEach(function (el) {
      el.classList.add('visible');
    });
    return;
  }

  function check() {
    var vh = window.innerHeight;
    document.querySelectorAll('.reveal:not(.visible)').forEach(function (el) {
      if (el.getBoundingClientRect().top < vh - 55) el.classList.add('visible');
    });
    document.querySelectorAll('.reveal-step:not(.visible)').forEach(function (el) {
      if (el.getBoundingClientRect().top < vh * 0.88) el.classList.add('visible');
    });
  }

  window.addEventListener('scroll', check, { passive: true });
  document.addEventListener('DOMContentLoaded', check);
  check();
})();