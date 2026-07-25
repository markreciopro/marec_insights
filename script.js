/* ============================================================
   MAREC INSIGHTS CORE ENGINE — INTERACTION CONTROLLER
   ============================================================ */

/* 0. DUAL-COLOR SPLIT BELL CURVE ENGINE */
(function () {
  'use strict';
  const canvas = document.getElementById("bellCurveCanvas");
  if (!canvas) return;
  const ctx = canvas.getContext("2d");

  let time = 0;

  function resizeCanvas() {
    canvas.width = canvas.parentElement.clientWidth;
    canvas.height = canvas.parentElement.clientHeight;
  }
  window.addEventListener("resize", resizeCanvas);
  resizeCanvas();

  function drawLiveBellCurve() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const w = canvas.width;
    const h = canvas.height;
    
    // Lower baseline slightly to avoid video header overlap
    const baseLine = h * 0.92; 
    const waveTime = time * 0.012;

    const centerX = w * 0.5; 
    const sigma = w * 0.105; 

    const points = [];
    const step = 2;

    for (let x = 0; x <= w; x += step) {
      const distFromCenter = (x - centerX) / sigma;
      const bellValue = Math.exp(-0.5 * distFromCenter * distFromCenter);

      const wave1 = Math.sin(x * 0.012 + waveTime * 1.5) * 6;
      const wave2 = Math.cos(x * 0.022 - waveTime) * 3;
      
      // Scaled down peak height (h * 0.62) to remain beneath the logo text
      const peakAmplitude = h * 0.62; 

      const slopeWave = (wave1 + wave2) * Math.pow(bellValue, 0.6);
      const y = baseLine - (bellValue * peakAmplitude) + slopeWave;

      points.push({ x, y, bellValue });
    }

    const peakIndex = points.findIndex(p => p.x >= centerX);

    // --- 1. LEFT HALF FILL (SKY BLUE / CYAN TAIL) ---
    ctx.beginPath();
    ctx.moveTo(0, baseLine);
    for (let i = 0; i <= peakIndex; i++) {
      ctx.lineTo(points[i].x, points[i].y);
    }
    ctx.lineTo(centerX, baseLine);
    ctx.closePath();

    const leftGradient = ctx.createLinearGradient(0, baseLine, 0, baseLine - (h * 0.65));
    leftGradient.addColorStop(0.0, "rgba(96, 165, 250, 0.02)");
    leftGradient.addColorStop(0.5, "rgba(34, 211, 238, 0.22)");
    leftGradient.addColorStop(1.0, "rgba(125, 211, 252, 0.45)");
    ctx.fillStyle = leftGradient;
    ctx.fill();

    // --- 2. RIGHT HALF FILL (EMERALD GREEN POSITIVE TAIL) ---
    ctx.beginPath();
    ctx.moveTo(centerX, baseLine);
    for (let i = peakIndex; i < points.length; i++) {
      ctx.lineTo(points[i].x, points[i].y);
    }
    ctx.lineTo(w, baseLine);
    ctx.closePath();

    const rightGradient = ctx.createLinearGradient(0, baseLine, 0, baseLine - (h * 0.65));
    rightGradient.addColorStop(0.0, "rgba(16, 185, 129, 0.02)");
    rightGradient.addColorStop(0.5, "rgba(16, 185, 129, 0.25)");
    rightGradient.addColorStop(1.0, "rgba(52, 211, 153, 0.52)");
    ctx.fillStyle = rightGradient;
    ctx.fill();

    // --- 3. LEFT STROKE (CYAN BLUE) ---
    ctx.beginPath();
    for (let i = 0; i <= peakIndex; i++) {
      if (i === 0) ctx.moveTo(points[i].x, points[i].y);
      else ctx.lineTo(points[i].x, points[i].y);
    }
    ctx.lineWidth = 3.5;
    ctx.strokeStyle = "#22d3ee";
    ctx.shadowColor = "#22d3ee";
    ctx.shadowBlur = 14;
    ctx.stroke();

    // --- 4. RIGHT STROKE (EMERALD GREEN) ---
    ctx.beginPath();
    for (let i = peakIndex; i < points.length; i++) {
      if (i === peakIndex) ctx.moveTo(points[i].x, points[i].y);
      else ctx.lineTo(points[i].x, points[i].y);
    }
    ctx.lineWidth = 3.5;
    ctx.strokeStyle = "#10b981";
    ctx.shadowColor = "#10b981";
    ctx.shadowBlur = 14;
    ctx.stroke();
    ctx.shadowBlur = 0;

    // --- 5. CENTER PEAK DIVIDER & NODE ---
    const peakPoint = points[peakIndex];
    if (peakPoint) {
      ctx.beginPath();
      ctx.setLineDash([4, 6]);
      ctx.moveTo(peakPoint.x, peakPoint.y);
      ctx.lineTo(peakPoint.x, baseLine);
      ctx.strokeStyle = "rgba(250, 204, 21, 0.8)";
      ctx.lineWidth = 1.8;
      ctx.stroke();
      ctx.setLineDash([]);

      ctx.beginPath();
      ctx.arc(peakPoint.x, peakPoint.y, 5 + Math.sin(waveTime * 3) * 1.5, 0, Math.PI * 2);
      ctx.fillStyle = "#facc15";
      ctx.shadowColor = "#facc15";
      ctx.shadowBlur = 12;
      ctx.fill();
      ctx.shadowBlur = 0;
    }

    time += 1;
    requestAnimationFrame(drawLiveBellCurve);
  }

  requestAnimationFrame(drawLiveBellCurve);
})();

/* 1. ENDLESS VELOCITY SCROLL LOOP ENGINE */
(function () {
  'use strict';
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
        
        if (resetThreshold > 0 && Math.abs(currentY) >= resetThreshold) {
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
  'use strict';
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
  'use strict';
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
  'use strict';
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