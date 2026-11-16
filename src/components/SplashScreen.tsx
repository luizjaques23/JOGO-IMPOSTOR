import React, { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { Language } from '../types';
import { playTap } from '../utils/audio';

interface SplashScreenProps {
  onComplete: () => void;
  lang: Language;
}

export default function SplashScreen({ onComplete, lang }: SplashScreenProps) {
  const [canSkip, setCanSkip] = useState(false);

  useEffect(() => {
    const skipTimer = setTimeout(() => setCanSkip(true), 350);
    const doneTimer = setTimeout(() => {
      onComplete();
    }, 2600);

    return () => {
      clearTimeout(skipTimer);
      clearTimeout(doneTimer);
    };
  }, [onComplete]);

  const handleSkip = () => {
    if (!canSkip) return;
    playTap();
    onComplete();
  };

  const subtitle =
    lang === 'pt'
      ? 'MISTÉRIO • BLEFE • DEDUÇÃO'
      : 'MYSTERY • BLUFF • DEDUCTION';

  const statusText =
    lang === 'pt'
      ? 'INICIALIZANDO DOSSIÊ CONFIDENCIAL...'
      : 'INITIALIZING CLASSIFIED DOSSIER...';

  const skipHint =
    lang === 'pt' ? 'Toque para entrar' : 'Tap anywhere to enter';

  return (
    <motion.div
      key="splash-screen"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 1.04, filter: 'blur(8px)' }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      onClick={handleSkip}
      className="fixed inset-0 z-50 flex flex-col items-center justify-between bg-[#05060b] text-white overflow-hidden pt-safe pb-safe px-6 cursor-pointer select-none"
    >
      {/* Atmospheric Noir Lighting */}
      <div className="absolute inset-0 noir-grid opacity-55 pointer-events-none" />
      <motion.div
        initial={{ opacity: 0, scale: 0.85 }}
        animate={{ opacity: [0.35, 0.65, 0.45], scale: [0.95, 1.05, 1] }}
        transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[min(90vw,440px)] h-[min(90vw,440px)] rounded-full bg-[radial-gradient(circle,rgba(244,63,94,0.16)_0%,rgba(56,189,248,0.12)_45%,transparent_72%)] pointer-events-none"
      />

      {/* Sweeping Searchlight Beam */}
      <motion.div
        initial={{ rotate: -22, opacity: 0 }}
        animate={{ rotate: 18, opacity: [0, 0.22, 0.08] }}
        transition={{ duration: 2.6, ease: 'easeInOut' }}
        className="absolute -top-1/3 left-1/2 -translate-x-1/2 w-[140vw] h-[95vh] bg-gradient-to-b from-cyan-400/10 via-transparent to-transparent blur-2xl origin-top pointer-events-none"
      />

      {/* Top Classified Header Bar */}
      <motion.div
        initial={{ opacity: 0, y: -12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.15, duration: 0.5 }}
        className="relative z-10 w-full max-w-md flex items-center justify-between pt-3 text-[10px] font-mono tracking-[0.22em] text-slate-400/80 uppercase"
      >
        <span className="inline-flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-rose-500 animate-pulse" />
          CASE // 001
        </span>
        <span className="px-2.5 py-0.5 rounded-full border border-white/10 bg-white/[0.03] text-slate-300">
          CONFIDENTIAL
        </span>
      </motion.div>

      {/* Center Emblem + Brand Reveal */}
      <div className="relative z-10 flex flex-col items-center text-center my-auto py-4">
        {/* Emblem Container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.72 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
          className="relative w-32 h-32 sm:w-36 sm:h-36 flex items-center justify-center mb-7"
        >
          {/* Rotating Radar Ring */}
          <div className="absolute inset-0 rounded-full border border-cyan-400/20 animate-spin-slow" />
          <div className="absolute inset-2.5 rounded-full border border-dashed border-rose-500/25" />

          {/* Dark Glass Badge */}
          <div className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-[28px] bg-[#0b0e1a]/90 border border-white/12 shadow-[0_0_50px_rgba(244,63,94,0.22),inset_0_1px_0_rgba(255,255,255,0.12)] flex items-center justify-center overflow-hidden">
            {/* Subtle vertical scanline */}
            <div className="absolute inset-x-0 h-6 bg-gradient-to-b from-transparent via-cyan-400/20 to-transparent animate-scanline pointer-events-none" />

            {/* Custom Mystery Keyhole + Detective Silhouette SVG */}
            <svg viewBox="0 0 120 120" className="w-16 h-16 sm:w-20 sm:h-20 relative z-10">
              <defs>
                <linearGradient id="splash-crimson" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#fb7185" />
                  <stop offset="100%" stopColor="#e11d48" />
                </linearGradient>
                <linearGradient id="splash-cyan" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#67e8f9" />
                  <stop offset="100%" stopColor="#0284c7" />
                </linearGradient>
              </defs>

              {/* Keyhole Frame */}
              <path
                d="M60 22 C43 22 30 35 30 52 C30 64 37 74 47 79 L40 102 C39 106 42 109 46 109 L74 109 C78 109 81 106 80 102 L73 79 C83 74 90 64 90 52 C90 35 77 22 60 22 Z"
                fill="rgba(7, 8, 15, 0.7)"
                stroke="url(#splash-crimson)"
                strokeWidth="3.5"
                strokeLinejoin="round"
              />

              {/* Detective Hat */}
              <path
                d="M28 45 L92 45 C95 45 95 41 91 41 L81 41 L77 27 C76 23 72 21 67 21 L53 21 C48 21 44 23 43 27 L39 41 L29 41 C25 41 25 45 28 45 Z"
                fill="url(#splash-cyan)"
              />

              {/* Watching Eye */}
              <ellipse
                cx="60"
                cy="58"
                rx="15"
                ry="7"
                fill="#07080f"
                stroke="#38bdf8"
                strokeWidth="2.2"
              />
              <motion.circle
                cx="60"
                cy="58"
                r="4.5"
                fill="#f43f5e"
                animate={{ cx: [58, 62, 60] }}
                transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
              />
              <circle cx="58.5" cy="56.5" r="1.4" fill="#ffffff" />
            </svg>
          </div>
        </motion.div>

        {/* Main Title */}
        <motion.div
          initial={{ opacity: 0, y: 18, letterSpacing: '0.32em' }}
          animate={{ opacity: 1, y: 0, letterSpacing: '0.16em' }}
          transition={{ delay: 0.3, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="relative"
        >
          <h1 className="text-[clamp(2.6rem,11vw,4.5rem)] font-bold font-display leading-none text-white drop-shadow-[0_10px_30px_rgba(0,0,0,0.8)]">
            IMPOST<span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-400 via-rose-500 to-amber-400">OR</span>
          </h1>
        </motion.div>

        {/* Subtle divider & tagline */}
        <motion.div
          initial={{ opacity: 0, scaleX: 0.4 }}
          animate={{ opacity: 1, scaleX: 1 }}
          transition={{ delay: 0.55, duration: 0.6 }}
          className="w-24 h-px bg-gradient-to-r from-transparent via-cyan-400/60 to-transparent my-4"
        />

        <motion.p
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.5 }}
          className="text-[11px] sm:text-xs font-mono tracking-[0.26em] text-slate-300/90 uppercase"
        >
          {subtitle}
        </motion.p>
      </div>

      {/* Bottom Scanning Progress & Skip Prompt */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.5 }}
        className="relative z-10 w-full max-w-xs pb-5 space-y-3 text-center"
      >
        <div className="space-y-1.5">
          <div className="h-1 w-full rounded-full bg-white/10 overflow-hidden">
            <motion.div
              initial={{ width: '0%' }}
              animate={{ width: '100%' }}
              transition={{ duration: 2.35, ease: [0.22, 1, 0.36, 1] }}
              className="h-full rounded-full bg-gradient-to-r from-cyan-400 via-indigo-400 to-rose-500"
            />
          </div>
          <p className="text-[9px] font-mono tracking-[0.2em] text-slate-400 uppercase">
            {statusText}
          </p>
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: canSkip ? 0.65 : 0 }}
          className="text-[10px] font-sans text-slate-400 tracking-wide"
        >
          {skipHint}
        </motion.p>
      </motion.div>
    </motion.div>
  );
}
