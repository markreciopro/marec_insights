/* ============================================================
   MAREC INSIGHTS — INTERACTIONS
   YouTube BG Autoplay · Typewriter · Scroll Reveal
   ============================================================ */

/* ── 1. YOUTUBE BACKGROUND PLAYER ───────────────────────────
   Uses the YouTube IFrame API (loaded in index.html) to create
   a muted, looping, autoplay background player inside #ytplayer.
   Falls back gracefully if the API never fires (e.g. ad-blocker).
   ─────────────────────────────────────────────────────────── */
var bgPlayer;

// Called automatically by the YouTube IFrame API script
function onYouTubeIframeAPIReady() {
  bgPlayer = new YT.Player('ytplayer', {
    videoId: 'osrFEJkhISo',
    playerVars: {
      autoplay:       1,
      mute:           1,
      loop:           1,
      playlist:       'osrFEJkhISo', // required for loop
      controls:       0,
      disablekb:      1,
      fs:             0,
      iv_load_policy: 3,  // hide annotations
      modestbranding: 1,
      rel:            0,
      showinfo:       0,
      playsinline:    1,
    },
    events: {
      onReady: function (e) {
        e.target.mute();
        e.target.playVideo();
      },
      onStateChange: function (e) {
        // -1 = unstarted, 0 = ended → restart
        if (e.data === YT.PlayerState.ENDED || e.data === -1) {
          e.target.playVideo();
        }
        // 2 = paused (some browsers pause autoplay) → unpause
        if (e.data === YT.PlayerState.PAUSED) {
          setTimeout(function () { e.target.playVideo(); }, 300);
        }
      }
    }
  });
}

// Fallback: if IFrame API doesn't load within 4 s, show a dark BG
setTimeout(function () {
  var bg = document.getElementById('video-bg');
  if (bg && !bgPlayer) {
    bg.style.background = 'linear-gradient(160deg,#050a1a 0%,#0d1530 100%)';
  }
}, 4000);


/* ── 2. TYPEWRITER ───────────────────────────────────────── */
(function initTypewriter() {
  var PHRASES = [
    'Strategic Data Architect',
    'Workforce Intelligence Partner',
    'Power BI · Python · R · SQL',
    'HR Analytics Consultant',
    'Mission-Focused Analytics'
  ];
  var phraseIdx = 0;
  var charIdx   = 0;
  var deleting  = false;
  var target    = document.getElementById('typewriter');
  if (!target) return;

  function tick() {
    var phrase = PHRASES[phraseIdx];

    if (!deleting) {
      target.textContent = phrase.slice(0, charIdx + 1);
      charIdx++;
      if (charIdx === phrase.length) {
        deleting = true;
        setTimeout(tick, 1900);
        return;
      }
      setTimeout(tick, 62);
    } else {
      target.textContent = phrase.slice(0, charIdx - 1);
      charIdx--;
      if (charIdx === 0) {
        deleting  = false;
        phraseIdx = (phraseIdx + 1) % PHRASES.length;
        setTimeout(tick, 380);
        return;
      }
      setTimeout(tick, 32);
    }
  }
  setTimeout(tick, 700);
})();


/* ── 3. SCROLL REVEAL ────────────────────────────────────── */
(function initReveal() {
  // Respect reduced-motion system preference
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    document.querySelectorAll('.reveal, .reveal-step').forEach(function (el) {
      el.classList.add('active');
    });
    return;
  }

  function check() {
    var vh = window.innerHeight;

    document.querySelectorAll('.reveal:not(.active)').forEach(function (el) {
      if (el.getBoundingClientRect().top < vh - 60) el.classList.add('active');
    });

    document.querySelectorAll('.reveal-step:not(.active)').forEach(function (el) {
      if (el.getBoundingClientRect().top < vh * 0.88) el.classList.add('active');
    });
  }

  window.addEventListener('scroll', check, { passive: true });
  window.addEventListener('DOMContentLoaded', check);
  check();
})();
