import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowLeft, Eye, EyeOff, Fingerprint, ShieldAlert, Lock, ArrowRight, Sparkles } from 'lucide-react';
import { GameData, Language, Player } from '../types';
import { playReveal, playTap } from '../utils/audio';

interface SecretRevealFlowProps {
  mode: 'pass' | 'reveal';
  player: Player;
  playerIndex: number;
  totalPlayers: number;
  gameData: GameData;
  lang: Language;
  onReadyToReveal: () => void;
  onAdvanceTurn: () => void;
  onChangeCategory: () => void;
}

export default function SecretRevealFlow({
  mode,
  player,
  playerIndex,
  totalPlayers,
  gameData,
  lang,
  onReadyToReveal,
  onAdvanceTurn,
  onChangeCategory
}: SecretRevealFlowProps) {
  const [isHolding, setIsHolding] = useState(false);
  const [hasPeeked, setHasPeeked] = useState(false);

  const isImpostor = gameData.impostors.includes(player.id);
  const impostorCount = gameData.impostors.length;

  // Reset hold state whenever turn or screen mode changes
  useEffect(() => {
    setIsHolding(false);
    setHasPeeked(false);
  }, [player.id, mode]);

  // Global release listeners guarantee secret always hides when finger lifts anywhere
  useEffect(() => {
    if (!isHolding) return;
    const stopHolding = () => setIsHolding(false);
    window.addEventListener('pointerup', stopHolding);
    window.addEventListener('pointercancel', stopHolding);
    window.addEventListener('blur', stopHolding);
    return () => {
      window.removeEventListener('pointerup', stopHolding);
      window.removeEventListener('pointercancel', stopHolding);
      window.removeEventListener('blur', stopHolding);
    };
  }, [isHolding]);

  const startHold = (e: React.PointerEvent) => {
    e.preventDefault();
    if (!isHolding) {
      playReveal();
      setIsHolding(true);
      setHasPeeked(true);
    }
  };

  const t = {
    pt: {
      dossierStep: `DOSSIÊ ${playerIndex + 1} DE ${totalPlayers}`,
      passPhoneTo: 'Entregue o aparelho para',
      privacyNote: 'Certifique-se de que ninguém está olhando para a tela.',
      readyBtn: 'SOU EU, ESTOU PRONTO',
      holdTitle: 'MANTENHA PRESSIONADO PARA VER',
      holdSub: 'Solte o dedo para ocultar imediatamente',
      holdingLabel: 'SOLTE PARA ESCONDER',
      impostorBadge: 'AGENTE INFILTRADO',
      impostorTitle: 'VOCÊ É O IMPOSTOR!',
      impostorMultiNote: `Existem ${impostorCount} impostores nesta rodada. Blefe com confiança!`,
      impostorHintLabel: 'Pista Estratégica',
      impostorDesc: 'Você não sabe a palavra exata. Use a categoria e sua pista para sustentar um álibi convincente.',
      innocentBadge: 'AGENTE INOCENTE',
      innocentTitle: 'PALAVRA SECRETA',
      innocentDesc: 'Dê respostas inteligentes sem entregar a palavra diretamente. Desconfie de quem parecer vago demais.',
      categoryLabel: 'Categoria',
      nextPlayerBtn: 'PRÓXIMO JOGADOR',
      startDiscussionBtn: 'INICIAR DISCUSSÃO',
      peekFirstHint: 'Segure o cartão acima pelo menos uma vez para liberar',
      changeThemeBtn: 'VOLTAR E TROCAR TEMA'
    },
    en: {
      dossierStep: `DOSSIER ${playerIndex + 1} OF ${totalPlayers}`,
      passPhoneTo: 'Pass the device to',
      privacyNote: 'Make sure nobody else can see your screen.',
      readyBtn: "IT'S ME, I'M READY",
      holdTitle: 'HOLD DOWN TO REVEAL',
      holdSub: 'Release your finger to conceal immediately',
      holdingLabel: 'RELEASE TO CONCEAL',
      impostorBadge: 'INFILTRATOR',
      impostorTitle: 'YOU ARE THE IMPOSTOR!',
      impostorMultiNote: `There are ${impostorCount} impostors this round. Bluff with confidence!`,
      impostorHintLabel: 'Strategic Clue',
      impostorDesc: "You don't know the exact word. Use the category and your clue to craft a plausible alibi.",
      innocentBadge: 'INNOCENT AGENT',
      innocentTitle: 'SECRET WORD',
      innocentDesc: 'Give clever answers without giving away the word directly. Watch for anyone too vague.',
      categoryLabel: 'Category',
      nextPlayerBtn: 'NEXT PLAYER',
      startDiscussionBtn: 'START DISCUSSION',
      peekFirstHint: 'Hold the card above at least once to continue',
      changeThemeBtn: 'BACK & CHANGE THEME'
    }
  }[lang];

  if (mode === 'pass') {
    return (
      <motion.div
        key={`pass-${player.id}`}
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -16 }}
        transition={{ duration: 0.28 }}
        className="flex flex-col items-center justify-center text-center w-full max-w-sm mx-auto py-4 space-y-7"
      >
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.04] border border-white/10 text-[10px] font-mono tracking-[0.2em] text-cyan-300 uppercase">
          <Lock className="w-3 h-3" />
          <span>{t.dossierStep}</span>
        </div>

        {/* Player Avatar Spotlight */}
        <div className="relative w-44 h-44 flex items-center justify-center">
          <div className="absolute inset-0 rounded-full border border-cyan-400/15 animate-pulse-glow" />
          <div className="absolute inset-3 rounded-full border border-dashed border-white/10" />
          <motion.div
            animate={{ y: [0, -6, 0] }}
            transition={{ repeat: Infinity, duration: 2.6, ease: 'easeInOut' }}
            className={`w-28 h-28 rounded-[28px] ${player.color} flex items-center justify-center text-5xl shadow-[0_18px_40px_rgba(0,0,0,0.5)] border border-white/25 relative z-10`}
          >
            {player.emoji}
          </motion.div>
        </div>

        <div className="space-y-2">
          <p className="text-xs font-mono uppercase tracking-[0.2em] text-slate-400">
            {t.passPhoneTo}
          </p>
          <h1 className="text-3xl sm:text-4xl font-bold font-display tracking-tight text-white uppercase">
            {player.name}
          </h1>
          <p className="text-xs text-slate-400 max-w-[260px] mx-auto leading-relaxed pt-1">
            {t.privacyNote}
          </p>
        </div>

        <div className="w-full space-y-2.5">
          <motion.button
            whileTap={{ scale: 0.97 }}
            type="button"
            onClick={() => {
              playTap();
              onReadyToReveal();
            }}
            className="w-full py-4 rounded-2xl bg-white text-slate-950 font-bold font-display text-xs tracking-[0.18em] uppercase shadow-[0_10px_30px_rgba(255,255,255,0.14)] hover:bg-cyan-300 transition-colors flex items-center justify-center gap-2.5 cursor-pointer"
          >
            <Eye className="w-4 h-4" />
            <span>{t.readyBtn}</span>
          </motion.button>

          <button
            type="button"
            onClick={() => {
              playTap();
              onChangeCategory();
            }}
            className="w-full py-3 rounded-2xl bg-white/[0.04] hover:bg-white/[0.09] border border-white/10 text-slate-300 font-display font-bold text-[11px] tracking-[0.15em] uppercase transition-colors flex items-center justify-center gap-2 cursor-pointer"
          >
            <ArrowLeft className="w-3.5 h-3.5 text-cyan-300" />
            <span>
              {t.changeThemeBtn} ({gameData.categoryName[lang]})
            </span>
          </button>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      key={`reveal-${player.id}`}
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.96 }}
      transition={{ duration: 0.26 }}
      className="flex flex-col items-center w-full max-w-sm mx-auto py-2 space-y-5"
    >
      {/* Player Mini Header */}
      <div className="flex items-center gap-3 px-4 py-2 rounded-full glass-panel">
        <div className={`w-7 h-7 rounded-lg ${player.color} flex items-center justify-center text-sm border border-white/20`}>
          {player.emoji}
        </div>
        <span className="text-xs font-bold font-display uppercase tracking-wider text-white">
          {player.name}
        </span>
        <span className="text-[10px] font-mono text-slate-400 border-l border-white/10 pl-2.5">
          {playerIndex + 1}/{totalPlayers}
        </span>
      </div>

      {/* Unified Hold-to-Reveal Dossier Card (Never unmounts on pointerdown) */}
      <div
        onPointerDown={startHold}
        onContextMenu={(e) => e.preventDefault()}
        role="button"
        tabIndex={0}
        aria-label={t.holdTitle}
        className={`w-full rounded-[28px] p-6 min-h-[310px] flex flex-col items-center justify-center text-center relative overflow-hidden cursor-pointer select-none touch-none transition-all duration-200 ${
          isHolding
            ? isImpostor
              ? 'glass-panel-crimson scale-[0.99]'
              : 'glass-panel-cyan scale-[0.99]'
            : 'glass-panel hover:border-white/20'
        }`}
      >
        <AnimatePresence mode="wait">
          {!isHolding ? (
            <motion.div
              key="concealed"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.14 }}
              className="flex flex-col items-center space-y-5 py-4"
            >
              <div className="relative w-20 h-20 rounded-2xl bg-cyan-500/10 border border-cyan-400/25 flex items-center justify-center text-cyan-300 shadow-[0_0_30px_rgba(34,211,238,0.14)]">
                <Fingerprint className="w-10 h-10 animate-pulse" />
              </div>

              <div className="space-y-1.5">
                <p className="text-xs font-bold font-display tracking-[0.16em] text-white uppercase">
                  {t.holdTitle}
                </p>
                <p className="text-[11px] text-slate-400 font-sans">
                  {t.holdSub}
                </p>
              </div>

              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/[0.04] border border-white/10 text-[10px] font-mono text-slate-400">
                <EyeOff className="w-3 h-3" />
                <span>{gameData.categoryName[lang]}</span>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="revealed"
              initial={{ opacity: 0, scale: 0.94 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.16 }}
              className="w-full flex flex-col items-center space-y-4"
            >
              {isImpostor ? (
                <>
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-500/20 border border-rose-400/35 text-[10px] font-mono font-bold tracking-[0.18em] text-rose-300 uppercase">
                    <ShieldAlert className="w-3.5 h-3.5" />
                    <span>{t.impostorBadge}</span>
                  </div>

                  <h2 className="text-2xl font-bold font-display text-rose-400 uppercase tracking-tight">
                    {t.impostorTitle}
                  </h2>

                  <div className="w-full rounded-2xl bg-black/45 border border-rose-500/25 p-4 space-y-1">
                    <span className="text-[9px] font-mono uppercase tracking-[0.2em] text-rose-300/80 block">
                      {t.impostorHintLabel} • {gameData.categoryName[lang]}
                    </span>
                    <p className="text-2xl font-bold font-display text-white">
                      “{gameData.secretHint[lang]}”
                    </p>
                  </div>

                  {impostorCount > 1 && (
                    <p className="text-[11px] font-semibold text-amber-300/90 bg-amber-500/10 border border-amber-400/20 rounded-xl px-3 py-1.5">
                      {t.impostorMultiNote}
                    </p>
                  )}

                  <p className="text-xs text-slate-300 leading-relaxed">
                    {t.impostorDesc}
                  </p>
                </>
              ) : (
                <>
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-500/15 border border-cyan-400/30 text-[10px] font-mono font-bold tracking-[0.18em] text-cyan-300 uppercase">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>{t.innocentBadge}</span>
                  </div>

                  <div className="space-y-0.5">
                    <p className="text-[10px] font-mono uppercase tracking-[0.2em] text-slate-400">
                      {t.categoryLabel}: {gameData.categoryName[lang]}
                    </p>
                    <h2 className="text-xs font-bold font-display text-cyan-300 uppercase tracking-[0.16em]">
                      {t.innocentTitle}
                    </h2>
                  </div>

                  <div className="w-full rounded-2xl bg-black/45 border border-cyan-400/25 p-5">
                    <p className="text-2xl sm:text-3xl font-bold font-display text-white tracking-tight leading-snug">
                      {gameData.secretWord[lang]}
                    </p>
                  </div>

                  <p className="text-xs text-slate-300 leading-relaxed">
                    {t.innocentDesc}
                  </p>
                </>
              )}

              <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-white/60 pt-1">
                ▲ {t.holdingLabel} ▲
              </span>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Advance Button - Strictly separated from hold card */}
      <div className="w-full space-y-2">
        <motion.button
          whileTap={hasPeeked ? { scale: 0.97 } : undefined}
          disabled={!hasPeeked}
          onClick={() => {
            if (!hasPeeked) return;
            playTap();
            onAdvanceTurn();
          }}
          className={`w-full py-4 rounded-2xl font-display font-bold text-xs tracking-[0.18em] uppercase transition-all flex items-center justify-center gap-2 ${
            hasPeeked
              ? 'bg-white text-slate-950 hover:bg-cyan-300 shadow-[0_10px_28px_rgba(255,255,255,0.12)] cursor-pointer'
              : 'bg-white/[0.04] text-slate-500 border border-white/10 cursor-not-allowed'
          }`}
        >
          <span>
            {playerIndex < totalPlayers - 1 ? t.nextPlayerBtn : t.startDiscussionBtn}
          </span>
          <ArrowRight className="w-4 h-4" />
        </motion.button>

        {!hasPeeked && (
          <p className="text-[11px] text-center text-slate-400">
            {t.peekFirstHint}
          </p>
        )}

        <button
          type="button"
          onClick={() => {
            playTap();
            onChangeCategory();
          }}
          className="w-full py-2.5 rounded-xl bg-white/[0.03] hover:bg-white/[0.08] border border-white/10 text-slate-400 hover:text-white font-display font-bold text-[10px] tracking-[0.15em] uppercase transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
        >
          <ArrowLeft className="w-3 h-3 text-cyan-300" />
          <span>{t.changeThemeBtn}</span>
        </button>
      </div>
    </motion.div>
  );
}
