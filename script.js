/* MAREC Insights — site script. Drop-in replacement for script.js (v9). */
(function () {
  'use strict';

  var reduceMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var $ = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };

  /* ---------- Footer year ---------- */
  var yr = $('#year');
  if (yr) yr.textContent = new Date().getFullYear();

  /* ---------- Mobile nav ---------- */
  var navToggle = $('#navToggle');
  var navTabs = $('#navTabs');
  function setNav(open) {
    if (!navToggle || !navTabs) return;
    navTabs.classList.toggle('open', open);
    navToggle.setAttribute('aria-expanded', open ? 'true' : 'false');
  }
  if (navToggle && navTabs) {
    navToggle.addEventListener('click', function () {
      setNav(!navTabs.classList.contains('open'));
    });
    $$('a', navTabs).forEach(function (a) {
      a.addEventListener('click', function () { setNav(false); });
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') setNav(false);
    });
  }

  /* ---------- Reveal on scroll ---------- */
  var revealEls = $$('.reveal, .reveal-step');
  if ('IntersectionObserver' in window && !reduceMotion) {
    var ro = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) { en.target.classList.add('visible'); ro.unobserve(en.target); }
      });
    }, { threshold: 0.08, rootMargin: '0px 0px -5% 0px' });
    revealEls.forEach(function (el) { ro.observe(el); });
  } else {
    revealEls.forEach(function (el) { el.classList.add('visible'); });
  }

  /* ---------- Active nav link ---------- */
  var navLinks = $$('.nav-link');
  var sections = navLinks.map(function (a) {
    var id = (a.getAttribute('href') || '').replace('#', '');
    return id ? document.getElementById(id) : null;
  });
  if ('IntersectionObserver' in window && navLinks.length) {
    var active = null;
    var so = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) active = en.target.id;
      });
      navLinks.forEach(function (a) {
        if (a.getAttribute('href') === '#' + active) a.setAttribute('aria-current', 'true');
        else a.removeAttribute('aria-current');
      });
    }, { rootMargin: '-35% 0px -55% 0px', threshold: 0 });
    sections.forEach(function (s) { if (s) so.observe(s); });
  }

  /* ---------- Process phase highlight ---------- */
  var phases = $$('#processList .approach-phase');
  if (phases.length && 'IntersectionObserver' in window) {
    var po = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) {
          phases.forEach(function (p) { p.classList.toggle('is-active', p === en.target); });
        }
      });
    }, { rootMargin: '-40% 0px -45% 0px', threshold: 0 });
    phases.forEach(function (p) { po.observe(p); });
  }

  /* ---------- Hero: glass medallion (tilt + glare) ---------- */
  var lens = $('#glassLens');
  var stage = $('#glassStage');
  var logo = $('#glassLogo');
  var ghost = $('#glassGhost');
  if (ghost && logo) {
    var setGhost = function () { ghost.style.backgroundImage = 'url("' + logo.currentSrc + '")'; };
    if (logo.complete) setGhost(); else logo.addEventListener('load', setGhost);
  }
  if (lens && stage && !reduceMotion) {
    var raf = null;
    var apply = function (tx, ty, rx, ry, gx, gy) {
      lens.style.setProperty('--tx', tx + 'px');
      lens.style.setProperty('--ty', ty + 'px');
      lens.style.setProperty('--rx', rx + 'deg');
      lens.style.setProperty('--ry', ry + 'deg');
      lens.style.setProperty('--gx', gx + '%');
      lens.style.setProperty('--gy', gy + '%');
    };
    var onMove = function (e) {
      var r = stage.getBoundingClientRect();
      var nx = ((e.clientX - r.left) / r.width) * 2 - 1;
      var ny = ((e.clientY - r.top) / r.height) * 2 - 1;
      nx = Math.max(-1.5, Math.min(1.5, nx));
      ny = Math.max(-1.5, Math.min(1.5, ny));
      if (raf) cancelAnimationFrame(raf);
      raf = requestAnimationFrame(function () {
        apply((nx * 8).toFixed(2), (ny * 8).toFixed(2), (-ny * 9).toFixed(2), (nx * 9).toFixed(2),
          (50 + nx * 30).toFixed(1), (40 + ny * 30).toFixed(1));
      });
    };
    var reset = function () {
      if (raf) cancelAnimationFrame(raf);
      apply(0, 0, 0, 0, 30, 22);
    };
    window.addEventListener('pointermove', onMove, { passive: true });
    document.addEventListener('pointerleave', reset);
    window.addEventListener('blur', reset);
  }

  /* ---------- Hero: the parrot says "People, Planet, Profit" ---------- */
  var say = $('#parrotSay');
  var sayText = $('#sayText');
  var sayLive = $('#sayLive');
  var PHRASE = 'People, Planet, Profit';
  var tblWords = $$('[data-tbl]');
  var typeTimer = null;
  var litTimers = [];

  function clearLit() {
    litTimers.forEach(clearTimeout);
    litTimers = [];
    tblWords.forEach(function (w) { w.classList.remove('is-lit'); });
  }
  function lightWords() {
    clearLit();
    if (reduceMotion) return;
    tblWords.forEach(function (w, i) {
      litTimers.push(setTimeout(function () {
        tblWords.forEach(function (x) { x.classList.remove('is-lit'); });
        w.classList.add('is-lit');
      }, i * 700));
    });
    litTimers.push(setTimeout(function () {
      tblWords.forEach(function (x) { x.classList.remove('is-lit'); });
    }, tblWords.length * 700 + 400));
  }
  function speak(initial) {
    if (!sayText) return;
    clearInterval(typeTimer);
    if (sayLive) sayLive.textContent = initial ? '' : PHRASE;
    if (reduceMotion) {
      sayText.textContent = PHRASE;
      if (initial && sayLive) sayLive.textContent = PHRASE;
      return;
    }
    sayText.textContent = '';
    var i = 0;
    typeTimer = setInterval(function () {
      i += 1;
      sayText.textContent = PHRASE.slice(0, i);
      if (i >= PHRASE.length) {
        clearInterval(typeTimer);
        if (sayLive) sayLive.textContent = PHRASE;
        lightWords();
      }
    }, 70);
  }
  if (say && sayText) {
    // Wait for the bubble pop-in animation before typing.
    setTimeout(function () { speak(true); }, reduceMotion ? 0 : 1500);
    say.addEventListener('click', function () { clearLit(); speak(false); });
  }

  /* ---------- CTA buttons preselect the "Exploring" dropdown ---------- */
  var exploring = $('#exploring');
  if (exploring) {
    $$('[data-exploring]').forEach(function (btn) {
      btn.addEventListener('click', function () {
        var val = btn.getAttribute('data-exploring');
        Array.prototype.forEach.call(exploring.options, function (o) {
          if (o.text === val || o.value === val) exploring.value = o.value;
        });
      });
    });
  }

  /* ---------- Lead source (UTM / referrer) ---------- */
  var leadSource = $('#leadSource');
  if (leadSource) {
    try {
      var p = new URLSearchParams(window.location.search);
      var src = p.get('utm_source') || p.get('source') || p.get('ref');
      if (!src && document.referrer) {
        var host = new URL(document.referrer).hostname;
        if (host && host !== window.location.hostname) src = host;
      }
      if (src) leadSource.value = src.slice(0, 80);
    } catch (e) { /* keep default */ }
  }

  /* ---------- Inquiry form (Formspree, AJAX) ---------- */
  var form = $('#inquiryForm');
  var statusMsg = $('#formStatusMsg');
  var submitBtn = $('#submitBtn');
  if (form && statusMsg && submitBtn) {
    var DEFAULT_MSG = statusMsg.textContent;
    var btnHTML = submitBtn.innerHTML;
    var say2 = function (msg, ok) {
      statusMsg.textContent = msg;
      statusMsg.style.color = ok === true ? '#4ADE80' : ok === false ? '#F87171' : '';
    };
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var hp = $('#company');
      if (hp && hp.value) return; // honeypot: silently drop bots
      var name = $('#visitor_name'), email = $('#visitor_email');
      if (!name.value.trim()) { say2('Please enter your name.', false); name.focus(); return; }
      if (!email.value.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value.trim())) {
        say2('Please enter a valid email address.', false); email.focus(); return;
      }
      submitBtn.disabled = true;
      submitBtn.textContent = 'Sending…';
      say2('Sending your inquiry…');
      fetch(form.action, {
        method: 'POST',
        body: new FormData(form),
        headers: { Accept: 'application/json' }
      }).then(function (res) {
        if (res.ok) {
          form.reset();
          say2('Thank you. Your inquiry was sent and Mark will reply shortly.', true);
        } else {
          return res.json().then(function (d) {
            throw new Error((d && d.errors && d.errors.map(function (x) { return x.message; }).join(', ')) || 'Submission failed');
          });
        }
      }).catch(function () {
        say2('Something went wrong. Please email mark.recio@marec.site directly.', false);
      }).then(function () {
        submitBtn.disabled = false;
        submitBtn.innerHTML = btnHTML;
        setTimeout(function () { if (statusMsg.style.color === '') statusMsg.textContent = DEFAULT_MSG; }, 100);
      });
    });
  }
})();
