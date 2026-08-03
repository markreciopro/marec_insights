/* ============================================================
   MAREC INSIGHTS ENGINE — PREDICTIVE BELL CURVE
   ============================================================ */

(function () {
  'use strict';
  const canvas = document.getElementById("bellCurveCanvas");
  if (!canvas) return;
  const ctx = canvas.getContext("2d");

  let time = 0;

  function resizeCanvas() {
    if (!canvas.parentElement) return;
    canvas.width = canvas.parentElement.clientWidth;
    canvas.height = canvas.parentElement.clientHeight;
  }
  window.addEventListener("resize", resizeCanvas);
  resizeCanvas();

  // Gaussian PDF Calculation
  function gaussian(x, mean, sigma) {
    return Math.exp(-Math.pow(x - mean, 2) / (2 * Math.pow(sigma, 2)));
  }

  function drawPredictiveBellCurve() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const w = canvas.width;
    const h = canvas.height;
    const baseLine = h * 0.88;

    time += 0.008;

    // Statistical Bell Curve
    const mean = w * 0.5 + Math.sin(time * 0.3) * (w * 0.04);
    const sigma = w * 0.18;
    const amplitude = h * 0.38;

    const points = [];
    const step = 4;

    for (let x = 0; x <= w; x += step) {
      const g = gaussian(x, mean, sigma);
      const y = baseLine - (g * amplitude);
      points.push({ x, y, g });
    }

    // Standard Deviation Area (\sigma)
    const sigma1Left = mean - sigma;
    const sigma1Right = mean + sigma;

    ctx.beginPath();
    ctx.moveTo(sigma1Left, baseLine);
    for (let i = 0; i < points.length; i++) {
      if (points[i].x >= sigma1Left && points[i].x <= sigma1Right) {
        ctx.lineTo(points[i].x, points[i].y);
      }
    }
    ctx.lineTo(sigma1Right, baseLine);
    ctx.closePath();
    ctx.fillStyle = "rgba(0, 229, 255, 0.08)";
    ctx.fill();

    // Curve Path
    ctx.beginPath();
    for (let i = 0; i < points.length; i++) {
      if (i === 0) ctx.moveTo(points[i].x, points[i].y);
      else ctx.lineTo(points[i].x, points[i].y);
    }
    ctx.lineWidth = 2.5;
    ctx.strokeStyle = "#00A896";
    ctx.shadowColor = "rgba(0, 229, 255, 0.35)";
    ctx.shadowBlur = 8;
    ctx.stroke();
    ctx.shadowBlur = 0;

    // Mean Line (\mu)
    const meanY = baseLine - amplitude;
    ctx.beginPath();
    ctx.setLineDash([4, 4]);
    ctx.moveTo(mean, baseLine);
    ctx.lineTo(mean, meanY);
    ctx.strokeStyle = "rgba(212, 175, 55, 0.65)";
    ctx.lineWidth = 1.5;
    ctx.stroke();
    ctx.setLineDash([]);

    // Sample Data Nodes
    for (let i = 0; i < 7; i++) {
      const sampleOffset = (i - 3) * (sigma * 0.6) + Math.sin(time + i) * 12;
      const sampleX = mean + sampleOffset;
      const sampleG = gaussian(sampleX, mean, sigma);
      const sampleY = baseLine - (sampleG * amplitude);

      ctx.beginPath();
      ctx.arc(sampleX, sampleY, 3.5, 0, Math.PI * 2);
      ctx.fillStyle = i % 2 === 0 ? "#00E5FF" : "#D4AF37";
      ctx.fill();
    }

    requestAnimationFrame(drawPredictiveBellCurve);
  }

  requestAnimationFrame(drawPredictiveBellCurve);
})();

/* 1. ENDLESS INSIGHT STREAM ENGINE */
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
    "Resort Workforce & Seasonal Yield Analytics",
    "FMLA / ADA Leave & HR Compliance Audits",
    "Labor Cost Control & Overtime Mitigation",
    "Peak Season Staffing & Demand Forecasting",
    "Strategic Data Architecture & Cloud Pipelines",
    "Full-Stack Python, React & SQL Engineering",
    "Executive Dashboards for Resort Operations"
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