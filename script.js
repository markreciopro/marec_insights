/* ============================================================
   MAREC INSIGHTS V4 — script.js
   Typewriter Effect • Scroll Reveal • Reduced Motion Support
   ============================================================ */

/* ------------------------------------------------------------
   TYPEWRITER EFFECT
   ------------------------------------------------------------ */ 
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
      // Typing forward
      el.textContent = phrase.slice(0, charIndex + 1);
      charIndex++;

      if (charIndex === phrase.length) {
        deleting = true;
        setTimeout(tick, 2000); // Pause at full phrase
        return;
      }

      setTimeout(tick, 60);
    } else {
      // Deleting backward
      el.textContent = phrase.slice(0, charIndex - 1);
      charIndex--;

      if (charIndex === 0) {
        deleting = false;
        phraseIndex = (phraseIndex + 1) % PHRASES.length;
        setTimeout(tick, 380); // Pause before next phrase
        return;
      }

      setTimeout(tick, 28);
    }
  }

  setTimeout(tick, 900); // Initial delay
})();


/* ------------------------------------------------------------
   SCROLL REVEAL
   ------------------------------------------------------------ */
(function () {
  // Respect reduced-motion accessibility
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    document.querySelectorAll(".reveal, .reveal-step").forEach(el => {
      el.classList.add("visible");
    });
    return;
  }

  function revealOnScroll() {
    const vh = window.innerHeight;

    document.querySelectorAll(".reveal:not(.visible)").forEach(el => {
      if (el.getBoundingClientRect().top < vh - 60) {
        el.classList.add("visible");
      }
    });

    document.querySelectorAll(".reveal-step:not(.visible)").forEach(el => {
      if (el.getBoundingClientRect().top < vh * 0.88) {
        el.classList.add("visible");
      }
    });
  }

  window.addEventListener("scroll", revealOnScroll, { passive: true });
  document.addEventListener("DOMContentLoaded", revealOnScroll);
  revealOnScroll();
})();
