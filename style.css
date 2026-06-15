/* ============================================================
   MAREC INSIGHTS V3.0 — Cinematic Unified System
   ============================================================ */

:root {
  /* Core palette */
  --bg-deep: #020617;
  --bg-deeper: #020312;

  --cyan:   #22d3ee;
  --cyan-soft: rgba(34,211,238,0.7);
  --sky:    #60a5fa;
  --sky-soft: rgba(96,165,250,0.7);
  --teal:   #2dd4bf;
  --gold:   #facc15;

  --text-main: #f9fbff;
  --text-muted: #cbd5f5;
  --text-soft: #e2e8ff;

  --ease: cubic-bezier(0.4, 0, 0.2, 1);
  --r: 14px;
  --rs: 8px;

  /* Unified shadow + glow system */
  --shadow-soft:
    0 0 10px rgba(15,23,42,0.65),
    0 18px 40px rgba(15,23,42,0.85);

  --shadow-text:
    0 0 6px rgba(15,23,42,0.7),
    0 2px 10px rgba(15,23,42,0.9);

  --glow-hero:
    0 0 18px rgba(56,189,248,0.95),
    0 0 42px rgba(56,189,248,0.75),
    0 0 90px rgba(59,130,246,0.55);

  --glow-heading:
    0 0 14px rgba(56,189,248,0.9),
    0 0 32px rgba(59,130,246,0.6);

  --glow-label:
    0 0 10px rgba(96,165,250,0.85),
    0 0 24px rgba(96,165,250,0.45);

  --glow-gold:
    0 0 12px rgba(250,204,21,0.9),
    0 0 28px rgba(250,204,21,0.55);
}

*, *::before, *::after { margin:0; padding:0; box-sizing:border-box; }
html { scroll-behavior: smooth; }

body {
  font-family: 'Inter', sans-serif;
  font-size: 16px;
  line-height: 1.72;
  color: var(--text-main);
  background: radial-gradient(circle at top, #020617 0%, #020312 55%, #00010a 100%);
  overflow-x: hidden;
  min-height: 100vh;
}

/* ════════════════════════════════════════════════════════════
   VIDEO BACKGROUND + OVERLAY
   ════════════════════════════════════════════════════════════ */
#video-bg {
  position: fixed;
  inset: 0;
  z-index: 0;
  overflow: hidden;
  background: #020617;
  pointer-events: none;
}

#yt-bg-iframe {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 100vw;
  height: 56.25vw;
  min-height: 100vh;
  min-width: 177.78vh;
  transform: translate(-50%, -50%);
  border: none;
  pointer-events: none;
}

/* Subtle cyan/navy overlay to blend UI + video */
#video-overlay {
  position: absolute;
  inset: 0;
  pointer-events: none;
  background:
    radial-gradient(circle at 20% 0%, rgba(56,189,248,0.16) 0%, transparent 55%),
    radial-gradient(circle at 80% 100%, rgba(59,130,246,0.18) 0%, transparent 60%),
    linear-gradient(to bottom, rgba(15,23,42,0.55), rgba(15,23,42,0.75));
  mix-blend-mode: soft-light;
}

/* Edge vignette */
#vignette {
  position: absolute;
  inset: 0;
  pointer-events: none;
  background: radial-gradient(
    ellipse 80% 80% at 50% 50%,
    transparent 52%,
    rgba(2, 6, 23, 0.55) 100%
  );
}

/* Particle shimmer layer */
#particles {
  position: fixed;
  inset: 0;
  pointer-events: none;
  background-image: radial-gradient(circle, rgba(255,255,255,0.06) 1px, transparent 1px);
  background-size: 3px 3px;
  opacity: 0.22;
  mix-blend-mode: screen;
  animation: shimmer 18s linear infinite;
}
@keyframes shimmer {
  from { background-position: 0 0; }
  to   { background-position: 120% 120%; }
}

/* ════════════════════════════════════════════════════════════
   PAGE WRAPPER
   ════════════════════════════════════════════════════════════ */
.page-wrap {
  position: relative;
  z-index: 2;
  max-width: 1180px;
  margin: 0 auto;
  padding: 48px 24px 80px;
}

/* ── UTILITIES ── */
.mono  { font-family: 'Fira Code', monospace; }
.sky   { color: var(--sky);  text-shadow: var(--glow-heading); }
.gold  { color: var(--gold); font-weight:700; text-shadow: var(--glow-gold); }

.eyebrow {
  display: block;
  font-size: 0.7rem;
  letter-spacing: 3.5px;
  color: var(--cyan);
  text-transform: uppercase;
  margin-bottom: 10px;
  text-shadow: var(--glow-label);
}

