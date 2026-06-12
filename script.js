/* ============================================================
   MAREC INSIGHTS — INTERACTIONS
   Typewriter • Reveal on Scroll
   ============================================================ */

const typeText = "Strategic Data Architect | Intelligence Partner";
let typeIndex = 0;

function typeWriter() {
  const target = document.getElementById("typewriter");
  if (!target) return;

  if (typeIndex < typeText.length) {
    target.textContent += typeText.charAt(typeIndex);
    typeIndex++;
    setTimeout(typeWriter, 70);
  }
}

function reveal() {
  const reveals = document.querySelectorAll(".reveal");
  const steps = document.querySelectorAll(".reveal-step");
  const windowHeight = window.innerHeight;

  reveals.forEach(el => {
    const top = el.getBoundingClientRect().top;
    if (top < windowHeight - 50) el.classList.add("active");
  });

  steps.forEach(el => {
    const top = el.getBoundingClientRect().top;
    if (top < windowHeight * 0.8) el.classList.add("active");
  });
}

window.addEventListener("DOMContentLoaded", () => {
  typeWriter();
  reveal();
  window.addEventListener("scroll", reveal);
});