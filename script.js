/* ==========================================================================
   MAREC INSIGHTS — INTERACTIVE ENGINES SCRIPT
   ========================================================================== */

/* HORIZONTAL ENDLESS INSIGHT STREAM ENGINE */
(function () {
  'use strict';
  window.addEventListener("DOMContentLoaded", function () {
    const track = document.querySelector(".marec-shiftboard-track");
    const list = document.getElementById("projectLoopList");
    if (!track || !list) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const originalCards = Array.from(list.children);
    originalCards.forEach((card) => {
      const clone = card.cloneNode(true);
      clone.setAttribute("aria-hidden", "true");
      clone.querySelectorAll("[id]").forEach((el) => el.removeAttribute("id"));
      list.appendChild(clone);
    });

    let currentX = 0;
    const targetSpeed = 0.65;
    let speed = 0;
    let isPaused = false;
    const rampMs = 1400;
    let startTime = null;

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
      requestAnimationFrame(renderLoop);
    }

    function pause() { isPaused = true; }
    function resume() {
      startTime = null;
      speed = 0;
      isPaused = false;
    }

    document.addEventListener("visibilitychange", function () {
      if (document.hidden) pause(); else resume();
    });

    track.addEventListener("mouseenter", pause);
    track.addEventListener("mouseleave", resume);
    track.addEventListener("touchstart", pause, { passive: true });
    track.addEventListener("touchend", resume, { passive: true });
    list.addEventListener("focusin", pause);
    list.addEventListener("focusout", resume);

    requestAnimationFrame(renderLoop);
  });
})();

/* TYPEWRITER EFFECT ENGINE */
(function () {
  'use strict';
  const PHRASES = [
    "Cinematic Hospitality Workforce Intelligence",
    "Scenario-Based Consulting & Demand Simulations",
    "Luxury Resort Yield & Staffing Optimization",
    "Predictive Analytics & Executive Dashboarding"
  ];

  const el = document.getElementById("typewriter");
  if (!el) return;

  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    el.textContent = PHRASES[0];
    return;
  }

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

/* SCROLL REVEAL DRIVER */
(function () {
  'use strict';
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    document.querySelectorAll(".reveal, .reveal-step").forEach(el => el.classList.add("visible"));
    return;
  }

  function revealOnScroll() {
    const vh = window.innerHeight;
    document.querySelectorAll(".reveal:not(.visible)").forEach(el => {
      if (el.getBoundingClientRect().top < vh - 40) el.classList.add("visible");
    });
    document.querySelectorAll(".reveal-step:not(.visible)").forEach(el => {
      if (el.getBoundingClientRect().top < vh * 0.9) el.classList.add("visible");
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

  window.addEventListener("scroll", onScroll, { passive: true });
  window.addEventListener("resize", onScroll, { passive: true });
  window.addEventListener("DOMContentLoaded", revealOnScroll);
  setTimeout(revealOnScroll, 100);
})();

/* NETLIFY FORMS AJAX SUBMISSION ENGINE */
(function () {
  'use strict';
  window.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("inquiryForm");
    if (!form) return;

    const submitBtn = document.getElementById("submitBtn");
    const statusMsg = document.getElementById("formStatusMsg");

    form.addEventListener("submit", function (e) {
      e.preventDefault();

      const formData = new FormData(form);
      const originalBtnText = submitBtn.textContent;
      submitBtn.textContent = "Sending Inquiry...";
      submitBtn.disabled = true;

      fetch("/", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams(formData).toString()
      })
        .then(response => {
          if (response.ok) {
            form.reset();
            submitBtn.textContent = "Inquiry Sent Successfully! ✓";
            submitBtn.style.backgroundColor = "#15803D";
            submitBtn.style.borderColor = "#15803D";
            statusMsg.textContent = "Thank you! Your message has been securely delivered to MAREC Insights.";
            statusMsg.style.color = "#15803D";
          } else {
            throw new Error("Network response was not ok.");
          }
        })
        .catch(error => {
          console.error("Form submission error:", error);
          submitBtn.textContent = originalBtnText;
          submitBtn.disabled = false;
          statusMsg.textContent = "Submission failed. Please email directly at mark.recio@marec.site.";
          statusMsg.style.color = "#DC2626";
        });
    });
  });
})();