.body-muted {
  color: var(--text-muted);
  font-size:0.93rem;
  line-height:1.78;
  text-shadow: var(--shadow-text);
}
.body-muted.sm { font-size:0.85rem; margin-bottom:14px; }

.col-label {
  display: block;
  font-size: 0.68rem;
  letter-spacing: 2.5px;
  color: var(--sky);
  text-transform: uppercase;
  margin-bottom: 14px;
  text-shadow: var(--glow-label);
}

/* ════════════════════════════════════════════════════════════
   HERO
   ════════════════════════════════════════════════════════════ */
.hero {
  position: relative;
  text-align: center;
  padding: 120px 36px 110px;
  background: transparent;
  border: none;
  margin-bottom: 32px;
  animation: heroIn 1s var(--ease) both;
}

/* Soft radial light behind hero */
.hero-light {
  position: absolute;
  inset: 0;
  margin: auto;
  width: 520px;
  height: 520px;
  border-radius: 999px;
  background:
    radial-gradient(circle, rgba(56,189,248,0.32) 0%, transparent 60%);
  opacity: 0.9;
  filter: blur(4px);
  z-index: -1;
}

@keyframes heroIn {
  from { opacity:0; transform:translateY(-26px); }
  to   { opacity:1; transform:translateY(0); }
}

.hero-title {
  font-family: 'Fira Code', monospace;
  font-size: clamp(3rem, 11vw, 7rem);
  font-weight: 700;
  line-height: 1.0;
  letter-spacing: -2px;
  background: linear-gradient(120deg, #7dd3fc 0%, #22d3ee 40%, #60a5fa 70%, #a5f3fc 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  text-shadow: var(--glow-hero);
  margin-bottom: 14px;
  animation: pulseGlow 7s ease-in-out infinite alternate;
}
@keyframes pulseGlow {
  from {
    text-shadow:
      0 0 14px rgba(56,189,248,0.7),
      0 0 36px rgba(59,130,246,0.5),
      0 0 70px rgba(59,130,246,0.35);
  }
  to {
    text-shadow:
      0 0 24px rgba(56,189,248,1),
      0 0 60px rgba(59,130,246,0.85),
      0 0 110px rgba(59,130,246,0.6);
  }
}

.hero-sub {
  font-size: 0.9rem;
  color: var(--text-soft);
  letter-spacing: 2.4px;
  margin-bottom: 22px;
  text-shadow: var(--shadow-text);
}

#typewriter {
  font-family: 'Fira Code', monospace;
  font-size: clamp(1rem, 2.8vw, 1.4rem);
  color: var(--text-main);
  min-height: 1.8em;
  letter-spacing: 1.2px;
  margin-bottom: 28px;
  text-shadow:
    0 0 10px rgba(56,189,248,0.9),
    0 0 26px rgba(59,130,246,0.7);
}

#typewriter::after {
  content: '▌';
  animation: blink 0.85s step-end infinite;
  color: var(--gold);
  text-shadow: var(--glow-gold);
}
@keyframes blink { 0%,100%{opacity:1} 50%{opacity:0} }

.hero-tagline {
  max-width: 580px;
  margin: 0 auto 36px;
  font-size: 1.1rem;
  color: var(--text-main);
  line-height: 1.9;
  letter-spacing: 0.5px;
  text-shadow: var(--shadow-text);
}

.cta-row { display:flex; gap:14px; justify-content:center; flex-wrap:wrap; }

/* ── BUTTONS ── */
.btn {
  display: inline-block;
  padding: 13px 28px;
  border-radius: var(--rs);
  font-size: 0.92rem;
  font-weight: 600;
  text-decoration: none;
  transition: all 0.3s var(--ease);
  cursor: pointer;
  white-space: nowrap;
}

.btn-primary {
  background: linear-gradient(135deg, rgba(56,189,248,0.95), rgba(59,130,246,0.95));
  color: #f9fbff;
  border: 1px solid rgba(191,219,254,0.6);
  box-shadow:
    0 8px 26px rgba(37,99,235,0.65),
    0 0 18px rgba(56,189,248,0.75);
  text-shadow: 0 1px 4px rgba(15,23,42,0.8);
}
.btn-primary:hover {
  transform: translateY(-2px) scale(1.01);
  box-shadow:
    0 14px 40px rgba(37,99,235,0.85),
    0 0 26px rgba(56,189,248,0.9);
}

