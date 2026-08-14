/* HORIZONTAL ENDLESS INSIGHT STREAM ENGINE */
(function () {
  'use strict';
  window.addEventListener("DOMContentLoaded", function () {
    const track = document.querySelector(".marec-shiftboard-track");
    const list = document.getElementById("projectLoopList");
    if (!track || !list) return;

    const originalCards = Array.from(list.children);
    originalCards.forEach((card) => {
      const clone = card.cloneNode(true);
      clone.setAttribute("aria-hidden", "true");
      clone.querySelectorAll("[id]").forEach((el) => el.removeAttribute("id"));
      list.appendChild(clone);
    });

    let currentX = 0;
    let speed = 0.65;
    let isPaused = false;

    function renderLoop() {
      if (!isPaused) {
        currentX -= speed;
        const resetThreshold = list.scrollWidth / 2;

        if (resetThreshold > 0 && Math.abs(currentX) >= resetThreshold) {
          currentX = 0;
        }
        list.style.transform = `translateX(${currentX}px)`;
      }
      requestAnimationFrame(renderLoop);
    }

    track.addEventListener("mouseenter", () => { isPaused = true; });
    track.addEventListener("mouseleave", () => { isPaused = false; });
    track.addEventListener("touchstart", () => { isPaused = true; }, { passive: true });
    track.addEventListener("touchend", () => { isPaused = false; }, { passive: true });
    list.addEventListener("focusin", () => { isPaused = true; });
    list.addEventListener("focusout", () => { isPaused = false; });

    requestAnimationFrame(renderLoop);
  });
})();

/* TYPEWRITER EFFECT ENGINE */
(function () {
  'use strict';
  const PHRASES = [
    "Resort Workforce & Seasonal Yield Analytics",
    "FMLA / ADA Leave & HR Compliance Audits",
    "Labor Cost Control & Overtime Mitigation",
    "Peak Season Staffing & Demand Forecasting",
    "Strategic Data Architecture & Cloud Pipelines",
    "Full-Stack Python, React & Tableau Engineering",
    "Executive Dashboards for Resort Operations"
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
  window.addEventListener("scroll", revealOnScroll, { passive: true });
  window.addEventListener("DOMContentLoaded", revealOnScroll);
  setTimeout(revealOnScroll, 100);
})();

/* FORCE-DOWNLOAD ENGINE */
(function () {
  'use strict';

  function triggerBlobDownload(blob, filename) {
    const blobUrl = window.URL.createObjectURL(blob);
    const tempLink = document.createElement("a");
    tempLink.href = blobUrl;
    tempLink.download = filename;
    document.body.appendChild(tempLink);
    tempLink.click();
    document.body.removeChild(tempLink);
    window.URL.revokeObjectURL(blobUrl);
  }

  function initForceDownloads() {
    const links = document.querySelectorAll("[data-force-download]");

    links.forEach((link) => {
      link.addEventListener("click", async function (event) {
        event.preventDefault();
        const url = this.getAttribute("href");
        if (!url) return;

        const filename =
          this.getAttribute("data-filename") ||
          decodeURIComponent(url.split("/").pop() || "download.pdf");

        const originalLabel = this.innerHTML;
        this.setAttribute("aria-busy", "true");
        this.innerHTML = "⏳ Preparing download…";

        try {
          const response = await fetch(url, { mode: "cors" });
          if (!response.ok) throw new Error("Network response was not ok");
          const blob = await response.blob();
          triggerBlobDownload(blob, filename);
        } catch (err) {
          console.warn("Force-download failed, opening file directly instead:", err);
          window.open(url, "_blank", "noopener,noreferrer");
        } finally {
          this.removeAttribute("aria-busy");
          this.innerHTML = originalLabel;
        }
      });
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initForceDownloads);
  } else {
    initForceDownloads();
  }
})();