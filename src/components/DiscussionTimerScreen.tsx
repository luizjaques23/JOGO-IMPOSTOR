import React from 'react';
import { motion } from 'motion/react';
import { Clock, Pause, Play, Vote, Zap } from 'lucide-react';
import { GameData, Language, Player } from '../types';
import { playTap } from '../utils/audio';

interface DiscussionTimerScreenProps {
  gameData: GameData;
  startingPlayer: Player | undefined;
  timeLeft: number;
  totalTimeSeconds: number;
  timerActive: boolean;
  lang: Language;
  onToggleTimer: () => void;
  onStartVoting: () => void;
}

export default function DiscussionTimerScreen({
  gameData,
  startingPlayer,
  timeLeft,
  totalTimeSeconds,
  timerActive,
  lang,
  onToggleTimer,
  onStartVoting
}: DiscussionTimerScreenProps) {
  const progress = totalTimeSeconds > 0 ? Math.max(0, Math.min(1, timeLeft / totalTimeSeconds)) : 0;
  const radius = 76;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference * (1 - progress);
  const isUrgent = timeLeft <= 15;
  const isFinished = timeLeft === 0;

  const formatTime = (totalSeconds: number) => {
    const m = Math.floor(totalSeconds / 60)
      .toString()
      .padStart(2, '0');
    const s = (totalSeconds % 60).toString().padStart(2, '0');
    return `${m}:${s}`;
  };

  const t = {
    pt: {
      title: 'TEMPO DE DISCUSSÃO',
      subtitle: 'Façam perguntas entre si até o tempo acabar para ir à votação',
      startsLabel: 'Começa a rodada',
      startsHint: 'Faz a primeira pergunta e a vez segue na roda',
      pause: 'PAUSAR',
      resume: 'RETOMAR',
      voteNow: 'VOTAR AGORA',
      timeUp: 'TEMPO ESGOTADO!',
      timeUpSub: 'Indo para a votação...'
    },
    en: {
      title: 'DISCUSSION TIME',
      subtitle: 'Question each other until time runs out to start the vote',
      startsLabel: 'Starts the round',
      startsHint: 'Asks the first question and play moves around the table',
      pause: 'PAUSE',
      resume: 'RESUME',
      voteNow: 'VOTE NOW',
      timeUp: "TIME'S UP!",
      timeUpSub: 'Moving to voting...'
    }
  }[lang];

  return (
    <motion.div
      key="timer-screen"
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -14 }}
      transition={{ duration: 0.28 }}
      className="flex flex-col items-center w-full max-w-md mx-auto space-y-5 py-2"
    >
      {/* Top Category & Title */}
      <div className="text-center space-y-1.5">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.04] border border-white/10">
          <span
            className={`w-2 h-2 rounded-full ${
              isUrgent ? 'bg-rose-500 animate-ping' : 'bg-cyan-400 animate-pulse'
            }`}
          />
          <span className="text-[10px] font-mono uppercase tracking-[0.18em] text-slate-300">
            {gameData.categoryName[lang]} • {gameData.impostors.length}{' '}
            {gameData.impostors.length === 1
              ? 'Impostor'
              : lang === 'pt'
                ? 'Impostores'
                : 'Impostors'}
          </span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-bold font-display tracking-tight text-white uppercase">
          {isFinished ? t.timeUp : t.title}
        </h2>
        <p className="text-xs text-slate-400 font-sans px-2">
          {isFinished ? t.timeUpSub : t.subtitle}
        </p>
      </div>

      {/* Starting Player Spotlight */}
      {startingPlayer && (
        <div className="w-full glass-panel-cyan rounded-[24px] p-4 flex items-center gap-3.5">
          <div
            className={`w-13 h-13 rounded-2xl ${startingPlayer.color} flex items-center justify-center text-2xl shrink-0 border border-white/25 shadow-lg`}
          >
            {startingPlayer.emoji}
          </div>
          <div className="min-w-0 flex-1">
            <span className="text-[10px] font-mono uppercase tracking-[0.18em] text-cyan-300 font-bold block">
              {t.startsLabel}
            </span>
            <span className="text-lg font-bold font-display text-white truncate block">
              {startingPlayer.name}
            </span>
            <span className="text-[11px] text-slate-400 block leading-snug">
              {t.startsHint}
            </span>
          </div>
        </div>
      )}

      {/* Large Radial Countdown Ring */}
      <div className="relative w-52 h-52 sm:w-56 sm:h-56 flex items-center justify-center">
        <div
          className={`absolute inset-3 rounded-full border border-white/5 transition-opacity duration-500 ${
            timerActive ? 'opacity-100' : 'opacity-40'
          }`}
        />

        <svg className="w-full h-full -rotate-90" viewBox="0 0 180 180">
          <circle
            cx="90"
            cy="90"
            r={radius}
            fill="none"
            stroke="rgba(255,255,255,0.07)"
            strokeWidth="9"
          />
          <circle
            cx="90"
            cy="90"
            r={radius}
            fill="none"
            stroke={isUrgent ? '#f43f5e' : '#38bdf8'}
            strokeWidth="9"
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            className="transition-all duration-700 ease-linear"
          />
        </svg>

        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <Clock
            className={`w-4 h-4 mb-1 ${
              isUrgent ? 'text-rose-400 animate-pulse' : 'text-slate-400'
            }`}
          />
          <span
            className={`text-4xl font-bold font-mono tracking-tight ${
              isUrgent ? 'text-rose-400' : 'text-white'
            }`}
          >
            {formatTime(timeLeft)}
          </span>
        </div>
      </div>

      {/* Optional Round Twist Rule */}
      {gameData.twist && (
        <div className="w-full rounded-2xl bg-amber-500/10 border border-amber-400/25 p-3 flex items-start gap-2.5">
          <Zap className="w-4 h-4 text-amber-300 shrink-0 mt-0.5" />
          <div className="min-w-0">
            <span className="text-[10px] font-mono uppercase tracking-[0.15em] text-amber-300 font-bold block">
              {gameData.twist.title[lang]}
            </span>
            <p className="text-xs text-slate-300 leading-snug mt-0.5">
              {gameData.twist.desc[lang]}
            </p>
          </div>
        </div>
      )}

      {/* Action Controls */}
      <div className="w-full flex gap-3 pt-1">
        <motion.button
          whileTap={{ scale: 0.97 }}
          type="button"
          onClick={() => {
            playTap();
            onToggleTimer();
          }}
          disabled={isFinished}
          className={`flex-1 py-4 rounded-2xl border font-display font-bold text-xs tracking-[0.16em] uppercase flex items-center justify-center gap-2 transition-colors ${
            isFinished
              ? 'bg-white/[0.03] border-white/5 text-slate-600 cursor-not-allowed'
              : 'bg-white/[0.06] hover:bg-white/[0.1] border-white/12 text-white cursor-pointer'
          }`}
        >
          {timerActive ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
          <span>{timerActive ? t.pause : t.resume}</span>
        </motion.button>

        <motion.button
          whileTap={{ scale: 0.97 }}
          type="button"
          onClick={onStartVoting}
          className="flex-[1.3] py-4 rounded-2xl bg-gradient-to-r from-rose-500 to-rose-600 hover:from-rose-400 hover:to-rose-500 text-white font-display font-bold text-xs tracking-[0.16em] uppercase shadow-[0_10px_30px_rgba(244,63,94,0.32)] flex items-center justify-center gap-2 cursor-pointer transition-all"
        >
          <Vote className="w-4 h-4" />
          <span>{t.voteNow}</span>
        </motion.button>
      </div>
    </motion.div>
  );
}
