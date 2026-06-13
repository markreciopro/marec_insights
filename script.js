/* ============================================================
   MAREC INSIGHTS — STYLESHEET
   YouTube Video BG · Dark Navy Glass · Steel Blue Accents
   ============================================================ */

:root {
  --bg-dark:        #0a0f1e;
  --bg-card:        rgba(10, 15, 36, 0.78);
  --bg-card-hover:  rgba(14, 22, 50, 0.88);
  --accent-blue:    #3b82f6;
  --accent-sky:     #60a5fa;
  --accent-steel:   #93c5fd;
  --accent-cyan:    #22d3ee;
  --accent-gold:    #f2c811;
  --accent-green:   #34d399;
  --text-main:      #e2e8f0;
  --text-muted:     #94a3b8;
  --border:         rgba(59, 130, 246, 0.18);
  --border-bright:  rgba(59, 130, 246, 0.5);
  --transition:     all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  --radius:         14px;
  --radius-sm:      8px;
}

*, *::before, *::after { margin: 0; padding: 0; box-sizing: border-box; }
html { scroll-behavior: smooth; }

body {
  font-family: 'Inter', sans-serif;
  font-size: 16px;
  line-height: 1.7;
  color: var(--text-main);
  background: var(--bg-dark);
  min-height: 100vh;
  overflow-x: hidden;
}

/* ── VIDEO BACKGROUND ── */
#video-bg {
  position: fixed;
  inset: 0;
  z-index: 0;
  overflow: hidden;
  background: #050810;
}

/* The YouTube iframe is injected here by the IFrame API */
#ytplayer {
  position: absolute;
  /* oversized so it always covers the viewport regardless of AR */
  top: 50%;
  left: 50%;
  width: 100vw;
  height: 56.25vw;   /* 16:9 */
  min-height: 100vh;
  min-width: 177.78vh; /* 16:9 inverted */
  transform: translate(-50%, -50%);
  pointer-events: none;
}

#ytplayer iframe {
  width: 100%;
  height: 100%;
  border: none;
}

/* Dark tinted overlay so text stays readable */
.video-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(
    160deg,
    rgba(5, 8, 20, 0.82) 0%,
    rgba(8, 14, 35, 0.75) 50%,
    rgba(5, 8, 20, 0.85) 100%
  );
}

/* ── CONTAINER ── */
.container {
  position: relative;
  z-index: 1;
  width: 100%;
  max-width: 1180px;
  margin: 0 auto;
  padding: 44px 24px 64px;
}

/* ── TYPOGRAPHY UTILITIES ── */
.mono    { font-family: 'Fira Code', monospace; }
.muted   { color: var(--text-muted); font-size: 0.95rem; }
.subtext { color: var(--text-muted); margin-bottom: 32px; line-height: 1.7; }

.eyebrow {
  display: block;
  font-size: 0.72rem;
  letter-spacing: 3px;
  color: var(--accent-cyan);
  text-transform: uppercase;
  margin-bottom: 8px;
}

.highlight { color: var(--accent-gold); font-weight: 700; }

.label {
  display: block;
  font-size: 0.7rem;
  letter-spacing: 2.5px;
  color: var(--accent-sky);
  text-transform: uppercase;
  margin-bottom: 14px;
}

/* ── HERO ── */
.header {
  text-align: center;
  padding: 90px 32px 80px;
  background: rgba(8, 13, 30, 0.55);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border-radius: var(--radius);
  border: 1px solid var(--border);
  margin-bottom: 36px;
  animation: fadeDown 0.9s ease-out both;
}

@keyframes fadeDown {
  from { opacity: 0; transform: translateY(-30px); }
  to   { opacity: 1; transform: translateY(0); }
}

.main-title {
  font-family: 'Fira Code', monospace;
  font-size: clamp(2.8rem, 9vw, 5.4rem);
  font-weight: 700;
  line-height: 1.05;
  letter-spacing: -1px;
  background: linear-gradient(130deg, var(--accent-sky) 0%, var(--accent-cyan) 55%, var(--accent-steel) 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  filter: drop-shadow(0 0 32px rgba(96,165,250,0.45));
  margin-bottom: 8px;
}

.sub-title {
  font-size: 0.88rem;
  color: var(--accent-steel);
  letter-spacing: 2.5px;
  opacity: 0.85;
  margin-bottom: 22px;
}

#typewriter {
  font-family: 'Fira Code', monospace;
  font-size: clamp(1rem, 2.6vw, 1.3rem);
  color: var(--accent-cyan);
  min-height: 1.7em;
  letter-spacing: 1px;
  margin-bottom: 22px;
}

