// Typewriter effect
const typeText = "Strategic Data Architect | Intelligence Partner";
let typeIndex = 0;
function typeWriter() {
  const target = document.getElementById('typewriter');
  if (target && typeIndex < typeText.length) {
    target.textContent += typeText.charAt(typeIndex);
    typeIndex++;
    setTimeout(typeWriter, 70);
  }
}

// Reveal on scroll
function reveal() {
  document.querySelectorAll('.reveal').forEach(el => {
    if (el.getBoundingClientRect().top < window.innerHeight - 50) {
      el.classList.add('active');
    }
  });
  document.querySelectorAll('.reveal-step').forEach(el => {
    if (el.getBoundingClientRect().top < window.innerHeight * 0.8) {
      el.classList.add('active');
    }
  });
}

window.addEventListener('DOMContentLoaded', () => {
  typeWriter();
  reveal();
  window.addEventListener('scroll', reveal);
});