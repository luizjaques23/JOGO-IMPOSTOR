// Lightweight Web Audio API sound synthesizer + safe mobile haptics
let isMuted = false;
let audioCtx: AudioContext | null = null;

const getAudioContext = (): AudioContext | null => {
  if (typeof window === 'undefined') return null;
  if (!audioCtx) {
    const AudioContextClass =
      window.AudioContext || (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
    if (AudioContextClass) {
      try {
        audioCtx = new AudioContextClass();
      } catch {
        return null;
      }
    }
  }
  if (audioCtx && audioCtx.state === 'suspended') {
    audioCtx.resume().catch(() => {});
  }
  return audioCtx;
};

const playTone = (
  freq: number,
  duration: number,
  type: OscillatorType = 'sine',
  volume: number = 0.08,
  delay: number = 0,
  endFreq?: number
) => {
  if (isMuted) return;
  const ctx = getAudioContext();
  if (!ctx) return;

  try {
    const now = ctx.currentTime + delay;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = type;
    osc.frequency.setValueAtTime(freq, now);
    if (endFreq !== undefined) {
      osc.frequency.exponentialRampToValueAtTime(Math.max(20, endFreq), now + duration);
    }

    gain.gain.setValueAtTime(0.0001, now);
    gain.gain.exponentialRampToValueAtTime(volume, now + 0.012);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + duration);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(now);
    osc.stop(now + duration + 0.02);
  } catch {
    // Ignore audio errors on restricted devices
  }
};

export const triggerHaptic = (pattern: number | number[] = 10) => {
  if (typeof navigator !== 'undefined' && typeof navigator.vibrate === 'function') {
    try {
      navigator.vibrate(pattern);
    } catch {
      // Ignore if blocked
    }
  }
};

export const setMuted = (muted: boolean) => {
  isMuted = muted;
};

export const getMuted = () => isMuted;

export const playTap = () => {
  triggerHaptic(8);
  playTone(540, 0.055, 'triangle', 0.05, 0, 420);
};

export const playVoteSelect = () => {
  triggerHaptic(14);
  playTone(460, 0.07, 'sine', 0.06, 0, 680);
};

export const playDelete = () => {
  triggerHaptic([12, 30, 12]);
  playTone(280, 0.1, 'sawtooth', 0.04, 0, 160);
};

export const playReveal = () => {
  triggerHaptic(18);
  playTone(320, 0.14, 'sine', 0.06, 0, 520);
  playTone(640, 0.18, 'triangle', 0.05, 0.06, 780);
};

export const playTick = (highPitch: boolean = false) => {
  if (highPitch) {
    triggerHaptic(10);
    playTone(880, 0.05, 'sine', 0.05, 0, 660);
  } else {
    playTone(440, 0.035, 'sine', 0.025, 0, 380);
  }
};

export const playAlarm = () => {
  triggerHaptic([60, 50, 60, 50, 90]);
  playTone(680, 0.16, 'triangle', 0.09, 0);
  playTone(520, 0.18, 'triangle', 0.09, 0.18);
  playTone(680, 0.25, 'triangle', 0.09, 0.36);
};

export const playVictory = () => {
  triggerHaptic([20, 40, 40]);
  playTone(523.25, 0.14, 'triangle', 0.07, 0);
  playTone(659.25, 0.14, 'triangle', 0.07, 0.1);
  playTone(783.99, 0.24, 'triangle', 0.08, 0.2);
  playTone(1046.5, 0.35, 'sine', 0.07, 0.3);
};

export const playPartialVictory = () => {
  triggerHaptic([20, 50, 20]);
  playTone(440, 0.14, 'triangle', 0.06, 0);
  playTone(554.37, 0.16, 'triangle', 0.06, 0.12);
  playTone(493.88, 0.28, 'sine', 0.06, 0.26);
};

export const playDefeat = () => {
  triggerHaptic([40, 40, 80]);
  playTone(349.23, 0.18, 'sawtooth', 0.05, 0, 311.13);
  playTone(293.66, 0.2, 'sawtooth', 0.05, 0.16, 261.63);
  playTone(220, 0.36, 'triangle', 0.06, 0.34, 174.61);
};