#typewriter::after {
  content: '|';
  animation: blink 0.85s step-end infinite;
  color: var(--accent-gold);
  margin-left: 2px;
}

@keyframes blink {
  0%, 100% { opacity: 1; }
  50%       { opacity: 0; }
}

.tagline {
  max-width: 580px;
  margin: 0 auto 34px;
  font-size: 1.08rem;
  color: var(--text-muted);
  line-height: 1.85;
}

.hero-cta-row {
  display: flex;
  gap: 14px;
  justify-content: center;
  flex-wrap: wrap;
}

/* ── BUTTONS ── */
.btn {
  display: inline-block;
  padding: 12px 26px;
  border-radius: var(--radius-sm);
  font-size: 0.92rem;
  font-weight: 600;
  text-decoration: none;
  cursor: pointer;
  transition: var(--transition);
  letter-spacing: 0.3px;
}

.btn-cta {
  background: var(--accent-blue);
  color: #fff;
  border: 1px solid transparent;
}

.btn-cta:hover {
  background: var(--accent-sky);
  transform: translateY(-2px);
  box-shadow: 0 8px 24px rgba(59,130,246,0.45);
}

.btn-outline {
  background: transparent;
  color: var(--accent-sky);
  border: 1px solid var(--border-bright);
}

.btn-outline:hover {
  background: rgba(59,130,246,0.12);
  border-color: var(--accent-sky);
  transform: translateY(-2px);
}

/* ── SECTION CARDS ── */
.section-card {
  background: var(--bg-card);
  padding: 50px 40px;
  margin-bottom: 32px;
  border-radius: var(--radius);
  border: 1px solid var(--border);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  transition: var(--transition);
}

.section-card:hover {
  background: var(--bg-card-hover);
  border-color: var(--border-bright);
}

.section-title {
  font-family: 'Fira Code', monospace;
  font-size: clamp(1.3rem, 3vw, 1.7rem);
  color: var(--accent-sky);
  text-transform: uppercase;
  letter-spacing: 2px;
  margin-bottom: 28px;
  line-height: 1.3;
}

/* ── PORTAL GRID ── */
.portal-grid {
  display: grid;
  grid-template-columns: 1.1fr 0.9fr;
  gap: 36px;
  align-items: start;
}

@media (max-width: 860px) {
  .portal-grid { grid-template-columns: 1fr; }
}

/* MAREC Acronym List */
.marec-list {
  list-style: none;
  margin-bottom: 24px;
}

.marec-list li {
  display: flex;
  align-items: center;
  gap: 14px;
  padding: 10px 0;
  border-bottom: 1px solid var(--border);
}

.marec-list li:last-child { border-bottom: none; }

.letter {
  font-family: 'Fira Code', monospace;
  font-size: 1.05rem;
  font-weight: 700;
  color: var(--accent-cyan);
  background: rgba(34,211,238,0.1);
  border: 1px solid rgba(34,211,238,0.25);
  border-radius: 6px;
  width: 36px;
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.item-text { font-size: 0.97rem; }

/* Flyer Card */
.flyer-card {
  display: flex;
  align-items: flex-start;
  gap: 16px;
  background: rgba(59,130,246,0.08);
  border: 1px solid var(--border-bright);
  border-radius: var(--radius-sm);
  padding: 22px;
  margin-top: 24px;
  transition: var(--transition);
}

.flyer-card:hover {
  background: rgba(59,130,246,0.14);
  transform: translateY(-3px);
}

.flyer-icon { font-size: 2rem; flex-shrink: 0; line-height: 1; }

.flyer-heading {
  font-family: 'Fira Code', monospace;
  font-size: 0.95rem;
  color: var(--accent-sky);
  margin-bottom: 6px;
  text-transform: uppercase;
  letter-spacing: 1px;
}

.flyer-sub {
  font-size: 0.87rem;
  color: var(--text-muted);
  margin-bottom: 14px;
  line-height: 1.55;
}

/* In-section video (portal right) */
.video-wrapper {
  position: relative;
  width: 100%;
  padding-top: 56.25%;
  border-radius: var(--radius-sm);
  overflow: hidden;
  border: 1px solid var(--border);
  box-shadow: 0 8px 32px rgba(0,0,0,0.5);
}

.video-wrapper iframe {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  border: none;
}

/* ── ROADMAP ── */
.roadmap-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
}

