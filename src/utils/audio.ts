// Disabled sound system
let isMuted = true;

export const setMuted = (muted: boolean) => {
  isMuted = muted;
};

export const getMuted = () => true;

export const playTap = () => {};
export const playDelete = () => {};
export const playReveal = () => {};
export const playTick = (highPitch: boolean = false) => {};
export const playAlarm = () => {};
export const playVictory = () => {};
export const playDefeat = () => {};