.btn-ghost {
  background: rgba(15,23,42,0.55);
  color: var(--text-main);
  border: 1px solid rgba(148,210,255,0.45);
  text-shadow: var(--shadow-text);
  box-shadow:
    inset 0 1px 0 rgba(255,255,255,0.08),
    0 10px 30px rgba(15,23,42,0.85);
  backdrop-filter: blur(10px);
}
.btn-ghost:hover {
  background: rgba(30,64,175,0.75);
  border-color: rgba(191,219,254,0.9);
  transform: translateY(-2px);
  box-shadow:
    0 14px 40px rgba(30,64,175,0.9),
    0 0 22px rgba(59,130,246,0.8);
}

.sm-btn { padding:9px 18px; font-size:0.84rem; }

/* ════════════════════════════════════════════════════════════
   SECTION CARDS — GLASS PANELS
   ════════════════════════════════════════════════════════════ */
.card {
  position: relative;
  background: rgba(15,23,42,0.42);
  border: 1px solid rgba(148,210,255,0.32);
  border-radius: var(--r);
  padding: 50px 42px;
  margin-bottom: 28px;
  box-shadow:
    0 0 0 1px rgba(15,23,42,0.8),
    0 24px 60px rgba(15,23,42,0.95),
    0 0 40px rgba(37,99,235,0.25);
  backdrop-filter: blur(18px);
  transition:
    background 0.35s var(--ease),
    border-color 0.35s var(--ease),
    transform 0.35s var(--ease),
    box-shadow 0.35s var(--ease);
}
.card::before {
  content:'';
  position:absolute;
  inset:0;
  border-radius:inherit;
  background: linear-gradient(
    135deg,
    rgba(148,210,255,0.18),
    transparent 40%,
    transparent 60%,
    rgba(56,189,248,0.16)
  );
  opacity:0.35;
  mix-blend-mode:screen;
  pointer-events:none;
}
.card:hover {
  background: rgba(15,23,42,0.52);
  border-color: rgba(191,219,254,0.7);
  transform: translateY(-4px);
  box-shadow:
    0 0 0 1px rgba(59,130,246,0.4),
    0 30px 70px rgba(15,23,42,0.98),
    0 0 60px rgba(56,189,248,0.35);
}

.card-title {
  position: relative;
  font-family: 'Fira Code', monospace;
  font-size: clamp(1.25rem, 2.8vw, 1.65rem);
  color: var(--text-main);
  text-transform: uppercase;
  letter-spacing: 2px;
  margin-bottom: 28px;
  line-height: 1.3;
  text-shadow: var(--glow-heading);
}

/* ── TWO-COLUMN ── */
.two-col {
  display: grid;
  grid-template-columns: 1.1fr 0.9fr;
  gap: 36px;
  align-items: start;
}
@media (max-width:820px) { .two-col { grid-template-columns:1fr; } }

/* MAREC list */
.m-list { list-style:none; margin-bottom:22px; }
.m-list li {
  display: flex;
  align-items: center;
  gap: 13px;
  padding: 10px 0;
  font-size: 0.96rem;
  color: var(--text-main);
  border-bottom: 1px solid rgba(148,210,255,0.16);
  text-shadow: var(--shadow-text);
}
.m-list li:last-child { border-bottom:none; }

.badge {
  font-family: 'Fira Code', monospace;
  font-weight: 700;
  font-size: 0.98rem;
  color: var(--cyan);
  background: rgba(15,23,42,0.9);
  border: 1px solid rgba(34,211,238,0.6);
  border-radius: 6px;
  width:34px; height:34px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  box-shadow:
    0 0 14px rgba(34,211,238,0.6),
    0 0 30px rgba(56,189,248,0.7);
  text-shadow:
    0 0 10px rgba(34,211,238,0.9);
}

/* Flyer card */
.flyer-card {
  display: flex;
  gap: 16px;
  align-items: flex-start;
  background: rgba(15,23,42,0.85);
  border: 1px solid rgba(96,165,250,0.45);
  border-radius: var(--rs);
  padding: 20px;
  margin-top: 24px;
  box-shadow:
    0 14px 40px rgba(15,23,42,0.95),
    0 0 26px rgba(59,130,246,0.35);
  transition: all 0.3s var(--ease);
}
.flyer-card:hover {
  background: rgba(30,64,175,0.9);
  transform: translateY(-3px);
  box-shadow:
    0 18px 50px rgba(15,23,42,1),
    0 0 32px rgba(59,130,246,0.55);
}
.flyer-icon { font-size:1.9rem; flex-shrink:0; line-height:1; }

/* In-section video embed */
.vid-embed {
  position: relative;
  width: 100%;
  padding-top: 56.25%;
  border-radius: var(--rs);
  overflow: hidden;
  border: 1px solid rgba(148,210,255,0.35);
  box-shadow:
    0 18px 50px rgba(15,23,42,0.95),
    0 0 30px rgba(15,23,42,0.9);
}
.vid-embed iframe {
  position: absolute;
  inset: 0;
  width:100%; height:100%;
  border: none;
}

