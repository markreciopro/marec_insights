/* ============================================================
   MAREC INSIGHTS CORE ENGINE — INTERACTION CONTROLLER
   ============================================================ */

/* 1. ENDLESS VELOCITY SCROLL LOOP ENGINE */
(function () {
  window.addEventListener("load", function () {
    const track = document.querySelector(".marec-shiftboard-track");
    const list = document.getElementById("projectLoopList");
    if (!track || !list) return;

    const originalCards = Array.from(list.children);
    originalCards.forEach((card) => {
      const clone = card.cloneNode(true);
      list.appendChild(clone);
    });

    let currentY = 0;
    let speed = 0.65;
    let isPaused = false;

    function renderLoop() {
      if (!isPaused) {
        currentY -= speed;
        const resetThreshold = list.scrollHeight / 2;
        
        if (Math.abs(currentY) >= resetThreshold) {
          currentY = 0;
        }
        list.style.transform = `translateY(${currentY}px)`;
      }
      requestAnimationFrame(renderLoop);
    }

    track.addEventListener("mouseenter", () => { isPaused = true; });
    track.addEventListener("mouseleave", () => { isPaused = false; });
    list.addEventListener("focusin", () => { isPaused = true; });
    list.addEventListener("focusout", () => { isPaused = false; });

    requestAnimationFrame(renderLoop);
  });
})();

/* 2. TYPEWRITER EFFECT ENGINE */
(function () {
  const PHRASES = [ 
    "Strategic Planning",
    "Strategic Data Architect",
    "Business Analytics Consultant",
    "Data Science Specialist",
    "Management Consulting Partner",
    "Workforce Intelligence Partner",
    "Power BI  ·  Python  ·  R  ·  SQL",
    "MECE  ·  Root Cause  ·  Hypothesis‑Driven",
    "HR Analytics Consultant",
    "Mission‑Focused Analytics"
  ];

  const el = document.getElementById("typewriter");
  if (!el) return;

  let phraseIndex = 0;
  let charIndex = 0;
  let deleting = false;

  function tick() {
    const phrase = PHRASES[phraseIndex];
    if (!deleting) {
      el.textContent = phrase.slice(0, charIndex + 1);
      charIndex++;
      if (charIndex === phrase.length) {
        deleting = true;
        setTimeout(tick, 2000);
        return;
      }
      setTimeout(tick, 60);
    } else {
      el.textContent = phrase.slice(0, charIndex - 1);
      charIndex--;
      if (charIndex === 0) {
        deleting = false;
        phraseIndex = (phraseIndex + 1) % PHRASES.length;
        setTimeout(tick, 380);
        return;
      }
      setTimeout(tick, 28);
    }
  }
  setTimeout(tick, 900);
})();

/* 3. SCROLL REVEAL DRIVER */
(function () {
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    document.querySelectorAll(".reveal, .reveal-step").forEach(el => el.classList.add("visible"));
    return;
  }

  function revealOnScroll() {
    const vh = window.innerHeight;
    document.querySelectorAll(".reveal:not(.visible)").forEach(el => {
      if (el.getBoundingClientRect().top < vh - 60) el.classList.add("visible");
    });
    document.querySelectorAll(".reveal-step:not(.visible)").forEach(el => {
      if (el.getBoundingClientRect().top < vh * 0.88) el.classList.add("visible");
    });
  }
  window.addEventListener("scroll", revealOnScroll, { passive: true });
  window.addEventListener("DOMContentLoaded", revealOnScroll);
  setTimeout(revealOnScroll, 100);
})();

/* 4. DNA INTERACTIVE ACCORDION MODULE */
(function () {
  const faqButtons = document.querySelectorAll('[data-faq]');
  if (!faqButtons.length) return;

  faqButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const body = btn.nextElementSibling;
      const toggle = btn.querySelector('.faq-toggle');
      const isOpen = body.classList.contains('open');

      document.querySelectorAll('.faq-body.open').forEach(openBody => {
        openBody.classList.remove('open');
        const openBtn = openBody.previousElementSibling;
        if (openBtn && openBtn.querySelector('.faq-toggle')) {
          openBtn.querySelector('.faq-toggle').textContent = '+';
        }
      });

      if (!isOpen) {
        body.classList.add('open');
        if (toggle) toggle.textContent = '–';
      } else {
        body.classList.remove('open');
        if (toggle) toggle.textContent = '+';
      }
    });
  });
})();