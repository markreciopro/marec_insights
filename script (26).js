/* ==========================================================================
   MAREC INSIGHTS — INTERACTIVE ENGINES SCRIPT (POLISHED)
   ========================================================================== */

(function () {
  'use strict';

  var REDUCE = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  function ready(fn) {
    if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', fn);
    else fn();
  }

  /* ---------- MOBILE NAV TOGGLE ---------- */
  ready(function () {
    var toggle = document.getElementById('navToggle');
    var tabs = document.getElementById('navTabs');
    if (!toggle || !tabs) return;

    function closeMenu() {
      tabs.classList.remove('open');
      toggle.setAttribute('aria-expanded', 'false');
    }

    toggle.addEventListener('click', function () {
      toggle.setAttribute('aria-expanded', String(tabs.classList.toggle('open')));
    });
    document.addEventListener('click', function (e) {
      if (tabs.classList.contains('open') && !tabs.contains(e.target) && !toggle.contains(e.target)) closeMenu();
    });
    tabs.querySelectorAll('.nav-link').forEach(function (link) { link.addEventListener('click', closeMenu); });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && tabs.classList.contains('open')) { closeMenu(); toggle.focus(); }
    });
    window.addEventListener('resize', function () { if (window.innerWidth > 768) closeMenu(); }, { passive: true });
  });

  /* ---------- ENDLESS INSIGHT STREAM (only if #projectLoopList exists) ---------- */
  ready(function () {
    var track = document.querySelector('.marec-shiftboard-track');
    var list = document.getElementById('projectLoopList');
    if (!track || !list || REDUCE) return;

    Array.from(list.children).forEach(function (card) {
      var clone = card.cloneNode(true);
      clone.setAttribute('aria-hidden', 'true');
      clone.querySelectorAll('[id]').forEach(function (el) { el.removeAttribute('id'); });
      clone.querySelectorAll('a, button').forEach(function (el) { el.setAttribute('tabindex', '-1'); });
      list.appendChild(clone);
    });

    var currentX = 0, isPaused = false, startTime = null;
    var TARGET_SPEED = 0.65, RAMP_MS = 1400;

    function frame(ts) {
      if (startTime === null) startTime = ts;
      if (!isPaused) {
        var p = Math.min((ts - startTime) / RAMP_MS, 1);
        currentX -= TARGET_SPEED * (1 - Math.pow(1 - p, 3));
        var reset = list.scrollWidth / 2;
        if (reset > 0 && Math.abs(currentX) >= reset) currentX += reset;
        list.style.transform = 'translateX(' + currentX + 'px)';
      }
      requestAnimationFrame(frame);
    }
    function pause() { isPaused = true; }
    function resume() { startTime = null; isPaused = false; }

    document.addEventListener('visibilitychange', function () { document.hidden ? pause() : resume(); });
    track.addEventListener('mouseenter', pause);
    track.addEventListener('mouseleave', resume);
    track.addEventListener('touchstart', pause, { passive: true });
    track.addEventListener('touchend', resume, { passive: true });
    list.addEventListener('focusin', pause);
    list.addEventListener('focusout', resume);
    requestAnimationFrame(frame);
  });

  /* ---------- SCROLL REVEAL ---------- */
  (function () {
    function showAll() {
      document.querySelectorAll('.reveal, .reveal-step').forEach(function (el) { el.classList.add('visible'); });
    }
    if (REDUCE) { ready(showAll); return; }

    if ('IntersectionObserver' in window) {
      ready(function () {
        var io = new IntersectionObserver(function (entries) {
          entries.forEach(function (en) {
            if (en.isIntersecting) { en.target.classList.add('visible'); io.unobserve(en.target); }
          });
        }, { rootMargin: '0px 0px -40px 0px', threshold: 0.02 });
        document.querySelectorAll('.reveal, .reveal-step').forEach(function (el) { io.observe(el); });
      });
    } else {
      ready(showAll);
    }
  })();

  /* ---------- FORMSPREE AJAX SUBMISSION ---------- */
  ready(function () {
    var form = document.getElementById('inquiryForm');
    if (!form) return;

    var submitBtn = document.getElementById('submitBtn');
    var statusMsg = document.getElementById('formStatusMsg');
    var honeypot = document.getElementById('company');
    var defaultStatus = statusMsg ? statusMsg.textContent : '';
    var resetTimer = null;

    function setStatus(text, color) {
      if (!statusMsg) return;
      statusMsg.textContent = text;
      statusMsg.style.color = color || '';
    }

    form.addEventListener('submit', function (e) {
      e.preventDefault();

      if (honeypot && honeypot.value) { form.reset(); return; }
      if (!form.checkValidity()) { form.reportValidity(); return; }

      var originalBtnHTML = submitBtn.innerHTML;
      clearTimeout(resetTimer);
      submitBtn.textContent = 'Sending inquiry…';
      submitBtn.disabled = true;
      setStatus('Sending…');

      fetch(form.action, {
        method: 'POST',
        body: new FormData(form),
        headers: { Accept: 'application/json' }
      })
        .then(function (response) {
          if (!response.ok) {
            return response.json().catch(function () { return {}; }).then(function (data) {
              var msg = data && data.errors && data.errors.map(function (er) { return er.message; }).join(', ');
              throw new Error(msg || 'Submission failed.');
            });
          }
          form.reset();
          submitBtn.textContent = 'Inquiry sent ✓';
          submitBtn.style.backgroundColor = 'var(--lb-turquoise-glow)';
          setStatus('Thank you — your message has been delivered to MAREC Insights.', '#34D399');
          resetTimer = setTimeout(function () {
            submitBtn.innerHTML = originalBtnHTML;
            submitBtn.disabled = false;
            submitBtn.style.backgroundColor = '';
            setStatus(defaultStatus);
          }, 6000);
        })
        .catch(function (error) {
          console.error('Submission error:', error);
          submitBtn.innerHTML = originalBtnHTML;
          submitBtn.disabled = false;
          setStatus('Submission failed. Email directly at mark.recio@marec.site.', '#E8803A');
        });
    });
  });

  /* ---------- ACTIVE SECTION HIGHLIGHT IN NAV ---------- */
  ready(function () {
    if (!('IntersectionObserver' in window)) return;
    var links = document.querySelectorAll('.nav-link');
    var byId = new Map();
    links.forEach(function (l) {
      var href = l.getAttribute('href') || '';
      if (href.charAt(0) === '#') byId.set(href.slice(1), l);
    });
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (!en.isIntersecting) return;
        var active = byId.get(en.target.id);
        if (!active) return;
        links.forEach(function (l) { l.removeAttribute('aria-current'); });
        active.setAttribute('aria-current', 'true');
      });
    }, { rootMargin: '-35% 0px -55% 0px' });
    byId.forEach(function (l, id) {
      var section = document.getElementById(id);
      if (section) io.observe(section);
    });
  });

  /* ---------- FOOTER YEAR ---------- */
  ready(function () {
    var y = document.getElementById('year');
    if (y) y.textContent = new Date().getFullYear();
  });

  /* ---------- LEAD SOURCE CAPTURE ---------- */
  ready(function () {
    var field = document.getElementById('leadSource');
    if (!field) return;
    var parts = [];
    try {
      var q = new URLSearchParams(window.location.search);
      ['utm_source', 'utm_medium', 'utm_campaign'].forEach(function (k) {
        if (q.get(k)) parts.push(k + '=' + q.get(k).slice(0, 60));
      });
      if (document.referrer) {
        var host = new URL(document.referrer).hostname;
        if (host && host !== window.location.hostname) parts.push('referrer=' + host);
      }
    } catch (err) { /* keep default value */ }
    if (parts.length) field.value = parts.join(' | ');
  });

  /* ---------- PARROT MASCOT ---------- */
  ready(function () {
    var stage = document.getElementById('parrotStage');
    var svg = document.getElementById('parrot');
    if (!stage || !svg) return;

    /* Eyes follow the pointer */
    var pupil = svg.querySelector('.parrot-pupil');
    var socket = svg.querySelector('.parrot-socket');
    if (pupil && socket && !REDUCE) {
      var raf = null;
      document.addEventListener('pointermove', function (e) {
        if (raf) return;
        raf = requestAnimationFrame(function () {
          raf = null;
          var r = socket.getBoundingClientRect();
          var dx = e.clientX - (r.left + r.width / 2);
          var dy = e.clientY - (r.top + r.height / 2);
          var dist = Math.hypot(dx, dy) || 1;
          var k = Math.min(dist / 200, 1) * 4;
          pupil.style.transform = 'translate(' + ((dx / dist) * k).toFixed(2) + 'px,' + ((dy / dist) * k).toFixed(2) + 'px)';
        });
      }, { passive: true });
    }

    /* Speech bubble */
    var bubble = document.getElementById('parrotBubble');
    var hit = document.getElementById('parrotHit');
    var LINES = [
      'Forecast demand first.',
      'Then match staffing to it.',
      'Revenue and labor on one dashboard.',
      'Control labor cost without cutting service.',
      'Want to talk it through? Book a call.'
    ];
    var lineIndex = 0, hideTimer = null;

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
    setTimeout(function () { say('Revenue up, labor down. That is the goal.', 3800); }, REDUCE ? 600 : 3000);
  });
})();