/* ── ROADMAP 2×2 ── */
.four-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 18px;
}
@media (max-width:680px) { .four-grid { grid-template-columns:1fr; } }

.stage {
  background: rgba(15,23,42,0.9);
  border: 1px solid rgba(148,210,255,0.26);
  border-radius: var(--rs);
  padding: 24px 20px;
  box-shadow:
    0 10px 30px rgba(15,23,42,0.95),
    0 0 24px rgba(37,99,235,0.35);
  transition: all 0.3s var(--ease);
}
.stage:hover {
  background: rgba(30,64,175,0.95);
  border-color: rgba(191,219,254,0.8);
  transform: translateY(-4px);
  box-shadow:
    0 16px 40px rgba(15,23,42,1),
    0 0 34px rgba(56,189,248,0.55);
}

.stage-num {
  font-size: 2.2rem; font-weight:700;
  color: rgba(148,210,255,0.45);
  line-height:1; letter-spacing:-1px; margin-bottom:8px;
  text-shadow: var(--shadow-text);
}
.stage-tag {
  font-size: 0.66rem; letter-spacing:2px;
  color: var(--cyan); text-transform:uppercase; margin-bottom:8px;
  text-shadow: var(--glow-label);
}
.stage-name {
  font-size: 0.98rem; font-weight:700;
  color: var(--text-main); margin-bottom:8px; line-height:1.4;
  text-shadow: var(--shadow-text);
}
.stage-desc {
  font-size: 0.86rem; color: var(--text-muted); line-height:1.66; margin-bottom:12px;
  text-shadow: var(--shadow-text);
}
.outcome {
  background: rgba(34,197,94,0.08);
  border: 1px solid rgba(34,197,94,0.35);
  border-radius: 6px; padding:10px 12px; margin-bottom:10px;
}
.outcome-lbl {
  font-size:0.65rem; letter-spacing:2px; color:#4ade80;
  display:block; margin-bottom:4px;
  text-shadow:
    0 0 10px rgba(34,197,94,0.8),
    0 0 22px rgba(34,197,94,0.5);
}
.outcome p { font-size:0.83rem; color:var(--text-muted); line-height:1.5; text-shadow:var(--shadow-text); }
.stack { font-size:0.72rem; color:#bfdbfe; letter-spacing:0.5px; opacity:0.9; text-shadow:var(--shadow-text); }

/* ── CONTACT ── */
.contact-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 18px 40px;
  margin-top: 8px;
}
@media (max-width:540px) { .contact-grid { grid-template-columns:1fr; } }
.cf {
  display:flex; flex-direction:column; gap:4px;
  padding-bottom:14px; border-bottom:1px solid rgba(148,210,255,0.18);
}
.cf-lbl { font-size:0.66rem; letter-spacing:2px; color:var(--cyan); text-transform:uppercase; text-shadow:var(--glow-label); }
.cf-val { color:var(--text-main); text-decoration:none; font-size:0.95rem; transition:color 0.2s; text-shadow:var(--shadow-text); }
.cf-val:hover { color:var(--sky); }

/* ── FOOTER ── */
footer {
  text-align:center;
  padding:28px 20px;
  font-size:0.78rem;
  color:var(--text-muted);
  letter-spacing:0.5px;
  text-shadow:var(--shadow-text);
}

/* ════════════════════════════════════════════════════════════
   SCROLL REVEAL
   ════════════════════════════════════════════════════════════ */
.reveal {
  opacity:0;
  transform:translateY(22px);
  transition:opacity 0.75s var(--ease),transform 0.75s var(--ease);
}
.reveal.visible { opacity:1; transform:translateY(0); }

.reveal-step {
  opacity:0;
  transform:translateY(26px);
  transition:opacity 0.85s var(--ease),transform 0.85s var(--ease);
}
.reveal-step.visible { opacity:1; transform:translateY(0); }

.four-grid .stage:nth-child(1){transition-delay:0.05s}
.four-grid .stage:nth-child(2){transition-delay:0.14s}
.four-grid .stage:nth-child(3){transition-delay:0.23s}
.four-grid .stage:nth-child(4){transition-delay:0.32s}

@media (prefers-reduced-motion:reduce){
  .reveal,.reveal-step{opacity:1;transform:none;transition:none}
}

/* ── RESPONSIVE ── */
@media (max-width:600px){
  .page-wrap{padding:18px 14px 52px}
  .card{padding:30px 18px}
  .hero{padding:80px 18px 72px}
  .hero-light{width:360px;height:360px;}
}