@media (max-width: 720px) {
  .roadmap-grid { grid-template-columns: 1fr; }
}

.stage-card {
  display: flex;
  gap: 18px;
  background: rgba(255,255,255,0.04);
  border: 1px solid var(--border);
  border-radius: var(--radius-sm);
  padding: 24px;
  transition: var(--transition);
}

.stage-card:hover {
  background: rgba(59,130,246,0.09);
  border-color: var(--border-bright);
  transform: translateY(-4px);
}

.stage-num {
  font-size: 2.2rem;
  font-weight: 700;
  color: rgba(59,130,246,0.28);
  line-height: 1;
  flex-shrink: 0;
  padding-top: 3px;
  letter-spacing: -1px;
}

.stage-tag {
  font-family: 'Fira Code', monospace;
  font-size: 0.68rem;
  letter-spacing: 2px;
  color: var(--accent-cyan);
  text-transform: uppercase;
  margin-bottom: 8px;
}

.stage-title {
  font-size: 1rem;
  font-weight: 700;
  color: var(--text-main);
  margin-bottom: 8px;
  line-height: 1.4;
}

.stage-desc {
  font-size: 0.87rem;
  color: var(--text-muted);
  line-height: 1.65;
  margin-bottom: 12px;
}

.outcome-box {
  background: rgba(52,211,153,0.07);
  border: 1px solid rgba(52,211,153,0.2);
  border-radius: 6px;
  padding: 10px 14px;
  margin-bottom: 12px;
}

.outcome-label {
  font-family: 'Fira Code', monospace;
  font-size: 0.68rem;
  letter-spacing: 2px;
  color: var(--accent-green);
  display: block;
  margin-bottom: 4px;
}

.outcome-box p { font-size: 0.85rem; color: var(--text-muted); line-height: 1.5; }
.output { font-size: 0.75rem; color: var(--accent-steel); letter-spacing: 0.5px; opacity: 0.8; }

/* ── CONTACT ── */
.contact-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px 40px;
  margin-top: 10px;
}

@media (max-width: 580px) {
  .contact-grid { grid-template-columns: 1fr; }
}

.contact-field {
  display: flex;
  flex-direction: column;
  gap: 4px;
  padding-bottom: 16px;
  border-bottom: 1px solid var(--border);
}

.contact-label {
  font-size: 0.68rem;
  letter-spacing: 2px;
  color: var(--accent-cyan);
  text-transform: uppercase;
}

.contact-value {
  color: var(--text-main);
  text-decoration: none;
  font-size: 0.97rem;
  transition: color 0.2s;
}

.contact-value:hover { color: var(--accent-sky); }

/* ── FOOTER ── */
footer {
  text-align: center;
  padding: 28px 20px;
  font-size: 0.8rem;
  color: var(--text-muted);
  letter-spacing: 0.5px;
}

/* ── REVEAL ANIMATIONS ── */
.reveal {
  opacity: 0;
  transform: translateY(24px);
  transition: opacity 0.75s ease, transform 0.75s ease;
}
.reveal.active { opacity: 1; transform: translateY(0); }

.reveal-step {
  opacity: 0;
  transform: translateY(28px);
  transition: opacity 0.85s ease, transform 0.85s ease;
}
.reveal-step.active { opacity: 1; transform: translateY(0); }

.roadmap-grid .stage-card:nth-child(1) { transition-delay: 0.05s; }
.roadmap-grid .stage-card:nth-child(2) { transition-delay: 0.15s; }
.roadmap-grid .stage-card:nth-child(3) { transition-delay: 0.25s; }
.roadmap-grid .stage-card:nth-child(4) { transition-delay: 0.35s; }

/* ── RESPONSIVE PADDING ── */
@media (max-width: 600px) {
  .section-card { padding: 34px 20px; }
  .header { padding: 60px 20px 54px; }
  .container { padding: 24px 16px 48px; }
}