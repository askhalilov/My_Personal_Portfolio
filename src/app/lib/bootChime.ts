// A short, pleasant hi‑tech boot chime.
// Important: browsers block autoplay audio, especially on mobile.
// We arm the sound after the loader ends and play it once on the next user gesture.

let armed = false;
let played = false;

function canPlayOncePerSession() {
  try {
    return sessionStorage.getItem('boot_chime_played') !== '1';
  } catch {
    return true;
  }
}

function markPlayed() {
  try {
    sessionStorage.setItem('boot_chime_played', '1');
  } catch {}
}

function playChime() {
  const AudioCtx = (window as any).AudioContext || (window as any).webkitAudioContext;
  if (!AudioCtx) return;

  const ctx = new AudioCtx();
  const now = ctx.currentTime;
  const t0 = now + 0.02;

  const master = ctx.createGain();
  master.gain.value = 0.0001;
  master.connect(ctx.destination);

  // Smooth attack & release
  master.gain.exponentialRampToValueAtTime(0.10, t0 + 0.04);
  master.gain.exponentialRampToValueAtTime(0.0001, t0 + 1.05);

  const filter = ctx.createBiquadFilter();
  filter.type = 'lowpass';
  filter.frequency.setValueAtTime(9000, t0);
  filter.Q.setValueAtTime(0.4, t0);
  filter.connect(master);

  // Two oscillators for a clean “tech” chord
  const o1 = ctx.createOscillator();
  o1.type = 'sine';
  o1.frequency.setValueAtTime(440, t0);
  o1.frequency.exponentialRampToValueAtTime(880, t0 + 0.10);
  o1.frequency.exponentialRampToValueAtTime(660, t0 + 0.32);

  const o2 = ctx.createOscillator();
  o2.type = 'triangle';
  o2.frequency.setValueAtTime(660, t0);
  o2.frequency.exponentialRampToValueAtTime(990, t0 + 0.10);
  o2.frequency.exponentialRampToValueAtTime(770, t0 + 0.32);

  const o3 = ctx.createOscillator();
  o3.type = 'sine';
  o3.frequency.setValueAtTime(1320, t0);
  o3.frequency.exponentialRampToValueAtTime(1760, t0 + 0.08);
  o3.frequency.exponentialRampToValueAtTime(1320, t0 + 0.22);

  const g1 = ctx.createGain();
  g1.gain.value = 0.7;
  const g2 = ctx.createGain();
  g2.gain.value = 0.35;
  const g3 = ctx.createGain();
  g3.gain.value = 0.18;

  o1.connect(g1);
  o2.connect(g2);
  o3.connect(g3);
  g1.connect(filter);
  g2.connect(filter);
  g3.connect(filter);

  o1.start(t0);
  o2.start(t0);
  o3.start(t0);
  o1.stop(t0 + 0.62);
  o2.stop(t0 + 0.62);
  o3.stop(t0 + 0.45);

  // Cleanup
  setTimeout(() => {
    try {
      ctx.close();
    } catch {}
  }, 1300);
}

function tryPlay() {
  if (!armed || played) return;
  if (!canPlayOncePerSession()) {
    played = true;
    return;
  }

  try {
    // Attempt playback. If the context is suspended, it will be resumed on gesture.
    playChime();
    played = true;
    markPlayed();
  } catch {
    // keep armed; will try again on the next gesture
  }
}

export function armBootChime() {
  armed = true;
}

export function installBootChimeGate() {
  if (typeof window === 'undefined') return;

  const onGesture = () => {
    tryPlay();
  };

  // We listen multiple times but only play once.
  window.addEventListener('pointerdown', onGesture, { passive: true });
  window.addEventListener('keydown', onGesture);
}
